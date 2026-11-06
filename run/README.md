# Run of Show — the DM's day-of view

A cue-to-cue prompt book for running **Dood Mansion** live at the table. Flip through
the night one moment at a time, with everything you need to run that moment on screen.

**Live:** `https://spourshalchi.github.io/campaign/run/`

## What's on each slide

**Card zero is the pre-session checklist**: iPads and laptop, the print run, the room, the props bag
(every prop, packed in hand-over order) and Spencer's briefing, with **Reset everything for the next run**.
**Scene 0** is what Scott reads from to open the game. **Cue 9's Next button leads to the level-up card.**
**Sunday** has its own before-you-start checklist above its steps.

Every other cue is split into two colour-coded zones on one screen; on a wide enough screen each
zone scrolls on its own, and below 700px they stack.

**SCOTT · narrate** (gold, left), top to bottom:
- **One numbered list, in the order Scott does things** (`steps`): sounds to tap in place, read-alouds,
  instructions, checks with their DC, **✋** hand-overs and set-up lines with a tick box, **📱** digital props
  with an open button, tokens, and a big link to the fight's page, `combat/?f=<key>`, which opens over the stage so the soundboard stays up. Notes, reveals, **🪢 If stuck** and **↪ Backup path**
  lines hang off the step they belong to.
- **➜ Next** — how to get out, with jump buttons. On Sunday the buttons are a room picker: the rooms not yet
  done, then the AIM room.

**SPENCER · voice** (pink, right): one card per person: their name, who they are and how they sound, then a numbered list of what to say in order, with each sample line on its point. IF blocks and reveals sit inside the same card.

### Ticks and moving between cues
Ticks are saved on the device (`localStorage`; the page still works if storage is blocked). ‹ › step through
the cues in order and stop at the first and last cards, and each cue's Next buttons jump to where the story goes, including Sunday's room picker.
Moving forward with › or a Next button marks the cue done. The page reopens on the card you were last on; Reset goes back to card zero.

## Controls

| Key | Does |
|---|---|
| `←` `→` / `Space` | Previous / next cue |
| `1`–`6` | Toggle ambience (house, night wind, the '79 record, heartbeat, crowd, candles) |
| `7`–`0`, `g` `p` `c` `l` | Fire a sting (AIM, jump, braaam, 3AM bell, riser, speakers on, scratch, level-up) |
| `Shift`+`1`–`9` | The current cue's sounds, numbered as on the board: background first, then effects |
| `d` | Roll a d20 (flat / advantage / disadvantage) |
| `f` | Fullscreen |
| `Esc` | Close the dice, or silence all sound |

The top bar has ‹ › cue buttons beside the counter, and Full screen, all 44px, so it's fully touch-usable on the iPad. Nothing floats over the reading area.

## The soundboard

The sounds are short MP3s in [`sounds/`](sounds/), about 5 MB in all, played with the Web Audio API
(`fetch` + `decodeAudioData`, one `BufferSource` per play, so the iOS HTMLAudio bug in
[AGENTS.md](../AGENTS.md) can't bite them). They load in the background after you tap in, stings first; the
board shows `Sounds n/42` until they're in. They stay in the browser's Cache Storage on `https` and `localhost`, so the next open
needs no connection. If a file hasn't loaded, the original pads fall back to a live synth; the rest stay dimmed until they arrive.

The board opens with **This cue**: that cue's sounds, always in reach however far the steps have scrolled, split into **Background** (leave running) and **Effects** (fire on the moment) and numbered across both for `Shift`+`1`–`9`. Room pads latch on and off, fade in and out, and layer; stings are one-shots that overlap anything. **Silence** (or `Esc`) stops
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

`index.html` is the engine, layout, CSS and soundboard. The content is in plain script files, with no build step,
loaded in this order:

| File | Holds |
|---|---|
| `fights.js` | Every fight's stat lines (also read by `combat/`) |
| `scenes/pre.js` | `IPAD` (the players' iPad items), `PROPS` (every physical prop, who gets it and on which cue) and the pre-session card. The step kinds are listed at the top of `const SCENES` here |
| `scenes/town.js` | Scene 0 and cues 1 to 4 |
| `scenes/night.js` | Cues 5 to 9 and the level-up card |
| `scenes/sunday.js` | Sunday's start card, cues 10 to 13, Dracula's scare and the reserve fight |
| `scenes/finale.js` | Cues 14 to 16 |

Each scene is one object: `steps` is Scott's list; `next` and `go` are the Next text and its jump buttons (`go:"rooms"` is
Sunday's room picker); `talk`, `ifblock`, `rev`, `npcs` and `spBrief` are Spencer's panel: on an NPC, `vc` is one short line on who they are and `pts` is what to say, in order. A line in `talk` goes on the point it shares the most words with; use `{t:"point", say:"line"}` in `pts` to place one by hand;
`cues` fills the soundboard's This cue row. To add a prop, add it to `PROPS` and a `{hand:id}` step on its scene.

**After editing a content file, bump that file's `?v=` on its script tag in `index.html`**, or an iPad that already has
it will keep the old copy.
