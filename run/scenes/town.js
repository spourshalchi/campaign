/* Saturday in town: Scene 0 and cues 1 to 4.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"town", no:0, title:"Opening the game", where:"At the table · read from this card",
  steps:[
    {slot:["Phones away, snacks out, sheets and dice in front of everyone.","Two days: today and tomorrow. Level 4 now, level 5 at the end of today.","I narrate and run the rolls. Spencer voices everyone they meet."], t:"Your intro, in your own words. Cover:"},
    {hand:"backstory"},
    {say:"Anything in the Private section stays private. Everything else, share however you like.", who:"Say as you hand them out"},
    {hand:"reqcard"},
    {say:"Who's your character? Their name, one thing you'd notice about them from across the room, and one thing everyone at school knows about them.", who:"Say to each player in turn"},
    {tick:"<b>Bix Grimlor</b> &middot; Will"},
    {tick:"<b>Gnomey Soprano</b> &middot; Julia"},
    {tick:"<b>Simone's warlock</b> &middot; Simone<span class=\"how\">no in-world name needed</span>"},
    {tick:"<b>Yobo</b> &middot; John"},
    {tick:"<b>Russ</b> &middot; Cody"},
    {say:"This is Transyltown, New York, a charming little suburb in the Hudson Valley. There's a hall of records, a scout troop, and a fantasy high school, where the five of you are super seniors: in your twenties, and this is supposed to be your last year. It's Halloween, 2004. On the hill at the edge of town there's an abandoned Dutch mansion. Its front door has been boarded up for decades, and the local kids throw rocks at the windows on dares. A kid from your school went missing about a month ago. Everyone says he ran away. The posters are still up. You all have History together. You know each other by sight and reputation, even if you've never really talked.", who:"The opening · read aloud"}
  ],
  next:"Read Scene 1's Setting aloud. It opens on &ldquo;Fourth period, history.&rdquo;", go:["1"],
  npcs:[],
  cues:[] },

{ act:"town", no:1, title:"History class", where:"Fantasy high school · the bookend opens",
  steps:[
    {snd:["class"]},
    {say:"Fourth period, history. The radiators clank, the room smells of dry-erase marker, and most of the desks are empty &mdash; the rest of the senior class is out on skip day. Nobody told the five of you.", who:"Setting"},
    {do:"<b>Spencer's turn:</b> the teacher."},
    {note:"This is the loop you close in the finale: they present the project back to this class."},
    {snd:["schoolbell"], t:"The bell"},
    {say:"That's the bell. You've got about four minutes to hit your locker and get to next period.", who:"Bell"},
    {end:"on the bell: four minutes to their lockers. Cut straight to cue 2."}
  ],
  next:"On the bell, smash cut to the lockers.", go:["2"],
  talk:[
    {who:"History Teacher · to the five of them", t:"So you five are who I've got today. Congratulations, you're a group."},
    {who:"History Teacher · the project", t:"Local history and folklore. Something from this town. You'll present it to the class."},
    {who:"History Teacher · on the way out", t:"And I want a primary source, not the internet."},
    {who:"History Teacher · if they ask where everyone is", t:"Senior skip day. Apparently nobody told you."}
  ],
  npcs:[
    {nm:"History Teacher", pts:["Put the five of them into a group.", "Explain what the project is.<ul><li>The subject: local history and folklore, from this town.</li><li>Why this group: they're the only seniors in class, because everyone else is out on skip day.</li><li>What's due: they present it out loud, back to this class.</li><li>The rule: it needs a primary source, not the internet.</li></ul>"], vc:"Assigns the project. <b>Not</b> the teacher who believes in Gnomey &mdash; those are two different people."}
  ],
  cues:["class","schoolbell"] },

{ act:"town", no:2, title:"Letters in the lockers", where:"Smash cut",
  steps:[
    {snd:["hall"]},
    {say:"The hallway between periods: slamming metal, sneakers squeaking on linoleum, somebody's Discman leaking through the headphones. Wedged in the vent of each of your lockers is the same small card.", who:"Setting"},
    {hand:"invites", do:"&#9995; <b>Each of them finds the card</b> (invites). It reads <i>&ldquo;Haunted House &middot; Dood Mansion &middot; 8 PM.&rdquo;</i> No name on it. There's a party, and they're invited."},
    {do:"They compare notes: <b>nobody else in school got one.</b>"},
    {note:"<b>Optional, in passing:</b> by the gym, one of the missing posters: a kid their age, last seen in September. The kid who ran away. Describe it, don't read out a name, and don't dwell on it."},
    {tick:"Spencer ready for Vinny's call on Gnomey's flip phone."},
    {snd:["phone"], t:"Vinny's call"},
    {say:"Gnomey, as you read that name, your flip phone rings. It's your Great Uncle Vinny, the family's old bootlegger. He's ancient now, in a home, and mostly gone.", who:"Narrate"},
    {do:"<b>Spencer's turn:</b> Vinny's call. Then let it sit there unexplained."},
    {do:"They pick where to dig: the <b>hall of records</b> (cue 3) or the <b>gazebo</b> (cue 4), in either order. If they don't bite, hand a detour to a PC."},
    {note:"<b>If they don't bite, hand a detour to a PC:</b> tell <b>Bix</b> the Records Keeper knows old names; tell <b>Gnomey</b> the old crew at the gazebo will already know."},
    {note:"If they march up the hill early: the front is <b>still boarded at this hour</b> and turns them back. The boards come off during the day."},
    {say:"It's barely noon. The card says <b>eight</b>. And not one of you has ever heard the name <b>Dood</b> before."},
    {end:"on the read-aloud: barely noon, the card says eight, and nobody's heard of Dood."}
  ],
  next:"They pick the hall of records or the gazebo, either order. Whichever comes second ends on cue 4's &ldquo;ten to eight&rdquo; line.", go:["3","4"],
  talk:[
    {who:"Great Uncle Vinny · on Gnomey's flip phone", t:"Is it the fourteenth? I got a card game up the hill tonight. Cornelis owes me a rematch."},
    {who:"If Gnomey says who it is", t:"That you, kid? Twelve years old and you've got a crew."},
    {who:"If they say it's 2004", t:"Don't tell me what year it is. I'm late."},
    {who:"If they ask who Cornelis is", t:"Cornelis owes me a rematch, that's who."},
    {who:"If they ask about Dood, or to hang up", t:"Can't talk, kid. I'm late for the card game."}
  ],
  rev:[
    {by:"Great Uncle Vinny (phone)", who:"Gnomey", t:"hears his great-uncle talk about a card game &ldquo;up the hill&rdquo; and a &ldquo;Cornelis&rdquo; &mdash; no idea yet that it's the house, or 1931."}
  ],
  npcs:[
    {nm:"Great Uncle Vinny (phone)", pts:["Sound confused, and talk as if it's 1931.", "Ask Gnomey if it's the fourteenth.", "Tell him there's a card game up the hill tonight and that Cornelis owes you a rematch.", "Insist you're late, and don't explain anything they ask, including who Cornelis is."], vc:"Ancient and mostly gone, and sure it's 1931. Doesn't explain who Cornelis is. Keeps back, without meaning to: he won the house at cards in 1931 and has the deed."}
  ],
  cues:["hall","phone"] },

{ act:"town", no:3, title:"The library &amp; hall of records", where:"Town · the clincher · Saturday's town fight",
  steps:[
    {snd:["records"]},
    {say:"The hall of records is cold and very quiet: long tables, green-shaded lamps, the smell of old paper and floor polish. The Records Keeper looks up from her desk as you come in.", who:"Setting"},
    {do:"They ask about Dood. <b>Spencer's turn:</b> the Records Keeper."},
    {do:"She sets the bound volume on the table, intact. They open it."},
    {snd:["riser","paper","jump"], t:"The trap"},
    {do:"<b>Opening it springs the trap</b>: the reading room's stationery comes alive and goes for the article. &#9876; Fight &mdash; <b>count the cuts</b>."},
    {rev:{who:"Ostrander (off-stage)", t:"learns someone has opened his records &mdash; the trap tells him. He drives out tonight. The party never learns this."}},
    {note:"Saturday's fight is here in town, not at the mansion."},
    {tok:1},
    {fight:1},
    {ipad:1, do:"&#128241; <b>Item 1</b> after the fight: set the pieces from the cut count and hand over the torn page."},
    {stuck:"If the jigsaw stalls past ten minutes: <b>Spencer's turn</b>, the Records Keeper tells them the page-2 lore. The folklore is what matters, not the finished picture."},
    {tick:"After the jigsaw: players' iPad back to its home page."},
    {do:"They read it: the town's talk about the Dood house (a polite voice at the door, no answer by day, music, a splinted dog), and on page 2 a reader's old-country tale with the slaying method (dig up the coffin, stake the heart, rebury). Piecing the method together: Investigation or History DC 12. In the back pocket, the checkout card."},
    {check:{skill:"Investigation / History", dc:"12", note:"Assemble the slaying method from the folklore: coffins, stake, rebury."}},
    {rev:{who:"Players", t:"see the checkout card: <b>U.M. Livingsworth III</b>, <b>V. Soprano 1938</b>, <b>W. Ostrander</b>. Nobody knows Livingsworth is Poe Boy until the driveway."}},
    {rev:{who:"Gnomey", t:"may clock his own family name, <b>Soprano</b>, on the card. Don't push it."}},
    {do:"<b>Spencer's turn:</b> the Records Keeper's nudge."},
    {check:{skill:"Insight", dc:"13", note:"Tell that her &ldquo;be careful&rdquo; is sincere."}},
    {end:"when the lore's in the bag and her &ldquo;be careful&rdquo; has landed. Next: the gazebo, or the hill if they've been already."}
  ],
  next:"Her &ldquo;be careful&rdquo; lands. Gazebo next, or up the hill if they've been. If this is the second stop, end on the &ldquo;ten to eight&rdquo; line from cue 4.", go:["4","5"],
  talk:[
    {who:"Records Keeper · asked about Dood", t:"That's an old name. Try the Crier, 1937. I'll get you the bound volume."},
    {who:"Records Keeper · only if the jigsaw stalls", t:"I remember that page. A reader wrote in with a tale from the old country. You dig up the coffin, stake the heart, and bury it again."},
    {who:"Records Keeper · after the fight", t:"You can try to put it back together. But that was your primary source, and it's gone. If you want one now, you'll have to go look at the house yourselves. &hellip;But be careful."}
  ],
  fight:FIGHTS.library,
  rev:[
    {by:"Records Keeper", who:"Players", t:"hear the primary source is gone &mdash; if they want one now, it's the house itself. She sends them up the hill with a &ldquo;be careful.&rdquo;"}
  ],
  npcs:[
    {nm:"Records Keeper", pts:["Answer their question about Dood by fetching the bound 1937 volume of the Crier and handing it over intact.", "Tell them the lore from page 2, only if Scott says the jigsaw has stalled.<ul><li>It's a reader's tale from the old country.</li><li>The method: dig up the coffin, stake the heart, bury it again.</li></ul>", "Tell them, after the fight, that the volume was their primary source and it's gone.", "Tell them that if they still want a primary source, they'll have to go look at the house themselves.", "Warn them to be careful, and mean it."], vc:"Helpful, not a harbinger. Hands over the volume intact; after the trap, points them at the house as the only primary source left, and means the &ldquo;be careful.&rdquo; Beyond that, unwritten &mdash; play to taste."}
  ],
  cues:["records","riser","paper","jump"] },

{ act:"town", no:4, title:"The gazebo", where:"Town · the bad kids",
  steps:[
    {snd:["gazebo"]},
    {say:"The gazebo by the school, where the bad kids smoke. A haze of cigarette smoke, a boombox on the rail, and DJ Poe Boy holding court with his crew &mdash; Angelique among them, not quite looking at you.", who:"Setting"},
    {do:"<b>Spencer's turn:</b> Poe Boy, the crew and Angelique."},
    {do:"They ask about the house or the cards. <b>Spencer's turn:</b> Poe Boy. Then call Insight DC 14. The DJ poster on the AIM door and his voice on the speakers pay it off."},
    {check:{skill:"Insight", dc:"14", note:"Sense the &ldquo;once&rdquo; is a lie, or that Angelique is holding something back."}},
    {hand:"weight", do:"<b>Yobo's arc opens. Spencer's turn:</b> the crew. &#9995; When they ask for the riff, hand John the secret <b>The Weight of Your Lies</b> card (printed): disadvantage on Performance, advantage on Deception. Then his first Performance check: <b>DC 12</b>, rolled in secret, at disadvantage."},
    {check:{skill:"Performance", dc:"12", note:"<b>Yobo only, in secret, at disadvantage.</b> Juggling the lie is the debuff: hand him <i>The Weight of Your Lies</i> first. Made it: the crew buys it. Missed: it wobbles and they needle him."}},
    {note:"<b>The debuff card doesn't say how to lose it. Don't hint.</b> John learns honesty matters only from Dracula, in the party room."},
    {note:"By now the <b>boards are off the front door</b>, stacked neat against the porch rail &mdash; the only change to the house in decades. That's the invitation."},
    {say:"Whoever's wearing a watch &mdash; it's <b>ten to eight</b>. That's the time on the card."},
    {end:"on the clock: ten to eight, the time on the card."}
  ],
  next:"Ten to eight (read-aloud), and they walk up the hill. Library still to do? Go there first and save the clock line for its end.", go:["5","3"],
  talk:[
    {who:"DJ Poe Boy · asked about the house, with a shrug", t:"Been up there once."},
    {who:"DJ Poe Boy · pushed on it", t:"Nothing to see. Just some old house."},
    {who:"DJ Poe Boy · shown the card", t:"Cool card."},
    {who:"DJ Poe Boy · if they ask whose party it is", t:"Who knows."},
    {who:"DJ Poe Boy · to Gnomey", t:"Still mad about the silly bandz?"},
    {who:"Angelique · when the crew looks away", t:"You shouldn't&hellip; never mind. Forget it."},
    {who:"The crew · to Yobo", t:"You're the Dolly Parton guy &mdash; do a little riff."},
    {who:"The crew · if he makes the roll", t:"Okay. That's Dolly's grandkid, all right."},
    {who:"The crew · if he misses", t:"That's it? That's Dolly Parton's grandkid?"}
  ],
  rev:[
    {by:"DJ Poe Boy", who:"Players", t:"can sense (Insight DC 14) the shrug is too easy &mdash; he's been up there more than once. Not why, and not whose party it is."},
    {by:"Angelique", who:"Players", t:"can learn she's holding something back &mdash; a side-eye, a swallowed half-sentence. Nothing more."}
  ],
  npcs:[
    {nm:"DJ Poe Boy", pts:["Say you've been up there once, with a shrug, when they ask about the house.", "Play the house down as nothing to see.", "Stay cool about the cards.<ul><li>Don't say you sent them.</li><li>Don't say it's your party.</li></ul>", "Needle Gnomey about the silly bandz if he's in front of you.<ul><li>He ran with your crew in middle school.</li><li>He walked out when he caught you skimming his cut.</li></ul>"], vc:"Kenku &mdash; <b>voice him only in borrowed / sampled lines.</b> Glamour-charming, subversive, real cred. Here he plays everything down: been up there once, a shrug, nothing to see. Cool about the cards &mdash; never says he sent them, never says it's his party. Wants real screams for his horror score. Keeps back: he shut the door on Marcus, and his name is Upton."},
    {nm:"Angelique", pts:["Try to warn them, then stop yourself because the crew is standing right there.<ul><li>All that gets out is a side-eye and a swallowed half-sentence.</li></ul>", "Say nothing more than that."], vc:"Changeling, trad goth. Wants them warned, can't say it out loud. A side-eye and a held breath, not exposition."},
    {nm:"The crew", pts:["Recognize Yobo as the Dolly Parton guy.<ul><li>Everyone at school believes his grandmother is Dolly Parton.</li></ul>", "Ask him to do a little riff.", "React to his Performance roll when Scott tells you the result.<ul><li>If he made it, buy it.</li><li>If he missed, needle him.</li></ul>"], vc:"Poe Boy's bad kids, smoking at the gazebo."}
  ],
  cues:["gazebo"] }

);
