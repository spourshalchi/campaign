/* Written by src/make_sounds.py. len is the loop length in seconds; loops carry PAD seconds of wrapped audio each side. */
const SOUND_PAD = 0.25;
const SOUND_FILES = {
"house": {
"f": "house.mp3",
"v": "6888894b",
"amb": true,
"len": 25.0,
"src": "elevenlabs"
},
"wind": {
"f": "wind.mp3",
"v": "ed1b32c5",
"amb": true,
"len": 25.0,
"src": "elevenlabs"
},
"record": {
"f": "record.mp3",
"v": "9564b6c5",
"amb": true,
"len": 29.97,
"src": "elevenlabs"
},
"heart": {
"f": "heart.mp3",
"v": "64b74280",
"amb": true,
"len": 5.97,
"src": "elevenlabs"
},
"crowd": {
"f": "crowd.mp3",
"v": "340cf233",
"amb": true,
"len": 23.0,
"src": "elevenlabs"
},
"candle": {
"f": "candle.mp3",
"v": "5c658461",
"amb": true,
"len": 17.0,
"src": "elevenlabs"
},
"class": {
"f": "class.mp3",
"v": "cb7ef5c2",
"amb": true,
"len": 25.0,
"src": "elevenlabs"
},
"hall": {
"f": "hall.mp3",
"v": "dc8979fd",
"amb": true,
"len": 23.0,
"src": "elevenlabs"
},
"library": {
"f": "library.mp3",
"v": "bc129cca",
"amb": true,
"len": 65.4549,
"src": "elevenlabs"
},
"records": {
"f": "records.mp3",
"v": "b829e0d1",
"amb": true,
"len": 23.0,
"src": "elevenlabs"
},
"gazebo": {
"f": "gazebo.mp3",
"v": "0e6dc8a0",
"amb": true,
"len": 21.97,
"src": "elevenlabs"
},
"creak": {
"f": "creak.mp3",
"v": "4e42b538",
"amb": true,
"len": 25.0,
"src": "elevenlabs"
},
"summon": {
"f": "summon.mp3",
"v": "335a481d",
"amb": true,
"len": 23.0,
"src": "elevenlabs"
},
"study": {
"f": "study.mp3",
"v": "167d116e",
"amb": true,
"len": 21.0,
"src": "elevenlabs"
},
"cellar": {
"f": "cellar.mp3",
"v": "948c21a1",
"amb": true,
"len": 23.0,
"src": "elevenlabs"
},
"rig": {
"f": "rig.mp3",
"v": "77006fe5",
"amb": true,
"len": 19.0,
"src": "elevenlabs"
},
"set": {
"f": "set.mp3",
"v": "87bfaaab",
"amb": true,
"len": 14.97,
"src": "elevenlabs"
},
"hiss": {
"f": "hiss.mp3",
"v": "cc7fd080",
"amb": true,
"len": 7.0,
"src": "elevenlabs"
},
"dawn": {
"f": "dawn.mp3",
"v": "f024f461",
"amb": true,
"len": 25.0,
"src": "elevenlabs"
},
"aim": {
"f": "aim.mp3",
"v": "49a0ec0b",
"amb": false,
"len": 1.41333,
"src": "render"
},
"jump": {
"f": "jump.mp3",
"v": "b8fc4ea2",
"amb": false,
"len": 2.002,
"src": "elevenlabs"
},
"braaam": {
"f": "braaam.mp3",
"v": "13ebfa42",
"amb": false,
"len": 5.002,
"src": "elevenlabs"
},
"bell": {
"f": "bell.mp3",
"v": "bd44a7bf",
"amb": false,
"len": 9.10605,
"src": "elevenlabs"
},
"riser": {
"f": "riser.mp3",
"v": "6daefcfd",
"amb": false,
"len": 4.61601,
"src": "elevenlabs"
},
"pa": {
"f": "pa.mp3",
"v": "aef3f08a",
"amb": false,
"len": 3.002,
"src": "elevenlabs"
},
"scratch": {
"f": "scratch.mp3",
"v": "6fea277c",
"amb": false,
"len": 1.482,
"src": "elevenlabs"
},
"levelup": {
"f": "levelup.mp3",
"v": "6fe2b9fe",
"amb": false,
"len": 3.002,
"src": "elevenlabs"
},
"dice": {
"f": "dice.mp3",
"v": "4dc10d0c",
"amb": false,
"len": 1.3807,
"src": "elevenlabs"
},
"schoolbell": {
"f": "schoolbell.mp3",
"v": "0f59d570",
"amb": false,
"len": 3.002,
"src": "elevenlabs"
},
"phone": {
"f": "phone.mp3",
"v": "b7751b7f",
"amb": false,
"len": 3.482,
"src": "elevenlabs"
},
"paper": {
"f": "paper.mp3",
"v": "3ecc5327",
"amb": false,
"len": 2.79644,
"src": "elevenlabs"
},
"bolt": {
"f": "bolt.mp3",
"v": "8e7924dc",
"amb": false,
"len": 2.482,
"src": "elevenlabs"
},
"steps": {
"f": "steps.mp3",
"v": "0b2d5c63",
"amb": false,
"len": 5.4332,
"src": "elevenlabs"
},
"swoop": {
"f": "swoop.mp3",
"v": "d28ebd83",
"amb": false,
"len": 1.22168,
"src": "elevenlabs"
},
"breath": {
"f": "breath.mp3",
"v": "b9eb8a55",
"amb": false,
"len": 7.002,
"src": "elevenlabs"
},
"monitor": {
"f": "monitor.mp3",
"v": "a68ad92d",
"amb": false,
"len": 2.002,
"src": "elevenlabs"
},
"lockclick": {
"f": "lockclick.mp3",
"v": "e45e83e3",
"amb": false,
"len": 1.39429,
"src": "elevenlabs"
},
"smash": {
"f": "smash.mp3",
"v": "96549dc8",
"amb": false,
"len": 1.42644,
"src": "elevenlabs"
},
"needle": {
"f": "needle.mp3",
"v": "4a591485",
"amb": false,
"len": 1.482,
"src": "elevenlabs"
},
"cheer": {
"f": "cheer.mp3",
"v": "69bf9c40",
"amb": false,
"len": 5.002,
"src": "elevenlabs"
},
"boo": {
"f": "boo.mp3",
"v": "debfc1cb",
"amb": false,
"len": 9.602,
"src": "elevenlabs"
},
"car": {
"f": "car.mp3",
"v": "4cd8c5d4",
"amb": false,
"len": 6.92188,
"src": "elevenlabs"
},
"bloom": {
"f": "bloom.mp3",
"v": "2c481215",
"amb": false,
"len": 3.482,
"src": "elevenlabs"
}
};
