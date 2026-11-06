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
(every prop, packed in hand-over order), and what to hand out before play. **Cue 9's Next button leads
to the level-up card**: the level 4 to 5 steps by class, and the nudge to Cody about Daylight and Plant
Growth. **Sunday** gets its own before-you-start card (level 5, rests, the recap). Both checklists have a
button to restart that day's clock; card zero has **Reset everything for the next run**.

Every other cue is split into two colour-coded zones on one screen; on a wide enough screen each
zone scrolls on its own, and below 700px they stack.

**SCOTT · narrate** (gold, left), top to bottom:
- **Do now** — a tickable card: every **✋ hand-over** for this cue (from the `PROPS` registry), the
  **📱 iPad → item N** bar, **⚔ tokens out** on fight cues, set-up (`EXEC.do`), and the cue's sound
  buttons.
- **🗂 Floating** — on every mansion cue: the sticky note and the site survey. The AIM-room cue's Do now
  has a last call for both.
- **Setting**, **Pacing** (numbered, ending on the line the scene ends on), **Read aloud**.
- **🎯 Leave knowing** — the must-land reveals, nothing else. **➜ Next** — how to get out, with jump
  buttons. On Sunday the buttons are a room picker: the rooms not yet done, then the AIM room.
- **🛟 Rescues** — 🪢 if stuck, ↪ backup path, and stall / split / skip / off-script lines.
- **⚔ Combat** — Running this fight, then a turn card per enemy with a tap HP tracker (kept while you
  flip cues, reset on reload).
- **Potential skill checks**, each with its DC or marked *no roll*, then **Reference**: every reveal,
  reminders and notes.

**SPENCER · voice** (pink, right): his lines, IF blocks, and each NPC with a one-line voicing and the
🔓 reveals they deliver or react to.

### Ticks and moving between cues
Ticks are saved on the device (`localStorage`; the page still works if storage is blocked). ‹ › step through
the cues in order, and each cue's Next buttons jump to where the story goes, including Sunday's room picker.
Moving forward with › or a Next button marks the cue done.

### The clock
One clock per day, saved on the device. It starts on the first cue you open that day and says how far
ahead or behind the rough plan (`EXEC.mins`) you are. Tap it to pause. A clock more than 10 hours old
starts again, so a read-through the night before doesn't count. The thin bar under the top bar is the
day's cues: done, here, to come.

Each cue's Rescues also carry **⏱ Behind** (what to compress) and **⏱ Ahead** (what to stretch); the
clock lights up whichever applies.

## Controls

| Key | Does |
|---|---|
| `←` `→` / `Space` | Previous / next cue |
| `1`–`6` | Toggle ambience (house, night wind, the '79 record, heartbeat, crowd, candles) |
| `7`–`0`, `g` `p` `c` `l` | Fire a sting (AIM, jump, braaam, 3AM bell, riser, speakers on, scratch, level-up) |
| `Shift`+`1`–`9` | The current cue's sounds, numbered as on the board: background first, then effects |
| `d` | Roll a d20 (flat / advantage / disadvantage) |
| `f` | Fullscreen |
| `Esc` | Close an overlay, or silence all sound |

The top bar has ‹ › cue buttons beside the counter, the day clock, and Full screen, all
44px, so it's fully touch-usable on the iPad. Nothing floats over the reading area.

## The soundboard

The sounds are short MP3s in [`sounds/`](sounds/), about 5 MB in all, played with the Web Audio API
(`fetch` + `decodeAudioData`, one `BufferSource` per play, so the iOS HTMLAudio bug in
[AGENTS.md](../AGENTS.md) can't bite them). They load in the background after you tap in, stings first; the
board shows `Sounds n/42` until they're in. They stay in the browser's Cache Storage on `https` and `localhost`, so the next open
needs no connection. If a file hasn't loaded, the original pads fall back to a live synth; the rest stay dimmed until they arrive.

The board opens with **This cue**: that cue's sounds, always in reach whatever Do now has scrolled to, split into **Background** (leave running) and **Effects** (fire on the moment) and numbered across both for `Shift`+`1`–`9`. Room pads latch on and off, fade in and out, and layer; stings are one-shots that overlap anything. **Silence** (or `Esc`) stops
all of it, stings included. A limiter on the master catches heavy layering.

The sounds were generated in ElevenLabs Sound Effects from the prompts in
[`sounds/src/make_sounds.py`](sounds/src/make_sounds.py); the AIM chime is the AIM prop's own `imrcv.wav`, heard from down a hall. The raw
generations are in `sounds/src/eleven/`. The script masters each one to its own loudness target, rolls off sub rumble a Bluetooth speaker
can't play, wraps each loop so the seam is sample-accurate and rewrites `sounds/manifest.js`, so anything changed there means bumping the `?v=` on
that script tag. It isn't part of the page and nothing at the table needs it. It needs `numpy` and `ffmpeg`.

To replace a sound, drop a new `sounds/src/eleven/<name>.mp3` in and run `python3 run/sounds/src/make_sounds.py --only <name>`. Deleting
that file falls back on the script's procedural version of the sound. With `ELEVENLABS_API_KEY` set in your own environment, `--eleven --only <name>`
fetches a missing one from the prompt.

## Not on the landing page — on purpose

Like the [codex](../codex/), this is **DM-facing and deliberately not tiled** on the root
`index.html`, so it can't be opened at the table by accident. Bookmark the URL, or Add to
Home Screen from Safari for a fullscreen booth.

## Editing the content

It's a single self-contained `index.html` plus `fights.js`. In the `<script>`:
- `SCENES` — the cues: setting, pace, read, rev, talk, npcs and so on. The level-up card is the scene `L5`.
- `PROPS` — every physical prop, who gets it and on which cue. Add a prop here, not on a scene; it feeds
  the cue's Do now and the props bag on card zero.
- `EXEC` — the table layer, keyed by scene no.: `mins`, `do`, `land`, `next` / `go`, `save`.
- `IPAD` — the players' iPad items.
