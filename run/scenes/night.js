/* Saturday night: cues 5 to 9 and the level-up card.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"night", no:5, title:"Enter Dood Mansion", where:"The front hall",
  steps:[
    {snd:["wind","drone"]},
    {say:"The top of the hill: an empty road, no cars, no light in any window. The boards are off the front door, pried away and stacked neat against the porch rail &mdash; the only thing about this house that's changed in decades. Inside, the hall breathes out cold, dusty air.", who:"Setting"},
    {do:"When they go in, <b>the doors bolt behind them</b>. Locked in."},
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
    {do:"Read these four beats in order. <b>Any missed Stealth: skip straight to Dracula.</b>"},
    {say:"The voices fade toward the back of the house. The hall is long and black, every window boarded from the inside, and the dust on the floor is thick enough to hold a footprint.", who:"The hall"},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as they cross the hall. <b>Success:</b> someone's shoe prints in the dust, back and forth to the stairs, more than once, and not theirs. <b>Miss:</b> a board cracks under someone, loud in the quiet. The next Stealth is at disadvantage."}},
    {say:"Halfway along, a pair of heavy doors, shut, with a bundle of cables running underneath. Behind you, slow footsteps have started up again.", who:"The heavy doors"},
    {check:{skill:"Stealth", dc:"13", note:"<b>Call it</b> as they pass the doors, everyone rolls. <b>Success:</b> they get by. Somewhere behind them, someone laughs, not far off. <b>Miss:</b> Dracula."}},
    {note:"If they try the doors: locked, and no roll or spell opens them."},
    {say:"The stairs climb into the dark, wide and bare, every tread a different creak. The rail is furred with dust.", who:"The stairs"},
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> as they take the stairs. <b>Success:</b> a small mic taped to the rail, its cable running into the wall. <b>Miss:</b> a tread groans under someone. The next Stealth is at disadvantage."}},
    {say:"The upstairs hall runs off ahead of you, door after door that won't open. At the far end there's one more, with something purple on it.", who:"The upstairs hall"},
    {check:{skill:"Stealth", dc:"13", note:"<b>Call it</b> as they creep down the hall, everyone rolls. <b>Success:</b> they reach the door. <b>Miss:</b> Dracula."}},
    {say:"A purple poster on the door: <b>Haunted Bash</b>. 3 AM. Dood Mansion. <b>DJ Poe Boy</b>, huge, with Lil Stinky and Angelique. The door doesn't open.", who:"The poster · if they reach it"},
    {snd:["steps","swoop","jump","braaam"], t:"Dracula"},
    {do:"<b>Any missed Stealth, or after the poster if nobody misses: Dracula swoops</b>, on whoever missed the hide if anyone did. Describe the vampires grabbing and shoving the party around, with no damage. <b>Spencer's turn:</b> Dracula's taunts."},
    {check:{skill:"Optional save", dc:"13", note:"<b>Call it</b> when a vampire goes for a PC. <b>Str or Dex</b> to slip a grab or stay standing, <b>Wis</b> to shake off the fear. <b>Success:</b> they slip free. <b>Failure:</b> they're pinned, shoved across the room, or frozen for a moment. Nobody's hurt."}},
    {do:"After a couple of these, or the moment it stops being fun: <b>Spencer's turn:</b> Orlok's one word. Everything stops."},
    {do:"<b>Spencer's turn:</b> the dismissal."},
    {end:"on Orlok's dismissal."}
  ],
  next:"On Orlok's dismissal: cue 7.", go:["7"],
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
    {say:"At the far end of the corridor he stands in the moonlight from a window, glimmering faintly. He isn't looking at all of you. He's looking at Bix. What do you do?", who:"First sighting"},
    {note:"If they speak to him, he doesn't answer."},
    {say:"As you look around, everyone roll Investigation.", who:"The look-around"},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as the look-around, everyone rolls. <b>Success:</b> the site survey. <b>Miss:</b> the highest roll finds it anyway."}},
    {hand:"survey", do:"&#9995; <b>The printed survey</b>, to whoever finds it: on a table in a room off the hall, among the vampires' things."},
    {say:"You glance back. He's in the doorway you just passed, very still, still looking at Bix.", who:"Second sighting"},
    {note:"<b>If they try the ballroom:</b> heavy doors, locked, and no roll or spell opens them. Cables run under the door."},
    {note:"<b>If they look for Poe Boy:</b> he isn't in the house."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the poster (the first read-aloud on cue 13). That's as far as they get."},
    {end:"on the second sighting."}
  ],
  next:"Moving on through the house, they come upon Orlok: cue 8.", go:["8"],
  npcs:[
    {nm:"Edward", pts:["Stand still and watch Bix each time Scott narrates you.<ul><li>It happens twice. You have no lines tonight.</li></ul>","Ignore anything they say to you.","Refuse to approach or explain."], vc:"Silent, very still."}
  ],
  cues:["creak","drone","heart"] },

{ act:"night", no:8, title:"Russ and the spectacles", where:"A side room",
  steps:[
    {snd:["drone"]},
    {say:"As you move through the house together, you come upon Orlok in a side room. He's patting slowly along the shelf of a tall cabinet and missing, peering at nothing. On top of the cabinet, in plain sight, a pair of wire spectacles, well out of his hand's path. He doesn't see them, and he doesn't ask for anything.", who:"Setting"},
    {say:"What do you do?"},
    {say:"Russ, you've got that requirements card in your pocket. &ldquo;Lend a hand with something out of reach.&rdquo;", who:"If nobody moves · glance at Cody"},
    {do:"<b>Someone hands them over:</b> no roll. <b>Spencer's turn:</b> Orlok takes them without a word of thanks."},
    {check:{skill:"Insight", dc:"12", note:"<b>Call it</b> for whoever handed them over, as Orlok takes them. <b>Success:</b> say that Orlok looks at them a beat too long, as if deciding something."}},
    {do:"<b>Russ shows the card</b>, even if someone else handed them over: <b>Spencer's turn:</b> Orlok refuses to sign. Refusal 1 of 3."},
    {do:"<b>Nobody helps:</b> Orlok keeps patting, and they can pass by. Don't force it: Russ's badge is safe either way."},
    {say:"Behind you, the house goes dark in every direction.", who:"Moving on"},
    {snd:["breath","riser"], t:"The warm door"},
    {say:"A door on the top floor you haven't tried is warm to the touch &mdash; and something on the other side of it is breathing.", who:"Routing them on"},
    {end:"at the warm, breathing door &mdash; straight into the summoning."}
  ],
  next:"The warm, breathing door (read-aloud): cue 9.", go:["9"],
  npcs:[
    {nm:"Orlok", pts:[
      {at:"When they come upon you"},
      "Keep patting along the shelf, missing, and don't look up.<ul><li>Dracula put your spectacles on top of the cabinet, and you can't see without them.</li></ul>",
      {t:"Refuse to ask for help, even if they offer it.", say:"Nothing that concerns you."},
      {at:"If someone hands you the spectacles"},
      "Take them without a word of thanks.",
      {at:"If Russ shows you the card"},
      {t:"Refuse to sign it.<ul><li>Russ will point at &ldquo;Verified by your elder&rdquo;. Give a flat no.</li></ul>", say:["No.","I said no."]},
      {at:"If nobody helps"},
      "Keep patting, and let them go."
    ], vc:"Cold and dignified, and very polite about it."}
  ],
  cues:["drone","breath","riser"] },

{ act:"night", no:9, title:"The botched summoning", where:"The sealed room · combat",
  steps:[
    {snd:["summon","heart"]},
    {say:"The door gives, and the air in the sealed room is hot and close. Chalk lines across the floorboards, candle stubs burned down to nothing &mdash; and in the middle of it, something half-made drags itself upright.", who:"Setting · when they open it"},
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
