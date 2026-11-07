/* Set-up data every act reads: the iPad items, the physical props, and the pre-session card.
   Loads first; scenes/town.js, night.js, sunday.js and finale.js each push onto SCENES.
   After editing, bump this file's ?v= on its script tag in run/index.html. */

/* ============================= iPAD ITEMS ============================= */
/* The players' iPad sits on the landing page (/), which shows these as big
   numbered items in story order. A scene's {ipad:n} step shows "iPad → item n" with a
   link to open it. Keep in step with the tiles in /index.html.
   Digital props only: anything printed is a hand-over, never an iPad item. */
const IPAD = {
  1:{room:"The Library",    prop:"the torn Crier page",                 path:"/puzzle/",
     when:"Opens on the setup screen."},
  2:{room:"The Computer",   prop:"AIM, the Spirit",                     path:"/aim/",
     when:"Opens as <b>Marcus Hale</b>; the drive mounts as <code>MARCUS_HALE</code>. To force the name, open <code>/aim/?name=Marcus%20Hale</code>."}
};

/* ============================= PHYSICAL PROPS ============================= */
/* Every object that goes to the table, in hand-over order. cue = the scene no. it goes
   out on. only = a condition. Feeds each scene's {hand:id} steps and the props-bag list
   on card zero. */
const PROPS = [
  {id:"backstory",  nm:"Backstory cards",               to:"one per player",        cue:0,  how:"Give them a minute to read."},
  {id:"reqcard",    nm:"Russ's requirements card",      to:"Cody (Russ)",           cue:0},
  {id:"invites",    nm:"Invite cards",                  to:"one per player",        cue:2,  how:"Spencer's card, one in each locker. No host named."},
  {id:"weight",     nm:"<i>The Weight of Your Lies</i>",to:"John (Yobo)",           cue:4,  how:"face-down, the moment the crew asks for a Dolly riff. Disadvantage on Performance, advantage on Deception."},
  {id:"survey",     nm:"Site survey",                   to:"the table",             cue:7,  how:"to whoever finds it, from the look-around."},
  {id:"sticky",     nm:"Sticky note <code>Fluffy123</code>", to:"the table",        cue:9,  how:"to whoever finds it, after the fight and before the screen wakes. They keep it for Sunday."},
  {id:"settlement", nm:"Articles of Settlement",        to:"whoever opens the strongbox", cue:10, how:"from the strongbox."},
  {id:"photo",      nm:"The photograph (4&times;6)",    to:"whoever picks it up",   cue:11, how:"say nothing."},
  {id:"truevoice",  nm:"<i>Your True Voice</i>",        to:"John (Yobo)",           cue:11, only:"only if he drops the lie", how:"face-down; it takes the place of the debuff card."},
  {id:"ledger",     nm:"Orlok's ledger",                to:"the table",             cue:12, how:"when they reach the lectern."},
  {id:"willow",     nm:"The wishing willow",            to:"whoever opens the bag", cue:13, how:"from the bag: <i>I want Angelique to notice me</i>."},
  {id:"usb",        nm:"USB stick <code>MARCUS_HALE</code>", to:"the table",        cue:13, how:"when the drive mounts and he uploads the file."},
  {id:"tickets",    nm:"Concert tickets",               to:"Simone",                cue:15, how:"from Upton's mother's hand."},
  {id:"badge",      nm:"The badge",                     to:"Cody (Russ)",           cue:15, how:"from the troop leader, once Orlok signs."},
  {id:"deed",       nm:"The deed",                      to:"Julia (Gnomey)",        cue:15, how:"from Vinny."}
];

/* A scene's steps are the left panel, in the order Scott does them:
   {say,who} read aloud · {do} an instruction · {snd,t} sounds to tap · {hand,do} a prop to hand over
   {tick} a set-up line with a box · {check} a check and its DC · {ipad,do} a digital prop to open
   {tok} tokens out · {fight} the fight · {slot,t} a prompt list · {end} how the scene ends
   Sub-rows that hang off the step above: {note,k} · {stuck} · {backup}
   flow (or talk), ifblock, npcs and spBrief are Spencer's panel. cues are the soundboard's This cue row. */
const SCENES = [

{ act:"set", no:"PREP", title:"Pre-session checklist", where:"Card zero · tick as you go · saved on this laptop",
  checklist:[
    {g:"iPads &amp; laptop", items:[
      {id:"ipad-charged", t:"<b>Both iPads and the laptop charged</b>, chargers in the bag. Auto-Lock off on both iPads so the screen doesn't sleep mid-scene."},
      {id:"ipad-home", t:"<b>Players' iPad on its home page</b>, items 1&ndash;2. Add to Home Screen done and cache-busted (<code>?v=</code>). Open item 1 and item 2 once to check they load, then back to home."},
      {id:"laptop", t:"<b>Run of Show open</b>, sound up, soundboard tested (one ambience, one sting). Ticks reset (bottom of this card)."}
    ]},
    {g:"Print run", items:[
      {id:"print", t:"<b>Print run picked up and cut</b> (<code>/print/</code>): invites, backstory cards, Russ's card, the badge, the willow's tag, the concert tickets, Yobo's two cards, battle tokens, the deed, the survey, the settlement, Orlok's ledger, character sheets."},
      {id:"backstory-reprint", t:"<b>Reprinted Simone and Yobo backstory cards</b> (<code>8-backstory-reprint.pdf</code>, cut on the crop marks). Use these, not the old two."},
      {id:"photo", t:"<b>The photograph</b>: a Staples 4&times;6 photo print of <code>print/photo-4x6.jpg</code>, glossy or lustre. Same-day at most stores."},
      {id:"usb", t:"<b>USB stick</b> labelled <code>MARCUS_HALE</code>."},
      {id:"sticky-made", t:"<b>Sticky note</b> <code>Fluffy123</code>, handwritten. <b>The wishing willow</b>, handmade, with its tag tied on."}
    ]},
    {g:"The room", items:[
      {id:"table", t:"<b>At the table</b>: character sheets, dice, battle map, the token bag sorted by fight (library, summoning, finale)."},
      {id:"seat", t:"<b>Your seat</b>: Run of Show in front of you, the props bag at your feet in the order below, the hidden three (deed, tickets, badge) in a separate envelope."}
    ]},
    {g:"Props bag &middot; packed in hand-over order", pack:true},
    {g:"At the table, before play", items:[
      {id:"spencer", t:"<b>Spencer briefed</b>: his pink zone on every cue."}
    ]}
  ],
  spBrief:[
    "<b>Your zone is the pink one on the right</b>, on every cue.",
    "<b>Who's here</b> at the top has a one-line voicing for each NPC.",
    "<b>Below that, read top to bottom</b>, in the order things happen. Each step says who's talking and what to get across, with a line you can use.",
    "<b>Steps marked If</b> only play if that happened.",
    "Scott narrates, runs checks and the enemy turns; you voice everyone else.",
    "<b>Handoff:</b> when Scott says an NPC's name and looks at you, you're on. Tap the table when a moment needs a roll or a check, and Scott takes it."
  ],
  npcs:[],
  cues:[] }

];
