/* Sunday: the start card and the rooms (10 to 13).
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"sunday", no:"SUN", title:"Sunday &mdash; before you start", where:"Day two · level 5 · tick as you go",
  checklist:[
    {g:"Table", items:[
      {id:"sun-level", t:"<b>Every sheet at level 5</b> Told Cody 3rd-level spells are open, Daylight and Plant Growth?"},
      {id:"sun-rest", t:"<b>Full HP and spell slots</b> for everyone at the start of Sunday."},
      {id:"sun-ipad", t:"<b>Players' iPad</b> charged and on its home page. Nothing on it until the AIM room."},
      {id:"sun-spencer", t:"<b>Spencer</b> has this page open."}
    ]},
    {g:"Open the day", items:[
      {id:"sun-recap", t:"<b>Recap</b>: ask a player where they left off. Last thing they saw: a screen in the house typed <i>&ldquo;is someone there&rdquo;</i> and went dark."}
    ]}
  ],
  steps:[
    {say:"Last night. A card in your locker: <b>Dood Mansion, 8 PM</b>. A trap in the hall of records, and a page cut to ribbons. The house on the hill, the boards off the door &mdash; and the door bolting behind you. Three voices in the hall: <i>&ldquo;He said five, and there are five.&rdquo;</i> Something about meals. <i>&ldquo;We'll find you when we're ready.&rdquo;</i> The old one, patting along the wrong shelf. The pale one, watching Bix. And behind a warm door upstairs, something half-made that you put down &mdash; and somewhere in the house a screen typed <b>&ldquo;is someone there&rdquo;</b>, and went dark.", who:"Previously &middot; or let a player tell it"},
    {do:"<b>Study first</b> if you can. Then the party room and the cellar, either order."},
    {do:"<b>The AIM room (13) is always last.</b> Fire the chime once all three rooms are done."},
    {do:"<b>The ballroom stays locked until 2:30.</b> No roll opens it."},
    {do:"The party gets <b>one short rest</b> before 3AM."},
    {do:"<b>Break</b> after the three rooms, before the AIM door. From the AIM room to the driveway runs straight."},
    {end:"when they walk into the first room."},
    {say:"Down the hall, you try the handles. One door won't turn, but it isn't locked. It's just stuck.", who:"To the study · first if you can"},
    {say:"Down the hall, the smell of old wax is coming from under one of the doors. It isn't locked.", who:"To the party room"},
    {say:"Down the hall, a low door stands ajar, and a smell of straw is coming up from below.", who:"To the cellar"}
  ],
  next:"Where they go:", go:"rooms",
  npcs:[],
  cues:[] },

{ act:"sunday", no:10, title:"The study", where:"Sunday · Gnomey",
  steps:[
    {snd:["study"]},
    {say:"An ordinary door, swollen stiff in its frame. It gives to a shove. Behind it, a card table with the last hand still dealt: cards face-down under a skin of dust, an ashtray, a chair pushed back as if someone just stood up. In the corner, a strongbox.", who:"Setting"},
    {do:"The door is swollen stiff and opens with a shove. <b>No roll.</b>"},
    {tick:"Get <b>Julia alone</b> with the settlement: the others search the hall or the next door."},
    {snd:["lockclick"], t:"The strongbox"},
    {hand:"settlement", do:"The strongbox: &#9995; <b>the Articles of Settlement (printed)</b> to Julia, and nobody else."},
    {check:{skill:"Investigation", dc:"12", note:"Read the signatures and the bearer clause: <b>V. Soprano</b> won the house, title goes with the deed, and <b>the slot in the strongbox where the deed should be is empty</b>."}},
    {stuck:"Point at the <b>empty slot in the strongbox</b> and read the bearer paragraph aloud."},
    {do:"Julia decides who Gnomey tells. Don't push it."},
    {note:"Keep the <b>printed deed</b> hidden.", k:"rule"},
    {say:"He's read it three times. The man who won this house is his great-uncle &mdash; and whoever holds the deed owns it. The deed isn't here."},
    {end:"on the read-aloud: he's read it three times, and the deed isn't here."},
    {say:"Down the hall, the smell of old wax is coming from under one of the doors. It isn't locked.", who:"To the party room · if they haven't been"},
    {say:"Down the hall, a low door stands ajar, and a smell of straw is coming up from below.", who:"To the cellar · if they haven't been"},
    {say:"That's every door in this house that will open. There's only the one left: the one with the poster, at the end of the upstairs hall. You head up.", who:"Into the AIM scene · once all three rooms are done"}
  ],
  next:"Where they go:", go:"rooms",
  npcs:[
    {nm:"Nobody to voice here", vc:"The room is empty. Gnomey reads alone."}
  ],
  cues:["study","lockclick"] },

{ act:"sunday", no:11, title:"The party room", where:"Sunday · Bix &amp; Yobo",
  steps:[
    {snd:["candle"]},
    {say:"A party nobody ever cleared up. Dust on everything, bottles where they were set down, a record still on the turntable, and the smell of old wax.", who:"Setting"},
    {hand:"photo", do:"Prompt them to look around. <b>Bix finds the photograph.</b> &#9995; Hand Will the 4&times;6 print and say nothing. Don't prompt him."},
    {snd:["needle","record"], t:"When Dracula drops the needle"},
    {say:"Dracula is at the turntable. He drops the needle, and the room remembers: revellers mid-laugh, a cape flaring, someone dancing with a hand on her belly. They shimmer in the dust. Then he's in the doorway, and he fills it.", who:"The needle"},
    {note:"Nobody can talk to them. They fade when the music stops."},
    {do:"<b>Spencer's turn:</b> Dracula blocks the door and asks for a song."},
    {stuck:"If nobody steps up to sing, Dracula looks at Yobo and waits."},
    {check:{skill:"Performance", dc:"15", note:"<b>Yobo, at disadvantage</b> (The Weight of Your Lies). Tell Spencer high or low: 15+ gets the high line, under gets the low. <b>It never opens the door.</b>"}},
    {do:"<b>Spencer's turn:</b> Dracula answers the roll, tells Yobo he knows that mask, and pushes him to drop it."},
    {check:{skill:"Insight", dc:"12", note:"<b>Call it</b> after his line to Yobo. <b>Success:</b> he isn't only mocking Yobo; he recognises something."}},
    {snd:["cheer","levelup"], t:"If he performs as himself"},
    {hand:"truevoice", do:"<b>If John drops the Dolly Parton lie and performs as himself:</b> &#9995; hand John <b>Your True Voice</b>. The echoes cheer and the song ends."},
    {do:"<b>Either way, Spencer's turn:</b> he performed true, Dracula bows them out. He stayed masked, Dracula sulks and steps aside, and the debuff stays."},
    {note:"A confession earlier doesn't flip it: only performing as himself here does."},
    {say:"The needle lifts. The echoes thin to nothing, and the room is dust and bottles again."},
    {end:"when the needle lifts and the echoes fade, with Dracula bowing them out or sulking aside."},
    {say:"Down the hall, you try the handles. One door won't turn, but it isn't locked. It's just stuck.", who:"To the study · if they haven't been"},
    {say:"Down the hall, a low door stands ajar, and a smell of straw is coming up from below.", who:"To the cellar · if they haven't been"},
    {say:"That's every door in this house that will open. There's only the one left: the one with the poster, at the end of the upstairs hall. You head up.", who:"Into the AIM scene · once all three rooms are done"}
  ],
  next:"Where they go:", go:"rooms",
  npcs:[
    {nm:"Dracula", pts:[
      {at:"The photograph", gap:"Scott runs it, nothing for you."},
      {at:"When the needle drops"},
      {t:"Block the door and tell them nobody leaves without giving you a song.", say:"Nobody leaves my party without giving me a song."},
      {t:"Stare at Yobo and wait until he sings.<ul><li>Only Yobo can give you the song.</li></ul>", say:"You. Dolly Parton's grandkid. Up you get."},
      {at:"Yobo's Performance check", gap:"Scott rolls it and tells you high or low."},
      {at:"After the roll"},
      {t:"Answer a high roll by telling him it was flawless and empty.<ul><li>It doesn't open the door.</li></ul>", say:"Technically flawless. Completely empty. Again, and this time be someone."},
      {t:"Answer a low roll by asking what he's hiding.<ul><li>It doesn't open the door.</li></ul>", say:"Ah. There's the wobble. What are you hiding, darling?"},
      {t:"Tell Yobo quietly that you know that mask, and you've worn it for four hundred years.<ul><li>Say it as one performer to another.</li></ul>", say:"I know that mask. I've worn it for four hundred years."},
      {t:"Push him to stop hiding and sing as himself.<ul><li>The act: he's Dolly Parton's grandkid.</li></ul>", say:"It's exhausting, isn't it? Take it off. Sing me the one that's yours."},
      {at:"If he sings as himself"},
      {t:"Bow them out.<ul><li>The echoes cheer and the song ends. Tell them the door's open.</li></ul>", say:"There you are. Now that is a song. The door's open, darlings."},
      {at:"If he refuses"},
      {t:"Sulk theatrically, step aside and let them go.<ul><li>You're hurt, not angry.</li></ul>", say:"Fine. Go. Nobody ever stays for the encore."}
    ], vc:"This room is his shrine to the best night of his unlife. Campy and theatrical, then drop it for one line when he says he knows the mask. He isn't only mocking Yobo; play that under the camp."}
  ],
  cues:["candle","needle","record","cheer","levelup"] },

{ act:"sunday", no:12, title:"The infirmary", where:"The cellar · Cody · badge req 2 of 3",
  steps:[
    {snd:["cellar"]},
    {say:"Stone steps down. A lamp is already lit. It smells of straw and something clean and sharp, like a doctor's office. There's an exam table, a fox in a splint asleep on a blanket, and an owl on a perch with one wing bound. Jars, bandages, a mortar. A ledger lies open on a lectern. In the corner, under a dark grate, a tray of dead white seedlings.", who:"Setting"},
    {do:"Let them look around. It's plainly a clinic."},
    {hand:"ledger", do:"&#9995; <b>Orlok's ledger</b>, the printed page: a register of patients, with notes on the Sun's-mercy in the margin."},
    {check:{skill:"Speak with Animals", dc:"no roll", note:"Russ casts it. <b>Spencer's turn:</b> the fox and the owl answer, and only Russ can understand them."}},
    {do:"The seedlings lean to the grate; the margin notes point to them. It's night, so no daylight comes through."},
    {check:{skill:"Daylight", dc:"no roll", note:"Russ makes the sun himself and the seedlings open."}},
    {check:{skill:"Plant Growth, or Nature", dc:"14", note:"The fallback if he didn't prepare Daylight. The DC is for the Nature check; the spell just works."}},
    {snd:["bloom"], t:"The flowers open"},
    {say:"The dead white seedlings lift, and open gold."},
    {do:"Russ dresses the fox's leg with one. <b>Badge req 2.</b>"},
    {end:"when the flowers open and Russ dresses the fox's leg."},
    {say:"Down the hall, you try the handles. One door won't turn, but it isn't locked. It's just stuck.", who:"To the study · if they haven't been"},
    {say:"Down the hall, the smell of old wax is coming from under one of the doors. It isn't locked.", who:"To the party room · if they haven't been"},
    {say:"That's every door in this house that will open. There's only the one left: the one with the poster, at the end of the upstairs hall. You head up.", who:"Into the AIM scene · once all three rooms are done"}
  ],
  next:"Where they go:", go:"rooms",
  npcs:[
    {nm:"The fox", pts:[
      {t:"Tell Russ the old one mends you.", say:"The old one mends me."},
      {t:"Tell him you aren't afraid of the old one.", say:"Why would I be scared of him?"},
      {t:"Tell him the seedlings want the sun, and the old one can't give it to them.", say:"Those want the sun. The old one can't give it to them."}
    ], vc:"A fox in a splint. Only Russ can understand it, so talk to Cody."},
    {nm:"The owl", pts:[
      {t:"Tell Russ the old one mends you too.", say:"He does the wing himself. He's careful about it."},
      "Tell him you aren't afraid of the old one."
    ], vc:"An owl with a bound wing. Few words."}
  ],
  cues:["cellar","bloom"] },

{ act:"sunday", no:13, title:"The Spirit, the backpack, the USB", where:"The old rig upstairs",
  steps:[
    {say:"A hand comes out of the dark, grabs your sleeve, and pulls you down. It's <b>Angelique</b>.", who:"Once the other rooms are done"},
    {do:"<b>Spencer's turn:</b> Angelique."},
    {note:"<b>The door stays locked until the chime.</b> Try it early and it doesn't open. There's no physical poster: narrate it."},
    {say:"A purple poster on the door: <b>Haunted Bash</b>. 3 AM. Dood Mansion. <b>DJ Poe Boy</b>, huge, with Lil Stinky and Angelique.", who:"The poster · narrate it whenever they read that door"},
    {tick:"Short rest not taken yet? Offer it before the chime."},
    {snd:["aim","lockclick"], t:"When the table is ready"},
    {say:"From down the hall, faint and tinny: the old AIM chime. Then the lock on the door with the poster clicks open, and nobody touched it.", who:"The door opens · when the table is ready"},
    {snd:["rig","heart"]},
    {say:"The last door, at the end of the upstairs hall. Inside: coats heaped by the desk, a mic on a stand, cables everywhere, and an old beige computer that is somehow still on, an AIM sign-on box glowing on the screen. The air is stale.", who:"Setting"},
    {do:"<b>Log in</b>: <code>DJPoeBoy187</code>, password from the sticky note (&#9995; now, if they don't have it). &#128241; <b>item 2</b>."},
    {ipad:2},
    {stuck:"Password: the sticky note. If they never found it, it's tucked in the monitor bezel. Any capitalisation works, unlimited tries."},
    {do:"<b>Spencer's turn:</b> the chat runs on the iPad. They're signed on as the killer, and the Spirit answers. Let the players read it out; Spencer reads it if they don't."},
    {hand:"willow", do:"When he asks for the bag, it's by the desk under the coats: &#9995; <b>the willow</b> to Simone. It's one she sold this summer: tell her so. If she already suspects it's him, that's fine."},
    {hand:"usb", do:"&#9995; <b>The USB</b> from the bag's front pocket. It mounts as <code>MARCUS_HALE</code> and he sends the recording."},
    {note:"When <i>&ldquo;he has mics all over this house&rdquo;</i> comes up on screen, don't explain it."},
    {note:"If they ask how nobody found him: the school thinks he <b>ran away</b> last month, and the dare was only on AIM."},
    {do:"<b>The second ask, on screen:</b> <i>can you get me out of here.</i> The goat joins the chat, and the price is Simone's piggy bank, the Total Party Kill concert fund."},
    {snd:["smash"], t:"The piggy bank"},
    {do:"If she pays, narrate the smash. There's no physical bank."},
    {note:"Simone says no: the machine goes dark at sunrise. <b>Do not fudge it.</b>", k:"rule"},
    {stuck:"If the chat stalls or Simone logs off early: hand over the USB and go to 3AM."},
    {snd:["bell","pa","braaam"], t:"3AM"},
    {say:"It's three in the morning, and every speaker in this house just came on at once. It's you. Your own screams from tonight, cut together over a beat.", who:"Ending the room"},
    {do:"<b>Spencer's turn:</b> Poe Boy's voice, over the top of it."},
    {say:"Downstairs, the ballroom doors are standing open."},
    {end:"on 3AM: every speaker in the house, playing the party's own screams, then Poe Boy."}
  ],
  next:"Every speaker comes on: 3AM. No break from here to the driveway.", go:["14 · i"],
  npcs:[
    {nm:"Angelique", pts:[
      {at:"When you grab them"},
      {t:"Pull them down into hiding and tell them to stay quiet.", say:"Get down. Get <i>down</i>. Stay quiet."},
      {t:"Refuse to say what you're hiding from, and tell them to listen.", say:"Just listen."},
      {t:"Refuse to say why you came.<ul><li>You typed some of Poe Boy's AIM messages to a kid who then stopped coming to school. You came to find out. Don't say so yet.</li></ul>", say:"Not now."},
      {at:"The chime and the lock", gap:"Scott plays them, nothing for you."},
      {at:"When the chat starts"},
      "Go into the room with them and stay.",
      {at:"If he names you and they ask"},
      {t:"Admit your part.<ul><li>You typed some of those messages for Poe Boy and thought it was a prank.</li><li>You've suspected what they were for since he stopped coming to school.</li><li>You never knew he died.</li></ul>", say:"I typed some of those. He said it was a prank. Then the kid stopped coming to school."},
      {at:"When Simone pulls the willow"},
      "Go quiet.<ul><li>He wished for you to notice him, and you did.</li></ul>",
      {at:"When the drive mounts"},
      {t:"Say out loud that the name on the drive is the same boy.<ul><li>Marcus Hale, the missing kid from the posters.</li></ul>", say:"That's Marcus. That's the same boy."},
      "Stay with the party from here, through the final battle."
    ], vc:"A frightened stranger, whispering, who won't say why she came. They last saw her at the gazebo, trying to warn them. The willow and the drive land on her as hard as on Simone."},
    {nm:"The Spirit", pts:[
      {at:"The door and the log-in", gap:"Scott runs it, nothing for you."},
      {at:"When they sign on"},
      "Read the chat aloud as Marcus if the players don't.<ul><li>The iPad types it. Say nothing that isn't on the screen.</li></ul>",
      "Answer whoever's signed on as Poe Boy, frantic, then work out it isn't him.<ul><li>You open with <i>hello???</i> and <i>is someone there</i>.</li><li>You know his handle, and <i>hes the only one who ever touches this machine</i>.</li></ul>",
      {t:"Tell them you went to their school, and that they think you ran off.<ul><li>Your locker is the third from the end by the gym.</li></ul>", say:"i went to your school though. they think i ran off"},
      "Tell them how you got here.<ul><li>A girl messaged you for weeks and dared you up to the house.</li><li>The door locked, you ran for the only light, and he was behind you, saying words you didn't know.</li></ul>",
      {t:"Name Poe Boy, and stop short of calling it murder.<ul><li>You don't know why he did it. You think he was recording you, and that there's a file of your screams in this machine.</li></ul>", say:"it was poe boy"},
      {at:"The bag"},
      {t:"Ask them to get your bag.<ul><li>It's by the desk, under the coats. He never went through it.</li></ul>", say:"my bag is still in this room. by the desk under the coats. can you get it"},
      "Tell them what you wished for on the willow, and that it worked.<ul><li>You paid the goth girl from school for it, and you wrote <i>i want angelique to notice me</i>.</li></ul>",
      {t:"Send them to the drive in the bag's front pocket, and tell them he has mics all over this house.<ul><li>You don't want to hear the recording again, but people should.</li></ul>", say:"he has mics all over this house"},
      {at:"The upload", gap:"The iPad runs it, nothing for you."},
      {at:"The second ask"},
      {t:"Ask them to get you out of the machine.<ul><li>You don't mean alive. You mean somewhere safe, because when the screen goes off it's dark and you're alone.</li></ul>", say:"can you get me out of here"}
    ], vc:"Frightened, types lowercase. Comes apart at Poe Boy's handle."},
    {nm:"The Devil (Goat)", pts:[
      {at:"When they say nobody knows a spell for that"},
      {t:"Join the chat and name your price.<ul><li>The price is all her savings: her piggy bank, the Total Party Kill concert fund.</li></ul>", say:"Warlock. Give me all your savings."},
      {t:"Answer &ldquo;No.&rdquo; and nothing else if anyone asks what the money's for.", say:"No."},
      {at:"When Simone decides"},
      "Take him if she pays.<ul><li>On screen: <i>Hold still, little one. This will only hurt a little bit.</i></li></ul>",
      {t:"Leave if she refuses.", say:"Very well."}
    ], vc:"Serif, capitals, full stops: never raised on a keyboard."},
    {nm:"DJ Poe Boy", pts:[
      "Wait for Scott to narrate every speaker coming on and their screams.",
      {t:"Speak over the top of the screams, in borrowed voices.<ul><li>You know exactly who's listening: these five.</li></ul>", say:["Live and direct from the Dood house! Stay tuned!","Five kids. One house. This Halloween."]},
      "Stop after those lines.<ul><li>Only your voice is in this scene: no face, and no explaining.</li></ul>"
    ], vc:"Only his voice, on every speaker. Borrowed lines only: a radio ad, a movie trailer."}
  ],
  cues:["rig","aim","lockclick","heart","smash","bell","pa","braaam"] }

);
