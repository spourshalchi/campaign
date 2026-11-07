/* Character creation for the shared iPad: pick a character, see how to build them and their sheet.
   Nothing here or in characters/<id>.js may be private: the iPad is passed around the table. Features,
   spells and a good turn are on each player's printed handout (print/src/handouts/).
   Every number on the sheet is worked out here from the ability scores, level and proficiencies. */
"use strict";
const ROSTER = [["gnomey","Gnomey Soprano","Julia"],["bix","Bix Grimlor","Will"],["yobo","Yobo","John"],["russ","Russ","Cody"],["simone","Simone's Warlock","Simone"]];
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

function attacks(pc, c) {
  return (pc.attacks || []).map(a => {
    const ab = a.ability === "spell" ? pc.spellAbility : a.ability;
    const hit = a.save ? `DC ${c.spellDC} ${a.save}` : sign(c.m[ab] + c.pb);
    const dmg = a.dmg + (a.addMod ? ` ${sign(c.m[ab])}` : "") + " " + a.type;
    return {nm:a.nm, hit, dmg, note:a.note || ""};
  });
}

function steps(pc) {
  return pc.steps.map(g => `<h3>${g.h}</h3>` + g.items.map(i =>
    `<div class="step"><div class="lab">${i.k}</div><div><p><b>${i.pick}</b>${i.rec ? ` <span class="rec">Recommended</span>` : ""}</p>${i.why ? `<p class="why">${i.why}</p>` : ""}</div></div>`).join("")).join("");
}

function sheet(pc) {
  const c = calc(pc, 4), dot = n => {
    const has = pc.skills.includes(n), ex = (pc.expertise || []).includes(n);
    return `<span class="dot${ex ? " e" : has ? " x" : ""}"></span>`;
  };
  const vit = [["Armor Class", c.ac, pc.acNote], ["Hit Points", c.hp, `Hit Dice: 4d8`], ["Initiative", sign(c.init), pc.initProf ? "Dex + proficiency" : "Dex"],
    ["Speed", pc.speed, ""], ["Proficiency", sign(c.pb), "level 4"], ["Passive Perception", c.passive, ""]];
  if (pc.spellAbility) vit.push(["Spell Attack", sign(c.spellAtk), ABIL_NAME[pc.spellAbility]], ["Spell Save DC", c.spellDC, "8 + prof + " + pc.spellAbility.toUpperCase()]);
  return `<h2>${pc.name}, level 4</h2>
    <p class="why">${pc.line}</p>
    <div class="grid vitals">${vit.map(([k, v, s]) => `<div class="box"><span class="k">${k}</span><span class="v">${v}</span><span class="s">${s || "&nbsp;"}</span></div>`).join("")}</div>
    <h3>Abilities</h3>
    <div class="grid stats">${ABIL.map(a => `<div class="box"><span class="k">${a.toUpperCase()}</span><span class="v">${sign(c.m[a])}</span><span class="s">score ${pc.scores[a]}</span></div>`).join("")}</div>
    <div class="cols">
      <div><h3>Saving throws</h3><table>${ABIL.map(a => `<tr><td>${pc.saves.includes(a) ? '<span class="dot x"></span>' : '<span class="dot"></span>'}${ABIL_NAME[a]}</td><td class="n">${sign(c.save(a))}</td></tr>`).join("")}</table>
        ${pc.saveNote ? `<p class="why">${pc.saveNote}</p>` : ""}</div>
      <div><h3>Skills</h3><table>${Object.keys(SKILLS).map(n => `<tr><td>${dot(n)}${n} <span class="why">${((pc.skillAbility && pc.skillAbility[n]) || SKILLS[n]).toUpperCase()}</span></td><td class="n">${sign(c.skill(n))}</td></tr>`).join("")}</table>
        <p class="why">Filled dot: proficient. Red dot: Expertise, double proficiency.${pc.jack ? " Skills you're not proficient in add half your proficiency, from Jack of All Trades." : ""}</p></div>
    </div>
    <h3>Attacks</h3>
    <table><tr><th>Attack</th><th>To hit</th><th>Damage</th></tr>${attacks(pc, c).map(a => `<tr><td>${a.nm}${a.note ? `<br><span class="why">${a.note}</span>` : ""}</td><td class="n">${a.hit}</td><td class="n">${a.dmg}</td></tr>`).join("")}</table>
    ${pc.slots ? `<h3>Spell slots</h3><table><tr><th>Level</th><th>Slots</th><th>Comes back on</th></tr>${pc.slots.map(s => `<tr><td>${s.lvl}</td><td class="n">${"&#9711; ".repeat(s.n)}</td><td>${s.back}</td></tr>`).join("")}</table>` : ""}
    ${pc.spellSheet ? `<h3>Spells</h3><table>${pc.spellSheet.map(g => `<tr><td><b>${g.h}</b></td><td>${g.list}</td></tr>`).join("")}</table>` : ""}
    <div class="cols">
      <div><h3>Features</h3><ul>${pc.featureList.map(f => `<li>${f}</li>`).join("")}</ul></div>
      <div><h3>Proficiencies and languages</h3><ul>${pc.training.map(f => `<li>${f}</li>`).join("")}</ul>
        <h3>Equipment</h3><ul>${pc.gear.map(f => `<li>${f}</li>`).join("")}</ul></div>
    </div>
    <p class="why">What each feature${pc.spellSheet ? " and spell" : ""} does, and what a good turn looks like, is on your printed handout from Scott.</p>`;
}

function render(pc) {
  document.title = pc.name + " · Make Your Character";
  document.documentElement.style.setProperty("--accent", pc.color);
  const tabs = [["build", "Build it"], ["sheet", "Sheet"]];
  document.getElementById("app").innerHTML =
    `<div class="nav"><a class="backlink" href="./">&lsaquo; All characters</a></div>
    <div class="head"><p class="kick">Make your character · ${pc.player}</p><h1>${pc.name}</h1><p class="sub">${pc.tag}</p></div>
    <div class="tabs">${tabs.map(([k, l], i) => `<button data-t="${k}" class="${i ? "" : "on"}">${l}</button>`).join("")}</div>
    <div class="sheet">
      <section id="build" class="on"><h2>Building ${pc.name}, step by step</h2>${pc.intro ? `<div class="note">${pc.intro}</div>` : ""}${steps(pc)}<p class="why" style="margin-top:12px">Hit points: 8 + Con at level 1, then ${calc(pc, 4).hpPerLevel} more each level after that${pc.hpBonusPerLevel ? ", counting Tough" : ""}, using your Con at level 4.</p></section>
      <section id="sheet">${sheet(pc)}</section>
    </div>
    <p class="foot">A recommended build under the 2024 rules: change anything you like with Scott. Rules are summarised in our own words, so check the Player's Handbook or D&amp;D Beyond for the full wording.</p>`;
  document.querySelector(".tabs").addEventListener("click", e => {
    const b = e.target.closest("[data-t]"); if (!b) return;
    document.querySelectorAll(".tabs button").forEach(x => x.classList.toggle("on", x === b));
    document.querySelectorAll("section").forEach(s => s.classList.toggle("on", s.id === b.dataset.t));
    window.scrollTo(0, 0);
  });
}

function picker() {
  document.getElementById("app").innerHTML =
    `<div class="nav"><a class="backlink" href="../">&lsaquo; Home</a></div>
    <div class="head"><p class="kick">Make your character</p><h1>Who are you playing?</h1><p class="sub">A recommended level 4 build and a filled-out sheet for each of you, under the 2024 rules.</p></div>
    <div class="who">${ROSTER.map(([id, nm, pl]) => `<a href="?p=${id}"><b>${nm}</b><span>${pl}</span></a>`).join("")}</div>`;
}

const CHARACTERS = {};
function character(pc) { CHARACTERS[pc.id] = pc; if (typeof document !== "undefined" && !window.PRINT_MODE) render(pc); }
if (typeof document !== "undefined" && !window.PRINT_MODE) {
  const id = new URLSearchParams(location.search).get("p");
  if (ROSTER.some(r => r[0] === id)) { const s = document.createElement("script"); s.src = `${id}.js?v=3`; document.body.appendChild(s); }
  else picker();
  document.addEventListener("touchmove", e => { if (e.scale && e.scale !== 1) e.preventDefault(); }, {passive:false});
}
if (typeof module !== "undefined") module.exports = {calc, attacks, mod, sign, character, CHARACTERS};
