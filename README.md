# Campaign — D&D Table Props

A growing collection of single-page, themed, interactable webpages used as in-game props during D&D sessions. Players touch them on an iPad at the table.

Hosted on GitHub Pages. Live at **https://spourshalchi.github.io/campaign/** (rename pending).

## What's in here

```
.
├── index.html        ← iPad home: numbered items 1–2 in story order, digital props only
├── aim/              ← Haunted AOL Instant Messenger prop
│   ├── index.html
│   └── sounds/
├── puzzle/           ← Torn newspaper page prop
│   ├── index.html
│   ├── README.md
│   └── assets/
├── backstory/        ← One backstory reminder card per PC (print)
├── print/            ← DM print kit: Staples-ready PDFs, the 4×6 photograph + build.py (not tiled)
│   ├── index.html
│   ├── photo-4x6.html ← source for photo-4x6.jpg, the party-room photograph (Bix's beat)
│   ├── src/          ← print-only sources: deed, settlement, badge, tickets, battle tokens (+ tokens/: the portraits; assets/: wax seal, badge art)
│   └── assets/photograph.jpg  ← the painting itself
├── codex/            ← DM-facing campaign codex (not linked from the landing page)
├── run/              ← DM-facing "Run of Show" — the day-of prompt book (not linked either)
├── CANON.md          ← old decision log, kept as history
├── PROPOSALS.md      ← parked work-in-progress, agreed to by nobody
├── AGENTS.md         ← agent guide for adding new props (CLAUDE.md imports it)
├── README.md         ← this file
└── split_sounds.py   ← utility for splitting WAV dumps into clips
```

## What's in the game

The [Run of Show](run/) plus the printed and shown assets are what's in the game. The [codex](codex/) is reference; they win where it disagrees.

## The iPad home page

The landing page is what the players' iPad shows all night: two big numbered items in the order the story reaches them, labelled by room so nothing on the page spoils a scene. The [Run of Show](run/) puts **📱 iPad → item N** at the top of every cue that needs one, so the DM just taps the number.

| # | Tile | Prop | Cue |
|---|------|------|-----|
| 1 | The Library | `puzzle/` — the torn Crier page | 3 · the hall of records, after the fight |
| 2 | The Computer | `aim/` | 13 · the old rig upstairs, always last |

Sunday's three rooms run in any order and are all paper. Item 2 opens AIM with the dead kid already named Marcus Hale (the drive mounts as `MARCUS_HALE`); `aim/?name=` still overrides it. **Digital props only:** anything printed (the photograph, Yobo's cards, Orlok's ledger, the survey, the settlement, the deed) is a hand-over, never an iPad item. The DM pages (codex, run, print) are deliberately not on it either.

## Current props

| Prop | Path | Vibe |
|------|------|------|
| AIM | `aim/` | Haunted 2000s AOL Instant Messenger. The buddy is the kid Poe Boy soul-caged into the machine — the branching tree pulls the whole confession out of him, and ends with him **sending the party a file**: the recording of his own death, over AIM's file-transfer window. That USB is what wins the finale. |
| Torn Page | `puzzle/` | 1937 newspaper front page, cut up in front of them by a trap in the binding. Reassemble, flip for the page-2 lore, and check the pocket card for who borrowed it last — including **V. Soprano, 1938**, which is where Gnomey's tie to the house gets hinted. Springing the trap is what summons the developer to the house that night. See [puzzle/README.md](puzzle/README.md) |
| Invite | `print/src/invite.html` (print only) | Spencer's card, as he made it: a haunted house under an orange moon, *Haunted House · Dood Mansion · 8 PM*. It never names the host. Six copies, one per locker and a spare. |
| DJ poster | `print/src/poster.html` (print only) | Spencer's purple collage, as he made it: *Haunted Bash · 3 AM · Dood Mansion · DJ Poe Boy · Lil Stinky · Angelique*. In the story it's on the locked AIM-room door; Scott narrates it. |
| Settlement | `print/src/settlement.html` (print only) | The 1931 contract from the strongbox in the study, with the Dood wax seal. Two drunk men signed away a mansion over $11.40, and **the only paragraph on the page with no corrections in it is the one that vests title in the bearer of the deed.** |
| Deed | `print/src/deed.html` (print only) | The 1931 deed to Dood Mansion, with the Dood wax seal. Uncle Vinny has carried it since the night he won the house and hands it to Gnomey in the ending scene. **Print it at Staples** — it's Gnomey's physical prop. |
| Photograph | `print/photo-4x6.jpg` | **Print only.** A 1979 snapshot from the party room — two vampires mugging, a pregnant goblin laughing, and a fae with no fangs — full bleed, with the orange `10 31 '79` date stamp. A Staples 4×6 photo print; no back side. Bix's beat: hand Will the print and say nothing. |
| Tickets | `print/src/tickets.html` (print only) | Two 2004 Ticketmaster-style concert tickets to **Total Party Kill**, bought under **LIVINGSWORTH III / UPTON M** — what Poe Boy's mother hands Simone in the ending scene. Playing the Transyltown Armory, Sat Jun 25 2005 — every field is filled in and editable on the page. |
| Backstory cards | `backstory/` | One small reminder card per PC (all five on one printed sheet): a few lines that set up that character's story this weekend, and nothing they don't know yet. Hand them out before play. |
| Ledger | `ledger/` | **Print only at the table.** Orlok's register of patients: one printed page, found on the lectern in the cellar. It shows the clinic and points at the Sun's-mercy. The web page is the DM's copy, with a short DM brief under it. |
| Codex | `codex/` | DM-facing campaign reference — to-do list, relationship web, backstory, story flow, cast, weekend plan, and **combat encounters with the XP budgets**. Not a player prop, and deliberately not tiled on the landing page so it can't be opened at the table by accident. |
| Run of Show | `run/` | DM-facing **day-of view** — the codex's story flow turned into an arrow-key prompt book. Each cue is split into a **Scott · narrate** zone (✋ hand-overs, the iPad item, read-aloud, beats, checks) and a **Spencer · voice** zone (lines and NPC voicing), with 🔓 reveal markers and a **synthesized soundboard** (ambience + stings, no files). Combat is run at the table; the cue just names the fight and its story rule. Also DM-only and not tiled. See [run/README.md](run/README.md). |

### Not built yet

| Thing | Why it matters |
|---|---|
| A real USB stick | Handed to the players when the Spirit uploads. **Set its volume label to `MARCUS_HALE`** — Sesh 8 makes the mount the moment the table learns who he is. The recording itself is narrated at the table; there is no audio file. |
| The wishing willow | The second thing in the backpack — the love-spell token Simone sold the dead kid, with *I want Angelique to notice me* on its tag. Scott makes the token by hand; the tag prints on the badge sheet (`print/src/badge.html`). |

## Print list

Everything to print lives in the **print kit at [`print/`](print/)**: seven Staples orders (cardstock, the deed on cream cardstock, plain paper, the poster, blank character sheets, the DM's combat cheat sheet and one photo print), with the exact settings to pick and a cutting guide. The codex to-do **"Print list — everything to take to Staples"** tracks what's in hand.

| File | Paper | What's in it |
|---|---|---|
| `print/1-cardstock.pdf` | Letter cardstock, colour, 1-sided, 1 copy | Invitations ×6, Russ's card, the badge, the concert tickets, the backstory cards, Yobo's two secret cards, the battle tokens |
| `print/photo-4x6.jpg` | Staples photo print: 4×6, glossy or lustre, 1 print (same-day at most stores) | The photograph (Will's trait is painted in) |
| `print/3-deed.pdf` | Letter cardstock, cream or parchment, colour, 1-sided, 1 copy | The deed |
| `print/4-plain.pdf` | Letter ivory or plain, colour, 1-sided, 1 copy | The developer's site assessment, the Articles of Settlement, Orlok's ledger |
| `print/5-poster.pdf` | Letter plain white, colour, 1-sided, 1 copy | Spencer's DJ poster |
| [Official 2024 character sheet](https://media.dndbeyond.com/compendium-images/free-rules/downloads/2024-character-sheet.pdf) (linked, not in the repo) | Letter plain white, B&W, 2-sided, 8 copies | Blank character sheets: 5 players + 3 spares |
| `print/7-combat.pdf` | Letter plain white, B&W, 1-sided, 1 copy | The combat cheat sheet: every fight's stat lines, one page per day (DM only) |

Rebuild after any prop change (needs Google Chrome, `pypdf` and ImageMagick); it remakes the PDFs and `photo-4x6.jpg`:

```bash
python3 print/build.py
```

Not printed: the AIM sticky note (handwritten), the wishing willow (Scott makes it by hand), the USB stick (bought).

## Adding a new prop

See [AGENTS.md](AGENTS.md) for the full pattern + iPad/iOS gotchas. Short version:

1. `mkdir <prop-name>/`
2. Build `<prop-name>/index.html` (single self-contained file — HTML + CSS + JS + assets folder beside it)
3. If the table uses it on the iPad, add a numbered item to the root `index.html` in story order, and match the `IPAD` map and `ipad:[n]` cues in `run/index.html`
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
