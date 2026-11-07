handout("russ", {
  powersIntro:"You always have Speak with Animals, Misty Step, Sleep and Goodberry ready. Pick 7 more after any Long Rest: the 7 here are a good start. Casting a spell uses a slot of that level or higher, and you can cast only one spell with a slot per turn. Spell save DC 14, spell attack +6.",
  features:[
    {nm:"Land's Aid", meta:"Action · 60 ft · uses 1 Wild Shape",
     does:"Pick a point. Enemies you choose in a 10-ft sphere make a Con save, DC 14: 2d6 necrotic, half on a save. And one creature you choose in the sphere heals 2d6. It costs no spell slot.",
     use:"A friend's in the thick of it, hurt, with enemies around them. Heal and hit at the same time."},
    {nm:"Wild Shape", meta:"Bonus action · 2 uses · 1 back on a Short Rest, all on a Long Rest",
     does:"Turn into a beast you've learned (6 forms at level 4, up to CR 1/2, no flyers) for 2 hours, with 4 temporary hit points. You can't cast spells while changed. Land's Aid spends the same charges and is usually better in a fight.",
     use:"Scouting as a small animal. A scout's dream."},
    {nm:"Wild Companion", meta:"Magic action · spend a slot or a Wild Shape use",
     does:"Casts Find Familiar for free: a small fey animal that scouts for you until your next Long Rest.",
     use:"A buddy for the trail. Very on brand."},
    {nm:"Circle Spells: temperate", meta:"Always prepared · change the land after a Long Rest",
     does:"Temperate forest gives you Misty Step, Sleep and Shocking Grasp, on top of the 7 you choose. At level 5, Lightning Bolt.",
     use:"You can pick arid, polar or tropical instead, but the Hudson Valley is temperate."},
    {nm:"Primal Order: Warden", meta:"Always on",
     does:"You can wear medium armor and use martial weapons. That's your AC of 16: you stand closer to trouble than most casters.",
     use:"Automatic."},
    {nm:"Magic Initiate (Druid)", meta:"Origin feat · 1 free Goodberry per Long Rest",
     does:"Two extra cantrips, Starry Wisp and Mending, and Goodberry, always prepared.",
     use:"Cast Goodberry each morning. Scout snacks."},
    {nm:"Speech of Beast and Leaf", meta:"Species · always on",
     does:"Beasts and plants understand what you say to them, though you can't understand them back, and you have Advantage on Charisma checks to influence them. Speak with Animals gets you the answers.",
     use:"Talk to every animal. Politely."},
    {nm:"Firbolg Magic", meta:"Species · each once per Long Rest",
     does:"Detect Magic and Disguise Self, free, once each. Disguise Self can make you up to 3 ft taller or shorter. You can also cast them with slots.",
     use:"Detect Magic any time something looks odd."},
    {nm:"Hidden Step", meta:"Species · bonus action · 2 uses · back on a Long Rest",
     does:"Turn invisible until the start of your next turn, or until you attack, deal damage or force a save.",
     use:"Getting out of trouble, or crossing a room to reach a friend who's down."},
    {nm:"Powerful Build", meta:"Species · always on",
     does:"You count as a size larger for carrying, pushing, dragging and lifting. Handy for reaching and hauling.",
     use:"Automatic. Your Strength is still low, so ask Scott what it can move."}
  ],
  spells:[
    {h:"Cantrips: as often as you like", list:[
      {nm:"Produce Flame", meta:"Bonus action to light · lasts 10 min",
       does:"A flame in your hand gives light without heat. As an action, throw it: +6 to hit, 60 ft, 1d8 fire. It stays lit for the next throw.", use:"Your standard attack. A torch you can throw."},
      {nm:"Guidance", meta:"Action · touch · concentration, 1 min",
       does:"A friend adds 1d4 to one skill check of a kind you name.", use:"Before anyone rolls anything important. Be helpful about it."},
      {nm:"Thorn Whip", meta:"Action · 30 ft",
       does:"Melee spell attack, +6: 1d6 piercing, and pull a Large or smaller target up to 10 ft toward you.", use:"Dragging an enemy into your Moonbeam."},
      {nm:"Starry Wisp", meta:"Action · 60 ft · from Magic Initiate",
       does:"Ranged spell attack, +6: 1d8 radiant. The target glows and can't turn invisible until your next turn's end.", use:"A target that can turn invisible."},
      {nm:"Mending", meta:"1 minute · touch · from Magic Initiate",
       does:"Fix a break or tear up to a foot long.", use:"Repairing things for old people. It's badge-worthy."},
      {nm:"Shocking Grasp", meta:"Action · touch · circle spell",
       does:"Melee spell attack, +6: 1d8 lightning, and the target can't make Opportunity Attacks until its next turn.", use:"Something's next to you and you want to walk away."}
    ]},
    {h:"Level 1: 4 slots", list:[
      {nm:"Speak with Animals", meta:"Action or 10-min ritual · 10 min · always prepared",
       does:"Talk with beasts, and understand them. As a ritual it costs no slot, only 10 extra minutes.", use:"Always. Any animal, any time. They've usually seen something."},
      {nm:"Healing Word", meta:"Bonus action · 60 ft",
       does:"Heals 2d4 + 4 at range. +2d4 per higher slot.", use:"A friend's at 0 hit points. Up beats everything."},
      {nm:"Cure Wounds", meta:"Action · touch",
       does:"Heals 2d8 + 4 by touch. +2d8 per higher slot.", use:"More healing than Healing Word, when you can reach them and can spare the action."},
      {nm:"Goodberry", meta:"Action · lasts 24 hours · 1 free per Long Rest",
       does:"Makes 10 berries. Eating one is a bonus action and heals 1 hit point.", use:"Hand them out first thing."},
      {nm:"Thunderwave", meta:"Action · 15-ft cube from you",
       does:"Con save, DC 14: 2d8 thunder and pushed 10 ft. Half and no push on a save. It's very loud. +1d8 per higher slot.", use:"Pushing someone off a spot, or away from a friend."},
      {nm:"Entangle", meta:"Action · 90 ft · 20-ft square · concentration, 1 min",
       does:"Plants grab everything there. Str save, DC 14, or Restrained. Hard to move through either way.", use:"Stopping a group."},
      {nm:"Sleep", meta:"Action · 60 ft · 5-ft sphere · concentration, 1 min · circle spell",
       does:"Wis save, DC 14, or Incapacitated. A second failed save and they're asleep. Elves and things that don't tire shrug it off.", use:"Taking one or two people out without hurting them."}
    ]},
    {h:"Level 2: 3 slots", list:[
      {nm:"Moonbeam", meta:"Action · 120 ft · concentration, 1 min",
       does:"A beam of moonlight. Con save, DC 14: 2d10 radiant, half on a save, when it appears, when someone enters or ends a turn in it, or when you move it onto them. Move it 60 ft with an action on a later turn. +1d10 per higher slot.", use:"Your big attack. One tough enemy that isn't going anywhere."},
      {nm:"Pass without Trace", meta:"Action · 30 ft around you · concentration, 1 hour",
       does:"You and anyone you choose nearby get +10 to Stealth and leave no tracks.", use:"The whole group needs to sneak. Scouts are prepared."},
      {nm:"Barkskin", meta:"Bonus action · touch · 1 hour",
       does:"The target's AC becomes 17 if it was lower. No concentration.", use:"Before a fight, on yourself or a friend who's got a low AC. Yobo, probably."},
      {nm:"Misty Step", meta:"Bonus action · 30 ft · circle spell",
       does:"Teleport to a spot you can see.", use:"Getting to someone who needs you, past whatever's in the way."}
    ]}
  ],
  turn:{
    title:"Keep everyone up, keep the beam on",
    steps:[
      "<b>Round 1, action: Moonbeam</b> on the toughest enemy. It keeps working after this.",
      "<b>Round 2 on, action: Produce Flame</b> at whoever needs it, or Land's Aid if someone's hurt among enemies. Move the beam only if its target left.",
      "<b>Bonus action: Healing Word</b> if a friend's down. Otherwise nothing, and that's fine.",
      "<b>Move</b> so friends are within 60 ft, for healing and for the beam."
    ],
    options:[
      ["A friend's hurt with enemies around them","Land's Aid. It heals and hits, and costs no spell slot."],
      ["A friend's at 0 hit points and you've already used a slot this turn","Land's Aid on them with your action. It costs no slot."],
      ["Someone's about to get flattened","Thunderwave to push the enemy off them, or Barkskin before it starts."]
    ],
    extras:[
      "<b>Bonus action:</b> Healing Word, Misty Step, Hidden Step, Barkskin, or eating a Goodberry.",
      "<b>One spell slot per turn:</b> if you use Healing Word with a slot, your action can only be a cantrip.",
      "<b>Reaction:</b> nothing for now, apart from an Opportunity Attack with your staff.",
      "<b>Concentration:</b> only one of Moonbeam, Entangle, Sleep, Pass without Trace or Guidance. Take damage and you make a Con save to hold on."
    ]
  },
  level5:[
    "Hit points go up by 7.",
    "<b>2 level 3 slots.</b> Prepare 9 spells instead of 7. <b>Add Daylight and Plant Growth.</b>",
    "Your circle adds Lightning Bolt for free: 8d6 down a 100-ft line, Dex save, half on a save.",
    "Produce Flame, Thorn Whip, Starry Wisp and Shocking Grasp roll two dice.",
    "<b>Wild Resurgence:</b> out of Wild Shape uses? Spend a spell slot to get one back, once a turn. Or once per Long Rest, turn a Wild Shape use into a level 1 slot."
  ],
  level5cards:[
    {nm:"Daylight", meta:"Action · 60 ft · lasts 1 hour · level 3 · no concentration",
     does:"Real sunlight spreads from a point you can see within range: bright for 60 ft, dim for another 60. Put it on an object you're holding and you can carry it around. It also cancels magical Darkness it overlaps, if that spell is level 3 or lower.",
     use:"It's dark and you need the actual sun, not just a light. No concentration, so it runs alongside anything else."},
    {nm:"Plant Growth", meta:"Action · 150 ft · level 3",
     does:"Plants in a 100-ft circle go wild: creatures move at a crawl, 4 ft of movement per foot. Or spend 8 hours to double what a half-mile of land will grow for a year.",
     use:"Slowing down a crowd, with no save and no concentration. Or tending a garden the long way."}
  ]
});
