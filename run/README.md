# Run of Show — the DM's day-of view

A cue-to-cue prompt book for running **Dood Mansion** live at the table. Flip through
the night one moment at a time, with everything you need to run that moment on screen.

**Live:** `https://spourshalchi.github.io/campaign/run/`

> ## 🟡 Canon status
>
> **This is a DM aid, not a source of canon.** Nothing here becomes true by being on a slide.
>
> - **Read-aloud lines, scripts and bridge cues** are pulled from the [codex](../codex/) —
>   they are DM-side suggestions and staging, not player-facing fact. Canon is what Scott has signed
>   off in [CANON.md](../CANON.md).
> - **Skill-check DCs marked with `*`** are proposals invented for this tool to give you a
>   number to work from. Tune them freely.
> - **Combat stat blocks** come from `fights.js`: the beats are settled, every number is a proposal.
> - **Everything marked 🟡** — reveals, Leave knowing, Next, Rescues, the clock plan — is AI staging
>   waiting on Scott (logged in CANON.md, *The Run of Show's table layer*).
>
> If you change a beat here, change it in the codex and CANON.md too. This file is the last link
> in that chain, never the first.

## What's on each slide

**Card zero is the pre-session checklist**: iPads and laptop, the print run, the room, the props bag
(every prop, packed in hand-over order), and what to hand out before play. **Sunday** gets its own
before-you-start card (level 5, rests, what's already out, the recap). Both have a button to restart
that day's clock; card zero has **Reset everything for the next run**.

Every other cue is split into two colour-coded zones on one screen; on a wide enough screen each
zone scrolls on its own, and below 700px they stack.

**SCOTT · narrate** (gold, left), top to bottom:
- **Do now** — a tickable card: every **✋ hand-over** for this cue (from the `PROPS` registry), the
  **📱 iPad → item N** bar, **⚔ tokens out** on fight cues, set-up (`EXEC.do`), and the cue's sound
  buttons. Anything not ticked on an earlier cue comes back at the top as **Missed**; the two floating
  finds come back as **Last chance** on the AIM-room cue.
- **🗂 Floating** — on every mansion cue: the sticky note and the site survey.
- **Setting**, **Pacing** (numbered, ending on the line the scene ends on), **Read aloud**.
- **🎯 Leave knowing** — the must-land reveals, nothing else. **➜ Next** — how to get out, with jump
  buttons. On Sunday the buttons are a room picker: the rooms not yet done, then the AIM room.
- **🛟 Rescues** — 🪢 if stuck, ↪ backup path, and stall / split / skip / off-script lines.
- **⚔ Combat** — Running this fight, then a turn card per enemy with a tap HP tracker (kept while you
  flip cues, reset on reload).
- **Potential skill checks**, then **Reference**: every reveal, reminders and notes.

**SPENCER · voice** (pink, right): his lines, IF blocks, and each NPC with a one-line voicing and the
🔓 reveals they deliver or react to.

### The ticks are the props tracker
Ticks are saved on the device (`localStorage`; the page still works if storage is blocked). Ticking a
hand-over on any cue marks that prop as out everywhere. **Props** in the top bar shows what's missed,
what's still in the bag and what's out. **Index** is the run sheet: every cue with its planned start,
and a done box. Moving forward with › (or a Next button) marks the cue done.

### The clock
One clock per day, saved on the device. It starts on the first cue you open that day and says how far
ahead or behind the rough plan (`EXEC.mins`) you are. Tap it to pause. A clock more than 10 hours old
starts again, so a read-through the night before doesn't count. The thin bar under the top bar is the
day's cues: done, here, to come.

### Spencer's view
`/run/?spencer` (or the link on the splash) opens a phone view with no audio: every cue's lines, IF
blocks, NPCs and reveals in one scroll with jump chips, or a **By NPC** tab that regroups everything
each NPC says and reveals across the weekend.

## Controls

| Key | Does |
|---|---|
| `←` `→` / `Space` | Previous / next cue |
| `1`–`6` | Toggle ambience (house drone, rain, record skip, heartbeat, crowd, candles) |
| `7`–`0`, `g` `p` `c` `l` | Fire a sting (AIM, jump, braaam, 3AM bell, riser, PA, scratch, level-up) |
| `i` | Run sheet (jump anywhere, tick cues done) |
| `d` | Roll a d20 (flat / advantage / disadvantage) |
| `f` | Fullscreen |
| `Esc` | Close an overlay, or silence all sound |

The top bar has ‹ › cue buttons beside the counter, the day clock, and Props, Index and Full, all
44px, so it's fully touch-usable on the iPad. Nothing floats over the reading area.

## The soundboard

All audio is **synthesized live with the Web Audio API** — there are no sound files to load,
so it works offline and drops nothing on iPad (the HTMLAudio bug in the root
[CLAUDE.md](../CLAUDE.md) can't bite it). Ambience buttons latch on/off and can be layered;
stings are one-shots. The single `audioCtx.resume()` unlock happens when you tap in on the
splash. **Silence** (or `Esc`) kills every ambience loop at once.

## Not on the landing page — on purpose

Like the [codex](../codex/), this is **DM-facing and deliberately not tiled** on the root
`index.html`, so it can't be opened at the table by accident. Bookmark the URL, or Add to
Home Screen from Safari for a fullscreen booth.

## Editing the content

It's a single self-contained `index.html` plus `fights.js`. In the `<script>`:
- `SCENES` — the cues: setting, pace, read, rev, talk, npcs and so on.
- `PROPS` — every physical prop, who gets it and on which cue. Add a prop here, not on a scene.
- `EXEC` — the table layer, keyed by scene no.: `mins`, `do`, `land`, `next` / `go`, `save`.
- `IPAD` — the players' iPad items.
