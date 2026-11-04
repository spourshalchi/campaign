# Campaign Props — Agent Guide

This repo holds a collection of single-page, themed, interactable webpages used as in-game props during D&D sessions, hosted on GitHub Pages. Players interact with them on an iPad at the table.

## Canon discipline — read before writing any lore

**The repo is the source of truth.** The old brainstorm Google Doc is retired; its `Sesh N` sessions stay
as history and are still cited. **Canon means Scott (or Spencer) reviewed it and signed off.** Nothing an
agent writes is canon until then — props and the codex have previously invented whole characters, dates,
documents and motives that then got treated as established fact.

**The review loop:** a session builds something and ships it live with the 🟡 *Not canon yet* flag → the
manager session sends Scott the links → Scott reviews and signs off → the flag flips to canon and the
`CANON.md` row cites `Scott, <date>`. Content does not wait for sign-off to go live; it waits to lose the flag.

- Read **[CANON.md](CANON.md)** before adding or changing any story detail.
- Anything you invent — a name, a date, an NPC's motive, a connective story beat — ships as
  **🟡 not canon yet** and gets logged in `CANON.md` with a note on where it came from.
- In the codex, that means `s:"ai"` on the data item (or an `ai:"..."` note on an otherwise
  signed-off item). The badge and the **Not Canon Yet** tab — Scott's review queue — render themselves from
  that field. Give queue items a link to the live page (`url:` on to-dos, a `/prop/` path in DOCS) so Scott
  can review in one tap. A built prop or handout that is waiting on Scott gets `review:1` on its to-do.
- In a prop, that means a canon-status banner at the top of the prop's README/brief.
- Half-finished design work goes in `PROPOSALS.md`, never into the codex as fact.
- Never write "Answered" or "Locked" next to something Scott hasn't decided. If a source hedges
  ("could be", "up to you if we go with it"), the codex hedges too.
- **Cite the source.** `Sesh 5`, `Character Bios`, `the 24 Aug doc paste` for history from the retired doc;
  `Scott, <date>` (or `Spencer, <date>`) for a decision made in conversation or a sign-off.
- **⛔ Never invent a Sesh number.** Sessions existed only in the retired Google Doc and only Scott created
  them. Do not coin one as a placeholder or a "safe assumption" — it fabricates a source, and the next
  reader cannot tell it from a real citation. New decisions are cited `Scott, <date>`. See the rule box in
  `CANON.md`.
- **Fact-check against canon before proposing anything.** Grep the repo (codex data arrays, prop copy,
  `CANON.md`) for the specific fact — times, names, who-knows-what, who-was-where — *before* writing prose.
  Contradicting canon, reusing a sensory beat that belongs to a later scene, or asserting a detail canon
  leaves deliberately blank all count as failures. When a contradiction surfaces, name it and cite the
  source line instead of quietly writing around it.
- **No changelog prose in the codex or props.** No "no longer", "previously", "superseded", "used to",
  "Decided by Scott on <date>". State the current plan as if it had always been the plan; rewrite text in
  place. Decision history belongs in `CANON.md`, which is the ledger. Canon *status* (`s:"doc"` / `s:"ai"`,
  `Sesh N` citations, `ai:` notes) is sourcing, not changelog — keep it.
- **Naming note:** "the codex" in this repo means the campaign codex at `codex/index.html`, not the Codex
  coding agent.

## Layout convention

Each prop is a **self-contained folder at the repo root**. No build step, no framework, no shared dependencies — every prop must be openable as raw HTML.

```
.
├── README.md           # human-facing overview
├── AGENTS.md           # this file (agent guide; read by Codex and, via CLAUDE.md, Claude Code)
├── CLAUDE.md           # one-line import of AGENTS.md
├── index.html          # landing page listing all props
├── <prop-name>/
│   ├── index.html      # the entire prop (HTML + CSS + JS inline)
│   └── (assets/)       # sounds, images, etc.
└── split_sounds.py     # WAV-dump → individual clips utility
```

Prop folder names: lowercase, hyphen-separated, short noun (`aim`, `radio`, `seance`, `answering-machine`).

URL pattern: `https://spourshalchi.github.io/<repo>/<prop-name>/`.

## iPad/iOS gotchas — non-negotiable

The AIM prop demonstrates working solutions for all of these. **Read its `index.html` before writing a new prop's audio or interaction code.**

### Audio: Web Audio API only — never HTMLAudio.

iOS WebKit (which Chrome on iPad is forced to use too) silently drops overlapping short HTMLAudio clones. Symptom: rapid-fire sounds randomly fail to play, only on iPad. Use the Web Audio pattern:

- `fetch()` + `audioCtx.decodeAudioData()` once per sound at load → `AudioBuffer`
- Fire-and-forget `BufferSource` per `play()` call (auto-GC'd, supports concurrency)
- Single `audioCtx.resume()` during a user gesture unlocks the whole context

### Audio unlock requires a user gesture.

iOS blocks audio until the user taps. Gate the prop behind a thematic splash whose tap calls `audioCtx.resume()` and any unlock side effects. Even a "warmup loop" through HTMLAudio will leak audible chunks of every sound on the first tap — Web Audio's single `resume()` is silent.

### Required `<head>` meta tags for every prop:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="<short prop name>">
<meta name="theme-color" content="<#hex>">
```

These let players Add to Home Screen and launch the prop fullscreen with no Safari chrome — the table-ready presentation mode.

### Layout & input.

- Tap targets ≥44px; no hover-only states (mobile Safari fakes hover and it gets weird).
- Use `100dvh` not `100vh` (Safari toolbar collapse changes vh mid-session).
- Honor `env(safe-area-inset-*)` for notched devices.
- Block pinch-zoom in JS (`touchmove` + `e.scale !== 1`).
- `overscroll-behavior: none` on `body` to kill the rubber-band scroll.
- `* { -webkit-tap-highlight-color: transparent; }` to kill the gray flash on tap.
- `-webkit-user-select: none` on UI chrome; allow `text` selection on prose so players can copy clues if useful.

## Style direction

Retro is the through-line. Pick a different era + UI metaphor per prop. Lean hard — atmosphere is the point.

| Built / Slot | Era + Metaphor                                          |
|--------------|---------------------------------------------------------|
| `aim`        | 2000s AOL Instant Messenger                             |
| (open)       | 1980s answering machine — red blinking light, tape hiss |
| (open)       | 1990s BBS terminal — green phosphor, modem handshake    |
| (open)       | Cold War radio scanner — static between bands, dial knob|
| (open)       | Victorian séance / Ouija — parchment, candle flicker    |
| (open)       | DOS dungeon text adventure — ASCII art, blocking input  |

Period-correct fonts, beveled chrome, scanlines, gradients. **Dialogue/clue text must stay legible** at table distance — ≥14px, high contrast — even when chrome is heavily atmospheric.

## Reusable patterns from the AIM prop

- **Branching dialogue tree** (`DIALOGUE` JSON → `runNode(key)`): copy-paste into any prop with a conversational entity. Replace nodes, keep the engine. Schema: `{ ghost: [lines], choices: [{text, next}] }`. `choices: []` means terminal node (signs off).
- **Sign-on splash** as audio-unlock gate: reuse the pattern, restyle the splash to match the new prop's era (sign-on screen → tape rewind → radio warmup → séance candle, etc).
- **Web Audio block** (preload + unlock + play): copy intact, only swap the `CONFIG.sounds` paths.

## Deployment

GitHub Pages, branch `main`, folder `/ (root)`. Set once at repo creation; nothing to do per-prop.

**Push to `main` → live in ~30–60 seconds.** No build, no CI.

## Local testing

`file://` does NOT work — `fetch()` and audio won't load. Always serve via HTTP:

```bash
python -m http.server 8000
# http://localhost:8000 in any browser
# http://<LAN-ip>:8000 from iPad on the same Wi-Fi
```

The audio bug above is invisible on desktop browsers. **Always test new props on an actual iPad over the LAN before a session, not just localhost.**

## Audio asset prep

If a sound source comes as one WAV dump with multiple clips:

```bash
python split_sounds.py
```

Detects silent gaps, outputs `sounds/clip_NN.wav`. Listen and rename to whatever the prop expects. Tweak the threshold knobs at the top of the script if splits are wrong. Update `INPUT_PATH` to point at the new prop's dump file before running.

## Adding a new prop — checklist

1. `mkdir <prop-name>/`
2. Create `<prop-name>/index.html` with the required meta tags
3. Copy AIM's Web Audio block + sign-on splash pattern if the prop needs sound — do not reinvent
4. Add `<prop-name>/<assets>/` for sounds, images, etc.
5. Add a tile to the root `index.html` linking to `/<prop-name>/`
6. Test locally on the iPad over LAN (not just desktop)
7. Commit + push to `main`; redeploy in ~1 min
8. Cache-bust on iPad: append `?v=<n>` to the URL or delete + re-add the home-screen icon

## Don't do this

- Use `<audio>` elements + `cloneNode()` for playback — see Audio gotcha
- Add a build step, framework, npm dependency, or transpiler
- Skip the iOS meta tags — Add to Home Screen breaks silently and the prop loses its app feel
- Test only on desktop and ship — the audio bug only manifests on iPad
- Use `file://` for local testing — `fetch()` and audio fail mysteriously
- Hardcode the repo name in prop code; only README/AGENTS reference it (so the repo can be renamed cleanly)
