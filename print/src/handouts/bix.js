handout("bix", {
  powersIntro:"You always have Burning Hands, Cure Wounds, Flaming Sphere, Scorching Ray and Speak with Animals ready. Pick 7 more after any Long Rest: the 7 here are a good start. Casting a spell uses a slot of that level or higher, and you can cast only one spell with a slot per turn. Spell save DC 14, spell attack +6.",
  features:[
    {nm:"Summon Wildfire Spirit", meta:"Action · uses 1 Wild Shape · lasts 1 hour",
     does:"A small fire spirit appears within 30 ft. Everyone within 10 ft of it except you makes a Dex save (DC 14) or takes 2d6 fire. It has AC 13, 25 hit points and flies at 30 ft. It goes right after you and only Dodges unless you spend your <b>bonus action</b> to command it: Flame Seed (+6 to hit, 60 ft, 1d6+2 fire) or Fiery Teleportation (it and willing friends next to it jump 15 ft, burning anyone they leave behind on a failed Dex save: 1d6+2).",
     use:"Round 1 of a real fight. Drop it among enemies, away from your friends."},
    {nm:"Wild Shape", meta:"Bonus action · 2 uses · 1 back on a Short Rest, all on a Long Rest",
     does:"Turn into a small beast you've learned (6 forms at level 4, up to CR 1/2, no flyers) for 2 hours, with 4 temporary hit points. You can't cast spells while changed. Your other use for these charges is the spirit, which is almost always better in a fight.",
     use:"Sneaking around as a rat or a cat. Save one charge for the spirit."},
    {nm:"Wild Companion", meta:"Magic action · spend a slot or a Wild Shape use",
     does:"Casts Find Familiar for free: a small fey animal that scouts for you until your next Long Rest.",
     use:"When exploring somewhere you don't want to walk into first."},
    {nm:"Primal Order: Magician", meta:"Always on",
     does:"One extra cantrip, and you add your Wis to Arcana and Nature checks. The sheet already includes it.",
     use:"It's automatic."},
    {nm:"Healer", meta:"Origin feat · action with a Healer's Kit use",
     does:"Spend a kit use on someone next to you: they spend a Hit Die, you roll it, and they regain that plus your proficiency. Also reroll 1s on your healing dice.",
     use:"Between fights, or when someone's down and you're adjacent. It costs no spell slot."},
    {nm:"Fury of the Small", meta:"Species · 2 uses · back on a Long Rest",
     does:"Once per turn when you hurt a creature bigger than you with an attack or spell, add 2 damage.",
     use:"Whenever you're angry. Which is the point."},
    {nm:"Nimble Escape", meta:"Species · bonus action · every turn",
     does:"Disengage or Hide as a bonus action.",
     use:"When something's on you. It competes with commanding your spirit, so pick one."},
    {nm:"Fey Ancestry", meta:"Species · always on",
     does:"Advantage on saves against being charmed.", use:"Automatic."},
    {nm:"Druidic", meta:"Always on",
     does:"You know the secret druid language, and Speak with Animals is always prepared.", use:"Leaving hidden messages, or asking a rat what it saw."}
  ],
  spells:[
    {h:"Cantrips: as often as you like", list:[
      {nm:"Produce Flame", meta:"Bonus action to light · lasts 10 min · no concentration",
       does:"A flame in your hand gives light. As an action, throw it: +6 to hit, 60 ft, 1d8 fire. It stays lit for the next throw.", use:"You're out of slots or saving them."},
      {nm:"Thorn Whip", meta:"Action · 30 ft",
       does:"Melee spell attack, +6: 1d6 piercing, and pull a Large or smaller target up to 10 ft toward you.", use:"Yanking someone into your Flaming Sphere or Spike Growth."},
      {nm:"Guidance", meta:"Action · touch · concentration, 1 min",
       does:"A friend adds 1d4 to one skill check of a kind you name.", use:"Before someone rolls something important, out of combat."},
      {nm:"Druidcraft", meta:"Action · 30 ft",
       does:"Tiny nature tricks: predict tomorrow's weather, make a flower bloom, light or snuff a candle.", use:"Showing off, or lighting up."}
    ]},
    {h:"Level 1: 4 slots", intro:"Burning Hands and Cure Wounds come with your circle.", list:[
      {nm:"Burning Hands", meta:"Action · 15-ft cone · circle spell",
       does:"Everyone in the cone makes a Dex save, DC 14: 3d6 fire, half on a save. +1d6 per higher slot.", use:"Two or more enemies close together in front of you. Check your friends aren't in it."},
      {nm:"Cure Wounds", meta:"Action · touch · circle spell",
       does:"Heals 2d8 + 4. +2d8 per higher slot.", use:"You're next to someone hurt and between fights."},
      {nm:"Healing Word", meta:"Bonus action · 60 ft",
       does:"Heals 2d4 + 4 at range. +2d4 per higher slot.", use:"A friend's at 0 hit points. Getting them back up matters more than the number."},
      {nm:"Faerie Fire", meta:"Action · 60 ft · 20-ft cube · concentration, 1 min",
       does:"Dex save, DC 14, or the target glows, and attacks against it have Advantage.", use:"Big single enemy, when Gnomey wants Advantage."},
      {nm:"Entangle", meta:"Action · 90 ft · 20-ft square · concentration, 1 min",
       does:"The area is hard to move through, and anyone in it makes a Str save, DC 14, or is Restrained. Athletics check to break free.", use:"Stopping a group coming at you."},
      {nm:"Thunderwave", meta:"Action · 15-ft cube from you",
       does:"Con save, DC 14: 2d8 thunder and pushed 10 ft. Half and no push on a save. It's very loud. +1d8 per higher slot.", use:"You're being crowded."},
      {nm:"Speak with Animals", meta:"Action or 10-min ritual · 10 min · always prepared",
       does:"Talk with beasts. As a ritual it costs no slot.", use:"Any animal that might have seen something."}
    ]},
    {h:"Level 2: 3 slots", intro:"Flaming Sphere and Scorching Ray come with your circle.", list:[
      {nm:"Scorching Ray", meta:"Action · 120 ft · circle spell",
       does:"Three rays, one target or several. Each is an attack at +6 for 2d6 fire. +1 ray per higher slot.", use:"Your default big hit against one tough enemy."},
      {nm:"Flaming Sphere", meta:"Action · 60 ft · concentration, 1 min · circle spell",
       does:"A rolling ball of fire. Anyone ending a turn within 5 ft makes a Dex save, DC 14: 2d6 fire, half on a save. Bonus action to roll it 30 ft.", use:"Blocking a hallway. It needs your bonus action to move, so it competes with your spirit."},
      {nm:"Heat Metal", meta:"Action · 60 ft · concentration, 1 min",
       does:"A metal object goes red-hot: 2d8 fire to whoever holds it, again with your bonus action. A Con save or they drop it, otherwise they have Disadvantage on attacks and checks.", use:"Anyone with a sword or armor."},
      {nm:"Spike Growth", meta:"Action · 150 ft · 20-ft radius · concentration, 10 min",
       does:"The ground turns to hidden spikes: hard to cross, and 2d4 piercing per 5 ft moved through it. No save.", use:"A hallway or doorway enemies must come through."},
      {nm:"Barkskin", meta:"Bonus action · touch · 1 hour",
       does:"The target's AC becomes 17 if it was lower. No concentration.", use:"Before a fight, on yourself or whoever's in front."}
    ]}
  ],
  turn:{
    title:"Round 1 fire, round 2 more fire",
    steps:[
      "<b>Round 1, action: Summon Wildfire Spirit</b> in among the enemies. That's a free 2d6 burst.",
      "<b>Round 2 on, action: Scorching Ray</b> at the biggest threat while you have level 2 slots, then Produce Flame.",
      "<b>Bonus action: command the spirit</b> to fire a Flame Seed at the same target. That's your extra damage every turn.",
      "<b>Move</b> to stay back and keep friends out of your fire. You're at range: keep a wall between you and melee."
    ],
    options:[
      ["Two or more enemies bunched up","Burning Hands if close, or drop the spirit on them. Your friends aren't fireproof."],
      ["A friend's at 0 hit points","Bonus action Healing Word, even if the spirit sits this turn out. Getting them up comes first."],
      ["Something's on top of you","Nimble Escape, bonus action Disengage, then walk away and throw fire."]
    ],
    extras:[
      "<b>Bonus action:</b> command the spirit, Healing Word, or Nimble Escape. Only one a turn.",
      "<b>One spell slot per turn:</b> if you use Healing Word with a slot, your action can only be a cantrip.",
      "<b>Reaction:</b> nothing for now, apart from an Opportunity Attack if you're holding a staff.",
      "<b>Concentration:</b> you can hold only one of Faerie Fire, Entangle, Flaming Sphere, Heat Metal, Spike Growth or Guidance. If you take damage, make a Con save or lose it."
    ]
  },
  level5:[
    "<b>2 level 3 slots.</b> Prepare 9 spells instead of 7. Try <b>Call Lightning</b> and <b>Moonbeam</b>.",
    "Your circle adds <b>Plant Growth</b> and <b>Revivify</b> for free, always prepared.",
    "Produce Flame and Thorn Whip roll two dice. Flame Seed becomes 1d6 + 3, your spirit has 30 hit points, and Fury of the Small adds 3, three times a day.",
    "<b>Wild Resurgence:</b> out of Wild Shape uses? Spend a spell slot to get one back, once a turn. Or once per Long Rest, turn a Wild Shape use into a level 1 slot."
  ],
  level5cards:[
    {nm:"Call Lightning", meta:"Action · 120 ft · concentration, 10 min · level 3",
     does:"A storm cloud forms. Everyone within 5 ft of a point you pick makes a Dex save: 3d10 lightning, half on a save. Use an action on later turns to call another bolt without another slot.",
     use:"A long fight, outdoors if you can (+1d10 in a storm)."},
    {nm:"Plant Growth", meta:"Action · 150 ft · level 3 · always prepared",
     does:"Plants in a 100-ft circle go wild: creatures move at a crawl, 4 ft of movement per foot. Or spend 8 hours to make the land richer.",
     use:"Slowing a whole crowd, with no save and no concentration."},
    {nm:"Revivify", meta:"Action · touch · level 3 · always prepared",
     does:"Brings back someone who died in the last minute, at 1 hit point. Costs a diamond worth 300 GP, which you don't have yet.",
     use:"Buy the diamond if you ever find the money."}
  ]
});
