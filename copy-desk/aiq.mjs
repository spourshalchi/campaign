#!/usr/bin/env node
/* ------------------------------------------------------------------
   AI queue helper — the Claude side of the conversation editor.

   The editor POSTs "Ask AI" requests to the bridge, which appends them
   to copy-desk/.bridge/requests.jsonl and drops a `pending` marker.
   Claude uses this tool to see and clear the queue:

     node copy-desk/aiq.mjs list          # show pending requests (+ the target's current copy)
     node copy-desk/aiq.mjs done  <id> [note]
     node copy-desk/aiq.mjs error <id> [note]

   Between `list` and `done`, Claude edits copy-desk/dialogue.json to
   carry out the instruction. `done` flips the request status so the
   editor (which is polling) reloads dialogue.json and shows the change.
-------------------------------------------------------------------*/
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const REQ = resolve(HERE, '.bridge/requests.jsonl');
const PENDING = resolve(HERE, '.bridge/pending');
const DJSON = resolve(HERE, 'dialogue.json');

function readAll() { if (!existsSync(REQ)) return []; return readFileSync(REQ, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)); }
function writeAll(rows) { writeFileSync(REQ, rows.map((r) => JSON.stringify(r)).join('\n') + (rows.length ? '\n' : '')); }
function syncPending(rows) { if (rows.some((r) => r.status === 'pending')) return; if (existsSync(PENDING)) rmSync(PENDING); }

function targetCopy(target) {
  if (!target || !existsSync(DJSON)) return null;
  const m = JSON.parse(readFileSync(DJSON, 'utf8'));
  const n = m.nodes.find((x) => x.key === target.key);
  if (!n) return { note: `node "${target.key}" not found` };
  if (target.type === 'reply') return { node: n.key, reply_index: target.index, reply: n.choices[target.index] };
  return { node: n.key, lines: n.lines, choices: n.choices, soulNext: n.soulNext };
}

const cmd = process.argv[2] || 'list';
const rows = readAll();

if (cmd === 'list') {
  const pending = rows.filter((r) => r.status === 'pending');
  if (!pending.length) { console.log('No pending AI requests.'); process.exit(0); }
  console.log(`${pending.length} pending AI request(s):\n`);
  for (const r of pending) {
    console.log(`── ${r.id} ─────────────────────────────`);
    console.log(`target : ${JSON.stringify(r.target)}`);
    console.log(`ask    : ${r.instruction}`);
    console.log(`current: ${JSON.stringify(targetCopy(r.target), null, 2)}`);
    console.log('');
  }
  console.log('Edit copy-desk/dialogue.json to carry out each ask, then: node copy-desk/aiq.mjs done <id>');
} else if (cmd === 'done' || cmd === 'error') {
  const id = process.argv[3]; const note = process.argv.slice(4).join(' ') || null;
  const r = rows.find((x) => x.id === id);
  if (!r) { console.error('no such request:', id); process.exit(1); }
  r.status = cmd === 'done' ? 'done' : 'error';
  r.result = note; r.resolvedAt = new Date().toISOString();
  writeAll(rows); syncPending(rows);
  console.log(`${id} → ${r.status}`);
} else { console.error('usage: aiq.mjs list|done <id>|error <id>'); process.exit(1); }
