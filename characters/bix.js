character({
  id:"bix", player:"Will", name:"Bix Grimlor", color:"#b5431a",
  tag:"Goblin Circle of Wildfire Druid. Burns things so better things can grow.",
  intro:"Goblin and Wildfire Druid are already yours. Both come from older books, not the 2024 Player's Handbook. We use them under the 2024 rules: your ability bonuses come from your background, not your species, and the circle starts at level 3 when 2024 druids pick a circle. Scott has the final say on anything older. Everything marked <span class='rec'>Recommended</span> is a suggestion.",
  scores:{str:8, dex:14, con:14, int:13, wis:18, cha:10},
  saves:["int","wis"],
  skills:["Medicine","Religion","Nature","Perception"],
  skillBonus:{Nature:"wis", Arcana:"wis"},
  ac:m => 11 + m.dex + 2,
  spellAbility:"wis",
  steps:[
    {h:"Step 1: class", items:[
      {k:"Class", pick:"Druid", why:"Yours already. A caster who pulls power from nature, and in your case from burning it down."},
      {k:"Primal Order", pick:"Magician", rec:1, why:"You're not a front-liner. An extra cantrip and better Nature and Arcana suit a kid who's good at school."},
      {k:"Hit points at level 1", pick:"8 + Con", why:"Every class in this party uses a d8 for hit points."}
    ]},
    {h:"Step 2: origin", items:[
      {k:"Background", pick:"Hermit", rec:1, why:"You've spent years keeping away from people. It boosts Wisdom and Con, gives Medicine and Religion, a Herbalism Kit, and the Healer feat."},
      {k:"Species", pick:"Goblin", why:"Yours already. From Monsters of the Multiverse, so skip its ability bonuses and use your background's. You keep Fury of the Small, Nimble Escape, Fey Ancestry and darkvision."},
      {k:"Languages", pick:"Common, Goblin, Gnomish", rec:1, why:"Everyone gets Common plus two."}
    ]},
    {h:"Step 3: ability scores", items:[
      {k:"Method", pick:"Standard array: 15, 14, 13, 12, 10, 8", why:"Quick, and everyone's characters stay even."},
      {k:"Placement", pick:"Wis 15, Dex 14, Con 13, Int 12, Cha 10, Str 8", rec:1, why:"Wisdom is all your magic. Dex gives AC. You're not a people person, and you're not lifting anything."},
      {k:"Background bonus", pick:"+2 Wis, +1 Con: Wis 17, Con 14", why:"Backgrounds give +2 and +1 to scores they list."}
    ]},
    {h:"Step 4: level by level", items:[
      {k:"Level 1", pick:"Spellcasting, Druidic, Primal Order", why:"Skills: Nature and Perception, on top of Medicine and Religion. Cantrips: Produce Flame, Guidance, plus Druidcraft from Magician. Prepare 4: Healing Word, Faerie Fire, Entangle, Thunderwave."},
      {k:"Level 2", pick:"Wild Shape, Wild Companion", why:"Pick 4 small beast forms: a rat, a cat and a spider work anywhere. Prepare 5: Goodberry for now. Level 1 slots go to 3."},
      {k:"Level 3", pick:"Subclass: Circle of Wildfire", why:"Yours already. Summon Wildfire Spirit, and four spells always prepared. Prepare 6: swap Goodberry for Heat Metal, add Spike Growth. Slots: 4 level 1, 2 level 2."},
      {k:"Level 4", pick:"Ability Score Improvement: +1 Wis, +1 Int", rec:1, why:"Wisdom 18 raises every spell. Int 13 adds to Arcana and Nature. Add a fourth cantrip, Thorn Whip, and prepare 7, adding Barkskin. Level 2 slots go to 3."}
    ]}
  ]
});
