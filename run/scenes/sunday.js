/* Sunday: the start card, the rooms (10 to 13, Dracula's scare) and the reserve fight.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"sunday", no:"SUN", title:"Sunday &mdash; before you start", where:"Day two · level 5 · tick as you go",
  checklist:[
    {g:"Table", items:[
      {id:"sun-level", t:"<b>Every sheet at level 5</b> (the level-up card comes just before this one). Told Cody 3rd-level spells are open, Daylight and Plant Growth?"},
      {id:"sun-rest", t:"<b>Full HP and spell slots</b> for everyone at the start of Sunday."},
      {id:"sun-ipad", t:"<b>Players' iPad</b> charged and on its home page. Nothing on it until the AIM room."},
      {id:"sun-spencer", t:"<b>Spencer</b> on cue 10 in his pink zone."}
    ]},
    {g:"Open the day", items:[
      {id:"sun-recap", t:"<b>Recap</b>: ask a player where they left off. Last thing they saw: a screen in the house typed <i>&ldquo;is someone there&rdquo;</i> and went dark."}
    ]}
  ],
  steps:[
    {say:"Last night. A card in your locker: <b>Dood Mansion, 8 PM</b>. A trap in the hall of records, and a page cut to ribbons. The house on the hill, the boards off the door &mdash; and the door bolting behind you. Angelique in the dark. Three voices in the hall: <i>&ldquo;He said five, and there are five.&rdquo;</i> Something about meals. <i>&ldquo;We'll find you when we're ready.&rdquo;</i> The old one, patting along the wrong shelf. The pale one, watching Bix. And behind a warm door upstairs, something half-made that you put down &mdash; and somewhere in the house a screen typed <b>&ldquo;is someone there&rdquo;</b>, and went dark.", who:"Previously &middot; or let a player tell it"},
    {do:"<b>Study first</b> (cue 10) &mdash; it has to land before anything clears the vampires. Then the party room (11) and the cellar (12), either order."},
    {do:"<b>The AIM room (13) is always last.</b> Fire the chime once all three rooms are done."},
    {do:"Time to spare after the rooms? The reserve fight (R) on the way up. Otherwise skip it."},
    {do:"<b>Dracula's scare (S)</b> is optional: between rooms, before the cellar."},
    {do:"<b>The ballroom stays locked until 2:30.</b> No roll opens it."},
    {do:"The party gets <b>one short rest</b> before 3AM."},
    {do:"<b>Break</b> after the three rooms, before the AIM door. From the AIM room to the driveway runs straight."},
    {end:"when they walk into the first room."}
  ],
  next:"Into the first room. Study first if you can.", go:"rooms",
  npcs:[],
  cues:[] },

{ act:"sunday", no:10, title:"The study", where:"Sunday morning · Gnomey · any-order room",
  steps:[
    {snd:["study"]},
    {say:"An ordinary door, swollen stiff in its frame. It gives to a shove. Behind it, a card table with the last hand still dealt: cards face-down under a skin of dust, an ashtray, a chair pushed back as if someone just stood up. In the corner, a strongbox.", who:"Setting"},
    {do:"The door is swollen stiff and opens with a shove. <b>No roll.</b>"},
    {note:"Nobody has opened it since 1931: Orlok won't go into the room where he lost the house."},
    {note:"<b>Run it before anything clears the vampires.</b>"},
    {tick:"Get <b>Julia alone</b> with the settlement: the others search the hall or the next door."},
    {snd:["lockclick"], t:"The strongbox"},
    {hand:"settlement", do:"The strongbox: &#9995; <b>the Articles of Settlement (printed)</b>. Get <b>Gnomey alone</b> with it."},
    {note:"On the printed settlement, the bearer paragraph is the <b>only one on the page with no corrections</b>. Dracula signed as witness, not a notary."},
    {note:"<b>Make sure Gnomey is alone.</b> Give Julia the secret; let her choose who to tell."},
    {do:"Investigation DC 12: <b>V. Soprano won the house</b>, the bearer clause, and <b>the empty slot</b> where the deed should be."},
    {check:{skill:"Investigation", dc:"12", note:"Read the signatures and the bearer clause: <b>V. Soprano</b> won the house, and title goes with the deed. If nobody gets there: <b>point at the empty slot in the strongbox</b> and read the bearer paragraph aloud."}},
    {stuck:"Point at the <b>empty slot in the strongbox</b> and read the bearer paragraph aloud."},
    {backup:"<b>Gnomey owns the house</b> &mdash; if he misses the bearer clause here, Vinny says it as he hands over the deed: <i>&ldquo;Whoever's holding this owns the place. Now that's you.&rdquo;</i>"},
    {do:"Julia decides who Gnomey tells."},
    {note:"Keep the <b>printed deed</b> hidden. Vinny has it, and it comes out only in the ending scene.", k:"rule"},
    {say:"He's read it three times. The man who won this house is his great-uncle &mdash; and whoever holds the deed owns it. The deed isn't here."},
    {end:"on the read-aloud: he's read it three times, and the deed isn't here."}
  ],
  next:"He's read it three times (read-aloud). Next room.", go:"rooms",
  npcs:[],
  cues:["study","lockclick"] },

{ act:"sunday", no:11, title:"The party room", where:"Sunday · Bix &amp; Yobo · any-order room",
  steps:[
    {snd:["candle"]},
    {say:"Dracula's shrine. He has kept the party room untouched since that night in '79, the best night of his unlife: dust on everything, bottles where they were set down, a record still on the turntable, and the smell of old wax.", who:"Setting"},
    {hand:"photo", do:"Prompt them to look around. <b>Bix finds the photograph.</b> &#9995; Hand Will the 4&times;6 print and say nothing. Bix: his parents."},
    {rev:{who:"Bix", t:"learns from the photograph: the pregnant goblin is his mother, and the fae with no fangs beside her is Edward, before he was turned. Hand Will the print and say nothing &mdash; he gets the goblin before the fae."}},
    {rev:{who:"The rest of the party", t:"learn whatever Bix says out loud. Don't prompt him."}},
    {snd:["needle","record"], t:"When Dracula drops the needle"},
    {do:"<b>Dracula is in the doorway.</b> He drops the needle and the room <i>remembers</i>: faint echoes of that night shimmer in &mdash; revellers mid-laugh, a cape flaring, someone dancing with a hand on her belly. Impressions, not ghosts: nobody can talk to them, and they fade when the music stops. Bix may know them from the photo. Then Dracula blocks the exit (Spencer)."},
    {rev:{who:"Bix", t:"may recognise the echoes from the photograph &mdash; the woman dancing with a hand on her belly is the goblin in the picture."}},
    {do:"<b>Yobo's Performance check</b>, at disadvantage (the debuff). <b>The roll can't win it</b>: it only measures how good the fake is. <b>DC 15</b> splits high from low. Either way Dracula answers it (Spencer) and the door stays shut."},
    {check:{skill:"Performance", dc:"15", note:"<b>Yobo, at disadvantage</b> (The Weight of Your Lies). 15+ gets the high line, under gets the low. The number only says how good the fake is &mdash; <b>it never opens the door</b>. Only a true performance earns <i>Your True Voice</i>."}},
    {note:"<b>The roll can't win it.</b> The door opens only for a true performance, or when John refuses and Dracula sulks and lets them go."},
    {stuck:"If nobody steps up to sing, Dracula looks at Yobo and waits."},
    {do:"<b>Dracula clocks the fake</b> (Spencer) and pushes Yobo to stop hiding and live as himself. Dracula sees through Yobo."},
    {note:"<b>Dracula isn't only mocking Yobo.</b> He recognises the mask. Play that under the camp."},
    {check:{skill:"Insight", dc:"12", note:"<b>Call it</b> after his line to Yobo. <b>Success:</b> he isn't only mocking Yobo; he recognises something. Flavour only: the scene plays the same either way."}},
    {snd:["cheer","levelup"], t:"If he performs as himself"},
    {hand:"truevoice", do:"<b>If John drops the Dolly Parton lie and performs as himself</b> &rarr; &#9995; hand John <b>Your True Voice</b>. The echoes cheer, the song ends, and Dracula bows them out. <b>If he stays masked</b> &rarr; Dracula sulks theatrically, steps aside and lets them go; the debuff stays."},
    {note:"<b>Coming clean early doesn't flip it.</b> The debuff card never mentions the cure; John learns honesty matters only from Dracula. If he confesses somewhere earlier, play it &mdash; but the buff flips only when he <b>performs as himself</b> on the stage Dracula gives him."},
    {note:"<i>Your True Voice</i> is <b>permanent</b> after this, through the finale."},
    {backup:"<b>Edward is Bix's father</b> &mdash; if Will doesn't get there from the photograph, Edward's epilogue in the driveway says it outright."},
    {say:"The needle lifts. The echoes thin to nothing, and the room is dust and bottles again."},
    {end:"when the needle lifts and the echoes fade &mdash; with Dracula bowing them out, or sulking aside."}
  ],
  next:"The needle lifts (read-aloud). Next room.", go:"rooms",
  talk:[
    {who:"Dracula · blocking the exit", t:"Nobody leaves my party without giving me a song."},
    {who:"Dracula · if the roll is 15+", t:"Technically flawless. Completely empty. Again, and this time be someone."},
    {who:"Dracula · if the roll is under 15", t:"Ah. There's the wobble. What are you hiding, darling?"},
    {who:"Dracula · to Yobo, clocking the fake", t:"I know that mask. I've worn it for centuries."}
  ],
  rev:[
    {by:"Dracula", who:"Yobo", t:"learns Dracula sees straight through the Dolly Parton act &mdash; and wants the real voice."},
    {by:"Dracula", who:"The party", t:"learn the truth about Yobo's origins <i>if</i> he drops the act for the song. What he says is John's call."}
  ],
  npcs:[
    {nm:"Dracula", vc:"This room is his shrine: untouched since '79, the best night of his unlife. Campy and theatrical. Blocks the door for a song, sees through Yobo because he knows the mask, and pushes him to drop the act. Sulks if refused."},
    {nm:"The echoes", vc:"Impressions of that night, not ghosts. They can't be spoken to; they laugh, dance and cheer, and fade when the music stops."}
  ],
  cues:["candle","needle","record","cheer","levelup"] },

{ act:"sunday", no:"S", title:"Dracula's scare", where:"Sunday · optional · between rooms, before the cellar",
  steps:[
    {do:"<b>Optional.</b> Run it between rooms, before the cellar. Skip it if you're short on time."},
    {snd:["drone"]},
    {say:"The hall between rooms. A draught from nowhere, and the candles start going out.", who:"Setting"},
    {say:"The candles in the hall go out one at a time, coming toward you. Something large unfolds from the ceiling.", who:"Set it up"},
    {snd:["swoop","jump"], t:"The swoop"},
    {do:"Scott sets it up. <b>Dracula swoops</b> with full theatrics (Spencer). No damage."},
    {check:{skill:"Insight", dc:"10", note:"<b>Call it</b> when he swoops. <b>Success:</b> his heart isn't in it. <b>Miss or nobody rolls:</b> the collapse still plays."}},
    {do:"<b>It collapses</b> as soon as someone is kind to him or unimpressed."},
    {end:"when it collapses and he leaves."}
  ],
  next:"He leaves. Next room.", go:"rooms",
  talk:[
    {who:"Dracula · swooping", t:"We said we'd find you when we were ready. We are ready. Scream!"},
    {who:"Dracula · when it collapses", t:"No? Nothing? Fine. I had a whole thing planned."}
  ],
  npcs:[
    {nm:"Dracula", vc:"Full theatrics, no damage. Pays off Orlok's &ldquo;We'll find you when we're ready.&rdquo; Stops dead the moment someone is kind or unimpressed: hurt, not angry."}
  ],
  cues:["drone","swoop","jump"] },

{ act:"sunday", no:12, title:"The infirmary", where:"The cellar · Cody · badge req 2 of 3 · any-order room",
  steps:[
    {snd:["cellar"]},
    {say:"Stone steps down. A lamp is already lit. It smells of straw and something clean and sharp, like a doctor's office. There's an exam table, a fox in a splint asleep on a blanket, and an owl on a perch with one wing bound. Jars, bandages, a mortar. A ledger lies open on a lectern. In the corner, under a dark grate, a tray of dead white seedlings.", who:"Setting"},
    {do:"Let them look around. It's plainly a clinic."},
    {hand:"ledger", do:"&#9995; <b>Orlok's ledger</b>, the printed page: a register of patients, with notes on the Sun's-mercy in the margin. Orlok is a vet."},
    {do:"Russ can use <b>Speak with Animals</b>. The fox and the owl say the old one mends them, and they aren't afraid of him. The vampires don't kill. This is the backup if nobody reads the ledger. The fox also says the seedlings want the sun, and the old one can't give it to them."},
    {check:{skill:"Speak with Animals", dc:"no roll", note:"The fox and the owl: the old one mends them, and they aren't afraid of him. The fox: the seedlings want the sun, and the old one can't give it to them."}},
    {do:"The seedlings lean to the grate; the margin notes point to them. It's night, so no daylight comes through. Russ makes the sun himself with <b>Daylight</b> (3rd-level druid spell)."},
    {check:{skill:"Daylight", dc:"no roll", note:"3rd-level druid spell. Russ makes the sun himself and the seedlings open."}},
    {do:"Didn't prepare it? <b>Plant Growth</b>, or the Nature check, DC 14."},
    {check:{skill:"Nature / Plant Growth", dc:"14", note:"The fallback if he didn't prepare Daylight."}},
    {snd:["bloom"], t:"The flowers open"},
    {do:"They open gold, and he dresses the fox's leg with one. <b>Badge req 2.</b>"},
    {end:"when the flowers open and Russ dresses the fox's leg."}
  ],
  next:"The flowers open and Russ dresses the fox's leg. Next room.", go:"rooms",
  rev:[
    {by:"The patients", who:"Russ", t:"learns through Speak with Animals that the old one mends them and they aren't afraid of him. <b>The vampires don't kill.</b>"},
    {by:"The fox", who:"Russ", t:"learns through Speak with Animals that the seedlings want the sun, and the old one can't give it to them."}
  ],
  npcs:[
    {nm:"The patients", vc:"A fox in a splint and an owl with a bound wing. Only Russ can understand them."}
  ],
  cues:["cellar","bloom"] },

{ act:"sunday", no:"R", title:"Reserve fight &mdash; the circle stirs", where:"Sunday · only if there's time to spare · skip it otherwise",
  steps:[
    {do:"<b>Only if</b> a room solved in five minutes and there's time to spare. Otherwise skip this cue."},
    {snd:["summon","heart"]},
    {say:"Last night's room is cold now. The half-drawn circle is still on the floorboards &mdash; and one of the chalk lines is moving.", who:"Setting"},
    {do:"On the way up to the computer room, the circle stirs. &#9876; Fight."},
    {tok:1},
    {snd:["jump"]},
    {note:"Use the 2&Prime; summoning token for the remnant and the four fragment tokens."},
    {fight:1},
    {do:"When the remnant drops, move straight on to the computer room."},
    {end:"when the remnant drops. Nothing new is learned here."}
  ],
  next:"The remnant drops: on to the AIM door.", go:["13"],
  fight:FIGHTS.reserve,
  npcs:[],
  cues:["summon","heart","jump"] },

{ act:"sunday", no:13, title:"The Spirit, the backpack, the USB", where:"The old rig upstairs · always the last room",
  steps:[
    {note:"<b>The door stays locked until the end</b>, with <b>Spencer's DJ poster</b> on it. You narrate the poster. Try it early and it doesn't open; this is the last room every time. The poster is the first thing that names Poe Boy as the host."},
    {say:"A purple poster on the door: <b>Haunted Bash</b>. 3 AM. Dood Mansion. <b>DJ Poe Boy</b>, huge, with Lil Stinky and Angelique.", who:"The poster · narrate it whenever they read that door"},
    {tick:"Short rest not taken yet? Offer it before the chime."},
    {tick:"Angelique not with them? She's at the AIM door when the chime plays."},
    {snd:["aim","lockclick"], t:"When the table is ready"},
    {do:"When the table is ready: &#127925; the <b>AIM chime</b> down the hall, then the lock clicks open by itself."},
    {say:"From down the hall, faint and tinny: the old AIM chime. Then the lock on the door with the poster clicks open &mdash; and nobody touched it.", who:"The door opens · when the table is ready"},
    {snd:["rig","heart"]},
    {say:"The last door, at the end of the upstairs hall. Inside: coats heaped by the desk, a mic on a stand, cables everywhere, and an old beige computer that is somehow still on, an AIM sign-on box glowing on the screen. The air is stale.", who:"Setting"},
    {do:"<b>Log in</b>: <code>DJPoeBoy187</code>, password from the sticky note (&#9995; now, if they don't have it). &#128241; <b>item 2</b>."},
    {ipad:2},
    {stuck:"Password: the sticky note. If they never found it, it's tucked in the monitor bezel. Any capitalisation works, unlimited tries."},
    {do:"They're signed on as the killer. He's frantic for a line, then works out it isn't him: <i>&ldquo;hes the only one who ever touches this machine.&rdquo;</i>"},
    {check:{skill:"Working it out", dc:"no roll", note:"Working out it isn't Poe Boy is character, not a check. When the drive mounts, the missing kid from the posters is the one in the computer."}},
    {do:"His story: lured, chased, soul-caged when <b>Poe Boy</b> shut the door. He names him, short of murder."},
    {hand:"willow", do:"The bag: &#9995; <b>the willow</b> to Simone, then &#9995; <b>the USB</b> &mdash; it mounts as <code>MARCUS_HALE</code> and he sends the recording."},
    {rev:{who:"Simone", t:"pulls the <b>wishing willow</b> from the bag &mdash; the one she sold this summer: <i>I want Angelique to notice me</i>. This is the willow kid. She may have connected the posters to her customer long ago, and that's fine: the reveal is that he's in the computer, and how."}},
    {rev:{who:"Angelique", t:"learns why she knew him: the willow worked. Spencer plays her reaction."}},
    {hand:"usb"},
    {rev:{who:"Players", t:"see the drive mount as <b>MARCUS_HALE</b>: the missing kid from the posters is the one in the computer. Angelique realises it's the same boy."}},
    {rev:{who:"Players", t:"get the recording, <code>scream_test_03_GOOD.wav</code>. Nobody else has heard it yet."}},
    {rev:{who:"Players", t:"get this if they ask what happened to him: last month he went missing. The school thinks he <b>ran away</b>, and the posters are still up. Nobody searched the mansion: he told no one where he was going, and the dare was only on AIM."}},
    {do:"Second ask: <i>can you get me out of here.</i> The goat joins the chat; the price is her piggy bank, the Total Party Kill concert fund. Narrate the smash; there's no physical bank."},
    {snd:["smash"], t:"The piggy bank"},
    {note:"<b>Nothing plot-critical hangs on Simone's yes.</b> The recording, the name and the drive are already theirs. A no costs nothing but him &mdash; the machine goes dark at sunrise. <b>Do not fudge it.</b>", k:"rule"},
    {backup:"<b>Poe Boy killed Marcus</b> &mdash; if the chat stalls or Simone logs off early, the recording at the decks proves it to everyone. The USB can't be destroyed, so it always plays."},
    {note:"Poe Boy arrives at 2:30 and opens the front door for the crowd. They may hear it from up here."},
    {snd:["bell","pa","braaam"], t:"3AM"},
    {note:"The flyer's <b>3AM</b> is the fight's starting gun &mdash; end the room on the speakers coming on."},
    {note:"Because only five were invited, <b>Poe Boy knows exactly who's here</b> and opens the show by naming them."},
    {do:"<b>End of the room:</b> every speaker comes on, then Poe Boy's voice (Spencer). That sends them to the ballroom."},
    {say:"It's three in the morning, and every speaker in this house just came on at once. It's you. Your own screams from tonight, cut together over a beat. Then Poe Boy's voice, over the top of it. Downstairs, the ballroom doors are standing open.", who:"Ending the room"},
    {end:"on 3AM: every speaker in the house, playing the party's own screams."}
  ],
  next:"Every speaker comes on: 3AM. No break from here to the driveway.", go:["14 · i"],
  talk:[
    {who:"The Spirit · on screen, read it if they don't", t:"my bag is still in this room. by the desk under the coats. can you get it"},
    {who:"DJ Poe Boy · every speaker, borrowed voices", t:"Live and direct from the Dood house! Stay tuned!"}
  ],
  rev:[
    {by:"The Spirit", who:"The Spirit", t:"learns the person on Poe Boy's handle isn't him &mdash; <i>&ldquo;hes the only one who ever touches this machine.&rdquo;</i>"},
    {by:"The Spirit", who:"Players", t:"learn he was lured, chased and soul-caged when <b>Poe Boy</b> shut the door &mdash; killed by a human. He names Poe Boy, short of saying murder."},
    {by:"The Spirit", who:"Players", t:"hear him name <b>Angelique</b> as the girl messaging him, if they ask who she was. True: she typed some of those messages for Poe Boy and thought it was a prank. She's suspected what they were for since he stopped coming to school. Spencer plays it."},
    {by:"DJ Poe Boy", who:"Players", t:"hear his voice over their own screams: the party is <b>Poe Boy's</b>, he's been recording them all night, and he lied about being up there once."},
    {by:"The Devil (Goat)", who:"Simone", t:"learns the price of getting him out: her piggy bank. Asked what for, the goat says only <b>&ldquo;No.&rdquo;</b>"}
  ],
  npcs:[
    {nm:"Angelique", vc:"In the room with them, whether she travelled with the party or was at the door when the chime played. She stays through the final battle, on the party's side. The willow and the drive land on her as hard as on Simone. When he names her: she typed some of the messages, thought it was a prank, and never knew he died."},
    {nm:"DJ Poe Boy", vc:"Only his voice, on every speaker, at the end of the room. Borrowed lines."},
    {nm:"The Spirit", vc:"Frightened, types lowercase. Comes apart at Poe Boy's handle. Offers his one wish rather than risk them logging off."},
    {nm:"The Devil (Goat)", vc:"Serif, capitals, full stops &mdash; never raised on a keyboard. Asked what it wants the money for: <b>&ldquo;No.&rdquo;</b> and nothing else."}
  ],
  cues:["rig","aim","lockclick","heart","smash","bell","pa","braaam"] }

);
