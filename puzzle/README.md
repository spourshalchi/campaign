# Torn Page — The Transyltown Crier

The party's in-town research stop. A torn front page from the library's bound
volumes: assemble it against the clock, then flip it to read page 2.

**The fiction:** the page didn't just get torn — somebody *warded* the pieces so
they'd never go back together. That's what the timer is. The players aren't
racing a person walking back into the room, they're holding a working at bay
long enough to read the thing.

The prop never names who cast it, on purpose. The obvious candidate is the
vampires: this article carries both the method for destroying them *and* the
location of their coffins, so of course it's warded. That also pays off later —
on the reveal, the thing standing between the party and the truth turns out to
have been something frightened protecting itself, not a villain covering
tracks. But nothing in the prop commits to that, so it can just as easily be
the trust, Poe Boy, or the records keeper herself.

Front page is a rendered image (it gets torn into pieces). Page 2 is live HTML
(it has to stay legible at table distance) — so the lore copy is editable here
without regenerating any art.

## What it delivers

| Job | Where |
|---|---|
| The vampire-slaying method — whitethorn splinter in the lid, point over the heart, nail shut, rebury | Page 2, "Upon the Heath", plus a labelled diagram (A = splinter, B = heart) so it can't be missed |
| Proof the method works — the children woke | Page 2, "The Children Woke" |
| **The clincher** — three coffins, one opened, two still under the chapel floor | Page 2, Wiegman's closing quote |
| The Gjenganger, quietly — runic marker, a man buried carefully so he wouldn't walk | Page 2, "The Builder's Stone" sidebar |
| Real-estate thread — the property held by absentee trusts since 1904 | Front page, column 2 |

The three coffins match the crypt on the mansion floor plan
(`assets/retired/dood-mansion-floorplan.png`) — chapel, trapdoor beneath the altar.

## Swap slots

Things deliberately left loose. All are one-line edits.

- **"Aletta Bruin"** — the named child. Intended to become the 2004 records
  keeper / harbinger: she was 11 in 1937, so she's ~78 at the table, and she's
  read this page. That's the "modern spin on the archetype" — not a raving
  crone, an archivist with a personal reason to send them home.
- **"the Hoeck boy"** — open slot for a PC's great-grandparent, for the
  blood-tie-to-the-mansion hook. Waiting on Cody's PC.
- **"Dood"** — mansion name, now used everywhere. The floor-plan art
  originally read *Van Doren*; its title block has been repainted to match.
  Changing it again means editing `assets/front-heath.source.html`, re-running
  `render-front.sh`, and editing the `<template>` in `index.html`.

Invented canon that needs sign-off, since players read this closely: Cornelis
Dood built the house, it's been shuttered since **1904**, the incident was
**October 1937**.

## Editing the copy

**Page 2** — edit the `<template id="article-heath">` block in `index.html`.
Plain HTML. Classes: `.sub` small-caps subhead, `.q` indented quote, `.big`
boxed pull quote, `.box` sidebar, `.drop` drop cap, `.cut` halftone
illustration with caption. No re-render needed.

The sheet gets a torn silhouette and the front page's tear is regenerated on
every deal, so no two runs rip the same way.

**Front page** — edit `assets/front-heath.source.html`, then:

```bash
./assets/render-front.sh
```

Renders at 1860×2622 through headless Chrome and converts to JPEG (the halftone
screen is high-frequency detail that PNG can't compress — 5MB vs 1.2MB, which
matters for first load on the iPad over LAN). Fonts are baked in at render
time, so nothing needs to exist on the iPad.

Two rules when editing the front page:

1. **Keep "Continued on Page 2" visible.** It's the in-fiction prompt to flip.
   If you add copy, cut copy elsewhere. The columns are tuned to fill the page
   exactly — check the bottom of column 2 after any change.
2. **Keep the page full of ink.** Blank regions make torn pieces
   indistinguishable and the puzzle frustrating.

## Adding a second clipping

1. Copy `assets/front-heath.source.html`, edit, render to a new filename
2. Add a `<template id="article-yourname">` next to the existing one
3. Add an entry to `CLIPPINGS` in `index.html`
4. Point `ACTIVE` at it

Candidates already floated: the real-estate firm scouting the mansion, and the
diary showing Bix's account of his night there is incomplete.

## Tuning

All in `CONFIG` at the top of the script block.

- `TILE_COUNT: 4` → 16 pieces. 3 is easy, 5 is hard.
- `TIME_SECONDS: 180`
- `EDGE_SEGMENTS: 13` / `EDGE_JITTER_FRAC` — how ragged the rips are. The seam
  is a correlated random walk, not per-point noise: raise the jitter much past
  ~0.13 and the tears stop looking like paper and start looking like starbursts.
- `OUTER_JITTER_FRAC` — the outside of the page is torn too, so the assembled
  sheet isn't a clean rectangle. Outer seams only bite **inward**; a piece
  can't paint outside its own box, so outward jitter would just flat-cut.
- `FRAME_MAX_H_PX: 680` — the page is portrait, so **height** is the binding
  constraint. Don't cap width; that renders it tiny on a landscape iPad.
- `READER_AUTO_MS: 620` — delay before page 2 opens itself after the flip.

Long-press the timer for 1.2s to open the debug panel (add/remove time, solve,
re-scatter).

## Retired art

`assets/retired/` holds the previous torn-photograph prop's images — the 2004
prom photo, its handwritten back ("MH-3-13 / third mirror"), and the mansion
floor plan. The floor plan is a handout in its own right; the photo back is the
key to it. Kept because they're campaign material, not because this prop uses
them.
