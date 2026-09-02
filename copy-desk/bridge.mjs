#!/usr/bin/env node
/* ------------------------------------------------------------------
   Copy Desk bridge — one local process that powers the editor.

     node copy-desk/bridge.mjs        # then open http://localhost:8177/copy-desk/

   It does three things:
   1. Serves the repo over HTTP (props + copy-desk), like python http.server.
   2. Persists the conversation working model (copy-desk/dialogue.json) —
      the editor's direct add/edit/delete/reorder changes save here.
   3. Relays "Ask AI" requests to the Claude session watching this repo:
      the editor POSTs a request, the bridge queues it in
      copy-desk/.bridge/requests.jsonl and drops a `pending` marker;
      Claude processes it (edits dialogue.json), marks it done, and the
      editor polls the status and reloads.

   No dependencies. No data leaves the machine.
-------------------------------------------------------------------*/
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, appendFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, normalize, join, extname } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const BRIDGE = resolve(HERE, '.bridge');
const REQ = join(BRIDGE, 'requests.jsonl');
const PENDING = join(BRIDGE, 'pending');
const DJSON = resolve(HERE, 'dialogue.json');
const PORT = process.env.PORT ? +process.env.PORT : 8177;

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

async function ensureSetup() {
  if (!existsSync(BRIDGE)) await mkdir(BRIDGE, { recursive: true });
  if (!existsSync(DJSON)) {
    console.log('dialogue.json missing — running export…');
    spawnSync('node', [join(HERE, 'dialogue.mjs'), 'export'], { stdio: 'inherit' });
  }
}

const json = (res, code, obj) => { const b = JSON.stringify(obj); res.writeHead(code, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(b) }); res.end(b); };
const readBody = (req) => new Promise((ok, no) => { let d = ''; req.on('data', (c) => { d += c; if (d.length > 8e6) req.destroy(); }); req.on('end', () => ok(d)); req.on('error', no); });

let seq = Date.now();
async function readRequests() {
  if (!existsSync(REQ)) return [];
  const txt = await readFile(REQ, 'utf8');
  return txt.split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
}

async function handleApi(req, res, path) {
  // ---- dialogue working model ----
  if (path === '/copy-desk/api/dialogue') {
    if (req.method === 'GET') { const txt = await readFile(DJSON, 'utf8'); res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(txt); }
    if (req.method === 'PUT' || req.method === 'POST') {
      const body = await readBody(req);
      try { const model = JSON.parse(body); if (!model || !Array.isArray(model.nodes)) throw new Error('bad model'); await writeFile(DJSON, JSON.stringify(model, null, 2)); return json(res, 200, { ok: true, nodes: model.nodes.length }); }
      catch (e) { return json(res, 400, { error: String(e.message || e) }); }
    }
  }
  // ---- AI request queue ----
  if (path === '/copy-desk/api/ai') {
    if (req.method === 'GET') { return json(res, 200, { requests: await readRequests() }); }
    if (req.method === 'POST') {
      const body = await readBody(req);
      let payload; try { payload = JSON.parse(body); } catch { return json(res, 400, { error: 'bad json' }); }
      const id = 'ai' + (seq++).toString(36);
      const rec = { id, status: 'pending', createdAt: new Date().toISOString(), target: payload.target || null, instruction: String(payload.instruction || '').slice(0, 4000), result: null };
      await appendFile(REQ, JSON.stringify(rec) + '\n');
      await writeFile(PENDING, id); // marker the Claude watcher blocks on
      return json(res, 200, { id });
    }
  }
  // ---- compile working model → the real prop ----
  if (path === '/copy-desk/api/compile' && req.method === 'POST') {
    const r = spawnSync('node', [join(HERE, 'dialogue.mjs'), 'compile'], { encoding: 'utf8' });
    if (r.status === 0) return json(res, 200, { ok: true, out: (r.stdout || '').trim() });
    return json(res, 500, { error: (r.stderr || r.stdout || 'compile failed').trim() });
  }
  // ---- health / bridge presence probe ----
  if (path === '/copy-desk/api/ping') return json(res, 200, { ok: true, bridge: true, pending: existsSync(PENDING) });
  return json(res, 404, { error: 'unknown api route' });
}

async function serveStatic(req, res, path) {
  let rel = decodeURIComponent(path.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  const full = normalize(join(ROOT, rel));
  if (!full.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  try {
    const s = await stat(full);
    if (s.isDirectory()) { res.writeHead(302, { Location: rel + '/' }); return res.end(); }
    const data = await readFile(full);
    res.writeHead(200, { 'Content-Type': MIME[extname(full).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('404 ' + rel); }
}

await ensureSetup();
createServer(async (req, res) => {
  const path = req.url;
  try {
    if (path.startsWith('/copy-desk/api/')) return await handleApi(req, res, path.split('?')[0]);
    return await serveStatic(req, res, path);
  } catch (e) { json(res, 500, { error: String(e.message || e) }); }
}).listen(PORT, () => {
  console.log(`\n  Copy Desk bridge running`);
  console.log(`  → http://localhost:${PORT}/copy-desk/\n`);
  console.log(`  Editing saves to copy-desk/dialogue.json.`);
  console.log(`  "Ask AI" requests queue in copy-desk/.bridge/ for the Claude session to process.`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
