/* =====================================================================
   DOOD MANSION — FIGHT CARDS
   Every fight's stat lines and narration, in one place. Read by the combat
   page (run/combat/, one fight per ?f=<key>), the Run of Show (a scene's
   fight:FIGHTS.<key>: the link, the tokens row, Spencer's lines).

   Built from SRD 5.2 creatures (chassis), pared down so Scott can run it at the
   table. Damage is fixed (no damage dice). Rolls and initiative stay at the table.

   cue:   the Run of Show scene this fight belongs to.
   start: read [{who, t, sp}], announce, grid (the set-up map), map [lines]: opening the fight.
   grid:  cols, rows, party {a, b}, lead, base [shapes already drawn], draw [shapes], tokens. Squares are letter + number, A1 top left.
          shape: s (rect, line, circle, x, dot), a, b, also [[a, b]], at [squares, for dot], nm, l (label on the map, | for a new line; 0 for none), lp (label's square), say.
          token: at, nm, l (label on the map), k (foe, ally, pc), size (2 for a 2-inch token), side (laid on its side).
   rounds: [{k, say, do, sp:[{who, t}]}]: what to narrate each round.
   end:   when, read [{who, t, sp} or {note}], next: closing the fight.
   Read-aloud lines: sp means Spencer voices it; {note} is a plain line for Scott.
   lines: Spencer's in-fight lines [{who, t}], for his cards on the Run of Show.

   tally: label, foe (whose turn taps it), start, tiers [[up to, name]], use, full, allDown (the fight ends when every foe is down)
   foe:  id, nm, one (singular, if n>1), n (how many), ac, hp, floor (lowest HP, if not 0), spd, chassis, cr, xp,
         when (from which round), say (what to say each turn), turn (1-3 steps), sayIf (lines on one of those steps),
         note (on its turn), hpnote (on its HP tracker), drop (when it drops), endsFight, hard / easy (the dials)
   turnIntro: replaces the opening line of "On my turn".
   ally: nm, act (one thing, no roll), tok (where the token goes), say (one line of narration)
   ===================================================================== */
const FIGHTS = {

  library: {
    day:"Saturday", cue:3, name:"The trap in the binding",
    start:{
      read:[{who:"They open it", t:"The binding splits and a pair of shears comes out of the spine. <i>Snick.</i> A strip of the article falls to the table."},{note:"That's the first cut. It's already on the tally."}],
      announce:"The shears aren't after you, they're after the page. Spend your action standing in a lane and that pair can't cut. Or spend it fighting. It isn't over until everything's down.",
      grid:{cols:12, rows:10, party:{a:"C4",b:"H6"},
        draw:[
          {s:"rect", a:"A1", b:"L10", nm:"The room", l:0, say:"This is the reading room of the hall of records."},
          {s:"rect", a:"D5", b:"I5", nm:"The reading table", l:"Reading table", lp:"H5", say:"This long table is where she set the volume down."},
          {s:"x", a:"F5", nm:"The article", l:"Article", lp:"E5", say:"This X is the article, lying open on the table."},
          {s:"line", a:"F2", b:"F4", also:[["F6","F8"]], nm:"The two lanes", l:0, say:"These two lines are the straight runs to the page, one from each side."},
          {s:"rect", a:"K2", b:"L5", nm:"The card catalogue", l:"Card|catalogue", say:"This block on the wall is the card catalogue."},
          {s:"rect", a:"A7", b:"C9", nm:"The stacks", l:"Stacks", say:"These are the stacks, shelves of bound newspapers."},
          {s:"rect", a:"J8", b:"L9", nm:"The Records Keeper's desk", l:"Keeper's|desk", say:"This is the Records Keeper's desk."}
        ],
        tokens:[
          {at:"F2", nm:"Archival shears 1", l:"Shears 1", k:"foe"},
          {at:"F8", nm:"Archival shears 2", l:"Shears 2", k:"foe"},
          {at:"J3", nm:"Swarm of index cards", l:"Swarm", k:"foe"},
          {at:"D8", nm:"The book cart", l:"Cart", k:"foe"},
          {at:"E4", nm:"Bix", l:"Bix", k:"pc"},
          {at:"G4", nm:"Gnomey", l:"Gnomey", k:"pc"},
          {at:"D6", nm:"Simone", l:"Simone", k:"pc"},
          {at:"E6", nm:"Yobo", l:"Yobo", k:"pc"},
          {at:"G6", nm:"Russ", l:"Russ", k:"pc"}
        ]},
      map:["Put a PC's token in a lane when they guard it."]
    },
    rounds:[
      {k:"Round 1", say:"They aren't coming for you. They're going for the page. Behind you, one squeaky wheel starts to roll.", do:"On my turn: the cart, then the shears. The swarm waits."},
      {k:"Round 2", say:"The card catalogue drawers slide open all at once, and then it's snowing.", do:"On my turn: the swarm joins in."},
      {k:"Round 3 and after", do:"Keep going until all four are down, then step 5. Both pairs of shears down? The cuts stop and the fight goes on. <b>Going badly?</b> Use the too-hard dials."}
    ],
    end:{
      when:"The shears, the swarm and the cart are all down.",
      read:[
        {who:"The last one drops", t:"The shears lie shut on the floor. The cards have settled. The cart is on its side, its books spilled. The room is very quiet."},
        {note:"Clear the map."},
        {who:"Records Keeper · after the fight", sp:1, t:"Well. Don't just stand there. Get every scrap and put it back together."},
        {note:"<b>Item 1 on the iPad:</b> tap <b data-tier-now></b>, the difficulty shown by the cuts. Then hand over the torn page."}
      ],
      next:"They put the whole page back together, then read it."
    },
    turnIntro:"All the enemies go together, in this order. Skip any that are down. A PC at 0 HP is out cold and stable.",
    tally:{label:"Cuts on the article", foe:"shears", start:1, tiers:[[2,"Easy"],[4,"Medium"],[99,"Hard"]],
      use:"The highlighted one is the difficulty to tap on Item 1 after the fight. Fire on the article is one more cut. Cuts stop at 5.",
      allDown:1,
      full:"That's the most it can be cut. The shears have nothing left to cut, but the fight goes on until everything's down."},
    foes:[
      {id:"cart", nm:"The book cart", n:1, ac:14, hp:22, spd:"30", chassis:"Animated Armor", cr:"1", xp:200,
       say:"One squeaky wheel and a full load of bound newspapers.",
       turn:["Rolls at a PC guarding a lane (or the nearest PC).",
             "Ram: <b>+5 to hit, 9 bludgeoning</b>, and that PC is pushed 10 ft. If they were guarding, that lane is open for the shears this turn."],
       drop:"A wheel comes off; it tips over and spills its books.",
       hard:"It stops pushing: damage only.",
       easy:"Add 8 HP (30)."},
      {id:"shears", nm:"Archival shears", one:"Shears", n:2, ac:14, hp:12, spd:"fly 30", chassis:"Flying Sword", cr:"½", xp:100,
       say:"A dry snick-snick, like someone trimming coupons.",
       turn:["<b>A PC guarding this lane?</b> It rattles against them and backs off. No cut, no damage.",
             "<b>Nobody guarding?</b> It flies to the article and cuts. No roll. <b>Tap +1 cut.</b>"],
       note:"The shears never attack anyone. A guard is a PC who spent their action standing in that lane, and it lasts until the shears' next turn.",
       drop:"It snaps shut and clatters to the floor. That lane's cuts stop. The fight goes on.",
       hard:"One pair jams in the binding for a round: no cut that turn.",
       easy:"Give each pair 6 more HP (18)."},
      {id:"cards", nm:"Swarm of index cards", n:1, ac:12, hp:16, spd:"fly 30", chassis:"Swarm of Insects", cr:"½", xp:100,
       say:"The card catalogue drawers spit out a blizzard.",
       turn:["Moves onto a PC guarding a lane (or the nearest PC).",
             "Paper cuts: <b>+5 to hit, 7 slashing</b>."],
       when:"From round 2",
       hpnote:"<b>Fire does double.</b>",
       drop:"The cards settle like snow and lie still.",
       hard:"Under 8 HP it does 4, not 7.",
       easy:"Add 8 HP (24)."}
    ]
  },

  summoning: {
    day:"Saturday", cue:9, name:"The botched summoning",
    start:{
      read:[{t:"Two fragments of chalk peel up off the floor lines."}],
      map:["The 2&Prime; summoning in the middle of the chalk circle.","Fragments 1 and 2 on the floor lines around it."]
    },
    rounds:[
      {k:"Round 1", say:"It isn't looking at you. It's dragging itself toward the door, toward something down the hall, and the chalk on the floor has started to crawl.", do:"The sealed door doesn't open tonight. If they study the thing: Arcana DC 14, human-made and incomplete."},
      {k:"Round 2 and after", say:"It goes through whoever's in the way like they're furniture.", do:"<b>Two PCs down?</b> It tears through the wall toward the sealed door and comes apart on the threshold. Go to step 5."}
    ],
    end:{
      when:"It drops.",
      read:[
        {who:"It drops", t:"It stops with one arm still out toward the door."},
        {note:"The fragments crumble with it. Clear the map."},
        {who:"The wreckage search", t:"Take a minute to look through the wreckage. Everyone roll Investigation."},
        {note:"<b>DC 10:</b> the sticky note, <code>Fluffy123</code>, stuck to a candle box. On a miss, the highest roll finds it anyway. Hand it over; they keep it for Sunday."},
        {note:"<b>DC 12:</b> another mic, still running. Also in the wreckage: a half-drawn ritual circle."},
        {who:"After the search", t:"A monitor deep in the house flickers on by itself. The old AIM chime carries down the hall. One line types itself across a screen nobody is sitting at &mdash; <b>&ldquo;is someone there&rdquo;</b> &mdash; then it goes dark."},
        {note:"Fire the AIM chime as the screen wakes, then kill all sound."}
      ],
      next:"The night ends when the screen dies. Level up: cue L5."
    },
    foes:[
      {id:"summon", nm:"The botched summoning", n:1, ac:13, hp:60, spd:"30", chassis:"Flesh Golem, scaled down", cr:"4", xp:1100,
       say:"It keeps clawing toward the sealed door down the hall.",
       turn:["Lurches toward the sealed door down the hall. It can't leave the room.",
             "Claws twice at whoever is between it and the door, or the nearest PC: <b>+6 to hit, 8 slashing</b> each.",
             "<b>Once, the first time it's under 30 HP:</b> Unfinished Word. Every PC within 15 ft makes a <b>DC 13 Wis save</b>: 8 psychic, half on a save."],
       sayIf:[{who:"When it uses the Unfinished Word", t:"The hole in its chest turns toward you and it tries to say something. It doesn't get to the end of it. You feel it anyway."}],
       note:"Never attacks a PC at 0 HP.",
       drop:"The fragments crumble with it.",
       endsFight:1,
       hard:"It spends a turn clawing at the door instead of a PC.",
       easy:"Add 15 HP (75)."},
      {id:"frag", nm:"Ritual fragments", one:"Ritual fragment", n:2, ac:12, hp:7, spd:"30", chassis:"Shadow, no Strength drain", cr:"¼", xp:50,
       say:"Chalk scrawls, crawling.",
       turn:["Fragment 1 goes for whoever is hitting the summoning. Fragment 2 goes for the back line.",
             "Grab: <b>+4 to hit, 5 necrotic</b>."],
       drop:"Crumbles to chalk dust.",
       hard:"One of them smears out and stops. Mark it down.",
       easy:"Give each 5 more HP (12)."}
    ]
  },

  developer: {
    day:"Sunday", cue:"14 · i", name:"The developer",
    start:{
      read:[
        {who:"The hard hats", t:"Hard hats push through the crowd. They walk right past you. They're going for the vampires. A man with a clipboard holds up a seal and says one word, and Orlok, Dracula and Edward stop dead, pinned where they stand. His men take out stakes."},
        {who:"W. Ostrander · to his men", sp:1, t:"Stakes. Start with the old one."},
        {who:"After Ostrander's line", t:"<b>What do you do?</b>"}
      ],
      announce:"When the party acts.",
      map:["Thugs 1&ndash;3 between the party and the vampires.","Ostrander and thugs 4&ndash;6 on the vampires.","Orlok, Dracula and Edward on their sides: pinned. Dracula next to Yobo, Edward where Bix can see him.","Poe Boy and Stinky up on the decks. They're not in this fight.","Angelique with the party."]
    },
    rounds:[
      {k:"Round 1", say:"Three of them step into your way. Behind them, a stake comes down to rest on Orlok's chest.",
       do:"The seal holds until Ostrander drops. <b>They go for Poe Boy?</b> He can't drop below 1 HP and Stinky blocks.",
       sp:[{who:"Orlok · pinned, to Russ", t:"Boy. Help me."},{who:"Edward · on seeing Ostrander's men", t:"Twenty-five years."}]},
      {k:"Round 2", say:"Dracula is frozen mid-flourish, cape out, an arm's length from Yobo. Somebody is measuring. They've got to the quiet one. A mallet goes up over a stake on Edward's chest. He isn't looking at it. He's looking at Bix.",
       sp:[{who:"DJ Poe Boy · on the mic", t:"Oh, this is great. Keep going."}]},
      {k:"Round 3", say:"The mallet is still up. It's shaking.",
       do:"<b>Ostrander still up at the end of this round, or two PCs down?</b> The seal slips and Orlok gets a hand free. Ostrander loses his turns, and the next hit from a PC kills him."}
    ],
    end:{
      when:"Ostrander drops.",
      read:[
        {note:"<b>Stop. Let the room be quiet for a moment.</b> Nothing funny until it has been."},
        {who:"Then the seal breaks", t:"The seal goes. Three vampires get up, and it's over fast for the men nearest them. Anyone else in a hard hat lets go of his crowbar."},
        {note:"Take off Ostrander and every thug. Stand the vampires up."}
      ],
      next:"Straight to the booth: cue 14 &middot; ii."
    },
    lines:[
      {who:"Orlok · pinned, to Russ", t:"Boy. Help me."},
      {who:"Edward · on seeing Ostrander's men", t:"Twenty-five years."},
      {who:"DJ Poe Boy · on the mic, during the fight", t:"Oh, this is great. Keep going."}
    ],
    foes:[
      {id:"ostrander", nm:"W. Ostrander", n:1, ac:15, hp:60, spd:"30", chassis:"Mage, no damage spells", cr:"6", xp:2300,
       sayIf:[{who:"W. Ostrander · when a PC reaches him", sp:1, t:"This site's paid for. Step back."}],
       turn:["<b>No PC has hit him or reached him?</b> Ignores the party and works on the vampires.",
             "<b>A PC hit him since his last turn?</b> Hold that PC: <b>DC 15 Wis save</b> or they lose their next turn, frozen.",
             "Surveyor's rod at a PC next to him: <b>+6 to hit, 10 bludgeoning</b>."],
       note:"Doesn't swing at a PC who's down.",
       hpnote:"The first 15 damage is his ward cracking: narrate it, it's in the 60.",
       drop:"He's dead. The seal breaks: the vampires finish thugs 4–6, no rolls. Any of thugs 1–3 left drop their crowbars.",
       endsFight:1,
       hard:"He keeps ignoring the party for one more round, even after they hit him.",
       easy:"Add 15 HP (another layer of ward)."},
      {id:"thug", nm:"Thugs", one:"Thug", n:6, ac:12, hp:11, spd:"30", chassis:"Tough", cr:"½", xp:100,
       say:"A demolition crew. Hard hats, crowbars, stakes.",
       turn:["<b>Thugs 4–6 stay on the vampires, no rolls, unless a PC reaches them.</b> Thugs 1–3 all go for the same PC: <b>a PC on Ostrander?</b> That one. Otherwise the nearest.",
             "Crowbar: <b>+4 to hit, 8 bludgeoning</b>."],
       note:"Doesn't swing at a PC who's down.",
       drop:"Dead. A hard hat rolls across the floor.",
       hard:"One of thugs 1–3 breaks and runs.",
       easy:"Give each 5 more HP (16)."}
    ],
    alliesLabel:"Allies · no rolls",
    allies:[
      {nm:"Orlok, Dracula, Edward", act:"Pinned until the seal breaks, so they don't act. When the seal breaks they finish thugs 4–6: Dracula plays to the crowd; Orlok is quick and tidy; Edward is efficient and doesn't look at anyone. Mark each one down. <b>Russ heals one:</b> badge req 3. If it doesn't happen here, it's still open at the booth."},
      {nm:"Angelique", act:"Each round, after everyone: takes a hard hat's face and taps the thug on the most-hurt PC on the shoulder. He loses his next attack.",
       tok:"Next to that thug.",
       say:"A man in a hard hat taps him on the shoulder. He turns, and the face under the hat slides into Angelique's."}
    ]
  },

  booth: {
    day:"Sunday", cue:"14 · ii", name:"The booth",
    start:{
      read:[
        {who:"The vampires owe you", t:"The man who wanted this house is dead on the floor. Orlok is looking at you, and for once he isn't cold about it. The crowd hasn't noticed. The set hasn't stopped. Poe Boy is still up there."},
        {who:"Orlok · to the party, after the silence", sp:1, t:"What's on the drive?"},
        {who:"Orlok · if nobody raises the drive", sp:1, t:"You came down those stairs running. What did you find up there?"},
        {who:"DJ Poe Boy · panicking, borrowed voices", sp:1, t:"Don't touch that dial!"},
        {who:"Orlok · to Poe Boy", sp:1, t:"Let them play it."},
        {who:"DJ Poe Boy · refusing, on whoever holds the USB", sp:1, t:"Drop."},
        {who:"The objective", t:"Get the USB to the decks and get on aux."}
      ],
      announce:"After &ldquo;Drop.&rdquo; Party and vampires against Poe Boy and Stinky.",
      map:["Take Ostrander and the thugs off.","Vampires standing, with the party. Angelique with the party.","Lil Stinky at the decks, Poe Boy behind him.","The USB wherever the party left it. Still upstairs? Someone runs it down, about 2 rounds."]
    },
    rounds:[
      {k:"Round 1", say:"One word, in somebody else's voice, and your hand opens. The drive hits the floor. Stinky's sword catches a vampire. It smokes. It staggers.",
       do:"Stinky's first swing goes through a vampire, no roll. <b>Russ heals it:</b> badge req 3, if it hasn't landed. Allies this round: Orlok, Angelique.",
       sp:[{who:"Angelique · to the party", t:"Aux is round the back of the mixer, left side. I'm on the poster. I know this stage."}]},
      {k:"Round 2", say:"He's off the decks. There's the aux.", do:"Allies this round: Dracula, Angelique."},
      {k:"Round 3", do:"Allies this round: Edward, Angelique. <b>Not played by the end of this round?</b> Dracula lands the drive in a PC's hand at the decks, and it plays."},
      {k:"A PC at the decks plugs in the USB", do:"Their action. Go to step 5."}
    ],
    end:{
      when:"The USB hits the decks.",
      read:[
        {who:"Narrate the recording", t:"His set cuts out mid-scream. Then typing. A door shuts. Then a scared kid, asking someone to open it. Asking again, quieter. And under all of it, perfectly calm, Poe Boy: nudging a level up, leaning in close to listen, pleased with how clean it sounds."},
        {who:"Then let it sit", t:"The speakers hiss. Nobody in the ballroom moves."},
        {who:"Lil Stinky's oath breaks, no save", t:"The light goes out of Lil Stinky's sword. He turns around and looks at his best friend."},
        {note:"Move his token next to Poe Boy. His Aura is gone. Poe Boy's Command stops landing."},
        {who:"Lil Stinky · to Poe Boy", sp:1, t:"I believed you, man."},
        {who:"Angelique · to the crowd", sp:1, t:"I typed those messages."},
        {note:"<b>Only if Simone paid the goat:</b> Spencer voices Marcus through every speaker. If she said no, skip these four."},
        {who:"Marcus · to Poe Boy", sp:1, t:"you said you'd open it."},
        {who:"Marcus · to Poe Boy", sp:1, t:"i kept asking. you kept recording. you wrote GOOD on it."},
        {who:"Marcus · to the vampires", sp:1, t:"i didn't go out a window. i was upstairs. the whole time."},
        {who:"Marcus · last", sp:1, t:"ok. you can turn it off now."},
        {who:"The charm breaks", t:"The smiles go, all at once, across the whole room. Somebody boos. Then everybody does."},
        {who:"DJ Poe Boy · nobody listening", sp:1, t:"We'll be right back after these messages!"},
        {who:"Dracula · on the mic, to the crowd", sp:1, t:"Ladies and gentlemen. I have waited all night for you."},
        {who:"Dracula · denouncing him", sp:1, t:"Your DJ, darlings. He shut a boy behind a door and wrote GOOD on the file. Technically flawless. Completely empty."},
        {who:"The round after", t:"He tries a voice. Then another one. Nobody in the room is listening."},
        {note:"Stinky and Angelique go for him: see the allies in step 3. They stop him at 1 HP. <b>The next PC hit knocks him out, not killed.</b>"},
        {who:"On the last turn", t:"It runs on into the early morning. By the end, the ballroom windows have gone grey."}
      ],
      next:"Cut to the driveway at sunrise: cue 15."
    },
    lines:[
      {who:"DJ Poe Boy · each turn, on whoever holds the USB", t:"Drop."},
      {who:"DJ Poe Boy · each turn, if nobody holds it, on the PC nearest the decks", t:"Flee."},
      {who:"Angelique · round 1, to the party", t:"Aux is round the back of the mixer, left side. I'm on the poster. I know this stage."},
      {who:"Lil Stinky · after the recording, to Poe Boy", t:"I believed you, man."}
    ],
    foes:[
      {id:"poeboy", nm:"DJ Poe Boy", n:1, ac:15, hp:60, floor:1, spd:"30", chassis:"Cultist Fanatic, more HP", cr:"4", xp:1100,
       sayIf:[{who:"DJ Poe Boy · on whoever holds the USB", sp:1, t:"Drop."},{who:"DJ Poe Boy · nobody holding it, on the PC nearest the decks", sp:1, t:"Flee."}],
       turn:["Command, one word, <b>DC 15 Wis save</b>. The PC holding the USB: &ldquo;Drop.&rdquo; (it lands at their feet). Nobody holding it: the PC nearest the decks, &ldquo;Flee.&rdquo; (they spend their next move running from him).",
             "Mic stand at anyone next to him: <b>+4 to hit, 4 bludgeoning</b>. Pathetic on purpose."],
       hpnote:"<b>Stops at 1 HP.</b> At 1 he's on his knees behind the decks, still on the mic. Point at the decks. +3 on his saves while Stinky is within 10 ft, until Stinky turns.",
       drop:"After the recording, the next PC hit knocks him out, not killed. That ends the fight.",
       endsFight:1,
       hard:"He only Commands the PC holding the USB. No &ldquo;Flee.&rdquo;",
       easy:"He Commands two PCs a turn: &ldquo;Drop.&rdquo; and &ldquo;Flee.&rdquo;"},
      {id:"stinky", nm:"Lil Stinky", n:1, ac:18, hp:40, spd:"30", chassis:"Knight", cr:"3", xp:700,
       sayIf:[{who:"Lil Stinky · holding the decks", sp:1, t:"He's my best friend, man. Back up."}],
       turn:["Back to the decks, next to Poe Boy.",
             "Longsword twice: <b>+5 to hit, 8 radiant</b> each. The PC holding the USB if he can reach them, otherwise the nearest vampire."],
       note:"<b>Nobody can plug in while he's standing at the decks.</b> Shove him, grapple him, move him with a spell or a vampire, or drop him, then plug in. A vampire he hits smokes and staggers.",
       drop:"At 0 HP he's on one knee, sword down: out of the fight, awake, and still hears the recording. When it plays, his oath breaks, no save, and he gets up on the party's side: see the allies in step 3.",
       hard:"One swing, not two.",
       easy:"Add 20 HP (60)."}
    ],
    alliesLabel:"Allies · end of each round, no rolls",
    allies:[
      {nm:"Orlok", act:"In turn with Dracula and Edward, one a round. Takes hold of Lil Stinky: 10 necrotic, and he's off the decks until his next turn."},
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
