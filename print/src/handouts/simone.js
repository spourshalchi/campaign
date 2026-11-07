handout("simone", {
  private:"Keep this to yourself: it names your patron.",
  patronLine:"Your subclass is <b>Fiend Patron</b>, because your patron is the Devil. Add Scorching Ray to your attacks: +6 to hit, three rays, 2d6 fire each.",
  powersIntro:"You have only 2 slots, but they're level 2 and they come back on a Short Rest. Every warlock slot is the same level, so a level 1 spell cast from one is automatically stronger. That's why the spells below say level 2 numbers. Spell save DC 14, spell attack +6.",
  features:[
    {nm:"Pact Magic", meta:"2 slots, level 2 · back on a Short or Long Rest",
     does:"Few slots, and they refill fast. Spend both, take a Short Rest, and you're full again.",
     use:"Don't hoard them. Mostly use one on Hex, and keep one for an emergency."},
    {nm:"Agonizing Blast", meta:"Invocation · always on",
     does:"Adds your Charisma, +4, to Eldritch Blast damage. It's already on your sheet.",
     use:"Automatic."},
    {nm:"Repelling Blast", meta:"Invocation · on a hit",
     does:"When Eldritch Blast hits a Large or smaller creature, you can push it up to 10 ft away from you.",
     use:"Knocking someone off a spot, away from a friend, or into something on fire."},
    {nm:"Armor of Shadows", meta:"Invocation · action · 8 hours · no slot",
     does:"Casts Mage Armor on you at will: AC 13 + Dex, so 15. Don't wear the leather at the same time.",
     use:"Every morning. It's free."},
    {nm:"Dark One's Blessing", meta:"Whenever an enemy drops · no limit",
     does:"When you drop an enemy to 0 hit points, or a friend drops one within 10 ft of you, you gain 8 temporary hit points. Those don't stack: keep the higher amount.",
     use:"Automatic. Stay close enough to enjoy it."},
    {nm:"Magical Cunning", meta:"1-minute rite · once per Long Rest",
     does:"Get back 1 spell slot with a minute of ritual, no Short Rest needed.",
     use:"You're out, there's a quiet minute, and something's coming."},
    {nm:"Skilled", meta:"Origin feat · always on",
     does:"Three extra skills: Persuasion, Insight and Investigation. Running a business takes people skills.",
     use:"Automatic."},
    {nm:"Fiendish Legacy", meta:"Species · always on",
     does:"Fire Resistance: fire does half damage to you. You know Fire Bolt and Thaumaturgy. At level 3 you got Hellish Rebuke for free once per Long Rest. At level 5, Darkness.",
     use:"See Hellish Rebuke below."}
  ],
  spells:[
    {h:"Cantrips: as often as you like", list:[
      {nm:"Eldritch Blast", meta:"Action · 120 ft",
       does:"Ranged spell attack, +6: 1d10 + 4 force. At level 5 you fire two beams, each with its own roll.", use:"Nearly every turn. Your main attack."},
      {nm:"Mage Hand", meta:"Action · 30 ft · 1 min",
       does:"A floating hand that can carry 10 lb, open a door or take an item. Can't attack. An action moves it.", use:"Things you don't want to touch."},
      {nm:"Minor Illusion", meta:"Action · 30 ft · 1 min",
       does:"A sound or a small image, up to a 5-ft cube. Someone can see through it with Investigation against DC 14.", use:"Sales pitches. Making a spell look more impressive than it is."},
      {nm:"Fire Bolt", meta:"Action · 120 ft · Tiefling",
       does:"Ranged spell attack, +6: 1d10 fire. Sets unattended things alight.", use:"Lighting something up. Otherwise use Eldritch Blast."},
      {nm:"Thaumaturgy", meta:"Action · 30 ft · up to 1 min · Tiefling",
       does:"Small wonders: a booming voice, flickering candles, your eyes changing, a door slamming.", use:"Scaring classmates, which is free advertising."}
    ]},
    {h:"Spells you chose: use a slot", list:[
      {nm:"Hex", meta:"Bonus action · 90 ft · concentration, up to 4 hours",
       does:"Curse a target: every hit you land adds 1d6 necrotic, and it has Disadvantage on checks with one ability you pick. If it drops, move the curse on a later turn with a bonus action, for free.", use:"First turn of a real fight. It's the one you sell as a revenge spell."},
      {nm:"Armor of Agathys", meta:"Bonus action · self · 1 hour · no concentration",
       does:"10 temporary hit points. While you have any, a creature that hits you in melee takes 10 cold.", use:"You know something's about to come for you."},
      {nm:"Charm Person", meta:"Action · 30 ft · 1 hour",
       does:"Wis save, DC 14, or up to 2 people treat you as a friend until you hurt them. Advantage on the save if you're fighting them. They know afterward.", use:"Talking your way out. The other thing you sell."},
      {nm:"Misty Step", meta:"Bonus action · 30 ft",
       does:"Teleport to a spot you can see.", use:"Something's on you and your AC isn't going to save you."},
      {nm:"Hold Person", meta:"Action · 60 ft · concentration, 1 min",
       does:"Wis save, DC 14, or a humanoid is Paralyzed. It repeats the save each turn. It breaks Hex, since both need concentration.", use:"One dangerous person, when friends are ready to pounce."}
    ]},
    {h:"Spells from your patron: always prepared", list:[
      {nm:"Burning Hands", meta:"Action · 15-ft cone",
       does:"Dex save, DC 14: 4d6 fire from your level 2 slot, half on a save.", use:"Two or more enemies close together and close to you."},
      {nm:"Command", meta:"Action · 60 ft",
       does:"Wis save, DC 14, for up to 2 creatures from your level 2 slot: Approach, Drop, Flee, Grovel or Halt, on their next turn.", use:"Making someone drop what they're holding, or waste their turn."},
      {nm:"Scorching Ray", meta:"Action · 120 ft",
       does:"Three rays, each +6 to hit for 2d6 fire.", use:"You need big damage on one target now."},
      {nm:"Suggestion", meta:"Action · 30 ft · concentration, up to 8 hours",
       does:"Wis save, DC 14, or the target follows a reasonable-sounding suggestion of 25 words or fewer.", use:"Nothing that sounds like it would hurt them. Otherwise, anything."}
    ]},
    {h:"Free from your species", list:[
      {nm:"Hellish Rebuke", meta:"Reaction when something within 60 ft damages you · once free per Long Rest",
       does:"Green flames surround it. Dex save, DC 14: 2d10 fire, half on a save. With a slot it's 3d10.", use:"The first time something hurts you each day. It's free, so use it."}
    ]}
  ],
  turn:{
    title:"Curse once, then blast forever",
    steps:[
      "<b>Round 1, bonus action: Hex</b> on the biggest threat. Then Eldritch Blast with your action, for 1d10 + 4 + 1d6.",
      "<b>Every round after: Eldritch Blast.</b> Same target. Push them back with Repelling Blast when it helps.",
      "<b>Move</b> to stay 30 ft or more from anything with a blade. Your range is 120 ft, so use it.",
      "<b>Target dropped?</b> On a later turn, bonus action: move Hex to the next one, free."
    ],
    options:[
      ["Two or more enemies bunched up","Burning Hands if you're close: 4d6, and they may all drop for temporary hit points."],
      ["Something's on top of you","Bonus action Misty Step, then blast it from 30 ft away."],
      ["Someone's holding what you need","Command: Drop. Or Mage Hand if they're not looking."]
    ],
    extras:[
      "<b>Bonus action:</b> Hex, moving Hex, Misty Step, Armor of Agathys.",
      "<b>Reaction:</b> Hellish Rebuke when something hurts you. Free the first time.",
      "<b>Concentration:</b> only one of Hex, Hold Person or Suggestion at a time. Take damage and you make a Con save to hold on, and Hex is the one to protect.",
      "<b>One spell slot per turn:</b> you've only got 2, and a Short Rest gets them back. Ask for one between fights."
    ]
  },
  level5:[
    "Hit points go up by 7.",
    "<b>Eldritch Blast fires two beams</b>, each with its own attack, Hex die and push.",
    "Your slots become <b>level 3</b>. Everything from them gets stronger: Burning Hands does 5d6, Scorching Ray 4 rays, Hex lasts 8 hours.",
    "Your patron adds <b>Fireball</b> and <b>Stinking Cloud</b>, always prepared. Your species adds <b>Darkness</b>, free once per Long Rest.",
    "Prepare one more spell: try <b>Hypnotic Pattern</b>.",
    "<b>Two more invocations:</b> try <b>Devil's Sight</b>, to see in magical darkness out to 120 ft, which goes very well with Darkness, and <b>Eldritch Mind</b>, for Advantage on holding concentration on Hex.",
    "Dark One's Blessing gives 9 temporary hit points."
  ],
  level5cards:[
    {nm:"Fireball", meta:"Action · 150 ft · 20-ft-radius sphere · level 3",
     does:"Dex save, DC 15: 8d6 fire, half on a save. Lights up anything flammable that isn't being carried.",
     use:"A crowd of enemies, with your friends outside the circle."},
    {nm:"Hypnotic Pattern", meta:"Action · 120 ft · 30-ft cube · concentration, 1 min · level 3",
     does:"Wis save, DC 15, or a creature is Charmed: it can't act or move. It ends if the creature takes damage or someone shakes it awake.",
     use:"A group's about to swarm you. It replaces Hex for that fight."},
    {nm:"Darkness", meta:"Action · 60 ft · 15-ft radius · concentration, up to 10 min · level 2 · free once",
     does:"Magical darkness that normal light can't get through. With Devil's Sight, you can see through it and they can't see you.",
     use:"Escaping, or making an entrance."}
  ]
});
