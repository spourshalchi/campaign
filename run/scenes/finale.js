/* The finale: cues 14 to 16.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"finale", no:"14 · i", title:"The developer", where:"Step 1 of 2: save the vampires",
  steps:[
    {snd:["set","crowd"]},
    {say:"3AM, and the house is suddenly full of people. The ballroom is rigged as a stage: decks on the dais, cables run off into the walls, lights swinging over a crowd still pouring in, every face turned up and smiling. And on the decks, Poe Boy, playing your screams to all of them.", who:"Setting"},
    {do:"<b>Spencer's turn:</b> Russ shows Orlok the card and he won't sign. <b>Refusal 2 of 3.</b>"},
    {snd:["pa"], t:"Poe Boy takes the mic"},
    {do:"<b>Spencer's turn:</b> the party comes for Poe Boy. He names all five on the mic."},
    {do:"<b>Spencer's turn:</b> Dracula's line."},
    {check:{skill:"Perception", dc:"14", note:"<b>Call it</b> as the crowd pours in. <b>Success:</b> one man with a clipboard isn't charmed. <b>Miss:</b> they don't spot him."}},
    {snd:["jump","braaam"], t:"The hard hats"},
    {say:"Hard hats push through the crowd. They walk right past you. They're going for the vampires. A man with a clipboard holds up a seal and says one word, and Orlok, Dracula and Edward stop dead, pinned where they stand. His men take out stakes.", who:"The hard hats"},
    {do:"<b>Spencer's turn:</b> Ostrander's order to his men."},
    {say:"<b>What do you do?</b>", who:"After Ostrander's line"},
    {tok:1},
    {fight:1},
    {do:"The party kills him. <b>Stop. Let the room be quiet for a moment.</b>"},
    {note:"Nothing funny until the room has been quiet.", k:"rule"},
    {say:"The seal goes. Three vampires get up, and it's over fast for the men nearest them. Anyone else in a hard hat lets go of his crowbar.", who:"Then the seal breaks"},
    {end:"when the seal breaks and the vampires are on their feet."}
  ],
  next:"Straight to the booth.", go:["14 · ii"],
  talk:[
    {who:"DJ Poe Boy · on the mic, radio-ad voice", t:"Caller number one, Bix Grimlor, you're on the air!"},
    {who:"DJ Poe Boy · the rest, same voice", t:"Gnomey Soprano! Yobo! Russ! Simone! Stay tuned!"},
    {who:"Dracula · waiting for his cue, to the party", t:"Not you. Them."},
    {who:"W. Ostrander · to his men", t:"Stakes. Start with the old one."},
    {who:"W. Ostrander · when a PC reaches him", t:"This site's paid for. Step back."}
  ],
  fight:FIGHTS.developer,
  npcs:[
    {nm:"Orlok", pts:[{at:"Before the fight"},"Look at the card when Russ shows it to you, and refuse to sign it.",{at:"The fight"},"Ask Russ for help once you're pinned.<ul><li>Keep it flat.</li></ul>","Keep calling for help if the party goes for Poe Boy instead.",{at:"When the seal breaks", gap:"Scott narrates it, nothing for you."}], vc:"Cold until he's pinned. Then just the one request, as flat as he can make it."},
    {nm:"DJ Poe Boy", pts:[{at:"Before the fight"},"Name all five of them on the mic, one at a time, in a borrowed voice.<ul><li>Bix Grimlor, Gnomey Soprano, Yobo, Russ and Simone.</li><li>You only speak in borrowed lines: a radio ad, a movie trailer, your mom.</li></ul>",{at:"The fight"},"Stay up on the decks for this whole fight.<ul><li>Lil Stinky blocks anyone who comes up.</li></ul>","Enjoy the fight out loud on the mic.<ul><li>Scott cues you in round 2.</li></ul>"], vc:"Delighted."},
    {nm:"Dracula", pts:[{at:"Before the fight"},"Tell the party they aren't who you're waiting for.",{at:"The fight", gap:"Frozen mid-flourish, an arm's length from Yobo. Nothing for you."},{at:"When the seal breaks", gap:"Scott narrates it, nothing for you."}], vc:"Play him waiting for his cue."},
    {nm:"W. Ostrander", pts:[{at:"Before the fight"},"Walk in with the crowd and go straight past the party.","Order your men to stake the vampires, starting with Orlok.",{at:"The fight"},"Ignore the party until someone hits you or reaches you, then tell them to step back.<ul><li>Treat this as a site you've paid for, with a pest problem.</li></ul>"], vc:"An adult with a clipboard."},
    {nm:"Edward", pts:[{at:"Before the fight"},"Say one line when you see Ostrander's men, and don't explain it.",{at:"The fight"},"Look at Bix, not at the stake, once you're pinned.",{at:"When the seal breaks", gap:"Scott narrates it, nothing for you."}], vc:"Quiet. Says almost nothing."}
  ],
  cues:["set","crowd","pa","jump","braaam"] },

{ act:"finale", no:"14 · ii", title:"The booth", where:"Step 2 of 2: get Poe Boy",
  steps:[
    {snd:["set","crowd"]},
    {say:"The developer is down. The crowd is still swaying, still smiling, and up on the decks Poe Boy and Lil Stinky aren't letting anyone near the aux.", who:"Setting"},
    {say:"The man who wanted this house is dead on the floor. Orlok is looking at you, and for once he isn't cold about it. The crowd hasn't noticed. The set hasn't stopped. Poe Boy is still up there.", who:"The vampires owe you"},
    {do:"The party tells the vampires about Marcus and the drive. <b>Spencer's turn</b> if nobody raises it: Orlok asks, and Poe Boy panics and gives it away."},
    {do:"<b>Spencer's turn:</b> Orlok on the drive, then to Poe Boy. Poe Boy refuses, and the vampires turn on him. &#9876;"},
    {tok:1},
    {say:"Get the USB to the decks and get on aux.", who:"The objective"},
    {fight:1},
    {note:"<b>Badge req 3</b>, if it hasn't landed: Russ heals a vampire under fire, any round."},
    {snd:["scratch"], t:"The USB hits the decks"},
    {snd:["hiss"], t:"Under the recording"},
    {say:"His set cuts out mid-scream. Then typing. A door shuts. Then a scared kid, asking someone to open it. Asking again, quieter. And under all of it, perfectly calm, Poe Boy: nudging a level up, leaning in close to listen, pleased with how clean it sounds.", who:"When the USB hits the decks · narrate the recording"},
    {say:"The speakers hiss. Nobody in the ballroom moves.", who:"Then let it sit"},
    {say:"The light goes out of Lil Stinky's sword. He turns around and looks at his best friend.", who:"Lil Stinky's oath breaks"},
    {note:"<b>No save.</b> Don't put this on a d20.", k:"rule"},
    {do:"<b>Spencer's turn:</b> Stinky to Poe Boy, then Angelique to the crowd."},
    {do:"<b>IF Simone paid the goat, Spencer's turn:</b> Marcus, through every speaker."},
    {snd:["boo","braaam"], t:"One boo, then the whole room"},
    {say:"The smiles go, all at once, across the whole room. Somebody boos. Then everybody does.", who:"The charm breaks"},
    {do:"<b>Spencer's turn:</b> Dracula seizes the mic. Poe Boy's Command stops landing."},
    {do:"Stinky and Angelique go for Poe Boy, and the party takes him down. <b>At 0 HP he's knocked out, not killed.</b>"},
    {say:"It runs on into the early morning. By the end, the ballroom windows have gone grey.", who:"On the last turn"},
    {end:"on the fight running into the early morning."}
  ],
  next:"Cut to the driveway at sunrise.", go:["15"],
  talk:[
    {who:"Orlok · to the party, after the silence", t:"What's on the drive?"},
    {who:"Orlok · if nobody raises the drive", t:"You came down those stairs running. What did you find up there?"},
    {who:"DJ Poe Boy · panicking, borrowed voices", t:"Don't touch that dial!"},
    {who:"Orlok · to Poe Boy", t:"Let them play it."},
    {who:"Lil Stinky · holding the decks", t:"He's my best friend, man. Back up."},
    {who:"Angelique · to the crowd, when the recording plays", t:"I typed those messages."},
    {who:"DJ Poe Boy · after the recording, nobody listening", t:"We'll be right back after these messages!"},
    {who:"Dracula · on the mic, to the crowd", t:"Ladies and gentlemen. I have waited all night for you."},
    {who:"Dracula · denouncing him", t:"Your DJ, darlings. He shut a boy behind a door and wrote GOOD on the file. Technically flawless. Completely empty."}
  ],
  ifblock:{when:"IF Simone paid the goat", say:"Spencer voices <b>Marcus</b> through every speaker in the house. Lowercase, the way he typed.",
    lines:[
      {who:"Marcus · to Poe Boy", t:"you said you'd open it."},
      {who:"Marcus · to Poe Boy", t:"i kept asking. you kept recording. you wrote GOOD on it."},
      {who:"Marcus · to the vampires", t:"i didn't go out a window. i was upstairs. the whole time."},
      {who:"Marcus · last", t:"ok. you can turn it off now."}
    ],
    otherwise:"If she said no, skip it. The room has already turned; the ending loses nothing."},
  fight:FIGHTS.booth,
  npcs:[
    {nm:"Orlok", pts:[{at:"Before the fight"},"Ask the party what's on the drive.<ul><li>If nobody has brought it up, ask what they found upstairs.</li></ul>","Tell Poe Boy to let them play it.",{at:"The fight"},"Turn on Poe Boy when he refuses.<ul><li>Don't fight him until then. Then take hold of Lil Stinky.</li></ul>"], vc:"For once not cold."},
    {nm:"DJ Poe Boy", pts:[{at:"Before the fight"},"Panic in borrowed voices when the drive comes up.","Refuse Orlok with one word, aimed at whoever holds the USB.<ul><li>The word is &ldquo;Drop.&rdquo;</li></ul>",{at:"The fight"},"Command one person on each of your turns.",{at:"After the recording plays"},"Try one borrowed voice after another once the recording has played.<ul><li>Your Command stops working, and nobody in the room is listening.</li></ul>",{at:"At 0 HP", gap:"Scott narrates it, nothing for you."}], vc:"Borrowed lines only."},
    {nm:"Lil Stinky", pts:[{at:"The fight"},"Hold the decks and keep everyone off the aux.<ul><li>Play it sincere: you believe your best friend.</li><li>Nobody can plug in while you're standing at the decks.</li></ul>",{at:"After the recording plays"},"Turn on Poe Boy when you hear the recording.<ul><li>Your oath breaks, with no roll.</li></ul>","Swing at Poe Boy each round and block his way off the decks.<ul><li>If the party comes at you, take it and don't swing back.</li></ul>"], vc:"Stoner, bad rapper, honest to a fault."},
    {nm:"Angelique", pts:[{at:"The fight"},"Tell the party where the aux is in round 1.","Stand beside whoever holds the USB, wearing Poe Boy's face, and shake your head.<ul><li>Keep doing it until the recording plays.</li></ul>",{at:"After the recording plays"},"Tell the crowd you typed those messages when the recording plays.<ul><li>Use your own face from here on.</li></ul>","Walk up to Poe Boy looking like yourself and go at him with your knife."], vc:"Says it to the whole room and doesn't soften it."},
    {nm:"Dracula", pts:[{at:"The fight", gap:"Scott runs it, nothing for you."},{at:"After the room turns"},"Seize the mic and greet the crowd once the room has turned on Poe Boy.<ul><li>Play it like you've waited all night for a real audience.</li></ul>","Denounce Poe Boy, magnificently.<ul><li>He shut a boy behind a door, recorded it and wrote GOOD on the file.</li></ul>"], vc:"Campy and theatrical."}
  ],
  cues:["set","crowd","scratch","hiss","boo","braaam"] },

{ act:"finale", no:15, title:"The driveway", where:"",
  steps:[
    {snd:["dawn","crowd"]},
    {say:"Sunrise on the lawn. The crowd is still milling about in last night's costumes, the vampires keep to the shade of the porch, and in daylight the house looks almost like a house again.", who:"Setting"},
    {snd:["car"], t:"The first car"},
    {say:"A Volvo comes up the drive, past the crowd. Two people in matching fleece get out.", who:"The first car"},
    {hand:"tickets", do:"<b>Spencer's turn:</b> Poe Boy's parents find him."},
    {snd:["car"], t:"The second car"},
    {say:"A second car behind it. A man in khaki shorts gets out, whistle round his neck, clipboard under his arm. In the passenger seat, an ancient man is already talking.", who:"The second car"},
    {do:"<b>Spencer's turn:</b> the troop leader asks for Russ's card. Orlok signs it, through his teeth."},
    {hand:"badge"},
    {note:"<b>Russ gets the badge no matter what</b>, even if he missed a requirement.", k:"rule"},
    {snd:["levelup"], t:"The badge"},
    {hand:"deed", do:"<b>Spencer's turn:</b> Vinny and the deed."},
    {do:"Let Julia say it: <i>&ldquo;This is my house.&rdquo;</i> <b>Spencer's turn:</b> Orlok confirms it. Then Julia: <i>&ldquo;You can stay.&rdquo;</i>"},
    {do:"<b>Spencer's turn:</b> Edward explains himself to Bix. <b>No jokes.</b>"},
    {end:"after Edward. Let it sit."}
  ],
  next:"Cut to class.", go:["16"],
  flow:[
    {at:"The first car"},
    {who:"Poe Boy's mother", t:"Call out to him by his real name.", say:"Upton, honey?"},
    {who:"Poe Boy's parents", t:"Tell him you've been wondering where he's been.", say:"We've been wondering where you've been."},
    {who:"Poe Boy's mother", t:"Ground him and tell him he isn't going to the concert.", say:"You're grounded, mister. And you are certainly not going to that satan concert."},
    {who:"Poe Boy's mother", t:"Give the two concert tickets to Simone.", say:"Here, sweetie. Somebody should use these."},
    {at:"The second car"},
    {who:"Russ's troop leader", t:"Explain that you drove Vinny up.<ul><li>You know him from Troop 187's nursing-home visits. He kept insisting he's late for the card game.</li></ul>", say:"He kept saying he was late for a card game, so I drove him up."},
    {who:"Great Uncle Vinny", t:"Keep insisting you're late for the card game.<ul><li>You think it's 1931, and Cornelis owes you a rematch.</li></ul>", say:"Is it the fourteenth? I'm late. Cornelis owes me a rematch."},
    {who:"Russ's troop leader", t:"Ask Russ for his requirements card and ask Orlok to sign it.<ul><li>It needs the elder's signature.</li></ul>", say:"Got that card? Just need your elder's signature, right there."},
    {who:"Orlok", t:"Sign Russ's card, through your teeth."},
    {who:"Russ's troop leader", t:"Hand Russ his badge.<ul><li>He gets it no matter what, even if he missed a requirement.</li></ul>", say:"That's the paperwork in order. Congratulations, son."},
    {at:"The deed"},
    {who:"Great Uncle Vinny", t:"Hand Gnomey the deed as if it was always the plan."},
    {who:"Great Uncle Vinny", t:"Tell Gnomey that whoever holds the deed owns the place.", say:"Whoever's holding this owns the place. Now that's you."},
    {at:"When Julia says &ldquo;This is my house&rdquo;"},
    {who:"Orlok", t:"Confirm in front of everyone that the house is Gnomey's.", say:"He holds the deed. The house is his."},
    {at:"When Julia says &ldquo;You can stay&rdquo;", gap:"Julia's moment, nothing for you."},
    {at:"Edward, to Bix"},
    {who:"Edward", t:"Tell Bix how you and Goblinenon came to this house.<ul><li>You were passing through on a rainy night when your cart threw a tire. You knocked at the nearest big house and found two vampires having a party.</li><li>You had such a good time that you stayed. About nine months later, Bix was born.</li></ul>", say:"Your mother was Goblinenon. Our cart threw a tire out on this road, so we knocked on this door."},
    {who:"Edward", t:"Tell Bix what happened to his mother.<ul><li>The real-estate company hired men to clear out the squatters and the vampires. They killed Goblinenon and left you badly hurt.</li></ul>", say:"The company sent men to clear this house. They killed her."},
    {who:"Edward", t:"Tell Bix how you became a vampire.<ul><li>You were dying, and the vampires turned you to save your life. You woke up horrified at what you were.</li></ul>", say:"I was dying. They turned me to save me."},
    {who:"Edward", t:"Tell Bix why you left him.<ul><li>You carried him down into town that same night and left him there on purpose. Anything was better than being raised by a single father who was now a monster.</li></ul>", say:"I carried you down the hill that night and left you there. On purpose. Anything was better than being raised by this."}
  ],
  npcs:[
    {nm:"Poe Boy's parents", vc:"A Volvo, matching fleece, sweet and oblivious."},
    {nm:"Russ's troop leader", vc:"Over-earnest scout dad, no name needed: khaki shorts in November, a whistle, a clipboard. Completely unfazed by vampires as long as the paperwork is in order."},
    {nm:"Great Uncle Vinny", vc:"Ancient and mostly gone. The same voice as Saturday's phone call."},
    {nm:"Orlok", vc:"Pissed, and complies perfectly."},
    {nm:"Edward", vc:"To Bix, quietly. No jokes in it."}
  ],
  cues:["dawn","crowd","car","levelup"] },

{ act:"finale", no:16, title:"Back to class", where:"",
  steps:[
    {snd:["class"]},
    {say:"The same history classroom, the same clanking radiators. The five of you at the front, scraped and bruised, a black eye or two between you.", who:"Setting"},
    {do:"They present the project. <b>They don't have to show the tape or an artifact:</b> there were plenty of witnesses."},
    {note:"<b>Play them battered.</b>"},
    {do:"Let a player deliver it: <i>&ldquo;&hellip;and yeah that was our class project.&rdquo;</i> Nobody in class reacts."},
    {do:"<b>The closers</b>: Stinky's diss track, the mall breaking ground in Amityville, and, if Simone paid the goat, Marcus helping people find books on the library computers."},
    {end:"on the room not reacting."}
  ],
  next:"The end.",
  npcs:[],
  cues:["class"] }

);
