character({
  id:"gnomey", player:"Julia", name:"Gnomey Soprano", color:"#7a2d1f",
  tag:"Gnome Rogue. Cute, unseeming, secretly deadly.",
  line:"Small gnome, Criminal background, Assassin rogue. You act first and you hit hard once.",
  intro:"Gnome and Rogue are already yours. Everything marked <span class='rec'>Recommended</span> is a suggestion: swap it if something else sounds more fun.",
  scores:{str:8, dex:18, con:16, int:12, wis:10, cha:13},
  saves:["dex","int"],
  saveNote:"Gnomish Cunning: Advantage on every Intelligence, Wisdom and Charisma save.",
  skills:["Sleight of Hand","Stealth","Deception","Investigation","Perception","Persuasion"],
  expertise:["Stealth","Deception"],
  initProf:true,
  ac:m => 11 + m.dex, acNote:"leather + Dex",
  speed:"30 ft",
  attacks:[
    {nm:"Shortsword", ability:"dex", dmg:"1d6", addMod:true, type:"piercing", note:"Vex: a hit gives Advantage on your next attack against that target."},
    {nm:"Dagger, in the other hand", ability:"dex", dmg:"1d4", type:"piercing", note:"Nick: a free extra attack when you attack with the shortsword. No Dex on the damage."},
    {nm:"Dagger, thrown", ability:"dex", dmg:"1d4", addMod:true, type:"piercing", note:"Range 20/60."},
    {nm:"Shortbow", ability:"dex", dmg:"1d6", addMod:true, type:"piercing", note:"Range 80/320. Two hands, so no dagger."}
  ],
  featureList:["Sneak Attack, 2d6 once per turn","Assassinate: first-round bonus","Cunning Action","Steady Aim","Expertise: Stealth, Deception","Weapon Mastery: shortsword (Vex), dagger (Nick)","Alert (Origin feat)","Gnomish Cunning","Rock Gnome: Mending, Prestidigitation","Darkvision 60 ft","Thieves' Cant"],
  training:["Armor: light","Weapons: simple, plus martial weapons with Finesse or Light","Tools: Thieves' Tools, Disguise Kit, Poisoner's Kit","Languages: Common, Gnomish, Goblin, Elvish, Thieves' Cant"],
  gear:["Leather armor","Shortsword, 2 daggers from the class, 2 more from the background","Shortbow, quiver, 20 arrows","Thieves' Tools, Disguise Kit, Poisoner's Kit","Crowbar, 2 pouches, Burglar's Pack, traveler's clothes","24 GP"],
  steps:[
    {h:"Step 1: class", items:[
      {k:"Class", pick:"Rogue", why:"Yours already. Rogues do one big hit a turn and are hard to pin down."},
      {k:"Hit points at level 1", pick:"8 + Con", why:"Every class in this party uses a d8 for hit points."}
    ]},
    {h:"Step 2: origin", items:[
      {k:"Background", pick:"Criminal", rec:1, why:"You sell things in the school bathroom. It gives Dex, Con or Int bonuses, Thieves' Tools, Sleight of Hand, Stealth and the Alert feat."},
      {k:"Species", pick:"Gnome, Rock lineage", rec:1, why:"Gnome is yours. Rock gives you Mending and Prestidigitation, the right small tricks for a hustler."},
      {k:"Languages", pick:"Common, Gnomish, Goblin", rec:1, why:"Everyone gets Common plus two. Goblin is handy around the school."}
    ]},
    {h:"Step 3: ability scores", items:[
      {k:"Method", pick:"Standard array: 15, 14, 13, 12, 10, 8", why:"Quick, and everyone's characters stay even."},
      {k:"Placement", pick:"Dex 15, Con 14, Cha 13, Int 12, Wis 10, Str 8", rec:1, why:"Dex is your attacks, your armor and your stealth. Con keeps you alive. Cha for talking people into things."},
      {k:"Background bonus", pick:"+2 Dex, +1 Con: Dex 17, Con 15", why:"Backgrounds give +2 and +1 to scores they list."}
    ]},
    {h:"Step 4: level by level", items:[
      {k:"Level 1", pick:"Sneak Attack 1d6, Expertise, Weapon Mastery, Thieves' Cant", why:"Skills: Deception, Investigation, Perception, Persuasion, on top of the background's two. Expertise in Stealth and Deception. Mastery in shortsword and dagger. One extra language: Elvish."},
      {k:"Level 2", pick:"Cunning Action", why:"Your bonus action is now always useful. Hit points go up by 5 + Con each level."},
      {k:"Level 3", pick:"Subclass: Assassin, plus Steady Aim", rec:1, why:"Secretly deadly and mob-boss flavoured: you strike first. Sneak Attack rises to 2d6. If you want more Puss in Boots swagger, Swashbuckler is the swap: ask Scott."},
      {k:"Level 4", pick:"Ability Score Improvement: +1 Dex, +1 Con", rec:1, why:"Dex 18 and Con 16: better attacks and AC, and more hit points all the way back to level 1."}
    ]}
  ]
});
