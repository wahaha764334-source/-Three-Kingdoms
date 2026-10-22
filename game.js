const factions = {
  Wei: { name: "魏", theme: "#8293b3", regions: ["洛陽", "許昌", "鄴城"], leaders: ["曹操", "夏侯惇", "張遼", "司馬懿", "荀彧"] },
  Shu: { name: "蜀", theme: "#91ad79", regions: ["成都", "漢中", "劍閣"], leaders: ["劉備", "關羽", "張飛", "趙雲", "諸葛亮"] },
  Wu: { name: "吳", theme: "#cb846d", regions: ["建業", "赤壁", "柴桑"], leaders: ["孫權", "周瑜", "孫尚香", "陸遜", "甘寧"] },
  Jin: { name: "晉", theme: "#ae8eb7", regions: ["長安", "襄陽", "新野"], leaders: ["司馬昭", "王元姬", "鄧艾", "鍾會", "郭淮"] }
};

const officerData = {
  "曹操": ["武將", "唯才是舉", 3, 1, 2, 1], "夏侯惇": ["武將", "剛烈突擊", 3, 2, 0, 3], "張遼": ["武將", "威震逍遙津", 3, 3, 0, 2], "司馬懿": ["軍師", "狼顧之相", 0, 1, 4, 2], "荀彧": ["軍師", "王佐之才", 0, 2, 4, 1],
  "劉備": ["武將", "仁德天下", 2, 2, 1, 3], "關羽": ["武將", "武聖", 4, 1, 1, 2], "張飛": ["武將", "萬人敵", 4, 0, 0, 4], "趙雲": ["武將", "龍膽銀槍", 3, 4, 0, 2], "諸葛亮": ["軍師", "臥龍奇策", 0, 1, 5, 1],
  "孫權": ["武將", "江東之主", 2, 2, 2, 2], "周瑜": ["軍師", "赤壁奇謀", 1, 3, 4, 1], "孫尚香": ["武將", "弓腰姬", 2, 4, 1, 1], "陸遜": ["軍師", "火燒連營", 0, 3, 4, 1], "甘寧": ["武將", "錦帆夜襲", 3, 4, 0, 1],
  "司馬昭": ["武將", "承魏啟晉", 2, 2, 3, 2], "王元姬": ["軍師", "明慧善謀", 0, 3, 3, 1], "鄧艾": ["武將", "偷渡陰平", 3, 2, 1, 4], "鍾會": ["軍師", "才器過人", 1, 2, 4, 1], "郭淮": ["軍師", "籌畫守禦", 1, 1, 3, 3]
};

const troopTypes = [
  { name: "長槍兵", icon: "槍", desc: "前列防禦，穩固軍陣。", cost: 45, atk: 3, hp: 35, levelReq: 1 },
  { name: "弓箭手", icon: "弓", desc: "遠程支援，攻擊略高。", cost: 55, atk: 5, hp: 20, levelReq: 1 },
  { name: "刀盾兵", icon: "盾", desc: "持盾步卒，耐久見長。", cost: 60, atk: 2, hp: 60, levelReq: 1 },
  { name: "弩兵", icon: "弩", desc: "強弩齊射，擅長遠距打擊。", cost: 180, atk: 12, hp: 55, levelReq: 10 },
  { name: "輕騎兵", icon: "騎", desc: "機動迅捷，衝陣突襲。", cost: 320, atk: 20, hp: 110, levelReq: 20 },
  { name: "重騎兵", icon: "馬", desc: "鐵甲具裝，正面破陣。", cost: 650, atk: 36, hp: 240, levelReq: 40 },
  { name: "長戟兵", icon: "戟", desc: "長戟如林，攻守兼備。", cost: 1100, atk: 55, hp: 360, levelReq: 60 },
  { name: "虎衛軍", icon: "虎", desc: "精銳近衛，堅守中軍。", cost: 1800, atk: 82, hp: 600, levelReq: 80 },
  { name: "陷陣營", icon: "陷", desc: "百戰精兵，專破敵陣。", cost: 3200, atk: 125, hp: 900, levelReq: 120 },
  { name: "白毦精兵", icon: "毦", desc: "驍勇善戰，攻防俱全。", cost: 5200, atk: 190, hp: 1350, levelReq: 160 }
];
const weaponTierNames = [
  "練習木劍", "青銅環首刀", "精鐵長槍", "百鍊鋼刀", "破軍戰戟", "玄鐵重劍", "虎牙長刀",
  "雁翎神弓", "龍膽銀槍", "青龍偃月刀", "丈八蛇矛", "方天畫戟", "赤焰雙刃", "玄鐵霸王槍",
  "天罡破陣刀", "七星龍淵劍", "蒼穹戰戟", "麒麟烈焰槍", "無雙鎮岳刀", "伏龍神兵", "天下無雙刃"
];
const armorTierNames = [
  "粗布戰衣", "皮革短甲", "青銅札甲", "精鐵鎧甲", "虎紋戰袍", "玄鐵重鎧", "百鍊明光甲",
  "雁翎鎖子甲", "龍鱗戰鎧", "赤焰將軍甲", "玄武重裝", "方天霸體鎧", "麒麟寶甲", "玄鐵霸王鎧",
  "天罡護心甲", "七星龍鱗鎧", "蒼穹戰甲", "烈焰麒麟鎧", "無雙鎮岳甲", "伏龍神鎧", "天下無雙甲"
];
const strategistWeaponNames = [
  "桃木法杖", "青玉羽扇", "流雲拂塵", "紫檀星杖", "五行法器", "七星羽扇", "玄冰靈杖",
  "八卦天書", "太極拂塵", "臥龍羽扇", "鳳雛策卷", "天機星杖", "紫微神扇", "九霄龍吟杖",
  "乾坤八卦盤", "七星伏魔杖", "蒼穹策天扇", "烈焰朱雀杖", "無雙通天策", "伏龍諸天卷", "天下無雙神策"
];
const strategistArmorNames = [
  "布衣道袍", "青紋長衫", "竹影法衣", "流雲道袍", "八卦長袍", "玄絲法衣", "紫陽道袍",
  "太極法袍", "臥龍錦袍", "天機星衣", "紫微仙袍", "九霄雲衣", "龍紋道袍", "鳳羽仙衣",
  "乾坤護法袍", "七星玄天衣", "蒼穹策士袍", "烈焰朱雀衣", "無雙天師法袍", "伏龍仙尊衣", "天下無雙天衣"
];
const mountTierNames = [
  "青鬃馬", "黃驃馬", "烏騅馬", "白龍駒", "西涼馬", "赤兔馬", "的盧",
  "爪黃飛電", "照夜玉獅子", "絕影", "白雪龍駒", "赤煙駒", "追風烏騅", "踏雪玉兔",
  "奔雷駿馬", "烈焰赤兔", "玄甲戰馬", "飛霜神駒", "追日天馬", "麒麟神騎", "無雙天馬"
];
const equipmentStock = [
  { id: "bronze-blade", name: "青銅環首刀", type: "武器", desc: "舊式兵器 · 攻擊力 +8。", cost: 80, bonus: 8, levelReq: 1 },
  { id: "war-spear", name: "精鐵長槍", type: "武器", desc: "舊式兵器 · 攻擊力 +14。", cost: 145, bonus: 14, levelReq: 1 },
  { id: "leather-armor", name: "札甲", type: "防具", desc: "舊式護具 · 氣血上限 +100。", cost: 90, bonus: 100, levelReq: 1 },
  { id: "jade-charm", name: "青玉護符", type: "防具", desc: "舊式護具 · 氣血上限 +100。", cost: 100, bonus: 100, levelReq: 1 },
  ...weaponTierNames.map((name, index) => {
    const levelReq = index === 0 ? 1 : index === 20 ? 200 : index * 10;
    const bonus = 10 + index * 20 + index ** 2;
    return { id: `weapon-tier-${levelReq}`, name, type: "武器", desc: `階段武器 · 攻擊力 +${bonus} · 需求 Lv.${levelReq}`, cost: Math.round(100 + levelReq ** 1.65 * .75), bonus, levelReq };
  }),
  ...armorTierNames.map((name, index) => {
    const levelReq = index === 0 ? 1 : index === 20 ? 200 : index * 10;
    const bonus = 100 + index * 140 + index ** 2 * 8;
    return { id: `armor-tier-${levelReq}`, name, type: "防具", desc: `階段護具 · 氣血上限 +${bonus} · 需求 Lv.${levelReq}`, cost: Math.round(120 + levelReq ** 1.65 * .8), bonus, levelReq };
  }),
  ...strategistWeaponNames.map((name, index) => {
    const levelReq = index === 0 ? 1 : index === 20 ? 200 : index * 10;
    const bonus = 10 + index * 20 + index ** 2;
    return { id: `strategist-weapon-tier-${levelReq}`, name, type: "武器", role: "strategist", desc: `智將法器 · 智力攻擊 +${bonus} · 需求 Lv.${levelReq}`, cost: Math.round(100 + levelReq ** 1.65 * .75), bonus, levelReq };
  }),
  ...strategistArmorNames.map((name, index) => {
    const levelReq = index === 0 ? 1 : index === 20 ? 200 : index * 10;
    const bonus = 100 + index * 140 + index ** 2 * 8;
    return { id: `strategist-armor-tier-${levelReq}`, name, type: "防具", role: "strategist", desc: `智將法衣 · 氣血上限 +${bonus} · 需求 Lv.${levelReq}`, cost: Math.round(120 + levelReq ** 1.65 * .8), bonus, levelReq };
  })
];
const mountStock = mountTierNames.map((name, index) => {
  const levelReq = index === 0 ? 1 : index === 20 ? 200 : index * 10;
  const attack = 5 + index * 12 + index ** 2;
  const hp = 80 + index * 90 + index ** 2 * 6;
  return {
    id: `mount-tier-${levelReq}`, name, type: "馬匹", desc: `良駒坐騎 · 攻擊 +${attack} · 氣血上限 +${hp} · 需求 Lv.${levelReq}`,
    cost: Math.round(150 + levelReq ** 1.7), bonus: attack, hpBonus: hp, levelReq
  };
});
const upgradeItems = [
  { id: "commander-seal", name: "主將兵符", desc: "消耗後提升所屬主將 1 級，最高 20 級。", cost: 2800 },
  { id: "evolution-pill", name: "精製士兵進化丹", desc: "消耗後提升一名士兵 1 階。", cost: 1200 }
];
const meritShopStock = [
  { id: "commander-seal", name: "主將兵符", desc: "可用於提升所屬主將 1 級，最高 20 級。", meritCost: 100 },
  { id: "evolution-pill", name: "精製士兵進化丹", desc: "可用於提升一名士兵 1 階。", meritCost: 50 }
];
const regions = [
  ["黃巾賊營", 1, "亂世初始 · 黃巾餘黨", "plain"], ["汜水關", 3, "虎牢之前 · 西涼守軍", "pass"], ["虎牢關", 5, "諸侯會盟 · 華雄部隊", "fortress"],
  ["洛陽城郊", 8, "京師舊都 · 董卓殘部", "city"], ["長坂坡", 11, "荊州要道 · 曹軍先鋒", "forest"], ["赤壁水寨", 14, "長江天塹 · 曹魏水師", "water"],
  ["華容小徑", 17, "赤壁之後 · 散兵遊勇", "forest"], ["合肥城外", 20, "江淮前線 · 魏吳交鋒", "fortress"], ["官渡古戰場", 24, "河北平原 · 袁軍餘眾", "plain"],
  ["長安古道", 29, "西涼險路 · 鐵騎營寨", "desert"], ["漢中棧道", 34, "秦嶺蜀道 · 山越軍", "mountain"], ["劍閣關隘", 40, "蜀漢天險 · 精銳守軍", "pass"],
  ["成都平原", 48, "西川沃土 · 蜀軍大營", "plain"], ["夷陵山道", 57, "荊州烽火 · 吳軍先鋒", "mountain"], ["五丈原", 68, "秋風五丈原 · 魏蜀對陣", "plain"],
  ["襄陽水門", 80, "荊襄重鎮 · 魏軍精銳", "water"], ["祁山大營", 94, "六出祁山 · 隴右守軍", "mountain"], ["洛水之濱", 110, "天下歸晉 · 最終決戰", "water"],
  ["白馬坡", 125, "延津渡口 · 河北騎軍", "plain"], ["博望坡", 140, "新野以北 · 曹軍前鋒", "forest"], ["麥城", 158, "荊州孤城 · 吳軍圍城", "fortress"],
  ["江陵渡口", 178, "長江北岸 · 荊州水軍", "water"], ["南中山道", 200, "群山深處 · 南中部族", "mountain"], ["建業石頭城", 225, "江東都城 · 東吳禁軍", "city"]
];

const defaultState = {
  hero: null, level: 1, xp: 0, points: 0, stats: { strength: 10, agility: 10, intelligence: 10, vitality: 10 },
  gold: 120, merit: 0, wave: 1, kills: 0, defeated: 0, region: "黃巾賊營", enemyHp: 0, heroHp: null, superiorHp: null, speedMultiplier: 5, lastSeen: Date.now(),
  officers: [], troops: [], items: [], superiorLevels: {}, equippedWeapon: null, equippedArmor: null, equippedStrategistWeapon: null, equippedStrategistArmor: null, equippedMount: null, rebirths: 0, rank: 0, sound: false
};
const ranks = [
  { name: "布衣", cost: 0, bonus: 0 }, { name: "什長", cost: 100, bonus: 4 }, { name: "百人將", cost: 260, bonus: 10 },
  { name: "校尉", cost: 600, bonus: 20 }, { name: "中郎將", cost: 1250, bonus: 36 }, { name: "大將軍", cost: 2500, bonus: 60 },
  ...[
    "牙門將軍", "裨將軍", "偏將軍", "雜號將軍", "輔國將軍", "安國將軍", "鎮軍將軍", "揚武將軍",
    "建威將軍", "平東將軍", "安東將軍", "征東將軍", "平南將軍", "安南將軍", "征南將軍",
    "平西將軍", "安西將軍", "征西將軍", "平北將軍", "安北將軍", "征北將軍", "前將軍",
    "左將軍", "右將軍", "後將軍", "車騎將軍", "驃騎將軍", "衛將軍", "大司馬", "太尉",
    "司徒", "司空", "丞相", "開府儀同三司", "上公", "諸侯王", "攝政王", "九五至尊"
  ].map((name, index) => {
    const rank = index + 6;
    return { name, cost: Math.round(2500 * 1.25 ** (rank - 5)), bonus: 60 + (rank - 5) * 12 };
  })
];
const enemies = ["黃巾賊", "流寇", "賊兵", "叛軍斥候", "山賊"];
const state = loadGame();
let modalTab = "main";
let combatTimer;
let toastTimer;
let audioContext;

function loadGame() {
  try {
    const saved = localStorage.getItem("qunxiong-idle-save");
    if (!saved) return structuredClone(defaultState);
    const parsed = JSON.parse(saved);
    const migrated = {
      ...structuredClone(defaultState), ...parsed,
      stats: { ...defaultState.stats, ...(parsed.stats || {}) },
      officers: Array.isArray(parsed.officers) ? parsed.officers : [],
      troops: Array.isArray(parsed.troops) ? parsed.troops.filter((troop) => troop && typeof troop === "object").map((troop) => ({
        ...troop,
        currentHp: Number.isFinite(troop.currentHp) ? Math.max(0, troop.currentHp) : null
      })) : [],
      items: Array.isArray(parsed.items) ? parsed.items : [],
      superiorLevels: parsed.superiorLevels && typeof parsed.superiorLevels === "object" ? parsed.superiorLevels : {},
      heroHp: Number.isFinite(parsed.heroHp) ? Math.max(0, parsed.heroHp) : null,
      superiorHp: Number.isFinite(parsed.superiorHp) ? Math.max(0, parsed.superiorHp) : null,
      speedMultiplier: Number(parsed.speedMultiplier) === 1 ? 1 : 5,
      rebirths: Math.max(0, Number(parsed.rebirths) || 0),
      rank: Math.max(0, Math.min(ranks.length - 1, Math.floor(Number(parsed.rank) || 0)))
    };
    if (migrated.hero) {
      if (!factions[migrated.hero.faction]) migrated.hero.faction = "Wei";
      if (!factions[migrated.hero.faction].leaders.includes(migrated.hero.superior)) {
        migrated.hero.superior = factions[migrated.hero.faction].leaders[0];
      }
      migrated.superiorLevels[migrated.hero.superior] ||= 1;
      if (!regions.some(([name]) => name === migrated.region)) migrated.region = defaultState.region;
    }
    return migrated;
  } catch (error) {
    console.error("無法讀取本機存檔：", error);
    return structuredClone(defaultState);
  }
}

function saveGame() {
  state.lastSeen = Date.now();
  try {
    localStorage.setItem("qunxiong-idle-save", JSON.stringify(state));
  } catch (error) {
    console.error("無法儲存遊戲進度：", error);
    showToast("存檔失敗，請檢查瀏覽器儲存空間");
  }
}

function updateSpeedButton() {
  const button = document.getElementById("speed-button");
  if (!button) return;
  button.textContent = `${state.speedMultiplier}× 速度`;
  button.setAttribute("aria-pressed", String(state.speedMultiplier === 5));
  button.title = state.speedMultiplier === 5 ? "點擊切換為 1 倍速" : "點擊切換為 5 倍速";
}

function startBattleTimer() {
  clearInterval(combatTimer);
  if (state.hero) combatTimer = setInterval(advanceBattle, 1900 / state.speedMultiplier);
}

const isStrategist = () => state.hero?.role === "strategist";
const equippedWeaponId = () => isStrategist() ? state.equippedStrategistWeapon : state.equippedWeapon;
const equippedArmorId = () => isStrategist() ? state.equippedStrategistArmor : state.equippedArmor;
const weaponBonus = () => equipmentStock.find((item) => item.id === equippedWeaponId())?.bonus || 0;
const armorBonus = () => equipmentStock.find((item) => item.id === equippedArmorId())?.bonus || 0;
const mountBonus = () => mountStock.find((item) => item.id === state.equippedMount)?.bonus || 0;
const mountHpBonus = () => mountStock.find((item) => item.id === state.equippedMount)?.hpBonus || 0;
const getSuperior = () => state.hero?.superior || (state.hero ? factions[state.hero.faction]?.leaders[0] : null);
const getSuperiorLevel = () => getSuperior() ? Math.max(1, Number(state.superiorLevels[getSuperior()]) || 1) : 1;
const getItemCount = (id) => state.items.filter((item) => item === id).length;
const getEquippedMount = () => mountStock.find((item) => item.id === state.equippedMount);
const superiorAttackBonus = () => {
  const stats = officerData[getSuperior()];
  return stats ? stats[2] * 2 + (getSuperiorLevel() - 1) * 4 : 0;
};
const effectiveAttack = () => state.stats[isStrategist() ? "intelligence" : "strength"] + weaponBonus() + mountBonus() + (ranks[state.rank]?.bonus || 0) + superiorAttackBonus();
const maxHp = () => 300 + state.stats.vitality * 50 + armorBonus() + mountHpBonus();
const superiorMaxHp = () => 300 + (officerData[getSuperior()]?.[5] || 1) * 50 + (getSuperiorLevel() - 1) * 25;
const maxMp = () => 200 + state.stats.vitality * 50;
function restorePartyHealth() {
  state.heroHp = maxHp();
  state.superiorHp = superiorMaxHp();
  state.troops.forEach((troop) => { troop.currentHp = troop.hp; });
}
function normalizePartyHealth() {
  state.heroHp = Number.isFinite(state.heroHp) ? Math.max(0, Math.min(maxHp(), state.heroHp)) : maxHp();
  state.superiorHp = Number.isFinite(state.superiorHp) ? Math.max(0, Math.min(superiorMaxHp(), state.superiorHp)) : superiorMaxHp();
  state.troops.forEach((troop) => {
    troop.currentHp = Number.isFinite(troop.currentHp) ? Math.max(0, Math.min(troop.hp, troop.currentHp)) : troop.hp;
  });
}
const xpNeeded = () => 100 + state.level * 100 + state.level ** 2 * 5;
const enemyMaxHp = () => {
  const recommendedLevel = regions.find(([name]) => name === state.region)?.[1] || 1;
  const waveMultiplier = Math.min(5, 1 + Math.max(0, state.wave - 1) * .03);
  return Math.round((30 + recommendedLevel * 12 + recommendedLevel ** 2 * .15) * waveMultiplier);
};
if (!Number.isFinite(state.enemyHp) || state.enemyHp <= 0) state.enemyHp = enemyMaxHp();
normalizePartyHealth();
const getFaction = () => state.hero ? factions[state.hero.faction] : null;
const getRole = () => state.hero?.role === "general" ? "武將" : "軍師";
const getInitial = (name) => [...(name || "俠")[0]][0];
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
function portraitMarkup(name, role = "general", gender = "male") {
  const palettes = [
    ["#8f493e", "#d6a875", "#382c2a"], ["#426477", "#e0b78e", "#26323a"],
    ["#667747", "#d3a278", "#343128"], ["#75517b", "#e2bb91", "#342d3b"],
    ["#98723c", "#d9aa7e", "#37302a"], ["#376f68", "#e0b38d", "#293634"]
  ];
  let seed = 0;
  for (const char of name) seed = (seed * 31 + char.codePointAt(0)) >>> 0;
  const [cloth, skin, hair] = palettes[seed % palettes.length];
  const helm = role === "troop" || role === "enemy";
  const headwear = helm
    ? `<path d="M20 43Q21 15 48 15Q75 15 76 43L68 37L64 28L58 38H38L31 28L28 39Z" fill="${cloth}" stroke="#e0c58d" stroke-width="2"/><path d="M28 40H68" stroke="#e0c58d" stroke-width="4"/>`
    : `<path d="M25 40Q22 13 48 13Q76 14 72 43L65 33L60 24Q49 34 31 30Z" fill="${hair}" stroke="#e0c58d" stroke-width="2"/><path d="M48 16V6M42 11L48 5L54 11" fill="none" stroke="#e0c58d" stroke-width="2"/>`;
  const beard = role === "general" || role === "enemy" || (seed % 3 === 0)
    ? `<path d="M34 57Q48 66 62 57L60 75L49 85L37 73Z" fill="${hair}"/>`
    : "";
  const features = gender === "female" && role === "hero"
    ? `<path d="M24 49Q11 35 17 19Q30 24 31 39M72 49Q85 35 79 19Q66 24 65 39" fill="${cloth}" stroke="#e0c58d" stroke-width="2"/>`
    : "";
  return `<svg class="portrait-art portrait-${role}" viewBox="0 0 96 96" role="img" aria-label="${escapeHtml(name)}頭像" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg-${seed}" x2="0" y2="1"><stop stop-color="${cloth}"/><stop offset="1" stop-color="#171b1b"/></linearGradient><clipPath id="clip-${seed}"><circle cx="48" cy="48" r="46"/></clipPath></defs><g clip-path="url(#clip-${seed})"><rect width="96" height="96" fill="url(#bg-${seed})"/><path d="M8 104Q12 70 48 68Q84 70 88 104" fill="${hair}" stroke="#d7b978" stroke-width="2"/>${features}${headwear}<ellipse cx="48" cy="49" rx="22" ry="26" fill="${skin}"/><path d="M28 47Q34 42 40 47M56 47Q62 42 68 47" fill="none" stroke="#352d2a" stroke-width="3" stroke-linecap="round"/><path d="M40 58Q48 61 56 58" fill="none" stroke="#8d5143" stroke-width="2" stroke-linecap="round"/>${beard}<path d="M38 72L48 83L58 72" fill="none" stroke="#d8bd84" stroke-width="2"/><path d="M10 88H86" stroke="#e0c58d" stroke-width="2" opacity=".7"/></g><circle cx="48" cy="48" r="45" fill="none" stroke="#e0c58d" stroke-width="2"/></svg>`;
}

function render() {
  normalizePartyHealth();
  const faction = getFaction();
  const heroName = state.hero?.name || "尚未建立角色";
  const role = state.hero ? getRole() : "—";
  const heroMark = getInitial(state.hero?.name || (state.hero?.gender === "male" ? "男" : "女"));
  const superior = getSuperior();
  const allies = state.hero && superior ? [superior] : [];
  const totalAllies = (state.hero ? 1 : 0) + allies.length + state.troops.length;
  const hp = maxHp();
  const mp = maxMp();
  const heroGender = state.hero?.gender || "female";
  const progress = state.level >= 200 ? 100 : Math.min(100, state.xp / xpNeeded() * 100);
  document.getElementById("top-location").textContent = state.region;
  document.getElementById("gold-value").textContent = state.gold.toLocaleString();
  document.getElementById("merit-value").textContent = state.merit.toLocaleString();
  document.getElementById("battle-title").innerHTML = `${escapeHtml(state.region)} <span>·</span> <small>第 <b id="wave-value">${state.wave}</b> 隊</small>`;
  document.getElementById("wave-value").textContent = state.wave;
  document.getElementById("commander-name").textContent = heroName;
  document.getElementById("commander-avatar").innerHTML = portraitMarkup(heroName, "hero", heroGender);
  document.getElementById("profile-name").textContent = state.hero ? heroName : "新任主將";
  document.getElementById("profile-avatar").innerHTML = portraitMarkup(heroName || "新任主將", "hero", heroGender);
  document.getElementById("faction-label").textContent = faction?.name || "—";
  document.getElementById("class-label").textContent = `${role}${state.rebirths ? ` · 轉生${state.rebirths}` : ""}`;
  document.getElementById("profile-faction").textContent = faction ? `${faction.name}勢力 · ${role} · 隸屬${superior}` : "尚未選擇勢力";
  document.getElementById("level-value").textContent = state.level;
  document.getElementById("profile-level").textContent = state.level;
  document.getElementById("rank-label").textContent = ranks[state.rank]?.name || "布衣";
  document.getElementById("xp-fill").style.width = `${progress}%`;
  document.getElementById("xp-label").textContent = state.level >= 200 ? "已滿級 · 可轉生" : `${state.xp} / ${xpNeeded()}`;
  document.getElementById("attack-value").textContent = effectiveAttack();
  document.getElementById("hp-value").textContent = `${state.heroHp.toLocaleString()} / ${hp.toLocaleString()}`;
  document.getElementById("profile-hp").textContent = `${state.heroHp.toLocaleString()} / ${hp.toLocaleString()}`;
  document.getElementById("profile-mp").textContent = `${mp.toLocaleString()} / ${mp.toLocaleString()}`;
  document.getElementById("hp-fill").style.width = `${Math.max(0, state.heroHp / hp * 100)}%`;
  document.getElementById("mp-fill").style.width = "100%";
  document.getElementById("points-value").textContent = `${state.points} 點`;
  document.getElementById("allocate-button").classList.toggle("has-points", state.points > 0);
  document.getElementById("retinue-count").textContent = superior || "尚未選擇";
  document.getElementById("superior-level").textContent = getSuperiorLevel();
  document.getElementById("superior-items").textContent = getItemCount("commander-seal");
  document.getElementById("army-count").textContent = totalAllies;
  document.getElementById("enemy-count").textContent = Math.max(0, 5 - state.kills % 5);
  const region = regions.find(([name]) => name === state.region) || regions[0];
  document.getElementById("banner-text").textContent = `${state.region} · 挑戰建議 Lv.${region[1]} 起`;
  document.getElementById("banner-symbol").textContent = faction?.name || "群";
  document.getElementById("battlefield").dataset.terrain = region[3];
  document.getElementById("battlefield").dataset.faction = state.hero?.faction || "";
  document.getElementById("sound-button").classList.toggle("sound-on", state.sound);
  updateSpeedButton();
  document.getElementById("roster-list").innerHTML = allies.length ? allies.map((name) => `<div class="roster-entry"><div class="roster-face">${portraitMarkup(name, "general")}</div><div class="roster-copy"><strong>${escapeHtml(name)}</strong><small>${officerData[name][0]} · ${escapeHtml(officerData[name][1])}</small></div><span class="roster-badge">Lv.${getSuperiorLevel()}</span></div>`).join("") : `<div class="roster-entry"><div class="roster-face">＋</div><div class="roster-copy"><strong>選擇效忠主將</strong><small>加入一方陣營，與主將並肩征戰</small></div></div>`;
  const remainingEnemies = Math.max(0, 5 - (state.kills % 5));
  document.getElementById("battle-units").innerHTML = [
    ...(state.hero ? [
      { name: state.hero.name, type: "hero", gender: heroGender, currentHp: state.heroHp, maxHp: hp },
      ...allies.map((name) => ({ name, type: "general", currentHp: state.superiorHp, maxHp: superiorMaxHp() })),
      ...state.troops.map((troop, index) => ({ name: troop.name, type: "troop", index, currentHp: troop.currentHp, maxHp: troop.hp }))
    ] : []),
    ...Array.from({ length: remainingEnemies }, (_, index) => ({ name: enemies[(state.wave + index - 1) % enemies.length], type: "enemy", index }))
  ].slice(0, 10).map((unit) => {
    if (unit.type !== "enemy") {
      const hpPercent = Math.max(0, Math.min(100, unit.currentHp / unit.maxHp * 100));
      const down = unit.currentHp <= 0;
      return `<div class="battle-unit ally${down ? " defeated" : ""}" data-unit="${unit.type}"><div class="unit-portrait">${portraitMarkup(unit.name, unit.type, unit.gender)}</div><span class="unit-name">${escapeHtml(unit.name)}</span><div class="unit-hp"><span style="width:${hpPercent}%"></span></div><span class="unit-hp-label">${down ? "倒下" : `${unit.currentHp.toLocaleString()} / ${unit.maxHp.toLocaleString()}`}</span><div class="unit-shadow"></div></div>`;
    }
    const maxHp = enemyMaxHp();
    const currentHp = unit.index === 0 ? state.enemyHp : maxHp;
    const hpPercent = Math.max(0, Math.min(100, currentHp / maxHp * 100));
    return `<div class="battle-unit enemy" data-unit="enemy" data-enemy-index="${unit.index}"><div class="unit-portrait">${portraitMarkup(unit.name, "enemy")}</div><span class="unit-name">${escapeHtml(unit.name)}</span><div class="unit-hp"><span style="width:${hpPercent}%"></span></div><span class="unit-hp-label">${currentHp.toLocaleString()} / ${maxHp.toLocaleString()}</span><div class="unit-shadow"></div></div>`;
  }).join("");
  document.getElementById("status-label").textContent = state.hero ? "交鋒中" : "等待主將";
  renderLog();
}

const battleLog = [];
function addLog(message, tone = "") {
  battleLog.unshift({ time: new Date().toLocaleTimeString("zh-TW", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), message, tone });
  if (battleLog.length > 30) battleLog.pop();
  renderLog();
}
function renderLog() {
  const el = document.getElementById("battle-log");
  if (!el) return;
  el.innerHTML = battleLog.slice(0, 16).map((entry) => `<div class="log-entry"><time>${entry.time}</time><span class="${entry.tone}">${entry.message}</span></div>`).join("") || '<div class="log-entry"><time>待命</time><span>軍情戰報將記錄征戰詳情。</span></div>';
}

function enemyAttack() {
  const party = [
    { name: state.hero.name, get hp() { return state.heroHp; }, set hp(value) { state.heroHp = value; }, maxHp: maxHp() },
    { name: getSuperior(), get hp() { return state.superiorHp; }, set hp(value) { state.superiorHp = value; }, maxHp: superiorMaxHp() },
    ...state.troops.map((troop) => ({ name: troop.name, get hp() { return troop.currentHp; }, set hp(value) { troop.currentHp = value; }, maxHp: troop.hp }))
  ].filter((unit) => unit.hp > 0);
  if (!party.length) return false;

  const target = party[Math.floor(Math.random() * party.length)];
  const recommendedLevel = regions.find(([name]) => name === state.region)?.[1] || 1;
  const damage = Math.max(1, Math.round(recommendedLevel * 1.25 + Math.min(state.wave, 20) * 2 + Math.random() * 3));
  target.hp = Math.max(0, target.hp - damage);
  addLog(`<b>${escapeHtml(enemies[(state.wave - 1) % enemies.length])}</b>反擊我軍，對<b>${escapeHtml(target.name)}</b>造成 ${damage} 點傷害（剩餘 ${target.hp.toLocaleString()} / ${target.maxHp.toLocaleString()}）。`);

  const partyDefeated = state.heroHp <= 0 && state.superiorHp <= 0 && state.troops.every((troop) => troop.currentHp <= 0);
  if (partyDefeated) {
    const currentRegionIndex = regions.findIndex(([name]) => name === state.region);
    let retryLabel = `重新挑戰${state.region}第一隊`;
    if (state.wave > 1) {
      state.wave -= 1;
      state.kills = (state.wave - 1) * 5;
      retryLabel = `退回${state.region}第 ${state.wave} 隊`;
    } else if (currentRegionIndex > 0) {
      state.region = regions[currentRegionIndex - 1][0];
      state.wave = 1;
      state.kills = 0;
      retryLabel = `退回${state.region}`;
    }
    state.enemyHp = enemyMaxHp();
    restorePartyHealth();
    addLog(`<b>全軍敗退！</b>${retryLabel}重新挑戰，並恢復全軍氣血。`, "log-highlight");
    showToast(`戰敗！${retryLabel}，全軍氣血回滿。`);
    return true;
  }
  return false;
}

function advanceBattle() {
  if (!state.hero) return;
  const target = document.querySelector(".enemy");
  if (!target) return;
  const value = Math.max(1, effectiveAttack() + state.troops.reduce((sum, troop) => sum + troop.atk, 0) + Math.floor(Math.random() * 8) - 2);
  const float = document.createElement("span");
  float.className = `damage-float${Math.random() > .9 ? " crit" : ""}`;
  float.textContent = `-${value}`;
  const enemyName = target.querySelector(".unit-name").textContent;
  playHit();
  state.enemyHp = Math.max(0, state.enemyHp - value);
  let waveCleared = false;
  if (state.enemyHp > 0) {
    addLog(`我軍攻擊<b>${escapeHtml(enemyName)}</b>，造成 <span class="log-highlight">${value} 點傷害</span>（剩餘 ${state.enemyHp.toLocaleString()} / ${enemyMaxHp().toLocaleString()}）。`);
  } else {
    state.kills += 1;
    state.gold += 2 + Math.floor(Math.random() * 4);
    state.merit += 1;
    const exp = state.level < 200 ? 2 + Math.floor(Math.random() * 5) : 0;
    state.xp += exp;
    addLog(`我軍擊敗<b>${escapeHtml(enemyName)}</b>，${exp ? `獲得 <span class="log-highlight">${exp} 點經驗</span>與銅錢。` : "已達 Lv.200，未取得經驗；可前往轉生。"} `);
    if (state.kills % 5 === 0) {
      state.wave += 1;
      restorePartyHealth();
      waveCleared = true;
      addLog(`<b>敵軍全數擊退！</b>第 ${state.wave - 1} 隊伏兵已清，下一隊敵軍現身；全軍氣血回滿。`, "log-highlight");
    }
    state.enemyHp = enemyMaxHp();
  }
  if (!waveCleared) enemyAttack();
  while (state.level < 200 && state.xp >= xpNeeded()) {
    state.xp -= xpNeeded();
    state.level += 1;
    state.points += 5;
    addLog(`<b class="log-highlight">升級！</b>升至 Lv.${state.level}，獲得 5 點自由屬性點。`, "log-highlight");
  }
  if (state.level >= 200) state.xp = 0;
  render();
  const updatedEnemy = document.querySelector(".enemy");
  if (updatedEnemy) updatedEnemy.append(float);
  saveGame();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2300);
}

function openModal(tab = "main") {
  modalTab = tab;
  document.getElementById("modal-backdrop").classList.remove("hidden");
  renderModal();
  document.getElementById("modal-close").focus();
}
function closeModal() {
  if (!state.hero && document.getElementById("modal-backdrop").classList.contains("hidden")) return;
  if (!state.hero && modalTab === "creation") return;
  document.getElementById("modal-backdrop").classList.add("hidden");
}

function renderModal() {
  const host = document.getElementById("modal-content");
  if (!state.hero) {
    renderCreation(host);
    return;
  }
  const tabs = { details: "人物詳細", equipment: "裝備／馬匹", rank: "官階晉升", troops: "兵種訓練", store: "軍需商店", map: "行軍地圖", roster: "所屬主將" };
  const title = tabs[modalTab] || "軍營政務";
  let body = "";
  if (modalTab === "details") body = detailsContent();
  else if (modalTab === "equipment") body = equipmentContent();
  else if (modalTab === "rank") body = rankContent();
  else if (modalTab === "troops") body = troopsContent();
  else if (modalTab === "store") body = storeContent();
  else if (modalTab === "map") body = mapContent();
  else if (modalTab === "roster") body = rosterContent();
  else body = homeContent();
  host.innerHTML = `<h2 id="modal-title">${title}</h2><p class="modal-lede">${modalTab === "map" ? "選擇行軍地點；建議達到關卡等級後再出征。" : "整備軍備、追隨主將，為逐鹿中原做好準備。"}</p>${modalTab !== "main" ? `<div class="tab-row">${Object.entries(tabs).map(([key, label]) => `<button class="tab-button ${modalTab === key ? "active" : ""}" data-tab="${key}">${label}</button>`).join("")}</div>` : ""}${body}`;
}

function renderCreation(host) {
  modalTab = "creation";
  host.innerHTML = `<h2 id="modal-title">建立你的亂世傳奇</h2><p class="modal-lede">你將加入一位武將的麾下，與主將並肩征戰；效忠勢力與主將之後都可以更換。</p>
    <label class="form-label" for="hero-name">主將姓名</label><input class="modal-input" id="hero-name" maxlength="10" placeholder="輸入你的名字" value="">
    <span class="form-label">選擇性別</span><div class="choice-grid gender-choices"><button class="choice-card selected" data-choice-group="gender" data-choice="female"><span class="choice-symbol">女</span><span class="choice-copy"><strong>女將</strong><small>巾幗不讓鬚眉</small></span></button><button class="choice-card" data-choice-group="gender" data-choice="male"><span class="choice-symbol">男</span><span class="choice-copy"><strong>男將</strong><small>揮戈定鼎中原</small></span></button></div>
    <span class="form-label">選擇出身</span><div class="choice-grid role-choices"><button class="choice-card selected" data-choice-group="role" data-choice="general"><span class="choice-symbol">⚔</span><span class="choice-copy"><strong>武將</strong><small>驍勇善戰，近身強攻</small></span></button><button class="choice-card" data-choice-group="role" data-choice="strategist"><span class="choice-symbol">▤</span><span class="choice-copy"><strong>軍師</strong><small>運籌帷幄，法術傷害</small></span></button></div>
    <label class="form-label" for="hero-faction">選擇效忠國家</label><select class="modal-select" id="hero-faction"><option value="Wei">魏國 · 雄據北方</option><option value="Shu">蜀國 · 志在興漢</option><option value="Wu">吳國 · 坐鎮江東</option><option value="Jin">晉國 · 天下終歸</option></select>
    <label class="form-label" for="hero-superior">選擇投靠主將</label><select class="modal-select" id="hero-superior"></select>
    <button class="modal-primary" id="create-hero">投靠主將 · 開始征戰</button><p class="modal-note">每次升級獲得 5 點自由屬性點；力量、敏捷、智力、體力皆可自行分配。進度會自動保存在此瀏覽器。</p>`;
  const factionSelect = host.querySelector("#hero-faction");
  const superiorSelect = host.querySelector("#hero-superior");
  const updateSuperiors = () => {
    superiorSelect.innerHTML = factions[factionSelect.value].leaders.map((name) => `<option value="${name}">${name} · ${officerData[name][0]} · ${officerData[name][1]}</option>`).join("");
  };
  factionSelect.addEventListener("change", updateSuperiors);
  updateSuperiors();
  host.querySelectorAll("[data-choice-group]").forEach((button) => button.addEventListener("click", () => {
    host.querySelectorAll(`[data-choice-group="${button.dataset.choiceGroup}"]`).forEach((other) => other.classList.remove("selected"));
    button.classList.add("selected");
  }));
  host.querySelector("#create-hero").addEventListener("click", () => {
    const name = host.querySelector("#hero-name").value.trim() || "無名俠客";
    state.level = 1;
    state.xp = 0;
    state.points = 0;
    state.rebirths = 0;
    state.hero = { name, gender: host.querySelector('[data-choice-group="gender"].selected')?.dataset.choice || "female", role: host.querySelector('[data-choice-group="role"].selected')?.dataset.choice || "general", faction: factionSelect.value, superior: superiorSelect.value };
    state.superiorLevels[state.hero.superior] ||= 1;
    restorePartyHealth();
    addLog(`<b>${escapeHtml(name)}</b>投靠${state.hero.superior}，加入${factions[state.hero.faction].name}軍。`, "log-highlight");
    render();
    saveGame();
    closeModal();
    startBattleTimer();
    showToast(`${name}，你已投靠${state.hero.superior}！`);
  });
}

function homeContent() {
  return `<div class="choice-grid"><button class="choice-card" data-tab="details"><span class="choice-symbol">▤</span><span class="choice-copy"><strong>分配屬性</strong><small>尚有 ${state.points} 點屬性點</small></span></button><button class="choice-card" data-tab="roster"><span class="choice-symbol">♟</span><span class="choice-copy"><strong>選擇所屬主將</strong><small>${getSuperior()} · Lv.${getSuperiorLevel()}</small></span></button><button class="choice-card" data-tab="troops"><span class="choice-symbol">⚑</span><span class="choice-copy"><strong>訓練兵種</strong><small>配置士兵並購買道具進階</small></span></button><button class="choice-card" data-tab="map"><span class="choice-symbol">⌖</span><span class="choice-copy"><strong>中原地圖</strong><small>探索 ${regions.length} 個征戰區域</small></span></button></div><p class="modal-note">閒置期間會繼續自動戰鬥。士兵每次最多五名，敵軍五名全數擊敗後才刷新。</p>`;
}

const statDefs = [
  ["strength", "力量", "每點 +1 攻擊力"], ["agility", "敏捷", "每點 +1 閃避"], ["intelligence", "智力", "每點 +1 法術傷害"],
  ["vitality", "體力", "每點 +50 氣血、+50 內力"]
];
function detailsContent() {
  const rebirthReady = state.level >= 200;
  const allocatedPoints = statDefs.reduce((sum, [key]) => sum + Math.max(0, state.stats[key] - 10), 0);
  return `<div class="points-banner">可分配屬性點：<b>${state.points}</b>　｜　現有攻擊 ${effectiveAttack()}・氣血 ${maxHp()}・內力 ${maxMp()}</div><div class="stat-list">${statDefs.map(([key, label, note]) => `<div class="stat-row"><div><strong>${label}</strong><small>${note}</small></div><div class="stat-controls"><span class="stat-value">${state.stats[key]}</span><button data-stat="${key}" ${state.points <= 0 ? "disabled" : ""}>＋</button></div></div>`).join("")}</div><div class="rebirth-panel"><strong>重置屬性</strong><small>支付 500,000 銅錢，將已分配的 ${allocatedPoints} 點屬性退回自由點；不會影響未分配點數、角色等級或轉生紀錄。</small><button class="officer-action" data-reset-stats ${state.gold < 500000 || allocatedPoints === 0 ? "disabled" : ""}>${allocatedPoints === 0 ? "目前沒有已分配點數" : `花費 500,000 銅錢重置`}</button></div><div class="rebirth-panel"><strong>轉生</strong><small>需角色 Lv.200。轉生後等級回到 Lv.1、重置經驗，並獲得 50 點自由屬性點；現有屬性、裝備、銅錢與主將進度保留。已轉生 ${state.rebirths} 次。</small><button class="officer-action" data-rebirth ${rebirthReady ? "" : "disabled"}>${rebirthReady ? "轉生並獲得 50 點" : `需達 Lv.200（目前 Lv.${state.level}）`}</button></div><p class="modal-note">升級所需經驗已調高，升級速度較先前緩慢。敏捷提供閃避能力；戰鬥傷害與總攻擊力均依實際配點計算。</p>`;
}
function equipmentContent() {
  const mount = getEquippedMount();
  const role = isStrategist() ? "strategist" : "general";
  const ownedGear = equipmentStock.filter((item) => state.items.includes(item.id) && (item.role || "general") === role);
  const equippedWeapon = equipmentStock.find((item) => item.id === equippedWeaponId());
  const equippedArmor = equipmentStock.find((item) => item.id === equippedArmorId());
  const ownedMounts = mountStock.filter((item) => state.items.includes(item.id));
  return `<div class="points-banner">目前職業：<b>${isStrategist() ? "智將" : "武將"}</b>。兩種職業各有專屬的 21 階武器與防具；武將使用力量加成，智將使用智力加成。</div><div class="stat-list"><div class="stat-row"><div><strong>裝備中的${isStrategist() ? "智將法器" : "武將武器"}</strong><small>${equippedWeapon?.name || "尚未裝備"}</small></div><span class="stat-value">+${weaponBonus()}</span></div><div class="stat-row"><div><strong>裝備中的${isStrategist() ? "智將法衣" : "武將防具"}</strong><small>${equippedArmor?.name || "尚未裝備"}</small></div><span class="stat-value">+${armorBonus()}</span></div><div class="stat-row"><div><strong>裝備中的馬匹</strong><small>${mount?.name || "尚未裝備"}</small></div><span class="stat-value">攻擊 +${mountBonus()}・氣血 +${mountHpBonus()}</span></div></div><h3 class="shop-section-title">${isStrategist() ? "智將專屬法器與法衣" : "武將專屬武器與防具"}</h3><div class="officer-list">${ownedGear.map((item) => `<div class="shop-card"><span class="menu-symbol ${item.type === "武器" ? "symbol-gold" : "symbol-blue"}">${item.type === "武器" ? "⚔" : "◈"}</span><div class="shop-copy"><strong>${item.name}</strong><small>${item.desc}</small></div><button class="officer-action" data-equip="${item.id}">${equippedWeaponId() === item.id || equippedArmorId() === item.id ? "已裝備" : "裝備"}</button></div>`).join("") || `<div class="empty-state">尚未購買${isStrategist() ? "智將法器或法衣" : "武將武器或防具"}，前往軍需商店添購。</div>`}</div><h3 class="shop-section-title">馬匹</h3><div class="officer-list">${ownedMounts.map((item) => `<div class="shop-card"><span class="menu-symbol symbol-gold">馬</span><div class="shop-copy"><strong>${item.name}</strong><small>${item.desc}</small></div><button class="officer-action" data-equip="${item.id}">${state.equippedMount === item.id ? "已裝備" : "上馬"}</button></div>`).join("") || '<div class="empty-state">尚未購買馬匹，前往馬匹分類選購良駒。</div>'}</div><button class="modal-secondary" data-tab="store">前往軍需商店</button>`;
}
function rankContent() {
  const currentRank = ranks[state.rank];
  return `<div class="points-banner">官階共 ${ranks.length} 階（含初始官階），逐階晉升並消耗銅錢。當前官階：<b>${currentRank.name}</b>（${state.rank + 1}/${ranks.length}）　全軍攻擊加成 +${currentRank.bonus}</div><div class="stat-list">${ranks.map((rank, index) => `<div class="stat-row"><div><strong>${rank.name}${index === state.rank ? " · 當前" : ""}</strong><small>${index === 0 ? "初入亂世" : `全軍攻擊力 +${rank.bonus}`}</small></div>${index < state.rank ? '<span class="stat-value">已晉升</span>' : index === state.rank ? '<span class="stat-value">現職</span>' : `<button class="officer-action" data-rank="${index}" data-cost="${rank.cost}" ${index !== state.rank + 1 ? "disabled" : ""}>${rank.cost.toLocaleString()} 銅錢</button>`}</div>`).join("")}</div>`;
}
function troopsContent() {
  const pills = getItemCount("evolution-pill");
  return `<div class="points-banner">目前配置士兵 ${state.troops.length} 名（上限 5）。士兵進階需購買精製進化丹，目前持有 ${pills} 枚。</div><div class="unit-list">${state.troops.map((troop, index) => `<div class="unit-card"><span class="officer-avatar">${portraitMarkup(troop.name, "troop")}</span><div class="officer-copy"><strong>${troop.name} · 進階 ${troop.level}</strong><small>攻擊 +${troop.atk} · 氣血 ${troop.currentHp}/${troop.hp}</small></div><button class="officer-action" data-evolve="${index}" ${pills === 0 ? "disabled" : ""}>${pills ? "使用進化丹" : "需進化丹"}</button><button class="officer-action troop-dismiss" data-dismiss-troop="${index}">脫離</button></div>`).join("")}</div>${state.troops.length === 0 ? '<div class="empty-state" style="margin-bottom:9px">軍中尚無士兵。於商店招募基礎兵種，再購買精製進化丹進階。</div>' : ""}<button class="modal-secondary" data-tab="store">前往商店招募兵種／購買進化道具</button><p class="modal-note">最多配置 5 名士兵；士兵進化每階提升 2 攻擊與 15 氣血。</p>`;
}
function storeContent() {
  const gear = equipmentStock;
  const renderGear = (items) => items.map((item) => {
    const owned = state.items.includes(item.id);
    const locked = state.level < item.levelReq;
    const userRole = item.role === "strategist" ? "智將" : "武將";
    return `<div class="shop-card"><span class="menu-symbol ${item.type === "武器" ? "symbol-gold" : "symbol-blue"}">${item.type === "武器" ? "⚔" : "◈"}</span><div class="shop-copy"><strong>${item.name} <span class="quiet-note">· ${userRole}${item.type} Lv.${item.levelReq}</span></strong><small>${item.desc}</small></div><button class="officer-action" data-buy-item="${item.id}" data-cost="${item.cost}" ${owned || locked ? "disabled" : ""}>${owned ? "已購買" : locked ? `需 Lv.${item.levelReq}` : `◇ ${item.cost}`}</button></div>`;
  }).join("");
  return `<p class="points-banner">武將、智將各有專屬的 21 階武器與防具（Lv.1–200）；馬匹亦完整展示 21 階。請依職業選擇裝備，未解鎖商品會標示需求等級。</p><nav class="store-category-nav" aria-label="軍需分類">${[["store-weapons", "武器"], ["store-armor", "防具"], ["store-mounts", "馬匹"], ["store-troops", "兵種"], ["store-items", "培養道具"], ["store-merit", "戰功商店"]].map(([id, label]) => `<button class="store-category-button" data-store-category="${id}">${label}</button>`).join("")}</nav><section class="store-category" id="store-weapons"><h3 class="shop-section-title">武將武器｜Lv.1–200</h3><div class="shop-list">${renderGear(gear.filter((item) => item.type === "武器" && item.role !== "strategist"))}</div><h3 class="shop-section-title">智將法器｜Lv.1–200</h3><div class="shop-list">${renderGear(gear.filter((item) => item.type === "武器" && item.role === "strategist"))}</div></section><section class="store-category" id="store-armor"><h3 class="shop-section-title">武將防具｜Lv.1–200</h3><div class="shop-list">${renderGear(gear.filter((item) => item.type === "防具" && item.role !== "strategist"))}</div><h3 class="shop-section-title">智將法衣｜Lv.1–200</h3><div class="shop-list">${renderGear(gear.filter((item) => item.type === "防具" && item.role === "strategist"))}</div></section><section class="store-category" id="store-mounts"><h3 class="shop-section-title">馬匹｜Lv.1–200</h3><div class="shop-list">${mountStock.map((item) => {
    const owned = state.items.includes(item.id);
    const locked = state.level < item.levelReq;
    return `<div class="shop-card"><span class="menu-symbol symbol-gold">馬</span><div class="shop-copy"><strong>${item.name} <span class="quiet-note">· 馬匹 Lv.${item.levelReq}</span></strong><small>${item.desc}</small></div><button class="officer-action" data-buy-item="${item.id}" data-cost="${item.cost}" ${owned || locked ? "disabled" : ""}>${owned ? "已購買" : locked ? `需 Lv.${item.levelReq}` : `◇ ${item.cost}`}</button></div>`;
  }).join("")}</div></section><section class="store-category" id="store-troops"><h3 class="shop-section-title">兵種</h3><div class="shop-list">${troopTypes.map((troop) => {
    const locked = state.level < troop.levelReq;
    return `<div class="shop-card"><span class="officer-avatar">${portraitMarkup(troop.name, "troop")}</span><div class="shop-copy"><strong>徵募${troop.name} <span class="quiet-note">· Lv.${troop.levelReq}</span></strong><small>${troop.desc} 攻擊 +${troop.atk} · 氣血 +${troop.hp}</small></div><button class="officer-action" data-buy-troop="${troop.name}" data-cost="${troop.cost}" ${state.troops.length >= 5 || locked ? "disabled" : ""}>${locked ? `需 Lv.${troop.levelReq}` : `◇ ${troop.cost}`}</button></div>`;
  }).join("")}</div></section><section class="store-category" id="store-items"><h3 class="shop-section-title">培養道具</h3><div class="shop-list">${upgradeItems.map((item) => `<div class="shop-card"><span class="menu-symbol symbol-purple">✦</span><div class="shop-copy"><strong>${item.name}</strong><small>${item.desc}　持有 ${getItemCount(item.id)} 枚</small></div><button class="officer-action" data-buy-item="${item.id}" data-cost="${item.cost}">◇ ${item.cost}</button></div>`).join("")}</div></section><section class="store-category" id="store-merit"><div class="points-banner">目前持有 <b>${state.merit.toLocaleString()}</b> 點戰功。擊敗敵人可獲得戰功，兌換的培養道具也可在一般軍需商店以銅錢購買。</div><h3 class="shop-section-title">戰功兌換</h3><div class="shop-list">${meritShopStock.map((item) => `<div class="shop-card"><span class="menu-symbol symbol-purple">✦</span><div class="shop-copy"><strong>${item.name} <span class="quiet-note">· ${item.meritCost} 戰功</span></strong><small>${item.desc}　持有 ${getItemCount(item.id)} 枚</small></div><button class="officer-action" data-buy-merit="${item.id}" ${state.merit < item.meritCost ? "disabled" : ""}>${state.merit < item.meritCost ? `需 ${item.meritCost} 戰功` : `✦ ${item.meritCost} 戰功`}</button></div>`).join("")}</div></section><p class="modal-note">銅錢由擊敗敵軍獲得；主將升級與士兵進階可使用銅錢或戰功購買對應道具。未解鎖兵種亦會顯示需求等級。</p>`;
}
function mapContent() {
  const faction = getFaction();
  return `<div class="map-wrap"><p class="map-hint">中原逐鹿 · 點選已解鎖的關卡即可行軍　｜　目前 Lv.${state.level}</p><div class="map-regions">${regions.map(([name, level, desc]) => `<button class="region-button ${state.region === name ? "active" : ""}" data-region="${name}" data-level="${level}" ${state.level < level ? "disabled" : ""}><strong>${name}</strong><small>Lv.${level} · ${state.level < level ? "尚未解鎖" : desc}</small></button>`).join("")}</div></div><p class="modal-note">二十四處關卡涵蓋平原、山道、關隘、水寨與城郭。抵達建議等級即可解鎖征戰地；戰場景觀會隨地形變化。軍旗：${faction.name}。</p>`;
}
function rosterContent() {
  const faction = getFaction();
  const pool = faction.leaders;
  const level = getSuperiorLevel();
  const upgradeCount = getItemCount("commander-seal");
  return `<div class="points-banner">你目前效忠 <b>${faction.name}勢力</b>，所屬主將為 <b>${getSuperior()}</b>（Lv.${level}）。可隨時改投其他國家或主將。</div><span class="form-label">選擇效忠國家</span><div class="faction-choice-grid">${Object.entries(factions).map(([key, entry]) => `<button class="faction-choice ${state.hero.faction === key ? "selected" : ""}" data-faction="${key}">${entry.name}國${state.hero.faction === key ? " · 效忠中" : ""}</button>`).join("")}</div><div class="officer-list" style="margin-top:10px">${pool.map((name, index) => { const [kind, skill, str, agi, int, vit] = officerData[name]; const current = getSuperior() === name; return `<div class="officer-card"><div class="officer-avatar officer-${index}">${portraitMarkup(name, "general")}</div><div class="officer-copy"><strong>${name} <span class="quiet-note">· ${kind}</span></strong><small>${skill}　力 ${str}・敏 ${agi}・智 ${int}・體 ${vit}</small></div><button class="officer-action" data-join-leader="${name}" ${current ? "disabled" : ""}>${current ? "所屬主將" : "投靠"}</button></div>`; }).join("")}</div><div class="superior-upgrade"><div><strong>提升主將等級</strong><small>消耗主將兵符；每級增加主將帶來的攻擊加成。持有 ${upgradeCount} 枚</small></div><button class="officer-action" data-upgrade-superior ${level >= 20 || upgradeCount === 0 ? "disabled" : ""}>${level >= 20 ? "已達上限" : "使用兵符升級"}</button></div><button class="modal-secondary" data-tab="store">前往軍需商店購買主將兵符</button><p class="modal-note">各主將的培養等級分別保存；改投他人後再回來，仍保留原有等級。改換國家與投靠主將不收取費用。</p>`;
}

function playHit() {
  if (!state.sound) return;
  try {
    audioContext ||= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(190, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(76, audioContext.currentTime + .11);
    gain.gain.setValueAtTime(.055, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .12);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .12);
  } catch (error) {
    console.warn("無法播放戰鬥音效：", error);
    state.sound = false;
    render();
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.id === "reset-game") {
    if (!window.confirm("確定重置全部遊戲紀錄？角色、等級、裝備、銅錢和戰功都會刪除，且無法復原。")) return;
    try {
      localStorage.removeItem("qunxiong-idle-save");
      window.location.reload();
    } catch (error) {
      console.error("無法重置遊戲紀錄：", error);
      showToast("重置失敗，瀏覽器不允許清除本機存檔。");
    }
    return;
  }
  if (target.dataset.action) {
    if (!state.hero) { openModal(); return; }
    openModal(target.dataset.action);
    return;
  }
  if (target.dataset.tab) { modalTab = target.dataset.tab; renderModal(); return; }
  if (target.dataset.storeCategory) {
    document.getElementById(target.dataset.storeCategory)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (target.dataset.rebirth !== undefined) {
    if (state.level < 200) { showToast("角色需達 Lv.200 才能轉生。"); return; }
    if (!window.confirm(`確定進行第 ${state.rebirths + 1} 次轉生？等級與經驗將重置，獲得 50 點自由屬性點；其他進度保留。`)) return;
    state.rebirths += 1;
    state.level = 1;
    state.xp = 0;
    state.points += 50;
    state.region = regions[0][0];
    state.wave = 1;
    state.kills = 0;
    addLog(`<b class="log-highlight">轉生成功！</b>第 ${state.rebirths} 次轉生，獲得 50 點自由屬性點。`, "log-highlight");
    render(); saveGame(); renderModal();
    showToast(`轉生成功！獲得 50 點自由屬性點（累計轉生 ${state.rebirths} 次）。`);
    return;
  }
  if (target.dataset.resetStats !== undefined) {
    const allocatedPoints = statDefs.reduce((sum, [key]) => sum + Math.max(0, state.stats[key] - 10), 0);
    const resetCost = 500000;
    if (allocatedPoints <= 0) { showToast("目前沒有已分配的屬性點可重置。"); return; }
    if (state.gold < resetCost) { showToast("銅錢不足，屬性重置需要 500,000 銅錢。"); return; }
    if (!window.confirm(`確定花費 500,000 銅錢重置屬性？${allocatedPoints} 點已分配屬性將退回自由點。`)) return;
    state.gold -= resetCost;
    state.points += allocatedPoints;
    state.stats = { strength: 10, agility: 10, intelligence: 10, vitality: 10 };
    addLog(`支付 500,000 銅錢重置屬性，取回 ${allocatedPoints} 點自由屬性點。`, "log-highlight");
    render(); saveGame(); renderModal();
    showToast(`屬性已重置，取回 ${allocatedPoints} 點自由屬性。`);
    return;
  }
  if (target.dataset.faction) {
    const factionKey = target.dataset.faction;
    if (!factions[factionKey] || !state.hero) return;
    state.hero.faction = factionKey;
    state.hero.superior = factions[factionKey].leaders[0];
    state.superiorLevels[state.hero.superior] ||= 1;
    state.superiorHp = superiorMaxHp();
    addLog(`你改投${factions[factionKey].name}，加入${state.hero.superior}麾下。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.joinLeader) {
    const name = target.dataset.joinLeader;
    if (!getFaction()?.leaders.includes(name)) return;
    state.hero.superior = name;
    state.superiorLevels[name] ||= 1;
    state.superiorHp = superiorMaxHp();
    addLog(`你改投<b>${name}</b>麾下，繼續並肩征戰。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.upgradeSuperior !== undefined) {
    if (getSuperiorLevel() >= 20) { showToast("主將已達最高 20 級。"); return; }
    const sealIndex = state.items.indexOf("commander-seal");
    if (sealIndex < 0) { showToast("缺少主將兵符，請先到軍需商店購買。"); return; }
    state.items.splice(sealIndex, 1);
    state.superiorLevels[getSuperior()] = getSuperiorLevel() + 1;
    addLog(`<b>${getSuperior()}</b>使用主將兵符升至 Lv.${getSuperiorLevel()}，攻擊加成提升。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.stat) {
    const key = target.dataset.stat;
    if (state.points > 0) {
      state.stats[key] += 1;
      state.points -= 1;
      render();
      saveGame();
      renderModal();
    }
    return;
  }
  if (target.dataset.buyMerit) {
    const item = meritShopStock.find((entry) => entry.id === target.dataset.buyMerit);
    if (!item) { showToast("找不到此戰功兌換品，請重新開啟戰功商店。"); return; }
    if (state.merit < item.meritCost) { showToast(`戰功不足，兌換${item.name}需要 ${item.meritCost} 點戰功。`); return; }
    state.merit -= item.meritCost;
    state.items.push(item.id);
    addLog(`以 ${item.meritCost} 點戰功兌換<b>${item.name}</b>。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.buyItem) {
    const id = target.dataset.buyItem;
    const cost = Number(target.dataset.cost);
    const item = equipmentStock.find((entry) => entry.id === id);
    const mount = mountStock.find((entry) => entry.id === id);
    const upgradeItem = upgradeItems.find((entry) => entry.id === id);
    const levelItem = item || mount;
    if (levelItem && state.level < levelItem.levelReq) { showToast(`角色需達 Lv.${levelItem.levelReq} 才能購買這件裝備。`); return; }
    if (levelItem && state.items.includes(id)) { showToast("這件裝備已在背包中。"); return; }
    if (!levelItem && !upgradeItem) { showToast("找不到此商品，請重新開啟軍需商店。"); return; }
    if (state.gold < cost) { showToast("銅錢不足，請多征戰積攢軍需。"); return; }
    state.gold -= cost;
    if (levelItem && !state.items.includes(id)) state.items.push(id);
    if (upgradeItem) state.items.push(id);
    addLog(`軍需官交付 <b>${levelItem?.name || upgradeItem?.name || "軍需道具"}</b>。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.buyTroop) {
    const troop = troopTypes.find((entry) => entry.name === target.dataset.buyTroop);
    const cost = Number(target.dataset.cost);
    if (!troop) { showToast("找不到此兵種，請重新開啟軍需商店。"); return; }
    if (state.level < troop.levelReq) { showToast(`角色需達 Lv.${troop.levelReq} 才能徵募此兵種。`); return; }
    if (state.troops.length >= 5) { showToast("兵種編制已滿，最多配置 5 名士兵。"); return; }
    if (state.gold < cost) { showToast("銅錢不足，無法徵募。"); return; }
    state.gold -= cost;
    state.troops.push({ ...troop, level: 1, currentHp: troop.hp });
    addLog(`徵募一名<b>${troop.name}</b>加入軍陣。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.dismissTroop !== undefined) {
    const index = Number(target.dataset.dismissTroop);
    const troop = state.troops[index];
    if (!troop) { showToast("找不到要解散的士兵，請重新整理編制。"); return; }
    if (!window.confirm(`確定解散${troop.name}？解散後不會退還徵募費用。`)) return;
    state.troops.splice(index, 1);
    addLog(`你解散了<b>${troop.name}</b>。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.evolve !== undefined) {
    const index = Number(target.dataset.evolve);
    const pillIndex = state.items.indexOf("evolution-pill");
    if (!state.troops[index]) { showToast("找不到要進階的士兵，請重新整理編制。"); return; }
    if (pillIndex < 0) { showToast("缺少精製士兵進化丹，請前往商店購買。"); return; }
    state.items.splice(pillIndex, 1);
    state.troops[index].level += 1; state.troops[index].atk += 2; state.troops[index].hp += 15; state.troops[index].currentHp += 15;
    addLog(`<b>${state.troops[index].name}</b>進化至第 ${state.troops[index].level} 階。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.equip) {
    const item = equipmentStock.find((entry) => entry.id === target.dataset.equip);
    const mount = mountStock.find((entry) => entry.id === target.dataset.equip);
    if (!item && !mount) { showToast("找不到這件裝備，請重新開啟裝備欄。"); return; }
    if (!state.items.includes(target.dataset.equip)) { showToast("尚未擁有這件裝備，請先前往商店購買。"); return; }
    if (item && (item.role || "general") !== (isStrategist() ? "strategist" : "general")) {
      showToast(`這件裝備是${item.role === "strategist" ? "智將" : "武將"}專用。`);
      return;
    }
    if (item?.type === "武器" && isStrategist()) state.equippedStrategistWeapon = item.id;
    else if (item?.type === "武器") state.equippedWeapon = item.id;
    else if (item && isStrategist()) state.equippedStrategistArmor = item.id;
    else if (item) state.equippedArmor = item.id;
    else if (mount) state.equippedMount = mount.id;
    addLog(`主將裝備<b>${item?.name || mount.name}</b>。`);
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.rank) {
    const rank = Number(target.dataset.rank);
    const cost = Number(target.dataset.cost);
    if (!Number.isInteger(rank) || rank < 0 || rank >= ranks.length) { showToast("官階資料有誤，請重新開啟官階頁面。"); return; }
    if (rank !== state.rank + 1) { showToast("請依官階順序逐階晉升。"); return; }
    if (state.gold < cost) { showToast("軍資不足，請繼續征戰。"); return; }
    state.gold -= cost; state.rank = rank;
    addLog(`主將晉升<b>${ranks[rank].name}</b>，全軍攻擊提升。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
  if (target.dataset.region) {
    const region = target.dataset.region;
    if (state.level < Number(target.dataset.level)) { showToast("主將等級不足，暫時無法前往此地。"); return; }
    state.region = region; state.wave = 1; state.kills = 0;
    state.enemyHp = enemyMaxHp();
    restorePartyHealth();
    addLog(`全軍開拔，前往<b>${region}</b>。`, "log-highlight");
    render(); saveGame(); renderModal(); return;
  }
});

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", (event) => { if (event.target.id === "modal-backdrop") closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.hero) closeModal(); });
document.getElementById("clear-log").addEventListener("click", () => { battleLog.length = 0; renderLog(); });
document.getElementById("sound-button").addEventListener("click", () => {
  state.sound = !state.sound;
  if (state.sound && "AudioContext" in window) audioContext ||= new AudioContext();
  render();
  saveGame();
  showToast(state.sound ? "已開啟原創戰鬥音效（非遊戲原曲）。" : "已關閉戰鬥音效。");
});
document.getElementById("speed-button").addEventListener("click", () => {
  state.speedMultiplier = state.speedMultiplier === 5 ? 1 : 5;
  startBattleTimer();
  updateSpeedButton();
  saveGame();
  showToast(`已切換為 ${state.speedMultiplier} 倍速。`);
});

render();
if (state.hero) {
  const awaySeconds = Math.min(3600, Math.max(0, Math.floor((Date.now() - state.lastSeen) / 1000)));
  const awayKills = Math.min(200, Math.floor(awaySeconds / 2));
  if (awayKills > 0) {
    const awayXp = state.level < 200 ? Math.round(awayKills * 4) : 0;
    state.gold += awayKills * 3;
    state.merit += awayKills;
    state.kills += awayKills;
    state.wave = Math.floor(state.kills / 5) + 1;
    state.enemyHp = enemyMaxHp();
    state.xp += awayXp;
    while (state.level < 200 && state.xp >= xpNeeded()) {
      state.xp -= xpNeeded();
      state.level += 1;
      state.points += 5;
      addLog(`離線征戰升至 Lv.${state.level}，獲得 5 點自由屬性點。`, "log-highlight");
    }
    if (state.level >= 200) state.xp = 0;
    addLog(`離線征戰 ${Math.floor(awaySeconds / 60)} 分鐘，擊敗 ${awayKills} 名敵軍，取得 ${awayXp} 點經驗與 ${awayKills * 3} 銅錢。`, "log-highlight");
    showToast(`離線征戰完成！擊敗 ${awayKills} 名敵軍。`);
    saveGame();
  }
  render();
  startBattleTimer();
} else {
  openModal();
  addLog("將軍，請建立角色並選擇效忠勢力。");
}
