/* Saturday night: cues 5 to 9 and the level-up card.
   Read by run/index.html, loaded in order after scenes/pre.js. Steps and fields: see run/README.md.
   After editing, bump this file's ?v= on its script tag in run/index.html. */
SCENES.push(

{ act:"night", no:5, title:"Enter Dood Mansion", where:"The trap springs · everything from here is inside",
  steps:[
    {snd:["wind","drone"]},
    {say:"The top of the hill: an empty road, no cars, no light in any window. The boards are off the front door, pried away and stacked neat against the porch rail &mdash; the only thing about this house that's changed in decades. Inside, the hall breathes out cold, dusty air.", who:"Setting"},
    {do:"They walk in on curiosity and an invitation, and <b>the doors bolt behind them</b>. Locked in."},
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
  rev:[
    {by:"Angelique", who:"Players", t:"learn Angelique is inside and hiding from something. Not what, and not why she came."}
  ],
  npcs:[
    {nm:"Angelique", pts:["Get them down and quiet","Won't say what she's hiding from","Won't say why she came","If they try the door: go ahead, but they'd have to walk back past what she walked past"], vc:"Frightened, whispering, won't say why she came. Her reason (don't say it yet): last month she typed some of Poe Boy's AIM messages to a kid, thinking it was a prank; the kid stopped coming to school; and she feels a pull to this house. She came to find out."}
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
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> when they take the stairs. <b>Success:</b> a small mic taped to the rail, its cable running into the wall. <b>Miss:</b> they find the second mic, in the summoning's wreckage (cue 9)."}},
    {do:"Somewhere in there, Bix catches <b>Edward glimmering</b> in the moonlight, watching him (Bix beat 1 of 3)."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the DJ poster (the first read-aloud on cue 13). That's as far as they get."},
    {snd:["steps","swoop","jump","braaam"], t:"Dracula"},
    {do:"<b>Someone rolls badly: Dracula swoops</b> and grabs them. DC 15 Str or Dex save or grappled, then he shoves them. <b>Spencer's turn:</b> Dracula, enjoying himself. &#9876; pressure scene."},
    {tok:1},
    {fight:1},
    {note:"Vampires <b>cannot kill a PC</b> here and never roll damage. They'll read this as being hunted. Let them, and don't point it out.", k:"rule"},
    {do:"<b>Spencer's turn:</b> Orlok ends it with one word, then the dismissal."},
    {note:"<b>Angelique:</b> from here it's the party's choice whether she travels with them. If she doesn't, she's at the AIM door when the chime plays."},
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
    {nm:"Dracula", pts:["Overheard: he said five, there are five, the boy's learning to count","They're all children, and that's the point","The meals haven't been fed yet","If they make their Perception: it's only the rehearsal, and you missed your entrance","The swoop: hands on, delighted, no damage. If they hit him, he laughs","Asked if this is part of the party: yes, absolutely","Lets go the instant Orlok speaks"], vc:"Campy, theatrical, lays hands on them and enjoys it far too much. To him this is a rehearsal. Never says who &ldquo;the boy&rdquo; is."},
    {nm:"Orlok", pts:["Overheard: have the meals been fed? See to it before we begin","Stay out of the grab until you're ready to end it","One word, quietly, and Dracula stops","The dismissal, as a threat","Explain nothing: not the doors, not the meals, not the boy"], vc:"Patient and very polite, even while doing something awful. Wants to be left alone in his house. Keeps back: he lost it to Vinny at cards in 1931."},
    {nm:"Edward", pts:["Overheard: one of them is a child","In the hall, stay out of it and watch Bix","Don't approach, don't answer"], vc:"The younger voice. Bix is his son; he says nothing until the driveway."},
    {nm:"Angelique", pts:["Keep them quiet while the voices pass","Still won't say what she's hiding from, or why she came"], vc:"Whispering, frightened."}
  ],
  cues:["drone","heart","steps","swoop","jump","braaam"] },

{ act:"night", no:7, title:"Russ and the spectacles", where:"Saturday night · Cody · badge req 1 of 3",
  steps:[
    {snd:["drone"]},
    {say:"Off the main hall, a tall cabinet stands against the wall. On top of it, a pair of wire spectacles. Below them Orlok is patting slowly along the wrong shelf.", who:"Setting"},
    {do:"Russ is the one who finds him, right after the dismissal. <b>Dracula put the spectacles up there</b>, and Orlok can't see without them."},
    {note:"Russ's <i>Assisting the Elderly</i> requirements card (printed) comes out here; he's had it since before play."},
    {do:"Russ reaches up and hands the spectacles over. <b>No roll.</b>"},
    {check:{skill:"Insight (Russ)", dc:"12", note:"<b>Call it</b> as Orlok takes the spectacles. <b>Success:</b> say that Orlok looks at him a beat too long, as if deciding something. Nothing hangs on it."}},
    {do:"Russ points at &ldquo;verified by your elder&rdquo;. <b>Spencer's turn:</b> Orlok refuses to sign. Refusal 1 of 3."},
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
    {nm:"Orlok", pts:["Keep patting along the wrong shelf","Don't ask for help, even if he's offered it","Take the spectacles with no thanks","Shown &ldquo;verified by your elder&rdquo;: a flat no","Give nothing back, and keep him cold"], vc:"Cold and dignified, and very polite about it. The only crack is that the kid reached up for him and didn't flinch. Don't play it beyond silence: no signature tonight."}
  ],
  cues:["drone"] },

{ act:"night", no:8, title:"Edward spies on them", where:"Saturday night · Bix · beat 2 of 3",
  steps:[
    {snd:["creak","drone","heart"]},
    {say:"The upper floors in the dark: long corridors, doors that won't open, floorboards that answer every step. Every so often, at the end of a hall or in a doorway you've just passed, the same pale figure is standing very still.", who:"Setting"},
    {do:"Let them explore. <b>They catch Edward watching them</b>, and it's Bix he's looking at. If they speak to him, he doesn't answer."},
    {say:"You're looking for a way out. Everyone roll Investigation.", who:"The look-around"},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as the look-around, everyone rolls. <b>Success:</b> the site survey. <b>Miss:</b> the highest roll finds it anyway."}},
    {hand:"survey", do:"&#9995; <b>The printed survey</b>, to whoever finds it: on a table in a room off the hall, among the vampires' things."},
    {do:"<b>They catch him at it a second time.</b> Play it as horror: <i>the vampire has picked one of us.</i>"},
    {note:"<b>If they try the ballroom:</b> heavy doors, locked, and no roll or spell opens them. Cables run under the door. It opens at 2:30."},
    {note:"<b>If they look for Poe Boy:</b> he isn't in the house until 2:30. The mics record on their own."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the poster (the first read-aloud on cue 13). That's as far as they get."},
    {snd:["breath","riser"], t:"The warm door"},
    {say:"A door on the top floor you haven't tried is warm to the touch &mdash; and something on the other side of it is breathing.", who:"Routing them on"},
    {end:"at the warm, breathing door &mdash; straight into the summoning."}
  ],
  next:"The warm, breathing door (read-aloud): cue 9.", go:["9"],
  npcs:[
    {nm:"Edward", pts:["No lines tonight: he's only ever caught watching","It's Bix he watches, both times","Spoken to, he doesn't answer","Never approaches, never explains"], vc:"Has known who Bix is since they walked in. Let them think he's picked one of them to hunt. He explains himself in the driveway at sunrise, not before."}
  ],
  cues:["creak","drone","heart","breath","riser"] },

{ act:"night", no:9, title:"The botched summoning", where:"Saturday, late · combat · the Night 1 closer",
  steps:[
    {snd:["summon","heart"]},
    {say:"The door gives, and the air in the sealed room is hot and close. Chalk lines across the floorboards, candle stubs burned down to nothing &mdash; and in the middle of it, something half-made drags itself upright.", who:"Setting"},
    {do:"They open the warm door: <b>the summoning</b>, visibly incomplete. &#9876; Fight."},
    {tok:1},
    {snd:["jump","braaam"], t:"In the fight"},
    {do:"Every round, narrate it <b>clawing toward one sealed door down the hall</b>."},
    {do:"Arcana DC 14: <b>human-made, incomplete</b>. Who drew it stays open."},
    {check:{skill:"Arcana", dc:"14", note:"Recognize it as an <b>incomplete, human-made</b> summoning &mdash; the planted clue."}},
        {fight:1},
{say:"Take a minute to look through the wreckage. Everyone roll Investigation.", who:"The wreckage search"},
    {check:{skill:"Investigation", dc:"10", note:"<b>Call it</b> after the kill, everyone rolls. <b>Success:</b> the sticky note <code>Fluffy123</code>, stuck to a candle box. <b>Fallback:</b> the highest roll finds it even on a miss."}},
    {check:{skill:"Investigation", dc:"12", note:"<b>Same roll.</b> <b>Success:</b> another mic, still running. <b>Fallback:</b> Marcus's AIM line, &ldquo;he has mics all over this house.&rdquo;"}},
    {note:"In the wreckage: a half-drawn ritual circle. <b>Leave who drew it open tonight.</b>"},
    {hand:"sticky", do:"<b>After the kill, before the screen:</b> the wreckage search. Investigation <b>DC 10</b>: the sticky note, <code>Fluffy123</code>, stuck to a candle box. <b>DC 12</b>: also another mic. <b>Highest roll finds the note even on a miss.</b> &#9995; the note, and tell them they keep it for Sunday."},
    {backup:"<b>The sticky note</b> &mdash; if the summoning isn't played, the note comes out in the first room they search on Sunday."},
    {do:"Then the monitor, the chime, <b>&ldquo;is someone there&rdquo;</b>. They should be holding the password when it types."},
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
    {note:"Cue 12 leans on this: the seedlings want the sun. Don't say why.", k:"rule"},
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
