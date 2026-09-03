# Copy Desk

A single-page console for **reading and adjusting all the copy** across the campaign props,
so you can get every piece of text to a point you're happy to sign off on — then hand a clean
change list back to Claude to apply.

It never edits the props directly. It reads them, lets you edit/annotate, and exports a packet.

## The loop

```
open Copy Desk → read the copy in context → edit inline or drop a feedback note
   → Export changes → hand the packet to Claude → Claude applies + fact-checks against CANON.md
   → re-run the extractor → reload → keep going until you're happy
```

## Running it

Run the bridge — one process that serves the files, saves editor changes, and relays "Ask AI" to your Claude session:

```bash
node copy-desk/bridge.mjs
```

Then open **http://localhost:8177/copy-desk/**. (You can still use `python -m http.server 8000` for the read-only review desk, but the conversation **editor** needs the bridge.)

If you edited a prop by hand and want the review desk to catch up, regenerate its content:

```bash
node copy-desk/extract.mjs
```

## The AIM conversation editor

The **AIM** tab has an **✍️ Open conversation editor →** button (or go straight to
`/copy-desk/editor.html`). It's a full turn-by-turn editor:

- Every **message** and every **player reply** is its own node in the tree.
- Click any node to **edit directly**: add / delete / reorder lines, switch a line's speaker
  (ghost ↔ patron), add / delete / reorder replies, retarget where a reply goes, rename a node,
  set the start node, add or link brand-new nodes.
- Or hit **✨ Ask AI** on any node/reply and describe what you want ("make it colder", "add two
  lines that hint at the locker"). It goes to your Claude session, which makes the edit and the
  tree updates on its own.
- **⚙ Apply to prop** compiles the conversation back into `aim/index.html` — losslessly (values
  and dev-comments preserved).

### How "Ask AI" reaches Claude

The editor saves to `copy-desk/dialogue.json` (the working copy) and queues AI asks in
`copy-desk/.bridge/`. In your Claude Code session:

```bash
node copy-desk/aiq.mjs list        # see pending asks + the target's current copy
# …Claude edits copy-desk/dialogue.json to carry out each ask…
node copy-desk/aiq.mjs done <id>   # editor is polling — it reloads and shows the change
```

Ask Claude to **watch the queue** and it'll pick up requests as you send them. The data pipeline:

```
aim/index.html  ──(node dialogue.mjs export)──▶  dialogue.json  ◀──▶  editor / Ask AI
       ▲                                                │
       └──────────────(node dialogue.mjs compile)◀──────┘   ("Apply to prop")
```

## What each tab shows

Every artifact is reviewed in the shape it's actually experienced:

- **AIM — Ghost in the Machine** → the branching conversation as a **clickable tree**. Click any
  node to read it as an exchange and edit the ghost/patron lines and player replies. Orphan
  (unreachable) nodes and the ritual hand-off are flagged. There's also a plain **List** view.
- **The Codex** → a **relationship graph** overview (click a character to jump to its card) + a
  group jump-nav, then the codex's own grouped cards: characters, relationships, session flow,
  backstory, run of show, combat, props, names, and open questions. `not canon` / `doc` badges
  come straight from the status model in `CANON.md`.
- **Invite / Settlement / Photograph / Torn Page** → each built handout's copy, in reading order.

## Editing

- **Click any block of copy to edit it in place.** It shows the way it reads; click to get a text
  box, edit, click away. An `EDITED` badge and a blue marker show what you've changed; **↺ Revert**
  puts it back. Clearing a block to empty is a real edit (a cut line) and is kept.
- **Not sure how to fix it yourself?** Hit **💬 Feedback** on the card/node and describe what you
  want — that goes to Claude as a note instead of a direct edit.
- Everything is saved to your browser as you go (localStorage). It survives reloads on the same
  browser. It is **not** shared or backed up — export before switching machines.

## Exporting to Claude

- **⬇ Export changes** downloads two files: `copy-packet-*.json` (for Claude) and a readable
  `.md` version.
- **📋 Copy for Claude** puts the same thing on your clipboard to paste into a chat.

Each edit carries a **precise source location** (e.g. `codex/index.html :: NODES[id=bix].desc`), so
Claude applies it exactly — never a blind find/replace, which would be unsafe because many lines of
copy are identical (`no`, `TBD`, `Player Character`…).

## Files

| File | What it is |
|------|-----------|
| `index.html` | the console (self-contained; no build, no dependencies) |
| `extract.mjs` | reads the props → writes `content.json`. Re-run after any source change. |
| `content.json` | generated snapshot of every editable copy item (do not edit by hand) |

## Coverage note

`extract.mjs` prints a **codex coverage manifest** each run, listing which data arrays it pulled
copy from and which it deliberately skipped (e.g. `TODO_LIST`, the interactive checklist state).
If a new array is ever added to the codex and left unaccounted, the manifest flags it — so nothing
gets silently left out of review.
