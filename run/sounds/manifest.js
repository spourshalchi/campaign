/* Written by src/make_sounds.py. len is the loop length in seconds; loops carry PAD seconds of wrapped audio each side. */
const SOUND_PAD = 0.25;
const SOUND_FILES = {
"house": {
"f": "house.mp3",
"v": "aba28112",
"amb": true,
"len": 26.0,
"src": "render"
},
"wind": {
"f": "wind.mp3",
"v": "9430431f",
"amb": true,
"len": 26.0,
"src": "render"
},
"record": {
"f": "record.mp3",
"v": "400985a6",
"amb": true,
"len": 32.54238,
"src": "render"
},
"heart": {
"f": "heart.mp3",
"v": "a885084c",
"amb": true,
"len": 6.0,
"src": "render"
},
"crowd": {
"f": "crowd.mp3",
"v": "2a986e20",
"amb": true,
"len": 24.0,
"src": "render"
},
"candle": {
"f": "candle.mp3",
"v": "cb038b49",
"amb": true,
"len": 18.0,
"src": "render"
},
"class": {
"f": "class.mp3",
"v": "559ec782",
"amb": true,
"len": 26.0,
"src": "render"
},
"hall": {
"f": "hall.mp3",
"v": "06671fc6",
"amb": true,
"len": 24.0,
"src": "render"
},
"records": {
"f": "records.mp3",
"v": "6a50eaf5",
"amb": true,
"len": 24.0,
"src": "render"
},
"gazebo": {
"f": "gazebo.mp3",
"v": "612c4acc",
"amb": true,
"len": 21.81819,
"src": "render"
},
"creak": {
"f": "creak.mp3",
"v": "c4d531a9",
"amb": true,
"len": 26.0,
"src": "render"
},
"summon": {
"f": "summon.mp3",
"v": "673ea71b",
"amb": true,
"len": 24.0,
"src": "render"
},
"study": {
"f": "study.mp3",
"v": "d088b442",
"amb": true,
"len": 22.0,
"src": "render"
},
"cellar": {
"f": "cellar.mp3",
"v": "d56d9307",
"amb": true,
"len": 24.0,
"src": "render"
},
"rig": {
"f": "rig.mp3",
"v": "91aa9fec",
"amb": true,
"len": 20.0,
"src": "render"
},
"set": {
"f": "set.mp3",
"v": "b2b74a02",
"amb": true,
"len": 15.0,
"src": "render"
},
"hiss": {
"f": "hiss.mp3",
"v": "dce42cf3",
"amb": true,
"len": 8.0,
"src": "render"
},
"dawn": {
"f": "dawn.mp3",
"v": "5a1a9748",
"amb": true,
"len": 26.0,
"src": "render"
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
"v": "ac4b9868",
"amb": false,
"len": 1.84975,
"src": "render"
},
"braaam": {
"f": "braaam.mp3",
"v": "768b6fa7",
"amb": false,
"len": 5.50395,
"src": "render"
},
"bell": {
"f": "bell.mp3",
"v": "9a2202ed",
"amb": false,
"len": 9.16712,
"src": "render"
},
"riser": {
"f": "riser.mp3",
"v": "724c5b68",
"amb": false,
"len": 5.40159,
"src": "render"
},
"pa": {
"f": "pa.mp3",
"v": "c304941e",
"amb": false,
"len": 3.50252,
"src": "render"
},
"scratch": {
"f": "scratch.mp3",
"v": "63941ae5",
"amb": false,
"len": 1.20501,
"src": "render"
},
"levelup": {
"f": "levelup.mp3",
"v": "016c5190",
"amb": false,
"len": 2.63726,
"src": "render"
},
"dice": {
"f": "dice.mp3",
"v": "991682c0",
"amb": false,
"len": 1.05161,
"src": "render"
},
"schoolbell": {
"f": "schoolbell.mp3",
"v": "6b0a95c0",
"amb": false,
"len": 3.682,
"src": "render"
},
"phone": {
"f": "phone.mp3",
"v": "62f4d387",
"amb": false,
"len": 3.402,
"src": "render"
},
"paper": {
"f": "paper.mp3",
"v": "d285144f",
"amb": false,
"len": 2.80712,
"src": "render"
},
"bolt": {
"f": "bolt.mp3",
"v": "7ded3dde",
"amb": false,
"len": 2.23519,
"src": "render"
},
"steps": {
"f": "steps.mp3",
"v": "a1c03687",
"amb": false,
"len": 7.002,
"src": "render"
},
"swoop": {
"f": "swoop.mp3",
"v": "0fd46307",
"amb": false,
"len": 1.55379,
"src": "render"
},
"breath": {
"f": "breath.mp3",
"v": "fb3f660c",
"amb": false,
"len": 7.28154,
"src": "render"
},
"monitor": {
"f": "monitor.mp3",
"v": "ed73c0f4",
"amb": false,
"len": 1.95134,
"src": "render"
},
"lockclick": {
"f": "lockclick.mp3",
"v": "dbb37f1a",
"amb": false,
"len": 1.32259,
"src": "render"
},
"smash": {
"f": "smash.mp3",
"v": "ae313f79",
"amb": false,
"len": 1.86673,
"src": "render"
},
"needle": {
"f": "needle.mp3",
"v": "c3ebf1ca",
"amb": false,
"len": 1.302,
"src": "render"
},
"cheer": {
"f": "cheer.mp3",
"v": "06e55d17",
"amb": false,
"len": 5.52941,
"src": "render"
},
"boo": {
"f": "boo.mp3",
"v": "8300feeb",
"amb": false,
"len": 6.75088,
"src": "render"
},
"car": {
"f": "car.mp3",
"v": "7155511b",
"amb": false,
"len": 7.33905,
"src": "render"
},
"bloom": {
"f": "bloom.mp3",
"v": "07c992a3",
"amb": false,
"len": 4.67912,
"src": "render"
}
};
