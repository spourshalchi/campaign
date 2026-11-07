/* Character folder: one player's data file per ?p=<id>. Only that player's file loads, so one
   player's page holds nothing from anyone else's. Every number on the sheet is worked out here
   from the ability scores, level and proficiencies in the data file; none is typed by hand. */
"use strict";
const IDS = ["gnomey", "bix", "yobo", "russ", "simone"];
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

const esc = s => s;
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
    <div class="cols">
      <div><h3>Features</h3><ul>${pc.featureList.map(f => `<li>${f}</li>`).join("")}</ul></div>
      <div><h3>Proficiencies and languages</h3><ul>${pc.training.map(f => `<li>${f}</li>`).join("")}</ul>
        <h3>Equipment</h3><ul>${pc.gear.map(f => `<li>${f}</li>`).join("")}</ul></div>
    </div>`;
}

const card = x => `<div class="card"><h4>${x.nm}</h4>${x.meta ? `<p class="meta">${x.meta}</p>` : ""}<p>${x.does}</p>${x.use ? `<p class="use"><b>Use it when</b> ${x.use}</p>` : ""}</div>`;
function powers(pc) {
  return `<h2>${pc.spells ? "Spells and features" : "Features"}</h2>
    ${pc.powersIntro ? `<p class="why">${pc.powersIntro}</p>` : ""}
    <h3>Class and species features</h3><div class="cards">${pc.features.map(card).join("")}</div>
    ${(pc.spells || []).map(g => `<h3>${g.h}</h3>${g.intro ? `<p class="why">${g.intro}</p>` : ""}<div class="cards">${g.list.map(card).join("")}</div>`).join("")}`;
}

function turn(pc) {
  const t = pc.turn;
  return `<h2>A good turn</h2>
    <div class="turn"><h4>${t.title}</h4><ol>${t.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>
    <h3>If things look different</h3>${t.options.map(([a, b]) => `<div class="ask"><b>${a}</b><span>${b}</span></div>`).join("")}
    <h3>Bonus actions and reactions</h3><ul>${t.extras.map(s => `<li>${s}</li>`).join("")}</ul>
    <p class="why">You get one action, one bonus action if you have something to use it on, your movement, and one reaction per round. You don't have to use all of them.</p>`;
}

function five(pc) {
  const c = calc(pc, 5), a = attacks(pc, c);
  return `<h2>Level 5</h2>
    <p>You reach level 5 at the end of Saturday. Your proficiency bonus goes from +2 to +3, so every attack, save DC, proficient skill and proficient save goes up by 1 (Expertise skills go up by 2).</p>
    <div class="grid vitals">
      <div class="box"><span class="k">Hit Points</span><span class="v">${c.hp}</span><span class="s">add ${c.hpPerLevel}</span></div>
      <div class="box"><span class="k">Initiative</span><span class="v">${sign(c.init)}</span><span class="s">&nbsp;</span></div>
      ${pc.spellAbility ? `<div class="box"><span class="k">Spell Attack</span><span class="v">${sign(c.spellAtk)}</span><span class="s">&nbsp;</span></div><div class="box"><span class="k">Spell Save DC</span><span class="v">${c.spellDC}</span><span class="s">&nbsp;</span></div>` : ""}
    </div>
    <h3>What's new</h3><ul>${pc.level5.map(s => `<li>${s}</li>`).join("")}</ul>
    ${pc.level5cards ? `<div class="cards">${pc.level5cards.map(card).join("")}</div>` : ""}
    <h3>Attacks at level 5</h3><table><tr><th>Attack</th><th>To hit</th><th>Damage</th></tr>${a.map(x => `<tr><td>${x.nm}</td><td class="n">${x.hit}</td><td class="n">${(pc.level5dmg && pc.level5dmg[x.nm]) || x.dmg}</td></tr>`).join("")}</table>`;
}

function render(pc) {
  document.title = pc.name + " · Character Folder";
  document.documentElement.style.setProperty("--accent", pc.color);
  const tabs = [["build", "Build it"], ["sheet", "Sheet"], ["powers", pc.spells ? "Spells & features" : "Features"], ["turn", "A good turn"], ["five", "Level 5"]];
  document.getElementById("app").innerHTML =
    `<div class="head"><p class="kick">Character folder · for ${pc.player}</p><h1>${pc.name}</h1><p class="sub">${pc.tag}</p></div>
    <div class="tabs">${tabs.map(([k, l], i) => `<button data-t="${k}" class="${i ? "" : "on"}">${l}</button>`).join("")}</div>
    <div class="sheet">
      <section id="build" class="on"><h2>Building ${pc.name}, step by step</h2>${pc.intro ? `<div class="note">${pc.intro}</div>` : ""}${steps(pc)}</section>
      <section id="sheet">${sheet(pc)}</section>
      <section id="powers">${powers(pc)}</section>
      <section id="turn">${turn(pc)}</section>
      <section id="five">${five(pc)}</section>
    </div>
    <button class="printbtn" onclick="window.print()">Print this folder</button>
    <p class="foot">A recommended build under the 2024 rules: change anything you like with Scott. Rules are summarised in our own words, so check the Player's Handbook or D&amp;D Beyond for the full wording.</p>`;
  document.querySelector(".tabs").addEventListener("click", e => {
    const b = e.target.closest("[data-t]"); if (!b) return;
    document.querySelectorAll(".tabs button").forEach(x => x.classList.toggle("on", x === b));
    document.querySelectorAll("section").forEach(s => s.classList.toggle("on", s.id === b.dataset.t));
    window.scrollTo(0, 0);
  });
}

const CHARACTERS = {};
function character(pc) { CHARACTERS[pc.id] = pc; if (typeof document !== "undefined") render(pc); }
if (typeof document !== "undefined") {
  const id = new URLSearchParams(location.search).get("p");
  if (IDS.includes(id)) { const s = document.createElement("script"); s.src = `${id}.js?v=1`; document.body.appendChild(s); }
  document.addEventListener("touchmove", e => { if (e.scale && e.scale !== 1) e.preventDefault(); }, {passive:false});
}
if (typeof module !== "undefined") module.exports = {calc, attacks, mod, sign, character, CHARACTERS};
