character({
  id:"simone", player:"Simone", name:"Simone's Warlock", color:"#5a1f2e",
  tag:"Tiefling Warlock. Love spells and revenge spells, reasonable rates.",
  line:"Tiefling, Charlatan background, warlock. You never run out of Eldritch Blast.",
  intro:"Warlock is yours. Species and name aren't settled. Every warlock gets their power from a patron, and yours stays between you and Scott: it's on your printed handout. Everything marked <span class='rec'>Recommended</span> is a suggestion.",
  scores:{str:8, dex:14, con:14, int:10, wis:13, cha:18},
  saves:["wis","cha"],
  skills:["Deception","Sleight of Hand","Arcana","Intimidation","Persuasion","Insight","Investigation"],
  ac:m => 13 + m.dex, acNote:"Armor of Shadows + Dex",
  speed:"30 ft",
  spellAbility:"cha",
  attacks:[
    {nm:"Eldritch Blast", ability:"spell", dmg:"1d10 +4", type:"force", note:"Cantrip. Range 120 ft. Add 1d6 necrotic if the target is Hexed. A hit can push it 10 ft."},
    {nm:"Fire Bolt", ability:"spell", dmg:"1d10", type:"fire", note:"Tiefling cantrip. Range 120 ft. Eldritch Blast is nearly always better."},
    {nm:"Dagger", ability:"dex", dmg:"1d4", addMod:true, type:"piercing", note:"Melee, or thrown 20/60."}
  ],
  level5dmg:{"Eldritch Blast":"1d10 +4 force, two beams", "Fire Bolt":"2d10 fire"},
  slots:[{lvl:"2nd (all your slots)", n:2, back:"Short or Long Rest"}],
  featureList:["Pact Magic: 2 slots, level 2","Patron feature: on your handout","Eldritch Invocations: Armor of Shadows, Agonizing Blast, Repelling Blast","Magical Cunning","Skilled (Origin feat)","Fire Resistance","Tiefling legacy: Fire Bolt, Hellish Rebuke","Thaumaturgy","Darkvision 60 ft"],
  training:["Armor: light","Weapons: simple","Tools: Forgery Kit","Languages: Common, Draconic, Elvish"],
  gear:["Leather armor, for when you can't be bothered with Armor of Shadows","Sickle, 2 daggers","Arcane focus (an orb)","A book of occult lore, Scholar's Pack","Forgery Kit, costume, fine clothes","30 GP, for now. It's going in the piggy bank."],
  spellSheet:[
    {h:"Cantrips", list:"Eldritch Blast, Mage Hand, Minor Illusion, Fire Bolt, Thaumaturgy"},
    {h:"Spells you chose", list:"Hex, Armor of Agathys, Charm Person, Misty Step, Hold Person"},
    {h:"Free from your species", list:"Hellish Rebuke"}
  ],
  steps:[
    {h:"Step 1: class", items:[
      {k:"Class", pick:"Warlock", why:"Yours already. Your magic comes from a deal. You don't get many spells, but you never run out of Eldritch Blast."},
      {k:"Hit points at level 1", pick:"8 + Con", why:"Every class in this party uses a d8 for hit points."}
    ]},
    {h:"Step 2: origin", items:[
      {k:"Background", pick:"Charlatan", rec:1, why:"You sell love spells and revenge spells to classmates. It boosts Charisma and Con, gives Deception, Sleight of Hand, a Forgery Kit and the Skilled feat."},
      {k:"Skilled choices", pick:"Persuasion, Insight, Investigation", rec:1, why:"Reading a customer and closing the sale."},
      {k:"Species", pick:"Tiefling, Infernal legacy", rec:1, why:"Feared and misunderstood suits you. It adds Fire Resistance, Fire Bolt, Hellish Rebuke and Darkness. Human also works if you'd rather look ordinary."},
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
      {k:"Level 3", pick:"Subclass: your patron", why:"Your patron's feature and its always-prepared spells are on your printed handout. Your species adds Hellish Rebuke. Prepare Misty Step as your fourth. Your 2 slots become level 2."},
      {k:"Level 4", pick:"Ability Score Improvement: +1 Cha, +1 Wis", rec:1, why:"Cha 18 raises every spell and blast. The other point has no big home, and Wis 13 is the likeliest to help later. A third cantrip: Minor Illusion. Prepare Hold Person as your fifth."}
    ]}
  ]
});
