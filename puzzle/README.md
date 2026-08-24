# Torn Page — The Transyltown Crier

> **⚠ Canon status: NOT CANON — prop-only, unratified.** Everything in this prop's 1937 article is
> invented. The brainstorm doc's actual source is a **1973** legend told by a Frisian skipper
> (Sesh 2); the local-newspaper framing, Joost Wiegman, Dr. Vance, Aletta Bruin, the Hoeck boy,
> Rev. Ackerman, Cornelis Dood, the 1904 date, the trusts, the ward, and the **three-coffin count**
> were all written here, not agreed by Scott and Spencer. Scott's call: the prop stays as built, but
> none of it binds the campaign until Spencer signs off. See `/CANON.md`.

The party's in-town research stop. A torn front page from the library's bound
volumes: assemble it against the clock, then flip it to read page 2.

**The fiction:** the page didn't just get torn — somebody cast a spell on the
pieces so they'd never fit back together. That's what the timer is. The players
aren't racing a person walking back into the room, they're holding a spell off
long enough to read the thing.

Keep this copy in plain present-day language. The 1937 article is written in
period voice on purpose, but the splash and fail screens are the players
speaking as themselves at a D&D table — "cast a spell" reads right there,
"said a word over the pieces" does not.

The prop never names who cast it, on purpose, and should stay that way.

**For the DM: it was the real-estate company's leader.** Not to hide monsters —
to erase a documented 1937 vampire incident from the public record before he
develops the site. A stigmatized property is a liability, so he paid to make the
page unreadable rather than argue with it. He can walk into a records hall in
daylight, which the vampires cannot, and he almost certainly doesn't believe a
word of the article. He can't ward word of mouth, which is why the town still
talks and the harbinger still has her warning.

The irony is worth playing: he warded the one page carrying both the method for
destroying the vampires *and* the location of their coffins, so the company
trying to take the house has been protecting its tenants the entire time.

None of that is in the prop. The players just meet a page that won't go back
together, and "someone doesn't want you finding that information" stays true.

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

- **"Aletta Bruin"** — the named child. Texture only; rename at will. She was
  once going to grow up into the harbinger, but the records keeper is
  deliberately *not* in this story any more — see below.
- **"the Hoeck boy"** — open slot for a PC's great-grandparent, for the
  blood-tie-to-the-mansion hook. Waiting on Cody's PC.
- **"Dood"** — mansion name, now used everywhere. The floor-plan art
  originally read *Van Doren*; its title block has been repainted to match.
  Changing it again means editing `assets/front-heath.source.html`, re-running
  `render-front.sh`, and editing the `<template>` in `index.html`.

Invented canon that needs sign-off, since players read this closely: Cornelis
Dood built the house, it's been shuttered since **1904**, the incident was
**October 1937**.

## The harbinger

The records keeper is the harbinger — the one NPC who tells them not to go up
to the house. She has no personal stake in the 1937 story and does not appear
in it. Her warning rests on two things:

1. **What she's heard.** Decades of town talk about the Dood house. Nothing she
   witnessed and nothing she can prove — which is exactly why the players are
   free to shrug it off.
2. **The ward, which is sitting in her drawer.** She doesn't have to argue any
   folklore. She has a page that will not go back together.

Her line, as she hands the drawer over:

> "You can try to put it back together. But I'm guessing, by the magic on them
> — someone doesn't want you finding that information."

That's the whole character, and it's worth noticing what it declines to do:

- **She doesn't forbid them.** "You can try" hands them the drawer. There's
  nothing to push against, so there's no argument for them to win.
- **She hedges.** "I'm guessing" claims no authority and makes no prophecy.
  She's a person reading a situation. That's the modern spin — the archetype
  without the raving.
- **She points at the evidence and stops.** The players draw the conclusion
  themselves, so they own it.
- **"Someone doesn't want you"** puts a person behind the ward. Not a curse,
  not bad luck — somebody did this on purpose, and they are still out there.

Because she says it at handover, the warning is already in the room before the
timer starts, and then the puzzle proves her right without her doing anything.
A harbinger who says "beware" gets ignored. One who is demonstrated correct
thirty seconds later has won the argument — and they go anyway, because they're
teenagers.

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
