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
├── settlement/       ← The 1931 Articles of Settlement (the drunken contract)
│   └── index.html
├── deed/             ← The deed to Dood Mansion — print it; Vinny hands it to Gnomey at the end
│   └── index.html
├── photo/            ← The party-room photograph (Bix's beat)
│   └── index.html
├── party-room/       ← The frozen party: spot the difference against the photograph (Yobo's turn)
│   └── index.html
├── codex/            ← DM-facing campaign codex (not linked from the landing page)
├── run/              ← DM-facing "Run of Show" — the day-of prompt book (not linked either)
├── CANON.md          ← canon ledger: what came from the brainstorm doc vs. what an AI made up
├── PROPOSALS.md      ← parked work-in-progress, agreed to by nobody
├── AGENTS.md         ← agent guide for adding new props (CLAUDE.md imports it)
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
| Torn Page | `puzzle/` | 1937 newspaper front page, cut up in front of them by a trap in the binding. Reassemble, flip for the page-2 lore, and check the pocket card for who borrowed it last — including **V. Soprano, 1938**, which is where Gnomey's tie to the house gets hinted. Springing the trap is what summons the developer to the house that night. See [puzzle/README.md](puzzle/README.md) |
| Invite | `invite/` | The haunted-house invitation, ~7PM, homemade and clip-arty. |
| Settlement | `settlement/` | The 1931 contract from the strongbox in the study. Opens folded; tap to unfold. Two drunk men signed away a mansion over $11.40, and **the only paragraph on the page with no corrections in it is the one that vests title in the bearer of the deed.** |
| Deed | `deed/` | The 1931 deed to Dood Mansion, print-ready on letter paper. Uncle Vinny has carried it since the night he won the house and hands it to Gnomey in the ending scene. **Print it at Staples** — it's Gnomey's physical prop. Deliberately not tiled on the landing page, so nobody finds it on the iPad before Vinny hands it over. |
| Photograph | `photo/` | A flash snapshot from the party room — two vampires mugging, a pregnant goblin laughing, and a fae with no fangs. Tap to turn it over for the writing on the back. Bix's beat: hand Will the iPad and say nothing. **Print it too** — the print is Bix's physical prop and the key to the party room. Still to add: the distinctive trait Will picks for Bix's parents. |
| Party room | `party-room/` | The frozen ghost-party, almost exactly the photograph. The table holds the printed photo and taps the six things in the live room that don't match it; misses tick the Revel meter toward a curdle. When the room is whole, the host calls for Yobo's song, with DM buttons for a true or a borrowed voice. |
| Codex | `codex/` | DM-facing campaign reference — to-do list, relationship web, backstory, story flow, cast, weekend plan, and **combat encounters with the XP budgets**. Not a player prop, and deliberately not tiled on the landing page so it can't be opened at the table by accident. |
| Run of Show | `run/` | DM-facing **day-of view** — the codex's story flow turned into an arrow-key prompt book. Each cue carries read-aloud text, beats, skill checks, combat stat blocks, NPC voicing, hand-out reminders, and a **synthesized soundboard** (ambience + stings, no files), plus an initiative tracker, d20 roller, hand-out checklist and session timer. Also DM-only and not tiled. See [run/README.md](run/README.md). |

### Not built yet

| Thing | Why it matters |
|---|---|
| `scream_test_03_GOOD.wav` | The recording that plays over the PA in the finale. The single biggest table moment in the campaign, and it's a file you hit play on. |
| A real USB stick | Handed to the players when the Spirit uploads. Put the .wav on it, and **set its volume label to the dead kid's name** — Sesh 8 makes the mount the moment the table learns who he is. |
| The wishing willow | The second thing in the backpack — the love-spell token Simone sold the dead kid, with *I want Angelique to notice me* on the slip. |
| DJ show flyer | 3AM, Dood Mansion, bills Poe Boy / Lil Stinky / Angelique. |
| Food-stash puzzle | The mansion's own puzzle — the one that clears the vampires. |
| Backstory reminders | One per PC: what each player should remember about their backstory going in. Digital. |
| Yobo's physical prop | Every PC gets one physical prop — Bix the printed photo, Gnomey the deed, Simone the wishing willow, Russ the badge and card. Yobo's isn't picked yet. |

## Print list

The live checklist is the codex to-do **"Print list — everything to take to Staples."** What goes on it:

| Print | Source | Status |
|---|---|---|
| Invitation | `/invite/` | Built |
| The deed | `/deed/` | Built — letter, aged paper |
| Russ's requirements card + the badge | `/badge/` | Built |
| The photograph | `/photo/` | Built — print after Will's trait for Bix's parents goes in |
| Articles of Settlement | `/settlement/` | Optional — it reads fine on the iPad |
| DJ poster | — | Not built (Spencer) |
| Backstory reminder cards | — | Not built |
| Concert tickets | — | Not built — needs the band name |

Handmade, not printed: the AIM sticky note (`Fluffy123`) and the wishing willow slip.

## Adding a new prop

See [AGENTS.md](AGENTS.md) for the full pattern + iPad/iOS gotchas. Short version:

1. `mkdir <prop-name>/`
2. Build `<prop-name>/index.html` (single self-contained file — HTML + CSS + JS + assets folder beside it)
3. Add a tile in the root `index.html` linking to `/<prop-name>/`
4. Test on the actual iPad (the audio bug from AGENTS.md is invisible on desktop)
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
