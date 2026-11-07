/* Saturday night: cues 5 to 9 and the level-up card.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"night", no:5, title:"Enter Dood Mansion", where:"The front hall",
  steps:[
    {snd:["wind","drone"]},
    {say:"The top of the hill: an empty road, no cars, no light in any window. The boards are off the front door, pried away and stacked neat against the porch rail &mdash; the only thing about this house that's changed in decades. Inside, the hall breathes out cold, dusty air.", who:"Setting"},
    {do:"They walk in and <b>the doors bolt behind them</b>. Locked in."},
    {note:"State it flatly, once.", k:"rule"},
    {snd:["bolt","steps"], t:"The bolt and the footsteps"},
    {say:"That's a bolt throwing behind you. Footsteps overhead. What do you do?"},
    {do:"Prompt them to hide."},
    {check:{skill:"Stealth", dc:"12", note:"<b>Call it</b> as they hide, everyone rolls. <b>They hide either way.</b> <b>Miss:</b> play up the tension, and note who missed: Dracula goes for them first in cue 6."}},
    {do:"<b>If they try the door:</b> it doesn't move, and there's no bolt on their side to throw."},
    {end:"hidden in the dark, straight into first contact."}
  ],
  next:"Hidden in the dark, they hear voices: straight into cue 6.", go:["6"],
  npcs:[],
  cues:["wind","drone","bolt","steps"] },

{ act:"night", no:6, title:"First vampire encounter", where:"The hall · not a fight",
  steps:[
    {snd:["drone","heart"]},
    {say:"From where you're hiding, you hear them before you see them: three voices coming down the hall, in no hurry at all. One theatrical, one younger, and one very quiet.", who:"Setting"},
    {say:"They stop close enough for you to hear every word."},
    {do:"<b>Spencer's turn:</b> the overheard argument."},
    {do:"The voices move off. Turn them loose to move through the house."},
    {check:{skill:"Stealth", dc:"13", note:"<b>Call it</b> as they move through the house, as often as you like, until someone rolls badly."}},
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> when they take the stairs. <b>Success:</b> a small mic taped to the rail, its cable running into the wall."}},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the DJ poster (the first read-aloud on cue 13). That's as far as they get."},
    {snd:["steps","swoop","jump","braaam"], t:"Dracula"},
    {do:"<b>Someone rolls badly: Dracula swoops</b>, on whoever missed the hide if anyone did. Describe the vampires grabbing and shoving the party around, with no damage. <b>Spencer's turn:</b> Dracula's taunts."},
    {check:{skill:"Optional save", dc:"13", note:"<b>Call it</b> when a vampire goes for a PC. <b>Str or Dex</b> to slip a grab or stay standing, <b>Wis</b> to shake off the fear. <b>Success:</b> they slip free. <b>Failure:</b> they're pinned, shoved across the room, or frozen for a moment. Nobody's hurt."}},
    {do:"After a couple of these, or the moment it stops being fun: <b>Spencer's turn:</b> Orlok's one word. Everything stops."},
    {do:"<b>Spencer's turn:</b> the dismissal."},
    {end:"on Orlok's dismissal, with the party scattering to look for a way out."}
  ],
  next:"On Orlok's dismissal, they go looking for a way out: cue 7.", go:["7"],
  flow:[
    {at:"Overheard, while they hide"},
    {who:"Dracula", t:"Tell the others that five came, just as the boy said.<ul><li>Never say who the boy is.</li></ul>", say:"Five. He said five, and there are five. The boy's finally learning to count."},
    {who:"Edward", t:"Point out that one of them is a child.", say:"One of them is a child."},
    {who:"Dracula", t:"Answer Edward that they're all children, and that's the point.", say:"They're all children. That's rather the point."},
    {who:"Orlok", t:"Ask whether the meals have been fed.", say:"Have our meals been fed?"},
    {who:"Dracula", t:"Tell Orlok the meals haven't been fed yet, as far as you know.", say:"Not yet I don't think."},
    {who:"Orlok", t:"Tell Dracula to see to it before you begin.", say:"See to it before we begin. I won't have them distracted."},
    {at:"While they explore", gap:"Scott runs it, nothing for you."},
    {at:"The swoop"},
    {who:"Dracula", t:"Taunt them while Scott narrates the grabbing and shoving.<ul><li>If they hit you, laugh.</li></ul>", say:["Oh, very good. Again.","Come now, you can run faster than that.","Don't stop, you're doing wonderfully."]},
    {who:"Dracula", if:"If they ask whether this is part of the party", t:"Say yes, delighted.", say:"Part of the party? Yes. Oh, absolutely yes."},
    {who:"Edward", t:"Watch Bix and leave the grabbing to the others. Refuse to approach anyone or answer them."},
    {who:"Orlok", t:"Stay out of it until Scott cues you."},
    {at:"The end, when Scott cues you"},
    {who:"Orlok", t:"Stop Dracula with one quiet word.", say:"Enough."},
    {who:"Dracula", t:"Let go the instant Orlok speaks."},
    {who:"Orlok", t:"Deliver the dismissal as a threat, very politely.", say:"The night is young. It would be terribly rude to be finished with you already&hellip; Go on. Have a look around. We'll find you when we're ready."},
    {who:"Orlok", t:"Refuse to explain anything.<ul><li>Say nothing about the doors, the meals or the boy.</li></ul>"}
  ],
  npcs:[
    {nm:"Dracula", vc:"Campy, theatrical, lays hands on them and enjoys it far too much. Play it like a rehearsal."},
    {nm:"Orlok", vc:"Patient and very polite, even while doing something awful."},
    {nm:"Edward", vc:"The younger voice."}
  ],
  cues:["drone","heart","steps","swoop","jump","braaam"] },

{ act:"night", no:7, title:"Edward spies on them", where:"The upper floors · Bix",
  steps:[
    {snd:["creak","drone","heart"]},
    {say:"The upper floors in the dark: long corridors, doors that won't open, floorboards that answer every step. Every so often, at the end of a hall or in a doorway you've just passed, the same pale figure is standing very still.", who:"Setting"},
    {do:"Let them explore. <b>They catch Edward watching them</b>, glimmering in the moonlight from a window, and it's Bix he's looking at. If they speak to him, he doesn't answer."},
    {say:"You're looking for a way out. Everyone roll Investigation.", who:"The look-around"},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as the look-around, everyone rolls. <b>Success:</b> the site survey. <b>Miss:</b> the highest roll finds it anyway."}},
    {hand:"survey", do:"&#9995; <b>The printed survey</b>, to whoever finds it: on a table in a room off the hall, among the vampires' things."},
    {do:"<b>They catch him at it a second time.</b> Play it as horror."},
    {note:"<b>If they try the ballroom:</b> heavy doors, locked, and no roll or spell opens them. Cables run under the door."},
    {note:"<b>If they look for Poe Boy:</b> he isn't in the house."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the poster (the first read-aloud on cue 13). That's as far as they get."},
    {end:"on the second time they catch him. Keep them exploring."}
  ],
  next:"They keep exploring, and Russ finds Orlok: cue 8.", go:["8"],
  npcs:[
    {nm:"Edward", pts:["Stand still and watch Bix each time they catch you.<ul><li>They catch you twice. Scott narrates it. You have no lines tonight.</li></ul>","Ignore anything they say to you.","Refuse to approach or explain."], vc:"Silent, very still."}
  ],
  cues:["creak","drone","heart"] },

{ act:"night", no:8, title:"Russ and the spectacles", where:"Off the main hall · Russ",
  steps:[
    {snd:["drone"]},
    {say:"Off the main hall, a tall cabinet stands against the wall. On top of it, a pair of wire spectacles. Below them Orlok is patting slowly along the wrong shelf.", who:"Setting"},
    {do:"While they're exploring, Russ is the one who finds him. Orlok can't see without the spectacles."},
    {do:"Russ reaches up and hands the spectacles over. <b>No roll.</b>"},
    {check:{skill:"Insight (Russ)", dc:"12", note:"<b>Call it</b> as Orlok takes the spectacles. <b>Success:</b> say that Orlok looks at him a beat too long, as if deciding something."}},
    {do:"Russ points at &ldquo;verified by your elder&rdquo;. <b>Spencer's turn:</b> Orlok refuses to sign."},
    {say:"Spectacles handed over, not a word of thanks. Behind him the house goes dark in every direction."},
    {snd:["breath","riser"], t:"The warm door"},
    {say:"A door on the top floor you haven't tried is warm to the touch &mdash; and something on the other side of it is breathing.", who:"Routing them on"},
    {end:"at the warm, breathing door &mdash; straight into the summoning."}
  ],
  next:"The warm, breathing door (read-aloud): cue 9.", go:["9"],
  npcs:[
    {nm:"Orlok", pts:[
      "Keep patting along the wrong shelf until Russ acts.<ul><li>Dracula put your spectacles on top of the cabinet, and you can't see without them.</li></ul>",
      {t:"Refuse to ask for help, even when he offers it.", say:"Nothing that concerns you."},
      "Take the spectacles without a word of thanks.",
      {t:"Refuse to sign when Russ shows you the card.<ul><li>He'll point at &ldquo;verified by your elder&rdquo;. Give him a flat no.</li></ul>", say:["No.","I said no."]},
      "Stay cold and give him nothing back."
    ], vc:"Cold and dignified, and very polite about it."}
  ],
  cues:["drone","breath","riser"] },

{ act:"night", no:9, title:"The botched summoning", where:"The sealed room · combat",
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
  next:"The screen dies. Level up.", go:["L5"],
  fight:FIGHTS.summoning,
  npcs:[],
  cues:["summon","heart","jump","braaam","monitor","aim"] },

{ act:"night", no:"L5", title:"Level up", where:"Everyone goes from 4 to 5",
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
  next:"On to Sunday's start card.", go:["SUN"],
  npcs:[],
  cues:["levelup"] }

);
