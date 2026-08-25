# Campaign — D&D Table Props

A growing collection of single-page, themed, interactable webpages used as in-game props during D&D sessions. Players touch them on an iPad at the table.

Hosted on GitHub Pages. Live at **https://spourshalchi.github.io/campaign/** (rename pending).

## What's in here

```
.
├── index.html        ← landing page (Programs menu)
├── aim/              ← Haunted AOL Instant Messenger prop
│   ├── index.html
│   └── sounds/
├── puzzle/           ← Torn newspaper page prop
│   ├── index.html
│   ├── README.md
│   └── assets/
├── codex/            ← DM-facing campaign codex (not linked from the landing page)
├── CANON.md          ← canon ledger: what came from the brainstorm doc vs. what an AI made up
├── PROPOSALS.md      ← parked work-in-progress, agreed to by nobody
├── CLAUDE.md         ← agent guide for adding new props
├── README.md         ← this file
└── split_sounds.py   ← utility for splitting WAV dumps into clips
```

## Canon

The story lives in the [brainstorm doc](https://docs.google.com/document/d/1UXole4uGten28LVWA-ePK14ten4GIOj_ZfYEnsIRuWM/edit) — that's the only place canon is made.
Props and the codex have generated a lot of connective tissue on their own, so **[CANON.md](CANON.md)**
tracks every claim as either 📗 *in doc* (with the session it came from) or 🟡 *not canon* (invented here).
The codex renders the same statuses as badges and has a **Not Canon Yet** tab.

## Current props

| Prop | Path | Vibe |
|------|------|------|
| AIM | `aim/` | Haunted 2000s AOL Instant Messenger. The buddy is the kid Poe Boy soul-caged into the machine — the branching tree pulls the whole confession out of him, and ends with him **sending the party a file**: the recording of his own death, over AIM's file-transfer window. That USB is what wins the finale. |
| Torn Page | `puzzle/` | 1937 newspaper front page, torn up. Reassemble against the clock, flip for the page-2 lore. Breaking the ward is also what summons the developer to the house that night. See [puzzle/README.md](puzzle/README.md) |
| Invite | `invite/` | The haunted-house invitation, ~7PM, homemade and clip-arty. |
| Codex | `codex/` | DM-facing campaign reference — to-do list, relationship web, backstory, story flow, cast, weekend plan, and **combat encounters with the XP budgets**. Not a player prop, and deliberately not tiled on the landing page so it can't be opened at the table by accident. |

### Not built yet

| Thing | Why it matters |
|---|---|
| `scream_test_03_GOOD.wav` | The recording that plays over the PA in the finale. The single biggest table moment in the campaign, and it's a file you hit play on. |
| A real USB stick | Handed to the players when the Spirit uploads. Put the .wav on it. |
| DJ show flyer | 3AM, Dood Mansion, bills Poe Boy / Lil Stinky / Angelique. |
| Food-stash puzzle | The mansion's own puzzle — the one that clears the vampires. |

## Adding a new prop

See [CLAUDE.md](CLAUDE.md) for the full pattern + iPad/iOS gotchas. Short version:

1. `mkdir <prop-name>/`
2. Build `<prop-name>/index.html` (single self-contained file — HTML + CSS + JS + assets folder beside it)
3. Add a tile in the root `index.html` linking to `/<prop-name>/`
4. Test on the actual iPad (the audio bug from CLAUDE.md is invisible on desktop)
5. Push to `main`. GitHub Pages redeploys in ~30–60 seconds.

## Local preview

`file://` doesn't work — `fetch()` and audio are blocked. Always serve via HTTP:

```bash
python -m http.server 8000
# Open http://localhost:8000 in any browser
# Or http://<your-LAN-ip>:8000 from the iPad on the same Wi-Fi
```

## iPad setup at the table

1. In Safari on the iPad, open the live URL above
2. Tap **Share** → **Add to Home Screen** → **Add**
3. Launch from the home screen icon — fullscreen, no Safari chrome, looks like a real app
4. After any update push, cache-bust by appending `?v=<n>` to the URL or delete + re-add the icon

## Audio asset prep

If a sound source comes as one big WAV with multiple clips:

```bash
python split_sounds.py
```

Detects silent gaps and chops the file into numbered clips. Tweak the constants at the top of the script if it splits poorly. Update `INPUT_PATH` to point at the dump file for your new prop first.
