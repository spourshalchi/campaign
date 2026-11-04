# Run of Show — the DM's day-of view

A cue-to-cue prompt book for running **Dood Mansion** live at the table. Flip through
the night one moment at a time, with everything you need to run that moment on screen.

**Live:** `https://spourshalchi.github.io/campaign/run/`

> ## 🟡 Canon status
>
> **This is a DM aid, not a source of canon.** Nothing here becomes true by being on a slide.
>
> - **Read-aloud lines, scripts and bridge cues** are pulled from the [codex](../codex/) —
>   they are DM-side suggestions and staging, not player-facing fact. The story is decided
>   only in the [brainstorm doc](https://docs.google.com/document/d/1UXole4uGten28LVWA-ePK14ten4GIOj_ZfYEnsIRuWM/edit).
>   See [CANON.md](../CANON.md).
> - **Skill-check DCs marked with `*`** are proposals invented for this tool to give you a
>   number to work from. They are **not** in the doc — tune them freely.
> - **Combat stat blocks** mirror the codex's Combat tab, where *the beats are settled but
>   every number is a proposal.*
>
> If you change a beat here, change it in the doc first, then the codex, then this. This file
> is the last link in that chain, never the first.

## What's on each slide

Each of the 18 cues maps to a moment in the [codex Story Flow](../codex/), enriched for live play.
Scott and Spencer share one laptop, so every cue is split into two colour-coded zones on one screen;
on a wide enough screen each zone scrolls on its own, and below 700px they stack.

**SCOTT · narrate** (gold, left)
- **✋ Hand over** — every physical hand-out, on the cue where it goes to the table.
- **📱 iPad → item N** — which numbered item to open on the players' iPad.
- **🗂 Floating** — on every mansion cue: the sticky note and the site survey, each with a handed-over checkbox (saved on the device).
- **Read aloud** — the boxed teleprompter narration.
- **⚔ Combat** — rolls, initiative and turn order stay at the table. The cue gives the fight's story rule and an **enemy turn card** per enemy type: what it does in priority order, its attacks (to-hit, damage), AC, special rules, and a tap-to-subtract HP tracker per enemy (kept while you flip cues). Numbers are 🟡 drafts from the codex encounters.
- **🪢 If stuck / ↪ Backup path** — a fail-forward on every puzzle, and a second route to each big reveal.
- **🔓 Reveals** — what someone learns from Scott's narration or a prop.
- **Reminders** — rules (⚠) and level-ups (⬆) tied to that moment.
- **The beats**, **skill checks** (`*` = proposed DC) and **sound cues** (highlighted on the board too).

**SPENCER · voice** (pink, right)
- **Lines** — the dialogue script: who says what.
- **IF blocks** — lines that only play on a condition (Marcus over the speakers, if Simone paid the goat).
- **NPCs** — everyone in the scene with a one-line voicing, and the **🔓 Reveals** they deliver or react to.

**🔓 Reveal** markers say who learns what: the players, one PC, or an NPC. When one fires,
both of you play the reaction. Every reveal is 🟡 AI staging until Scott reviews it.

## Controls

| Key | Does |
|---|---|
| `←` `→` / `Space` | Previous / next cue |
| `1`–`6` | Toggle ambience (house drone, rain, record skip, heartbeat, crowd, candles) |
| `7`–`0`, `g` `p` `c` `l` | Fire a sting (AIM, jump, braaam, 3AM bell, riser, PA, scratch, level-up) |
| `i` | Scene index (jump anywhere) |
| `d` | Roll a d20 (flat / advantage / disadvantage) |
| `f` | Fullscreen |
| `Esc` | Close an overlay, or silence all sound |

The top bar has ‹ › cue buttons beside the counter, plus Index and Full, so it's fully
touch-usable on the iPad. Nothing floats over the reading area.

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

It's a single self-contained `index.html`. The slides live in the `SCENES` array near the
top of the `<script>`, with the iPad items in `IPAD` and the floating props in `FLOATING`.
Each is plain data — add a cue, a hand-over (`hand`), a reveal (`rev`) or a line (`talk`) by editing the array.
