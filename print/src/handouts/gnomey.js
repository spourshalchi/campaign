handout("gnomey", {
  features:[
    {nm:"Sneak Attack", meta:"Once per turn · no limit per day · 2d6 now, 3d6 at level 5",
     does:"Add 2d6 to one hit each turn with a Finesse or ranged weapon, if you have Advantage on the attack <b>or</b> an ally is within 5 ft of your target. This is most of your damage.",
     use:"Every turn you can. If the first attack misses, you can still add it to the dagger."},
    {nm:"Assassinate", meta:"Every combat · first round only",
     does:"You have Advantage on Initiative. In round 1 you have Advantage on attacks against anyone who hasn't had a turn yet, and a Sneak Attack hit that round adds extra damage equal to your Rogue level: 4 now.",
     use:"Always: go for the biggest target who hasn't moved yet."},
    {nm:"Cunning Action", meta:"Bonus action · every turn",
     does:"Dash, Disengage or Hide as a bonus action.",
     use:"After you stab something: Disengage and walk away, or Hide behind cover."},
    {nm:"Steady Aim", meta:"Bonus action · every turn",
     does:"Gives you Advantage on your next attack this turn, which turns on Sneak Attack. You must not have moved this turn, and your Speed is 0 for the rest of it.",
     use:"You're at range with the shortbow and no ally is near your target."},
    {nm:"Vex and Nick (Weapon Mastery)", meta:"Always on · you can swap the two weapons after a Long Rest",
     does:"Vex: when your shortsword hits and does damage, you have Advantage on your next attack against that target before the end of your next turn. Nick: when you attack with the shortsword, you can also attack with the dagger in your other hand as part of the same action, so your bonus action stays free.",
     use:"Stab with the shortsword first, so a hit gives the dagger Advantage."},
    {nm:"Expertise", meta:"Always on",
     does:"Double proficiency in Stealth and Deception. That's why they're your two biggest numbers.",
     use:"Hiding, and lying to anyone about anything."},
    {nm:"Alert", meta:"Origin feat · always on",
     does:"Adds your proficiency bonus to Initiative. Right after everyone rolls, you can also swap your Initiative with a willing ally.",
     use:"Swap only if a friend badly needs to go first. You usually want to go first yourself."},
    {nm:"Gnomish Cunning", meta:"Species · always on",
     does:"Advantage on Intelligence, Wisdom and Charisma saves. Most spells that mess with your head use those.",
     use:"It's automatic. Remind Scott."},
    {nm:"Rock Gnome", meta:"Species · cantrips, no limit",
     does:"You know Mending (fix a small break, takes a minute) and Prestidigitation (tiny tricks: light a cigarette, clean a shirt, make a small smell or sound). With 10 minutes you can build a tiny clockwork toy that does one Prestidigitation trick. Up to 3 at once, and each falls apart after 8 hours.",
     use:"Any time you want to look like you have a guy for that."},
    {nm:"Assassin's Tools", meta:"Always on",
     does:"You own a Disguise Kit and a Poisoner's Kit and are proficient with both. Add +2 when you use them.",
     use:"Getting into places, and level 5's poison trick."},
    {nm:"Thieves' Tools", meta:"Always on",
     does:"Proficient, so add +2 and your Dex (+6 in all) to pick locks and disarm traps.",
     use:"Locked things."}
  ],
  turn:{
    title:"Stab, stab, leave",
    steps:[
      "<b>Move</b> next to a target who already has an ally beside them, or who hasn't acted yet in round 1.",
      "<b>Attack with the shortsword.</b> If it hits, add Sneak Attack (2d6), plus 4 in round 1 if the target hasn't gone yet.",
      "<b>Attack with the dagger</b>, free, thanks to Nick. If the shortsword missed and this hits, Sneak Attack goes here instead.",
      "<b>Bonus action: Disengage</b> and walk away, or Hide if there's cover."
    ],
    options:[
      ["Nobody's near your target and you're at range","Don't move. Steady Aim, then shoot with the shortbow for Advantage and Sneak Attack."],
      ["You need to get across the room","Bonus action Dash: 60 ft in a turn, and you can still attack when you arrive."],
      ["You're surrounded","Disengage first, walk out, then throw a dagger from where you end up."]
    ],
    extras:[
      "<b>Bonus action:</b> Disengage, Hide, Dash or Steady Aim, one per turn.",
      "<b>Reaction:</b> nothing yet except an Opportunity Attack when an enemy walks away from you. At level 5 you get Uncanny Dodge.",
      "Sneak Attack only counts once a turn. On an enemy's turn you can use it again with an Opportunity Attack."
    ]
  },
  level5:[
    "Sneak Attack becomes <b>3d6</b>. Your round-1 Assassinate bonus becomes 5.",
    "New reaction and new tricks: the two cards below.",
    "Nothing here needs choosing: your build stays the same."
  ],
  level5cards:[
    {nm:"Uncanny Dodge", meta:"Reaction · once per round",
     does:"When an attacker you can see hits you, halve that attack's damage.",
     use:"Any big hit. It's your only reaction worth saving."},
    {nm:"Cunning Strike", meta:"Part of a Sneak Attack · every turn · save DC 15",
     does:"Give up one Sneak Attack die (decide before rolling) for one extra effect. <b>Trip:</b> a Large or smaller target makes a Dex save or falls Prone. <b>Withdraw:</b> move half your Speed right away with no Opportunity Attacks. <b>Poison:</b> a Con save or Poisoned for a minute, repeating the save each turn. Needs your Poisoner's Kit.",
     use:"Trip, so your friends get Advantage. Withdraw, when you want your bonus action for something else."}
  ]
});
