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
   rounds: [{k, do, sp:[{who, t}]}]: what to do each round, and Spencer's lines. Scott voices the fight himself.
   end:   when, read [{who, t, sp} or {note}], next: closing the fight.
   Read-aloud lines: sp means Spencer voices it; {note} is a plain line for Scott.
   lines: Spencer's in-fight lines [{who, t}], for his cards on the Run of Show.

   tally: label, foe (whose turn taps it), start, max, tiers [[up to, name]], use, full, allDown (the fight ends when every foe is down)
   foe:  id, nm, one (singular, if n>1), n (how many), ac, hp, floor (lowest HP, if not 0), spd, chassis, cr, xp,
         turn (1-3 steps), sayIf (Spencer's lines on one of those steps),
         note (on its turn), hpnote (on its HP tracker), drop (when it drops), endsFight, hard / easy (the dials)
         sv: saving throw bonuses [STR, DEX, CON, INT, WIS, CHA]; grab (Athletics or Acrobatics for grapple and shove);
         pp (passive Perception); res, imm, vul (damage), cimm (conditions); cast (spell DC or attack bonus);
         aura (added to every save while Stinky is within 10 ft, shown as a second Saves line)
   turnIntro: replaces the opening line of "On my turn".
   ally: nm, act (one thing, no roll), tok (where the token goes)
   ===================================================================== */
/* The ballroom: drawn once for the developer, still on the table for the booth. */
const BALLROOM = [
  {s:"rect", a:"A1", b:"L12", nm:"The room", l:0, say:"This is the ballroom."},
  {s:"rect", a:"D1", b:"I3", nm:"The stage", l:"Stage", lp:"H1", say:"This big block at the far end is the stage."},
  {s:"rect", a:"E2", b:"H2", nm:"The decks", l:"Decks", say:"This bar across it is the decks."},
  {s:"line", a:"A2", b:"C2", also:[["J2","L2"]], nm:"The cables", l:"Cables", lp:"B1", say:"These lines are the cables, running off into the walls."},
  {s:"rect", a:"A5", b:"B11", also:[["K5","L11"]], nm:"The crowd", l:"Crowd", say:"These two blocks are the crowd, every face turned up and smiling."},
  {s:"x", a:"F12", nm:"The doors", l:"Doors", lp:"H12", say:"This X is the ballroom doors, standing open."}
];

const FIGHTS = {

  library: {
    day:"Saturday", cue:3, name:"The trap in the binding",
    start:{
      read:[{who:"They open it", t:"The binding splits and a pair of shears comes out of the spine. <i>Snick.</i> A strip of the article falls to the table. A second pair comes out after it. The card catalogue drawers spit out a blizzard of index cards, and a book cart starts to roll on one squeaky wheel."},{note:"That's the first cut. It's already on the tally."}],
      announce:"The shears aren't after you, they're after the page. Every pair still up cuts it every round. It isn't over until everything's down.",
      grid:{cols:12, rows:10, party:{a:"C4",b:"H6"},
        draw:[
          {s:"rect", a:"A1", b:"L10", nm:"The room", l:0, say:"This is the reading room of the hall of records."},
          {s:"rect", a:"D5", b:"I5", nm:"The reading table", l:"Reading table", lp:"H5", say:"This long table is where she set the volume down."},
          {s:"x", a:"F5", nm:"The article", l:"Article", lp:"E5", say:"This X is the article, lying open on the table."},
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
          {at:"D6", nm:"Dark Wind", l:"Dark Wind", k:"pc"},
          {at:"E6", nm:"Yobo", l:"Yobo", k:"pc"},
          {at:"G6", nm:"Kelvin", l:"Kelvin", k:"pc"}
        ]}
    },
    rounds:[
      {k:"Every round", do:"Keep going until all four are down, then step 4: Ending. Both pairs of shears down? The cuts stop and the fight goes on. <b>Going badly?</b> Use the too-hard dials."}
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
    tally:{label:"Cuts on the article", foe:"shears", start:1, max:5, tiers:[[2,"Easy"],[3,"Medium"],[99,"Hard"]],
      use:"The highlighted one is the difficulty to tap on Item 1 after the fight. Fire on the article is one more cut.",
      allDown:1,
      full:"The shears stop cutting. Keep fighting until everything's down."},
    foes:[
      {id:"cart", nm:"The book cart", n:1, ac:14, hp:60, spd:"30", chassis:"Animated Armor, more HP", cr:"2", xp:450,
       sv:[2,0,1,-5,-4,-5], grab:"Athletics +2", pp:6, imm:"Poison, Psychic", cimm:"Blinded, Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
       turn:["Rolls at the nearest PC.",
             "Ram: <b>+5 to hit, 9 bludgeoning</b>, and that PC is pushed 10 ft."],
       drop:"A wheel comes off; it tips over and spills its books.",
       hard:"It stops pushing: damage only.",
       easy:"Add 15 HP (75)."},
      {id:"shears", nm:"Archival shears", n:2, ac:14, hp:16, spd:"fly 30", chassis:"Flying Sword", cr:"½", xp:100,
       sv:[1,4,0,-5,-3,-5], grab:"Acrobatics +2", pp:7, imm:"Poison, Psychic", cimm:"Blinded, Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
       turn:["Each pair still up flies to the article and cuts. No roll. <b>Tap +1 cut for each.</b>"],
       note:"Nothing blocks them.",
       drop:"It snaps shut and clatters to the floor. That pair's cuts stop. The fight goes on.",
       hard:"One pair jams in the binding for a round: no cut that turn.",
       easy:"Give each pair 6 more HP (22)."},
      {id:"cards", nm:"Swarm of index cards", n:1, ac:12, hp:45, spd:"fly 30", chassis:"Swarm of Insects, more HP", cr:"1", xp:200,
       sv:[-4,1,0,-5,-2,-5], grab:"Acrobatics +1", pp:8, vul:"Fire (double damage)", cimm:"Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned",
       turn:["Moves onto the nearest PC.",
             "Paper cuts: <b>+5 to hit, 7 slashing</b>."],
       hpnote:"<b>Fire does double.</b>",
       drop:"The cards settle like snow and lie still.",
       hard:"Under 20 HP it does 4, not 7.",
       easy:"Add 10 HP (55)."}
    ]
  },

  summoning: {
    day:"Saturday", cue:9, name:"The botched summoning",
    start:{
      read:[{t:"Three fragments of chalk peel up off the floor lines."}],
      grid:{cols:10, rows:8, party:{a:"B7",b:"H8"},
        draw:[
          {s:"rect", a:"A1", b:"J8", nm:"The room", l:0, say:"This is the sealed room, hot and close."},
          {s:"circle", a:"D3", b:"G6", nm:"The chalk circle", l:0, say:"This circle is chalk, and something half-made is dragging itself up out of it."},
          {s:"line", a:"A4", b:"C4", also:[["H5","J5"]], nm:"The floor lines", l:"Floor line", lp:"B3", say:"These lines are chalk too, running out across the floorboards."},
          {s:"dot", at:["C2","H2","C6","H6"], nm:"The candle stubs", l:0, say:"These little circles are candle stubs, burned down to nothing."},
          {s:"x", a:"I1", nm:"The way to the sealed door", l:"Way to the|sealed door", lp:"G1", say:"This X is the way out, toward the sealed door down the hall."},
          {s:"x", a:"E8", nm:"The warm door", l:"Warm door", lp:"G8", say:"This X is the warm door you just came through."}
        ],
        tokens:[
          {at:"E4", nm:"The botched summoning (the 2-inch token)", l:"Botched summoning", k:"foe", size:2},
          {at:"B4", nm:"Ritual fragment 1", l:"Frag 1", k:"foe"},
          {at:"I5", nm:"Ritual fragment 2", l:"Frag 2", k:"foe"},
          {at:"A2", nm:"Ritual fragment 3", l:"Frag 3", k:"foe"},
          {at:"C7", nm:"Bix", l:"Bix", k:"pc"},
          {at:"D7", nm:"Gnomey", l:"Gnomey", k:"pc"},
          {at:"E7", nm:"Dark Wind", l:"Dark Wind", k:"pc"},
          {at:"F7", nm:"Yobo", l:"Yobo", k:"pc"},
          {at:"G7", nm:"Kelvin", l:"Kelvin", k:"pc"}
        ]}
    },
    rounds:[
      {k:"Round 1", do:"The sealed door doesn't open tonight. If they study the thing: Arcana DC 14, human-made and incomplete."},
      {k:"Round 2 and after", do:"<b>Two PCs down?</b> It tears through the wall toward the sealed door and comes apart on the threshold. Go to step 4: Ending."}
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
      {id:"summon", nm:"The botched summoning", n:1, ac:13, hp:200, spd:"30", chassis:"Flesh Golem, more HP, lighter claws", cr:"6", xp:2300,
       sv:[4,-1,4,-2,0,-3], grab:"Athletics +4", pp:10, cast:"Unfinished Word: <b>DC 13 Wis</b>, already on its turn.",
       imm:"Poison", cimm:"Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
       turn:["Lurches toward the sealed door down the hall. It can't leave the room.",
             "Claws twice at whoever is between it and the door, or the nearest PC: <b>+6 to hit, 6 slashing</b> each.",
             "<b>Once, the first time it's under 50 HP:</b> Unfinished Word. Every PC within 15 ft makes a <b>DC 13 Wis save</b>: 8 psychic, half on a save."],
       note:"Never attacks a PC at 0 HP. The Unfinished Word: it tries to say something and can't get to the end of it.",
       drop:"The fragments crumble with it.",
       endsFight:1,
       hard:"It spends a turn clawing at the door instead of a PC.",
       easy:"Add 30 HP (230)."},
      {id:"frag", nm:"Ritual fragments", one:"Ritual fragment", n:3, ac:12, hp:12, spd:"30", chassis:"Shadow, no Strength drain", cr:"¼", xp:50,
       sv:[-2,2,1,-2,0,-1], grab:"Acrobatics +2", pp:10, vul:"Radiant (double damage)", imm:"Necrotic, Poison",
       cimm:"Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained",
       turn:["Fragments 1 and 2 go for whoever is hitting the summoning. Fragment 3 goes for the back line.",
             "Grab: <b>+4 to hit, 5 necrotic</b>."],
       drop:"Crumbles to chalk dust.",
       hard:"One of them smears out and stops. Mark it down.",
       easy:"Give each 5 more HP (17)."}
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
      grid:{cols:12, rows:12, party:{a:"C9",b:"I11"}, draw:BALLROOM,
        tokens:[
          {at:"F1", nm:"DJ Poe Boy", l:"Poe Boy", k:"foe"},
          {at:"F3", nm:"Lil Stinky", l:"Stinky", k:"foe"},
          {at:"F5", nm:"W. Ostrander", l:"Ostr.", k:"foe"},
          {at:"E8", nm:"Thug 1", l:"Thug 1", k:"foe"},
          {at:"F8", nm:"Thug 2", l:"Thug 2", k:"foe"},
          {at:"G8", nm:"Thug 3", l:"Thug 3", k:"foe"},
          {at:"E5", nm:"Thug 4", l:"Thug 4", k:"foe"},
          {at:"C8", nm:"Thug 5", l:"Thug 5", k:"foe"},
          {at:"I7", nm:"Thug 6", l:"Thug 6", k:"foe"},
          {at:"F6", nm:"Orlok", l:"Orlok", k:"ally", side:1},
          {at:"D8", nm:"Dracula", l:"Dracula", k:"ally", side:1},
          {at:"H7", nm:"Edward", l:"Edward", k:"ally", side:1},
          {at:"F10", nm:"Angelique", l:"Angel.", k:"ally"},
          {at:"D9", nm:"Yobo", l:"Yobo", k:"pc"},
          {at:"E9", nm:"Gnomey", l:"Gnomey", k:"pc"},
          {at:"F9", nm:"Dark Wind", l:"Dark Wind", k:"pc"},
          {at:"G9", nm:"Kelvin", l:"Kelvin", k:"pc"},
          {at:"H9", nm:"Bix", l:"Bix", k:"pc"}
        ]},
      map:["Poe Boy and Stinky stay up on the stage. They're not in this fight."]
    },
    rounds:[
      {k:"Round 1",
       do:"A stake rests on Orlok's chest. The seal holds until Ostrander drops. <b>They go for Poe Boy?</b> He can't drop below 1 HP and Stinky blocks.",
       sp:[{who:"Orlok · pinned, to Kelvin", t:"Boy. Help me."},{who:"Edward · on seeing Ostrander's men", t:"Twenty-five years."}]},
      {k:"Round 2",
       do:"They've moved on to Edward: a mallet up over a stake on his chest. He's looking at Bix, not at it. Dracula stays frozen an arm's length from Yobo.",
       sp:[{who:"DJ Poe Boy · on the mic", t:"Oh, this is great. Keep going."}]},
      {k:"Round 3",
       do:"The mallet is still up, and shaking. <b>Ostrander still up at the end of this round, or two PCs down?</b> The seal slips and Orlok gets a hand free. Ostrander loses his turns, and the next hit from a PC kills him."}
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
      {who:"Orlok · pinned, to Kelvin", t:"Boy. Help me."},
      {who:"Edward · on seeing Ostrander's men", t:"Twenty-five years."},
      {who:"DJ Poe Boy · on the mic, during the fight", t:"Oh, this is great. Keep going."}
    ],
    foes:[
      {id:"ostrander", nm:"W. Ostrander", n:1, ac:15, hp:100, spd:"30", chassis:"Mage, no damage spells", cr:"6", xp:2300,
       sv:[-1,2,0,6,4,0], grab:"Acrobatics +2", pp:14, cast:"Hold: <b>DC 15 Wis</b>. If he casts anything else: save DC 15, spell attack +7.",
       sayIf:[{who:"W. Ostrander · when a PC reaches him", sp:1, t:"This site's paid for. Step back."}],
       turn:["<b>No PC has hit him or reached him?</b> Ignores the party and works on the vampires.",
             "<b>A PC hit him since his last turn?</b> Hold that PC: <b>DC 15 Wis save</b> or they lose their next turn, frozen.",
             "Surveyor's rod at a PC next to him: <b>+6 to hit, 10 bludgeoning</b>."],
       note:"Doesn't swing at a PC who's down.",
       hpnote:"The first 15 damage cracks his ward. Say so as it goes.",
       drop:"He's dead. The seal breaks: the vampires finish thugs 4–6, no rolls. Any of thugs 1–3 left drop their crowbars.",
       endsFight:1,
       hard:"He keeps ignoring the party for one more round, even after they hit him.",
       easy:"Add 15 HP (another layer of ward)."},
      {id:"thug", nm:"Thugs", one:"Thug", n:6, ac:12, hp:11, spd:"30", chassis:"Tough", cr:"½", xp:100,
       sv:[2,0,2,0,0,0], grab:"Athletics +2", pp:10,
       turn:["<b>Thugs 4–6 stay on the vampires, no rolls, unless a PC reaches them.</b> Thugs 1–3 all go for the same PC: <b>a PC on Ostrander?</b> That one. Otherwise the nearest.",
             "Crowbar: <b>+4 to hit, 8 bludgeoning</b>."],
       note:"Doesn't swing at a PC who's down.",
       drop:"Dead. A hard hat rolls across the floor.",
       hard:"One of thugs 1–3 breaks and runs.",
       easy:"Give each 5 more HP (16)."}
    ],
    alliesLabel:"Allies · no rolls",
    allies:[
      {nm:"Orlok, Dracula, Edward", act:"Pinned until the seal breaks, so they don't act. When the seal breaks they finish thugs 4–6: Dracula plays to the crowd; Orlok is quick and tidy; Edward is efficient and doesn't look at anyone. Mark each one down. <b>Kelvin heals one:</b> badge req 3. If it doesn't happen here, it's still open at the booth."},
      {nm:"Angelique", act:"Each round, after everyone: takes a hard hat's face and taps the thug on the most-hurt PC on the shoulder. He loses his next attack.",
       tok:"Next to that thug."}
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
      grid:{cols:12, rows:12, base:BALLROOM, lead:"It's the same ballroom, so leave the drawing as it is. Only these change.",
        draw:[
          {s:"x", a:"E1", nm:"The aux, once Angelique has said where it is", l:"Aux", lp:"D1", say:"This X is the aux, round the back of the mixer."}
        ],
        tokens:[
          {at:"F1", nm:"DJ Poe Boy", l:"Poe Boy", k:"foe"},
          {at:"F3", nm:"Lil Stinky", l:"Stinky", k:"foe"},
          {at:"F6", nm:"Orlok", l:"Orlok", k:"ally"},
          {at:"D8", nm:"Dracula", l:"Dracula", k:"ally"},
          {at:"H7", nm:"Edward", l:"Edward", k:"ally"}
        ]},
      map:["Take Ostrander and all six thugs off.","Stand Orlok, Dracula and Edward up where they are.","Leave the party and Angelique where they ended.","The USB goes wherever the party left it. Still upstairs? Someone runs it down, about 2 rounds."]
    },
    rounds:[
      {k:"Round 1",
       do:"Stinky's first swing goes through a vampire, no roll. <b>Kelvin heals it:</b> badge req 3, if it hasn't landed. Allies this round: Orlok, Angelique.",
       sp:[{who:"Angelique · to the party", t:"Aux is round the back of the mixer, left side. I'm on the poster. I know this stage."}]},
      {k:"Round 2", do:"Allies this round: Dracula, Angelique."},
      {k:"Round 3", do:"Allies this round: Edward, Angelique."},
      {k:"Round 4", do:"Allies this round: Orlok, Angelique."},
      {k:"Round 5", do:"Allies this round: Dracula, Angelique. <b>Not played by the end of this round?</b> Dracula lands the drive in a PC's hand at the decks, and it plays."},
      {k:"A PC at the decks plugs in the USB", do:"Their action. Go to step 4: Ending."}
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
       sv:[0,2,1,0,2,1], aura:3, grab:"Acrobatics +2", pp:12, cast:"Command: <b>DC 15 Wis</b>.",
       sayIf:[{who:"DJ Poe Boy · on whoever holds the USB", sp:1, t:"Drop."},{who:"DJ Poe Boy · nobody holding it, on the PC nearest the decks", sp:1, t:"Flee."}],
       turn:["Command, one word, <b>DC 15 Wis save</b>. The PC holding the USB: &ldquo;Drop.&rdquo; (it lands at their feet). Nobody holding it: the PC nearest the decks, &ldquo;Flee.&rdquo; (they spend their next move running from him).",
             "Mic stand at anyone next to him: <b>+4 to hit, 4 bludgeoning</b>."],
       hpnote:"<b>Stops at 1 HP.</b> At 1 he's on his knees behind the decks, still on the mic. Point at the decks. +3 on his saves while Stinky is within 10 ft, until Stinky turns.",
       drop:"After the recording, the next PC hit knocks him out, not killed. That ends the fight.",
       endsFight:1,
       hard:"He only Commands the PC holding the USB. No &ldquo;Flee.&rdquo;",
       easy:"He Commands two PCs a turn: &ldquo;Drop.&rdquo; and &ldquo;Flee.&rdquo;"},
      {id:"stinky", nm:"Lil Stinky", n:1, ac:18, hp:70, spd:"30", chassis:"Knight", cr:"3", xp:700,
       sv:[3,0,4,0,2,2], grab:"Athletics +3", pp:10, cimm:"Frightened",
       sayIf:[{who:"Lil Stinky · holding the decks", sp:1, t:"He's my best friend, man. Back up."}],
       turn:["Back to the decks, next to Poe Boy.",
             "Longsword twice: <b>+5 to hit, 8 radiant</b> each. The PC holding the USB if he can reach them, otherwise the nearest vampire."],
       note:"<b>Nobody can plug in while he's standing at the decks.</b> Shove him, grapple him, move him with a spell or a vampire, or drop him, then plug in. A vampire he hits smokes and staggers.",
       drop:"At 0 HP he's on one knee, sword down: out of the fight, awake, and still hears the recording. When it plays, his oath breaks, no save, and he gets up on the party's side: see the allies in step 3.",
       hard:"One swing, not two.",
       easy:"Add 20 HP (90)."}
    ],
    alliesLabel:"Allies · end of each round, no rolls",
    allies:[
      {nm:"Orlok", act:"In turn with Dracula and Edward, one a round. Takes hold of Lil Stinky: 10 necrotic, and he's off the decks until his next turn."},
      {nm:"Dracula", act:"Swoops: carries the PC holding the USB 30 ft toward the decks."},
      {nm:"Edward", act:"Pulls one PC 30 ft out of trouble. No opportunity attacks."},
      {nm:"Angelique", act:"Every round until the recording: wears Poe Boy's face beside the USB holder (nobody holding it: the PC nearest the decks). That PC has advantage on the save against his Command.",
       tok:"Next to that PC."},
      {nm:"Angelique, after the recording", act:"Every round: her own face, her own knife. 8 piercing on Poe Boy.",
       tok:"Next to Poe Boy."},
      {nm:"Lil Stinky, after the recording", act:"Every round: one swing at Poe Boy, 8 slashing, no roll. Poe Boy can't get past him off the decks. No HP from here: at 0 he gets up anyway.",
       tok:"Turn him round, next to Poe Boy, between him and the way off the decks."}
    ],
    allyNote:"They don't drop and have no HP to track. Their hits stop Poe Boy at 1 HP: a PC lands the last one."
  }
};
