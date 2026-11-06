/* =====================================================================
   DOOD MANSION — FIGHT CARDS
   Every fight's stat lines and narration, in one place. Read by the combat
   page (run/combat/, one fight per ?f=<key>), the Run of Show (a scene's
   fight:FIGHTS.<key>: the link, the tokens row, Spencer's lines).

   Built from SRD 5.2 creatures (chassis), pared down so Scott can run it at the
   table. Damage is fixed (no damage dice). Rolls and initiative stay at the table.

   cue:   the Run of Show scene this fight belongs to.
   read:  read-alouds that open and close the fight, {open, close}: [{who, t, sp}].
          sp means Spencer voices it; {note} is a plain line for Scott. Copied from the scene card's read, talk and ifblock.
   guide: tokens, rounds [{k, say, who, sp}], other [[if, then]]: narrating the fight.
   lines: Spencer's in-fight lines [{who, t}].

   foe:  id, nm, n (how many), ac, hp, floor (lowest HP, if not 0), spd, chassis, cr, xp,
         say (one line of flavour), turn (1–3 steps), note (the one gimmick),
         drop (when it drops), hard / easy (the dials)
   run:  setup, matchups (who takes whom at the start), beats (one line per round),
         allyJob (the allies' job each round, narrated), win, ends, losing
   ally: nm, act (one thing, no roll), tok (where the token goes), say (one line of narration)
   ===================================================================== */
const FIGHTS = {

  library: {
    day:"Saturday", cue:3, name:"The trap in the binding",
    guide:{
      tokens:"The article on a reading table. Shears 1 and 2 either side of it, one lane each. The swarm at the card catalogue, the cart by the stacks.",
      rounds:[
        {k:"They open it", who:"The first cut lands before anyone moves. The tally starts at 1. Roll initiative.", say:"The binding splits and a pair of shears comes out of the spine. <i>Snick.</i> A strip of the article falls to the table."},
        {k:"Round 1", who:"Shears 1 and 2 dive for the article: a PC in the lane gets snipped, a clear lane means +1 cut. The cart rolls at the first blocker and pushes them out of the lane.", say:"They aren't coming for you. They're going for the page. Behind you, one squeaky wheel starts to roll."},
        {k:"Round 2", who:"The swarm engulfs a blocker. The cart keeps ramming blockers out of the lanes. One pair of shears should go down about now.", say:"The card catalogue drawers slide open all at once, and then it's snowing."},
        {k:"Round 3", who:"The second pair of shears drops and everything drops with it. Clear the map.", say:"The shears snap shut and clatter to the floor. The cards settle. The cart tips over and spills its books. The room is very quiet."}
      ],
      other:[
        ["Nobody guards the article","The shears just cut. +1 each. At 5 cuts the page is done and everything drops."],
        ["Someone picks up the volume","The shears follow it. Whoever holds it is in the way: snip them."],
        ["They ignore the shears","Fine. Only the second pair going down ends it, and they keep cutting."],
        ["Someone uses fire","Double on the swarm. Fire on the article is one more cut."],
        ["A PC hits 0 HP","Out cold and stable. Nothing in this room kills."],
        ["When the second pair drops","Clear the map. Read the cuts off the tally and set the Item 1 pieces."]
      ]},
    read:{close:[
      {who:"Records Keeper · after the fight", sp:1, t:"You can try to put it back together. But that was your primary source, and it's gone. If you want one now, you'll have to go look at the house yourselves. &hellip;But be careful."}
    ]},
    rule:"The shears go for the article, not the party. It <b>contains and erases; it does not kill.</b> Count the cuts &mdash; they set the puzzle.",
    run:{
      setup:"They open the volume. The shears come out of the spine and make the first cut before anyone moves (the tally starts at 1). Roll initiative.",
      matchups:"Shears 1 and 2 each take a lane to the article, one from each side. The cart and the swarm go for whoever blocks a lane. Ask the table who's guarding the book.",
      beats:["R1 · Both shears dive for the page. The cart rolls at the first blocker.",
             "R2 · The swarm engulfs a blocker. One pair of shears goes down.",
             "R3 · The second pair drops, and everything else drops with it."],
      win:"Drop both shears. When the second pair goes down, the rest of the stationery drops where it is.",
      ends:"Round 2 or 3.",
      losing:"Nobody dies here: a PC at 0 HP is out cold and stable. If it's going badly, the shears finish the page (5 cuts) and everything drops."
    },
    tally:{label:"Cuts", start:1, tiers:[[2,9],[4,16],[99,25]]},
    foes:[
      {id:"shears", nm:"Archival shears", n:2, ac:14, hp:12, spd:"fly 30", chassis:"Flying Sword", cr:"½", xp:100,
       say:"A dry snick-snick, like someone trimming coupons.",
       turn:["<b>A PC between it and the article?</b> Snip that PC: <b>+5 to hit, 6 slashing</b>. No cut this turn.",
             "<b>Nobody in the way?</b> It flies to the article and cuts. No roll. <b>Tap +1 cut.</b>"],
       note:"It never goes after anyone who isn't in its way.",
       drop:"It snaps shut and clatters to the floor.",
       hard:"One pair jams in the binding for a round: no cut that turn.",
       easy:"Give each pair 8 more HP (20)."},
      {id:"cards", nm:"Swarm of index cards", n:1, ac:12, hp:22, spd:"fly 30", chassis:"Swarm of Insects", cr:"½", xp:100,
       say:"The card catalogue drawers spit out a blizzard.",
       turn:["Moves onto the PC blocking a shears lane (or the nearest PC).",
             "Paper cuts: <b>+5 to hit, 7 slashing</b>."],
       note:"<b>Fire does double.</b>",
       drop:"The cards settle like snow and lie still.",
       hard:"Under 11 HP it does 4, not 7.",
       easy:"Add 10 HP (32)."},
      {id:"cart", nm:"The book cart", n:1, ac:14, hp:33, spd:"30", chassis:"Animated Armor", cr:"1", xp:200,
       say:"One squeaky wheel and a full load of bound newspapers.",
       turn:["Rolls at the PC blocking a shears lane (or the nearest PC).",
             "Ram: <b>+5 to hit, 9 bludgeoning</b>, and that PC is pushed 10 ft, out of the lane."],
       drop:"A wheel comes off; it tips over and spills its books.",
       hard:"It stops pushing: damage only.",
       easy:"Add 10 HP (43)."}
    ]
  },

  contact: {
    day:"Saturday", cue:6, name:"First contact &mdash; a pressure scene, not a fight",
    guide:{
      tokens:"None unless they fight back. Then Dracula on whoever failed Stealth, Orlok and Edward farther down the hall.",
      rounds:[
        {k:"Someone fails Stealth", who:"Dracula swoops 40 ft and grabs them: DC 15 Str or Dex save or grappled. Initiative only if they fight back.", say:"Something crosses the wall very fast. Then there are two cold hands on you and a delighted face much too close to yours."},
        {k:"Round 1", who:"Dracula shoves whoever he's holding 10 ft toward the others, or pins them and looms. No Bite, no damage. Orlok and Edward don't act. Edward watches Bix.", say:"He isn't hurting you. He's enjoying himself."},
        {k:"Round 2, or when it stops being fun", who:"Orlok says one word. Dracula lets go and steps back. Done.", say:"One word from down the hall, very quiet, and the hands are gone.", sp:"Orlok: &ldquo;The night is young. It would be terribly rude to be finished with you already&hellip; Go on. Have a look around. We'll find you when we're ready.&rdquo;"}
      ],
      other:[
        ["They hit him","He laughs. No HP to track."],
        ["They ask if this is part of the party","Yes, absolutely. He's delighted."],
        ["Someone runs","He doesn't chase. The dismissal lands anyway."],
        ["They go for Orlok or Edward","Neither acts. Edward explains nothing. Take the next round's line anyway."]
      ]},
    rule:"<b>The vampires can't kill a PC.</b> Grapple, shove, frighten: no Bite, no damage, nobody below 1 HP.",
    run:{
      setup:"Someone fails Stealth and Dracula swoops. Use initiative only if they fight back.",
      win:"Nobody wins. They get grabbed, shoved and scared, and nobody gets hurt.",
      ends:"When Orlok says one word: after a round or two, or the moment it stops being fun.",
      losing:"They can't lose. No Bite, no damage, nobody drops."
    },
    foes:[
      {id:"dracula", nm:"Dracula", n:1, ac:16, hp:0, spd:"40, climbs walls", chassis:"Vampire", cr:"&mdash;", xp:0,
       say:"Delighted. Asked if this is part of the party: yes, absolutely.",
       turn:["Swoops 40 ft at whoever failed Stealth and grabs them: <b>DC 15 Str or Dex save</b> or grappled. Escaping takes their action and a <b>DC 15</b> Athletics or Acrobatics check.",
             "<b>Already holding someone?</b> Shoves them 10 ft toward the others, or pins them and looms.",
             "<b>Orlok speaks?</b> Lets go and steps back. Done."],
       note:"<b>No Bite. No damage. Nobody drops.</b> No HP to track: if they hit him, he laughs.",
       drop:"He doesn't. Orlok's one word ends it.",
       hard:"He lets go and just watches.",
       easy:"He grabs a second PC. He has two hands."}
    ],
    alliesLabel:"Also in the hall",
    allies:[
      {nm:"Orlok", act:"Doesn't act. When you're ready to end it: one word."},
      {nm:"Edward", act:"Doesn't act. Watches Bix."}
    ]
  },

  summoning: {
    day:"Saturday", cue:9, name:"The botched summoning",
    guide:{
      tokens:"The 2&Prime; summoning in the middle of the chalk circle. Fragments 1&ndash;4 on the floor lines around it.",
      rounds:[
        {k:"Round 1", who:"Fragments 1 and 2 go for whoever hits it, 3 and 4 for the back line. It lurches for the sealed door and claws whoever is in its way.", say:"It isn't looking at you. It's dragging itself toward the door, toward something down the hall, and the chalk on the floor has started to crawl."},
        {k:"Round 2", who:"It claws twice at whoever stands between it and the door. The fragments start crumbling.", say:"It goes through whoever's in the way like they're furniture. It still isn't looking at you."},
        {k:"Round 3", who:"First time it's under 43 HP: the Unfinished Word. Every PC within 15 ft saves, DC 13 Wis: 13 psychic, half on a save.", say:"The hole in its chest turns toward you and it tries to say something. It doesn't get to the end of it. You feel it anyway."},
        {k:"Round 4", who:"It drops and the fragments crumble with it. Clear the map. The wreckage search, then the screen: both below.", say:"It stops with one arm still out toward the door."}
      ],
      other:[
        ["They leave the room","It can't follow. It keeps clawing toward the sealed door."],
        ["They run for the sealed door","It doesn't open tonight. Nobody reaches that room."],
        ["Someone tries to work out what it is","Arcana DC 14: human-made, incomplete. Who drew it stays open."],
        ["Someone searches the wreckage mid-fight","Not yet. Everyone rolls after the kill."],
        ["A PC hits 0 HP","It doesn't touch them. It wants the door."],
        ["When it drops","The wreckage search, then the screen. The night ends when the screen dies. Next card: level up."]
      ]},
    read:{close:[
      {who:"The wreckage search", t:"Take a minute to look through the wreckage. Everyone roll Investigation."},
      {note:"<b>DC 10:</b> the sticky note, <code>Fluffy123</code>, stuck to a candle box. <b>DC 12:</b> also another mic. Highest roll finds the note even on a miss. &#9995; the note; they keep it for Sunday."},
      {who:"After the search · fire the AIM chime as the screen wakes, then kill all sound", t:"A monitor deep in the house flickers on by itself. The old AIM chime carries down the hall. One line types itself across a screen nobody is sitting at &mdash; <b>&ldquo;is someone there&rdquo;</b> &mdash; then it goes dark."}
    ]},
    rule:"It's bound to its room and <b>claws toward the sealed door</b> the whole fight.",
    run:{
      setup:"They open the warm door. It drags itself up out of the chalk circle, and four fragments peel up off the floor lines. Roll initiative.",
      matchups:"The summoning takes whoever stands between it and the sealed door. Fragments 1 and 2 go for the PCs hitting it; fragments 3 and 4 go for the back line.",
      beats:["R1 · The fragments swarm. It lurches for the door.",
             "R2 · It claws whoever is in its way. The fragments start crumbling.",
             "R3 · Under half: the Unfinished Word.",
             "R4 · It drops. The monitor line."],
      win:"Drop the summoning. The fragments crumble with it.",
      ends:"Round 3 or 4. On the kill: the monitor line, the AIM chime, and the night ends.",
      losing:"It never attacks a PC at 0 HP: it wants the door. If two PCs are down, it tears through the wall toward the sealed door and comes apart on the threshold. Read the kill line anyway."
    },
    foes:[
      {id:"summon", nm:"The botched summoning", n:1, ac:13, hp:85, spd:"30", chassis:"Flesh Golem, scaled down", cr:"4", xp:1100,
       say:"A hole in its chest where something was never drawn.",
       turn:["Lurches toward the sealed door down the hall. It can't leave the room.",
             "Claws twice at the nearest PC: <b>+6 to hit, 9 slashing</b> each.",
             "<b>Once, the first time it's under 43 HP:</b> Unfinished Word. Every PC within 15 ft makes a <b>DC 13 Wis save</b>: 13 psychic, half on a save."],
       note:"Never attacks a PC at 0 HP.",
       drop:"Run the wreckage search first. Then read the monitor line, fire the AIM chime, and kill all sound.",
       hard:"It spends a turn clawing at the door instead of a PC.",
       easy:"Add 20 HP (105)."},
      {id:"frag", nm:"Ritual fragments", n:4, ac:12, hp:7, spd:"30", chassis:"Shadow, no Strength drain", cr:"¼", xp:50,
       say:"Chalk scrawls, crawling.",
       turn:["Goes for whoever is hitting the summoning (or the nearest PC).",
             "Grab: <b>+4 to hit, 5 necrotic</b>."],
       drop:"Crumbles to chalk dust.",
       hard:"Two of them smear out and stop. Mark them down.",
       easy:"Give each 5 more HP (12)."}
    ]
  },

  reserve: {
    day:"Sunday", cue:"R", name:"The circle stirs &mdash; reserve, don't plan on it",
    guide:{
      tokens:"The 2&Prime; summoning token is the remnant, in the half-drawn circle. Fragments 1&ndash;4 on the floor lines.",
      rounds:[
        {k:"Round 1", who:"Fragments 1&ndash;4 split across the party. The remnant claws the nearest PC twice.", say:"What's left of last night's thing pulls itself up out of the floorboards. Half of what it was, and still wrong."},
        {k:"Round 2", who:"The fragments crumble. First time it's under 50 HP: the Unfinished Word. Every PC within 15 ft saves, DC 14 Wis: 18 psychic, half on a save.", say:"It tries the same word as last night. It gets no further with it, and it hurts more."},
        {k:"Round 3", who:"It drops and the fragments crumble with it. Clear the map. On to the computer room.", say:"Chalk dust. The circle is just a drawing now."}
      ],
      other:[
        ["They leave the room","It can't follow. Fine. Move on to the computer room."],
        ["Someone studies the circle","Nothing new here. Move them on."],
        ["A PC hits 0 HP","It doesn't touch them."],
        ["It's eating the clock","It smears apart on its own. Move on."]
      ]},
    rule:"Only if a room solved in five minutes and there's time to spare.",
    run:{
      setup:"On the way up to the computer room, the half-drawn circle in last night's room is moving. What's left of the summoning pulls itself out, with four fragments. Roll initiative.",
      matchups:"The remnant takes the nearest PC. Fragments 1–4 split across the rest.",
      beats:["R1 · The fragments swarm. The remnant claws the nearest PC.",
             "R2 · The fragments crumble. Under half: the Unfinished Word.",
             "R3 · It drops."],
      win:"Drop the remnant. The fragments crumble with it.",
      ends:"Round 2 or 3. Nothing new is learned; move on to the computer room.",
      losing:"Same as last night: it never attacks a PC at 0 HP. If two PCs are down, it smears apart on its own."
    },
    foes:[
      {id:"remnant", nm:"The remnant", n:1, ac:14, hp:100, spd:"30", chassis:"Flesh Golem", cr:"6", xp:2300,
       say:"Half of last night's thing, still wrong.",
       turn:["Moves to the nearest PC. It can't leave the room.",
             "Claws twice: <b>+7 to hit, 11 slashing</b> each.",
             "<b>Once, the first time it's under 50 HP:</b> Unfinished Word. Every PC within 15 ft makes a <b>DC 14 Wis save</b>: 18 psychic, half on a save."],
       note:"Never attacks a PC at 0 HP.",
       drop:"Chalk dust. The circle is just a drawing now.",
       hard:"It spends a turn scrabbling at the floor lines.",
       easy:"Add 25 HP (125)."},
      {id:"frag2", nm:"Ritual fragments", n:4, ac:12, hp:10, spd:"30", chassis:"Shadow, no Strength drain", cr:"¼", xp:50,
       say:"The same chalk scrawls.",
       turn:["Goes for the nearest PC.",
             "Grab: <b>+5 to hit, 6 necrotic</b>."],
       drop:"Crumbles to chalk dust.",
       hard:"Two of them smear out and stop.",
       easy:"Give each 5 more HP (15)."}
    ]
  },

  developer: {
    day:"Sunday", cue:"14 · i", name:"The developer",
    read:{
      open:[
        {who:"The hard hats", t:"Hard hats push through the crowd. They walk right past you. They're going for the vampires. A man with a clipboard says one word, and Orlok, Dracula and Edward stop dead, pinned where they stand. His men take out stakes."},
        {who:"W. Ostrander · to his men", sp:1, t:"Stakes. Start with the old one."},
        {who:"After Ostrander's line", t:"<b>What do you do?</b>"}
      ],
      close:[
        {who:"He goes down", t:"Stop. Let the room be quiet for a moment."},
        {who:"Then the seal breaks", t:"The seal goes. Three vampires get up, and it's over fast for the men nearest them. Anyone else in a hard hat lets go of his crowbar."}
      ]},
    guide:{
      tokens:"Thugs 1&ndash;3 between the party and the vampires. Ostrander and thugs 4&ndash;6 on the vampires. Lay Orlok, Dracula and Edward on their sides: pinned. Dracula next to Yobo, Edward where Bix can see him. Poe Boy and Stinky up on the decks: not in this fight. Angelique with the party.",
      rounds:[
        {k:"Round 1", who:"Thugs 1&ndash;3 block the party and swing at the nearest PC. Thugs 4&ndash;6 hold the vampires down, no rolls. Ostrander works on Orlok and ignores the party until someone hits him or reaches him. Angelique calls off the thug on the most-hurt PC.", say:"Three of them step into your way. Behind them, a stake comes down to rest on Orlok's chest.", sp:"Orlok: &ldquo;Boy. Help me.&rdquo; Edward: &ldquo;Twenty-four years.&rdquo;"},
        {k:"Round 2", who:"Thugs 1&ndash;3 are on the party and starting to drop. Ostrander: Hold on whoever hit him, rod at anyone next to him.", say:"Dracula is frozen mid-flourish, cape out, an arm's length from Yobo. They've reached him. Somebody is measuring.", sp:"Poe Boy, on the mic: &ldquo;Oh, this is great. Keep going.&rdquo;"},
        {k:"Round 3", who:"Thugs 1&ndash;3 mostly down. Ostrander is exposed.", say:"They've got to the quiet one. A mallet goes up over a stake on Edward's chest. He isn't looking at it. He's looking at Bix."},
        {k:"Round 4 on", who:"Hold here. No vampire is ever actually killed. Ostrander goes down round 3 or 4.", say:"The mallet is still up. It's shaking."}
      ],
      other:[
        ["They go for Poe Boy first","He can't drop below 1 HP and Stinky blocks. The vampires keep calling for help. He isn't going anywhere. Take the next round's line anyway."],
        ["Nobody moves, or they try to talk","Ostrander doesn't stop. Orlok asks again. Take the next round's line anyway."],
        ["They try to break the seal","It holds until he drops. Point them at the man with the clipboard."],
        ["They go for thugs 4&ndash;6","Fine. Ostrander turns on whoever gets close."],
        ["They leave","The doors are open and nobody stops them. Orlok calls after them."],
        ["Russ heals a pinned vampire","That's <b>badge req 3</b>. If it doesn't happen here, it's still open at the booth."],
        ["When he drops","Take off Ostrander and every thug. Stand the vampires up. Next card."]
      ]},
    lines:[
      {who:"Orlok · pinned, to Russ", t:"Boy. Help me."},
      {who:"Edward · on seeing Ostrander's men", t:"Twenty-four years."},
      {who:"DJ Poe Boy · on the mic, during the fight", t:"Oh, this is great. Keep going."},
      {who:"The vampires · if they go for Poe Boy first", t:"Keep calling for help."}
    ],
    rule:"<b>The only lethal fight.</b> Ostrander pins the vampires with a seal and ignores the party until they interfere. <b>The vampires are never actually killed.</b>",
    run:{
      setup:"Ostrander and six thugs walk in with the crowd, go straight past the party and pin all three vampires with a seal (narrate it; it costs him nothing). Roll initiative when the party acts.",
      matchups:"Thugs 1–3 block the party. Thugs 4–6 are on the vampires. Ostrander ignores the party until they interfere. Poe Boy stays up on the decks, on the mic; he isn't in this fight.",
      beats:["R1 · Thugs 1–3 block and swing. A stake rests on Orlok's chest.",
             "R2 · Thugs 1–3 start dropping. Dracula is pinned mid-flourish near Yobo.",
             "R3 · Ostrander is exposed. A stake over Edward's chest, with Bix watching.",
             "R4 · He goes down. Stop. Silence. The seal breaks."],
      allyJob:"Pinned: the vampires don't act, and are never actually killed. When the seal breaks they finish thugs 4–6. Angelique calls off one of thugs 1–3 each round. Narrate it, no rolls.",
      win:"Drop Ostrander. The party has to do it, not the vampires.",
      ends:"Round 3 or 4, when he goes down. Stop. Let the room be quiet.",
      losing:"If two PCs are down: the seal slips and Orlok gets a hand free. Ostrander loses his turns, and the next hit from a PC kills him."
    },
    foes:[
      {id:"ostrander", nm:"W. Ostrander", n:1, ac:15, hp:100, spd:"30", chassis:"Mage, no damage spells", cr:"6", xp:2300,
       say:"An adult with a clipboard. To him this is a contamination problem on a site he's paid for.",
       turn:["<b>No PC has hit him or reached him?</b> Ignores the party and works on the vampires.",
             "<b>A PC hit him since his last turn?</b> Hold that PC: <b>DC 15 Wis save</b> or they lose their next turn, frozen.",
             "Surveyor's rod at a PC next to him: <b>+6 to hit, 10 bludgeoning</b>."],
       note:"The first 25 damage is his ward cracking: narrate it, it's in the 100. No damage spells. Doesn't swing at a PC who's down.",
       drop:"He's dead. Stop. Silence. The seal breaks: the vampires finish thugs 4–6, no rolls. Any of thugs 1–3 left drop their crowbars.",
       hard:"He keeps ignoring the party for one more round, even after they hit him.",
       easy:"Add 25 HP (another layer of ward)."},
      {id:"thug", nm:"Thugs", n:6, ac:12, hp:16, spd:"30", chassis:"Tough", cr:"½", xp:100,
       say:"A demolition crew. Hard hats, crowbars, stakes.",
       turn:["<b>Thugs 4–6 stay on the vampires, no rolls, unless a PC reaches them.</b> Thugs 1–3: <b>a PC on Ostrander?</b> Gets between them. Otherwise moves to the nearest PC.",
             "Crowbar: <b>+4 to hit, 8 bludgeoning</b>."],
       note:"Doesn't swing at a PC who's down.",
       drop:"Dead. A hard hat rolls across the floor.",
       hard:"One of thugs 1–3 breaks and runs.",
       easy:"Give each 8 more HP (24)."}
    ],
    alliesLabel:"Allies · no rolls",
    allies:[
      {nm:"Orlok, Dracula, Edward", act:"Pinned until the seal breaks, so they don't act. When the seal breaks they finish thugs 4–6: Dracula plays to the crowd; Orlok is quick and tidy; Edward is efficient and doesn't look at anyone. Mark each one down."},
      {nm:"Angelique", act:"Each round, after everyone: takes a hard hat's face and taps the thug on the most-hurt PC on the shoulder. He loses his next attack.",
       tok:"Next to that thug.",
       say:"A man in a hard hat taps him on the shoulder. He turns, and the face under the hat slides into Angelique's."}
    ]
  },

  booth: {
    day:"Sunday", cue:"14 · ii", name:"The booth",
    read:{
      open:[
        {who:"The vampires owe you", t:"The man who wanted this house is dead on the floor. Orlok is looking at you, and for once he isn't cold about it. The crowd hasn't noticed. The set hasn't stopped. Poe Boy is still up there."},
        {who:"Orlok · to the party, after the silence", sp:1, t:"What's on the drive?"},
        {who:"Orlok · if nobody raises the drive", sp:1, t:"You came down those stairs running. What did you find up there?"},
        {who:"DJ Poe Boy · panicking, borrowed voices", sp:1, t:"Don't touch that dial!"},
        {who:"Orlok · to Poe Boy", sp:1, t:"Let them play it."},
        {who:"DJ Poe Boy · refusing, on whoever holds the USB", sp:1, t:"Drop."},
        {who:"The objective", t:"Get the USB to the decks and get on aux."}
      ],
      close:[
        {who:"When the USB hits the decks · narrate the recording", t:"His set cuts out mid-scream. Then typing. A door shuts. Then a scared kid, asking someone to open it. Asking again, quieter. And under all of it, perfectly calm, Poe Boy: nudging a level up, leaning in close to listen, pleased with how clean it sounds."},
        {who:"Then let it sit", t:"The speakers hiss. Nobody in the ballroom moves."},
        {who:"Lil Stinky turns · oath breaks, no save", t:"The light goes out of the sword. He turns around and looks at his best friend."},
        {who:"Lil Stinky · to Poe Boy", sp:1, t:"I believed you, man."},
        {who:"Angelique · to the crowd, when the recording plays", sp:1, t:"I typed those messages."},
        {who:"Marcus · only if Simone paid the goat · to Poe Boy", sp:1, t:"you said you'd open it."},
        {who:"Marcus · to Poe Boy", sp:1, t:"i kept asking. you kept recording. you wrote GOOD on it."},
        {who:"Marcus · to the vampires", sp:1, t:"i didn't go out a window. i was upstairs. the whole time."},
        {who:"Marcus · last", sp:1, t:"ok. you can turn it off now."},
        {who:"The charm breaks", t:"The smiles go, all at once, across the whole room. Somebody boos. Then everybody does."},
        {who:"On the last turn", t:"It runs on into the early morning. By the end, the ballroom windows have gone grey."}
      ]},
    guide:{
      tokens:"Ostrander and the thugs are off. Vampires standing, with the party. Lil Stinky at the decks, Poe Boy behind him. Angelique with the party. The USB is wherever the party left it.",
      rounds:[
        {k:"After &ldquo;Drop.&rdquo;", who:"Roll initiative. Party and vampires against Poe Boy and Stinky. The goal is the USB, not killing him.", say:"<b>What do you do?</b>"},
        {k:"Round 1", who:"Poe Boy Commands the USB holder. Stinky gets back to the decks. One vampire acts: Orlok grips Stinky. Angelique goes to the USB holder in Poe Boy's face.", say:"One word, in somebody else's voice, and your hand opens. The drive hits the floor.", sp:"Angelique: &ldquo;Aux is round the back of the mixer, left side. I'm on the poster. I know this stage.&rdquo;"},
        {k:"Round 2", who:"Stinky swings at the USB holder and hits a vampire. Dracula carries the holder toward the decks.", say:"Stinky's sword catches a vampire. It smokes. It staggers."},
        {k:"Round 3", who:"Stinky gets moved or drops. Someone plugs in. Edward pulls a PC clear.", say:"He's off the decks. There's the aux."},
        {k:"Round 4", who:"The recording plays. Stinky's oath breaks, no save: move his token next to Poe Boy. His Aura is gone and the decks are open. Poe Boy's Command stops landing.", say:"Read the recording, below."},
        {k:"Round 5 on", who:"Stinky swings at Poe Boy. Angelique, in her own face, knifes him. The party takes him down. Give it two rounds, then the next PC hit knocks him out.", say:"He tries a voice. Then another one. Nobody in the room is listening.", sp:"Lil Stinky: &ldquo;I believed you, man.&rdquo;"}
      ],
      other:[
        ["Russ heals a vampire under fire","That's <b>badge req 3</b>, if it hasn't landed."],
        ["They try to kill Poe Boy","He can't drop below 1 HP until the recording plays: on his knees, still on the mic. Point at the decks."],
        ["They plug in with Stinky standing there","Nobody can while he's at the decks. Shove, grapple, a spell or a vampire moves him."],
        ["The USB is still upstairs","Someone runs it down, about 2 rounds."],
        ["It drags past round 4","Dracula lands the drive in a PC's hand at the decks."],
        ["They hit Poe Boy after the recording","The floor is gone. At 0 HP he's knocked out, not killed."],
        ["Stinky or Angelique would drop Poe Boy","Hold him at 1 HP. A PC lands the last hit."],
        ["They go after Stinky once he's turned","He takes it and doesn't swing back. He's looking at Poe Boy."]
      ]},
    lines:[
      {who:"DJ Poe Boy · each turn, on whoever holds the USB", t:"Drop."},
      {who:"DJ Poe Boy · each turn, if nobody holds it, on the PC nearest the decks", t:"Flee."},
      {who:"Angelique · round 1, to the party", t:"Aux is round the back of the mixer, left side. I'm on the poster. I know this stage."},
      {who:"Lil Stinky · after the recording, to Poe Boy", t:"I believed you, man."}
    ],
    rule:"<b>The USB can't be destroyed</b> &mdash; Command (&ldquo;Drop.&rdquo;) only costs time. When it plays, <b>Stinky's oath breaks with no save and he turns on Poe Boy.</b>",
    run:{
      setup:"Ostrander is dead and the vampires are free. The party tells them about Marcus and the drive. Orlok: &ldquo;Let them play it.&rdquo; Poe Boy refuses: &ldquo;Drop.&rdquo; That's what turns them on him. Poe Boy and Lil Stinky hold the decks. The USB is wherever the party left it: if it's still in the old rig upstairs, someone runs it down (about 2 rounds).",
      matchups:"Lil Stinky holds the decks; Poe Boy stays behind them, on the mic. Orlok goes for Stinky, Dracula shadows whoever holds the USB, Edward hangs back to pull PCs clear, Angelique stays by the USB holder. The party's job: get the USB to the decks and get Stinky off them.",
      beats:["R1 · The USB is on the move. Poe Boy Commands its holder: &ldquo;Drop.&rdquo;",
             "R2 · The party reaches the decks. Stinky swings at the holder and smokes a vampire (Russ's heal).",
             "R3 · Stinky gets moved or drops. Someone plugs in.",
             "R4 · The recording plays. Stinky turns on Poe Boy. The room turns.",
             "R5 on · Stinky and Angelique on Poe Boy. The party takes him down."],
      allyJob:"One vampire a round, in turn, after everyone: Orlok grips Stinky, Dracula carries the USB holder toward the decks, Edward pulls a PC clear. Narrate it, no rolls.",
      win:"A PC at the decks plugs the USB in (their action). Then narrate the recording.",
      ends:"Round 3 or 4: the recording plays, Stinky turns on Poe Boy, the room turns, Dracula takes the mic. Two rounds later Poe Boy is knocked out.",
      losing:"It can't be lost. If it drags past round 4, Dracula snatches the drive and lands it in a PC's hand at the decks."
    },
    foes:[
      {id:"poeboy", nm:"DJ Poe Boy", n:1, ac:15, hp:120, floor:1, spd:"30", chassis:"Cultist Fanatic, more HP", cr:"4", xp:1100,
       say:"Borrowed lines only: a radio ad, a movie trailer, his mom.",
       turn:["Command, one word, <b>DC 15 Wis save</b>. The PC holding the USB: &ldquo;Drop.&rdquo; (it lands at their feet). Nobody holding it: the PC nearest the decks, &ldquo;Flee.&rdquo; (they spend their next move running from him).",
             "Mic stand at anyone next to him: <b>+4 to hit, 4 bludgeoning</b>. Pathetic on purpose."],
       note:"<b>Can't drop below 1 HP until the recording plays</b>: at 1 he's on his knees behind the decks, still on the mic. +3 on his saves while Stinky is within 10 ft, until Stinky turns.",
       drop:"When the recording plays the floor ends, his Command stops landing, the room boos and Dracula takes the mic. Two rounds on, the next PC hit puts him at 0: knocked out, not killed. The fight runs into the early morning; cut to the driveway at sunrise.",
       hard:"He only Commands the PC holding the USB. No &ldquo;Flee.&rdquo;",
       easy:"He Commands two PCs a turn: &ldquo;Drop.&rdquo; and &ldquo;Flee.&rdquo;"},
      {id:"stinky", nm:"Lil Stinky", n:1, ac:18, hp:60, spd:"30", chassis:"Knight", cr:"3", xp:700,
       say:"Sincere. Not charmed: he believes his friend.",
       turn:["Back to the decks, next to Poe Boy.",
             "Longsword twice: <b>+5 to hit, 8 radiant</b> each. The PC holding the USB if he can reach them, otherwise the nearest vampire."],
       note:"<b>Nobody can plug in while he's standing at the decks.</b> Shove him, grapple him, move him with a spell or a vampire, or drop him, then plug in. A vampire he hits smokes and staggers: that's Russ's heal for badge req 3, if it hasn't landed.",
       drop:"At 0 HP he's on one knee, sword down: out of the fight, awake, and still hears the recording. When it plays, his oath breaks, no save, and he gets up on the party's side: see Allies.",
       hard:"One swing, not two.",
       easy:"Add 20 HP (80)."}
    ],
    alliesLabel:"Allies · end of each round, no rolls",
    allies:[
      {nm:"Orlok", act:"In turn with Dracula and Edward, one a round. Takes hold of Lil Stinky: 10 necrotic."},
      {nm:"Dracula", act:"Swoops: carries the PC holding the USB 30 ft toward the decks."},
      {nm:"Edward", act:"Pulls one PC 30 ft out of trouble. No opportunity attacks."},
      {nm:"Angelique", act:"Every round until the recording: wears Poe Boy's face beside the USB holder (nobody holding it: the PC nearest the decks). That PC has advantage on the save against his Command.",
       tok:"Next to that PC.",
       say:"Two Poe Boys now, and one of them is shaking his head at you."},
      {nm:"Angelique, after the recording", act:"Every round: her own face, her own knife. 8 piercing on Poe Boy.",
       tok:"Next to Poe Boy.",
       say:"No borrowed face this time. She walks up to him looking like herself."},
      {nm:"Lil Stinky, after the recording", act:"Every round: one swing at Poe Boy, 8 slashing, no roll. Poe Boy can't get past him off the decks. No HP from here: at 0 he gets up anyway.",
       tok:"Turn him round, next to Poe Boy, between him and the way off the decks.",
       say:"The light goes out of the sword. He turns around and looks at his best friend."}
    ],
    allyNote:"They don't drop and have no HP to track. Their hits stop Poe Boy at 1 HP: a PC lands the last one."
  }
};
