#!/usr/bin/env node
/* ------------------------------------------------------------------
   Copy Desk — content extractor
   Reads the real prop sources and emits copy-desk/content.json:
   a flat, editable map of every piece of narrative copy across
   the AIM dialogue, the codex, and the library-clippings brief.

   It never mutates the sources. It only reads them. Re-run it any
   time a source changes (or after Claude applies an edit packet) to
   refresh the Copy Desk:

       node copy-desk/extract.mjs

   Design note: instead of hand-parsing JS, we slice out the real
   data literals the props ship and eval them in a sandbox. That
   keeps the extracted copy byte-identical to what the props render,
   so an edit packet can be applied back with exact string matches.
-------------------------------------------------------------------*/
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');

/* --- eval helpers -------------------------------------------------
   We evaluate the actual source JS so the copy is faithful. The data
   declarations sit at the top of each <script>, before any DOM code. */

function evalSlice(code, returnExpr) {
  // eslint-disable-next-line no-new-func
  return new Function(`${code}\n;return (${returnExpr});`)();
}

// Grab `const NAME = { ... };` or `const NAME = [ ... ];` from a file,
// from the declaration to the first top-level terminator at column 0.
function sliceDecl(src, name, open, close) {
  const declIdx = src.indexOf(`const ${name} =`);
  if (declIdx === -1) throw new Error(`decl not found: ${name}`);
  const term = `\n${close};`;
  const end = src.indexOf(term, declIdx);
  if (end === -1) throw new Error(`terminator not found: ${name}`);
  return src.slice(declIdx, end + term.length);
}

/* --- AIM dialogue -------------------------------------------------- */

function extractAim() {
  const src = read('aim/index.html');
  const decl = sliceDecl(src, 'DIALOGUE', '{', '}');
  const DIALOGUE = evalSlice(decl, 'DIALOGUE');

  const order = Object.keys(DIALOGUE);
  const nodes = {};
  for (const key of order) {
    const node = DIALOGUE[key] || {};
    // Two schemas ship in the prop: `ghost:[str]` (single speaker) and
    // `lines:[[speaker,str]]` (multi-speaker, e.g. the patron branch).
    // Normalise both to an ordered list of {speaker,text}.
    const AIM_FILE = 'aim/index.html';
    let lines = [];
    if (Array.isArray(node.lines)) {
      lines = node.lines.map((l, i) => ({
        id: `aim::${key}::line::${i}`,
        speaker: Array.isArray(l) ? l[0] : 'ghost',
        text: Array.isArray(l) ? l[1] : l,
        path: `${AIM_FILE} :: DIALOGUE.${key}.lines[${i}][1]`,
      }));
    } else {
      lines = (node.ghost || []).map((text, i) => ({
        id: `aim::${key}::line::${i}`,
        speaker: 'ghost',
        text,
        path: `${AIM_FILE} :: DIALOGUE.${key}.ghost[${i}]`,
      }));
    }
    const choices = (node.choices || []).map((c, i) => ({
      id: `aim::${key}::choice::${i}`,
      text: c.text,
      next: c.next,
      path: `${AIM_FILE} :: DIALOGUE.${key}.choices[${i}].text`,
    }));
    nodes[key] = {
      key, lines, choices,
      soulNext: node.soulNext || null,
      terminal: (node.choices || []).length === 0 && !node.soulNext,
    };
  }

  // Reachability from `start`, for the map view.
  const reachable = new Set();
  const walk = (k) => {
    if (!nodes[k] || reachable.has(k)) return;
    reachable.add(k);
    for (const c of nodes[k].choices) if (c.next) walk(c.next);
    // Ritual nodes hand off to a follow-up node instead of a choice.
    const raw = DIALOGUE[k] || {};
    if (raw.soulNext) walk(raw.soulNext);
  };
  if (nodes.start) walk('start');

  return {
    id: 'aim',
    title: 'AIM — Ghost in the Machine',
    subtitle: 'Branching chat with the trapped soul. Every ghost line and every player reply.',
    kind: 'dialogue',
    startKey: nodes.start ? 'start' : order[0],
    order,
    reachable: [...reachable],
    nodes,
  };
}

/* --- Codex --------------------------------------------------------- */

function codexData() {
  const src = read('codex/index.html');
  const scriptStart = src.indexOf('<script>');
  const svgIdx = src.indexOf('const SVG=');
  // Everything from <script> up to the first DOM code is pure data.
  const dataCode = src.slice(scriptStart + '<script>'.length, svgIdx);
  return evalSlice(
    dataCode,
    '{NODES,EDGES,FLOW,BACKSTORY,GROUPS,EDGE_TYPES,PLAN,CENC,CRULES,CBUDGET,DOCS,NAMES,ROLES,TODO}'
  );
}

// `path` is a byte-precise source locator (file + JS access path) so the
// export packet can be applied at an exact coordinate instead of a
// find/replace on `text` — many copy strings are identical across items.
function field(id, label, text, path) {
  return { id, label, text: text == null ? '' : String(text), path: path || id };
}

const CX = 'codex/index.html';

function extractCodexNodes(NODES, GROUPS) {
  const items = NODES.map((n) => {
    const P = `${CX} :: NODES[id=${n.id}]`;
    const fields = [];
    fields.push(field(`codex::node::${n.id}::name`, 'Name', n.name, `${P}.name`));
    if (n.sub != null) fields.push(field(`codex::node::${n.id}::sub`, 'Subtitle', n.sub, `${P}.sub`));
    if (n.role != null) fields.push(field(`codex::node::${n.id}::role`, 'Role', n.role, `${P}.role`));
    if (n.fields) {
      for (const [k, v] of Object.entries(n.fields)) {
        fields.push(field(`codex::node::${n.id}::field::${k}`, `Field · ${k}`, v, `${P}.fields["${k}"]`));
      }
    }
    if (n.desc != null) fields.push(field(`codex::node::${n.id}::desc`, 'Description', n.desc, `${P}.desc`));
    if (n.hook != null) fields.push(field(`codex::node::${n.id}::hook`, 'Hook', n.hook, `${P}.hook`));
    if (n.finale != null) fields.push(field(`codex::node::${n.id}::finale`, 'Finale', n.finale, `${P}.finale`));
    if (n.epilogue != null) fields.push(field(`codex::node::${n.id}::epilogue`, 'Epilogue', n.epilogue, `${P}.epilogue`));
    if (n.line != null) fields.push(field(`codex::node::${n.id}::line`, 'Spoken line', n.line, `${P}.line`));
    if (n.empty != null) fields.push(field(`codex::node::${n.id}::empty`, 'Placeholder note', n.empty, `${P}.empty`));
    if (n.ai != null) fields.push(field(`codex::node::${n.id}::ai`, 'Canon note (not player-facing)', n.ai, `${P}.ai`));
    return {
      key: n.id,
      title: n.name,
      subtitle: n.sub || '',
      group: (GROUPS[n.g] && GROUPS[n.g].label) || n.g || '',
      accent: (GROUPS[n.g] && GROUPS[n.g].c) || '',
      status: n.s || '',
      src: n.src || '',
      fields,
    };
  });
  return { id: 'nodes', title: 'Character & Location Cards', items };
}

function extractCodexFlow(FLOW) {
  const items = FLOW.map((f) => {
    const base = `codex::flow::${f.n}`;
    const P = `${CX} :: FLOW[n=${f.n}]`;
    const fields = [];
    fields.push(field(`${base}::title`, 'Scene title', f.title, `${P}.title`));
    if (f.body != null) fields.push(field(`${base}::body`, 'Body', f.body, `${P}.body`));
    if (f.bridge) {
      if (f.bridge.cue != null) fields.push(field(`${base}::bridge::cue`, 'Bridge · read-aloud cue', f.bridge.cue, `${P}.bridge.cue`));
      if (f.bridge.note != null) fields.push(field(`${base}::bridge::note`, 'Bridge · DM note', f.bridge.note, `${P}.bridge.note`));
      if (f.bridge.q != null) fields.push(field(`${base}::bridge::q`, 'Bridge · open question', f.bridge.q, `${P}.bridge.q`));
      const fb = f.bridge.fallbacks;
      if (fb) {
        if (fb.lbl != null) fields.push(field(`${base}::fallback::lbl`, 'Fallbacks · label', fb.lbl, `${P}.bridge.fallbacks.lbl`));
        if (Array.isArray(fb.items)) {
          fb.items.forEach((it, i) => {
            if (it.say != null) fields.push(field(`${base}::fallback::${i}::say`, `Fallback ${i + 1} · ${it.who || ''} says`, it.say, `${P}.bridge.fallbacks.items[${i}].say`));
            if (it.why != null) fields.push(field(`${base}::fallback::${i}::why`, `Fallback ${i + 1} · why`, it.why, `${P}.bridge.fallbacks.items[${i}].why`));
          });
        }
      }
    }
    if (Array.isArray(f.script)) {
      f.script.forEach((line, i) => {
        const who = Array.isArray(line) ? line[0] : '';
        const say = Array.isArray(line) ? line[1] : line;
        fields.push(field(`${base}::script::${i}`, `Script · ${who}`, say, `${P}.script[${i}][1]`));
      });
    }
    if (Array.isArray(f.phases)) {
      f.phases.forEach((ph, i) => {
        if (ph.h != null) fields.push(field(`${base}::phase::${i}::h`, `Phase ${ph.k || i + 1} · heading`, ph.h, `${P}.phases[${i}].h`));
        if (ph.p != null) fields.push(field(`${base}::phase::${i}::p`, `Phase ${ph.k || i + 1} · body`, ph.p, `${P}.phases[${i}].p`));
      });
    }
    return { key: `flow-${f.n}`, title: `${f.n}. ${f.title}`, subtitle: f.where || '', group: 'Session flow', status: f.s || '', src: f.src || '', fields };
  });
  return { id: 'flow', title: 'Session Flow', items };
}

function extractCodexBackstory(BACKSTORY) {
  const items = BACKSTORY.map((b, bi) => {
    const base = `codex::backstory::${bi}`;
    const P = `${CX} :: BACKSTORY[${bi}]`;
    const fields = [];
    fields.push(field(`${base}::h`, 'Heading', b.h, `${P}.h`));
    (b.items || []).forEach((it, i) => {
      const isObj = typeof it !== 'string';
      const text = isObj ? it.t : it;
      fields.push(field(`${base}::item::${i}`, `Beat ${i + 1}`, text, `${P}.items[${i}]${isObj ? '.t' : ''}`));
    });
    return { key: `backstory-${bi}`, title: b.h, subtitle: b.when || '', group: 'Backstory', status: b.s || '', src: b.src || '', fields };
  });
  return { id: 'backstory', title: 'Backstory Timeline', items };
}

function extractCodexPlan(PLAN) {
  const items = [];
  for (const dayKey of Object.keys(PLAN)) {
    const day = PLAN[dayKey];
    const base = `codex::plan::${dayKey}`;
    const P = `${CX} :: PLAN.${dayKey}`;
    const fields = [];
    fields.push(field(`${base}::title`, 'Day title', day.title, `${P}.title`));
    if (day.sub != null) fields.push(field(`${base}::sub`, 'Subtitle', day.sub, `${P}.sub`));
    (day.slots || []).forEach((sl, i) => {
      if (sl.h != null) fields.push(field(`${base}::slot::${i}::h`, `${sl.t || 'Slot ' + (i + 1)} · heading`, sl.h, `${P}.slots[${i}].h`));
      if (sl.p != null) fields.push(field(`${base}::slot::${i}::p`, `${sl.t || 'Slot ' + (i + 1)} · body`, sl.p, `${P}.slots[${i}].p`));
    });
    items.push({ key: `plan-${dayKey}`, title: day.title, subtitle: day.sub || '', group: 'Run of show', status: 'doc', src: '', fields });
  }
  return { id: 'plan', title: 'Run of Show', items };
}

function extractCodexCombat(CENC, CRULES, CBUDGET) {
  const items = [];
  CENC.forEach((e, i) => {
    const base = `codex::cenc::${i}`;
    const P = `${CX} :: CENC[${i}]`;
    const fields = [];
    fields.push(field(`${base}::title`, 'Encounter title', e.title, `${P}.title`));
    if (e.p != null) fields.push(field(`${base}::p`, 'Body', e.p, `${P}.p`));
    if (e.verdict != null) fields.push(field(`${base}::verdict`, 'Balance verdict', e.verdict, `${P}.verdict`));
    if (e.note != null) fields.push(field(`${base}::note`, 'DM note', e.note, `${P}.note`));
    if (Array.isArray(e.math)) {
      e.math.forEach((row, j) => {
        const lbl = Array.isArray(row) ? row[0] : `row ${j + 1}`;
        const val = Array.isArray(row) ? row[1] : row;
        fields.push(field(`${base}::math::${j}`, `Math · ${lbl}`, val, `${P}.math[${j}][1]`));
      });
    }
    items.push({ key: `cenc-${i}`, title: e.title, subtitle: e.act || '', group: 'Combat set-piece', status: e.s || '', src: e.src || '', fields });
  });
  CRULES.forEach((r, i) => {
    const title = Array.isArray(r) ? r[0] : r.title;
    const body = Array.isArray(r) ? r[1] : r.body;
    const fields = [
      field(`codex::crule::${i}::title`, 'Rule', title, `${CX} :: CRULES[${i}][0]`),
      field(`codex::crule::${i}::body`, 'Detail', body, `${CX} :: CRULES[${i}][1]`),
    ];
    items.push({ key: `crule-${i}`, title, subtitle: '', group: 'Combat rule', status: 'doc', src: '', fields });
  });
  if (CBUDGET && typeof CBUDGET === 'object') {
    const fields = [];
    for (const [k, v] of Object.entries(CBUDGET)) {
      if (typeof v === 'string') fields.push(field(`codex::cbudget::${k}`, `Budget · ${k}`, v, `${CX} :: CBUDGET.${k}`));
    }
    if (fields.length) items.push({ key: 'cbudget', title: 'Encounter budget notes', subtitle: '', group: 'Combat rule', status: 'doc', src: '', fields });
  }
  return { id: 'combat', title: 'Combat', items };
}

function extractCodexDocs(DOCS) {
  const items = DOCS.map((row, i) => {
    const title = Array.isArray(row) ? row[0] : row.title;
    const body = Array.isArray(row) ? row[1] : row.body;
    const src = Array.isArray(row) ? row[3] : row.src;
    return {
      key: `doc-${i}`,
      title,
      subtitle: '',
      group: 'Prop / document',
      status: Array.isArray(row) ? row[2] : row.s,
      src: src || '',
      fields: [
        field(`codex::doc::${i}::title`, 'Document name', title, `${CX} :: DOCS[${i}][0]`),
        field(`codex::doc::${i}::body`, 'Status & description', body, `${CX} :: DOCS[${i}][1]`),
      ],
    };
  });
  return { id: 'docs', title: 'Props & Documents', items };
}

function extractCodexEdges(EDGES) {
  // Relationship labels rendered on the codex graph, e.g. "fell out over
  // uneven cuts". Shape: [from, to, type, label, s, src].
  const items = EDGES.map((e, i) => {
    const [from, to, , label] = Array.isArray(e) ? e : [e.from, e.to, e.type, e.label];
    return {
      key: `edge-${i}`,
      title: `${from} → ${to}`,
      subtitle: label,
      group: 'Relationship label',
      status: (Array.isArray(e) ? e[4] : e.s) || '',
      src: (Array.isArray(e) ? e[5] : e.src) || '',
      fields: [field(`codex::edge::${i}::label`, 'Label', label, `${CX} :: EDGES[${i}][3]`)],
    };
  });
  return { id: 'edges', title: 'Relationship Labels', items };
}

function extractCodexTodo(TODO) {
  // Open questions / decisions rendered in the codex. Shape: [title, body, s].
  const items = TODO.map((row, i) => {
    const title = Array.isArray(row) ? row[0] : row.title || row.h;
    const body = Array.isArray(row) ? row[1] : row.body || row.note;
    return {
      key: `todo-${i}`,
      title,
      subtitle: '',
      group: 'Open question / decision',
      status: (Array.isArray(row) ? row[2] : row.s) || '',
      src: '',
      fields: [
        field(`codex::todo::${i}::title`, 'Question / decision', title, `${CX} :: TODO[${i}][0]`),
        field(`codex::todo::${i}::body`, 'Detail', body, `${CX} :: TODO[${i}][1]`),
      ],
    };
  });
  return { id: 'todo', title: 'Open Questions', items };
}

function extractCodexNamesRoles(NAMES, ROLES) {
  const items = [];
  NAMES.forEach((nm, i) => {
    const base = `codex::names::${i}`;
    const P = `${CX} :: NAMES[${i}]`;
    const fields = [];
    if (nm.note != null) fields.push(field(`${base}::note`, 'Note', nm.note, `${P}.note`));
    (nm.opts || []).forEach((o, j) => {
      const flag = o.lock ? ' (locked)' : o.out ? ' (rejected)' : '';
      fields.push(field(`${base}::opt::${j}`, `Option ${j + 1}${flag}`, o.n, `${P}.opts[${j}].n`));
    });
    if (nm.secret != null) fields.push(field(`${base}::secret`, 'Secret / reveal', nm.secret, `${P}.secret`));
    if (nm.ai != null) fields.push(field(`${base}::ai`, 'Canon note (not player-facing)', nm.ai, `${P}.ai`));
    items.push({ key: `names-${i}`, title: nm.h, subtitle: nm.note || '', group: 'Name options', status: nm.s || '', src: nm.src || '', fields });
  });
  ROLES.forEach((row, i) => {
    const title = Array.isArray(row) ? row[0] : row.title;
    const body = Array.isArray(row) ? row[1] : row.body;
    items.push({
      key: `role-${i}`, title, subtitle: '', group: 'Production role',
      status: Array.isArray(row) ? row[2] : row.s, src: Array.isArray(row) ? row[3] : row.src || '',
      fields: [
        field(`codex::role::${i}::title`, 'Role', title, `${CX} :: ROLES[${i}][0]`),
        field(`codex::role::${i}::body`, 'Who / notes', body, `${CX} :: ROLES[${i}][1]`),
      ],
    });
  });
  return { id: 'names', title: 'Names & Roles', items };
}

function extractCodex() {
  const { NODES, EDGES, FLOW, BACKSTORY, GROUPS, EDGE_TYPES, PLAN, CENC, CRULES, CBUDGET, DOCS, NAMES, ROLES, TODO } = codexData();
  // Relationship-graph overview data (read-only; maps to the node cards).
  const graph = {
    nodes: NODES.map((n) => ({ id: n.id, name: n.name, sub: n.sub || '', g: n.g, x: n.x, y: n.y, accent: (GROUPS[n.g] && GROUPS[n.g].c) || '#9a6ff0' })),
    edges: EDGES.map((e) => {
      const [from, to, type, label] = Array.isArray(e) ? e : [e.from, e.to, e.type, e.label];
      const t = EDGE_TYPES[type] || {};
      return { from, to, type, label, color: t.c || '#6f6790', dash: t.dash || '0', arrow: !!t.arrow };
    }),
    groups: GROUPS,
    edgeTypes: EDGE_TYPES,
  };
  return {
    id: 'codex',
    title: 'The Codex',
    subtitle: 'Every card, relationship, session beat, backstory entry, plan, rule and open question the codex renders.',
    kind: 'grouped',
    graph,
    groups: [
      extractCodexNodes(NODES, GROUPS),
      extractCodexEdges(EDGES),
      extractCodexFlow(FLOW),
      extractCodexBackstory(BACKSTORY),
      extractCodexPlan(PLAN),
      extractCodexCombat(CENC, CRULES, CBUDGET),
      extractCodexDocs(DOCS),
      extractCodexNamesRoles(NAMES, ROLES),
      extractCodexTodo(TODO),
    ],
  };
}

/* --- Library clippings (markdown brief) ---------------------------- */

function extractLibrary() {
  const md = read('library-clippings/BRIEF.md');
  const lines = md.split('\n');

  // Take everything under the "Source material" H2, split into one
  // editable block per "### N. …" subsection (prose + its blockquotes).
  // The blockquotes above Source material are canon warnings /
  // changelog, not handout copy, so they are skipped.
  let started = false;
  let curHeader = null;
  const blocks = [];
  let buf = [];

  const flush = () => {
    if (curHeader == null) { buf = []; return; }
    const text = buf.join('\n').trim();
    if (text) blocks.push({ header: curHeader, text, idx: blocks.length });
    buf = [];
  };

  for (const line of lines) {
    if (/^##\s+Source material/i.test(line)) { started = true; continue; }
    if (!started) continue;
    if (/^##\s/.test(line)) { flush(); break; } // stop at next H2 after source material
    const h = line.match(/^###\s+(.*)$/);
    if (h) { flush(); curHeader = h[1].trim(); continue; }
    buf.push(line);
  }
  flush();

  const items = blocks.map((b) => ({
    key: `lib-${b.idx}`,
    title: b.header,
    subtitle: '',
    group: 'Source lore',
    status: 'draft',
    src: 'library-clippings/BRIEF.md',
    fields: [field(`library::block::${b.idx}`, b.header, b.text, `library-clippings/BRIEF.md :: ### ${b.header}`)],
  }));

  return {
    id: 'library',
    title: 'Library Clippings',
    subtitle: 'Draft handout copy from the source lore. (Prop not built yet — this is the ### source-material lore only, not the whole brief.)',
    kind: 'grouped',
    groups: [{ id: 'blocks', title: 'Source lore & draft copy', items }],
  };
}

/* --- printed-handout props (static HTML) ---------------------------
   These props keep their copy inline in the markup, not in JS data.
   A small leaf-text-block walker pulls every innermost block/SVG-text
   element that carries real text, byte-exact (entities preserved), so
   edits round-trip. Layered/duplicated strings (e.g. an SVG headline
   drawn 3× for shadow/rim/fill) collapse to one item that maps to all
   occurrences. Tune `deny` per prop to drop UI chrome.
------------------------------------------------------------------- */
const BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'div', 'figcaption', 'blockquote', 'section', 'header', 'footer', 'td', 'th', 'dt', 'dd', 'caption', 'text', 'textpath', 'tspan', 'span']);
const INLINE_TAGS = new Set(['b', 'i', 'em', 'strong', 'u', 's', 'a', 'br', 'sub', 'sup', 'small', 'mark', 'code', 'abbr', 'q', 'wbr', 'time', 'tt', 'del', 'ins', 'kbd']);
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'rect', 'circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'stop', 'use', 'image']);

function leafTextBlocks(html) {
  // strip scripts, styles, comments (keep everything else, incl. SVG)
  const src = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const re = /<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|([^<]+)/g;
  const stack = [];
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    if (m[5] != null) { // text
      if (m[5].trim() && stack.length) stack[stack.length - 1].hasText = true;
      continue;
    }
    if (m[1]) { // close tag
      const tag = m[1].toLowerCase();
      // pop until matching (tolerate minor imbalance)
      let idx = -1;
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === tag) { idx = i; break; }
      if (idx === -1) continue;
      while (stack.length > idx) {
        const e = stack.pop();
        const inner = src.slice(e.innerStart, m.index);
        const isBlock = BLOCK_TAGS.has(e.tag);
        const parent = stack[stack.length - 1];
        if (isBlock) {
          if (!e.hasBlockChild && e.hasText) out.push({ tag: e.tag, cls: e.cls, html: inner });
          if (parent) parent.hasBlockChild = true;
        } else if (INLINE_TAGS.has(e.tag)) {
          if (parent && e.hasText) parent.hasText = true;
        } else {
          // structural (svg, g, defs, mask, table…): counts as a block child
          if (parent) parent.hasBlockChild = true;
        }
      }
      continue;
    }
    // open tag
    const tag = m[2].toLowerCase();
    const selfClose = m[4] === '/' || VOID_TAGS.has(tag);
    if (selfClose) continue;
    const clsM = m[3] && m[3].match(/\bclass\s*=\s*"([^"]*)"/);
    stack.push({ tag, cls: clsM ? clsM[1] : '', innerStart: re.lastIndex, hasText: false, hasBlockChild: false });
  }
  return out;
}

function extractHtmlProp(file, meta) {
  const html = read(file);
  const deny = meta.deny || [];
  const blocks = leafTextBlocks(html);
  const seen = new Map(); // normalized text -> item (dedup layered copies)
  const items = [];
  for (const b of blocks) {
    const norm = plainText(b.html);
    if (!norm) continue;
    if (deny.some((d) => (d instanceof RegExp ? d.test(norm) : norm === d || norm.includes(d)))) continue;
    if (seen.has(b.html)) { seen.get(b.html).occurrences++; continue; }
    const idx = items.length;
    const item = {
      key: `${meta.id}-${idx}`,
      title: norm.length > 52 ? norm.slice(0, 52) + '…' : norm,
      subtitle: '',
      group: b.cls ? `.${b.cls.split(/\s+/)[0]}` : b.tag,
      status: 'built',
      src: `${file} · <${b.tag}${b.cls ? ' class="' + b.cls + '"' : ''}>`,
      occurrences: 1,
      fields: [field(`${meta.id}::block::${idx}`, b.cls ? `.${b.cls.split(/\s+/)[0]}` : b.tag, b.html, `${file} :: <${b.tag}${b.cls ? ' class="' + b.cls + '"' : ''}> (${norm.slice(0, 30)}…)`)],
    };
    seen.set(b.html, item);
    items.push(item);
  }
  // annotate duplicated-copy items
  for (const it of items) if (it.occurrences > 1) it.subtitle = `appears ${it.occurrences}× (layered) — edits apply to all`;
  return {
    id: meta.id,
    title: meta.title,
    subtitle: meta.subtitle,
    kind: 'grouped',
    groups: [{ id: 'copy', title: 'Copy blocks (in reading order)', items }],
  };
}

// plain text with entities decoded enough for a readable label
function plainText(h) {
  return String(h)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“').replace(/&amp;/g, '&').replace(/&middot;/g, '·')
    .replace(/&nbsp;/g, ' ').replace(/&hellip;/g, '…').replace(/&#8209;/g, '‑').replace(/&#9733;/g, '★')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* --- assemble ------------------------------------------------------ */

function main() {
  const handouts = [
    extractHtmlProp('invite/index.html', {
      id: 'invite', title: 'Invite', subtitle: 'The haunted-house invitation card. Copy in reading order (layered SVG headlines collapse to one).',
      deny: ['Print / Save as PDF', 'Background graphics', /margins/i, /^\d+px$/, 'RSVP:', 'or e‑mail', 'or e-mail'],
    }),
    extractHtmlProp('settlement/index.html', {
      id: 'settlement', title: 'Settlement', subtitle: 'The Articles of Settlement document.',
      deny: ['Tap to unfold', 'Print', 'Save as PDF', 'Background graphics'],
    }),
    extractHtmlProp('photo/index.html', {
      id: 'photo', title: 'Photograph', subtitle: 'The photograph in Bix’s room and its pencilled captions.',
      deny: ['Print', 'Save as PDF', 'Background graphics', 'Tap', /margins/i],
    }),
    extractHtmlProp('puzzle/index.html', {
      id: 'puzzle', title: 'Torn Page', subtitle: 'The Transyltown Crier newspaper article (torn-page puzzle).',
      deny: ['Hold It Together', /Long-press/i, /debug/i, 'Set it by how many cuts the shears got in.',
        'Before you hand it over', /localStorage/i, /^\d+$/, /^\d+\s*pieces$/i, /^\d+\s*\/\s*\d+$/,
        'Difficulty', 'Cut to pieces', 'put it back together', 'it’s holding — turn it over', '↔', '↕'],
    }),
  ];
  const sections = [extractAim(), extractCodex(), extractLibrary(), ...handouts];
  let count = 0;
  const countFields = (s) => {
    if (s.kind === 'dialogue') {
      for (const k of s.order) {
        count += s.nodes[k].lines.length + s.nodes[k].choices.length;
      }
    } else {
      for (const g of s.groups) for (const it of g.items) count += it.fields.length;
    }
  };
  sections.forEach(countFields);

  const out = {
    generatedAt: new Date().toISOString(),
    totalItems: count,
    sections,
  };
  const outPath = resolve(HERE, 'content.json');
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`Wrote ${outPath}`);
  console.log(`Sections: ${sections.map((s) => s.id).join(', ')}`);
  console.log(`Total editable items: ${count}`);

  // Coverage manifest — make any un-extracted codex data array explicit,
  // so nothing is dropped silently. Lists top-level `const NAME = [ / {`
  // in the codex script and whether we pull copy from it.
  const codexSrc = read('codex/index.html');
  const declared = [...codexSrc.matchAll(/^const ([A-Z_]+)\s*=\s*[[{]/gm)].map((m) => m[1]);
  const EXTRACTED = ['NODES', 'EDGES', 'FLOW', 'BACKSTORY', 'PLAN', 'CENC', 'CRULES', 'CBUDGET', 'DOCS', 'NAMES', 'ROLES', 'TODO'];
  const CONFIG = ['GROUPS', 'EDGE_TYPES']; // legend/config, not copy
  const OUT_OF_SCOPE = { TODO_LIST: 'interactive checklist state, not narrative copy', SVG: 'namespace constant', TD_OWNER: 'label map' };
  const unaccounted = declared.filter((n) => !EXTRACTED.includes(n) && !CONFIG.includes(n) && !(n in OUT_OF_SCOPE));
  console.log(`\nCodex coverage:`);
  console.log(`  extracted : ${declared.filter((n) => EXTRACTED.includes(n)).join(', ')}`);
  console.log(`  config    : ${declared.filter((n) => CONFIG.includes(n)).join(', ') || '—'}`);
  console.log(`  skipped   : ${declared.filter((n) => n in OUT_OF_SCOPE).map((n) => `${n} (${OUT_OF_SCOPE[n]})`).join(', ') || '—'}`);
  if (unaccounted.length) console.log(`  ⚠ UNACCOUNTED (review these!): ${unaccounted.join(', ')}`);
}

main();
