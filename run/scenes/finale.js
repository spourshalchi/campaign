/* The finale: cues 14 to 16.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"finale", no:"14 · i", title:"The developer", where:"The ballroom · 3AM · step 1 of 2: save the vampires · the only lethal fight",
  steps:[
    {snd:["set","crowd"]},
    {say:"3AM, and the house is suddenly full of people. The ballroom is rigged as a stage: decks on the dais, cables run off into the walls, lights swinging over a crowd still pouring in, every face turned up and smiling. And on the decks, Poe Boy, playing your screams to all of them.", who:"Setting"},
    {note:"Poe Boy opens the front door at 2:30 for the crowd, and the ballroom with it. The crowd stays because it's charmed."},
    {do:"Russ shows Orlok the card. He still won't sign. <b>Refusal 2 of 3.</b>"},
    {snd:["pa"], t:"Poe Boy takes the mic"},
    {do:"The party arrives wanting Poe Boy. He <b>names all five</b> on the mic."},
    {do:"Dracula, waiting for his cue: <b>&ldquo;Not you. Them.&rdquo;</b>"},
    {do:"As the crowd pours in: <b>Perception DC 14</b>."},
    {check:{skill:"Perception", dc:"14", note:"<b>Call it</b> as the crowd pours in. <b>Success:</b> among the charmed crowd, one man with a clipboard isn't charmed: a warning before he acts. His name is already on the library card and the survey (<i>coordinate through W.O.</i>), so a player can place him. <b>Miss:</b> it plays on schedule."}},
    {note:"<b>Angelique is on the party's side</b> through the final battle."},
    {snd:["jump","braaam"], t:"The hard hats"},
    {say:"Hard hats push through the crowd. They walk right past you. They're going for the vampires. A man with a clipboard says one word, and Orlok, Dracula and Edward stop dead, pinned where they stand. His men take out stakes.", who:"The hard hats"},
    {rev:{who:"Players", t:"meet the man behind the checkout card and the survey: <b>W. Ostrander</b>, the developer."}},
    {do:"<b>The hard hats go for the vampires</b>. Spencer gives Ostrander's line. <b>You ask: &ldquo;What do you do?&rdquo;</b> &#9876;"},
    {say:"<b>What do you do?</b>", who:"After Ostrander's line"},
    {tok:1},
    {fight:1},
    {do:"The party kills him. <b>Silence.</b> Then the seal breaks."},
    {say:"Stop. Let the room be quiet for a moment.", who:"He goes down"},
    {note:"Give the death its <b>silence</b>. The comedy doesn't start until this lands.", k:"rule"},
    {note:"<b>He's the death the room stops for.</b> They stepped in to save the vampires and he attacked them, but these are teenagers. Nothing funny until the room has been quiet."},
    {say:"The seal goes. Three vampires get up, and it's over fast for the men nearest them. Anyone else in a hard hat lets go of his crowbar.", who:"Then the seal breaks"},
    {end:"when the seal breaks and the vampires are on their feet."}
  ],
  next:"Silence, then the seal breaks. Then the booth card.", go:["14 · ii"],
  talk:[
    {who:"Orlok · Russ shows him the card", t:"Looks at it. Doesn't sign it."},
    {who:"DJ Poe Boy · on the mic", t:"He names all five of them, in borrowed voices."},
    {who:"Dracula · waiting for his cue, to the party", t:"Not you. Them."},
    {who:"W. Ostrander · to his men", t:"Stakes. Start with the old one."}
  ],
  fight:FIGHTS.developer,
  rev:[
    {by:"DJ Poe Boy", who:"Players", t:"hear him name all five of them in front of everyone."},
    {by:"Dracula", who:"Players", t:"learn from &ldquo;Not you. Them.&rdquo; that the vampires are after the crowd, not them."}
  ],
  npcs:[
    {nm:"DJ Poe Boy", vc:"On the decks, on the mic, in borrowed lines. Holds the crowd with an Enthralling Performance. Delighted. Not in this fight."},
    {nm:"Orlok", vc:"Russ shows him the card at the start: he still won't sign. Pinned, he asks for help, which he wouldn't do at the cabinet. Keeps calling if they go for Poe Boy."},
    {nm:"Dracula", vc:"Waiting for his cue, saving himself for the crowd. Then pinned mid-flourish near Yobo."},
    {nm:"Edward", vc:"Sees Ostrander's men and says one line. Doesn't explain it. Pinned, he looks at Bix, not at the stake."},
    {nm:"W. Ostrander", vc:"An adult with a clipboard. Walks in with the crowd. Ignores the party until they interfere: to him this is a site with a pest problem. Wants the site cleared for the Galleria."}
  ],
  cues:["set","crowd","pa","jump","braaam"] },

{ act:"finale", no:"14 · ii", title:"The booth", where:"The ballroom decks · step 2 of 2: get Poe Boy · badge req 3 if it hasn't landed",
  steps:[
    {snd:["set","crowd"]},
    {say:"The developer is down. The crowd is still swaying, still smiling, and up on the decks Poe Boy and Lil Stinky aren't letting anyone near the aux.", who:"Setting"},
    {say:"The man who wanted this house is dead on the floor. Orlok is looking at you, and for once he isn't cold about it. The crowd hasn't noticed. The set hasn't stopped. Poe Boy is still up there.", who:"The vampires owe you"},
    {do:"<b>The vampires owe the party</b>. The party tells them about Marcus and the drive. <b>Nobody raises it:</b> Orlok asks, and Poe Boy panicking gives it away."},
    {do:"Orlok: <b>&ldquo;What's on the drive?&rdquo;</b> Then to Poe Boy: <b>&ldquo;Let them play it.&rdquo;</b> Poe Boy refuses: <b>&ldquo;Drop.&rdquo;</b> That's what turns them on him. &#9876;"},
    {tok:1},
    {say:"Get the USB to the decks and get on aux.", who:"The objective"},
    {fight:1},
    {note:"<b>Badge req 3</b>, if it hasn't landed: Russ heals a vampire under fire, any round."},
    {snd:["scratch"], t:"The USB hits the decks"},
    {snd:["hiss"], t:"Under the recording"},
    {do:"The USB hits the decks: <b>narrate the recording</b>. Stinky's oath breaks, no save, and he turns on Poe Boy."},
    {say:"His set cuts out mid-scream. Then typing. A door shuts. Then a scared kid, asking someone to open it. Asking again, quieter. And under all of it, perfectly calm, Poe Boy: nudging a level up, leaning in close to listen, pleased with how clean it sounds.", who:"When the USB hits the decks · narrate the recording"},
    {note:"<b>Narrate the recording</b> &mdash; the single biggest table moment. There's no file to play; it's your voice."},
    {say:"The speakers hiss. Nobody in the ballroom moves.", who:"Then let it sit"},
    {note:"Stinky's oath breaks with <b>no save</b> &mdash; don't put the best beat on a d20.", k:"rule"},
    {rev:{who:"The vampires", t:"learn from the recording Scott narrates that <b>a boy died in their house</b> and Poe Boy let it happen. He never went out a window. They had no idea."}},
    {rev:{who:"Players", t:"realise <b>&ldquo;he said five&rdquo;</b> was about <b>Poe Boy</b> &mdash; he's the boy who told the vampires exactly five were coming."}},
    {do:"<b>IF Simone paid the goat</b> &rarr; Spencer voices Marcus (his zone)."},
    {snd:["boo","braaam"], t:"One boo, then the whole room"},
    {do:"The charm breaks and the crowd turns: silence, one boo, then the whole room. <b>Dracula seizes the mic.</b> Poe Boy's Command stops landing."},
    {say:"The smiles go, all at once, across the whole room. Somebody boos. Then everybody does.", who:"The charm breaks"},
    {rev:{who:"The 3AM crowd", t:"learn the truth from the same recording: Poe Boy's calm voice under a scared kid. The charm breaks. Silence, one boo, then the whole room."}},
    {say:"It runs on into the early morning. By the end, the ballroom windows have gone grey.", who:"On the last turn"},
    {end:"on the fight running into the early morning. Cut to the driveway at sunrise."}
  ],
  next:"It runs into the early morning, then the driveway at sunrise: cue 15.", go:["15"],
  talk:[
    {who:"Orlok · to the party, after the silence", t:"What's on the drive?"},
    {who:"Orlok · to Poe Boy", t:"Let them play it."},
    {who:"DJ Poe Boy · refusing, on whoever holds the USB", t:"Drop."},
    {who:"Orlok · if nobody raises the drive", t:"You came down those stairs running. What did you find up there?"},
    {who:"DJ Poe Boy · panicking, borrowed voices", t:"Don't touch that dial!"},
    {who:"Angelique · to the crowd, when the recording plays", t:"I typed those messages."}
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
  rev:[
    {by:"Orlok", who:"The vampires", t:"turn on Poe Boy when he refuses to let the drive play. Until then they don't fight him."},
    {by:"spencer", who:"Poe Boy and the vampires", t:"hear it from Marcus himself &mdash; <b>only if Simone paid the goat</b>."},
    {by:"Lil Stinky", who:"Lil Stinky", t:"hears his best friend stay calm while a kid dies. <b>His oath breaks, no save.</b> He turns on Poe Boy."},
    {by:"Dracula", who:"The crowd", t:"hear Dracula seize the mic and denounce Poe Boy, magnificently."}
  ],
  npcs:[
    {nm:"Orlok", vc:"Owes the party, and pays by asking one question. Doesn't fight Poe Boy until he refuses."},
    {nm:"DJ Poe Boy", vc:"Not killed &mdash; <b>un-performed</b>. The glamour breaks. His parents call him Upton in the driveway."},
    {nm:"Lil Stinky", vc:"Stoner, bad rapper, honest to a fault. The only one not charmed &mdash; he just believes his friend. Oath breaks, and he turns on Poe Boy. Diss track on Monday."},
    {nm:"Dracula", vc:"Seizes the mic and denounces Poe Boy magnificently. Waited all night for a real audience."}
  ],
  cues:["set","crowd","scratch","hiss","boo","braaam"] },

{ act:"finale", no:15, title:"The driveway", where:"Dood Mansion · sunrise · one scene, everyone arrives",
  steps:[
    {snd:["dawn","crowd"]},
    {say:"Sunrise on the lawn. The crowd is still milling about in last night's costumes, the vampires keep to the shade of the porch, and in daylight the house looks almost like a house again.", who:"Setting"},
    {note:"<b>Resolve it all right here, in one scene at the house.</b> Two cars, back to back, while the crowd is still on the lawn: the parents' Volvo, then the troop leader's car with <b>Vinny in the passenger seat</b>."},
    {snd:["car"], t:"The first car"},
    {say:"Sunrise. The crowd's still on the lawn when the first car pulls up the drive."},
    {hand:"tickets", do:"The Volvo: Poe Boy's parents. <i>&ldquo;Upton, honey?&rdquo;</i> He's grounded; &#9995; <b>the tickets</b> to Simone."},
    {note:"The parents have been wondering where their kid has been. Vinny has kept insisting he's late for the card game, so the scout dad drove him up."},
    {snd:["car"], t:"The second car"},
    {hand:"badge", do:"The troop leader's car, Vinny in the passenger seat. Orlok signs, through his teeth; &#9995; <b>the badge</b> to Cody."},
    {note:"<b>Russ gets the badge no matter what</b>, even if he missed a requirement."},
    {snd:["levelup"], t:"The badge"},
    {hand:"deed", do:"Vinny &#9995; <b>the deed</b> to Gnomey. &ldquo;This is my house.&rdquo; Orlok confirms it; &ldquo;You can stay.&rdquo;"},
    {do:"The quiet one: <b>Edward explains himself to Bix.</b> No jokes."},
    {end:"after Edward. Let it sit, then cut to class."}
  ],
  next:"After Edward, let it sit. Cut to class.", go:["16"],
  talk:[
    {who:"Poe Boy's mother", t:"Upton, honey?"},
    {who:"Gnomey, once he has the deed", t:"This is my house. &middot; You can stay."}
  ],
  rev:[
    {by:"Poe Boy's parents", who:"Everyone", t:"learns DJ Poe Boy is <b>Upton</b> &mdash; U.M. Livingsworth III from the checkout card. Let the table connect it."},
    {by:"Poe Boy's parents", who:"Simone", t:"gets the two concert tickets from his mother's hand."},
    {by:"Russ's troop leader", who:"Russ", t:"gets the badge once Orlok signs the card. Hand Cody the printed badge."},
    {by:"Great Uncle Vinny", who:"Gnomey and everyone", t:"see Vinny hand Gnomey <b>the deed</b>. The house is Gnomey's from this moment."},
    {by:"Orlok", who:"The vampires", t:"hear Orlok confirm Gnomey's claim in front of everyone, then Gnomey say they can stay."},
    {by:"Edward", who:"Bix", t:"learns the whole timeline: the men the company sent to clear the house, Goblinenon killed, Edward badly hurt and turned by the vampires to save him, and why he carried the baby &mdash; Bix &mdash; down the hill and left him there on purpose. No jokes."}
  ],
  npcs:[
    {nm:"Poe Boy's parents", vc:"A Volvo, matching fleece, sweet and oblivious. Wondering where he's been. She calls him Upton."},
    {nm:"Russ's troop leader", vc:"Over-earnest scout dad: khaki shorts in November, a whistle, a clipboard. Runs Troop 187's nursing-home visits and drove Vinny up, because Vinny kept insisting he's late for the card game. <b>Completely unfazed by vampires</b> as long as the paperwork is in order."},
    {nm:"Great Uncle Vinny", vc:"Ancient and mostly gone. The same voice as Saturday's phone call. Still insisting he's late for the card game. Hands over the deed like it was always the plan."},
    {nm:"Orlok", vc:"Signs Russ's card and confirms Gnomey's claim, both through his teeth. Pissed, and complies perfectly."},
    {nm:"Edward", vc:"The whole timeline to Bix. No jokes in it."}
  ],
  cues:["dawn","crowd","car","levelup"] },

{ act:"finale", no:16, title:"Back to class", where:"The bookend",
  steps:[
    {snd:["class"]},
    {say:"The same history classroom, the same clanking radiators. The five of you at the front, scraped and bruised, a black eye or two between you.", who:"Setting"},
    {do:"They present the project. <b>Nothing to show:</b> there were plenty of witnesses."},
    {note:"The real-estate company is <b>scared off the land</b>, and they present in class &mdash; closing scene one's loop. <b>Play them battered.</b> Nobody in class reacts."},
    {do:"Let a player deliver it: <i>&ldquo;&hellip;and yeah that was our class project.&rdquo;</i> Nobody reacts."},
    {do:"<b>The closers</b>: Stinky's diss track, the mall breaking ground in Amityville, and, if Simone paid the goat, Marcus helping people find books on the library computers."},
    {note:"Gnomey leads the gang and fronts for the vampires as the one who can stand in daylight. He takes no rent and asks nothing &mdash; same as Vinny."},
    {end:"on the room not reacting. This is the end. Breathe."}
  ],
  next:"The end. Breathe.",
  npcs:[],
  cues:["class"] }

);
