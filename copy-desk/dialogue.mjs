#!/usr/bin/env node
/* ------------------------------------------------------------------
   AIM conversation ⇄ dialogue.json  (lossless working model)

   The conversation editor edits copy-desk/dialogue.json. This module
   is the bridge between that file and the real prop (aim/index.html):

     node copy-desk/dialogue.mjs export    # aim/index.html  → dialogue.json
     node copy-desk/dialogue.mjs compile   # dialogue.json   → aim/index.html
     node copy-desk/dialogue.mjs verify    # export→compile round-trips exactly

   dialogue.json is an ordered node list. Each node keeps its speaker
   lines normalised to {speaker,text} plus every special behaviour key
   the prop relies on (system / transfer / patronJoin / soul / … ), so
   compiling back reproduces the DIALOGUE object byte-for-value.
-------------------------------------------------------------------*/
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const AIM = resolve(ROOT, 'aim/index.html');
const DJSON = resolve(HERE, 'dialogue.json');

const CONTENT_KEYS = ['system', 'transfer', 'patronJoin', 'soul', 'soulNext', 'patronLeave', 'moved'];

function readDialogueLiteral() {
  const src = readFileSync(AIM, 'utf8');
  const start = src.indexOf('const DIALOGUE =');
  if (start === -1) throw new Error('DIALOGUE not found in aim/index.html');
  const end = src.indexOf('\n};', start);
  if (end === -1) throw new Error('DIALOGUE terminator not found');
  const literal = src.slice(start, end + 3);
  // eslint-disable-next-line no-new-func
  const D = new Function(literal + '\nreturn DIALOGUE;')();
  return { src, start, end: end + 3, D, literal };
}

// Capture the dev-comment block that precedes each node inside the literal,
// so the editor can preserve those narrative notes when it recompiles.
function skipObject(s, i) { // i at '{' or '['
  let depth = 0, inStr = false, q = '';
  for (; i < s.length; i++) {
    const ch = s[i];
    if (inStr) { if (ch === '\\') { i++; continue; } if (ch === q) inStr = false; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; q = ch; continue; }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') { depth--; if (depth === 0) return i + 1; }
  }
  return i;
}
function parseLeads(literal) {
  const body = literal.slice(literal.indexOf('{') + 1, literal.lastIndexOf('}'));
  const leads = {}; let i = 0, pending = ''; const n = body.length;
  while (i < n) {
    if (body[i] === '/' && body[i + 1] === '*') { const j = body.indexOf('*/', i + 2); const c = body.slice(i, j + 2); pending += (pending ? '\n' : '') + c; i = j + 2; continue; }
    if (body[i] === '/' && body[i + 1] === '/') { const j = body.indexOf('\n', i); const c = body.slice(i, j === -1 ? n : j); pending += (pending ? '\n' : '') + c.trim(); i = (j === -1 ? n : j); continue; }
    if (/\s/.test(body[i]) || body[i] === ',') { i++; continue; }
    const m = /^([A-Za-z_$][\w$]*)\s*:/.exec(body.slice(i));
    if (m) {
      if (pending) { leads[m[1]] = pending.trim(); pending = ''; }
      i += m[0].length;
      while (i < n && /\s/.test(body[i])) i++;
      if (body[i] === '{') i = skipObject(body, i);
      continue;
    }
    i++;
  }
  return leads;
}

/* ---- export: aim DIALOGUE → dialogue.json ---- */
function toModel(D, leads = {}) {
  const nodes = Object.entries(D).map(([key, n]) => {
    let lines, schema;
    if (Array.isArray(n.lines)) {
      schema = 'lines';
      lines = n.lines.map((l) => (Array.isArray(l) ? { speaker: l[0], text: l[1] } : { speaker: 'ghost', text: String(l) }));
    } else {
      schema = 'ghost';
      lines = (n.ghost || []).map((t) => ({ speaker: 'ghost', text: t }));
    }
    const node = { key, schema, lines, choices: (n.choices || []).map((c) => ({ text: c.text, next: c.next })) };
    for (const k of CONTENT_KEYS) if (k in n) node[k] = n[k];
    if (leads[key]) node._lead = leads[key];
    return node;
  });
  return { start: Object.keys(D)[0] || 'start', nodes };
}

function doExport() {
  const { D, literal } = readDialogueLiteral();
  const model = toModel(D, parseLeads(literal));
  writeFileSync(DJSON, JSON.stringify(model, null, 2));
  console.log(`Wrote ${DJSON} (${model.nodes.length} nodes)`);
  return model;
}

/* ---- compile: dialogue.json → aim DIALOGUE ---- */
const q = (s) => JSON.stringify(s); // safe JS string literal
// JS-style value (unquoted object keys, spaced) to match the prop's hand style
function jsVal(v) {
  if (Array.isArray(v)) return `[${v.map(jsVal).join(', ')}]`;
  if (v && typeof v === 'object') return `{ ${Object.entries(v).map(([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k)}: ${jsVal(x)}`).join(', ')} }`;
  return typeof v === 'string' ? q(v) : String(v);
}

function serializeNode(node, indent = '  ') {
  const i2 = indent + '  ';
  const i3 = i2 + '  ';
  const parts = [];
  // speaker lines
  const allGhost = node.lines.every((l) => (l.speaker || 'ghost') === 'ghost');
  if (node.schema === 'ghost' && allGhost) {
    const arr = node.lines.map((l) => `\n${i3}${q(l.text)}`).join(',');
    parts.push(`${i2}ghost: [${arr}${node.lines.length ? '\n' + i2 : ''}]`);
  } else {
    const arr = node.lines.map((l) => `\n${i3}[${q(l.speaker || 'ghost')}, ${q(l.text)}]`).join(',');
    parts.push(`${i2}lines: [${arr}${node.lines.length ? '\n' + i2 : ''}]`);
  }
  // special behaviour keys (preserve order defined in CONTENT_KEYS)
  for (const k of CONTENT_KEYS) {
    if (!(k in node)) continue;
    parts.push(`${i2}${k}: ${jsVal(node[k])}`);
  }
  // choices last
  if (node.choices && node.choices.length) {
    const cs = node.choices.map((c) => `\n${i3}{ text: ${q(c.text)}, next: ${q(c.next)} }`).join(',');
    parts.push(`${i2}choices: [${cs}\n${i2}]`);
  } else {
    parts.push(`${i2}choices: []`);
  }
  let lead = '';
  if (node._lead) {
    lead = node._lead.split('\n').map((l, idx) => idx === 0 ? indent + l.trim() : indent + '   ' + l.trim()).join('\n') + '\n';
  }
  return `${lead}${indent}${node.key}: {\n${parts.join(',\n')}\n${indent}}`;
}

function serializeModel(model) {
  const body = model.nodes.map((n) => serializeNode(n)).join(',\n\n');
  return `const DIALOGUE = {\n${body}\n}`; // caller appends ';'
}

function doCompile() {
  if (!existsSync(DJSON)) throw new Error('dialogue.json not found — run `export` first');
  const model = JSON.parse(readFileSync(DJSON, 'utf8'));
  const { src, start, end } = readDialogueLiteral();
  const literal = serializeModel(model);
  const next = src.slice(0, start) + literal + src.slice(end - 1); // end-1 keeps the trailing ';' — end pointed just past '\n};'
  // src.slice(end-1) begins at ';' of '};'
  writeFileSync(AIM, next);
  console.log(`Compiled ${model.nodes.length} nodes into ${AIM}`);
}

/* ---- verify: export → compile → identical DIALOGUE value ---- */
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual(a[k], b[k]));
}
function doVerify() {
  const { D } = readDialogueLiteral();
  const model = toModel(D);
  const literal = serializeModel(model);
  // eslint-disable-next-line no-new-func
  const D2 = new Function(literal + ';\nreturn DIALOGUE;')();
  // compare key-by-key, normalising ghost/lines to the same shape
  const norm = (obj) => Object.fromEntries(Object.entries(obj).map(([k, n]) => {
    const lines = Array.isArray(n.lines) ? n.lines.map((l) => Array.isArray(l) ? [l[0], l[1]] : ['ghost', l]) : (n.ghost || []).map((t) => ['ghost', t]);
    const rest = {}; for (const c of CONTENT_KEYS) if (c in n) rest[c] = n[c];
    return [k, { lines, choices: (n.choices || []).map((c) => ({ text: c.text, next: c.next })), ...rest }];
  }));
  const ok = deepEqual(norm(D), norm(D2));
  const ka = Object.keys(D), kb = Object.keys(D2);
  const orderOk = ka.length === kb.length && ka.every((k, i) => k === kb[i]);
  console.log(`nodes: ${ka.length} → ${kb.length} · order preserved: ${orderOk} · values identical: ${ok}`);
  if (!ok || !orderOk) { console.error('❌ round-trip mismatch'); process.exit(1); }
  console.log('✅ lossless round-trip');
}

const cmd = process.argv[2] || 'verify';
if (cmd === 'export') doExport();
else if (cmd === 'compile') doCompile();
else if (cmd === 'verify') doVerify();
else { console.error('usage: dialogue.mjs export|compile|verify'); process.exit(1); }
