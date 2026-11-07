character({
  id:"russ", player:"Cody", name:"Russ", color:"#2f6b3a",
  tag:"Firbolg Druid. Wilderness Scouts of Transyltown, Troop 187. Always prepared.",
  line:"Firbolg, Guide background, Circle of the Land druid. You heal your friends, talk to animals and know the outdoors.",
  intro:"Firbolg and Druid are already yours. Firbolg comes from an older book, not the 2024 Player's Handbook. We use it under the 2024 rules: your ability bonuses come from your background, not your species. Scott has the final say. Everything marked <span class='rec'>Recommended</span> is a suggestion.",
  scores:{str:8, dex:14, con:14, int:13, wis:18, cha:10},
  saves:["int","wis"],
  skills:["Stealth","Survival","Nature","Insight"],
  ac:m => 12 + Math.min(m.dex, 2) + 2, acNote:"hide + Dex + shield",
  speed:"30 ft",
  spellAbility:"wis",
  attacks:[
    {nm:"Produce Flame", ability:"spell", dmg:"1d8", type:"fire", note:"Cantrip. Range 60 ft. Bonus action to light it, then your action to throw it."},
    {nm:"Thorn Whip", ability:"spell", dmg:"1d6", type:"piercing", note:"Cantrip. Range 30 ft. Pulls the target 10 ft toward you."},
    {nm:"Moonbeam", ability:"spell", save:"Con", dmg:"2d10", type:"radiant", note:"Level 2 spell. Half on a save. Hits again whenever someone enters it or ends a turn in it."},
    {nm:"Shortbow", ability:"dex", dmg:"1d6", addMod:true, type:"piercing", note:"Range 80/320. No slot needed, but your cantrips hit harder."},
    {nm:"Quarterstaff", ability:"str", dmg:"1d6", addMod:true, type:"bludgeoning", note:"Two hands: 1d8. For when you're out of everything."}
  ],
  level5dmg:{"Produce Flame":"2d8 fire", "Thorn Whip":"2d6 piercing"},
  slots:[{lvl:"1st", n:4, back:"Long Rest"}, {lvl:"2nd", n:3, back:"Long Rest"}],
  featureList:["Land's Aid","Circle Spells: temperate","Wild Shape, 2 uses","Wild Companion","Primal Order: Warden","Druidic","Magic Initiate (Origin feat)","Speech of Beast and Leaf","Firbolg Magic","Hidden Step, 2 uses","Powerful Build"],
  training:["Armor: light, medium, shields","Weapons: simple, martial","Tools: Herbalism Kit, Cartographer's Tools","Languages: Common, Elvish, Giant, Druidic"],
  gear:["Hide armor, shield","Sickle, quarterstaff (your druidic focus)","Shortbow, quiver, 20 arrows","Herbalism Kit, Cartographer's Tools","Explorer's Pack, bedroll, tent, traveler's clothes","2 GP"],
  spellSheet:[
    {h:"Cantrips", list:"Produce Flame, Guidance, Thorn Whip, Starry Wisp, Mending, Shocking Grasp"},
    {h:"Level 1", list:"Speak with Animals, Healing Word, Cure Wounds, Goodberry, Thunderwave, Entangle, Sleep"},
    {h:"Level 2", list:"Moonbeam, Pass without Trace, Barkskin, Misty Step"}
  ],
  steps:[
    {h:"Step 1: class", items:[
      {k:"Class", pick:"Druid", why:"Yours already. Every 2024 druid always has Speak with Animals prepared, which is exactly what you want."},
      {k:"Primal Order", pick:"Warden", rec:1, why:"You'll be stepping up to help people, so better armor keeps you on your feet. It's also simpler than one more cantrip."},
      {k:"Hit points at level 1", pick:"8 + Con", why:"Every class in this party uses a d8 for hit points."}
    ]},
    {h:"Step 2: origin", items:[
      {k:"Background", pick:"Guide", rec:1, why:"You're a wilderness scout. It boosts Wisdom and Con, gives Stealth, Survival, Cartographer's Tools and Magic Initiate."},
      {k:"Magic Initiate choices", pick:"Starry Wisp, Mending, Goodberry", rec:1, why:"Goodberry is scout snacks that heal. Mending is for fixing things for your elders."},
      {k:"Species", pick:"Firbolg", why:"Yours already. From Monsters of the Multiverse, so skip its ability bonuses and use your background's. You keep Speech of Beast and Leaf, Firbolg Magic (using Wisdom), Hidden Step and Powerful Build."},
      {k:"Languages", pick:"Common, Elvish, Giant", rec:1, why:"Everyone gets Common plus two. These are firbolg traditions."}
    ]},
    {h:"Step 3: ability scores", items:[
      {k:"Method", pick:"Standard array: 15, 14, 13, 12, 10, 8", why:"Quick, and everyone's characters stay even."},
      {k:"Placement", pick:"Wis 15, Dex 14, Con 13, Int 12, Cha 10, Str 8", rec:1, why:"Wisdom is all your magic. Dex gives AC. Int helps Nature. A big firbolg with Str 8 is funny, and Powerful Build covers the lifting."},
      {k:"Background bonus", pick:"+2 Wis, +1 Con: Wis 17, Con 14", why:"Backgrounds give +2 and +1 to scores they list."}
    ]},
    {h:"Step 4: level by level", items:[
      {k:"Level 1", pick:"Spellcasting, Druidic, Primal Order", why:"Skills: Nature and Insight, on top of Stealth and Survival. Cantrips: Produce Flame, Guidance. Prepare 4: Healing Word, Cure Wounds, Thunderwave, Entangle."},
      {k:"Level 2", pick:"Wild Shape, Wild Companion", why:"Pick 4 small beast forms, with no flyers: a dog, a rabbit, a squirrel, a raccoon. Prepare 5: Faerie Fire for now. Level 1 slots go to 3."},
      {k:"Level 3", pick:"Subclass: Circle of the Land, temperate", rec:1, why:"Land's Aid heals and hits with no spell slot, which suits a kid who wants to help. Prepare 6: swap Faerie Fire for Moonbeam, add Pass without Trace. Slots: 4 level 1, 2 level 2."},
      {k:"Level 4", pick:"Ability Score Improvement: +1 Wis, +1 Int", rec:1, why:"Wisdom 18 raises every spell. Int 13 helps Nature. A third class cantrip: Thorn Whip. Prepare 7, adding Barkskin. Level 2 slots go to 3."}
    ]}
  ]
});
