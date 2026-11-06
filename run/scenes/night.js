/* Saturday night: cues 5 to 9 and the level-up card.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"night", no:5, title:"Enter Dood Mansion", where:"The trap springs · everything from here is inside",
  steps:[
    {snd:["wind","drone"]},
    {say:"The top of the hill: an empty road, no cars, no light in any window. The boards are off the front door, pried away and stacked neat against the porch rail &mdash; the only thing about this house that's changed in decades. Inside, the hall breathes out cold, dusty air.", who:"Setting"},
    {do:"They walk in and <b>the doors bolt behind them</b>. Locked in."},
    {note:"The doors bolting: state it flatly, once. It doesn't need justifying.", k:"rule"},
    {snd:["bolt","steps","jump"], t:"The bolt, the footsteps, the hand"},
    {say:"That's a bolt throwing behind you. Footsteps overhead &mdash; and a hand comes out of the dark, grabs your sleeve, and pulls you down. It's <b>Angelique</b>."},
    {do:"<b>Spencer's turn:</b> Angelique tells them to get down and stay quiet."},
    {do:"<b>If they try the door:</b> it doesn't move, and there's no bolt on their side to throw. <b>Spencer's turn:</b> Angelique answers them."},
    {end:"hidden in the dark with Angelique &mdash; straight into first contact."}
  ],
  next:"Hidden in the dark, they hear voices: straight into cue 6.", go:["6"],
  talk:[
    {who:"Angelique · pulling them down", t:"Get down. Get <i>down</i>. Stay quiet."},
    {who:"Angelique · asked what from", t:"Just listen."},
    {who:"Angelique · asked why she's here", t:"Not now."},
    {who:"Angelique · if they try the door", t:"Go on then. You'll just have to walk back past whatever I walked past."}
  ],
  npcs:[
    {nm:"Angelique", pts:["Pull them down into hiding and tell them to stay quiet.","Refuse to say what you're hiding from.<ul><li>If they ask, just tell them to listen.</li></ul>","Refuse to say why you came.","Warn them off the front door if they try it.<ul><li>It won't open. Going that way means walking back past whatever you walked past.</li></ul>"], vc:"Frightened, whispering."}
  ],
  cues:["wind","drone","bolt","steps","jump"] },

{ act:"night", no:6, title:"First vampire encounter", where:"No fight &mdash; a performance · scripted end to end",
  steps:[
    {snd:["drone","heart"]},
    {say:"Pressed into the dark with Angelique, you hear them before you see them: three voices coming down the hall, in no hurry at all. One theatrical, one younger, and one very quiet.", who:"Setting"},
    {check:{skill:"Stealth", dc:"13", note:"<b>Call it</b> as they hide, everyone rolls. They roll it again as they explore. Save a miss for the swoop below: the argument plays first."}},
    {say:"From your hiding place, you can hear them talking."},
    {do:"<b>Spencer's turn:</b> the overheard argument."},
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> during the argument. <b>Success:</b> they catch one more line from Dracula, and Spencer says it."}},
    {do:"Turn them loose: they move through the house, <b>rolling Stealth DC 13 as they go</b>, until someone rolls badly."},
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> when they take the stairs. <b>Success:</b> a small mic taped to the rail, its cable running into the wall."}},
    {do:"Somewhere in there, Bix catches <b>Edward glimmering</b> in the moonlight, watching him."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the DJ poster (the first read-aloud on cue 13). That's as far as they get."},
    {snd:["steps","swoop","jump","braaam"], t:"Dracula"},
    {do:"<b>Someone rolls badly: Dracula swoops</b> and grabs them. DC 15 Str or Dex save or grappled, then he shoves them. <b>Spencer's turn:</b> Dracula, enjoying himself. &#9876; pressure scene."},
    {tok:1},
    {fight:1},
    {note:"Vampires <b>cannot kill a PC</b> here and never roll damage. Don't point it out.", k:"rule"},
    {do:"<b>Spencer's turn:</b> Orlok ends it with one word, then the dismissal."},
    {note:"<b>Angelique:</b> from here it's the party's choice whether she travels with them."},
    {end:"on Orlok's dismissal, with the party scattering to look for a way out."}
  ],
  next:"On Orlok's dismissal, Russ finds Orlok at the cabinet: cue 7.", go:["7"],
  talk:[
    {who:"Dracula", t:"Five. He said five, and there are five. The boy's finally learning to count."},
    {who:"Edward", t:"One of them is a child."},
    {who:"Dracula", t:"They're all children. That's rather the point."},
    {who:"Dracula · optional", t:"The boy says they come for the music and stay for us."},
    {who:"Dracula · only on their Perception DC 12", t:"It's only the rehearsal, and you missed your entrance."},
    {who:"Orlok", t:"Have our meals been fed?"},
    {who:"Dracula", t:"Not yet I don't think."},
    {who:"Orlok", t:"See to it before we begin. I won't have them distracted."},
    {who:"Dracula · asked if this is part of the party", t:"Part of the party? Yes. Oh, absolutely yes."},
    {who:"Dracula · holding someone", t:"Oh, very good. Again."},
    {who:"Orlok · to Dracula, quietly", t:"Enough."},
    {who:"Orlok · the dismissal", t:"The night is young. It would be terribly rude to be finished with you already&hellip; Go on. Have a look around. We'll find you when we're ready."}
  ],
  fight:FIGHTS.contact,
  npcs:[
    {nm:"Dracula", pts:["Tell the others that five came, just as the boy said.<ul><li>The boy told you five, and there are five. Never say who the boy is.</li></ul>","Answer Edward that they're all children, and that's the point.","Mention, if you like, that the boy says they come for the music and stay for you.","Tell Orlok the meals haven't been fed yet, as far as you know.","Say the rehearsal line if they make their Perception.<ul><li>Scott tells you when. The line is below: it's only the rehearsal, and you missed your entrance.</li></ul>","Grab whoever fails Stealth, and enjoy it.<ul><li>Scott narrates the swoop and calls the save. No bite and no damage. If they hit you, laugh.</li></ul>","Say yes, delighted, if they ask whether this is part of the party.","Let go the instant Orlok speaks."], vc:"Campy, theatrical, lays hands on them and enjoys it far too much. Play it like a rehearsal."},
    {nm:"Orlok", pts:["Ask whether the meals have been fed.<ul><li>Tell Dracula to see to it before you begin. You won't have them distracted.</li></ul>","Stay out of the grab until Scott cues you to end it.<ul><li>That's after a round or two, or the moment it stops being fun.</li></ul>","Stop Dracula with one quiet word.","Deliver the dismissal below as a threat, very politely.","Refuse to explain anything.<ul><li>Say nothing about the doors, the meals or the boy.</li></ul>"], vc:"Patient and very polite, even while doing something awful."},
    {nm:"Edward", pts:["Point out that one of them is a child.","Watch Bix and stay out of the grab.","Refuse to approach anyone or answer them."], vc:"The younger voice."},
    {nm:"Angelique", pts:["Keep them quiet while the voices pass.","Refuse to say what you're hiding from or why you came."], vc:"Whispering, frightened."}
  ],
  cues:["drone","heart","steps","swoop","jump","braaam"] },

{ act:"night", no:7, title:"Russ and the spectacles", where:"Saturday night · Cody · badge req 1 of 3",
  steps:[
    {snd:["drone"]},
    {say:"Off the main hall, a tall cabinet stands against the wall. On top of it, a pair of wire spectacles. Below them Orlok is patting slowly along the wrong shelf.", who:"Setting"},
    {do:"Russ is the one who finds him, right after the dismissal. Orlok can't see without the spectacles."},
    {note:"Russ's <i>Assisting the Elderly</i> requirements card (printed) comes out here; he's had it since before play."},
    {do:"Russ reaches up and hands the spectacles over. <b>No roll.</b>"},
    {check:{skill:"Insight (Russ)", dc:"12", note:"<b>Call it</b> as Orlok takes the spectacles. <b>Success:</b> say that Orlok looks at him a beat too long, as if deciding something."}},
    {do:"Russ points at &ldquo;verified by your elder&rdquo;. <b>Spencer's turn:</b> Orlok refuses to sign."},
    {say:"Spectacles handed over, not a word of thanks. Behind him the house goes dark in every direction."},
    {end:"on the read-aloud: no thanks, and the house dark in every direction. Turn them loose to explore."}
  ],
  next:"No thanks, the house dark in every direction (read-aloud). Turn them loose: cue 8.", go:["8"],
  talk:[
    {who:"Orlok · asked what he's looking for", t:"Nothing that concerns you."},
    {who:"Orlok · handed the spectacles", t:"(Silence. He puts them on.)"},
    {who:"Orlok · shown the card", t:"No."},
    {who:"Orlok · if Russ pushes", t:"I said no."}
  ],
  npcs:[
    {nm:"Orlok", pts:["Keep patting along the wrong shelf until Russ acts.<ul><li>Dracula put your spectacles on top of the cabinet, and you can't see without them.</li></ul>","Refuse to ask for help, even when he offers it.","Take the spectacles without a word of thanks.","Refuse to sign when Russ shows you the card.<ul><li>He'll point at &ldquo;verified by your elder&rdquo;. Give him a flat no.</li></ul>","Stay cold and give him nothing back."], vc:"Cold and dignified, and very polite about it."}
  ],
  cues:["drone"] },

{ act:"night", no:8, title:"Edward spies on them", where:"Saturday night · Bix",
  steps:[
    {snd:["creak","drone","heart"]},
    {say:"The upper floors in the dark: long corridors, doors that won't open, floorboards that answer every step. Every so often, at the end of a hall or in a doorway you've just passed, the same pale figure is standing very still.", who:"Setting"},
    {do:"Let them explore. <b>They catch Edward watching them</b>, and it's Bix he's looking at. If they speak to him, he doesn't answer."},
    {say:"You're looking for a way out. Everyone roll Investigation.", who:"The look-around"},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as the look-around, everyone rolls. <b>Success:</b> the site survey. <b>Miss:</b> the highest roll finds it anyway."}},
    {hand:"survey", do:"&#9995; <b>The printed survey</b>, to whoever finds it: on a table in a room off the hall, among the vampires' things."},
    {do:"<b>They catch him at it a second time.</b> Play it as horror."},
    {note:"<b>If they try the ballroom:</b> heavy doors, locked, and no roll or spell opens them. Cables run under the door."},
    {note:"<b>If they look for Poe Boy:</b> he isn't in the house."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the poster (the first read-aloud on cue 13). That's as far as they get."},
    {snd:["breath","riser"], t:"The warm door"},
    {say:"A door on the top floor you haven't tried is warm to the touch &mdash; and something on the other side of it is breathing.", who:"Routing them on"},
    {end:"at the warm, breathing door &mdash; straight into the summoning."}
  ],
  next:"The warm, breathing door (read-aloud): cue 9.", go:["9"],
  npcs:[
    {nm:"Edward", pts:["Stand still and watch Bix each time they catch you.<ul><li>They catch you twice. Scott narrates it. You have no lines tonight.</li></ul>","Ignore anything they say to you.","Refuse to approach or explain."], vc:"Silent, very still."}
  ],
  cues:["creak","drone","heart","breath","riser"] },

{ act:"night", no:9, title:"The botched summoning", where:"Saturday, late · combat · the Night 1 closer",
  steps:[
    {snd:["summon","heart"]},
    {say:"The door gives, and the air in the sealed room is hot and close. Chalk lines across the floorboards, candle stubs burned down to nothing &mdash; and in the middle of it, something half-made drags itself upright.", who:"Setting"},
    {do:"&#9876; <b>Fight.</b> Roll initiative."},
    {tok:1},
    {snd:["jump","braaam"], t:"In the fight"},
    {do:"Every round, narrate it <b>clawing toward one sealed door down the hall</b>."},
    {check:{skill:"Arcana", dc:"14", note:"<b>Success:</b> it's an <b>incomplete, human-made</b> summoning."}},
    {fight:1},
    {say:"Take a minute to look through the wreckage. Everyone roll Investigation.", who:"The wreckage search"},
    {check:{skill:"Investigation", dc:"10", note:"<b>Call it</b> after the kill, everyone rolls. <b>Success:</b> the sticky note <code>Fluffy123</code>, stuck to a candle box. <b>Miss:</b> the highest roll finds it anyway."}},
    {check:{skill:"Investigation", dc:"12", note:"<b>Same roll.</b> <b>Success:</b> another mic, still running."}},
    {do:"Also in the wreckage: a half-drawn ritual circle. Don't say who drew it."},
    {hand:"sticky", do:"&#9995; <b>The sticky note</b>, to whoever finds it. Tell them they keep it for Sunday."},
    {snd:["monitor","aim"], t:"The screen wakes"},
    {say:"A monitor deep in the house flickers on by itself. The old AIM chime carries down the hall. One line types itself across a screen nobody is sitting at &mdash; <b>&ldquo;is someone there&rdquo;</b> &mdash; then it goes dark.", who:"After the search"},
    {note:"Fire the <b>AIM chime</b> as the screen wakes, then kill all sound."},
    {end:"the instant the screen dies. Do not let them reach the room tonight. Next card: level up."}
  ],
  next:"The screen dies: end of Saturday. Don't let them reach the room. Everyone levels to 5.", go:["L5"],
  fight:FIGHTS.summoning,
  npcs:[],
  cues:["summon","heart","jump","braaam","monitor","aim"] },

{ act:"night", no:"L5", title:"Level up", where:"End of Saturday · everyone goes from 4 to 5",
  steps:[
    {snd:["levelup"]},
    {say:"3rd-level spells are open now. Have a look at <b>Daylight</b> and <b>Plant Growth</b>.", who:"Say to Cody"},
    {note:"Don't say why.", k:"rule"},
    {do:"<b>Proficiency bonus +2 &rarr; +3.</b> Update every attack bonus, save DC, proficient skill and save."},
    {do:"<b>Hit points:</b> all five classes use a d8. Add 5 (or roll a d8) + Con modifier."},
    {do:"<b>Cantrips get stronger</b> (a second damage die; Eldritch Blast fires two beams)."},
    {do:"<b>Druid</b> (Bix, Russ): 3rd-level spell slots; Wild Resurgence."},
    {do:"<b>Rogue</b> (Gnomey): Sneak Attack 3d6; Cunning Strike; Uncanny Dodge."},
    {do:"<b>Warlock</b> (Simone): Pact slots become 3rd level; more invocations."},
    {do:"<b>Bard</b> (Yobo): 3rd-level slots; Bardic Inspiration becomes a d8; Font of Inspiration (regain on a short rest)."},
    {note:"Check each class against D&amp;D Beyond or the PHB."}
  ],
  next:"That's Saturday. Anything unfinished waits for Sunday's start card.", go:["SUN"],
  npcs:[],
  cues:["levelup"] }

);
