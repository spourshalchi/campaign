/* Saturday in town: Scene 0 and cues 1 to 4.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"town", no:0, title:"Opening the game", where:"At the table",
  steps:[
    {slot:["Phones away, snacks out, sheets and dice in front of everyone.","Two days: today and tomorrow. Level 4 now, level 5 at the end of today.","I narrate and run the rolls. Spencer voices everyone they meet."], t:"Your intro, in your own words. Cover:"},
    {hand:"backstory"},
    {say:"Anything in the Private section stays private. Everything else, share however you like.", who:"Say as you hand them out"},
    {hand:"reqcard"},
    {say:"Who's your character? Their name, one thing you'd notice about them from across the room, and one thing everyone at school knows about them.", who:"Say to each player in turn"},
    {tick:"<b>Bix Grimlor</b> &middot; Will"},
    {tick:"<b>Gnomey Soprano</b> &middot; Julia"},
    {tick:"<b>Dark Wind</b> &middot; Simone"},
    {tick:"<b>Yobo</b> &middot; John"},
    {tick:"<b>Kelvin</b> &middot; Cody"},
    {say:"This is Transyltown, New York, a charming little suburb in the Hudson Valley. There's a hall of records, a scout troop, and a fantasy high school, where the five of you are super seniors: in your twenties, and this is supposed to be your last year. It's Halloween, 2004. On the hill at the edge of town there's an abandoned Dutch mansion. Its front door has been boarded up for decades, and the local kids throw rocks at the windows on dares. A kid from your school went missing about a month ago. Everyone says he ran away. The posters are still up. You all have History together. You know each other by sight and reputation, even if you've never really talked.", who:"The opening · read aloud", go:"1"}
  ],
  npcs:[],
  cues:[] },

{ act:"town", no:1, title:"History class", where:"Fantasy high school",
  steps:[
    {snd:["class"]},
    {say:"Fourth period, history. The radiators clank, the room smells of dry-erase marker, and most of the desks are empty. The rest of the senior class is out on skip day. Nobody told the five of you.", who:"Setting"},
    {do:"<b>Spencer's turn:</b> the teacher."},
    {snd:["schoolbell"], t:"The bell"},
    {say:"That's the bell. You've got about four minutes to hit your locker and get to next period.", who:"Bell", go:"2"}
  ],
  flow:[
    {who:"History Teacher", t:"Put the five of them into a group.", say:"So you five are who I've got today. Congratulations, you're a group."},
    {who:"History Teacher", t:"Explain what the project is.<ul><li>The subject: local history and folklore, from this town.</li><li>Why this group: they're the only seniors in class, because everyone else is out on skip day.</li><li>What's due: they present it out loud, back to this class.</li><li>The rule: it needs a primary source, not the internet.</li></ul>", say:["Local history and folklore. Something from this town. You'll present it to the class.","And I want a primary source, not the internet."]},
    {who:"History Teacher", if:"If they ask where everyone is", t:"Tell them it's senior skip day.", say:"Senior skip day. Apparently nobody told you."}
  ],
  npcs:[
    {nm:"History Teacher", vc:"Assigns the project."}
  ],
  cues:["class","schoolbell"] },

{ act:"town", no:2, title:"Letters in the lockers", where:"School hallway",
  steps:[
    {snd:["hall"]},
    {say:"The hallway between periods: slamming metal, sneakers squeaking on linoleum, somebody's Discman leaking through the headphones. Wedged in the vent of each of your lockers is the same small card.", who:"Setting"},
    {hand:"invites", do:"It reads <i>&ldquo;Haunted House &middot; Dood Mansion &middot; 8 PM.&rdquo;</i> No name on it. There's a party, and they're invited."},
    {say:"Look up and down the hall: nobody else has one. Ask around if you like, and the answer's the same."},
    {say:"By the gym, one of the missing posters is still up. A kid your age, last seen in September.", who:"Optional, in passing"},
    {snd:["phone"], t:"Vinny's call"},
    {say:"Gnomey, your flip phone rings. It's your Great Uncle Vinny, the family's old bootlegger. He's ancient now, in a home, and mostly gone.", who:"Narrate"},
    {do:"<b>Spencer's turn:</b> Vinny's call. Then let it sit there unexplained."},
    {note:"Nudge: &ldquo;It's still ringing.&rdquo; If Gnomey lets it ring out, Vinny leaves the same message as a voicemail."},
    {say:"It's barely noon. The card says <b>eight</b>. And not one of you has ever heard the name <b>Dood</b> before. If anyone in town knows a name that old, it's the Records Keeper at the hall of records. If anything's going on at that house, the bad kids at the gazebo will already know. Where do you go first?", who:"The choice"},
    {say:"You leave school and head into town, to the hall of records.", who:"If they pick the hall of records", go:"3"},
    {say:"You head outside, to the gazebo by the school.", who:"If they pick the gazebo", go:"4"},
    {say:"The front door is still boarded up at this hour. You can't get in that way, so you head back down. Where now?", who:"If they march up the hill early"}
  ],
  flow:[
    {who:"Great Uncle Vinny", t:"Sound confused, and talk as if it's 1931."},
    {who:"Great Uncle Vinny", t:"Ask Gnomey if it's the fourteenth."},
    {who:"Great Uncle Vinny", t:"Tell him there's a card game up the hill tonight and that Cornelis owes you a rematch.", say:"Is it the fourteenth? I got a card game up the hill tonight. Cornelis owes me a rematch."},
    {who:"Great Uncle Vinny", t:"Insist you're late, and don't explain anything they ask, including who Cornelis is."},
    {who:"Great Uncle Vinny", if:"If Gnomey doesn't pick up", t:"Leave the same message as a voicemail."},
    {who:"Great Uncle Vinny", if:"If Gnomey says who it is", t:"Talk to him as if he's still twelve.", say:"That you, kid? Twelve years old and you've got a crew."},
    {who:"Great Uncle Vinny", if:"If they say it's 2004", t:"Refuse to hear it.", say:"Don't tell me what year it is. I'm late."},
    {who:"Great Uncle Vinny", if:"If they ask who Cornelis is", t:"Repeat that he owes you a rematch.", say:"Cornelis owes me a rematch, that's who."},
    {who:"Great Uncle Vinny", if:"If they ask about Dood, or when it's time to hang up", t:"Say you can't talk, and hang up.", say:"Can't talk, kid. I'm late for the card game."}
  ],
  npcs:[
    {nm:"Great Uncle Vinny (phone)", vc:"Ancient and mostly gone, and sure it's 1931."}
  ],
  cues:["hall","phone"] },

{ act:"town", no:3, title:"The library &amp; hall of records", where:"Town",
  steps:[
    {snd:["records"]},
    {say:"The hall of records is cold and very quiet: long tables, green-shaded lamps, the smell of old paper and floor polish. The Records Keeper looks up from her desk as you come in.", who:"Setting"},
    {do:"<b>Spencer's turn:</b> the Records Keeper."},
    {say:"She sets the bound volume on the table in front of you, intact. The Crier, 1937.", who:"Narrate"},
    {note:"Nudge: &ldquo;It's all yours.&rdquo; If nobody opens it, she opens it for them, and it goes the same way."},
    {do:"<b>When the volume opens, the trap springs.</b> The reading room's stationery comes alive and goes for the article. &#9876; Fight."},
    {snd:["library","riser","paper","jump"], t:"The trap"},
    {tok:1},
    {fight:1},
    {snd:["library"], t:"Fight over: tap off"},
    {do:"<b>Spencer's turn:</b> the Records Keeper, right after the fight."},
    {ipad:1, do:"&#128241; <b>Item 1:</b> tap the difficulty the combat page shows (Easy, Medium or Hard), then hand over the torn page."},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as you hand it over, before they start the jigsaw. Everyone rolls. <b>Success:</b> there's a card in the back pocket, a link on the iPad's first screen: <b>U.M. Livingsworth III</b>, <b>V. Soprano 1938</b>, <b>W. Ostrander</b>. <b>Miss:</b> the highest roll finds it anyway."}},
    {note:"Gnomey may notice his own family name, <b>Soprano</b>, on the card. Don't push it."},
    {do:"They solve it and read what the town says about the Dood house: no shutter opened by day, a light most nights, music, a lost beagle home with its leg in a splint, hens with two small marks at the neck, the hardware store's oldest account paid from a tin on the gatepost."},
    {stuck:"If the jigsaw stalls past ten minutes: <b>Spencer's turn</b>, the Records Keeper tells them what the page says."},
    {tick:"Players' iPad back to its home page."},
    {do:"<b>Spencer's turn:</b> the Records Keeper, now it's reassembled."},
    {check:{skill:"Insight", dc:"13", note:"<b>Success:</b> they can tell she means the &ldquo;be careful.&rdquo;"}},
    {say:"You leave the hall of records and head back to the gazebo by the school.", who:"If they haven't been to the gazebo", go:"4"},
    {say:"You step outside. Whoever's wearing a watch: it's <b>ten to eight</b>. That's the time on the card. You walk up the hill.", who:"If they've already been to the gazebo", go:"5"}
  ],
  fight:FIGHTS.library,
  flow:[
    {at:"When they arrive"},
    {who:"Records Keeper", if:"If nobody speaks up", t:"Ask what they're looking for.", say:"Can I help you find something?"},
    {who:"Records Keeper", t:"Answer their question about Dood by fetching the bound 1937 volume of the Crier and handing it over intact.", say:"That's an old name. Try the Crier, 1937. I'll get you the bound volume."},
    {at:"The fight", gap:"Scott runs it, nothing for you."},
    {at:"After the fight"},
    {who:"Records Keeper", t:"Tell them to put the page back together, every piece.", say:"Well. Don't just stand there. Get every scrap and put it back together."},
    {at:"Only if Scott says the jigsaw has stalled"},
    {who:"Records Keeper", t:"Tell them what the page says about the Dood house.<ul><li>No shutter is opened by day, and a light burns most nights.</li><li>There's music on still nights.</li><li>A lost beagle came home with its leg set in a splint.</li></ul>", say:"I remember that page. No shutter opened by day, a light most nights, music on still nights. And a lost beagle that came home with its leg in a splint."},
    {at:"Once they've reassembled it"},
    {who:"Records Keeper", t:"Explain that even pieced together, a cut-up page won't count as a primary source.", say:"That won't pass for a primary source now."},
    {who:"Records Keeper", t:"Tell them that if they want one now, it's the house itself.", say:"If you want one, it's the house itself."},
    {who:"Records Keeper", t:"Warn them to be careful, and mean it.", say:"&hellip;But be careful."}
  ],
  npcs:[
    {nm:"Records Keeper", vc:"Helpful. Beyond these points, play her to taste."}
  ],
  cues:["records","library","riser","paper","jump"] },

{ act:"town", no:4, title:"The gazebo", where:"Town · the bad kids",
  steps:[
    {snd:["gazebo"]},
    {say:"The gazebo by the school, where the bad kids smoke. A haze of cigarette smoke, a boombox on the rail, and DJ Poe Boy holding court with his crew. Angelique is among them, not quite looking at you.", who:"Setting"},
    {do:"<b>Spencer's turn:</b> Poe Boy and Angelique."},
    {note:"Nudge: &ldquo;If anyone here knows about that house, it's him.&rdquo;"},
    {do:"<b>If they ask about the house or the cards, Spencer's turn:</b> Poe Boy. If they don't ask, skip the roll."},
    {check:{skill:"Insight", dc:"14", note:"<b>Success:</b> they can tell the &ldquo;once&rdquo; is a lie, or that Angelique is holding something back."}},
    {say:"The crew turns to you, Yobo. Wherever you show up, somebody wants a riff.", who:"Narrate"},
    {do:"<b>Spencer's turn:</b> the crew."},
    {hand:"weight"},
    {check:{skill:"Performance", dc:"12", note:"<b>Yobo only, in secret, at disadvantage.</b> <b>Success:</b> the crew buys it. <b>Miss:</b> it wobbles and they needle him. <b>Won't do it:</b> no roll, and they needle him."}},
    {note:"<b>Don't hint at how to lose the card's effect.</b>"},
    {say:"You leave the gazebo and head into town, to the hall of records.", who:"If they haven't been to the hall of records", go:"3"},
    {say:"Whoever's wearing a watch: it's <b>ten to eight</b>. That's the time on the card. You walk up the hill.", who:"If they've already been to the hall of records", go:"5"}
  ],
  flow:[
    {at:"When they walk up"},
    {who:"DJ Poe Boy", t:"Needle Gnomey about the silly bandz.<ul><li>He ran with your crew in middle school.</li><li>He walked out when he caught you skimming his cut.</li></ul>", say:"Still mad about the silly bandz?"},
    {who:"Angelique", t:"Try to warn them, then stop yourself because the crew is standing right there.<ul><li>All that gets out is a side-eye and a swallowed half-sentence.</li></ul>", say:"<i>When the crew looks away</i>You shouldn't&hellip; never mind. Forget it."},
    {who:"Angelique", t:"Say nothing more than that."},
    {at:"When they ask about the house or the cards"},
    {who:"DJ Poe Boy", t:"Say you've been up there once, with a shrug.", say:"Been up there once."},
    {who:"DJ Poe Boy", if:"If they push on it", t:"Play the house down as nothing to see.", say:"Nothing to see. Just some old house."},
    {who:"DJ Poe Boy", t:"Stay cool about the cards.<ul><li>Don't say you sent them.</li><li>Don't say it's your party.</li></ul>", say:["<i>Shown the card</i>Cool card.","<i>If they ask whose party it is</i>Who knows."]},
    {at:"When they notice Yobo"},
    {who:"The crew", t:"Recognize Yobo as the Dolly Parton guy.<ul><li>Everyone at school believes his grandmother is Dolly Parton.</li></ul>"},
    {who:"The crew", t:"Ask him to do a little riff.", say:"You're the Dolly Parton guy. Do a little riff."},
    {who:"The crew", if:"If he won't do it", t:"Needle him and move on.", say:"Thought so."},
    {at:"After his Performance roll, when Scott tells you the result"},
    {who:"The crew", if:"If he made it", t:"Buy it.", say:"Okay. That's Dolly's grandkid, all right."},
    {who:"The crew", if:"If he missed", t:"Needle him.", say:"That's it? That's Dolly Parton's grandkid?"}
  ],
  npcs:[
    {nm:"DJ Poe Boy", vc:"Kenku: <b>voice him only in borrowed, sampled lines.</b> Charming, subversive, real cred."},
    {nm:"Angelique", vc:"Changeling, trad goth. Wants them warned, can't say it out loud. A side-eye and a held breath."},
    {nm:"The crew", vc:"Poe Boy's bad kids, smoking at the gazebo."}
  ],
  cues:["gazebo"] }

);
