character({
  id:"yobo", player:"John", name:"Yobo", color:"#8a2f6b",
  tag:"Human College of Lore Bard. The biggest personality in the theatre department.",
  line:"Human, Entertainer background, College of Lore bard. You boost your friends and tear down everyone else.",
  intro:"Bard is what you're leaning toward, so it's our recommendation too. Species and subclass aren't settled, so they're marked <span class='rec'>Recommended</span>.",
  scores:{str:8, dex:15, con:14, int:10, wis:12, cha:18},
  saves:["dex","cha"],
  skills:["Acrobatics","Performance","Insight","Deception","Persuasion","Intimidation","Perception","Investigation","Arcana"],
  expertise:["Performance","Deception"],
  jack:true,
  hpBonusPerLevel:2,
  ac:m => 11 + m.dex, acNote:"leather + Dex",
  speed:"30 ft",
  spellAbility:"cha",
  attacks:[
    {nm:"Vicious Mockery", ability:"spell", save:"Wis", dmg:"1d6", type:"psychic", note:"Cantrip. Range 60 ft. On a failed save, its next attack has Disadvantage."},
    {nm:"Dagger", ability:"dex", dmg:"1d4", addMod:true, type:"piercing", note:"Melee, or thrown 20/60."}
  ],
  level5dmg:{"Vicious Mockery":"2d6 psychic"},
  slots:[{lvl:"1st", n:4, back:"Long Rest"}, {lvl:"2nd", n:3, back:"Long Rest"}],
  featureList:["Bardic Inspiration, d6, 4 uses","Cutting Words","Expertise: Performance, Deception","Jack of All Trades","Bonus Lore skills","Musician (Origin feat)","Tough (Human Versatile)","Resourceful: Heroic Inspiration each Long Rest"],
  training:["Armor: light","Weapons: simple","Tools: lute, guitar, drum, fiddle, flute, hand drum","Languages: Common, Elvish, Gnomish"],
  gear:["Leather armor","2 daggers","Lute, your spellcasting focus","Entertainer's Pack, 2 costumes, mirror, perfume, traveler's clothes","30 GP"],
  spellSheet:[
    {h:"Cantrips", list:"Vicious Mockery, Minor Illusion, Prestidigitation"},
    {h:"Level 1", list:"Healing Word, Dissonant Whispers, Faerie Fire, Charm Person"},
    {h:"Level 2", list:"Shatter, Hold Person, Suggestion"}
  ],
  steps:[
    {h:"Step 1: class", items:[
      {k:"Class", pick:"Bard", rec:1, why:"Your concept leans this way, and it's the class of being loud on stage. You also get the most skills of anyone here."},
      {k:"Hit points at level 1", pick:"8 + Con", why:"Every class in this party uses a d8 for hit points."}
    ]},
    {h:"Step 2: origin", items:[
      {k:"Background", pick:"Entertainer", rec:1, why:"Theatre kid. It boosts Charisma and Dex, gives Performance, Acrobatics and an instrument, and the Musician feat."},
      {k:"Species", pick:"Human", rec:1, why:"Nothing strange, just the most popular guy in school. You get an extra skill, a free Origin feat and a reroll each day."},
      {k:"Human choices", pick:"Skill: Insight. Feat: Tough", rec:1, why:"Reading a room is half the act. Tough makes up for your low AC."},
      {k:"Languages", pick:"Common, Elvish, Gnomish", rec:1, why:"Everyone gets Common plus two."}
    ]},
    {h:"Step 3: ability scores", items:[
      {k:"Method", pick:"Standard array: 15, 14, 13, 12, 10, 8", why:"Quick, and everyone's characters stay even."},
      {k:"Placement", pick:"Cha 15, Dex 14, Con 13, Wis 12, Int 10, Str 8", rec:1, why:"Charisma is your magic and your whole personality. Dex gives AC. Wis helps saves."},
      {k:"Background bonus", pick:"+2 Cha, +1 Dex: Cha 17, Dex 15", why:"Backgrounds give +2 and +1 to scores they list."}
    ]},
    {h:"Step 4: level by level", items:[
      {k:"Level 1", pick:"Spellcasting, Bardic Inspiration", why:"Skills: Deception, Persuasion, Intimidation. Cantrips: Vicious Mockery, Prestidigitation. Prepare 4: Healing Word, Dissonant Whispers, Faerie Fire, Charm Person. Three instruments: lute, guitar, drum."},
      {k:"Level 2", pick:"Expertise, Jack of All Trades", why:"Expertise in Performance and Deception. Prepare 5: Thunderwave for now. Slots: 3 level 1."},
      {k:"Level 3", pick:"Subclass: College of Lore", rec:1, why:"You tear people down for a living, and Cutting Words is exactly that as a rule. Three more skills: Perception, Investigation, Arcana. Prepare 6: swap Thunderwave for Shatter, add Hold Person. Slots: 4 level 1, 2 level 2."},
      {k:"Level 4", pick:"Ability Score Improvement: +1 Cha, +1 Con", rec:1, why:"Cha 18 raises every spell, and Con 14 adds hit points. A third cantrip, Minor Illusion. Prepare 7, adding Suggestion. Level 2 slots go to 3."}
    ]}
  ]
});
