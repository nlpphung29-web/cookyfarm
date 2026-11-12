'use strict';
/* =========================================================
   COOKY FARM · Mùa Giáng Sinh Đà Lạt Pastel 🌸🎄
   Cozy Pastel Farm & Life Sim — Long-term Progression Edition
   ========================================================= */
const W = 960, H = 640, T = 60, COLS = 8, ROWS = 4, FX = 236, FY = 246;
const DAYS = 30, SAVE = 'cookyFarm.pastel.v2';
const EMOJI = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
const FONT = '"Be Vietnam Pro",system-ui,sans-serif';
const $ = s => document.querySelector(s);
const cv = $('#cv'), ctx = cv.getContext('2d');
const rnd = (a, b) => a + Math.random() * (b - a), ri = (a, b) => Math.floor(rnd(a, b + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- Game Data ---------- */
const CROPS = {
  carrot:  { n: 'Cà rốt',       e: '🥕', seed: 5,  days: 2, price: 16, xp: 3 },
  cabbage: { n: 'Bắp cải',      e: '🥬', seed: 10, days: 3, price: 30, xp: 5 },
  sweet:   { n: 'Khoai mật',    e: '🍠', seed: 14, days: 3, price: 38, xp: 6 },
  tomato:  { n: 'Cà chua',      e: '🍅', seed: 16, days: 4, price: 48, xp: 7 },
  corn:    { n: 'Bắp sữa',      e: '🌽', seed: 22, days: 4, price: 60, xp: 8 },
  straw:   { n: 'Dâu Đà Lạt',   e: '🍓', seed: 42, days: 5, price: 58, regrow: 2, xp: 10 },
  snowfl:  { n: 'Hoa Tuyết',    e: '❄️', seed: 60, days: 5, price: 85, regrow: 3, fans: 12, xp: 14 },
  melon:   { n: 'Dưa lưới',     e: '🍈', seed: 75, days: 7, price: 220, xp: 20 },
};
const CK = Object.keys(CROPS);

const FISH = {
  carp:   { n: 'Cá chép hồng',  e: '🐟', price: 36, w: 40 },
  shrimp: { n: 'Tôm pha lê',    e: '🦐', price: 56, w: 30 },
  salmon: { n: 'Cá hồi Đà Lạt', e: '🍣', price: 82, w: 20 },
  star:   { n: 'Sao biển băng', e: '🌟', price: 145, w: 10, fans: 25 },
};
const FK = Object.keys(FISH);

const RECIPES = [
  { id: 'juice',  n: 'Sinh tố Cà rốt',    e: '🥤', req: { carrot: 2 }, price: 52, st: 45, fans: 5,  d: 'Uống hồi +45⚡ hoặc bán lời cao' },
  { id: 'roast',  n: 'Khoai mật nướng',   e: '🍯', req: { sweet: 2 },  price: 105, st: 65, fans: 10, d: 'Ấm bụng mùa đông: hồi +65⚡' },
  { id: 'cake',   n: 'Bánh kem Dâu Noel', e: '🍰', req: { straw: 2, corn: 1 }, price: 240, st: 80, fans: 35, d: 'Đặc sản Giáng Sinh +35💜 khi làm' },
  { id: 'hotpot', n: 'Lẩu Cá Hồi Đà Lạt', e: '🍲', req: { salmon: 1, cabbage: 1, tomato: 1 }, price: 270, st: 90, fans: 45, d: 'Nồi lẩu nghi ngút khói +45💜' },
  { id: 'tea',    n: 'Trà Hoa Tuyết',     e: '☕', req: { snowfl: 1, straw: 1 }, price: 350, st: 75, fans: 70, d: 'Thức uống viral khắp Đà Lạt +70💜' },
];

const PETS = [
  { id: 'chick', e: '🐥', n: 'Gà Kem Bông',       cost: 240,  d: 'Đẻ trứng hồng mỗi sáng: +45k/ngày.' },
  { id: 'sheep', e: '🐑', n: 'Cừu Bông RJ Mini',  cost: 460,  d: 'Cho len pastel ấm áp: +85k & +15💜 mỗi sáng.' },
  { id: 'cat',   e: '🐱', n: 'Mèo Tuyết Meow',    cost: 620,  d: 'Tự động bắt sạch sâu trên ruộng mỗi sáng & +25💜.' },
  { id: 'deer',  e: '🦌', n: 'Tuần Lộc Mũi Hồng', cost: 980,  d: 'Mỗi sáng mang về +130k & 2 hạt giống lễ hội ngẫu nhiên.' },
];

const UPS = [
  { id: 'can',   e: '🚿', n: 'Bình tưới Pastel',       cost: 180,  d: 'Tưới cây chỉ tốn 1⚡ thay vì 2⚡.' },
  { id: 'hoe',   e: '⛏️', n: 'Cuốc nhẹ Hàn Quốc',      cost: 180,  d: 'Cuốc đất chỉ tốn 2⚡ thay vì 4⚡.' },
  { id: 'rod',   e: '🎣', n: 'Cần câu Pha Lê',         cost: 260,  d: 'Câu cá tốn ít sức hơn (4⚡) và tăng tỉ lệ câu được Cá hồi / Hộp quà.' },
  { id: 'scare', e: '⛄', n: 'Người Tuyết Canh Vườn',  cost: 300,  d: 'Giữ vườn an toàn khỏi Shooky tinh nghịch & +10💜/ngày.' },
  { id: 'sign',  e: '🪧', n: 'Cổng Hoa Pastel',        cost: 500,  d: 'Nông trại nổi tiếng: +12% giá bán mọi mặt hàng.' },
  { id: 'koya',  e: '🐨', n: 'Thuê Koya phụ việc',     cost: 420,  d: 'Mỗi tối tự hái ô chín (lương 30k/ngày, đôi khi ngủ gật).' },
  { id: 'green', e: '🏡', n: 'Nhà Kính Pha Lê',        cost: 900,  d: 'Chống mưa đá, giảm 70% sâu bệnh, cây +10% cơ hội ra đôi.' },
  { id: 'sprk',  e: '💦', n: 'Phun Sương Tự Động',     cost: 1450, d: 'Mỗi sáng tự động tưới đẫm toàn bộ cánh đồng.' },
];

const MILES = [
  { id: 'concert', cost: 5000,   e: '🎫', n: 'Mốc 1: Vé Winter Concert Seoul', d: 'Hoàn thành ước mơ đi xem concert! Mở khóa Chế Độ Tự Do Vĩnh Cửu & +10% giá bán.', income: 80,  fans: 20 },
  { id: 'cafe',    cost: 15000,  e: '☕', n: 'Mốc 2: Tiệm Trà Bánh Đồi Thông', d: 'Xây quán cafe pastel bên sườn đồi: thu lời thụ động +250k & +45💜 mỗi sáng!', income: 250, fans: 45 },
  { id: 'villa',   cost: 35000,  e: '🏰', n: 'Mốc 3: Biệt Thự Hồng Pastel',   d: 'Nâng cấp nhà thành biệt thự cổ tích: +50⚡ Sức tối đa, +15% giá bán & +400k/ngày.', income: 400, fans: 70 },
  { id: 'park',    cost: 75000,  e: '🎡', n: 'Mốc 4: Công Viên Tuyết Wonderland', d: 'Vòng quay pastel khổng lồ giữa Đà Lạt: +750k & +150💜 mỗi sáng!', income: 750, fans: 150 },
  { id: 'legend',  cost: 150000, e: '👑', n: 'Mốc 5: Huyền Thoại Đồi Thông Tím', d: 'Đỉnh cao danh vọng! Tượng vàng Cooky giữa nông trại, +1.500k/ngày & +30% giá bán!', income: 1500, fans: 300 },
];

const FRIENDS = [
  { id: 'rj',     e: '🦙', n: 'RJ',     fav: 'Cà rốt & Bánh',    buff: 'Mỗi cấp: +4⚡ hồi sức khi ăn sáng' },
  { id: 'chimmy', e: '🐶', n: 'Chimmy', fav: 'Bắp sữa & Dâu',    buff: 'Mỗi cấp: +3% giá bán nông sản' },
  { id: 'koya',   e: '🐨', n: 'Koya',   fav: 'Hoa Tuyết',        buff: 'Mỗi cấp: giảm tỉ lệ cỏ dại mọc' },
  { id: 'shooky', e: '🍪', n: 'Shooky', fav: 'Khoai mật nướng',  buff: 'Mỗi cấp: tăng cơ hội thu hoạch x2' },
  { id: 'mang',   e: '🐴', n: 'Mang',   fav: 'Sinh tố & Trà',    buff: 'Mỗi cấp: +15% fan khi Livestream' },
  { id: 'tata',   e: '💜', n: 'Tata',   fav: 'Cà rốt cầu vồng',  buff: 'Mỗi cấp: tăng cơ hội ra cây Cầu Vồng' },
  { id: 'van',    e: '🤖', n: 'Van',    fav: 'Cá hồi Đà Lạt',    buff: 'Mỗi cấp: giảm 5% giá mở ô đất mới' },
];

const BADGES = [
  { id: 'harv10',  e: '🌱', n: 'Mầm Xanh Đầu Tiên',   d: 'Thu hoạch đủ 10 lần',        reward: 100, c: s => s.stats.harv >= 10 },
  { id: 'harv80',  e: '🧺', n: 'Bàn Tay Vàng',        d: 'Thu hoạch đủ 80 lần',        reward: 400, c: s => s.stats.harv >= 80 },
  { id: 'fish5',   e: '🎣', n: 'Cần Thủ Hồ Sương',    d: 'Câu được 5 con cá',          reward: 150, c: s => s.stats.fish >= 5 },
  { id: 'fish25',  e: '🐳', n: 'Vua Hồ Xuân Hương',   d: 'Câu được 25 con cá',         reward: 500, c: s => s.stats.fish >= 25 },
  { id: 'cook5',   e: '🧁', n: 'Đầu Bếp Bánh Ngọt',   d: 'Chế biến 5 món ăn/thức uống',reward: 200, c: s => s.stats.cook >= 5 },
  { id: 'cook25',  e: '👩‍🍳', n: 'Nghệ Nhân Trà Bánh',  d: 'Chế biến 25 món',            reward: 600, c: s => s.stats.cook >= 25 },
  { id: 'petAll',  e: '🐾', n: 'Trại Chủ Yêu Thú',    d: 'Nhận nuôi đủ 4 bé thú cưng', reward: 500, c: s => PETS.every(p => s.pets[p.id]) },
  { id: 'plotAll', e: '🚜', n: 'Đại Điền Chủ Đà Lạt', d: 'Mở khóa toàn bộ 32 ô ruộng', reward: 800, c: s => s.plots.every(p => p.s !== 'locked') },
  { id: 'fan2k',   e: '💜', n: 'Idol Đồi Thông',      d: 'Đạt 2.000 Fan theo dõi',     reward: 350, c: s => s.fans >= 2000 },
  { id: 'fan10k',  e: '🌟', n: 'Ngôi Sao Triệu Tim',  d: 'Đạt 10.000 Fan theo dõi',    reward: 1000, c: s => s.fans >= 10000 },
  { id: 'frMax',   e: '🤝', n: 'Tình Bạn BT21',       d: 'Đạt tổng 15 cấp thân thiết', reward: 700, c: s => Object.values(s.fr).reduce((a, b) => a + b, 0) >= 15 },
  { id: 'mile1',   e: '🎫', n: 'Giấc Mơ Seoul',       d: 'Mở khóa Cột Mốc 1 (Vé Concert)', reward: 500, c: s => s.miles.concert },
];

const WX = {
  snow: { e: '❄️', n: 'Tuyết Noel (+10% giá)' },
  sun:  { e: '☀️', n: 'Nắng đông ấm' },
  rain: { e: '🌧️', n: 'Mưa phùn' },
  fog:  { e: '🌫️', n: 'Sương hồng Đà Lạt' },
};
const ZONES = {
  house: { x: 26,  y: 52,  w: 175, h: 155, n: '🛏️ Về nhà nghỉ ngơi', pos: { x: 112, y: 214 } },
  gym:   { x: 228, y: 126, w: 120, h: 80,  n: '💪 Góc tập Gym',       pos: { x: 286, y: 214 } },
  cook:  { x: 610, y: 92,  w: 128, h: 112, n: '🧁 Bếp Bánh Pastel',   pos: { x: 674, y: 214 } },
  stall: { x: 754, y: 60,  w: 184, h: 148, n: '🛒 Sạp Giáng Sinh',    pos: { x: 846, y: 214 } },
  lake:  { x: 24,  y: 468, w: 184, h: 124, n: '🎣 Hồ Tuyết (Câu cá)', pos: { x: 185, y: 492 } },
};
const CUTE_NAMES = ['Cooky', 'Kookie 🐰', 'Thỏ Kem Hồng', 'Bắp Tay Pastel', 'Mochi Đà Lạt', 'Thỏ Tuyết Noel', 'Út Cưng JK', 'Bông Gòn Hồng'];
const IDLE = ['Đà Lạt mùa Noel đẹp quá 🌸', 'Cà rốt nướng thơm phức~ 🥕', 'Ra hồ câu cá không ta? 🎣', 'Làm bánh kem dâu thôi! 🍰', 'Nhớ hội bạn BT21 ghê 💜', 'Bắp tay nay săn chắc hơn rồi 💪', 'Tuyết hồng rơi kìa~ ❄️'];

/* ---------- State ---------- */
let S = null, speed = 1, paused = false, sndOn = true;
let titleOpen = true, shopOpen = false, shopTab = 'sell';
let queue = [], cur = null, hover = null, idleT = 10, hudT = 0;
const ck = { x: 112, y: 214, face: 1, t: 0, act: 0, icon: '', iconT: 0, bub: '', bubT: 0, eat: 0, lift: 0, fish: 0, walk: false };
const parts = [], floats = [], drops = [];

function newState(customName) {
  const plots = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    plots.push({ s: (c >= 2 && c < 6 && r < 3) ? 'grass' : 'locked', crop: null, g: 0, w: true, dry: 0, ripe: false, rd: 0, dead: false, weed: false, bug: false, rainbow: false });
  const o = (ks, v) => Object.fromEntries(ks.map(c => [c, v]));
  const st = {
    name: (customName || 'Cooky').trim() || 'Cooky',
    day: 1, min: 360, cash: 220, st: 100, maxSt: 100, fans: 20, xp: 0, lv: 1,
    endless: false,
    plots,
    seeds: Object.assign(o(CK, 0), { carrot: 6, sweet: 2 }),
    inv: Object.assign(o(CK, 0), o(FK, 0), o(RECIPES.map(r => r.id), 0), { carrot: 3, rainbow: 0 }),
    sel: 'carrot',
    up: {}, pets: {}, miles: {}, badges: {},
    fr: o(FRIENDS.map(f => f.id), 1),
    frGiftDay: {},
    price: o(CK, 1), prev: o(CK, 1),
    weather: 'snow', tmr: 'sun',
    gymDay: 0, liveDay: 0, bought: 0, viral: 0, vietgap: false, jk: false, lastEv: '',
    quests: [],
    today: { earn: 0, harv: 0, fish: 0, cook: 0 },
    stats: { earn: 0, harv: 0, fish: 0, cook: 0, ev: 0 },
    over: false
  };
  st.plots[COLS * 1 + 2].weed = true;
  st.plots[COLS * 2 + 5].weed = true;
  rollQuests(st);
  return st;
}

function rollQuests(st = S) {
  const pool = [
    { id: 'harv', n: 'Thu hoạch 4 ô nông sản',   goal: 4, cur: 0, rCash: 90,  rFan: 25, e: '🧺' },
    { id: 'water',n: 'Tưới hoặc chăm 5 ô ruộng', goal: 5, cur: 0, rCash: 70,  rFan: 20, e: '💧' },
    { id: 'fish', n: 'Câu cá ở Hồ Tuyết 2 lần',  goal: 2, cur: 0, rCash: 110, rFan: 30, e: '🎣' },
    { id: 'cook', n: 'Chế biến 1 món ở Bếp Bánh',goal: 1, cur: 0, rCash: 120, rFan: 35, e: '🧁' },
    { id: 'sell', n: 'Bán hàng tại Sạp 4 món',   goal: 4, cur: 0, rCash: 100, rFan: 25, e: '🛒' },
    { id: 'gym',  n: 'Tập Gym rèn thể lực 1 lần',goal: 1, cur: 0, rCash: 85,  rFan: 25, e: '💪' },
  ];
  st.quests = shuffle(pool).slice(0, 3).map(q => ({ ...q, done: false }));
}

function progQuest(id, n = 1) {
  if (!S || !S.quests) return;
  S.quests.forEach(q => {
    if (q.id === id && !q.done) {
      q.cur = Math.min(q.goal, q.cur + n);
      if (q.cur >= q.goal) {
        q.done = true;
        earn(q.rCash); addFans(q.rFan); addXp(15);
        SFX.win();
        toast(`📋 Hoàn thành nhiệm vụ "${q.n}": <b>+${fmt(q.rCash)} & +${q.rFan}💜</b>!`);
      }
    }
  });
}

function addXp(n) {
  S.xp = (S.xp || 0) + n;
  const needXp = S.lv * 40;
  if (S.xp >= needXp) {
    S.xp -= needXp; S.lv++; S.maxSt += 5; S.st = Math.min(S.maxSt, S.st + 25);
    SFX.win();
    float(ck.x, ck.y - 96, `🎉 Lên cấp Lv.${S.lv}! (+5⚡)`, '#9362cc');
  }
  checkBadges();
}

function checkBadges() {
  if (!S) return;
  BADGES.forEach(b => {
    if (!S.badges[b.id] && b.c(S)) {
      S.badges[b.id] = true;
      earn(b.reward); addFans(30);
      SFX.win();
      toast(`🏅 Đạt huy hiệu <b>${b.e} ${b.n}</b>! Thưởng nóng <b>+${fmt(b.reward)}</b>!`);
    }
  });
}

/* ---------- Helpers ---------- */
function fmt(k) {
  k = Math.round(k); const neg = k < 0; k = Math.abs(k);
  const s = k >= 1000 ? (k / 1000).toFixed(2).replace(/\.?0+$/, '').replace('.', ',') + 'tr' : k + 'k';
  return (neg ? '-' : '') + s;
}
const fmtFans = f => f >= 1000 ? (f / 1000).toFixed(1).replace('.0', '').replace('.', ',') + 'K' : String(f);
const hhmm = m => { m = Math.min(1439, Math.floor(m)); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
const tcx = i => FX + (i % COLS) * T + T / 2, tcy = i => FY + ((i / COLS) | 0) * T + T / 2;

function itemInfo(k) {
  if (k === 'rainbow') return { n: 'Cà rốt cầu vồng', e: '🌈', price: 420 };
  if (CROPS[k]) return CROPS[k];
  if (FISH[k]) return FISH[k];
  const r = RECIPES.find(x => x.id === k);
  return r || { n: k, e: '🎁', price: 20 };
}

function bonus() {
  if (!S) return 1;
  let b = 1 + Math.min(.6, S.fans / 18000);
  if (S.vietgap) b += .1;
  if (S.up.sign) b += .12;
  if (S.weather === 'snow') b += .1;
  if (S.viral === S.day) b += .2;
  if (S.miles.concert) b += .1;
  if (S.miles.villa) b += .15;
  if (S.miles.legend) b += .3;
  b += ((S.fr?.chimmy || 1) - 1) * .03;
  return b;
}

function priceOf(k) {
  const it = itemInfo(k);
  const m = CROPS[k] ? (S.price[k] || 1) : 1;
  return Math.max(1, Math.round(it.price * m * bonus()));
}

const hoeCost = () => S.up.hoe ? 2 : 4;
const canCost = () => S.up.can ? 1 : 2;
const plotCost = () => Math.max(40, Math.round((55 + S.bought * 14) * (1 - ((S.fr?.van || 1) - 1) * .05)));
const allSellKeys = () => [...CK, 'rainbow', ...FK, ...RECIPES.map(r => r.id)].filter(k => S.inv[k] > 0);
const invKeys = (withR = true) => [...CK, ...(withR ? ['rainbow'] : [])].filter(k => S.inv[k] > 0);
const invCount = () => allSellKeys().reduce((a, k) => a + S.inv[k], 0);
const randInv = () => { const ks = invKeys(false); return ks.length ? pick(ks) : null; };
const growing = () => S.plots.filter(p => p.s === 'crop' && !p.dead && !p.ripe);
const ripes = () => S.plots.filter(p => p.s === 'crop' && !p.dead && p.ripe);
const curMile = () => MILES.find(m => !S.miles[m.id]) || MILES[MILES.length - 1];

function tileAt(x, y) {
  if (x < FX || y < FY || x >= FX + COLS * T || y >= FY + ROWS * T) return -1;
  return ((y - FY) / T | 0) * COLS + ((x - FX) / T | 0);
}
function canBuy(i) {
  if (S.plots[i].s !== 'locked') return false;
  const c = i % COLS, r = (i / COLS) | 0;
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
    const cc = c + dx, rr = r + dy;
    return cc >= 0 && cc < COLS && rr >= 0 && rr < ROWS && S.plots[rr * COLS + cc].s !== 'locked';
  });
}
function earn(v) { S.cash += v; S.today.earn += v; S.stats.earn += v; }
function sell(k, n, mult = 1) {
  n = Math.min(n, S.inv[k] || 0); if (n <= 0) return 0;
  const v = Math.round(priceOf(k) * mult) * n;
  S.inv[k] -= n; earn(v); progQuest('sell', n);
  return v;
}
function addFans(n) { S.fans = Math.max(0, S.fans + n); checkBadges(); }
function waterAll() { S.plots.forEach(p => { if (p.s === 'crop' && !p.dead && !p.ripe) p.w = true; }); }
function clearPlot(p) { Object.assign(p, { s: 'tilled', crop: null, g: 0, w: false, dry: 0, ripe: false, rd: 0, dead: false, bug: false, rainbow: false }); }

function harvestPlot(p) {
  const c = CROPS[p.crop];
  if (p.rainbow) S.inv.rainbow++; else S.inv[p.crop]++;
  let extra = 0;
  const dblChance = .12 + (S.up.green ? .1 : 0) + ((S.fr?.shooky || 1) - 1) * .04;
  if (!p.rainbow && Math.random() < dblChance) { S.inv[p.crop]++; extra = 1; }
  if (c.fans) addFans(c.fans);
  S.today.harv++; S.stats.harv++;
  progQuest('harv', 1); addXp(c.xp || 5);
  if (c.regrow && !p.rainbow) { p.ripe = false; p.rd = 0; p.g = c.days - c.regrow; p.w = false; }
  else clearPlot(p);
  return extra;
}

function stealRipe(n) {
  const rs = shuffle(ripes()).slice(0, n);
  rs.forEach(p => { const c = CROPS[p.crop]; if (c.regrow && !p.rainbow) { p.ripe = false; p.g = c.days - c.regrow; } else clearPlot(p); });
  return rs.length;
}

/* ---------- Sound ---------- */
let AC = null;
function tone(f, d = .1, type = 'sine', v = .045, f2) {
  if (!sndOn) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime;
    o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d + .02);
  } catch (e) { }
}
const seq = (notes, gap = 85, type = 'triangle', v = .04) => notes.forEach((f, i) => { if (f) setTimeout(() => tone(f, .13, type, v), i * gap); });
const SFX = {
  click: () => tone(740, .04, 'sine', .03),
  till: () => tone(170, .12, 'triangle', .08, 85),
  plant: () => tone(540, .09, 'sine', .06, 860),
  water: () => tone(1050, .16, 'sine', .04, 420),
  harvest: () => seq([659, 880, 1319], 75),
  coin: () => seq([988, 1319], 60),
  err: () => tone(240, .15, 'sawtooth', .03, 140),
  ev: () => seq([523, 659, 784, 1047], 90),
  pop: () => tone(420, .07, 'sine', .06, 960),
  gym: () => seq([330, 440, 330, 523], 110),
  win: () => seq([523, 659, 784, 1047, 784, 1047, 1319], 110),
  jingle: () => seq([659, 659, 659, 0, 659, 659, 659, 0, 659, 784, 523, 587, 659], 130, 'triangle', .05),
};

/* ---------- Visual FX ---------- */
function float(x, y, txt, col = '#63324d') { floats.push({ x, y, txt, col, life: 1.35 }); }
function puff(x, y, col, n = 8, up = 1) {
  for (let i = 0; i < n; i++) parts.push({ x: x + rnd(-14, 14), y: y + rnd(-6, 6), vx: rnd(-40, 40), vy: rnd(-85, -20) * up, life: rnd(.4, .8), col, r: rnd(2.2, 4.2) });
}
function say(t) { ck.bub = t; ck.bubT = 3.0; }
function act(icon) { ck.act = .35; ck.icon = icon; ck.iconT = .95; }
let toastT = null;
function toast(msg, ms = 2600) {
  const el = $('#toast'); el.innerHTML = msg; el.hidden = false;
  el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, ms);
}

/* ---------- Drawing Primitives ---------- */
function rr(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
function ell(g, x, y, rx, ry, fill, stroke, rot = 0) {
  g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (stroke) { g.strokeStyle = stroke; g.stroke(); }
}
function heart(g, x, y, s, col) {
  g.save(); g.translate(x, y); g.scale(s / 10, s / 10);
  g.beginPath(); g.moveTo(0, 4); g.bezierCurveTo(-10, -3, -5, -11, 0, -5); g.bezierCurveTo(5, -11, 10, -3, 0, 4);
  g.fillStyle = col; g.fill(); g.restore();
}
function emo(g, e, x, y, size) { g.font = `${size}px ${EMOJI}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, x, y); }
function txt(g, s, x, y, size, col, w = 700, align = 'center') { g.font = `${w} ${size}px ${FONT}`; g.textAlign = align; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(s, x, y); }

/* ---------- Characters (Pastel Cooky & Friends) ---------- */
function drawCooky(g, x, y, s, o = {}) {
  const t = o.t || 0, f = o.face || 1, walk = o.walk;
  const P = '#ffb3cc', OL = '#b85d82', PL = '#fff4c8', INK = '#3b2030';
  g.save(); g.translate(x, y); g.scale(s, s);
  ell(g, 0, 0, 14, 4.5, 'rgba(90,45,75,.18)');
  const ph = t * 13, bob = walk ? -Math.abs(Math.sin(ph)) * 3 : Math.sin(t * 2.5) * .8;
  g.translate(0, bob - (o.hop || 0));
  g.lineWidth = 1.6; g.lineJoin = 'round'; g.lineCap = 'round';
  const la = walk ? Math.sin(ph) * 2.5 : 0;
  ell(g, -5, -3 + la, 4.6, 3.8, P, OL); ell(g, 5, -3 - la, 4.6, 3.8, P, OL);
  heart(g, -f * 11, -12, 8, '#ff6b9d');
  ell(g, 0, -14, 11, 10.5, P, OL);
  ell(g, 0, -12.5, 6, 5.5, '#ffe8f0');
  // Khăn choàng Noel Pastel
  g.fillStyle = '#ff6b8b'; g.strokeStyle = OL;
  rr(g, -11, -24, 22, 5.5, 2.8); g.fill(); g.stroke();
  rr(g, -6, -21, 5.5, 9, 2.2); g.fill(); g.stroke();
  const up = o.lift ? Math.abs(Math.sin(t * 6)) * 7 : 0;
  if (o.lift) {
    g.strokeStyle = OL; g.lineWidth = 7.5; g.beginPath(); g.moveTo(-9, -18); g.lineTo(-17, -46 - up); g.moveTo(9, -18); g.lineTo(17, -46 - up); g.stroke();
    g.strokeStyle = P; g.lineWidth = 5; g.stroke(); g.lineWidth = 1.6;
  } else {
    const aw = walk ? Math.sin(ph) * 2.5 : 0;
    ell(g, -11, -15 + aw, 3.5, 5, P, OL); ell(g, 11, -15 - aw, 3.5, 5, P, OL);
    ell(g, -11, -12.5 + aw, 2.5, 2.2, PL); ell(g, 11, -12.5 - aw, 2.5, 2.2, PL);
  }
  const ew = Math.sin(t * 2) * .05;
  // Tai trái dựng + lòng tai kem vàng, tai phải hơi cụp đáng yêu
  ell(g, -7.2, -57, 5.2, 13, P, OL, -.12 + ew);
  ell(g, -7.2, -55.5, 2.6, 8.2, PL, null, -.12 + ew);
  ell(g, 7.8, -53, 5.5, 11, P, OL, .42 - ew);
  ell(g, 0, -34, 17, 14.5, P, OL);
  // Bịt tai bông trắng Noel hai bên má
  ell(g, -17.5, -34, 4.2, 5.8, '#ffffff', OL);
  ell(g, 17.5, -34, 4.2, 5.8, '#ffffff', OL);
  const fx = f * 1.6, blink = (t % 3.7) < .12;
  if (blink) {
    g.strokeStyle = INK; g.lineWidth = 1.6;
    g.beginPath(); g.moveTo(-9 + fx, -35); g.lineTo(-4 + fx, -35); g.moveTo(4 + fx, -35); g.lineTo(9 + fx, -35); g.stroke();
  } else {
    ell(g, -6 + fx, -35, 2.8, 3.6, INK); ell(g, 6 + fx, -35, 2.8, 3.6, INK);
    ell(g, -5.2 + fx, -36.2, 1.1, 1.2, '#fff'); ell(g, 6.8 + fx, -36.2, 1.1, 1.2, '#fff');
  }
  // Lông mày đặc trưng của Cooky
  g.fillStyle = INK;
  g.beginPath(); g.moveTo(-9.5 + fx, -42.5); g.lineTo(-7.2 + fx, -44.2); g.lineTo(-1.5 + fx, -39.5); g.lineTo(-2.5 + fx, -38.7); g.closePath(); g.fill();
  g.strokeStyle = INK; g.lineWidth = 2.4;
  g.beginPath(); g.moveTo(4 + fx, -41); g.lineTo(8.5 + fx, -41); g.stroke();
  ell(g, -11 + fx * .5, -30, 3.2, 1.9, 'rgba(255,115,155,.42)');
  ell(g, 11 + fx * .5, -30, 3.2, 1.9, 'rgba(255,115,155,.42)');
  ell(g, fx, -31.2, 1.9, 1.4, INK);
  g.strokeStyle = INK; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(-2.5 + fx, -28.6); g.quadraticCurveTo(-1.2 + fx, -27, fx, -28.6); g.quadraticCurveTo(1.2 + fx, -27, 2.5 + fx, -28.6); g.stroke();
  if (o.lift) {
    const by = -49 - up; g.strokeStyle = '#68a8e8'; g.lineWidth = 3; g.beginPath(); g.moveTo(-26, by); g.lineTo(26, by); g.stroke();
    g.fillStyle = '#4888cc'; rr(g, -30, by - 7, 6, 14, 2.5); g.fill(); rr(g, 24, by - 7, 6, 14, 2.5); g.fill();
  }
  if (o.eat) { g.save(); g.translate(fx + 7, -27); g.rotate(-.7 + Math.sin(t * 22) * .12); emo(g, '🥕', 0, 0, 13); g.restore(); }
  if (o.fish) {
    g.strokeStyle = '#8b5e3c'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(-10, -16); g.lineTo(-34, -42); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(-34, -42); g.lineTo(-36, 14 + Math.sin(t * 5) * 3); g.stroke();
    ell(g, -36, 15 + Math.sin(t * 5) * 3, 3, 3, '#ff6b9d', '#fff');
  }
  if (o.tired) ell(g, 16, -46 + ((t * 18) % 7), 2, 3, '#7cc8ff', '#4a9be0');
  g.restore();
}

function drawKoya(g, x, y, t, sleeping) {
  g.save(); g.translate(x, y); g.lineWidth = 1.5;
  const B = '#9cb4d8', OL = '#667ca3';
  ell(g, 0, 0, 22, 5, 'rgba(0,0,0,.12)');
  ell(g, 4, -9, 18, 10, B, OL);
  ell(g, -20, -26, 7, 7, B, OL); ell(g, -2, -28, 7, 7, B, OL);
  ell(g, -20, -26, 3.5, 3.5, '#dce6f7'); ell(g, -2, -28, 3.5, 3.5, '#dce6f7');
  ell(g, -11, -17, 13, 11, B, OL);
  ell(g, -11, -14, 4, 5, '#7c5fa0');
  g.strokeStyle = '#2b2440'; g.beginPath();
  if (sleeping) { g.arc(-17, -19, 2.5, 0, Math.PI); g.moveTo(-2.5, -19); g.arc(-5, -19, 2.5, 0, Math.PI); }
  else { g.moveTo(-17, -20); g.lineTo(-17, -18); g.moveTo(-5, -20); g.lineTo(-5, -18); }
  g.stroke();
  if (sleeping) { const k = (t * .7) % 1; txt(g, 'z', 4 + k * 10, -32 - k * 18, 10 + k * 6, `rgba(110,120,180,${1 - k})`, 900); }
  g.restore();
}

/* ---------- Pastel Noel Background (pre-render) ---------- */
let bg = document.createElement('canvas'), K = 1;
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function pine(g, x, y, h, dark) {
  g.fillStyle = '#8a6b56'; g.fillRect(x - 3, y - 8, 6, 10);
  const cols = dark ? ['#6ea88e', '#7db89d', '#8ec7ad'] : ['#7ebf9e', '#8fd0af', '#a2dec0'];
  for (let i = 0; i < 3; i++) {
    const w = h * (.56 - i * .11), yy = y - 6 - i * h * .25;
    g.fillStyle = cols[i];
    g.beginPath(); g.moveTo(x - w / 2, yy); g.lineTo(x + w / 2, yy); g.lineTo(x, yy - h * .44); g.closePath(); g.fill();
    // Tuyết trắng pastel đọng trên tán thông
    g.fillStyle = 'rgba(255,252,255,.78)';
    g.beginPath(); g.moveTo(x - w * .34, yy - h * .15); g.quadraticCurveTo(x, yy - h * .05, x + w * .34, yy - h * .15); g.lineTo(x, yy - h * .44); g.closePath(); g.fill();
  }
}

function drawBG() {
  bg.width = Math.round(W * K); bg.height = Math.round(H * K);
  const g = bg.getContext('2d'); g.setTransform(K, 0, 0, K, 0, 0);
  const R = mulberry(19);
  // Nền đồi cỏ xanh mint-pastel dịu mắt mùa đông Đà Lạt
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, '#c8ecd9'); gr.addColorStop(.45, '#bfe6cf'); gr.addColorStop(1, '#cdebd6');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  // Tuyết hồng/trắng lấm tấm trên thảm cỏ
  for (let i = 0; i < 240; i++) {
    ell(g, R() * W, R() * H, 2 + R() * 4, 1.2 + R() * 2, i % 3 ? 'rgba(255,255,255,.45)' : 'rgba(255,220,235,.4)');
  }
  // Rừng thông Noel Đà Lạt
  for (let x = -10; x < W + 20; x += 34) pine(g, x + R() * 10, 66 + R() * 8, 70 + R() * 16, true);
  for (let x = 8; x < W; x += 56) if (x < 20 || (x > 348 && x < 605)) pine(g, x + R() * 12, 126 + R() * 10, 64 + R() * 14, false);
  // Lối đi lát đá kem pastel
  g.fillStyle = '#f7e7d0'; rr(g, 14, 198, W - 28, 30, 15); g.fill();
  for (let i = 0; i < 55; i++) ell(g, 26 + R() * (W - 52), 204 + R() * 18, 3 + R() * 3, 2 + R() * 1.5, i % 2 ? '#eed2dc' : '#dcd2f2');

  // Nhà gỗ Pastel Noel (Bên trái)
  ell(g, 112, 202, 90, 8, 'rgba(90,50,80,.1)');
  g.fillStyle = '#fff5ea'; g.strokeStyle = '#d9b29c'; g.lineWidth = 2; rr(g, 36, 112, 152, 90, 6); g.fill(); g.stroke();
  g.fillStyle = '#e3a598'; g.fillRect(156, 68, 18, 32);
  ell(g, 165, 68, 11, 4, '#ffffff');
  // Mái nhà hồng phấn phủ tuyết
  g.fillStyle = '#ffa6c4'; g.strokeStyle = '#d47496'; g.lineWidth = 2.4;
  g.beginPath(); g.moveTo(20, 118); g.lineTo(112, 62); g.lineTo(204, 118); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#ffffff';
  for (let x = 28; x <= 196; x += 16) ell(g, x, 118, 9, 4.5, '#ffffff');
  heart(g, 112, 96, 13, '#fff5f9');
  // Cửa gỗ & vòng nguyệt quế Giáng Sinh
  g.fillStyle = '#c48b68'; rr(g, 97, 148, 30, 54, 5); g.fill();
  ell(g, 112, 166, 9, 9, '#6bc59c', '#3d8f6a'); ell(g, 112, 166, 4, 4, '#c48b68');
  ell(g, 112, 157, 4, 2.5, '#ff6b8b');
  // Cửa sổ ấm áp
  [50, 142].forEach(x => {
    g.fillStyle = '#dff2ff'; g.strokeStyle = '#b88c72'; g.lineWidth = 2.2;
    rr(g, x, 134, 30, 26, 4); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; rr(g, x - 2, 159, 34, 5, 2.5); g.fill();
  });
  // Cây thông Noel lớn cạnh nhà
  pine(g, 208, 198, 96, false);
  [['#ff85a2', 202, 176], ['#ffee93', 216, 168], ['#b892ff', 205, 152], ['#7ce0c3', 214, 184], ['#ff85a2', 196, 188]].forEach(([c, x, y]) => ell(g, x, y, 4, 4, c, '#fff'));
  emo(g, '⭐', 208, 122, 18);

  // Góc tập Gym Pastel
  g.fillStyle = '#e5dcf2'; rr(g, 232, 152, 112, 48, 9); g.fill();
  g.fillStyle = '#f3edff'; rr(g, 236, 156, 104, 40, 7); g.fill();
  g.fillStyle = '#ff9ebb'; rr(g, 246, 166, 48, 8, 4); g.fill();
  g.strokeStyle = '#7c88a6'; g.lineWidth = 3; g.beginPath(); g.moveTo(296, 152); g.lineTo(338, 152); g.stroke();
  g.fillStyle = '#68a8e8'; rr(g, 294, 144, 6, 16, 2); g.fill(); rr(g, 334, 144, 6, 16, 2); g.fill();
  g.fillStyle = '#b392f0'; rr(g, 224, 116, 48, 18, 4); g.fill(); txt(g, 'GYM 💪', 248, 125.5, 9.5, '#fff', 900);

  // Xưởng Bếp Bánh & Trà Nóng Pastel (x = 612..736)
  ell(g, 674, 202, 64, 7, 'rgba(90,50,80,.1)');
  g.fillStyle = '#fff3f8'; g.strokeStyle = '#e8acc4'; g.lineWidth = 2; rr(g, 616, 118, 116, 82, 8); g.fill(); g.stroke();
  for (let i = 0; i < 6; i++) {
    g.fillStyle = i % 2 ? '#e6dbfa' : '#ffc2d6';
    rr(g, 612 + i * 20, 106, 20, 22, 6); g.fill();
  }
  g.fillStyle = '#b392f0'; rr(g, 632, 86, 84, 20, 5); g.fill(); txt(g, '🧁 BẾP BÁNH', 674, 96.5, 10, '#fff', 900);
  [['🍰', 642], ['☕', 674], ['🥤', 706]].forEach(([e, x]) => emo(g, e, x, 152, 18));

  // Sạp Giáng Sinh Pastel (x = 762..934)
  ell(g, 848, 202, 86, 8, 'rgba(90,50,80,.1)');
  g.fillStyle = '#c49072'; g.fillRect(772, 94, 6, 106); g.fillRect(922, 94, 6, 106);
  g.fillStyle = '#ffecf2'; g.strokeStyle = '#e0a2b8'; g.lineWidth = 2; rr(g, 774, 146, 150, 52, 6); g.fill(); g.stroke();
  for (let i = 0; i < 8; i++) {
    g.fillStyle = i % 2 ? '#ffffff' : '#ff9ebb';
    g.beginPath(); g.moveTo(766 + i * 21, 86); g.lineTo(787 + i * 21, 86); g.lineTo(787 + i * 21, 108); g.arc(776.5 + i * 21, 108, 10.5, 0, Math.PI); g.closePath(); g.fill();
  }
  [['🥕', 800], ['🍓', 834], ['❄️', 868], ['🍈', 902]].forEach(([e, x]) => {
    g.fillStyle = '#f5d0de'; rr(g, x - 14, 132, 28, 16, 4); g.fill(); emo(g, e, x, 132, 16);
  });

  // Hàng rào ruộng gỗ kem trắng
  const fx0 = FX - 14, fy0 = FY - 10, fw = COLS * T + 28, fh = ROWS * T + 22;
  g.fillStyle = 'rgba(130,95,115,.12)'; rr(g, fx0 + 4, fy0 + 4, fw - 8, fh - 8, 12); g.fill();
  g.strokeStyle = '#d9b29c'; g.lineWidth = 4;
  const rail = (x1, y1, x2, y2) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
  rail(fx0, fy0, FX + 190, fy0); rail(FX + 290, fy0, fx0 + fw, fy0); rail(fx0, fy0 + fh, fx0 + fw, fy0 + fh); rail(fx0, fy0, fx0, fy0 + fh); rail(fx0 + fw, fy0, fx0 + fw, fy0 + fh);
  g.fillStyle = '#fff5ee';
  for (let x = fx0; x <= fx0 + fw; x += 36) { if (x > FX + 194 && x < FX + 286) continue; rr(g, x - 3, fy0 - 7, 6, 13, 2); g.fill(); rr(g, x - 3, fy0 + fh - 7, 6, 13, 2); g.fill(); }

  // Hồ Tuyết Pastel & Cầu gỗ câu cá (Góc trái dưới)
  ell(g, 114, 528, 90, 44, '#92ccf0'); ell(g, 114, 524, 83, 38, '#b6e2ff');
  // Cầu gỗ câu cá
  g.fillStyle = '#d9ae8e'; rr(g, 152, 496, 52, 18, 4); g.fill();
  txt(g, '🎣 Câu cá', 114, 476, 10, '#5a4266', 800);
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; ell(g, 114 + Math.cos(a) * 90, 528 + Math.sin(a) * 44, 8, 5.5, '#f2e9f0', '#cbbcd1'); }

  // Hoa Cẩm Tú Cầu Pastel Đà Lạt
  [[860, 305], [885, 525], [815, 565], [42, 305], [202, 596]].forEach(([x, y]) => {
    ell(g, x, y + 6, 22, 7, 'rgba(90,50,80,.08)'); ell(g, x, y, 22, 15, '#7bc49e');
    for (let i = 0; i < 16; i++) ell(g, x + (R() - .5) * 34, y - 3 + (R() - .5) * 20, 4.2, 4.2, ['#ffc2d9', '#d2b8ff', '#b5e2ff', '#fff0b8'][i % 4]);
  });
}

/* ---------- Plot & World Objects ---------- */
function drawSprout(cx, cy, f, seedOnly) {
  if (seedOnly) { [[-8, 0], [0, -3], [8, 1]].forEach(([dx, dy]) => { ell(ctx, cx + dx, cy + dy, 3, 2, '#7a5438'); ell(ctx, cx + dx, cy + dy - 2, 1.5, 2.2, '#86d975'); }); return; }
  const h = 8 + f * 18;
  ctx.strokeStyle = '#53a65e'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - h); ctx.stroke();
  const L = (dx, dy, s, rot) => ell(ctx, cx + dx, cy + dy, 5 + s, 2.6 + s * .45, '#82d672', '#53a65e', rot);
  ctx.lineWidth = 1;
  L(-6 - f * 4, -h * .45, f * 4.5, -.5); L(6 + f * 4, -h * .45, f * 4.5, .5);
}

function drawPlot(i, p) {
  const x = FX + (i % COLS) * T, y = FY + ((i / COLS) | 0) * T, cx = x + T / 2, cy = y + T / 2, t = ck.t;
  if (p.s === 'locked') {
    if (canBuy(i)) {
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(255,255,255,.88)'; ctx.lineWidth = 2; rr(ctx, x + 5, y + 5, T - 10, T - 10, 10); ctx.stroke(); ctx.restore();
      txt(ctx, '+', cx, cy - 6, 20, '#7a4260', 900); txt(ctx, fmt(plotCost()), cx, cy + 12, 9.5, '#7a4260', 800);
    } else { ctx.fillStyle = 'rgba(255,255,255,.22)'; rr(ctx, x + 6, y + 6, T - 12, T - 12, 10); ctx.fill(); }
    return;
  }
  const wet = p.s === 'crop' && p.w && !p.dead;
  const base = p.s === 'grass' ? '#f0d8be' : wet ? '#966856' : '#ba8870';
  const edge = p.s === 'grass' ? '#d9bc9c' : wet ? '#784e3e' : '#9c6c56';
  ctx.fillStyle = edge; rr(ctx, x + 3, y + 5, T - 6, T - 7, 9); ctx.fill();
  ctx.fillStyle = base; rr(ctx, x + 3, y + 3, T - 6, T - 9, 9); ctx.fill();
  if (p.s === 'grass') {
    ctx.strokeStyle = '#92cfa4'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 4; k++) { const gx = x + 12 + ((i * 37 + k * 23) % 36), gy = y + 14 + ((i * 17 + k * 29) % 34); ctx.beginPath(); ctx.moveTo(gx - 3, gy); ctx.lineTo(gx, gy - 5); ctx.lineTo(gx + 3, gy); ctx.stroke(); }
  } else {
    ctx.strokeStyle = edge; ctx.lineWidth = 2;
    [16, 29, 42].forEach(d => { ctx.beginPath(); ctx.moveTo(x + 9, y + d); ctx.quadraticCurveTo(cx, y + d + 2.5, x + T - 9, y + d); ctx.stroke(); });
  }
  if (p.s === 'crop') {
    const c = CROPS[p.crop];
    if (p.dead) {
      emo(ctx, '🥀', cx, cy, 20);
    } else if (p.ripe) {
      drawSprout(cx, cy + 13, 1, false);
      ctx.save(); ctx.shadowColor = 'rgba(255,245,180,.95)'; ctx.shadowBlur = 10;
      emo(ctx, p.rainbow ? '🌈' : c.e, cx, cy - 3 + Math.sin(t * 3 + i) * 2, 27); ctx.restore();
    } else drawSprout(cx, cy + 11, p.g / c.days, p.g === 0);
    if (!p.dead && !p.ripe && !p.w) { ctx.globalAlpha = .55 + .45 * Math.sin(t * 4 + i); emo(ctx, '💧', x + T - 12, y + 12, 12); ctx.globalAlpha = 1; }
  }
  if (p.weed) emo(ctx, '🌿', cx - 10, cy + 8, 16);
  if (p.s === 'crop' && p.bug) emo(ctx, '🐛', cx + 11 + Math.sin(t * 5 + i) * 2.5, cy + 11, 16);
}

function drawWorldExtras() {
  const t = ck.t, nm = S.name || 'Cooky';
  // Biển tên nhà & sạp theo tên người chơi đặt
  ctx.fillStyle = '#ff9ebb'; rr(ctx, 76, 125, 72, 16, 4); ctx.fill();
  txt(ctx, `Nhà ${nm.slice(0, 8)}`, 112, 133.5, 9, '#fff', 800);
  ctx.fillStyle = '#ff85a8'; rr(ctx, 796, 166, 104, 22, 6); ctx.fill();
  txt(ctx, `SẠP ${nm.toUpperCase().slice(0, 8)}`, 848, 177.5, 10.5, '#fff', 900);

  // Dây đèn LED Giáng Sinh Pastel nhấp nháy trên mái nhà & sạp
  const cols = ['#ffb3c6', '#ffee93', '#b8f2e6', '#d8c2ff'];
  for (let i = 0; i < 9; i++) {
    const c = cols[(i + Math.floor(t * 3)) % 4];
    ell(ctx, 32 + i * 20, 119, 3, 3, c);
    ell(ctx, 770 + i * 20, 86, 3, 3, c);
  }

  // Người tuyết canh vườn
  if (S.up.scare) {
    const x = FX - 42, y = FY + 115;
    ell(ctx, x, y, 16, 5, 'rgba(90,50,80,.12)');
    ell(ctx, x, y - 12, 13, 12, '#fff', '#cbbcd1');
    ell(ctx, x, y - 28, 9.5, 9, '#fff', '#cbbcd1');
    ctx.fillStyle = '#ff8fb1'; rr(ctx, x - 9, y - 21, 18, 4, 2); ctx.fill();
    emo(ctx, '🎩', x, y - 39, 14);
  }
  if (S.up.sign) {
    const x = FX + COLS * T + 48, y = FY + 130;
    ctx.fillStyle = '#d9a7be'; rr(ctx, x - 34, y - 32, 68, 28, 7); ctx.fill();
    txt(ctx, `${nm.slice(0, 8)}`, x, y - 22, 9.5, '#fff', 900);
    txt(ctx, 'PASTEL FARM 🌸', x, y - 11, 7.5, '#fff', 800);
  }
  // Thú cưng chạy quanh thảo nguyên bên dưới ruộng
  let pi = 0;
  PETS.forEach(p => {
    if (!S.pets[p.id]) return;
    const px = 310 + pi * 115 + Math.sin(t * 1.4 + pi * 2) * 22;
    const py = 548 + Math.cos(t * 2 + pi) * 6;
    ell(ctx, px, py + 10, 14, 4, 'rgba(90,50,80,.1)');
    emo(ctx, p.e, px, py, 26);
    pi++;
  });
  // Các công trình Cột Mốc đã mở khóa
  if (S.miles.cafe) { emo(ctx, '☕', 420, 165, 28); txt(ctx, 'Tiệm Trà', 420, 186, 9, '#7a3b5e', 800); }
  if (S.miles.villa) { emo(ctx, '🏰', 112, 48, 28); }
  if (S.miles.park) { emo(ctx, '🎡', 525, 155, 34); txt(ctx, 'Wonderland', 525, 184, 9, '#7a3b5e', 800); }
  if (S.miles.legend) { emo(ctx, '👑', FX + COLS * T / 2, FY - 24, 26); }
}

function drawGreenhouse() {
  if (!S.up.green) return;
  const x = FX - 8, y = FY - 4, w = COLS * T + 16, h = ROWS * T + 10;
  ctx.fillStyle = 'rgba(235,248,255,.15)'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
}

/* ---------- Main Render ---------- */
function darkness() { const m = S.min; if (m < 420) return .22 * (1 - (m - 360) / 60); if (m < 1050) return 0; return Math.min(.42, (m - 1050) / 180 * .42); }
function render() {
  ctx.setTransform(K, 0, 0, K, 0, 0);
  ctx.drawImage(bg, 0, 0, W, H);
  if (!S) return;
  const t = ck.t;
  drawWorldExtras();
  S.plots.forEach((p, i) => drawPlot(i, p));
  drawGreenhouse();

  const qs = (cur ? [cur] : []).concat(queue);
  qs.forEach((j, n) => {
    if (j.type !== 'tile') return;
    const x = FX + (j.i % COLS) * T + 10, y = FY + ((j.i / COLS) | 0) * T + 10;
    ell(ctx, x, y, 7, 7, '#ff8fb1', '#fff'); txt(ctx, String(n + 1), x, y + .5, 8.5, '#fff', 900);
  });

  if (S.up.koya) drawKoya(ctx, 795, 486, t, (Math.floor(t / 9) % 3) !== 0);
  drawCooky(ctx, ck.x, ck.y, .95, { t, face: ck.face, walk: ck.walk, hop: ck.act > 0 ? Math.sin((.35 - ck.act) / .35 * Math.PI) * 8 : 0, lift: ck.lift > 0, eat: ck.eat > 0, fish: ck.fish > 0, tired: S.st < 15 });
  // Nhãn tên Pastel phía trên nhân vật
  ctx.font = `800 10px ${FONT}`;
  const nw = ctx.measureText(S.name).width + 12;
  ctx.fillStyle = 'rgba(255,248,252,.85)'; ctx.strokeStyle = '#f3b8ce'; ctx.lineWidth = 1.2;
  rr(ctx, ck.x - nw / 2, ck.y + 5, nw, 15, 7); ctx.fill(); ctx.stroke();
  txt(ctx, S.name, ck.x, ck.y + 12.8, 9.5, '#63324d', 800);

  if (ck.iconT > 0) { ctx.globalAlpha = Math.min(1, ck.iconT * 2); emo(ctx, ck.icon, ck.x + 20, ck.y - 70 - (1 - ck.iconT) * 14, 18); ctx.globalAlpha = 1; }
  parts.forEach(p => { ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2)); ell(ctx, p.x, p.y, p.r, p.r, p.col); }); ctx.globalAlpha = 1;

  // Hiệu ứng Thời tiết Pastel
  if (S.weather === 'snow') {
    drops.forEach(d => ell(ctx, d.x, d.y, d.r, d.r, 'rgba(255,255,255,.88)'));
  } else if (S.weather === 'rain') {
    ctx.strokeStyle = 'rgba(200,225,255,.6)'; ctx.lineWidth = 1.4; ctx.beginPath();
    drops.forEach(d => { ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 3, d.y + 11); }); ctx.stroke();
  } else if (S.weather === 'fog') {
    for (let k = 0; k < 3; k++) {
      const fx = ((t * (12 + k * 6) + k * 330) % (W + 500)) - 250, fy = 160 + k * 150;
      const gr = ctx.createRadialGradient(fx, fy, 10, fx, fy, 250);
      gr.addColorStop(0, 'rgba(255,235,245,.36)'); gr.addColorStop(1, 'rgba(255,235,245,0)');
      ctx.fillStyle = gr; ctx.fillRect(fx - 250, fy - 250, 500, 500);
    }
  }

  const d = darkness();
  if (d > 0) {
    ctx.fillStyle = `rgba(48,32,78,${d})`; ctx.fillRect(0, 0, W, H);
    if (S.min > 1000) {
      ctx.globalCompositeOperation = 'lighter';
      [[65, 147, 52], [157, 147, 52], [208, 155, 65], [674, 150, 60], [848, 110, 75], [ck.x, ck.y - 30, 60]].forEach(([x, y, r]) => {
        const gr = ctx.createRadialGradient(x, y, 2, x, y, r);
        gr.addColorStop(0, `rgba(255,215,150,${d * .65})`); gr.addColorStop(1, 'rgba(255,215,150,0)');
        ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2);
      });
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  floats.forEach(f => {
    ctx.globalAlpha = Math.min(1, f.life * 1.5); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.92)';
    ctx.font = `900 14px ${FONT}`; ctx.textAlign = 'center'; ctx.strokeText(f.txt, f.x, f.y);
    txt(ctx, f.txt, f.x, f.y, 14, f.col, 900);
  }); ctx.globalAlpha = 1;

  if (ck.bubT > 0) {
    ctx.font = `700 12px ${FONT}`; const w = ctx.measureText(ck.bub).width + 18, bx = clamp(ck.x - w / 2, 6, W - w - 6), by = ck.y - 108;
    ctx.globalAlpha = Math.min(1, ck.bubT * 3); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#f3b8ce'; ctx.lineWidth = 2; rr(ctx, bx, by, w, 24, 10); ctx.fill(); ctx.stroke();
    txt(ctx, ck.bub, bx + w / 2, by + 12.5, 12, '#523244', 700); ctx.globalAlpha = 1;
  }

  if (hover && !blocked()) {
    let label = null, lx = 0, ly = 0;
    const i = tileAt(hover.x, hover.y);
    if (i >= 0) {
      const x = FX + (i % COLS) * T, y = FY + ((i / COLS) | 0) * T;
      ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 2.5; rr(ctx, x + 2, y + 2, T - 4, T - 4, 10); ctx.stroke();
      label = hint(i); lx = x + T / 2; ly = y - 4;
    } else {
      for (const k in ZONES) {
        const z = ZONES[k];
        if (hover.x > z.x && hover.x < z.x + z.w && hover.y > z.y && hover.y < z.y + z.h) { label = z.n; lx = z.x + z.w / 2; ly = z.y + 8; }
      }
    }
    if (label) {
      ctx.font = `800 11px ${FONT}`; const w = ctx.measureText(label).width + 14, bx = clamp(lx - w / 2, 4, W - w - 4);
      ctx.fillStyle = 'rgba(82,50,68,.9)'; rr(ctx, bx, ly - 20, w, 19, 8); ctx.fill();
      txt(ctx, label, bx + w / 2, ly - 10, 11, '#fff', 800);
    }
    cv.style.cursor = label ? 'pointer' : 'default';
  }
}

function hint(i) {
  const p = S.plots[i];
  if (p.s === 'locked') return canBuy(i) ? `Mở rộng ô ruộng: ${fmt(plotCost())}` : 'Mở ô sát ruộng trước';
  if (p.weed) return 'Nhổ cỏ (-2⚡)';
  if (p.s === 'crop' && p.bug) return 'Bắt sâu (-2⚡)';
  if (p.s === 'grass') return `Cuốc đất (-${hoeCost()}⚡)`;
  if (p.s === 'tilled') { const c = CROPS[S.sel]; return S.seeds[S.sel] > 0 ? `Gieo ${c.n} (-1⚡)` : `Hết hạt ${c.n} – mở Sạp mua`; }
  const c = CROPS[p.crop];
  if (p.dead) return 'Dọn cây héo (-2⚡)';
  if (p.ripe) return `Thu hoạch ${p.rainbow ? 'Cà rốt cầu vồng!' : c.n} (-1⚡)`;
  if (!p.w) return `Tưới ${c.n} (-${canCost()}⚡)`;
  return `${c.n}: còn ${c.days - p.g} ngày ✓ đã tưới`;
}

/* ---------- Gameplay Actions ---------- */
function jobPos(j) {
  if (j.type === 'tile') return { x: tcx(j.i), y: tcy(j.i) + T / 2 - 5 };
  if (j.type === 'walk') return { x: j.x, y: j.y };
  return ZONES[j.type].pos;
}
function need(c) { if (S.st >= c) return true; say('Hết sức rồi… ăn 🥕 hoặc uống sinh tố thôi!'); SFX.err(); queue = []; return false; }
function spend(c, mins) { S.st -= c; S.min += mins; }

function perform(j) {
  if (j.type === 'tile') return doTile(j.i);
  if (j.type === 'stall') return openShop('sell');
  if (j.type === 'cook') return openShop('cook');
  if (j.type === 'house') return askSleep();
  if (j.type === 'gym') return doGym();
  if (j.type === 'lake') return doFish();
}

function doTile(i) {
  const p = S.plots[i], x = tcx(i), y = tcy(i);
  if (p.s === 'locked') return;
  if (p.weed) { if (!need(2)) return; spend(2, 8); p.weed = false; puff(x, y, '#7bc49e', 10); SFX.till(); act('🌿'); progQuest('water', 1); addXp(2); return; }
  if (p.s === 'crop' && p.bug) { if (!need(2)) return; spend(2, 5); p.bug = false; puff(x, y, '#a8e6cf', 6); SFX.pop(); act('🫳'); float(x, y - 20, 'Bắt sâu!', '#3b9e66'); progQuest('water', 1); addXp(3); return; }
  if (p.s === 'grass') { const c = hoeCost(); if (!need(c)) return; spend(c, 12); p.s = 'tilled'; puff(x, y + 10, '#ba8870', 10); SFX.till(); act('⛏️'); addXp(2); return; }
  if (p.s === 'tilled') {
    const k = S.sel;
    if (!S.seeds[k]) { toast(`Hết hạt ${CROPS[k].e} ${CROPS[k].n}! Chọn hạt khác hoặc vào 🛒 Sạp mua.`); SFX.err(); queue = queue.filter(q => q.type !== 'tile' || S.plots[q.i].s !== 'tilled'); return; }
    if (!need(1)) return; spend(1, 5); S.seeds[k]--;
    const autoWet = S.weather === 'rain' || S.weather === 'snow';
    Object.assign(p, { s: 'crop', crop: k, g: 0, w: autoWet, dry: 0, ripe: false, rd: 0, dead: false, bug: false, rainbow: false });
    SFX.plant(); act('🌱'); puff(x, y + 8, '#d9bc9c', 5); addXp(2); return;
  }
  if (p.s === 'crop') {
    const c = CROPS[p.crop];
    if (p.dead) { if (!need(2)) return; spend(2, 5); clearPlot(p); puff(x, y, '#9c6c56', 8); SFX.till(); act('🧹'); return; }
    if (p.ripe) {
      if (!need(1)) return; spend(1, 5);
      const e = p.rainbow ? 'rainbow' : p.crop;
      const extra = harvestPlot(p);
      float(x, y - 22, `+${1 + extra} ${itemInfo(e).e}`, '#d95b88');
      if (extra) say('Được mùa, thêm 1 trái! ✨');
      puff(x, y - 6, '#ffee93', 12); SFX.harvest(); act('✨'); return;
    }
    if (!p.w) {
      const cc = canCost(); if (!need(cc)) return; spend(cc, 5); p.w = true;
      for (let k = 0; k < 10; k++) parts.push({ x: x + rnd(-16, 16), y: y - 18, vx: rnd(-10, 10), vy: rnd(40, 100), life: .35, col: '#92ccf0', r: 2.2 });
      SFX.water(); act('💧'); progQuest('water', 1); addXp(2); return;
    }
    toast(`${c.e} ${c.n}: còn ${c.days - p.g} ngày nữa là chín.`);
  }
}

function doGym() {
  if (S.gymDay === S.day) { say('Hôm nay tập rồi, nghỉ cơ mai tập tiếp! 💪'); return; }
  if (!need(10)) return;
  spend(10, 50); S.maxSt += 5; S.gymDay = S.day; ck.lift = 2.0; SFX.gym(); progQuest('gym', 1); addXp(10);
  setTimeout(() => { say('Sức tối đa +5! Khỏe khoắn quá 💪'); float(ck.x, ck.y - 90, '+5 ⚡ tối đa', '#d95b88'); }, 1200);
}

function doFish() {
  const cost = S.up.rod ? 4 : 6;
  if (!need(cost)) return;
  spend(cost, 25); ck.face = -1; ck.fish = 1.5; SFX.water();
  setTimeout(() => {
    if (!S) return;
    S.today.fish = (S.today.fish || 0) + 1; S.stats.fish = (S.stats.fish || 0) + 1;
    progQuest('fish', 1); addXp(8);
    // 18% cơ hội vớt được Hộp quà Noel trôi hồ
    if (Math.random() < (S.up.rod ? .24 : .16)) {
      const cash = ri(70, 160), sd = pick(CK);
      earn(cash); S.seeds[sd] += 2; addFans(25);
      SFX.win();
      float(ck.x, ck.y - 90, `🎁 +${fmt(cash)} & +2 ${CROPS[sd].e}`, '#8e5ec4');
      say('Vớt được Hộp Quà Giáng Sinh dưới hồ! 🎁');
      return;
    }
    const fk = S.up.rod ? pick(['salmon', 'shrimp', 'star', 'carp']) : pick(['carp', 'carp', 'shrimp', 'salmon', 'star']);
    const fi = FISH[fk];
    S.inv[fk] = (S.inv[fk] || 0) + 1;
    if (fi.fans) addFans(fi.fans);
    SFX.harvest();
    float(ck.x, ck.y - 90, `+1 ${fi.e} ${fi.n}`, '#3b9e66');
    say(`Câu được ${fi.e} ${fi.n}!`);
  }, 1100);
}

function eatCarrot() {
  if (blocked()) return;
  if (S.inv.carrot <= 0) { toast('Hết cà rốt trong kho rồi! Trồng thêm 🥕 hoặc vào 🧁 Bếp bánh dùng món nhé.'); SFX.err(); return; }
  if (S.st >= S.maxSt) { say('Đang tràn trề năng lượng rồi!'); return; }
  const heal = 20 + ((S.fr?.rj || 1) - 1) * 4;
  S.inv.carrot--; S.st = Math.min(S.maxSt, S.st + heal); S.min += 10; ck.eat = 1.0; SFX.pop();
  float(ck.x, ck.y - 90, `+${heal} ⚡`, '#e07a5f'); say(pick(['Cà rốt Đà Lạt ngọt lịm~ 🥕', 'Nạp đầy năng lượng! ✨']));
}

function enqueue(j) {
  if (j.type === 'tile' && ((cur && cur.type === 'tile' && cur.i === j.i) || queue.some(q => q.type === 'tile' && q.i === j.i))) return;
  if (j.type === 'walk') queue = [];
  if (queue.length >= 16) { toast('Đang xếp nhiều việc quá, đợi một chút nhé!'); return; }
  queue.push(j); SFX.click();
}

function buyPlot(i) {
  const c = plotCost();
  modal({ ic: '🌸', t: 'Mở rộng ô đất mới?', d: `<p class="c">Khai hoang thêm 1 ô đất màu mỡ với giá <b>${fmt(c)}</b>.</p>`, b: [
    [`Mở ô (${fmt(c)})`, () => {
      if (S.cash < c) { toast('Chưa đủ tiền rồi! 💸'); SFX.err(); return; }
      S.cash -= c; S.bought++; S.plots[i].s = 'grass'; puff(tcx(i), tcy(i), '#ffee93', 14); SFX.coin(); checkBadges(); save();
    }],
    ['Để sau', null, 'o']] });
}

function askRename() {
  modal({
    ic: '🏷️', t: 'Đổi tên nhân vật',
    d: `<p class="c">Nhập tên mới cho chú thỏ của bạn:</p><input id="modalNameInp" class="modal-inp" type="text" maxlength="16" value="${S.name}">`,
    b: [
      ['Lưu tên mới ✨', () => {
        const el = $('#modalNameInp');
        if (el && el.value.trim()) { S.name = el.value.trim().slice(0, 16); updateHud(); save(); toast(`Đã đổi tên thành <b>${S.name}</b>! 🌸`); }
      }],
      ['Huỷ', null, 'o']
    ]
  });
}

function askSleep() {
  const early = S.min < 1080;
  modal({ ic: '🛏️', t: 'Về nhà nghỉ ngơi?', d: `<p class="c">Kết thúc <b>ngày ${S.day}</b>${early ? ' sớm' : ''}. Cây đã tưới sẽ lớn qua đêm và nhận lợi tức từ Thú cưng & Cột mốc!</p>`, b: [['Ngủ ngon 😴', () => endDay(false)], ['Làm tiếp', null, 'o']] });
}
function passOut() {
  queue = []; cur = null;
  modal({ ic: '😵', t: `${S.name} ngủ gục ngoài sương lạnh!`, d: '<p class="c">Đã quá 0 giờ đêm… Sáng mai thức dậy chỉ còn <b>50% sức lực</b>.</p>', b: [['Ôi thương quá… 🥲', () => endDay(true)]] });
}

/* ---------- Day Cycle & Progression ---------- */
function rollWx() { const r = Math.random(); return r < .32 ? 'snow' : r < .68 ? 'sun' : r < .86 ? 'rain' : 'fog'; }

function endDay(passed) {
  queue = []; cur = null;
  const L = [], d = S.day;
  L.push(`<p>💰 Doanh thu hôm nay: <b>${fmt(S.today.earn)}</b> · Thu hoạch: <b>${S.today.harv}</b> · Câu cá: <b>${S.today.fish || 0}</b></p>`);

  if (S.up.koya) {
    if (S.cash >= 30) {
      S.cash -= 30;
      if (Math.random() < .75) {
        let n = 0; S.plots.forEach(p => { if (p.s === 'crop' && p.ripe && !p.dead) { harvestPlot(p); n++; } });
        L.push(n ? `<p>🐨 Koya hái giúp <b>${n}</b> ô chín (lương 30k).</p>` : '<p>🐨 Koya đi dạo quanh vườn canh sương đêm.</p>');
      } else L.push('<p>🐨 Koya ôm gối ngủ quên mất tiêu… (vẫn trả 30k 💤)</p>');
    } else { S.up.koya = false; L.push('<p>🐨 Chưa đủ 30k trả lương, Koya tạm nghỉ.</p>'); }
  }

  // Thu nhập thụ động từ Thú cưng & Công trình Cột mốc
  let pCash = 0, pFan = 0;
  if (S.pets.chick) pCash += 45;
  if (S.pets.sheep) { pCash += 85; pFan += 15; }
  if (S.pets.cat) pFan += 25;
  if (S.pets.deer) { pCash += 130; const sk = pick(CK); S.seeds[sk] += 2; L.push(`<p>🦌 Tuần lộc Mũi Hồng tặng 2 hạt ${CROPS[sk].e} ${CROPS[sk].n}!</p>`); }
  if (S.up.scare) pFan += 10;
  MILES.forEach(m => { if (S.miles[m.id]) { pCash += m.income; pFan += m.fans; } });
  if (pCash || pFan) {
    earn(pCash); addFans(pFan);
    L.push(`<p>🐣✨ Thú cưng & Công trình mang về: <b>+${fmt(pCash)}</b> & <b>+${pFan}💜</b></p>`);
  }

  let grown = 0, died = 0, rot = 0;
  const rChance = .02 + ((S.fr?.tata || 1) - 1) * .02;
  S.plots.forEach(p => {
    if (p.s !== 'crop' || p.dead) return;
    const c = CROPS[p.crop];
    if (p.ripe) { p.rd++; if (p.rd >= 4) { p.dead = true; rot++; } }
    else if (p.w && !p.weed && !p.bug) {
      p.g++; p.dry = 0;
      if (p.g >= c.days) { p.ripe = true; p.rd = 0; grown++; if (Math.random() < rChance) p.rainbow = true; }
    } else if (!p.w) { p.dry++; if (p.dry >= 3) { p.dead = true; died++; } }
    p.w = false;
  });
  if (grown) L.push(`<p>🌸 <b>${grown}</b> ô cây đã chín rộ!</p>`);
  if (died) L.push(`<p>🥀 ${died} ô héo vì 3 ngày quên tưới.</p>`);
  if (rot) L.push(`<p>🍂 ${rot} ô chín để quá lâu bị hỏng.</p>`);

  S.day++;
  if (!S.endless && S.day > DAYS && !S.miles.concert) {
    save(); return finalEnding();
  }
  if (S.day > DAYS && S.miles.concert && !S.endless) S.endless = true;

  S.weather = S.tmr; S.tmr = rollWx();
  CK.forEach(k => { S.prev[k] = S.price[k]; S.price[k] = clamp(+(S.price[k] + rnd(-.18, .18) + (1 - S.price[k]) * .25).toFixed(2), .65, 1.65); });
  S.st = Math.round(S.maxSt * (passed ? .5 : 1)); S.min = 360;
  S.today = { earn: 0, harv: 0, fish: 0, cook: 0 };
  rollQuests(S);
  ck.x = ZONES.house.pos.x; ck.y = ZONES.house.pos.y; ck.face = 1;

  const M = [];
  if (S.weather === 'snow') { waterAll(); M.push('❄️ Tuyết Giáng Sinh rơi – cả cánh đồng được tưới mát & giá bán +10%!'); }
  else if (S.weather === 'rain') { waterAll(); M.push('🌧️ Mưa phùn Đà Lạt – cả ruộng đã được tưới.'); }
  else if (S.up.sprk) { waterAll(); M.push('💦 Hệ thống phun sương đã tưới đẫm cả ruộng.'); }

  let w = 0, b = 0;
  const weedRate = Math.max(.01, .05 - ((S.fr?.koya || 1) - 1) * .01);
  S.plots.forEach(p => {
    if (p.s === 'locked') return;
    if (!p.weed && Math.random() < weedRate) { p.weed = true; w++; }
    if (!S.pets.cat && p.s === 'crop' && !p.ripe && !p.dead && !p.bug && Math.random() < (S.up.green ? .02 : .05)) { p.bug = true; b++; }
  });
  if (S.pets.cat) M.push('🐱 Mèo Tuyết Meow đi tuần, ruộng không có bóng dáng sâu bọ!');
  if (w) M.push(`🌿 ${w} bụi cỏ dại mọc lên.`);
  if (b) M.push(`🐛 ${b} ô bị sâu – chạm vào bắt ngay nhé!`);

  const cm = curMile();
  modal({
    ic: '🌙', t: `Khép lại Ngày ${d}`,
    d: L.join('') + `<hr style="border:0;border-top:1px dashed #f3b8ce;margin:.5em 0"><p><b>☀️ Ngày ${S.day}</b> · ${WX[S.weather].e} ${WX[S.weather].n} · mai ${WX[S.tmr].e}</p>` + M.map(m => `<p>${m}</p>`).join('') + `<p>🎯 Mục tiêu hiện tại: <b>${cm.e} ${cm.n}</b> (${fmt(Math.min(S.cash, cm.cost))}/${fmt(cm.cost)})</p>`,
    b: [['Bắt đầu ngày mới 🌸', () => { maybeEvent(); save(); }]]
  });
}

function finalEnding() {
  if (S.cash >= 5000 || S.miles.concert) return unlockMilestone('concert');
  if (S.fans >= 4000) {
    S.miles.concert = true; S.endless = true; SFX.win();
    modal({
      ic: '📱💜', t: `Fan góp tặng vé Concert cho ${S.name}!`,
      d: `<p>Dù chưa tích đủ 5 triệu tiền mặt, nhưng <b>${fmtFans(S.fans)} Fan</b> yêu mến kênh nông trại Pastel của <b>${S.name}</b> đã chung tay gửi tặng vé bay sang Seoul dự BTS Winter Concert! 🥹🎄</p><p>✨ <b>Mở khóa Chế Độ Tự Do Vĩnh Cửu (Endless Mode)</b>: Bạn có thể chơi tiếp không giới hạn ngày để xây Tiệm Trà Bánh, Biệt Thự Pastel và Công Viên Tuyết Wonderland!</p>`,
      b: [['🌸 Chơi tiếp Chế độ Vĩnh Cửu!', () => save()], ['Về màn hình chính', () => backToTitle(), 'o']]
    });
    return;
  }
  modal({
    ic: '🎄💜', t: 'Đêm Giáng Sinh Ấm Áp',
    d: `<p>30 ngày mùa lễ hội đã khép lại. Bạn có muốn <b>Chơi tiếp không giới hạn ngày (Endless Mode)</b> để tiếp tục chăm vườn, nuôi thú cưng và chinh phục 5 Cột Mốc Lớn không?</p>`,
    b: [['🌸 Chơi tiếp không giới hạn ngày!', () => { S.endless = true; save(); }], ['🌱 Chơi lại từ đầu', () => startNew(S.name), 'o']]
  });
}

function unlockMilestone(id) {
  const m = MILES.find(x => x.id === id);
  if (!m || S.miles[id]) return;
  if (S.cash < m.cost) { toast(`Cần đủ <b>${fmt(m.cost)}</b> để mở khóa ${m.n}!`); return; }
  S.cash -= m.cost; S.miles[id] = true; S.endless = true;
  if (id === 'villa') { S.maxSt += 50; S.st += 50; }
  SFX.jingle(); checkBadges(); save(); updateHud();
  modal({
    ic: m.e + '🎉', t: `Chúc mừng mở khóa ${m.n}!`,
    d: `<p>${m.d}</p><p>✨ <b>Đặc quyền nhận được:</b> Thu nhập thụ động <b>+${fmt(m.income)}/ngày</b> & <b>+${m.fans}💜/ngày</b>!</p><p>🌸 Bạn đang ở <b>Chế độ Tự Do Vĩnh Cửu</b> — hãy tiếp tục mở rộng nông trại và chinh phục các cột mốc tiếp theo nhé!</p>`,
    b: [['Tuyệt vời quá! 💜', () => { renderShop(); save(); }]]
  });
}

/* ---------- Events ---------- */
const EVS = [
  { id: 'santa_rj', w: 3, c: () => true, f: () => ({ ic: '🎅🦙', t: 'Ông già Noel RJ ghé thăm!', d: `RJ đội nón Noel mang theo túi quà bánh nóng hổi tới thăm <b>${S.name}</b> giữa sương lạnh Đà Lạt!`, b: [
    ['Nhận quà Giáng Sinh 🎁', () => { S.st += 35; S.seeds.snowfl += 2; earn(80); SFX.jingle(); return '+35⚡, +80k và 2 hạt ❄️ Hoa Tuyết!'; }],
    ['Cùng RJ phát quà (+180💜)', () => { addFans(180); S.fr.rj = Math.min(5, (S.fr.rj || 1) + 1); return 'Cả xóm yêu quý: +180💜 & tăng thân thiết RJ!'; }, 'b']] }) },
  { id: 'chimmy', w: 3, c: () => invCount() > 0, f: () => ({ ic: '🐶', t: 'Chimmy đặt giỏ quà Noel', d: `Chimmy chạy tới vẫy đuôi: “${S.name} ơi, bán cho tớ ít nông sản giá gấp đôi để làm giỏ quà Giáng Sinh nha!”`, b: [
    ['Bán ngay giá x2 💰', () => { let v = 0, n = 0; for (let i = 0; i < 4; i++) { const k = randInv(); if (!k) break; v += sell(k, 1, 2); n++; } SFX.coin(); return `Thu về ${fmt(v)} cho ${n} món!`; }],
    ['Tặng Chimmy luôn 💜', () => { for (let i = 0; i < 2; i++) { const k = randInv(); if (k) S.inv[k]--; } addFans(160); S.fr.chimmy = Math.min(5, (S.fr.chimmy || 1) + 1); return '+160💜 & tăng cấp thân thiết Chimmy!'; }, 'b']] }) },
  { id: 'shooky', w: 2.5, c: () => ripes().length > 0, f: () => S.up.scare ? { ic: '🍪', t: 'Shooky sợ Người Tuyết!', d: 'Shooky định lẻn vào vườn nhưng thấy Người Tuyết Canh Vườn dễ thương quá nên đứng chụp hình rồi về! 😆', b: [['Đáng yêu ghê (+60💜)', () => { addFans(60); return '+60💜 từ ảnh check-in của Shooky!'; }]] } :
    { ic: '🍪', t: 'Shooky nghịch tuyết trong vườn!', d: 'Shooky dẫn đội bánh quy lăn cầu tuyết qua luống rau chín!', b: [
      ['Chơi ném tuyết cùng (-10⚡)', () => { S.st = Math.max(0, S.st - 10); S.seeds.straw += 2; S.fr.shooky = Math.min(5, (S.fr.shooky || 1) + 1); return 'Shooky khoái chí tặng lại 2 hạt 🍓 & tăng thân thiết!'; }],
      ['Nhắc Shooky cẩn thận', () => `Mất ${stealRipe(1)} ô chín. (Sắm Người Tuyết ở mục Nâng cấp nhé!)`, 'o']] } },
  { id: 'tata', w: 2.5, c: () => growing().length > 0, f: () => ({ ic: '💜', t: 'Phép màu Giáng Sinh của Tata', d: `Tata hóa thành tuần lộc mũi tim hồng, rắc bụi sao pastel lên cánh đồng của <b>${S.name}</b>!`, b: [
    ['Ước cây lớn nhanh 🌱', () => { growing().forEach(p => { if (!p.weed && !p.bug) { p.g++; if (p.g >= CROPS[p.crop].days) { p.ripe = true; p.rd = 0; } } }); return 'Toàn bộ cây trên ruộng lớn thêm 1 ngày!'; }],
    ['Ước Cà rốt Cầu Vồng 🌈', () => { const p = pick(growing()); p.ripe = true; p.rd = 0; p.rainbow = true; return '1 ô biến thành 🌈 Cà rốt cầu vồng (420k)!'; }, 'b']] }) },
  { id: 'mang', w: 2.5, c: () => true, f: () => ({ ic: '🐴', t: 'Mang rủ quay Dance Challenge Noel', d: 'Mang bật nhạc Jingle Bells remix cực cuốn ngay trước hiên nhà gỗ hồng pastel!', b: [
    ['Nhảy cùng Mang (-8⚡)', () => { S.st = Math.max(0, S.st - 8); const f = ri(280, 650); addFans(f); S.viral = S.day; S.fr.mang = Math.min(5, (S.fr.mang || 1) + 1); return `🔥 Video lên xu hướng! +${f}💜 & giá bán +20% hôm nay!`; }],
    ['Đứng cổ vũ quay clip', () => { const f = ri(120, 260); addFans(f); return `+${f}💜 theo dõi mới!`; }, 'o']] }) },
  { id: 'jk', w: 3, c: () => !S.jk && S.inv.straw >= 1, f: () => ({ ic: '🧢', t: 'Vị khách đêm Giáng Sinh', d: `Một chàng trai đội mũ len ấm áp ghé sạp mua hết dâu tây với giá gấp 3, kèm tấm thiệp: “Giáng Sinh an lành nhé <b>${S.name}</b>! – JK 🐰💜”`, b: [
    ['Cảm động quá!!! 😭💜', () => { S.jk = true; const v = sell('straw', S.inv.straw, 3); addFans(600); SFX.jingle(); return `Thu ${fmt(v)} và +600💜!`; }]] }) },
  { id: 'market', w: 2.5, c: () => true, f: () => { const k = pick(CK), c = CROPS[k]; return { ic: '📈', t: `Lễ hội ẩm thực Đà Lạt cần ${c.n}!`, d: `Chợ đêm Đà Lạt đang săn đón ${c.e} ${c.n} để phục vụ du khách mùa Noel. Giá thu mua hôm nay tăng vọt!`, b: [['Tuyệt vời!', () => { S.price[k] = 1.85; return `${c.e} ${c.n} hôm nay tăng giá x1.85!`; }]] }; } },
];

function maybeEvent() {
  if (Math.random() > .68) return;
  const pool = EVS.filter(e => e.id !== S.lastEv && e.c());
  if (!pool.length) return;
  let r = Math.random() * pool.reduce((a, e) => a + e.w, 0), ev = pool[0];
  for (const e of pool) { r -= e.w; if (r <= 0) { ev = e; break; } }
  S.lastEv = ev.id; S.stats.ev++;
  const o = ev.f(); SFX.ev();
  modal({ ic: o.ic, t: o.t, d: `<p>${o.d}</p>`, b: o.b.map(([label, fn, cls]) => [label, () => { const m = fn ? fn() : null; if (m) toast(m, 3800); save(); }, cls]) });
}

/* ---------- Modal ---------- */
const modalQ = []; let modalCur = null;
function modal(o) { modalQ.push(o); if (!modalCur) nextModal(); }
function nextModal() {
  modalCur = modalQ.shift() || null; const m = $('#modal');
  if (!modalCur) { m.hidden = true; return; }
  $('#mIc').textContent = modalCur.ic || ''; $('#mT').textContent = modalCur.t || ''; $('#mD').innerHTML = modalCur.d || '';
  const B = $('#mB'); B.innerHTML = '';
  (modalCur.b || [['OK', null]]).forEach(([label, fn, cls]) => {
    const b = document.createElement('button'); b.className = 'btn' + (cls ? ' ' + cls : ''); b.textContent = label;
    b.onclick = () => { SFX.click(); modalCur = null; nextModal(); if (fn) fn(); };
    B.appendChild(b);
  });
  m.hidden = false;
}
const blocked = () => titleOpen || !!modalCur || shopOpen || !S || S.over;

/* ---------- Multi-Tab Pastel Hub ---------- */
function openShop(tab) {
  if (tab) shopTab = tab;
  shopOpen = true; $('#shop').hidden = false;
  $('#shopTitle').textContent = `🌸 Sạp của ${S.name}`;
  renderShop(); SFX.pop();
}
function closeShop() { shopOpen = false; $('#shop').hidden = true; save(); }
function trend(k) {
  if (!CROPS[k]) return '<small class="up">Đặc sản</small>';
  const d = S.price[k] - S.prev[k]; if (Math.abs(d) < .01) return '<small>–</small>';
  const pc = Math.round(d / S.prev[k] * 100);
  return d > 0 ? `<small class="up">▲ ${pc}%</small>` : `<small class="dn">▼ ${-pc}%</small>`;
}

function renderShop() {
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === shopTab));
  const B = $('#shopBody'), F = $('#shopFoot'); let h = '', f = '';
  if (shopTab === 'sell') {
    const keys = [...CK, 'rainbow', ...FK, ...RECIPES.map(r => r.id)].filter(k => CK.includes(k) || S.inv[k] > 0);
    keys.forEach(k => {
      const it = itemInfo(k), n = S.inv[k] || 0;
      h += `<div class="li"><span class="e">${it.e}</span><div class="nm"><b>${it.n}</b><small>Trong kho: ${n}</small></div><div class="pr"><b>${fmt(priceOf(k))}</b>${trend(k)}</div>
        <button class="btn o" data-a="s1" data-k="${k}" ${n ? '' : 'disabled'}>Bán 1</button><button class="btn g" data-a="sa" data-k="${k}" ${n ? '' : 'disabled'}>Bán hết</button></div>`;
    });
    const tot = allSellKeys().reduce((a, k) => a + priceOf(k) * S.inv[k], 0), bn = Math.round((bonus() - 1) * 100);
    f = `<span class="note">Bonus giá bán hiện tại: <b>+${bn}%</b> (Fan, Cột mốc, Thời tiết, BT21).</span>
      <button class="btn g" data-a="sell-all" ${tot ? '' : 'disabled'}>Bán tất cả (${fmt(tot)})</button>
      <button class="btn b" data-a="live" ${S.liveDay === S.day || !tot ? 'disabled' : ''}>📱 Livestream +35%</button>`;
  } else if (shopTab === 'seed') {
    CK.forEach(k => {
      const c = CROPS[k];
      h += `<div class="li"><span class="e">${c.e}</span><div class="nm"><b>${c.n} <small>(có ${S.seeds[k]})</small></b><small>Hạt ${fmt(c.seed)} · ${c.days} ngày · bán ~${fmt(priceOf(k))}${c.regrow ? ` · hái lặp ${c.regrow} ngày` : ''}${c.fans ? ` · +${c.fans}💜` : ''}</small></div>
        <button class="btn o" data-a="b1" data-k="${k}" ${S.cash >= c.seed ? '' : 'disabled'}>+1</button><button class="btn" data-a="b5" data-k="${k}" ${S.cash >= c.seed * 5 ? '' : 'disabled'}>+5</button><button class="btn b" data-a="b10" data-k="${k}" ${S.cash >= c.seed * 10 ? '' : 'disabled'}>+10</button></div>`;
    });
    f = `<span class="note">❄️ <b>Hoa Tuyết Noel</b> và 🍓 <b>Dâu Đà Lạt</b> tự ra trái lại sau khi thu hoạch!</span>`;
  } else if (shopTab === 'cook') {
    RECIPES.forEach(r => {
      const reqStr = Object.entries(r.req).map(([k, q]) => `${q} ${itemInfo(k).e} (có ${S.inv[k] || 0})`).join(' + ');
      const canMake = Object.entries(r.req).every(([k, q]) => (S.inv[k] || 0) >= q);
      const have = S.inv[r.id] || 0;
      h += `<div class="li"><span class="e">${r.e}</span><div class="nm"><b>${r.n} <small>(kho: ${have})</small></b><small>Cần: ${reqStr} · Bán ~${fmt(priceOf(r.id))}</small><small>${r.d}</small></div>
        <button class="btn" data-a="cook" data-k="${r.id}" ${canMake ? '' : 'disabled'}>Chế biến</button>
        <button class="btn g" data-a="eat-dish" data-k="${r.id}" ${have ? '' : 'disabled'}>Dùng (+${r.st}⚡)</button></div>`;
    });
    f = `<span class="note">🧁 Chế biến món ăn giúp tăng mạnh giá trị nông sản/cá câu được và nhận thêm nhiều Fan 💜!</span>`;
  } else if (shopTab === 'pet') {
    h += `<div class="subhead"><span>🐣 Nhận nuôi Thú Cưng Pastel</span><span>Chạy chơi trên đồng cỏ</span></div>`;
    PETS.forEach(p => {
      const own = S.pets[p.id];
      h += `<div class="li"><span class="e">${p.e}</span><div class="nm"><b>${p.n}</b><small>${p.d}</small></div>
        ${own ? '<span class="own">✓ Đang nuôi</span>' : `<button class="btn" data-a="pet" data-k="${p.id}" ${S.cash >= p.cost ? '' : 'disabled'}>Nhận nuôi (${fmt(p.cost)})</button>`}</div>`;
    });
    h += `<div class="subhead"><span>💜 Hội Bạn Thân BT21</span><span>Tặng quà (80k) tăng cấp buff</span></div>`;
    FRIENDS.forEach(fr => {
      const lv = S.fr[fr.id] || 1, gifted = S.frGiftDay[fr.id] === S.day;
      h += `<div class="li"><span class="e">${fr.e}</span><div class="nm"><b>${fr.n} · Cấp ${lv}/5</b><small>${fr.buff}</small></div>
        ${lv >= 5 ? '<span class="own">♥ Tối đa</span>' : `<button class="btn b" data-a="gift" data-k="${fr.id}" ${gifted || S.cash < 80 ? 'disabled' : ''}>${gifted ? 'Đã tặng hôm nay' : '🎁 Tặng quà (80k)'}</button>`}</div>`;
    });
    f = `<span class="note">Thú cưng tự động tặng tiền, hạt giống & bắt sâu mỗi sáng!</span>`;
  } else if (shopTab === 'up') {
    UPS.forEach(u => {
      const own = S.up[u.id];
      h += `<div class="li"><span class="e">${u.e}</span><div class="nm"><b>${u.n}</b><small>${u.d}</small></div>
        ${own ? '<span class="own">✓ Đã sắm</span>' : `<button class="btn" data-a="up" data-k="${u.id}" ${S.cash >= u.cost ? '' : 'disabled'}>${fmt(u.cost)}</button>`}</div>`;
    });
    f = `<span class="note">Mở rộng thêm ô ruộng bằng cách chạm vào ô dấu “+” trên cánh đồng (${fmt(plotCost())}/ô).</span>`;
  } else if (shopTab === 'goal') {
    h += `<div class="subhead"><span>📋 Nhiệm Vụ Hôm Nay (Ngày ${S.day})</span><span>Làm mới mỗi sáng</span></div>`;
    S.quests.forEach(q => {
      h += `<div class="li"><span class="e">${q.e}</span><div class="nm"><b>${q.n} (${q.cur}/${q.goal})</b><small>Thưởng: +${fmt(q.rCash)} & +${q.rFan}💜</small></div>
        ${q.done ? '<span class="own">✓ Hoàn thành</span>' : `<span class="sm">${Math.round(q.cur / q.goal * 100)}%</span>`}</div>`;
    });
    h += `<div class="subhead"><span>🏆 5 Cột Mốc Phát Triển Dài Hạn</span><span>Chơi tự do vĩnh cửu</span></div>`;
    MILES.forEach(m => {
      const own = S.miles[m.id];
      h += `<div class="li"><span class="e">${m.e}</span><div class="nm"><b>${m.n}</b><small>${m.d}</small></div>
        ${own ? '<span class="own">✓ Đã đạt</span>' : `<button class="btn g" data-a="mile" data-k="${m.id}" ${S.cash >= m.cost ? '' : 'disabled'}>${fmt(m.cost)}</button>`}</div>`;
    });
    h += `<div class="subhead"><span>🏅 Bộ Sưu Tập 12 Huy Hiệu (${Object.keys(S.badges).length}/12)</span><span>Thưởng tự động</span></div><div class="badge-grid">`;
    BADGES.forEach(b => {
      const ok = S.badges[b.id];
      h += `<div class="badge-card ${ok ? '' : 'locked'}"><span class="be">${b.e}</span><div><b>${b.n}</b><br><small>${b.d} (+${fmt(b.reward)})</small></div></div>`;
    });
    h += `</div>`;
    f = `<span class="note">🌟 Sau khi đạt Mốc 1 (Vé Concert), game mở khóa Chế độ Vĩnh Cửu để bạn xây dựng đế chế Pastel!</span>`;
  }
  B.innerHTML = h; F.innerHTML = f;
}

function shopAction(a, k) {
  if (a === 's1' || a === 'sa') {
    const v = sell(k, a === 's1' ? 1 : S.inv[k]);
    if (v) { SFX.coin(); float(ck.x, ck.y - 90, '+' + fmt(v), '#3b9e66'); }
  } else if (a === 'sell-all') {
    let v = 0; allSellKeys().forEach(x => { if (x !== 'carrot' || S.inv.carrot > 2) v += sell(x, S.inv[x]); });
    if (v) { SFX.coin(); float(ck.x, ck.y - 90, '+' + fmt(v), '#3b9e66'); toast(`Bán hàng thu về <b>+${fmt(v)}</b> 💰`); }
  } else if (a === 'live') {
    if (S.st < 10) { toast('Cần ít nhất 10⚡ để Livestream!'); SFX.err(); return; }
    const n = invCount(); S.st -= 10; S.min += 75; S.liveDay = S.day;
    let v = 0; allSellKeys().forEach(x => v += sell(x, S.inv[x], 1.35));
    const mangMul = 1 + ((S.fr?.mang || 1) - 1) * .15;
    let f = Math.round((ri(50, 110) + n * 12) * mangMul);
    let m = `📱 Livestream thành công! Thu <b>${fmt(v)}</b> · <b>+${f}💜</b>`;
    if (Math.random() < .25) { f += 800; S.viral = S.day + 1; m = `🔥 LÊN XU HƯỚNG! Thu <b>${fmt(v)}</b>, <b>+${f}💜</b>, ngày mai giá +20%!`; }
    addFans(f); addXp(15); SFX.win(); toast(m, 3800);
  } else if (a[0] === 'b') {
    const n = +a.slice(1), c = CROPS[k].seed * n;
    if (S.cash < c) return; S.cash -= c; S.seeds[k] += n; S.sel = k; SFX.coin();
  } else if (a === 'cook') {
    const r = RECIPES.find(x => x.id === k);
    if (!r || !Object.entries(r.req).every(([ik, q]) => (S.inv[ik] || 0) >= q)) return;
    Object.entries(r.req).forEach(([ik, q]) => S.inv[ik] -= q);
    S.inv[r.id] = (S.inv[r.id] || 0) + 1;
    S.today.cook = (S.today.cook || 0) + 1; S.stats.cook = (S.stats.cook || 0) + 1;
    addFans(r.fans); progQuest('cook', 1); addXp(12); SFX.win();
    toast(`🧁 Đã chế biến <b>${r.e} ${r.n}</b> (+${r.fans}💜)!`);
  } else if (a === 'eat-dish') {
    const r = RECIPES.find(x => x.id === k);
    if (!r || !S.inv[r.id]) return;
    S.inv[r.id]--; S.st = Math.min(S.maxSt + 20, S.st + r.st); SFX.pop();
    toast(`Thưởng thức ${r.e} ${r.n}: <b>+${r.st}⚡</b>!`);
  } else if (a === 'pet') {
    const p = PETS.find(x => x.id === k);
    if (!p || S.cash < p.cost || S.pets[k]) return;
    S.cash -= p.cost; S.pets[k] = true; addFans(50); addXp(20); SFX.jingle();
    toast(`🐣 Chào mừng <b>${p.e} ${p.n}</b> về với nông trại Pastel!`);
  } else if (a === 'gift') {
    if (S.cash < 80 || S.frGiftDay[k] === S.day || S.fr[k] >= 5) return;
    S.cash -= 80; S.frGiftDay[k] = S.day; S.fr[k] = (S.fr[k] || 1) + 1;
    addFans(40); addXp(15); SFX.win();
    const fr = FRIENDS.find(x => x.id === k);
    toast(`💜 Đã tặng quà cho <b>${fr.e} ${fr.n}</b>! Lên <b>Cấp thân thiết ${S.fr[k]}/5</b>!`);
  } else if (a === 'up') {
    const u = UPS.find(x => x.id === k);
    if (!u || S.cash < u.cost || S.up[k]) return;
    S.cash -= u.cost; S.up[k] = true; addXp(15); SFX.win();
    toast(`Đã sắm <b>${u.e} ${u.n}</b>!`);
    if (k === 'sprk') waterAll();
  } else if (a === 'mile') {
    unlockMilestone(k);
  }
  renderShop(); updateHud();
}

/* ---------- HUD & Loop ---------- */
function buildBar() {
  $('#seeds').innerHTML = CK.map((k, i) => `<button class="seed" data-k="${k}" title="${CROPS[k].n} (phím ${i + 1})"><span class="e">${CROPS[k].e}</span><b class="n">0</b><i class="key">${i + 1}</i></button>`).join('');
}
function updateHud() {
  if (!S) return;
  $('#hClock').textContent = hhmm(S.min);
  $('#hDay').textContent = S.endless ? `Ngày ${S.day} · Vĩnh Cửu 🌸` : `Ngày ${S.day}/${DAYS} 🎄`;
  $('#hWx').textContent = `${WX[S.weather].e} ${WX[S.weather].n}`;
  $('#hName').textContent = S.name;
  $('#hLv').textContent = `Lv.${S.lv || 1}`;
  const qDone = (S.quests || []).filter(q => q.done).length;
  $('#hQuestBadge').textContent = `${qDone}/${(S.quests || []).length || 3}`;
  const st = Math.max(0, Math.round(S.st)), pc = clamp(st / S.maxSt * 100, 0, 100), bar = $('#hSt');
  bar.style.width = pc + '%'; bar.classList.toggle('low', pc < 20); $('#hStT').textContent = `⚡ ${st}/${S.maxSt}`;
  $('#hCash').textContent = fmt(S.cash); $('#hFans').textContent = `💜 ${fmtFans(S.fans)}`;

  const cm = curMile();
  $('#hGoalName').textContent = `${cm.e} ${cm.n.split(':')[0]}`;
  $('#hGoal').style.width = clamp(S.cash / cm.cost * 100, 0, 100) + '%';
  $('#hGoalT').textContent = `${fmt(Math.min(S.cash, cm.cost))}/${fmt(cm.cost)}`;
  const canUnlockMile = !S.miles[cm.id] && S.cash >= cm.cost;
  const bt = $('#bTicket');
  bt.hidden = !canUnlockMile;
  if (canUnlockMile) bt.textContent = `✨ Mở khóa ${cm.e} ${cm.n.split(':')[0]}!`;

  document.querySelectorAll('.seed').forEach(b => {
    const k = b.dataset.k;
    b.querySelector('.n').textContent = S.seeds[k] || 0;
    b.classList.toggle('sel', S.sel === k);
    b.classList.toggle('zero', !S.seeds[k]);
  });
  $('#eatN').textContent = S.inv.carrot || 0;
  document.querySelectorAll('[data-sp]').forEach(b => b.classList.toggle('on', paused ? b.dataset.sp === '0' : b.dataset.sp == speed));
}

function update(dt) {
  ck.t += dt;
  for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 150 * dt; if (p.life <= 0) parts.splice(i, 1); }
  for (let i = floats.length - 1; i >= 0; i--) { const f = floats[i]; f.life -= dt; f.y -= 26 * dt; if (f.life <= 0) floats.splice(i, 1); }
  if (!S || titleOpen) return;

  if (S.weather === 'snow') {
    while (drops.length < 95) drops.push({ x: rnd(0, W), y: rnd(-H, 0), r: rnd(1.8, 3.6), vx: rnd(-18, 18), vy: rnd(38, 75) });
    drops.forEach(d => { d.y += d.vy * dt; d.x += (d.vx + Math.sin(ck.t + d.y * .02) * 12) * dt; if (d.y > H) { d.y = -10; d.x = rnd(0, W); } });
  } else if (S.weather === 'rain') {
    while (drops.length < 120) drops.push({ x: rnd(0, W + 40), y: rnd(-H, 0), r: 2, vx: -120, vy: 580 });
    drops.forEach(d => { d.y += 580 * dt; d.x -= 120 * dt; if (d.y > H) { d.y = rnd(-40, 0); d.x = rnd(0, W + 40); } });
  } else drops.length = 0;

  hudT -= dt; if (hudT <= 0) { hudT = .12; updateHud(); }
  if (paused || modalCur || shopOpen || S.over) return;
  const sdt = dt * speed;
  S.min += sdt * 4.5;
  if (S.min >= 1440) { S.min = 1440; passOut(); return; }
  ck.act -= sdt; ck.eat -= sdt; ck.lift -= sdt; ck.fish -= sdt; ck.iconT -= dt; ck.bubT -= dt;
  if (ck.act > 0 || ck.lift > 0 || ck.eat > 0 || ck.fish > 0) { ck.walk = false; return; }
  if (!cur && queue.length) cur = queue.shift();
  if (cur) {
    const tg = jobPos(cur), dx = tg.x - ck.x, dy = tg.y - ck.y, d = Math.hypot(dx, dy), sp = 245 * sdt;
    if (d <= sp) { ck.x = tg.x; ck.y = tg.y; ck.walk = false; const j = cur; cur = null; perform(j); }
    else { ck.x += dx / d * sp; ck.y += dy / d * sp; ck.walk = true; if (Math.abs(dx) > 2) ck.face = dx > 0 ? 1 : -1; }
  } else {
    ck.walk = false; idleT -= dt;
    if (idleT <= 0) { idleT = rnd(14, 25); say(S.min > 1260 ? 'Khuya rồi, về nhà ngủ thôi 😪' : S.st < 15 ? 'Mệt quá… ăn cà rốt hay uống sinh tố nhé!' : pick(IDLE)); }
  }
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  update(dt); render(); if (titleOpen) drawTitle();
  requestAnimationFrame(loop);
}

/* ---------- Title Screen Preview ---------- */
const tcv = $('#tcv'), tctx = tcv.getContext('2d');
function drawTitle() {
  const g = tctx; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 560, 560); g.setTransform(2, 0, 0, 2, 0, 0);
  const gr = g.createRadialGradient(140, 140, 20, 140, 140, 140);
  gr.addColorStop(0, '#fff7fb'); gr.addColorStop(1, 'rgba(255,220,238,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 280, 280);
  ell(g, 140, 250, 112, 18, '#b5e3ca'); ell(g, 140, 248, 100, 14, '#d0f2de');
  emo(g, '🎄', 42, 204, 42); emo(g, '⛄', 238, 214, 34);
  emo(g, '🥕', 68, 242, 22); emo(g, '🍓', 214, 242, 22);
  const t = ck.t;
  drawCooky(g, 140, 246, 2.85, { t, face: Math.sin(t * .6) > 0 ? 1 : -1, hop: Math.max(0, Math.sin(t * 3)) * 5 });
  const nm = ($('#inpName')?.value || 'Cooky').trim() || 'Cooky';
  g.fillStyle = 'rgba(255,255,255,.9)'; g.strokeStyle = '#f3b8ce'; g.lineWidth = 1.5;
  rr(g, 90, 18, 100, 22, 11); g.fill(); g.stroke();
  txt(g, `🐰 ${nm}`, 140, 29.5, 11, '#63324d', 800);
}

/* ---------- Save / Load & Input ---------- */
function save() { try { if (S && !S.over) localStorage.setItem(SAVE, JSON.stringify(S)); } catch (e) { } }
function load() { try { const s = JSON.parse(localStorage.getItem(SAVE)); if (s && s.plots && s.plots.length === COLS * ROWS) return s; } catch (e) { } return null; }

function enterGame() {
  titleOpen = false; $('#title').hidden = true; $('#hud').hidden = false; $('#bar').hidden = false;
  queue = []; cur = null; paused = false; speed = 1; shopOpen = false; $('#shop').hidden = true;
  modalQ.length = 0; modalCur = null; $('#modal').hidden = true;
  ck.x = ZONES.house.pos.x; ck.y = ZONES.house.pos.y; updateHud();
}

function startNew(nameOverride) {
  const chosenName = nameOverride || ($('#inpName')?.value || 'Cooky').trim() || 'Cooky';
  S = newState(chosenName); enterGame(); save(); SFX.jingle();
  modal({
    ic: '🌸🎄', t: `Chào mừng ${S.name} tới Đà Lạt Pastel!`,
    d: `<p>Giữa đồi thông mùa Giáng Sinh phủ tuyết hồng pastel, <b>${S.name}</b> bắt đầu hành trình xây dựng nông trại mơ ước!</p>
      <p>🌱 <b>Trồng 8 loại cây</b> · 🎣 <b>Ra Hồ Tuyết câu cá & vớt hộp quà</b> · 🧁 <b>Vào Bếp Bánh chế biến món ngon</b> · 🐣 <b>Nuôi 4 bé thú cưng</b>.</p>
      <p>🏆 <b>Mục tiêu dài hạn:</b> Chinh phục <b>5 Cột Mốc Lớn</b> (từ Vé Concert Seoul 5tr đến Công Viên Tuyết Wonderland 75tr & Huyền Thoại 150tr) với chế độ chơi tự do không giới hạn!</p>`,
    b: [['Bắt đầu mùa lễ hội thôi! 💜', () => say(`Cố lên nào ${S.name}! 🌸`)]]
  });
}

function backToTitle() { save(); titleOpen = true; $('#title').hidden = false; $('#hud').hidden = true; $('#bar').hidden = true; $('#shop').hidden = true; shopOpen = false; refreshCont(); }
function refreshCont() {
  const s = load(); const b = $('#bCont'); b.hidden = !s;
  if (s) { b.textContent = `▶ Tiếp tục (${s.name} · Ngày ${s.day})`; if ($('#inpName')) $('#inpName').value = s.name || 'Cooky'; }
}
function showHelp() {
  modal({
    ic: '📖', t: 'Cẩm nang Nông Trại Pastel',
    d: `<p>👆 <b>Chạm ô đất</b>: Tự động nhổ cỏ, bắt sâu, cuốc, gieo hạt, tưới nước, thu hoạch.</p>
      <p>🎣 <b>Câu cá Hồ Tuyết</b>: Bấm vào hồ nước góc trái dưới hoặc nút 🎣 để câu cá hồi, tôm pha lê & hộp quà Noel.</p>
      <p>🧁 <b>Bếp Bánh Pastel</b>: Chế biến nông sản & cá thành bánh kem dâu, trà hoa tuyết, lẩu cá hồi giá cao & tăng Fan.</p>
      <p>🐣 <b>Thú cưng & Hội bạn BT21</b>: Nhận nuôi thú cưng lấy thu nhập thụ động mỗi sáng và tặng quà kết thân 7 thành viên BT21.</p>
      <p>🏆 <b>5 Cột Mốc & 12 Huy Hiệu</b>: Mở bảng <b>📋 Mục tiêu</b> để theo dõi nhiệm vụ hàng ngày và mở khóa các công trình lớn!</p>`,
    b: [['Đã hiểu!', null], ['Về màn hình chính', () => backToTitle(), 'o']]
  });
}

function toLogical(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
cv.addEventListener('pointerdown', e => {
  if (blocked()) return; const { x, y } = toLogical(e);
  const i = tileAt(x, y);
  if (i >= 0) { if (S.plots[i].s === 'locked') { if (canBuy(i)) buyPlot(i); else toast('Hãy mở ô sát cạnh ruộng trước nhé!'); return; } enqueue({ type: 'tile', i }); return; }
  for (const k in ZONES) { const z = ZONES[k]; if (x > z.x && x < z.x + z.w && y > z.y && y < z.y + z.h) { enqueue({ type: k }); return; } }
  if (y > 190) enqueue({ type: 'walk', x: clamp(x, 20, W - 20), y: clamp(y, 200, H - 10) });
});
cv.addEventListener('pointermove', e => { hover = toLogical(e); });
cv.addEventListener('pointerleave', () => { hover = null; });

$('#seeds').addEventListener('click', e => {
  const b = e.target.closest('.seed'); if (!b || !S) return;
  S.sel = b.dataset.k; SFX.click(); updateHud();
  if (!S.seeds[S.sel]) toast(`Chưa có hạt ${CROPS[S.sel].n}, vào 🛒 Sạp mua nhé.`);
});
$('#bEat').onclick = eatCarrot;
$('#bFish').onclick = () => { if (!blocked()) enqueue({ type: 'lake' }); };
$('#bCook').onclick = () => { if (!blocked()) enqueue({ type: 'cook' }); };
$('#bShop').onclick = () => { if (!blocked()) enqueue({ type: 'stall' }); };
$('#bGym').onclick = () => { if (!blocked()) enqueue({ type: 'gym' }); };
$('#bSleep').onclick = () => { if (!blocked()) enqueue({ type: 'house' }); };
$('#bRename').onclick = () => { if (!blocked()) askRename(); };
$('#bQuests').onclick = () => { if (!blocked()) openShop('goal'); };
$('#bBell').onclick = () => { SFX.jingle(); toast('🔔 Jingle Bells~ Chúc mùa Giáng Sinh Pastel ấm áp! 🎄'); };
$('#shopX').onclick = closeShop;
document.querySelector('.tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; shopTab = b.dataset.tab; SFX.click(); renderShop(); });
$('#shopBody').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b && !b.disabled) shopAction(b.dataset.a, b.dataset.k); });
$('#shopFoot').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b && !b.disabled) shopAction(b.dataset.a, b.dataset.k); });
document.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => { const v = +b.dataset.sp; if (v === 0) paused = !paused; else { paused = false; speed = v; } SFX.click(); updateHud(); });
$('#bSnd').onclick = () => { sndOn = !sndOn; $('#bSnd').textContent = sndOn ? '🔊' : '🔇'; };
$('#bHelp').onclick = () => { if (!modalCur) showHelp(); };
$('#bFs').onclick = () => { const el = document.documentElement; if (!document.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen || (() => { })).call(el); else document.exitFullscreen(); };
$('#bTicket').onclick = () => { const cm = curMile(); if (S.cash >= cm.cost && !modalCur) unlockMilestone(cm.id); };
$('#bRandName').onclick = () => { SFX.click(); const inp = $('#inpName'); if (inp) inp.value = pick(CUTE_NAMES); };
$('#bNew').onclick = () => {
  SFX.click();
  const chosen = ($('#inpName')?.value || 'Cooky').trim() || 'Cooky';
  if (load()) {
    modal({ ic: '🌸', t: 'Bắt đầu mùa Noel mới?', d: `<p class="c">Tạo nông trại mới với tên <b>${chosen}</b> sẽ ghi đè tiến trình cũ. Tiếp tục nhé?</p>`, b: [['Bắt đầu luôn!', () => startNew(chosen)], ['Huỷ', null, 'o']] });
    return;
  }
  startNew(chosen);
};
$('#bCont').onclick = () => {
  const s = load(); if (!s) return;
  S = Object.assign(newState(s.name), s);
  if (!S.quests || !S.quests.length) rollQuests(S);
  SFX.click(); enterGame(); say(`Chào mừng ${S.name} quay lại! 🌸`);
};

addEventListener('keydown', e => {
  if (titleOpen || !S) return;
  if (e.key === 'Escape' && shopOpen) { closeShop(); return; }
  if (modalCur) return;
  if (e.code === 'Space') { e.preventDefault(); paused = !paused; updateHud(); }
  else if (e.key >= '1' && e.key <= '8') { S.sel = CK[+e.key - 1]; SFX.click(); updateHud(); }
  else if (e.key === 'e' || e.key === 'E') eatCarrot();
});
setInterval(save, 10000);
addEventListener('beforeunload', save);

function resize() {
  const fr = $('#frame'), w = Math.min(innerWidth, innerHeight * 1.5), h = w / 1.5;
  fr.style.width = w + 'px'; fr.style.height = h + 'px'; fr.style.fontSize = (w / 960 * 16) + 'px';
  const dpr = Math.min(devicePixelRatio || 1, 2); K = w / W * dpr;
  cv.width = Math.round(W * K); cv.height = Math.round(H * K); drawBG();
}
addEventListener('resize', resize);
S = newState('Cooky'); buildBar(); resize(); refreshCont();
if (document.fonts) document.fonts.ready.then(drawBG);
requestAnimationFrame(loop);
