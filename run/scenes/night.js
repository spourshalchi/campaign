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
    {say:"From your hiding place, you can hear them talking."},
    {do:"<b>Hide</b>: Stealth DC 13."},
    {check:{skill:"Stealth", dc:"13", note:"Hide when Angelique pulls them down; then recurring &mdash; eventually someone rolls badly."}},
    {note:"Play the vampires as <b>hosts on a job</b>. To them this is a rehearsal."},
    {tick:"Spencer: the overheard argument is his. Cue him."},
    {do:"<b>The overheard argument</b> (Spencer), every line true and damning. &ldquo;the boy&rdquo; told them five; there are &ldquo;meals.&rdquo; <b>Perception DC 12</b> to catch Dracula's aside."},
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> during the overheard argument. <b>Success:</b> they catch Dracula: &ldquo;It's only the rehearsal, and you missed your entrance.&rdquo; <b>Fallback:</b> &ldquo;He said five&rdquo; plays as scripted."}},
    {do:"They may take the vampires for <b>costumed party entertainment</b> &mdash; &ldquo;is this part of the party?&rdquo; The vampires play along."},
    {do:"<b>Explore under recurring Stealth, DC 13,</b> until someone rolls badly. On the stairs: <b>Perception DC 12</b> for the mic. Somewhere in there Bix catches <b>Edward glimmering</b> in the moonlight (Bix beat 1 of 3)."},
    {check:{skill:"Perception", dc:"12", note:"<b>Call it</b> when they take the stairs. <b>Success:</b> a small mic taped to the rail, its cable running into the wall. <b>Fallback:</b> they find the second mic, in the summoning's wreckage (cue 9)."}},
    {rev:{who:"Players", t:"learn, the first time they read the <b>DJ poster</b> on the locked upstairs door (any time they explore, tonight or Sunday), that a party here is <b>Poe Boy's</b>. His voice on the speakers at 3AM confirms it, and that he lied about being up there once."}},
    {snd:["steps","swoop","jump","braaam"], t:"Dracula"},
    {do:"<b>Dracula swoops</b>, grapples (DC 15 Str or Dex save) and shoves &mdash; <b>no damage</b>. &#9876; pressure scene."},
    {tok:1},
    {fight:1},
    {note:"Vampires <b>cannot kill a PC</b> here.", k:"rule"},
    {check:{skill:"Insight", dc:"no roll", note:"They'll read this as being hunted. Let them. The vampires never roll damage."}},
    {rev:{who:"Players", t:"may notice the vampires never roll damage. Don't point it out."}},
    {do:"<b>Orlok ends it with one word</b>, then the dismissal. They hear a hunt."},
    {note:"Play the dismissal as a threat. Expect the party to search the house for a way out."},
    {note:"Do <b>not</b> let Orlok discover the locked doors or explain anything &mdash; he decided the doors and owns the building."},
    {note:"<b>Angelique:</b> from here it's the party's choice whether she travels with them. If she doesn't, she's at the AIM door when the chime plays."},
    {end:"on Orlok's &ldquo;We'll find you when we're ready&rdquo; &mdash; and the party scattering to look for a way out."}
  ],
  next:"On Orlok's dismissal, Russ finds Orlok at the cabinet: cue 7.", go:["7"],
  talk:[
    {who:"Dracula", t:"Five. He said five, and there are five. The boy's finally learning to count."},
    {who:"Edward", t:"One of them is a child."},
    {who:"Dracula", t:"They're all children. That's rather the point."},
    {who:"Dracula · optional", t:"The boy says they come for the music and stay for us."},
    {who:"Dracula · overheard, Perception DC 12", t:"It's only the rehearsal, and you missed your entrance."},
    {who:"Orlok", t:"Have our meals been fed?"},
    {who:"Dracula", t:"Not yet I don't think."},
    {who:"Orlok", t:"See to it before we begin. I won't have them distracted."},
    {who:"Orlok · dismissal", t:"The night is young. It would be terribly rude to be finished with you already&hellip; Go on. Have a look around. We'll find you when we're ready."}
  ],
  fight:FIGHTS.contact,
  rev:[
    {by:"spencer", who:"Players", t:"learn from the overheard argument that <b>someone told the vampires exactly five were coming</b> &mdash; &ldquo;the boy.&rdquo; Not who."},
    {by:"spencer", who:"Players", t:"learn the vampires keep &ldquo;meals&rdquo; somewhere in the house. Let them assume the worst; the cellar answers it Sunday."},
    {by:"spencer", who:"Players", t:"can catch, if Dracula's optional line is used, that the <b>party and the haunting are one plan</b>. A free clue."},
    {by:"spencer", who:"Players", t:"hear the dismissal as a hunt. It's really a show schedule &mdash; nobody corrects them."}
  ],
  npcs:[
    {nm:"Dracula", vc:"Campy, theatrical, lays hands on them &mdash; and enjoys it far too much. Asked if this is part of the party, he's delighted to say yes. Stops the instant Orlok speaks."},
    {nm:"Orlok", vc:"Patient and very polite, even while doing something awful. One word from him stops Dracula. Wants to be left alone in his house. Keeps back: he lost it to Vinny at cards in 1931."},
    {nm:"Edward", vc:"Watches Bix. Does not approach. Bix is his son; he says nothing until the driveway."}
  ],
  cues:["drone","heart","steps","swoop","jump","braaam"] },

{ act:"night", no:7, title:"Russ and the spectacles", where:"Saturday night · Cody · badge req 1 of 3",
  steps:[
    {snd:["drone"]},
    {say:"Off the main hall, a tall cabinet stands against the wall. On top of it, a pair of wire spectacles. Below them Orlok is patting slowly along the wrong shelf.", who:"Setting"},
    {note:"Russ's <i>Assisting the Elderly</i> requirements card (printed) comes out here; he's had it since before play."},
    {do:"Right after the dismissal, Russ finds Orlok at the cabinet. <b>Dracula has put his spectacles on top of it</b> and he can't see without them, so he's patting along the wrong shelf. Still cold and dignified. He won't ask for help."},
    {do:"Russ reaches up and hands the spectacles over. <b>No roll.</b>"},
    {check:{skill:"Insight (Russ)", dc:"12", note:"<b>Call it</b> as he takes the spectacles. <b>Success:</b> Orlok looks at him a beat too long, as if deciding something. Flavour only; nothing hangs on it."}},
    {note:"Keep him cold."},
    {do:"Russ points at &ldquo;verified by your elder&rdquo;: Orlok <b>flatly refuses to sign</b>. Refusal 1 of 3."},
    {say:"Spectacles handed over, not a word of thanks. Behind him the house goes dark in every direction."},
    {end:"on the read-aloud: no thanks, and the house dark in every direction. Turn them loose to explore."}
  ],
  next:"No thanks, the house dark in every direction (read-aloud). Turn them loose: cue 8.", go:["8"],
  rev:[
    {by:"Orlok", who:"Orlok", t:"learns a warm kid will reach up for him and want nothing back. Play the tiny crack; still no signature."}
  ],
  npcs:[
    {nm:"Orlok", vc:"Cold and dignified. Won't ask for help. Takes the favour, gives nothing back. Won't sign the card. If Russ makes his Insight: look at him a beat too long, in silence."}
  ],
  cues:["drone"] },

{ act:"night", no:8, title:"Edward spies on them", where:"Saturday night · Bix · beat 2 of 3",
  steps:[
    {snd:["creak","drone","heart"]},
    {say:"The upper floors in the dark: long corridors, doors that won't open, floorboards that answer every step. Every so often, at the end of a hall or in a doorway you've just passed, the same pale figure is standing very still.", who:"Setting"},
    {do:"Let them explore. They <b>catch Edward watching them</b> &mdash; watching <b>Bix</b>."},
    {say:"You're looking for a way out. Everyone roll Investigation.", who:"The look-around"},
    {check:{skill:"Investigation", dc:"12", note:"<b>Call it</b> as the look-around, everyone rolls. <b>Success:</b> the site survey. <b>Fallback:</b> the highest roll finds it even on a miss."}},
    {hand:"survey", do:"<b>The look-around</b>: Investigation <b>DC 12</b>. On a table in a room off the hall, among the vampires' things: the memo, because Poe Boy brought it to them as proof of the threat. <b>Highest roll finds it even on a miss.</b> &#9995; the printed survey."},
    {do:"They catch him at it <b>a second time</b>. Play it as horror: <i>the vampire has picked one of us.</i>"},
    {note:"Let them be wrong about it for as long as possible. <b>Edward does not explain himself tonight</b> ; that happens in the driveway at sunrise."},
    {note:"<b>If they try the ballroom:</b> heavy doors, locked, and no roll or spell opens them. Cables run under the door. It opens at 2:30."},
    {note:"<b>If they look for Poe Boy:</b> he isn't in the house until 2:30. The mics record on their own."},
    {note:"If they reach the locked door at the end of the upstairs hall, narrate the poster (the first read-aloud on cue 13). That's as far as they get."},
    {snd:["breath","riser"], t:"The warm door"},
    {do:"He never approaches and never explains. Route them upstairs to the <b>warm door</b>."},
    {say:"A door on the top floor you haven't tried is warm to the touch &mdash; and something on the other side of it is breathing.", who:"Routing them on"},
    {end:"at the warm, breathing door &mdash; straight into the summoning."}
  ],
  next:"The warm, breathing door (read-aloud): cue 9.", go:["9"],
  rev:[
    {by:"Edward", who:"Players", t:"learn Edward is watching <b>Bix</b> specifically. They should read it as <i>the vampire has picked one of us</i>. He explains nothing."}
  ],
  npcs:[
    {nm:"Edward", vc:"Has known who Bix is since they walked in. Watches, doesn't approach. Let him be caught at it twice."}
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
