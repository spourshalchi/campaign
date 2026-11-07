handout("yobo", {
  powersIntro:"You can swap one prepared spell each time you gain a level. Casting one uses a slot of its level or higher, and you can cast only one spell with a slot per turn. Spell save DC 14, spell attack +6.",
  features:[
    {nm:"Bardic Inspiration", meta:"Bonus action · 60 ft · 4 uses · back on a Long Rest",
     does:"Give a friend a d6. Within an hour, they can add it to one d20 roll they just missed by a little.",
     use:"Most turns you have a bonus action spare. Give it to whoever's about to do something big."},
    {nm:"Cutting Words", meta:"Reaction · 60 ft · spends 1 Bardic Inspiration",
     does:"When a creature you can see makes a damage roll or succeeds on an attack or check, roll your die and subtract it. That can turn a hit into a miss. Insulting people is how you stay safe.",
     use:"An enemy just barely hit a friend, or is rolling damage that would drop them."},
    {nm:"Expertise", meta:"Always on",
     does:"Double proficiency in Performance and Deception. Those are your two biggest numbers.",
     use:"Any time you're on stage, or need someone to believe you."},
    {nm:"Jack of All Trades", meta:"Always on",
     does:"Add half your proficiency, +1, to any skill check you're not proficient in. It's already on your sheet.",
     use:"Automatic. You're never bad at anything."},
    {nm:"Musician", meta:"Origin feat · after any Short or Long Rest",
     does:"Play a song at the end of a rest, and 2 friends who hear it gain Heroic Inspiration: they can reroll any one die.",
     use:"Every rest. It's free, so don't forget."},
    {nm:"Resourceful", meta:"Species · after a Long Rest",
     does:"You gain Heroic Inspiration yourself: reroll any one die, then it's gone.",
     use:"When a roll really matters."},
    {nm:"Tough", meta:"Human Versatile feat · always on",
     does:"+2 hit points per level, already on your sheet. Your AC is low, so this keeps you standing.",
     use:"Automatic."},
    {nm:"Lore skills", meta:"Always on",
     does:"You know a little of everything: Perception, Investigation and Arcana come from your college.",
     use:"Any time the group's asking who knows about this."}
  ],
  spells:[
    {h:"Cantrips: as often as you like", list:[
      {nm:"Vicious Mockery", meta:"Action · 60 ft",
       does:"Insult someone. Wis save, DC 14: 1d6 psychic, and its next attack has Disadvantage.", use:"Your default turn. Make up the insult."},
      {nm:"Minor Illusion", meta:"Action · 30 ft · 1 min",
       does:"A sound or a small image, up to a 5-ft cube. Someone can see through it with Investigation against DC 14.", use:"Stage effects. A voice from the next room."},
      {nm:"Prestidigitation", meta:"Action · 10 ft · up to 1 hour",
       does:"Tiny tricks: sparks, a smell, cleaning a shirt, a small flame.", use:"Theatre. Always theatre."}
    ]},
    {h:"Level 1: 4 slots", list:[
      {nm:"Healing Word", meta:"Bonus action · 60 ft",
       does:"Heals 2d4 + 4. +2d4 per higher slot.", use:"A friend's at 0 hit points. Up beats everything."},
      {nm:"Dissonant Whispers", meta:"Action · 60 ft",
       does:"Wis save, DC 14: 3d6 psychic, and it must use its reaction to run away from you. Half and no running on a save. +1d6 per higher slot.", use:"Moving someone off a spot, with friends nearby to get free hits."},
      {nm:"Faerie Fire", meta:"Action · 60 ft · 20-ft cube · concentration, 1 min",
       does:"Dex save, DC 14, or targets glow, and attacks against them have Advantage.", use:"A big single enemy. A spotlight, basically."},
      {nm:"Charm Person", meta:"Action · 30 ft · 1 hour",
       does:"Wis save, DC 14, or a person treats you as a friend until you hurt them. Advantage on its save if you're fighting it. It knows afterward.", use:"Talking your way past someone, not in fights."}
    ]},
    {h:"Level 2: 3 slots", list:[
      {nm:"Shatter", meta:"Action · 60 ft · 10-ft sphere",
       does:"A burst of noise. Con save, DC 14: 3d8 thunder, half on a save. +1d8 per higher slot.", use:"Two or more enemies close together. Your big damage."},
      {nm:"Hold Person", meta:"Action · 60 ft · concentration, 1 min",
       does:"Wis save, DC 14, or a humanoid is Paralyzed. It repeats the save each turn.", use:"A dangerous person when Gnomey's ready to hit them."},
      {nm:"Suggestion", meta:"Action · 30 ft · concentration, up to 8 hours",
       does:"Wis save, DC 14, or the target follows a reasonable-sounding suggestion of 25 words or fewer.", use:"Getting a guard to leave. It works, and you don't have to fight."}
    ]}
  ],
  turn:{
    title:"Insult one, inspire another",
    steps:[
      "<b>Action: Vicious Mockery</b> at the enemy hitting your friends hardest. Use Shatter instead if two or more are bunched up.",
      "<b>Bonus action: Bardic Inspiration</b> to whoever's going next.",
      "<b>Move</b> to stay back. AC 13 isn't a stage you want to stand on, so keep 30 ft or more from enemies.",
      "<b>Reaction, on their turn: Cutting Words</b> when a hit would really hurt."
    ],
    options:[
      ["A friend's at 0 hit points","Bonus action Healing Word first, then a cantrip with your action."],
      ["One huge enemy","Hold Person if it's a person, Faerie Fire if it isn't."],
      ["They're talking, not fighting","You lead. Performance, Deception, Persuasion and Intimidation are all yours."]
    ],
    extras:[
      "<b>Bonus action:</b> Bardic Inspiration or Healing Word.",
      "<b>Reaction:</b> Cutting Words. It uses the same 4 charges as Inspiration, so keep one back.",
      "<b>One spell slot per turn:</b> if you use Healing Word with a slot, your action can only be a cantrip.",
      "<b>Concentration:</b> only one of Faerie Fire, Hold Person or Suggestion at a time. Take damage and you make a Con save to hold on."
    ]
  },
  level5:[
    "<b>Bardic Inspiration becomes a d8.</b> With <b>Font of Inspiration</b> it comes back on a Short Rest too, and you can spend a spell slot to get one back.",
    "<b>2 level 3 slots.</b> Prepare 9 spells instead of 7. Try <b>Hypnotic Pattern</b> and <b>Fear</b>.",
    "Vicious Mockery does 2d6."
  ],
  level5cards:[
    {nm:"Hypnotic Pattern", meta:"Action · 120 ft · 30-ft cube · concentration, 1 min · level 3",
     does:"Wis save, DC 15, or a creature is Charmed: it can't act or move. It ends if the creature takes damage or someone shakes it awake.",
     use:"A group is about to swarm you. Your best spell at this level."},
    {nm:"Fear", meta:"Action · 30-ft cone · concentration, 1 min · level 3",
     does:"Wis save, DC 15, or targets drop what they're holding and run from you.",
     use:"Scaring off a crowd."}
  ]
});
