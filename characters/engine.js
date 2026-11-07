/* Character creation for the shared iPad: pick a character, see how to build them step by step.
   Nothing here or in characters/<id>.js may be private: the iPad is passed around the table.
   calc() works every number out from the ability scores, level and proficiencies. */
"use strict";
const ROSTER = [["gnomey","Gnomey Soprano","Julia"],["bix","Bix Grimlor","Will"],["yobo","Yobo","John"],["kelvin","Kelvin","Cody"],["simone","Dark Wind","Simone"]];
const ABIL = ["str", "dex", "con", "int", "wis", "cha"];
const ABIL_NAME = {str:"Strength", dex:"Dexterity", con:"Constitution", int:"Intelligence", wis:"Wisdom", cha:"Charisma"};
const SKILLS = {"Acrobatics":"dex","Animal Handling":"wis","Arcana":"int","Athletics":"str","Deception":"cha","History":"int","Insight":"wis","Intimidation":"cha",
  "Investigation":"int","Medicine":"wis","Nature":"int","Perception":"wis","Performance":"cha","Persuasion":"cha","Religion":"int","Sleight of Hand":"dex","Stealth":"dex","Survival":"wis"};
const mod = s => Math.floor((s - 10) / 2);
const sign = n => (n >= 0 ? "+" : "−") + Math.abs(n);

function calc(pc, level) {
  const scores = pc.scores, pb = level >= 5 ? 3 : 2, m = {};
  ABIL.forEach(a => m[a] = mod(scores[a]));
  const hpPerLevel = 5 + m.con + (pc.hpBonusPerLevel || 0);
  const hp = 8 + m.con + (pc.hpBonusPerLevel || 0) + (level - 1) * hpPerLevel;
  const save = a => m[a] + (pc.saves.includes(a) ? pb : 0);
  const skill = name => {
    const a = (pc.skillAbility && pc.skillAbility[name]) || SKILLS[name];
    let b = m[a];
    if (pc.skills.includes(name)) b += pb;
    if ((pc.expertise || []).includes(name)) b += pb;
    if (!pc.skills.includes(name) && pc.jack) b += Math.floor(pb / 2);
    if (pc.skillBonus && pc.skillBonus[name]) b += Math.max(1, m[pc.skillBonus[name]]);
    return b;
  };
  const sa = pc.spellAbility;
  return {pb, m, hp, hpPerLevel, save, skill,
    init: m.dex + (pc.initProf ? pb : 0),
    ac: pc.ac(m),
    passive: 10 + skill("Perception"),
    spellAtk: sa ? pb + m[sa] : null, spellDC: sa ? 8 + pb + m[sa] : null};
}

function steps(pc) {
  return pc.steps.map(g => `<h3>${g.h}</h3>` + g.items.map(i =>
    `<div class="step"><div class="lab">${i.k}</div><div><p><b>${i.pick}</b>${i.rec ? ` <span class="rec">Recommended</span>` : ""}</p>${i.why ? `<p class="why">${i.why}</p>` : ""}</div></div>`).join("")).join("");
}

function render(pc) {
  document.title = pc.name + " · Make Your Character";
  document.documentElement.style.setProperty("--accent", pc.color);
  document.getElementById("app").innerHTML =
    `<div class="nav"><a class="backlink" href="./">&lsaquo; All characters</a></div>
    <div class="head"><p class="kick">Make your character · ${pc.player}</p><h1>${pc.name}</h1><p class="sub">${pc.tag}</p></div>
    <div class="paper">
      <section><h2>Building ${pc.name}, step by step</h2>${pc.intro ? `<div class="note">${pc.intro}</div>` : ""}${steps(pc)}<p class="why" style="margin-top:12px">Hit points: 8 + Con at level 1, then ${calc(pc, 4).hpPerLevel} more each level after that${pc.hpBonusPerLevel ? ", counting Tough" : ""}, using your Con at level 4.</p></section>
    </div>
    <p class="foot">A recommended build under the 2024 rules: change anything you like with Scott. Rules are summarised in our own words, so check the Player's Handbook or D&amp;D Beyond for the full wording.</p>`;
}

function picker() {
  document.getElementById("app").innerHTML =
    `<div class="nav"><a class="backlink" href="../">&lsaquo; Home</a></div>
    <div class="head"><p class="kick">Make your character</p><h1>Who are you playing?</h1><p class="sub">A recommended level 4 build for each of you, under the 2024 rules.</p></div>
    <div class="who">${ROSTER.map(([id, nm, pl]) => `<a href="?p=${id}"><b>${nm}</b><span>${pl}</span></a>`).join("")}</div>`;
}

const CHARACTERS = {};
function character(pc) { CHARACTERS[pc.id] = pc; if (typeof document !== "undefined" && !window.PRINT_MODE) render(pc); }
if (typeof document !== "undefined" && !window.PRINT_MODE) {
  let id = new URLSearchParams(location.search).get("p");
  if (id === "russ") { id = "kelvin"; history.replaceState(null, "", "?p=kelvin"); }
  if (ROSTER.some(r => r[0] === id)) { const s = document.createElement("script"); s.src = `${id}.js?v=8`; document.body.appendChild(s); }
  else picker();
  document.addEventListener("touchmove", e => { if (e.scale && e.scale !== 1) e.preventDefault(); }, {passive:false});
}
if (typeof module !== "undefined") module.exports = {calc, mod, sign, character, CHARACTERS};
