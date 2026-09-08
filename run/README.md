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

Each of the 18 cues maps to a moment in the [codex Story Flow](../codex/), enriched for live play:

- **Read aloud** — the boxed teleprompter line(s) or script to deliver / play.
- **The beats** — bullet points of what to communicate and do.
- **Potential skill checks** — the likely rolls, with suggested DCs (`*` = proposal).
- **Combat** — stat-block summary, XP, the hard rule for the fight, and an **Add to initiative** button.
- **In the scene** — the NPCs present, each with a one-line voicing reminder.
- **Reminders** — hand-outs (✋), rules (⚠), and level-ups (⬆) tied to that moment.
- **Suggested sound cues** — the soundboard buttons to reach for, highlighted on the board too.

## Controls

| Key | Does |
|---|---|
| `←` `→` / `Space` | Previous / next cue |
| `1`–`6` | Toggle ambience (house drone, rain, record skip, heartbeat, crowd, candles) |
| `7`–`0`, `g` `p` `c` `l` | Fire a sting (AIM, jump, braaam, 3AM bell, riser, PA, scratch, level-up) |
| `i` | Scene index (jump anywhere) |
| `t` | Initiative tracker |
| `h` | Hand-out checklist (saved on the device) |
| `r` | House rules + XP budgets |
| `d` | Roll a d20 (flat / advantage / disadvantage) |
| `f` | Fullscreen |
| `Esc` | Close an overlay, or silence all sound |

The top bar also has buttons for everything, and there are on-screen arrows — it's fully
touch-usable on the iPad.

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
top of the `<script>`; house rules in `CRULES` / `BUDGET`; the prep checklist in `HANDOUTS`.
Each is plain data — add a cue, a check or a reminder by editing the array.
