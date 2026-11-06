/* The finale: cues 14 to 16.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"finale", no:"14 · i", title:"The developer", where:"The ballroom · 3AM · step 1 of 2: save the vampires · the only lethal fight",
  steps:[
    {snd:["set","crowd"]},
    {say:"3AM, and the house is suddenly full of people. The ballroom is rigged as a stage: decks on the dais, cables run off into the walls, lights swinging over a crowd still pouring in, every face turned up and smiling. And on the decks, Poe Boy, playing your screams to all of them.", who:"Setting"},
    {note:"Poe Boy opens the front door at 2:30 for the crowd, and the ballroom with it. The crowd stays because it's charmed."},
    {do:"<b>Spencer's turn:</b> Russ shows Orlok the card and he won't sign. <b>Refusal 2 of 3.</b>"},
    {snd:["pa"], t:"Poe Boy takes the mic"},
    {do:"<b>Spencer's turn:</b> the party comes for Poe Boy. He names all five on the mic."},
    {do:"<b>Spencer's turn:</b> Dracula's line."},
    {check:{skill:"Perception", dc:"14", note:"<b>Call it</b> as the crowd pours in. <b>Success:</b> one man with a clipboard isn't charmed. His name is on the library card and the survey (<i>coordinate through W.O.</i>), so a player can place him. <b>Miss:</b> it plays on schedule."}},
    {snd:["jump","braaam"], t:"The hard hats"},
    {say:"Hard hats push through the crowd. They walk right past you. They're going for the vampires. A man with a clipboard holds up a seal and says one word, and Orlok, Dracula and Edward stop dead, pinned where they stand. His men take out stakes.", who:"The hard hats"},
    {rev:{who:"Players", t:"meet the man behind the checkout card and the survey: <b>W. Ostrander</b>, the developer."}},
    {do:"<b>Spencer's turn:</b> Ostrander's order to his men."},
    {say:"<b>What do you do?</b>", who:"After Ostrander's line"},
    {note:"<b>Angelique is on the party's side</b> through the final battle."},
    {tok:1},
    {fight:1},
    {do:"The party kills him. <b>Stop. Let the room be quiet for a moment.</b>"},
    {note:"Nothing funny until the room has been quiet.", k:"rule"},
    {say:"The seal goes. Three vampires get up, and it's over fast for the men nearest them. Anyone else in a hard hat lets go of his crowbar.", who:"Then the seal breaks"},
    {end:"when the seal breaks and the vampires are on their feet."}
  ],
  next:"Silence, then the seal breaks. Then the booth card.", go:["14 · ii"],
  talk:[
    {who:"DJ Poe Boy · on the mic, radio-ad voice", t:"Caller number one, Bix Grimlor, you're on the air!"},
    {who:"DJ Poe Boy · the rest, same voice", t:"Gnomey Soprano! Yobo! Russ! Simone! Stay tuned!"},
    {who:"Dracula · waiting for his cue, to the party", t:"Not you. Them."},
    {who:"W. Ostrander · to his men", t:"Stakes. Start with the old one."},
    {who:"W. Ostrander · when a PC reaches him", t:"This site's paid for. Step back."}
  ],
  fight:FIGHTS.developer,
  rev:[
    {by:"Dracula", who:"Players", t:"learn from &ldquo;Not you. Them.&rdquo; that the vampires are after the crowd, not them."}
  ],
  npcs:[
    {nm:"Orlok", pts:["Look at the card when Russ shows it to you, and refuse to sign it.<ul><li>It needs your signature as his elder. You already refused him at the cabinet.</li></ul>","Ask Russ for help once you're pinned.<ul><li>You wouldn't ask him for help at the cabinet. Keep it flat: &ldquo;Boy. Help me.&rdquo;</li></ul>","Keep calling for help if the party goes for Poe Boy instead."], vc:"Cold until he's pinned. Then just the one request, as flat as he can make it."},
    {nm:"DJ Poe Boy", pts:["Name all five of them on the mic, one at a time, in a borrowed voice.<ul><li>Bix Grimlor, Gnomey Soprano, Yobo, Russ and Simone.</li><li>You only speak in borrowed lines: a radio ad, a movie trailer, your mom.</li></ul>","Stay up on the decks for this whole fight.<ul><li>You're holding the crowd with an Enthralling Performance. Lil Stinky blocks anyone who comes up.</li></ul>","Enjoy the fight out loud on the mic.<ul><li>Scott cues you in round 2: &ldquo;Oh, this is great. Keep going.&rdquo;</li></ul>"], vc:"Borrowed lines only: a radio ad, a movie trailer, his mom. Holds the crowd with an Enthralling Performance. Delighted."},
    {nm:"Dracula", pts:["Tell the party they aren't who you're waiting for.<ul><li>You're waiting for your cue and saving yourself for the crowd: &ldquo;Not you. Them.&rdquo;</li></ul>","Hold still and say nothing once you're pinned.<ul><li>You're frozen mid-flourish, an arm's length from Yobo, until the seal breaks.</li></ul>"], vc:"Waiting for his cue, saving himself for the crowd."},
    {nm:"W. Ostrander", pts:["Walk in with the crowd and go straight past the party.<ul><li>You're W. Ostrander, the developer. You want this site cleared for the Galleria.</li></ul>","Order your men to stake the vampires, starting with Orlok.<ul><li>&ldquo;Stakes. Start with the old one.&rdquo;</li></ul>","Ignore the party until someone hits you or reaches you, then tell them to step back.<ul><li>To you this is a site you've paid for, with a pest problem.</li></ul>"], vc:"An adult with a clipboard. To him this is a site with a pest problem. Wants it cleared for the Galleria."},
    {nm:"Edward", pts:["Say one line when you see Ostrander's men, and don't explain it.<ul><li>&ldquo;Twenty-five years.&rdquo;</li><li>These are the company's men. The company's men killed Goblinenon.</li></ul>","Look at Bix, not at the stake, once you're pinned.<ul><li>Bix is your son, and he doesn't know it yet.</li></ul>"], vc:"Quiet. Says almost nothing."}
  ],
  cues:["set","crowd","pa","jump","braaam"] },

{ act:"finale", no:"14 · ii", title:"The booth", where:"The ballroom decks · step 2 of 2: get Poe Boy · badge req 3 if it hasn't landed",
  steps:[
    {snd:["set","crowd"]},
    {say:"The developer is down. The crowd is still swaying, still smiling, and up on the decks Poe Boy and Lil Stinky aren't letting anyone near the aux.", who:"Setting"},
    {say:"The man who wanted this house is dead on the floor. Orlok is looking at you, and for once he isn't cold about it. The crowd hasn't noticed. The set hasn't stopped. Poe Boy is still up there.", who:"The vampires owe you"},
    {do:"The party tells the vampires about Marcus and the drive. <b>Spencer's turn</b> if nobody raises it: Orlok asks, and Poe Boy panics and gives it away."},
    {do:"<b>Spencer's turn:</b> Orlok on the drive, then to Poe Boy. Poe Boy refuses. That's what turns them on him. &#9876;"},
    {tok:1},
    {say:"Get the USB to the decks and get on aux.", who:"The objective"},
    {fight:1},
    {note:"<b>Badge req 3</b>, if it hasn't landed: Russ heals a vampire under fire, any round."},
    {snd:["scratch"], t:"The USB hits the decks"},
    {snd:["hiss"], t:"Under the recording"},
    {say:"His set cuts out mid-scream. Then typing. A door shuts. Then a scared kid, asking someone to open it. Asking again, quieter. And under all of it, perfectly calm, Poe Boy: nudging a level up, leaning in close to listen, pleased with how clean it sounds.", who:"When the USB hits the decks · narrate the recording"},
    {note:"There's no file to play. It's your voice."},
    {say:"The speakers hiss. Nobody in the ballroom moves.", who:"Then let it sit"},
    {rev:{who:"The vampires", t:"learn from the recording that <b>a boy died in their house</b> and Poe Boy shut the door on him. He never went out a window. They had no idea."}},
    {rev:{who:"Players", t:"realise <b>&ldquo;he said five&rdquo;</b> was about <b>Poe Boy</b>: he's the boy who told the vampires exactly five were coming."}},
    {say:"The light goes out of Lil Stinky's sword. He turns around and looks at his best friend.", who:"Lil Stinky's oath breaks"},
    {note:"<b>No save.</b> Don't put this on a d20.", k:"rule"},
    {do:"<b>Spencer's turn:</b> Stinky to Poe Boy, then Angelique to the crowd."},
    {do:"<b>IF Simone paid the goat, Spencer's turn:</b> Marcus, through every speaker."},
    {snd:["boo","braaam"], t:"One boo, then the whole room"},
    {say:"The smiles go, all at once, across the whole room. Somebody boos. Then everybody does.", who:"The charm breaks"},
    {do:"<b>Spencer's turn:</b> Dracula seizes the mic. Poe Boy's Command stops landing."},
    {do:"Stinky and Angelique go for Poe Boy, and the party takes him down. <b>At 0 HP he's knocked out, not killed.</b>"},
    {say:"It runs on into the early morning. By the end, the ballroom windows have gone grey.", who:"On the last turn"},
    {end:"on the fight running into the early morning. Cut to the driveway at sunrise."}
  ],
  next:"It runs into the early morning, then the driveway at sunrise: cue 15.", go:["15"],
  talk:[
    {who:"Orlok · to the party, after the silence", t:"What's on the drive?"},
    {who:"Orlok · if nobody raises the drive", t:"You came down those stairs running. What did you find up there?"},
    {who:"DJ Poe Boy · panicking, borrowed voices", t:"Don't touch that dial!"},
    {who:"Orlok · to Poe Boy", t:"Let them play it."},
    {who:"DJ Poe Boy · refusing, on whoever holds the USB", t:"Drop."},
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
    {nm:"Orlok", pts:["Ask the party what's on the drive.<ul><li>You owe them: they killed the man who had you pinned.</li><li>If nobody has brought it up, ask what they found upstairs.</li></ul>","Tell Poe Boy to let them play it.","Turn on Poe Boy when he refuses.<ul><li>You don't fight him until then. In the fight you take hold of Lil Stinky.</li></ul>"], vc:"For once not cold. Pays his debt by asking one question. Doesn't fight Poe Boy until he refuses."},
    {nm:"DJ Poe Boy", pts:["Panic in borrowed voices when the drive comes up.<ul><li>Your panic is what gives it away. The drive holds the recording of you and Marcus Hale.</li></ul>","Refuse Orlok with one word, aimed at whoever holds the USB.<ul><li>&ldquo;Drop.&rdquo; Their hand opens and the drive hits the floor.</li></ul>","Command one person on each of your turns.<ul><li>If someone holds the USB: &ldquo;Drop.&rdquo; If nobody does, the player nearest the decks: &ldquo;Flee.&rdquo;</li></ul>","Try one borrowed voice after another once the recording has played.<ul><li>Your Command stops working, and nobody in the room is listening.</li></ul>"], vc:"Borrowed lines only. Not killed: <b>un-performed</b>. The glamour breaks. His parents call him Upton in the driveway."},
    {nm:"Lil Stinky", pts:["Hold the decks and keep everyone off the aux.<ul><li>You aren't charmed. You just believe your best friend.</li><li>Nobody can plug in while you're standing at the decks.</li></ul>","Turn on Poe Boy when you hear the recording.<ul><li>Your oath breaks with no roll: &ldquo;I believed you, man.&rdquo;</li></ul>","Swing at Poe Boy each round and block his way off the decks.<ul><li>If the party comes at you, take it and don't swing back.</li></ul>"], vc:"Stoner, bad rapper, honest to a fault. The only one not charmed: he just believes his friend. Diss track on Monday."},
    {nm:"Angelique", pts:["Tell the party where the aux is in round 1.<ul><li>It's round the back of the mixer, left side. You're on the poster and you know this stage.</li></ul>","Stand beside whoever holds the USB, wearing Poe Boy's face, and shake your head.<ul><li>It helps them resist his Command. Keep doing it until the recording plays.</li></ul>","Tell the crowd you typed those messages when the recording plays.<ul><li>You typed some of Poe Boy's AIM messages to Marcus, thinking it was a prank. Use your own face from here on.</li></ul>","Walk up to Poe Boy looking like yourself and go at him with your knife."], vc:"Stays on the party's side. Says it to the whole room and doesn't soften it."},
    {nm:"Dracula", pts:["Seize the mic once the room has turned on Poe Boy.<ul><li>You've waited all night for a real audience.</li></ul>","Greet the crowd before you say anything else.","Denounce Poe Boy, magnificently.<ul><li>He shut a boy behind a door, recorded it and wrote GOOD on the file.</li></ul>"], vc:"Campy, theatrical, and he has waited all night for a real audience."}
  ],
  cues:["set","crowd","scratch","hiss","boo","braaam"] },

{ act:"finale", no:15, title:"The driveway", where:"Dood Mansion · sunrise · one scene, everyone arrives",
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
    {end:"after Edward. Let it sit, then cut to class."}
  ],
  next:"After Edward, let it sit. Cut to class.", go:["16"],
  talk:[
    {who:"Poe Boy's mother · finding him", t:"Upton, honey?"},
    {who:"Poe Boy's mother", t:"We've been wondering where you've been."},
    {who:"Poe Boy's mother", t:"You're grounded, mister. And you are certainly not going to that satan concert."},
    {who:"Poe Boy's mother · to Simone, with the tickets", t:"Here, sweetie. Somebody should use these."},
    {who:"Russ's troop leader · getting out", t:"He kept saying he was late for a card game, so I drove him up."},
    {who:"Russ's troop leader · to Russ", t:"Got that card? Just need your elder's signature, right there."},
    {who:"Russ's troop leader · with the badge", t:"That's the paperwork in order. Congratulations, son."},
    {who:"Great Uncle Vinny", t:"Is it the fourteenth? I'm late. Cornelis owes me a rematch."},
    {who:"Great Uncle Vinny · handing Gnomey the deed", t:"Whoever's holding this owns the place. Now that's you."},
    {who:"Orlok · confirming, in front of everyone", t:"He holds the deed. The house is his."},
    {who:"Edward · to Bix", t:"Your mother was Goblinenon. Our cart threw a tire out on this road, so we knocked on this door."},
    {who:"Edward · to Bix", t:"The company sent men to clear this house. They killed her."},
    {who:"Edward · to Bix", t:"I was dying. They turned me to save me."},
    {who:"Edward · to Bix", t:"I carried you down the hill that night and left you there. On purpose. Anything was better than being raised by this."}
  ],
  rev:[
    {by:"Poe Boy's parents", who:"Everyone", t:"learns DJ Poe Boy is <b>Upton</b>: U.M. Livingsworth III from the checkout card. Let the table connect it."}
  ],
  npcs:[
    {nm:"Poe Boy's parents", pts:["Drive up in the Volvo, wondering where your kid has been.","Call out to him by his real name.<ul><li>&ldquo;Upton, honey?&rdquo; Only you two call him that.</li></ul>","Ground him and tell him he isn't going to the concert.<ul><li>You call it &ldquo;that satan concert.&rdquo;</li></ul>","Give the two concert tickets to Simone.<ul><li>His mother hands them over.</li></ul>"], vc:"A Volvo, matching fleece, sweet and oblivious."},
    {nm:"Russ's troop leader", pts:["Explain that you drove Vinny up.<ul><li>You know him from Troop 187's nursing-home visits. He kept insisting he's late for the card game.</li></ul>","Ask Russ for his requirements card and ask Orlok to sign it.<ul><li>It needs the elder's signature. Vampires don't bother you as long as the paperwork is in order.</li></ul>","Hand Russ his badge.<ul><li>He gets it no matter what, even if he missed a requirement.</li></ul>"], vc:"Over-earnest scout dad, no name needed: khaki shorts in November, a whistle, a clipboard. Runs Troop 187's nursing-home visits. <b>Completely unfazed by vampires</b> as long as the paperwork is in order."},
    {nm:"Great Uncle Vinny", pts:["Keep insisting you're late for the card game.<ul><li>You think it's 1931, and Cornelis owes you a rematch.</li></ul>","Hand Gnomey the deed as if it was always the plan.<ul><li>You won this house at cards in 1931. Gnomey is your great-nephew.</li></ul>","Tell Gnomey that whoever holds the deed owns the place.<ul><li>&ldquo;Whoever's holding this owns the place. Now that's you.&rdquo;</li></ul>"], vc:"Ancient and mostly gone. The same voice as Saturday's phone call."},
    {nm:"Orlok", pts:["Sign Russ's card, through your teeth.<ul><li>You've refused him twice already.</li></ul>","Confirm in front of everyone that the house is Gnomey's.<ul><li>You lost it to Vinny at cards in 1931, and it goes with the deed. You're furious, and you comply perfectly.</li></ul>"], vc:"Pissed, and complies perfectly."},
    {nm:"Edward", pts:["Tell Bix how you and Goblinenon came to this house.<ul><li>You were passing through on a rainy night when your cart threw a tire. You knocked at the nearest big house and found two vampires having a party.</li><li>You had such a good time that you stayed. About nine months later, Bix was born.</li></ul>","Tell Bix what happened to his mother.<ul><li>The real-estate company hired men to clear out the squatters and the vampires. They killed Goblinenon and left you badly hurt.</li></ul>","Tell Bix how you became a vampire.<ul><li>You were dying, and the vampires turned you to save your life. You woke up horrified at what you were.</li></ul>","Tell Bix why you left him.<ul><li>You carried him down into town that same night and left him there on purpose. Anything was better than being raised by a single father who was now a monster.</li></ul>"], vc:"To Bix, quietly. No jokes in it."}
  ],
  cues:["dawn","crowd","car","levelup"] },

{ act:"finale", no:16, title:"Back to class", where:"The bookend",
  steps:[
    {snd:["class"]},
    {say:"The same history classroom, the same clanking radiators. The five of you at the front, scraped and bruised, a black eye or two between you.", who:"Setting"},
    {do:"They present the project. <b>They don't have to show the tape or an artifact:</b> there were plenty of witnesses."},
    {note:"The real-estate company is <b>scared off the land</b>. <b>Play them battered.</b>"},
    {do:"Let a player deliver it: <i>&ldquo;&hellip;and yeah that was our class project.&rdquo;</i> Nobody in class reacts."},
    {do:"<b>The closers</b>: Stinky's diss track, the mall breaking ground in Amityville, and, if Simone paid the goat, Marcus helping people find books on the library computers."},
    {note:"Gnomey leads the gang and fronts for the vampires as the one who can stand in daylight. He takes no rent and asks nothing, same as Vinny."},
    {end:"on the room not reacting. This is the end. Breathe."}
  ],
  next:"The end. Breathe.",
  npcs:[],
  cues:["class"] }

);
