character({
  id:"simone", player:"Simone", name:"Simone's Warlock", color:"#5a1f2e",
  tag:"Tiefling Warlock. Love spells and revenge spells, reasonable rates.",
  line:"Tiefling, Charlatan background, Fiend Patron warlock. Keep this page to yourself: it names your patron.",
  intro:"Warlock is yours, and your patron is the Devil, which makes you a <b>Fiend Patron</b> warlock under the 2024 rules. That part of your backstory is private, so <b>this link is just for you</b>. Species and name aren't settled. Everything marked <span class='rec'>Recommended</span> is a suggestion.",
  scores:{str:8, dex:14, con:14, int:10, wis:13, cha:18},
  saves:["wis","cha"],
  skills:["Deception","Sleight of Hand","Arcana","Intimidation","Persuasion","Insight","Investigation"],
  ac:m => 13 + m.dex, acNote:"Armor of Shadows + Dex",
  speed:"30 ft",
  spellAbility:"cha",
  attacks:[
    {nm:"Eldritch Blast", ability:"spell", dmg:"1d10 +4", type:"force", note:"Cantrip. Range 120 ft. Add 1d6 necrotic if the target is Hexed. A hit can push it 10 ft."},
    {nm:"Fire Bolt", ability:"spell", dmg:"1d10", type:"fire", note:"Tiefling cantrip. Range 120 ft. Eldritch Blast is nearly always better."},
    {nm:"Scorching Ray", ability:"spell", dmg:"2d6 each", type:"fire", note:"Level 2 spell. Three rays, each with its own attack roll."},
    {nm:"Dagger", ability:"dex", dmg:"1d4", addMod:true, type:"piercing", note:"Melee, or thrown 20/60."}
  ],
  level5dmg:{"Eldritch Blast":"1d10 +4 force, two beams", "Fire Bolt":"2d10 fire"},
  slots:[{lvl:"2nd (all your slots)", n:2, back:"Short or Long Rest"}],
  featureList:["Pact Magic: 2 slots, level 2","Dark One's Blessing","Eldritch Invocations: Armor of Shadows, Agonizing Blast, Repelling Blast","Magical Cunning","Skilled (Origin feat)","Fire Resistance","Fiendish Legacy: Fire Bolt, Hellish Rebuke","Thaumaturgy","Darkvision 60 ft"],
  training:["Armor: light","Weapons: simple","Tools: Forgery Kit","Languages: Common, Draconic, Elvish"],
  gear:["Leather armor, for when you can't be bothered with Armor of Shadows","Sickle, 2 daggers","Arcane focus (an orb)","A book of occult lore, Scholar's Pack","Forgery Kit, costume, fine clothes","30 GP, for now. It's going in the piggy bank."],
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
  ],
  steps:[
    {h:"Step 1: class", items:[
      {k:"Class", pick:"Warlock", why:"Yours already. Your magic comes from a deal. You don't get many spells, but you never run out of Eldritch Blast."},
      {k:"Hit points at level 1", pick:"8 + Con", why:"Every class in this party uses a d8 for hit points."}
    ]},
    {h:"Step 2: origin", items:[
      {k:"Background", pick:"Charlatan", rec:1, why:"You sell love spells and revenge spells to classmates. It boosts Charisma and Con, gives Deception, Sleight of Hand, a Forgery Kit and the Skilled feat. Acolyte is the other option if you want to lean into the worship side."},
      {k:"Skilled choices", pick:"Persuasion, Insight, Investigation", rec:1, why:"Reading a customer and closing the sale."},
      {k:"Species", pick:"Tiefling, Infernal legacy", rec:1, why:"Feared and misunderstood, in a suburban family that thinks it's a phase. It adds Fire Resistance, Fire Bolt, Hellish Rebuke and Darkness. Human also works if you'd rather the goat stayed the only strange thing about you."},
      {k:"Tiefling size and ability", pick:"Medium, Charisma", rec:1, why:"Legacy spells use Charisma, same as the rest of your magic."},
      {k:"Languages", pick:"Common, Draconic, Elvish", rec:1, why:"Everyone gets Common plus two."}
    ]},
    {h:"Step 3: ability scores", items:[
      {k:"Method", pick:"Standard array: 15, 14, 13, 12, 10, 8", why:"Quick, and everyone's characters stay even."},
      {k:"Placement", pick:"Cha 15, Dex 14, Con 13, Wis 12, Int 10, Str 8", rec:1, why:"Charisma is all your magic. Dex gives AC. Wis helps your saves."},
      {k:"Background bonus", pick:"+2 Cha, +1 Con: Cha 17, Con 14", why:"Backgrounds give +2 and +1 to scores they list."}
    ]},
    {h:"Step 4: level by level", items:[
      {k:"Level 1", pick:"Pact Magic, 1 invocation", why:"Skills: Arcana and Intimidation, on top of your background's. Cantrips: Eldritch Blast, Mage Hand. Spells: Hex, Charm Person. Invocation: Armor of Shadows, so you can skip armor. You have 1 slot."},
      {k:"Level 2", pick:"Magical Cunning, 2 more invocations", why:"Agonizing Blast is the big one: it adds your Charisma to every blast. Repelling Blast is the fun one. Prepare Armor of Agathys as your third spell. You have 2 slots."},
      {k:"Level 3", pick:"Subclass: Fiend Patron", why:"Your patron is the Devil, so this is yours. Dark One's Blessing, plus Burning Hands, Command, Scorching Ray and Suggestion always prepared. Your species adds Hellish Rebuke. Prepare Misty Step as your fourth. Your 2 slots become level 2."},
      {k:"Level 4", pick:"Ability Score Improvement: +1 Cha, +1 Wis", rec:1, why:"Cha 18 raises every spell and blast. The other point has no big home, and Wis 13 is the likeliest to help later. A third cantrip: Minor Illusion. Prepare Hold Person as your fifth."}
    ]}
  ]
});
