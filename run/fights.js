/* =====================================================================
   DOOD MANSION — FIGHT CARDS
   Every fight's stat lines, in one place. Read by the Run of Show
   (run/index.html, a scene's fight:FIGHTS.<key>) and by the print kit's
   combat cheat sheet (print/src/combat.html).

   🟡 Not canon yet: every number here is AI-made, built from SRD 5.2
   creatures (chassis), pared down so Scott can run it at the table.
   Damage is fixed (no damage dice). Rolls and initiative stay at the table.

   foe:  id, nm, n (how many), ac, hp, floor (lowest HP, if not 0), spd, chassis, cr, xp,
         say (one line of flavour), turn (1–3 steps), note (the one gimmick),
         drop (when it drops), hard / easy (the dials)
   run:  setup, matchups (who takes whom at the start), beats (one line per round),
         allyJob (the allies' job each round, narrated), win, ends, losing
   ally: nm, act (one thing, no roll)
   ===================================================================== */
const FIGHTS = {

  library: {
    day:"Saturday", name:"The trap in the binding",
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
    day:"Saturday", name:"First contact &mdash; a pressure scene, not a fight",
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
    day:"Saturday", name:"The botched summoning",
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
       drop:"Read the monitor line, fire the AIM chime, then kill all sound.",
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
    day:"Sunday", name:"The circle stirs &mdash; reserve, don't plan on it",
    rule:"Only if a room solved in five minutes and you're ahead of the clock. It costs about 20 minutes.",
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
    day:"Sunday", name:"The developer",
    rule:"<b>The only lethal fight.</b> Ostrander pins the vampires with a seal and ignores the party until they interfere. <b>The vampires are never actually killed.</b>",
    run:{
      setup:"Ostrander and six thugs walk in with the crowd, go straight past the party and pin all three vampires with a seal (narrate it; it costs him nothing). Roll initiative when the party acts.",
      matchups:"Thugs 1–3 block the party. Thugs 4–6 are on the vampires. Ostrander ignores the party until they interfere. Poe Boy stays up on the decks, on the mic; he isn't in this fight.",
      beats:["R1 · Thugs 1–3 block and swing. A stake rests on Orlok's chest.",
             "R2 · Thugs 1–3 start dropping. Dracula is pinned mid-flourish near Yobo.",
             "R3 · Ostrander is exposed. A stake over Edward's chest, with Bix watching.",
             "R4 · He goes down. Stop. Silence. The seal breaks."],
      allyJob:"Pinned: the vampires don't act, and are never actually killed. When the seal breaks they finish thugs 4–6. Narrate it, no rolls.",
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
    alliesLabel:"Allies · pinned until the seal breaks, no rolls",
    allies:[
      {nm:"Orlok, Dracula, Edward", act:"Pinned, so they don't act. When the seal breaks they finish thugs 4–6: Dracula plays to the crowd; Orlok is quick and tidy; Edward is efficient and doesn't look at anyone. Mark each one down."},
      {nm:"Angelique", act:"What she does at the finale is still open. <b>If she's with the party:</b> 8 piercing on a thug, no roll."}
    ]
  },

  booth: {
    day:"Sunday", name:"The booth",
    rule:"<b>The USB can't be destroyed</b> &mdash; Command (&ldquo;Drop.&rdquo;) only costs time. When it plays, <b>Stinky's oath breaks with no save.</b>",
    run:{
      setup:"Ostrander is dead and the vampires are free. The party tells them about Marcus and the drive. Orlok: &ldquo;Let them play it.&rdquo; Poe Boy refuses: &ldquo;Drop.&rdquo; That's what turns them on him. Poe Boy and Lil Stinky hold the decks. The USB is wherever the party left it: if it's still in the old rig upstairs, someone runs it down (about 2 rounds).",
      matchups:"Lil Stinky holds the decks; Poe Boy stays behind them, on the mic. Orlok goes for Stinky, Dracula shadows whoever holds the USB, Edward hangs back to pull PCs clear. The party's job: get the USB to the decks and get Stinky off them.",
      beats:["R1 · The USB is on the move. Poe Boy Commands its holder: &ldquo;Drop.&rdquo;",
             "R2 · The party reaches the decks. Stinky swings at the holder and smokes a vampire (Russ's heal).",
             "R3 · Stinky gets moved or drops. Someone plugs in.",
             "R4 · The recording plays. Stinky sits down. The room turns."],
      allyJob:"One vampire a round, in turn, after everyone: Orlok grips Stinky, Dracula carries the USB holder toward the decks, Edward pulls a PC clear. Narrate it, no rolls.",
      win:"A PC at the decks plugs the USB in (their action). Then narrate the recording.",
      ends:"Round 3 or 4: the recording plays, Stinky sits down, the room turns, Dracula takes the mic.",
      losing:"It can't be lost. If it drags past round 4, Dracula snatches the drive and lands it in a PC's hand at the decks."
    },
    foes:[
      {id:"poeboy", nm:"DJ Poe Boy", n:1, ac:15, hp:120, floor:1, spd:"30", chassis:"Cultist Fanatic, more HP", cr:"4", xp:1100,
       say:"Borrowed lines only: a radio ad, a movie trailer, his mom.",
       turn:["Command, one word, <b>DC 15 Wis save</b>. The PC holding the USB: &ldquo;Drop.&rdquo; (it lands at their feet). Nobody holding it: the PC nearest the decks, &ldquo;Flee.&rdquo; (they spend their next move running from him).",
             "Mic stand at anyone next to him: <b>+4 to hit, 4 bludgeoning</b>. Pathetic on purpose."],
       note:"<b>Can't drop below 1 HP until the recording plays</b>: at 1 he's on his knees behind the decks, still on the mic. +3 on his saves while Stinky is within 10 ft.",
       drop:"He doesn't drop until the recording plays. Then the floor ends, his Command stops landing, the room boos and Dracula takes the mic. At 0 HP he's knocked out, not killed. The fight runs into the early morning; cut to the driveway at sunrise.",
       hard:"He only Commands the PC holding the USB. No &ldquo;Flee.&rdquo;",
       easy:"He Commands two PCs a turn: &ldquo;Drop.&rdquo; and &ldquo;Flee.&rdquo;"},
      {id:"stinky", nm:"Lil Stinky", n:1, ac:18, hp:60, spd:"30", chassis:"Knight", cr:"3", xp:700,
       say:"Sincere. Not charmed: he believes his friend.",
       turn:["Back to the decks, next to Poe Boy.",
             "Longsword twice: <b>+5 to hit, 8 radiant</b> each. The PC holding the USB if he can reach them, otherwise the nearest vampire."],
       note:"<b>Nobody can plug in while he's standing at the decks.</b> Shove him, grapple him, move him with a spell or a vampire, or drop him, then plug in. A vampire he hits smokes and staggers: that's Russ's heal for badge req 3, if it hasn't landed.",
       drop:"At 0 HP he's on one knee, sword down: out of the fight, awake, and still hears the recording. When it plays, his oath breaks, no save. He sits down.",
       hard:"One swing, not two.",
       easy:"Add 20 HP (80)."}
    ],
    alliesLabel:"Allies · end of each round, one acts, in turn, no rolls",
    allies:[
      {nm:"Orlok", act:"Takes hold of Lil Stinky: 10 necrotic."},
      {nm:"Dracula", act:"Swoops: carries the PC holding the USB 30 ft toward the decks."},
      {nm:"Edward", act:"Pulls one PC 30 ft out of trouble. No opportunity attacks."},
      {nm:"Angelique", act:"What she does at the finale is still open. <b>If she's with the party:</b> 8 piercing on Stinky, no roll, every round."}
    ],
    allyNote:"They don't drop and have no HP to track."
  }
};
