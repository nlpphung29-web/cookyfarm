'use strict';
/* =========================================================
   COOKY FARM · Nông Trại Mùa Đông Đà Lạt 🎄
   BT21 Authentic Art · 4 Expansion Zones · Balanced Farm Economy
   ========================================================= */
const W = 960, H = 640, T = 60, COLS = 8, ROWS = 4, FX = 236, FY = 246;
const DAYS = 30, SAVE = 'cookyFarm.dalat.v4';
const EMOJI = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
const FONT = '"Be Vietnam Pro",system-ui,sans-serif';
const $ = s => document.querySelector(s);
const cv = $('#cv'), ctx = cv.getContext('2d');
const rnd = (a, b) => a + Math.random() * (b - a), ri = (a, b) => Math.floor(rnd(a, b + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- Authentic BT21 SVG Illustrations ---------- */
function bt21Svg(id) {
  switch (id) {
    case 'koya': // RM: Koala xanh dương, tai tròn lớn lông trắng, mũi tím to, mắt nhắm ngủ
      return `<svg viewBox="0 0 64 64">
        <circle cx="13" cy="24" r="11" fill="#6ec3f5" stroke="#365c7d" stroke-width="2.6"/>
        <circle cx="13" cy="24" r="5.5" fill="#fff"/>
        <circle cx="51" cy="24" r="11" fill="#6ec3f5" stroke="#365c7d" stroke-width="2.6"/>
        <circle cx="51" cy="24" r="5.5" fill="#fff"/>
        <ellipse cx="32" cy="35" rx="20" ry="17" fill="#6ec3f5" stroke="#365c7d" stroke-width="2.6"/>
        <path d="M19 31 Q23 35 27 31" fill="none" stroke="#2b2440" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M37 31 Q41 35 45 31" fill="none" stroke="#2b2440" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="32" cy="37" rx="5.2" ry="6.8" fill="#6f52b8" stroke="#2b2440" stroke-width="2.2"/>
        <path d="M29 47 Q32 49.5 35 47" fill="none" stroke="#2b2440" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`;
    case 'rj': // Jin: Alpaca trắng lông xù như mây, quàng khăn đỏ cam, miệng :3
      return `<svg viewBox="0 0 64 64">
        <ellipse cx="22" cy="14" rx="5" ry="9" transform="rotate(-12 22 14)" fill="#fff" stroke="#5c4742" stroke-width="2.5"/>
        <ellipse cx="42" cy="14" rx="5" ry="9" transform="rotate(12 42 14)" fill="#fff" stroke="#5c4742" stroke-width="2.5"/>
        <path d="M15 26 C10 22,12 15,19 17 C24 11,40 11,45 17 C52 15,54 22,49 26 C55 31,54 41,47 44 C45 50,19 50,17 44 C10 41,9 31,15 26 Z" fill="#fff" stroke="#5c4742" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="24" cy="30" r="2.7" fill="#2d2220"/><circle cx="40" cy="30" r="2.7" fill="#2d2220"/>
        <path d="M21 24 L26 25 M43 24 L38 25" stroke="#5c4742" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="19" cy="34" rx="3.2" ry="1.8" fill="#ffb3c6"/><ellipse cx="45" cy="34" rx="3.2" ry="1.8" fill="#ffb3c6"/>
        <circle cx="32" cy="33" r="2" fill="#2d2220"/>
        <path d="M28 36.5 Q30 39 32 36.5 Q34 39 36 36.5" fill="none" stroke="#2d2220" stroke-width="2.2" stroke-linecap="round"/>
        <rect x="17" y="45" width="30" height="7" rx="3.5" fill="#f2545b" stroke="#5c4742" stroke-width="2.2"/>
        <path d="M35 50 L39 59 L31 59 Z" fill="#f2545b" stroke="#5c4742" stroke-width="2" stroke-linejoin="round"/>
      </svg>`;
    case 'shooky': // Suga: Bánh quy sô-cô-la tròn nâu, hạt choco, lông mày xếch, cười rộng lộ răng trắng
      return `<svg viewBox="0 0 64 64">
        <circle cx="32" cy="34" r="20" fill="#a66a38" stroke="#4a2a10" stroke-width="2.6"/>
        <circle cx="20" cy="21" r="2.3" fill="#593416"/><circle cx="44" cy="22" r="2" fill="#593416"/>
        <circle cx="17" cy="38" r="2" fill="#593416"/><circle cx="46" cy="40" r="2.4" fill="#593416"/><circle cx="33" cy="18" r="1.8" fill="#593416"/>
        <path d="M20 25 L28 28 M44 25 L36 28" stroke="#361c08" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="25" cy="32" r="2.6" fill="#261305"/><circle cx="39" cy="32" r="2.6" fill="#261305"/>
        <path d="M22 38 Q32 49 42 38 Z" fill="#591f16" stroke="#261305" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M24 38.5 L40 38.5 L39 42 L25 42 Z" fill="#fff"/>
      </svg>`;
    case 'mang': // J-Hope: Chú ngựa nhảy múa xanh tím, bờm tím trên đầu, mũi hình trái tim màu hồng tím
      return `<svg viewBox="0 0 64 64">
        <path d="M24 16 L20 7 L29 12 L34 6 L38 13 L45 9 L41 17 Z" fill="#7b4ec4" stroke="#382466" stroke-width="2.2" stroke-linejoin="round"/>
        <ellipse cx="19" cy="17" rx="4.5" ry="7.5" transform="rotate(-18 19 17)" fill="#7998f2" stroke="#382466" stroke-width="2.4"/>
        <ellipse cx="45" cy="17" rx="4.5" ry="7.5" transform="rotate(18 45 17)" fill="#7998f2" stroke="#382466" stroke-width="2.4"/>
        <ellipse cx="32" cy="35" rx="19" ry="16.5" fill="#7998f2" stroke="#382466" stroke-width="2.5"/>
        <circle cx="23" cy="30" r="3" fill="#221838"/><circle cx="41" cy="30" r="3" fill="#221838"/>
        <circle cx="24" cy="29" r="1" fill="#fff"/><circle cx="42" cy="29" r="1" fill="#fff"/>
        <path d="M32 46 C22 40,23 32,29 34 C31 35,32 37,32 37 C32 37,33 35,35 34 C41 32,42 40,32 46 Z" fill="#e85d99" stroke="#382466" stroke-width="2.2" stroke-linejoin="round"/>
      </svg>`;
    case 'chimmy': // Jimin: Cún con mặc hoodie vàng tươi, hai tai đen rủ xuống hai bên, thè lưỡi hồng
      return `<svg viewBox="0 0 64 64">
        <ellipse cx="32" cy="34" rx="21" ry="18.5" fill="#ffd93d" stroke="#594312" stroke-width="2.6"/>
        <ellipse cx="12" cy="35" rx="5.2" ry="11.5" transform="rotate(10 12 35)" fill="#2b262d" stroke="#1a161b" stroke-width="2.2"/>
        <ellipse cx="52" cy="35" rx="5.2" ry="11.5" transform="rotate(-10 52 35)" fill="#2b262d" stroke="#1a161b" stroke-width="2.2"/>
        <ellipse cx="32" cy="36" rx="14.5" ry="12.5" fill="#fff" stroke="#594312" stroke-width="2.2"/>
        <circle cx="26" cy="33" r="2.5" fill="#2b262d"/><circle cx="38" cy="33" r="2.5" fill="#2b262d"/>
        <ellipse cx="21" cy="37" rx="2.8" ry="1.6" fill="#ffb3c6"/><ellipse cx="43" cy="37" rx="2.8" ry="1.6" fill="#ffb3c6"/>
        <circle cx="32" cy="36" r="2" fill="#2b262d"/>
        <path d="M28 39.5 Q30 41.5 32 39.5 Q34 41.5 36 39.5" fill="none" stroke="#2b262d" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="34.2" cy="42.2" rx="2.3" ry="2.8" fill="#ff6b8b" stroke="#2b262d" stroke-width="1.6"/>
      </svg>`;
    case 'tata': // V: Đầu trái tim đỏ tươi, lông mày vàng nâu, môi vàng kem, thân xanh chấm bi vàng
      return `<svg viewBox="0 0 64 64">
        <rect x="22" y="45" width="20" height="13" rx="6" fill="#2f66d0" stroke="#2b1820" stroke-width="2.2"/>
        <circle cx="27" cy="51" r="2.2" fill="#ffd166"/><circle cx="37" cy="53" r="2.2" fill="#ffd166"/>
        <path d="M32 49 C12 37,8 17,21 13 C27 11,31 16,32 20 C33 16,37 11,43 13 C56 17,52 37,32 49 Z" fill="#f03a47" stroke="#2b1820" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M21 25 L28 26.5 M43 25 L36 26.5" stroke="#d9a14a" stroke-width="3" stroke-linecap="round"/>
        <circle cx="25" cy="31" r="2.5" fill="#2b1820"/><circle cx="39" cy="31" r="2.5" fill="#2b1820"/>
        <ellipse cx="32" cy="38.5" rx="6.5" ry="3.2" fill="#ffd166" stroke="#2b1820" stroke-width="2"/>
        <line x1="26.5" y1="38.5" x2="37.5" y2="38.5" stroke="#2b1820" stroke-width="1.6"/>
      </svg>`;
    case 'van': // ARMY: Robot vũ trụ nửa trắng nửa xám, chóp nhọn trên đầu, mắt O và X
      return `<svg viewBox="0 0 64 64">
        <path d="M32 8 L27 17 L37 17 Z" fill="#f5f7fa" stroke="#363d4a" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M32 16 A19 19 0 0 0 32 54 Z" fill="#f5f7fa"/>
        <path d="M32 16 A19 19 0 0 1 32 54 Z" fill="#9aa5b8"/>
        <circle cx="32" cy="35" r="19" fill="none" stroke="#363d4a" stroke-width="2.6"/>
        <line x1="32" y1="16" x2="32" y2="54" stroke="#363d4a" stroke-width="2"/>
        <circle cx="23" cy="34" r="3.6" fill="none" stroke="#363d4a" stroke-width="2.5"/>
        <path d="M38 31 L44 37 M44 31 L38 37" stroke="#363d4a" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="27" y1="43" x2="37" y2="43" stroke="#363d4a" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`;
    default:
      return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="#ffb3cc"/></svg>`;
  }
}

/* ---------- Game Data (Balanced Core Farming Economy) ---------- */
const CROPS = {
  carrot:  { n: 'Cà rốt',           e: '🥕', seed: 8,   days: 2, price: 14,  xp: 3,  reqLv: 1 },
  cabbage: { n: 'Bắp cải Đà Lạt',   e: '🥬', seed: 14,  days: 3, price: 25,  xp: 5,  reqLv: 1 },
  sweet:   { n: 'Khoai mật',        e: '🍠', seed: 20,  days: 3, price: 36,  xp: 6,  reqLv: 2 },
  tomato:  { n: 'Cà chua bi',       e: '🍅', seed: 28,  days: 4, price: 50,  xp: 8,  reqLv: 3 },
  corn:    { n: 'Bắp sữa',          e: '🌽', seed: 38,  days: 4, price: 68,  xp: 10, reqLv: 4 },
  straw:   { n: 'Dâu Tây Đà Lạt',   e: '🍓', seed: 68,  days: 5, price: 54,  regrow: 3, xp: 12, reqLv: 5 },
  rose:    { n: 'Hoa Hồng Nhung',   e: '🌹', seed: 85,  days: 5, price: 155, xp: 15, reqLv: 6, reqZone: 'highland', fans: 6 },
  snowfl:  { n: 'Hoa Tuyết',        e: '❄️', seed: 125, days: 6, price: 105, regrow: 3, fans: 10, xp: 18, reqLv: 7, reqZone: 'highland' },
  melon:   { n: 'Dưa Lưới Hoàng Kim', e: '🍈', seed: 155, days: 7, price: 295, xp: 24, reqLv: 8 },
};
const CK = Object.keys(CROPS);

// Đặc sản thu hoạch từ 4 Khu vực mở rộng
const SPECIALS = {
  bouquet:   { n: 'Giỏ Hoa Cao Nguyên', e: '💐', price: 48 },
  honey:     { n: 'Mật Ong Hoa Thông',  e: '🍯', price: 85 },
  persimmon: { n: 'Hồng Treo Gió',      e: '🏮', price: 145 },
  arabica:   { n: 'Cà Phê Arabica',     e: '☕', price: 165 },
};
const SK = Object.keys(SPECIALS);

const FISH = {
  carp:   { n: 'Cá chép suối',      e: '🐟', price: 18, w: 46 },
  shrimp: { n: 'Tôm suối lạnh',     e: '🦐', price: 28, w: 30 },
  salmon: { n: 'Cá hồi Đà Lạt',     e: '🍣', price: 45, w: 16 },
  star:   { n: 'Sao biển băng',     e: '🌟', price: 75, w: 6,  fans: 12 },
  tuna:   { n: 'Cá Ngừ Super Tuna', e: '🦈', price: 95, w: 2,  fans: 25 },
};
const FK = Object.keys(FISH);

const RECIPES = [
  { id: 'juice',  n: 'Sinh tố Cà rốt',      e: '🥤', req: { carrot: 2 }, price: 36,  st: 32, fans: 3,  d: 'Hồi +32⚡ hoặc bán lời hơn nông sản thô' },
  { id: 'roast',  n: 'Khoai mật nướng',     e: '🍠', req: { sweet: 2 },  price: 90,  st: 48, fans: 6,  d: 'Ấm bụng mùa đông: hồi +48⚡' },
  { id: 'cake',   n: 'Bánh kem Dâu Đà Lạt', e: '🍰', req: { straw: 2, corn: 1 }, price: 215, st: 65, fans: 16, d: 'Bánh kem dâu tươi thơm lừng (+16💜)' },
  { id: 'hotpot', n: 'Lẩu Cá Hồi Phố Núi',  e: '🍲', req: { salmon: 1, cabbage: 2, tomato: 1 }, price: 185, st: 75, fans: 20, d: 'Nồi lẩu nghi ngút khói (+20💜)' },
  { id: 'tea',    n: 'Trà Hoa Tuyết Mật Ong', e: '🍵', req: { snowfl: 1, honey: 1 }, price: 245, st: 70, fans: 28, d: 'Đặc sản cao cấp kết hợp Hoa Tuyết & Mật Ong (+28💜)' },
];

// 4 Khu vực mở rộng trên bản đồ khi đạt mốc doanh thu nông trại
const EXPANSIONS = [
  {
    id: 'highland', e: '🍓', n: 'Khu 1: Đồi Hoa & Dâu Cao Nguyên',
    reqEarn: 350, cost: 220, cd: 2, prod: 'bouquet',
    x: 356, y: 76, w: 238, h: 118, pos: { x: 475, y: 212 },
    d: 'Yêu cầu tổng doanh thu đạt 350k. Mở khóa hạt giống 🌹 Hoa Hồng & ❄️ Hoa Tuyết, đồng thời thu hoạch 💐 Giỏ Hoa Cao Nguyên (48k) mỗi 2 ngày!'
  },
  {
    id: 'apiary', e: '🐝', n: 'Khu 2: Thung Lũng Ong Mật Hoa Thông',
    reqEarn: 950, cost: 520, cd: 2, prod: 'honey',
    x: 748, y: 242, w: 192, h: 170, pos: { x: 752, y: 330 },
    d: 'Yêu cầu tổng doanh thu đạt 950k. Xây 3 Tổ Ong bên rừng thông: mỗi 2 ngày (khi có trồng cây trên ruộng) thu hoạch 🍯 Mật Ong Hoa Thông (85k)!'
  },
  {
    id: 'orchard', e: '🍑', n: 'Khu 3: Vườn Hồng Treo Gió Đà Lạt',
    reqEarn: 2400, cost: 1200, cd: 3, prod: 'persimmon',
    x: 236, y: 500, w: 484, h: 122, pos: { x: 478, y: 506 },
    d: 'Yêu cầu tổng doanh thu đạt 2,4tr. Mở vườn hồng cổ thụ phía Nam: mỗi 3 ngày thu hoạch 🏮 Hồng Treo Gió Thượng Hạng (145k)!'
  },
  {
    id: 'cloudcafe', e: '☕', n: 'Khu 4: Quán Cà Phê Săn Mây Đồi Thông',
    reqEarn: 5500, cost: 2600, cd: 2, prod: 'arabica',
    x: 748, y: 428, w: 192, h: 192, pos: { x: 752, y: 520 },
    d: 'Yêu cầu tổng doanh thu đạt 5,5tr. Xây Quán Cà Phê Săn Mây (+12% giá bán toàn nông trại) & thu hoạch ☕ Cà Phê Arabica (165k) mỗi 2 ngày!'
  },
];

const PETS = [
  { id: 'chick', e: '🐥', n: 'Gà Kem Bông',        cost: 280,  d: 'Khi được cho ăn: sáng hôm sau đẻ trứng bán được +18k.' },
  { id: 'sheep', e: '🐑', n: 'Cừu Bông Đồi Thông', cost: 520,  d: 'Khi được cho ăn: sáng hôm sau thu hoạch len +32k & +6💜.' },
  { id: 'cat',   e: '🐱', n: 'Mèo Tuyết Lil Meow', cost: 740,  d: 'Khi được cho ăn: bắt sạch sâu bọ trên ruộng, đuổi quạ & +10💜.' },
  { id: 'deer',  e: '🦌', n: 'Tuần Lộc Mũi Hồng',  cost: 1250, d: 'Khi được cho ăn: sáng hôm sau tặng +45k & 1 hạt giống ngẫu nhiên.' },
];

const UPS = [
  { id: 'can',    e: '🚿', n: 'Bình Tưới Phun Sương',  cost: 220,  d: 'Tưới cây chỉ tốn 1⚡ thay vì 2⚡.' },
  { id: 'hoe',    e: '⛏️', n: 'Cuốc Thép Nhẹ',         cost: 220,  d: 'Cuốc đất chỉ tốn 2⚡ thay vì 4⚡.' },
  { id: 'rod',    e: '🎣', n: 'Cần Câu Tre Đà Lạt',    cost: 340,  d: 'Giảm thể lực câu cá & tăng tỉ lệ câu được Cá hồi!' },
  { id: 'scare',  e: '⛄', n: 'Người Tuyết Canh Vườn', cost: 390,  d: 'Giảm 65% quạ đen phá hoại & giữ vườn an toàn.' },
  { id: 'heater', e: '🔥', n: 'Lò Sưởi Đồi Thông',     cost: 460,  d: 'Chống đóng băng 50% ô ruộng khi trời có Sương muối 🥶.' },
  { id: 'koya',   e: '🐨', n: 'Nhờ Koya Phụ Thu Hoạch',cost: 580,  d: 'Mỗi tối tự hái các ô chín (phí 25k/ngày, đôi khi ngủ gật).' },
  { id: 'sign',   e: '🪧', n: 'Cổng Hoa Nông Trại',    cost: 680,  d: 'Nông trại uy tín: +8% giá bán mọi mặt hàng.' },
  { id: 'green',  e: '🏡', n: 'Nhà Kính Pha Lê',       cost: 1350, d: 'Miễn nhiễm Sương muối đóng băng, giảm 70% sâu & +6% tỉ lệ thu hoạch đôi.' },
  { id: 'sprk',   e: '💦', n: 'Hệ Thống Tưới Tự Động', cost: 2100, d: 'Mỗi sáng tự động tưới đẫm toàn bộ cánh đồng.' },
];

// 6 Cột mốc phát triển dài hạn (Không phát tiền miễn phí quá đà, tập trung buff cho Farm)
const MILES = [
  { id: 'barn',    cost: 380,   stars: 1, e: '🪵', n: 'Mốc 1: Kho Nông Sản Gỗ Thông',    d: 'Cần 380k & 1⭐ Sao Tím. Nông sản chín lâu hỏng hơn (+2 ngày) & +4% giá bán.' },
  { id: 'sleigh',  cost: 950,   stars: 2, e: '🛷', n: 'Mốc 2: Xe Tuần Lộc Giao Hàng',    d: 'Cần 950k & 2⭐ Sao Tím. Tăng +20% tiền thưởng mọi Đơn hàng tuần & +5% giá bán.' },
  { id: 'concert', cost: 2200,  stars: 3, e: '🎫', n: 'Mốc 3: Vé Winter Concert Seoul',  d: 'Cần 2,2tr & 3⭐ Sao Tím. Mở khóa Chế Độ Vĩnh Cửu (Endless) & +6% giá bán.' },
  { id: 'train',   cost: 4800,  stars: 5, e: '🚂', n: 'Mốc 4: Chuyến Tàu Cổ Đà Lạt',     d: 'Cần 4,8tr & 5⭐ Sao Tím. Đưa du khách tới tham quan: +20💜/ngày & +8% giá bán.' },
  { id: 'villa',   cost: 9500,  stars: 7, e: '🏰', n: 'Mốc 5: Biệt Thự Đồi Thông',       d: 'Cần 9,5tr & 7⭐ Sao Tím. +35⚡ Sức tối đa, hồi đầy sức mỗi sáng & +10% giá bán.' },
  { id: 'legend',  cost: 18000, stars: 10,e: '👑', n: 'Mốc 6: Huyền Thoại Nông Trại',    d: 'Cần 18tr & 10⭐ Sao Tím. Đỉnh cao Đà Lạt: +15% giá bán & hiệu ứng Sao Đêm Vĩnh Cửu!' },
];

// Hội bạn thân BT21 với tạo hình và tính cách chuẩn xác
const FRIENDS = [
  { id: 'rj',     n: 'RJ (Jin)',       role: 'Alpaca trắng quàng khăn đỏ mê ẩm thực',   buff: 'Mỗi cấp: +3⚡ hồi sức khi ăn Cà rốt & món bếp' },
  { id: 'chimmy', n: 'Chimmy (Jimin)', role: 'Cún con áo hoodie vàng tai đen đáng yêu',  buff: 'Mỗi cấp: +2% giá bán mọi nông sản thu hoạch' },
  { id: 'koya',   n: 'Koya (RM)',      role: 'Koala xanh dương mũi tím thông thái',      buff: 'Mỗi cấp: giảm 12% tỉ lệ cỏ dại mọc mỗi đêm' },
  { id: 'shooky', n: 'Shooky (Suga)',  role: 'Bánh quy sô-cô-la nhỏ tinh nghịch',        buff: 'Mỗi cấp: +2% cơ hội thu hoạch x2 sản lượng' },
  { id: 'mang',   n: 'Mang (J-Hope)',  role: 'Chú ngựa vũ công mũi trái tim hồng tím',   buff: 'Mỗi cấp: +10% lượng Fan nhận được khi Livestream' },
  { id: 'tata',   n: 'Tata (V)',       role: 'Hoàng tử đầu trái tim đỏ thân chấm bi',    buff: 'Mỗi cấp: tăng cơ hội nảy mầm Cà rốt Cầu Vồng' },
  { id: 'van',    n: 'Van (ARMY)',     role: 'Robot hộ vệ vũ trụ nửa trắng nửa xám',     buff: 'Mỗi cấp: giảm 5% chi phí mở ô đất & thuế tuần' },
];

// 10 Kỷ vật sưu tầm ARMY (Thưởng kỷ niệm nhỏ gọn, tập trung giá trị sưu tầm)
const RELICS = [
  { id: 'bomb',    e: '💣', n: 'ARMY Bomb Ver.4',       d: 'Bí mật: Bấm vào nút 💜 Fan trên góc phải 7 lần liên tiếp hoặc đạt 1.306💜.' },
  { id: 'mikro',   e: '🌌', n: 'Tinh Cầu Mikrokosmos',  d: 'Bí mật: Bấm vào Sao băng xuất hiện trên trời lúc 06:13 sáng hoặc 18:13 tối.' },
  { id: 'tuna',    e: '🦈', n: 'Cúp Vàng Super Tuna',   d: 'Bí mật: Câu trúng Cá Ngừ Đại Dương Super Tuna (참치!) ở Hồ Tuyết.' },
  { id: 'glove',   e: '🥊', n: 'Găng Tay Hồng Golden',  d: 'Bí mật: Tập Gym nâng Sức lực tối đa đạt từ 130⚡ trở lên.' },
  { id: 'spring',  e: '🌸', n: 'Cành Hoa Spring Day',   d: 'Bí mật: Mở Khu Đồi Hoa và thu hoạch ❄️ Hoa Tuyết đủ 5 lần.' },
  { id: 'whale',   e: '🐋', n: 'Cá Voi Tím Whalien 52', d: 'Bí mật: Đi câu cá ở Hồ Tuyết sau 18:00 tối vào ngày Sương mù hoặc Tuyết.' },
  { id: 'soop',    e: '🪑', n: 'Ghế Gỗ In The Soop',    d: 'Bí mật: Khai hoang mở rộng nông trại đạt từ 20 ô đất trở lên.' },
  { id: 'cake7',   e: '🎂', n: 'Bánh Kem 7WithYou',     d: 'Bí mật: Tự tay làm đủ 7 món ăn/thức uống trong Bếp Bánh.' },
  { id: 'radio',   e: '📻', n: 'Băng Cassette 0613',    d: 'Bí mật: Trả lời đúng 3 câu đố BTS trên Đài Radio 06.13 FM.' },
  { id: 'borahae', e: '💜', n: 'Trái Tim Borahae OT7',  d: 'Bí mật: Đạt tổng cộng 21 cấp thân thiết với hội bạn thân BT21.' },
];

const TRIVIA = [
  { q: 'Ngày ra mắt (Debut) chính thức của BTS là ngày nào?', a: ['13/06/2013', '07/07/2013', '12/09/2013'], ok: 0 },
  { q: 'Nhân vật thỏ hồng cơ bắp Cooky trong BT21 do thành viên nào sáng tạo?', a: ['Jimin', 'Jungkook', 'Jin'], ok: 1 },
  { q: 'Câu nói nổi tiếng "Borahae" (I Purple You 💜) do ai tạo ra?', a: ['V (Kim Taehyung)', 'RM', 'Suga'], ok: 0 },
  { q: 'Bài hát câu cá vui nhộn gây bão toàn cầu của anh cả Jin tên là gì?', a: ['Super Salmon', 'Super Tuna (참치)', 'Ocean Boy'], ok: 1 },
  { q: 'Trong vũ trụ BT21, chú lạc đà alpaca trắng quàng khăn đỏ tên là gì?', a: ['Koya', 'Chimmy', 'RJ'], ok: 2 },
  { q: 'Chiếc gậy cổ vũ chính thức của cộng đồng fan BTS có tên gọi là gì?', a: ['Purple Stick', 'ARMY Bomb', 'Bangtan Light'], ok: 1 },
  { q: 'Nhân vật bánh quy sô-cô-la nhỏ tinh nghịch sợ sữa nhất trong BT21 là ai?', a: ['Shooky', 'Mang', 'Tata'], ok: 0 },
  { q: 'Ca khúc tiếng Anh đầu tiên giúp BTS đạt #1 Billboard Hot 100 là bài nào?', a: ['Butter', 'Dynamite', 'Boy With Luv'], ok: 1 },
  { q: 'Chú koala xanh dương có chiếc mũi tím và đôi tai tháo rời được tên là gì?', a: ['Koya', 'Van', 'Mang'], ok: 0 },
  { q: 'Chú cún mặc áo hoodie vàng với hai chiếc tai đen dài trong BT21 là ai?', a: ['Chimmy', 'RJ', 'Cooky'], ok: 0 },
];

const BADGES = [
  { id: 'harv15',  e: '🌱', n: 'Mầm Xanh Đầu Tiên',   d: 'Thu hoạch đủ 15 vụ nông sản',     reward: 35,  c: s => s.stats.harv >= 15 },
  { id: 'harv100', e: '🧺', n: 'Bàn Tay Vàng',        d: 'Thu hoạch đủ 100 vụ nông sản',    reward: 140, c: s => s.stats.harv >= 100 },
  { id: 'exp1',    e: '🍓', n: 'Bước Chân Mở Cõi',    d: 'Mở khóa Khu vực mới đầu tiên',    reward: 60,  c: s => Object.keys(s.exp || {}).length >= 1 },
  { id: 'expAll',  e: '🗺️', n: 'Chủ Đồi Thông Đà Lạt',d: 'Mở khóa toàn bộ 4 Khu vực mới',  reward: 320, c: s => Object.keys(s.exp || {}).length >= 4 },
  { id: 'cook8',   e: '🧁', n: 'Đầu Bếp Phố Núi',     d: 'Chế biến 8 món ăn/thức uống',     reward: 65,  c: s => s.stats.cook >= 8 },
  { id: 'ord3',    e: '📦', n: 'Chuyến Xe Đúng Hẹn',  d: 'Giao thành công 3 Đơn hàng tuần', reward: 120, c: s => (s.stats.orders || 0) >= 3 },
  { id: 'ord8',    e: '🚚', n: 'Đối Tác Vàng Đà Lạt', d: 'Giao thành công 8 Đơn hàng tuần', reward: 280, c: s => (s.stats.orders || 0) >= 8 },
  { id: 'plotAll', e: '🚜', n: 'Đại Điền Chủ',        d: 'Khai hoang đủ 32 ô ruộng chính',  reward: 260, c: s => s.plots.every(p => p.s !== 'locked') },
  { id: 'lv8',     e: '⭐', n: 'Nông Dân Lão Luyện',  d: 'Đạt Cấp độ Nông trại Lv.8',       reward: 180, c: s => (s.lv || 1) >= 8 },
  { id: 'fan2k',   e: '💜', n: 'Nông Trại Nổi Tiếng', d: 'Đạt 2.000 Fan theo dõi',          reward: 110, c: s => s.fans >= 2000 },
  { id: 'rel5',    e: '💎', n: 'Nhà Sưu Tầm ARMY',    d: 'Khám phá 5 Kỷ vật bí mật ARMY',   reward: 90,  c: s => Object.keys(s.relics || {}).length >= 5 },
  { id: 'mile3',   e: '🎫', n: 'Giấc Mơ Winter Concert', d: 'Đạt Cột Mốc 3 (Vé Concert)',   reward: 200, c: s => s.miles.concert },
];

const WX = {
  snow:  { e: '❄️', n: 'Tuyết rơi (+8% giá)' },
  sun:   { e: '☀️', n: 'Nắng đông ấm' },
  rain:  { e: '🌧️', n: 'Mưa phùn Đà Lạt' },
  fog:   { e: '🌫️', n: 'Sương mù phố núi' },
  frost: { e: '🥶', n: 'Sương muối đóng băng!' },
};

const ZONES = {
  house: { x: 26,  y: 52,  w: 175, h: 155, n: '🛏️ Về nhà nghỉ ngơi', pos: { x: 112, y: 214 } },
  radio: { x: 185, y: 140, w: 42,  h: 58,  n: '📻 Đài Radio 06.13 FM', pos: { x: 196, y: 214 } },
  gym:   { x: 228, y: 126, w: 120, h: 80,  n: '💪 Góc tập Gym',       pos: { x: 286, y: 214 } },
  cook:  { x: 610, y: 92,  w: 128, h: 112, n: '🧁 Bếp Bánh Đà Lạt',   pos: { x: 674, y: 214 } },
  stall: { x: 754, y: 60,  w: 184, h: 148, n: '🛒 Sạp Nông Sản',      pos: { x: 846, y: 214 } },
  lake:  { x: 24,  y: 468, w: 184, h: 124, n: '🎣 Hồ Tuyết (Câu cá)', pos: { x: 185, y: 492 } },
};
const CUTE_NAMES = ['Cooky', 'Kookie 🐰', 'Thỏ Hồng JK', 'Mochi Đà Lạt', 'Thỏ Tuyết', 'Út Cưng JK', 'Borahae 0613', 'Nông Dân Kook'];
const IDLE = ['Đà Lạt mùa đông trong lành quá 🌲', 'Chăm đất tốt mới thu hoạch lời cao 🌾', 'Đủ mốc doanh thu mở thêm khu vực mới nha 🗺️', 'Nhớ chuẩn bị hàng cho Chuyến xe tuần 📦', 'Đất dưới 60% màu mỡ sẽ bị giảm giá bán 🌿', 'Hội bạn thân BT21 đang dạo quanh nông trại kìa 💜'];

/* ---------- State ---------- */
let S = null, speed = 1, paused = false, sndOn = true, selDiff = 'normal';
let titleOpen = true, shopOpen = false, shopTab = 'sell', fertMode = false, viewMode = 0;
let queue = [], cur = null, hover = null, idleT = 10, hudT = 0, crowT = 20, fanClicks = 0;
let deferredPrompt = null;
const ck = { x: 112, y: 214, face: 1, t: 0, act: 0, icon: '', iconT: 0, bub: '', bubT: 0, eat: 0, lift: 0, fish: 0, walk: false };
const star613 = { active: false, x: 0, y: 80, vx: 55 };
const parts = [], floats = [], drops = [];

function newState(customName, diff = 'normal') {
  const plots = [];
  // Khởi đầu chỉ mở 6 ô đất ở giữa (cột 3..5, hàng 1..2) để người chơi cày cuốc mở rộng dần!
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    plots.push({ s: (c >= 3 && c <= 4 && r >= 0 && r <= 2) ? 'grass' : 'locked', crop: null, g: 0, w: true, dry: 0, ripe: false, rd: 0, dead: false, weed: false, bug: false, ice: false, crow: 0, fert: 100, rainbow: false });
  const o = (ks, v) => Object.fromEntries(ks.map(c => [c, v]));
  const startCash = diff === 'chill' ? 120 : diff === 'hard' ? 50 : 75;
  const st = {
    name: (customName || 'Cooky').trim() || 'Cooky',
    diff,
    day: 1, min: 360, cash: startCash, st: 100, maxSt: 100, fans: 15, stars: 0, xp: 0, lv: 1,
    fert: 2,
    endless: false,
    plots,
    seeds: Object.assign(o(CK, 0), { carrot: 4, cabbage: 1 }),
    inv: Object.assign(o(CK, 0), o(SK, 0), o(FK, 0), o(RECIPES.map(r => r.id), 0), { carrot: 2, rainbow: 0 }),
    sel: 'carrot',
    up: {}, pets: {}, petFed: {}, miles: {}, exp: {}, expDay: {}, badges: {}, relics: {}, codes: {},
    fr: o(FRIENDS.map(f => f.id), 1),
    frGiftDay: {},
    triviaDay: 0, starDay: 0,
    price: o(CK, 1), prev: o(CK, 1),
    weather: 'snow', tmr: 'sun',
    gymDay: 0, liveDay: 0, bought: 0, viral: 0, vietgap: false, jk: false, lastEv: '',
    quests: [],
    order: null,
    today: { earn: 0, harv: 0, fish: 0, cook: 0 },
    stats: { earn: 0, harv: 0, fish: 0, cook: 0, ev: 0, orders: 0, snowfl: 0, trivia: 0 },
    over: false
  };
  st.plots[COLS * 0 + 3].weed = true;
  st.plots[COLS * 2 + 4].weed = true;
  rollQuests(st);
  makeOrder(st);
  return st;
}

function xpNeed(lv = S?.lv || 1) {
  return Math.round(55 + lv * 50 + Math.pow(lv, 1.55) * 16);
}

function canUseSeed(k, st = S) {
  const c = CROPS[k];
  if (!c) return false;
  if ((st.lv || 1) < (c.reqLv || 1)) return false;
  if (c.reqZone && !(st.exp && st.exp[c.reqZone])) return false;
  return true;
}

function makeOrder(st = S) {
  const tier = Math.floor((st.day - 1) / 5) + 1;
  const due = tier * 5;
  const mul = st.diff === 'hard' ? 1.25 : st.diff === 'chill' ? 0.8 : 1;
  const templates = [
    { n: 'Chuyến Xe Nông Sản Đầu Mùa', req: { carrot: Math.max(3, Math.round(4 * mul)), cabbage: Math.max(2, Math.round(2 * mul)) }, cash: 95, fan: 25 },
    { n: 'Đơn Hàng Phiên Chợ Phố Núi', req: { sweet: Math.round(3 * mul), tomato: Math.round(2 * mul), juice: 1 }, cash: 175, fan: 40 },
    { n: 'Đơn Đặt Hàng Tiệm Bánh Đà Lạt', req: { corn: Math.round(3 * mul), straw: Math.round(2 * mul), roast: 1 }, cash: 280, fan: 65 },
    { n: 'Chuyến Xe Lễ Hội Mùa Đông', req: { cake: 1, straw: Math.round(3 * mul), tomato: Math.round(3 * mul) }, cash: 420, fan: 95 },
    { n: 'Tiệc Giáng Sinh Đồi Thông', req: { cake: 1, hotpot: 1, melon: Math.round(2 * mul) }, cash: 650, fan: 140 },
  ];
  const tp = templates[Math.min(templates.length - 1, tier - 1)];
  st.order = { tier, due, n: tp.n, req: { ...tp.req }, cash: tp.cash, fan: tp.fan, done: false };
}

function canDeliverOrder() {
  if (!S || !S.order || S.order.done) return false;
  return Object.entries(S.order.req).every(([k, q]) => (S.inv[k] || 0) >= q);
}

function deliverOrder() {
  if (!canDeliverOrder()) { toast('Chưa đủ nông sản/món ăn trong kho để giao Đơn hàng tuần!'); SFX.err(); return; }
  Object.entries(S.order.req).forEach(([k, q]) => S.inv[k] -= q);
  S.order.done = true;
  S.stars = (S.stars || 0) + 1;
  S.stats.orders = (S.stats.orders || 0) + 1;
  const sleighBonus = S.miles?.sleigh ? 1.2 : 1;
  const cash = Math.round(S.order.cash * sleighBonus);
  earn(cash); addFans(S.order.fan); addXp(22);
  SFX.jingle();
  toast(`📦 Giao thành công <b>${S.order.n}</b>! Nhận <b>+${fmt(cash)}, +${S.order.fan}💜 & +1⭐ Sao Tím</b>!`, 4000);
  checkBadges(); renderShop(); updateHud(); save();
}

function weeklyBill() {
  if (!S) return 50;
  if (S.diff === 'chill') return Math.round(35 + S.bought * 5);
  const base = S.diff === 'hard' ? 95 : 65;
  const perPlot = S.diff === 'hard' ? 14 : 9;
  const expCount = Object.keys(S.exp || {}).length;
  const disc = 1 - ((S.fr?.van || 1) - 1) * .05;
  return Math.round((base + S.bought * perPlot + expCount * 25) * disc);
}

// Easter Egg Relics: Thưởng kỷ niệm nhỏ gọn để giữ cân bằng kinh tế Farm
function unlockRelic(id) {
  if (!S || S.relics[id]) return;
  const r = RELICS.find(x => x.id === id);
  if (!r) return;
  S.relics[id] = true;
  S.maxSt += 3; S.st = Math.min(S.maxSt, S.st + 10);
  earn(15); addFans(20);
  SFX.jingle();
  toast(`💎 Sưu tầm Kỷ vật ARMY: <b>${r.e} ${r.n}</b>! (+15k kỷ niệm, +20💜, +3⚡ & +1% giá bán)`, 4200);
  checkBadges(); save();
}

function checkRelics() {
  if (!S) return;
  if (S.fans >= 1306) unlockRelic('bomb');
  if (S.maxSt >= 130) unlockRelic('glove');
  if ((S.stats.snowfl || 0) >= 5) unlockRelic('spring');
  if (S.plots.filter(p => p.s !== 'locked').length >= 20) unlockRelic('soop');
  if ((S.stats.cook || 0) >= 7) unlockRelic('cake7');
  if ((S.stats.trivia || 0) >= 3) unlockRelic('radio');
  if (Object.values(S.fr || {}).reduce((a, b) => a + b, 0) >= 21) unlockRelic('borahae');
}

function rollQuests(st = S) {
  const pool = [
    { id: 'harv', n: 'Thu hoạch 4 ô nông sản',    goal: 4, cur: 0, rCash: 28, rFan: 12, e: '🧺' },
    { id: 'water',n: 'Tưới hoặc chăm 6 ô ruộng',  goal: 6, cur: 0, rCash: 22, rFan: 10, e: '💧' },
    { id: 'fish', n: 'Câu cá ở Hồ Tuyết 2 lần',   goal: 2, cur: 0, rCash: 30, rFan: 12, e: '🎣' },
    { id: 'cook', n: 'Chế biến 1 món ở Bếp Bánh', goal: 1, cur: 0, rCash: 35, rFan: 15, e: '🧁' },
    { id: 'sell', n: 'Bán 5 nông sản tại Sạp',    goal: 5, cur: 0, rCash: 32, rFan: 12, e: '🛒' },
    { id: 'gym',  n: 'Tập Gym rèn thể lực 1 lần', goal: 1, cur: 0, rCash: 25, rFan: 10, e: '💪' },
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
        const mul = S.miles?.sleigh ? 1.2 : 1;
        const rc = Math.round(q.rCash * mul);
        earn(rc); addFans(q.rFan); addXp(10);
        SFX.win();
        toast(`📋 Hoàn thành nhiệm vụ "${q.n}": <b>+${fmt(rc)} & +${q.rFan}💜</b>!`);
      }
    }
  });
}

function addXp(n) {
  S.xp = (S.xp || 0) + n;
  let need = xpNeed(S.lv);
  while (S.xp >= need) {
    S.xp -= need; S.lv++; S.maxSt += 4; S.st = Math.min(S.maxSt, S.st + 15);
    need = xpNeed(S.lv);
    SFX.win();
    const newCrops = CK.filter(k => CROPS[k].reqLv === S.lv).map(k => `${CROPS[k].e} ${CROPS[k].n}`).join(', ');
    float(ck.x, ck.y - 96, `🎉 Lên cấp Lv.${S.lv}! (+4⚡)`, '#9362cc');
    if (newCrops) toast(`🌱 Lên <b>Cấp ${S.lv}</b>! Đã mở khóa hạt giống mới: <b>${newCrops}</b>!`, 4200);
  }
  checkRelics(); checkBadges();
}

function checkBadges() {
  if (!S) return;
  BADGES.forEach(b => {
    if (!S.badges[b.id] && b.c(S)) {
      S.badges[b.id] = true;
      earn(b.reward); addFans(15);
      SFX.win();
      toast(`🏅 Đạt thành tựu <b>${b.e} ${b.n}</b>! Thưởng <b>+${fmt(b.reward)}</b>!`);
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
  if (k === 'rainbow') return { n: 'Cà rốt cầu vồng', e: '🌈', price: 165 };
  if (CROPS[k]) return CROPS[k];
  if (SPECIALS[k]) return SPECIALS[k];
  if (FISH[k]) return FISH[k];
  const r = RECIPES.find(x => x.id === k);
  return r || { n: k, e: '🎁', price: 15 };
}

function bonus() {
  if (!S) return 1;
  const diffMul = S.diff === 'chill' ? 1.12 : S.diff === 'hard' ? 0.88 : 1;
  let b = 1 + Math.min(.22, S.fans / 25000);
  if (S.up.sign) b += .08;
  if (S.weather === 'snow') b += .08;
  if (S.viral === S.day) b += .15;
  if (S.exp?.cloudcafe) b += .12;
  if (S.miles.barn) b += .04;
  if (S.miles.sleigh) b += .05;
  if (S.miles.concert) b += .06;
  if (S.miles.train) b += .08;
  if (S.miles.villa) b += .10;
  if (S.miles.legend) b += .15;
  b += ((S.fr?.chimmy || 1) - 1) * .02;
  b += Object.keys(S.relics || {}).length * .01;
  return b * diffMul;
}

function priceOf(k) {
  const it = itemInfo(k);
  const m = CROPS[k] ? (S.price[k] || 1) : 1;
  return Math.max(1, Math.round(it.price * m * bonus()));
}

const hoeCost = () => S.up.hoe ? 2 : 4;
const canCost = () => S.up.can ? 1 : 2;
const plotCost = () => Math.max(30, Math.round((35 + Math.pow(S.bought, 1.32) * 14) * (1 - ((S.fr?.van || 1) - 1) * .05)));
const allSellKeys = () => [...CK, 'rainbow', ...SK, ...FK, ...RECIPES.map(r => r.id)].filter(k => S.inv[k] > 0);
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
function addFans(n) { S.fans = Math.max(0, S.fans + n); checkRelics(); checkBadges(); }
function waterAll() { S.plots.forEach(p => { if (p.s === 'crop' && !p.dead && !p.ripe) p.w = true; }); }
function clearPlot(p) { Object.assign(p, { s: 'tilled', crop: null, g: 0, w: false, dry: 0, ripe: false, rd: 0, dead: false, bug: false, ice: false, crow: 0, rainbow: false }); }

function harvestPlot(p) {
  const c = CROPS[p.crop];
  if (p.rainbow) S.inv.rainbow++; else S.inv[p.crop]++;
  if (p.crop === 'snowfl') S.stats.snowfl = (S.stats.snowfl || 0) + 1;
  let extra = 0;
  const fert = p.fert ?? 100;
  const fertMul = fert >= 80 ? 1 : 0.25;
  const dblChance = (.04 + (S.up.green ? .06 : 0) + ((S.fr?.shooky || 1) - 1) * .02) * fertMul;
  if (!p.rainbow && Math.random() < dblChance) { S.inv[p.crop]++; extra = 1; }
  if (c.fans) addFans(c.fans);
  // Giảm độ màu mỡ đất sau mỗi vụ thu hoạch
  p.fert = Math.max(25, fert - (S.diff === 'chill' ? 14 : 22));
  S.today.harv++; S.stats.harv++;
  progQuest('harv', 1); addXp(c.xp || 4);
  if (c.regrow && !p.rainbow) { p.ripe = false; p.rd = 0; p.g = c.days - c.regrow; p.w = false; }
  else clearPlot(p);
  return extra;
}

function stealRipe(n) {
  const rs = shuffle(ripes()).slice(0, n);
  rs.forEach(p => { const c = CROPS[p.crop]; if (c.regrow && !p.rainbow) { p.ripe = false; p.g = c.days - c.regrow; } else clearPlot(p); });
  return rs.length;
}

/* ---------- Sound & BTS Chiptunes ---------- */
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
  jingle: () => seq([659, 659, 659, 0, 659, 659, 659, 0, 659, 784, 523, 587, 659], 125, 'triangle', .05),
  dynamite: () => seq([554, 659, 740, 659, 0, 880, 740, 659, 554, 659], 115, 'triangle', .05),
  supertuna: () => seq([587, 587, 784, 784, 880, 880, 784, 0, 659, 659, 587, 784], 105, 'square', .04),
};

/* ---------- Visual FX ---------- */
function float(x, y, txt, col = '#63324d') { floats.push({ x, y, txt, col, life: 1.35 }); }
function puff(x, y, col, n = 8, up = 1) {
  for (let i = 0; i < n; i++) parts.push({ x: x + rnd(-14, 14), y: y + rnd(-6, 6), vx: rnd(-40, 40), vy: rnd(-85, -20) * up, life: rnd(.4, .8), col, r: rnd(2.2, 4.2) });
}
function say(t) { ck.bub = t; ck.bubT = 3.0; }
function act(icon) { ck.act = .35; ck.icon = icon; ck.iconT = .95; }
let toastT = null;
function toast(msg, ms = 2800) {
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

/* ---------- Characters (Cooky & Accurate BT21 Friends on Canvas) ---------- */
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
  ell(g, -7.2, -57, 5.2, 13, P, OL, -.12 + ew);
  ell(g, -7.2, -55.5, 2.6, 8.2, PL, null, -.12 + ew);
  ell(g, 7.8, -53, 5.5, 11, P, OL, .42 - ew);
  ell(g, 0, -34, 17, 14.5, P, OL);
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

// Vẽ chính xác tạo hình 7 thành viên BT21 trên bản đồ Canvas
function drawBT21(g, id, x, y, t, scale = 0.85) {
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  const bob = Math.sin(t * 2.6 + x * 0.1) * 1.5;
  ell(g, 0, 2, 13, 4, 'rgba(60,30,50,.15)');
  g.translate(0, bob);
  g.lineWidth = 1.6; g.lineCap = 'round'; g.lineJoin = 'round';

  if (id === 'koya') {
    ell(g, 0, -10, 10, 9, '#6ec3f5', '#365c7d');
    ell(g, -11, -28, 6.5, 6.5, '#6ec3f5', '#365c7d'); ell(g, -11, -28, 3.2, 3.2, '#fff');
    ell(g, 11, -28, 6.5, 6.5, '#6ec3f5', '#365c7d'); ell(g, 11, -28, 3.2, 3.2, '#fff');
    ell(g, 0, -23, 13, 11, '#6ec3f5', '#365c7d');
    ell(g, 0, -21, 3.2, 4.2, '#6f52b8', '#2b2440');
    g.strokeStyle = '#2b2440'; g.beginPath();
    g.arc(-5.5, -24, 2.2, 0.1, Math.PI - 0.1); g.moveTo(7.7, -24); g.arc(5.5, -24, 2.2, 0.1, Math.PI - 0.1); g.stroke();
  } else if (id === 'rj') {
    ell(g, 0, -11, 11, 10, '#fff', '#5c4742');
    ell(g, -5.5, -35, 3.2, 6, '#fff', '#5c4742', -0.2); ell(g, 5.5, -35, 3.2, 6, '#fff', '#5c4742', 0.2);
    ell(g, 0, -24, 13.5, 11.5, '#fff', '#5c4742');
    g.fillStyle = '#f2545b'; g.strokeStyle = '#5c4742'; rr(g, -10, -16, 20, 4.5, 2.2); g.fill(); g.stroke();
    ell(g, -5, -25, 1.8, 2, '#2d2220'); ell(g, 5, -25, 1.8, 2, '#2d2220');
    ell(g, -8, -22, 2.2, 1.2, '#ffb3c6'); ell(g, 8, -22, 2.2, 1.2, '#ffb3c6');
    ell(g, 0, -23, 1.4, 1.2, '#2d2220');
  } else if (id === 'shooky') {
    ell(g, 0, -15, 12.5, 12, '#a66a38', '#4a2a10');
    ell(g, -6, -21, 1.5, 1.5, '#593416'); ell(g, 6, -20, 1.4, 1.4, '#593416'); ell(g, -7, -10, 1.4, 1.4, '#593416');
    ell(g, -4.5, -16, 1.8, 1.8, '#261305'); ell(g, 4.5, -16, 1.8, 1.8, '#261305');
    g.fillStyle = '#fff'; rr(g, -4.5, -12, 9, 3, 1); g.fill();
  } else if (id === 'mang') {
    ell(g, 0, -10, 9.5, 9, '#7998f2', '#382466');
    ell(g, -6, -34, 3, 5.5, '#7998f2', '#382466', -0.25); ell(g, 6, -34, 3, 5.5, '#7998f2', '#382466', 0.25);
    ell(g, 0, -32, 5, 3.5, '#7b4ec4', '#382466');
    ell(g, 0, -23, 12.5, 10.5, '#7998f2', '#382466');
    ell(g, -5, -25, 2, 2, '#221838'); ell(g, 5, -25, 2, 2, '#221838');
    heart(g, 0, -19, 6.5, '#e85d99');
  } else if (id === 'chimmy') {
    ell(g, 0, -10, 10.5, 9.5, '#ffd93d', '#594312');
    ell(g, 0, -23, 13.5, 11.5, '#ffd93d', '#594312');
    ell(g, -13, -22, 3.5, 7.5, '#2b262d', '#1a161b', 0.15);
    ell(g, 13, -22, 3.5, 7.5, '#2b262d', '#1a161b', -0.15);
    ell(g, 0, -22, 9.5, 8, '#fff', '#594312');
    ell(g, -4, -23.5, 1.7, 1.8, '#2b262d'); ell(g, 4, -23.5, 1.7, 1.8, '#2b262d');
    ell(g, 1.6, -18.2, 1.6, 2, '#ff6b8b');
  } else if (id === 'tata') {
    ell(g, 0, -9, 8.5, 8.5, '#2f66d0', '#2b1820');
    ell(g, -3, -10, 1.6, 1.6, '#ffd166'); ell(g, 3, -7, 1.6, 1.6, '#ffd166');
    heart(g, 0, -23, 18, '#f03a47');
    ell(g, -4.5, -25, 1.8, 1.8, '#2b1820'); ell(g, 4.5, -25, 1.8, 1.8, '#2b1820');
    ell(g, 0, -20, 4.2, 2, '#ffd166', '#2b1820');
  } else if (id === 'van') {
    ell(g, 0, -10, 9.5, 9, '#9aa5b8', '#363d4a');
    g.save();
    g.beginPath(); g.arc(0, -23, 12, Math.PI * 0.5, Math.PI * 1.5); g.fillStyle = '#f5f7fa'; g.fill();
    g.beginPath(); g.arc(0, -23, 12, -Math.PI * 0.5, Math.PI * 0.5); g.fillStyle = '#9aa5b8'; g.fill();
    g.strokeStyle = '#363d4a'; g.lineWidth = 1.8; g.beginPath(); g.arc(0, -23, 12, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(-4.5, -24, 2.2, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.moveTo(2.5, -26); g.lineTo(6.5, -22); g.moveTo(6.5, -26); g.lineTo(2.5, -22); g.stroke();
    g.restore();
  }
  g.restore();
}

/* ---------- Da Lat Winter Background (pre-render) ---------- */
let bg = document.createElement('canvas'), K = 1;
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function pine(g, x, y, h, dark) {
  g.fillStyle = '#8a6b56'; g.fillRect(x - 3, y - 8, 6, 10);
  const cols = dark ? ['#6ea88e', '#7db89d', '#8ec7ad'] : ['#7ebf9e', '#8fd0af', '#a2dec0'];
  for (let i = 0; i < 3; i++) {
    const w = h * (.56 - i * .11), yy = y - 6 - i * h * .25;
    g.fillStyle = cols[i];
    g.beginPath(); g.moveTo(x - w / 2, yy); g.lineTo(x + w / 2, yy); g.lineTo(x, yy - h * .44); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,252,255,.78)';
    g.beginPath(); g.moveTo(x - w * .34, yy - h * .15); g.quadraticCurveTo(x, yy - h * .05, x + w * .34, yy - h * .15); g.lineTo(x, yy - h * .44); g.closePath(); g.fill();
  }
}

function drawBG() {
  bg.width = Math.round(W * K); bg.height = Math.round(H * K);
  const g = bg.getContext('2d'); g.setTransform(K, 0, 0, K, 0, 0);
  const R = mulberry(19);
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, '#c8ecd9'); gr.addColorStop(.45, '#bfe6cf'); gr.addColorStop(1, '#cdebd6');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 220; i++) {
    ell(g, R() * W, R() * H, 2 + R() * 4, 1.2 + R() * 2, i % 3 ? 'rgba(255,255,255,.45)' : 'rgba(255,220,235,.4)');
  }
  for (let x = -10; x < W + 20; x += 36) pine(g, x + R() * 10, 64 + R() * 8, 68 + R() * 15, true);
  g.fillStyle = '#f7e7d0'; rr(g, 14, 198, W - 28, 30, 15); g.fill();
  for (let i = 0; i < 55; i++) ell(g, 26 + R() * (W - 52), 204 + R() * 18, 3 + R() * 3, 2 + R() * 1.5, i % 2 ? '#eed2dc' : '#dcd2f2');

  // Nhà gỗ Đà Lạt
  ell(g, 112, 202, 90, 8, 'rgba(90,50,80,.1)');
  g.fillStyle = '#fff5ea'; g.strokeStyle = '#d9b29c'; g.lineWidth = 2; rr(g, 36, 112, 152, 90, 6); g.fill(); g.stroke();
  g.fillStyle = '#e3a598'; g.fillRect(156, 68, 18, 32);
  ell(g, 165, 68, 11, 4, '#ffffff');
  g.fillStyle = '#ffa6c4'; g.strokeStyle = '#d47496'; g.lineWidth = 2.4;
  g.beginPath(); g.moveTo(20, 118); g.lineTo(112, 62); g.lineTo(204, 118); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#ffffff';
  for (let x = 28; x <= 196; x += 16) ell(g, x, 118, 9, 4.5, '#ffffff');
  heart(g, 112, 96, 13, '#fff5f9');
  g.fillStyle = '#c48b68'; rr(g, 97, 148, 30, 54, 5); g.fill();
  ell(g, 112, 166, 9, 9, '#6bc59c', '#3d8f6a'); ell(g, 112, 166, 4, 4, '#c48b68');
  ell(g, 112, 157, 4, 2.5, '#ff6b8b');
  [50, 142].forEach(x => {
    g.fillStyle = '#dff2ff'; g.strokeStyle = '#b88c72'; g.lineWidth = 2.2;
    rr(g, x, 134, 30, 26, 4); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; rr(g, x - 2, 159, 34, 5, 2.5); g.fill();
  });
  // Đài Radio bên hiên nhà
  g.fillStyle = '#b392f0'; rr(g, 190, 168, 28, 22, 5); g.fill();
  emo(g, '📻', 204, 178, 17);
  pine(g, 212, 198, 92, false);
  [['#ff85a2', 206, 176], ['#ffee93', 220, 168], ['#b892ff', 209, 152], ['#7ce0c3', 218, 184]].forEach(([c, x, y]) => ell(g, x, y, 4, 4, c, '#fff'));
  emo(g, '⭐', 212, 124, 18);

  // Góc tập Gym
  g.fillStyle = '#e5dcf2'; rr(g, 232, 152, 112, 48, 9); g.fill();
  g.fillStyle = '#f3edff'; rr(g, 236, 156, 104, 40, 7); g.fill();
  g.fillStyle = '#ff9ebb'; rr(g, 246, 166, 48, 8, 4); g.fill();
  g.strokeStyle = '#7c88a6'; g.lineWidth = 3; g.beginPath(); g.moveTo(296, 152); g.lineTo(338, 152); g.stroke();
  g.fillStyle = '#68a8e8'; rr(g, 294, 144, 6, 16, 2); g.fill(); rr(g, 334, 144, 6, 16, 2); g.fill();
  g.fillStyle = '#b392f0'; rr(g, 224, 116, 48, 18, 4); g.fill(); txt(g, 'GYM 💪', 248, 125.5, 9.5, '#fff', 900);

  // Xưởng Bếp Bánh & Trà Nóng
  ell(g, 674, 202, 64, 7, 'rgba(90,50,80,.1)');
  g.fillStyle = '#fff3f8'; g.strokeStyle = '#e8acc4'; g.lineWidth = 2; rr(g, 616, 118, 116, 82, 8); g.fill(); g.stroke();
  for (let i = 0; i < 6; i++) {
    g.fillStyle = i % 2 ? '#e6dbfa' : '#ffc2d6';
    rr(g, 612 + i * 20, 106, 20, 22, 6); g.fill();
  }
  g.fillStyle = '#b392f0'; rr(g, 632, 86, 84, 20, 5); g.fill(); txt(g, '🧁 BẾP BÁNH', 674, 96.5, 10, '#fff', 900);
  [['🍰', 642], ['🍵', 674], ['🥤', 706]].forEach(([e, x]) => emo(g, e, x, 152, 18));

  // Sạp Nông Sản
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

  // Hàng rào ruộng gỗ kem
  const fx0 = FX - 14, fy0 = FY - 10, fw = COLS * T + 28, fh = ROWS * T + 22;
  g.fillStyle = 'rgba(130,95,115,.12)'; rr(g, fx0 + 4, fy0 + 4, fw - 8, fh - 8, 12); g.fill();
  g.strokeStyle = '#d9b29c'; g.lineWidth = 4;
  const rail = (x1, y1, x2, y2) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
  rail(fx0, fy0, FX + 190, fy0); rail(FX + 290, fy0, fx0 + fw, fy0); rail(fx0, fy0 + fh, fx0 + fw, fy0 + fh); rail(fx0, fy0, fx0, fy0 + fh); rail(fx0 + fw, fy0, fx0 + fw, fy0 + fh);
  g.fillStyle = '#fff5ee';
  for (let x = fx0; x <= fx0 + fw; x += 36) { if (x > FX + 194 && x < FX + 286) continue; rr(g, x - 3, fy0 - 7, 6, 13, 2); g.fill(); rr(g, x - 3, fy0 + fh - 7, 6, 13, 2); g.fill(); }

  // Hồ Tuyết & Cầu gỗ câu cá
  ell(g, 114, 528, 90, 44, '#92ccf0'); ell(g, 114, 524, 83, 38, '#b6e2ff');
  g.fillStyle = '#d9ae8e'; rr(g, 152, 496, 52, 18, 4); g.fill();
  txt(g, '🎣 Hồ Tuyết', 114, 476, 10, '#5a4266', 800);
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; ell(g, 114 + Math.cos(a) * 90, 528 + Math.sin(a) * 44, 8, 5.5, '#f2e9f0', '#cbbcd1'); }
}

/* ---------- Plot, Expansion Zones & World Objects ---------- */
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
  const fert = p.fert ?? 100;
  const base = p.s === 'grass' ? '#f0d8be' : wet ? '#966856' : fert < 60 ? '#cfb09b' : '#ba8870';
  const edge = p.s === 'grass' ? '#d9bc9c' : wet ? '#784e3e' : '#9c6c56';
  ctx.fillStyle = edge; rr(ctx, x + 3, y + 5, T - 6, T - 7, 9); ctx.fill();
  ctx.fillStyle = base; rr(ctx, x + 3, y + 3, T - 6, T - 9, 9); ctx.fill();
  if (p.s === 'grass') {
    ctx.strokeStyle = '#92cfa4'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 4; k++) { const gx = x + 12 + ((i * 37 + k * 23) % 36), gy = y + 14 + ((i * 17 + k * 29) % 34); ctx.beginPath(); ctx.moveTo(gx - 3, gy); ctx.lineTo(gx, gy - 5); ctx.lineTo(gx + 3, gy); ctx.stroke(); }
  } else {
    ctx.strokeStyle = edge; ctx.lineWidth = 2;
    [16, 29, 42].forEach(d => { ctx.beginPath(); ctx.moveTo(x + 9, y + d); ctx.quadraticCurveTo(cx, y + d + 2.5, x + T - 9, y + d); ctx.stroke(); });
    if (fert < 85) {
      ctx.fillStyle = 'rgba(0,0,0,.22)'; rr(ctx, x + 10, y + T - 10, T - 20, 4, 2); ctx.fill();
      ctx.fillStyle = fert >= 60 ? '#86d975' : '#ff9b85'; rr(ctx, x + 10, y + T - 10, (T - 20) * (fert / 100), 4, 2); ctx.fill();
    }
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
    if (!p.dead && !p.ripe && !p.w && !p.ice) { ctx.globalAlpha = .55 + .45 * Math.sin(t * 4 + i); emo(ctx, '💧', x + T - 12, y + 12, 12); ctx.globalAlpha = 1; }
  }
  if (p.ice) {
    ctx.fillStyle = 'rgba(180,230,255,.58)'; rr(ctx, x + 4, y + 4, T - 8, T - 10, 8); ctx.fill();
    emo(ctx, '🧊', cx + 10, cy - 10, 15);
  }
  if (p.weed) emo(ctx, '🌿', cx - 10, cy + 8, 16);
  if (p.s === 'crop' && p.bug) emo(ctx, '🐛', cx + 11 + Math.sin(t * 5 + i) * 2.5, cy + 11, 16);
  if (p.crow > 0) {
    emo(ctx, '🐦‍⬛', cx, cy - 12 + Math.sin(t * 12) * 3, 22);
    txt(ctx, `${Math.ceil(p.crow)}s`, cx, y + 10, 9.5, '#d92b4b', 900);
  }
}

// Vẽ 4 Khu Vực Mở Rộng trên bản đồ (Khi khóa và Khi đã mở)
function drawExpansionZones() {
  const t = ck.t;
  EXPANSIONS.forEach(ex => {
    const unlocked = S.exp && S.exp[ex.id];
    const cx = ex.x + ex.w / 2, cy = ex.y + ex.h / 2;
    if (!unlocked) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,245,250,.32)';
      ctx.strokeStyle = 'rgba(185,125,155,.65)';
      ctx.setLineDash([6, 5]); ctx.lineWidth = 2;
      rr(ctx, ex.x, ex.y, ex.w, ex.h, 12); ctx.fill(); ctx.stroke();
      ctx.restore();
      const canOpen = S.stats.earn >= ex.reqEarn && S.cash >= ex.cost;
      ctx.fillStyle = canOpen ? '#6bc5a0' : 'rgba(98,58,84,.84)';
      rr(ctx, cx - 78, cy - 18, 156, 36, 9); ctx.fill();
      txt(ctx, `${canOpen ? '✨ Mở' : '🔒'} ${ex.e} ${ex.n.split(': ')[1]}`, cx, cy - 6, 9.5, '#fff', 900);
      txt(ctx, `Mốc DT ${fmt(ex.reqEarn)} · Giá ${fmt(ex.cost)}`, cx, cy + 8, 8.5, '#ffeef5', 700);
      return;
    }

    // Khi đã mở khóa khu vực: vẽ công trình chi tiết!
    ctx.fillStyle = 'rgba(255,250,245,.55)';
    ctx.strokeStyle = '#d9b29c'; ctx.lineWidth = 2;
    rr(ctx, ex.x, ex.y, ex.w, ex.h, 12); ctx.fill(); ctx.stroke();

    if (ex.id === 'highland') {
      // Khu 1: Đồi Hoa & Dâu Cao Nguyên
      ctx.fillStyle = '#e8f7f0'; ctx.strokeStyle = '#8ac4a8';
      rr(ctx, ex.x + 12, ex.y + 18, ex.w - 24, ex.h - 32, 10); ctx.fill(); ctx.stroke();
      for (let i = 0; i < 4; i++) {
        const bx = ex.x + 26 + i * 48, by = ex.y + 42;
        ctx.fillStyle = '#c48f74'; rr(ctx, bx, by, 38, 42, 6); ctx.fill();
        emo(ctx, i % 2 ? '🌹' : '❄️', bx + 19, by + 18 + Math.sin(t * 2.5 + i) * 2, 20);
      }
      txt(ctx, '🍓 Đồi Hoa Cao Nguyên', cx, ex.y + 11, 9.5, '#63324d', 800);
    } else if (ex.id === 'apiary') {
      // Khu 2: Thung Lũng Ong Mật Hoa Thông
      for (let i = 0; i < 3; i++) {
        const hx = ex.x + 36 + i * 58, hy = ex.y + 78 + (i % 2) * 18;
        ell(ctx, hx, hy + 18, 16, 5, 'rgba(80,45,60,.12)');
        ctx.fillStyle = '#f5c76b'; ctx.strokeStyle = '#b57c2c'; ctx.lineWidth = 1.8;
        rr(ctx, hx - 14, hy - 14, 28, 30, 8); gStripe(hx, hy);
        emo(ctx, '🐝', hx + Math.cos(t * 4 + i * 2) * 14, hy - 18 + Math.sin(t * 5 + i) * 6, 13);
      }
      txt(ctx, '🐝 Thung Lũng Ong Mật', cx, ex.y + 14, 9.5, '#63324d', 800);
    } else if (ex.id === 'orchard') {
      // Khu 3: Vườn Hồng Treo Gió Đà Lạt
      for (let i = 0; i < 3; i++) {
        const tx = ex.x + 65 + i * 115, ty = ex.y + 72;
        ctx.fillStyle = '#8a5a44'; ctx.fillRect(tx - 4, ty, 8, 26);
        ell(ctx, tx, ty - 10, 28, 20, '#7bc49e', '#4d9470');
        emo(ctx, '🍅', tx - 10, ty - 12, 13); emo(ctx, '🍅', tx + 10, ty - 6, 13);
      }
      // Giàn phơi hồng treo gió
      ctx.strokeStyle = '#9c6644'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(ex.x + 340, ex.y + 38); ctx.lineTo(ex.x + 455, ex.y + 38); ctx.stroke();
      for (let i = 0; i < 5; i++) emo(ctx, '🏮', ex.x + 352 + i * 22, ex.y + 54 + Math.sin(t * 3 + i) * 1.5, 14);
      txt(ctx, '🍑 Vườn Hồng Treo Gió', cx, ex.y + 14, 9.5, '#63324d', 800);
    } else if (ex.id === 'cloudcafe') {
      // Khu 4: Quán Cà Phê Săn Mây
      ctx.fillStyle = '#f5e1d3'; ctx.strokeStyle = '#c4967a';
      rr(ctx, ex.x + 14, ex.y + 28, ex.w - 28, ex.h - 42, 10); ctx.fill(); ctx.stroke();
      emo(ctx, '⛱️', ex.x + 56, ex.y + 78, 30);
      emo(ctx, '☕', ex.x + 98, ex.y + 88, 22);
      emo(ctx, '🍰', ex.x + 138, ex.y + 88, 22);
      txt(ctx, '☕ Cà Phê Săn Mây (+12%)', cx, ex.y + 14, 9.5, '#63324d', 800);
    }

    // Kiểm tra xem khu vực đã tới ngày thu hoạch đặc sản chưa
    const nextDay = S.expDay?.[ex.id] || 1;
    if (S.day >= nextDay) {
      const sp = SPECIALS[ex.prod];
      const by = cy - 8 + Math.sin(t * 4) * 3;
      ctx.fillStyle = '#ff8fb1'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      rr(ctx, cx - 54, by - 12, 108, 24, 12); ctx.fill(); ctx.stroke();
      txt(ctx, `${sp.e} Thu hoạch!`, cx, by + 0.5, 10, '#fff', 900);
    } else {
      txt(ctx, `Còn ${nextDay - S.day} ngày`, cx, ex.y + ex.h - 11, 8.5, '#7a4260', 800);
    }
  });
}
function gStripe(hx, hy) {
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#593a18'; rr(ctx, hx - 6, hy - 2, 12, 5, 2.5); ctx.fill();
}

function drawWorldExtras() {
  const t = ck.t, nm = S.name || 'Cooky';
  ctx.fillStyle = '#ff9ebb'; rr(ctx, 76, 125, 72, 16, 4); ctx.fill();
  txt(ctx, `Nhà ${nm.slice(0, 8)}`, 112, 133.5, 9, '#fff', 800);
  ctx.fillStyle = '#ff85a8'; rr(ctx, 796, 166, 104, 22, 6); ctx.fill();
  txt(ctx, `SẠP ${nm.toUpperCase().slice(0, 8)}`, 848, 177.5, 10.5, '#fff', 900);

  const noteY = (t * 16) % 24;
  ctx.globalAlpha = 1 - noteY / 24;
  txt(ctx, '♪', 204 + Math.sin(t * 4) * 5, 162 - noteY, 12, '#8e5ec4', 900);
  ctx.globalAlpha = 1;

  const cols = ['#ffb3c6', '#ffee93', '#b8f2e6', '#d8c2ff'];
  for (let i = 0; i < 9; i++) {
    const c = cols[(i + Math.floor(t * 3)) % 4];
    ell(ctx, 32 + i * 20, 119, 3, 3, c);
    ell(ctx, 770 + i * 20, 86, 3, 3, c);
  }

  drawExpansionZones();

  if (S.up.heater) emo(ctx, '🔥', FX + COLS * T + 18, FY + 44, 22);
  if (S.up.scare) {
    const x = FX - 38, y = FY + 115;
    ell(ctx, x, y, 16, 5, 'rgba(90,50,80,.12)');
    ell(ctx, x, y - 12, 13, 12, '#fff', '#cbbcd1');
    ell(ctx, x, y - 28, 9.5, 9, '#fff', '#cbbcd1');
    ctx.fillStyle = '#ff8fb1'; rr(ctx, x - 9, y - 21, 18, 4, 2); ctx.fill();
    emo(ctx, '🎩', x, y - 39, 14);
  }
  if (S.up.sign) {
    const x = FX - 42, y = FY + 48;
    ctx.fillStyle = '#d9a7be'; rr(ctx, x - 34, y - 32, 68, 28, 7); ctx.fill();
    txt(ctx, `${nm.slice(0, 8)}`, x, y - 22, 9.5, '#fff', 900);
    txt(ctx, 'ĐÀ LẠT FARM', x, y - 11, 7.5, '#fff', 800);
  }

  // Vẽ các thành viên BT21 chuẩn tạo hình đang ghé thăm hoặc đã thân thiết (Lv >= 2)
  const btSpots = [
    ['rj', 612, 216],
    ['chimmy', 360, 216],
    ['koya', 210, 340],
    ['shooky', 735, 216],
    ['mang', 180, 420],
    ['tata', 205, 275],
    ['van', 595, 216],
  ];
  btSpots.forEach(([id, bx, by], idx) => {
    const lv = S.fr?.[id] || 1;
    const isVisitor = ((S.day + idx) % 4 === 0);
    if (lv >= 2 || (id === 'koya' && S.up.koya) || isVisitor) {
      drawBT21(ctx, id, bx + Math.sin(t * 0.9 + idx) * 6, by, t, 0.85);
    }
  });

  // Thú cưng chạy quanh bờ cỏ bên trái
  let pi = 0;
  PETS.forEach(p => {
    if (!S.pets[p.id]) return;
    const px = 42 + (pi % 2) * 76 + Math.sin(t * 1.4 + pi * 2) * 10;
    const py = 330 + Math.floor(pi / 2) * 62 + Math.cos(t * 2 + pi) * 4;
    ell(ctx, px, py + 10, 14, 4, 'rgba(90,50,80,.1)');
    emo(ctx, p.e, px, py, 24);
    if (S.petFed[p.id] === S.day) emo(ctx, '💜', px + 11, py - 13, 10);
    pi++;
  });

  if (S.miles.barn) emo(ctx, '🪵', 34, 244, 24);
  if (S.miles.sleigh) emo(ctx, '🛷', 930, 212, 24);
  if (S.miles.train) emo(ctx, '🚂', 480, 42, 26);
  if (S.miles.villa) emo(ctx, '🏰', 112, 48, 28);
  if (S.miles.legend) emo(ctx, '👑', FX + COLS * T / 2, FY - 24, 26);

  if (star613.active) {
    ctx.save();
    ctx.strokeStyle = 'rgba(210,170,255,.75)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(star613.x - 28, star613.y - 6); ctx.lineTo(star613.x, star613.y); ctx.stroke();
    emo(ctx, '🌠', star613.x, star613.y, 24);
    txt(ctx, '06:13 💜 Bấm ước!', star613.x, star613.y + 18, 9.5, '#fff', 900);
    ctx.restore();
  }
}

function drawGreenhouse() {
  if (!S.up.green) return;
  const x = FX - 8, y = FY - 4, w = COLS * T + 16, h = ROWS * T + 10;
  ctx.fillStyle = 'rgba(235,248,255,.15)'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
}

/* ---------- Main Render ---------- */
function darkness() { const m = S.min; if (m < 420) return .22 * (1 - (m - 360) / 60); if (m < 1050) return 0; return Math.min(.44, (m - 1050) / 180 * .44); }
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

  drawCooky(ctx, ck.x, ck.y, .95, { t, face: ck.face, walk: ck.walk, hop: ck.act > 0 ? Math.sin((.35 - ck.act) / .35 * Math.PI) * 8 : 0, lift: ck.lift > 0, eat: ck.eat > 0, fish: ck.fish > 0, tired: S.st < 15 });
  ctx.font = `800 10px ${FONT}`;
  const nw = ctx.measureText(S.name).width + 12;
  ctx.fillStyle = 'rgba(255,248,252,.85)'; ctx.strokeStyle = '#f3b8ce'; ctx.lineWidth = 1.2;
  rr(ctx, ck.x - nw / 2, ck.y + 5, nw, 15, 7); ctx.fill(); ctx.stroke();
  txt(ctx, S.name, ck.x, ck.y + 12.8, 9.5, '#63324d', 800);

  if (ck.iconT > 0) { ctx.globalAlpha = Math.min(1, ck.iconT * 2); emo(ctx, ck.icon, ck.x + 20, ck.y - 70 - (1 - ck.iconT) * 14, 18); ctx.globalAlpha = 1; }
  parts.forEach(p => { ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2)); ell(ctx, p.x, p.y, p.r, p.r, p.col); }); ctx.globalAlpha = 1;

  if (S.weather === 'snow' || S.weather === 'frost') {
    drops.forEach(d => ell(ctx, d.x, d.y, d.r, d.r, S.weather === 'frost' ? 'rgba(200,240,255,.92)' : 'rgba(255,255,255,.88)'));
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
      if (!label) {
        EXPANSIONS.forEach(ex => {
          if (hover.x > ex.x && hover.x < ex.x + ex.w && hover.y > ex.y && hover.y < ex.y + ex.h) {
            label = S.exp?.[ex.id] ? `${ex.e} ${ex.n}` : `🔒 Mở khóa ${ex.n} (${fmt(ex.cost)})`;
            lx = ex.x + ex.w / 2; ly = ex.y + 12;
          }
        });
      }
    }
    if (label) {
      ctx.font = `800 11px ${FONT}`; const w = ctx.measureText(label).width + 14, bx = clamp(lx - w / 2, 4, W - w - 4);
      ctx.fillStyle = 'rgba(82,50,68,.9)'; rr(ctx, bx, Math.max(4, ly - 20), w, 19, 8); ctx.fill();
      txt(ctx, label, bx + w / 2, Math.max(13.5, ly - 10), 11, '#fff', 800);
    }
    cv.style.cursor = label ? 'pointer' : 'default';
  }
}

function hint(i) {
  const p = S.plots[i];
  if (p.s === 'locked') return canBuy(i) ? `Mở rộng ô ruộng: ${fmt(plotCost())}` : 'Mở ô sát ruộng trước';
  if (fertMode) return `Bón phân hữu cơ hồi 100% độ màu mỡ (đang ${p.fert ?? 100}%)`;
  if (p.crow > 0) return `Đuổi Quạ Đen ngay! (còn ${Math.ceil(p.crow)}s)`;
  if (p.ice) return 'Phá băng sương muối (-2⚡)';
  if (p.weed) return 'Nhổ cỏ (-2⚡)';
  if (p.s === 'crop' && p.bug) return 'Bắt sâu (-2⚡)';
  if (p.s === 'grass') return `Cuốc đất (-${hoeCost()}⚡)`;
  if (p.s === 'tilled') { const c = CROPS[S.sel]; return S.seeds[S.sel] > 0 ? `Gieo ${c.n} (-1⚡ · đất ${p.fert ?? 100}%)` : `Hết hạt ${c.n} – mở Sạp mua`; }
  const c = CROPS[p.crop];
  if (p.dead) return 'Dọn cây héo (-2⚡)';
  if (p.ripe) return `Thu hoạch ${p.rainbow ? 'Cà rốt cầu vồng!' : c.n} (-1⚡)`;
  if (!p.w) return `Tưới ${c.n} (-${canCost()}⚡)`;
  return `${c.n}: còn ${c.days - p.g} ngày ✓ đã tưới (đất ${p.fert ?? 100}%)`;
}

/* ---------- Gameplay Actions & Expansion Zones ---------- */
function jobPos(j) {
  if (j.type === 'tile') return { x: tcx(j.i), y: tcy(j.i) + T / 2 - 5 };
  if (j.type === 'exp') { const ex = EXPANSIONS.find(x => x.id === j.id); return ex ? ex.pos : { x: ck.x, y: ck.y }; }
  if (j.type === 'walk') return { x: j.x, y: j.y };
  return ZONES[j.type].pos;
}
function need(c) { if (S.st >= c) return true; say('Hết sức rồi… ăn 🥕 hoặc món bếp thôi!'); SFX.err(); queue = []; return false; }
function spend(c, mins) { S.st -= c; S.min += mins; }

function perform(j) {
  if (j.type === 'tile') return doTile(j.i);
  if (j.type === 'exp') return doExpansion(j.id);
  if (j.type === 'stall') return openShop('sell');
  if (j.type === 'cook') return openShop('cook');
  if (j.type === 'house') return askSleep();
  if (j.type === 'gym') return doGym();
  if (j.type === 'lake') return doFish();
  if (j.type === 'radio') return openRadio();
}

function doExpansion(id) {
  const ex = EXPANSIONS.find(x => x.id === id);
  if (!ex) return;
  if (!S.exp?.[id]) {
    askUnlockExpansion(id);
    return;
  }
  const nextDay = S.expDay?.[id] || 1;
  if (S.day < nextDay) {
    toast(`${ex.e} <b>${ex.n}</b> đang phát triển, còn <b>${nextDay - S.day} ngày</b> nữa sẽ thu hoạch được ${SPECIALS[ex.prod].e} ${SPECIALS[ex.prod].n}!`);
    return;
  }
  if (id === 'apiary' && growing().length + ripes().length < 2) {
    toast('🐝 Đàn ong cần ít nhất <b>2 ô cây/hoa đang trồng trên ruộng</b> để lấy mật! Hãy trồng thêm cây nhé.');
    return;
  }
  if (!need(3)) return;
  spend(3, 15);
  S.expDay[id] = S.day + ex.cd;
  S.inv[ex.prod] = (S.inv[ex.prod] || 0) + 1;
  const sp = SPECIALS[ex.prod];
  addXp(10); progQuest('harv', 1);
  SFX.harvest(); puff(ck.x, ck.y - 20, '#ffee93', 14);
  float(ck.x, ck.y - 85, `+1 ${sp.e} ${sp.n}`, '#d95b88');
  say(`Thu hoạch ${sp.e} ${sp.n} từ ${ex.n.split(': ')[1]}!`);
  save();
}

function askUnlockExpansion(id) {
  const ex = EXPANSIONS.find(x => x.id === id);
  if (!ex || S.exp?.[id]) return;
  const earnOk = S.stats.earn >= ex.reqEarn;
  const cashOk = S.cash >= ex.cost;
  modal({
    ic: ex.e + '🗺️',
    t: `Mở Rộng Khu Vực: ${ex.n}`,
    d: `<p>${ex.d}</p>
        <hr style="border:0;border-top:1px dashed #f3b8ce;margin:.5em 0">
        <p>📊 <b>Tổng doanh thu nông trại:</b> <span class="${earnOk ? 'up' : 'dn'}">${fmt(S.stats.earn)} / ${fmt(ex.reqEarn)} ${earnOk ? '✓' : '(Chưa đủ)'}</span></p>
        <p>💰 <b>Chi phí đầu tư mở khu vực:</b> <span class="${cashOk ? 'up' : 'dn'}">${fmt(S.cash)} / ${fmt(ex.cost)} ${cashOk ? '✓' : '(Chưa đủ)'}</span></p>`,
    b: [
      [`🌱 Đầu tư mở khu vực (${fmt(ex.cost)})`, () => {
        if (!earnOk) { toast(`Cần đạt tổng doanh thu nông trại <b>${fmt(ex.reqEarn)}</b> (hiện tại: ${fmt(S.stats.earn)})!`); SFX.err(); return; }
        if (!cashOk) { toast(`Cần đủ <b>${fmt(ex.cost)}</b> tiền mặt để xây dựng khu vực này!`); SFX.err(); return; }
        S.cash -= ex.cost;
        S.exp = S.exp || {}; S.exp[id] = true;
        S.expDay = S.expDay || {}; S.expDay[id] = S.day + 1;
        addXp(25); addFans(40); SFX.jingle();
        puff(ex.x + ex.w / 2, ex.y + ex.h / 2, '#a8e6cf', 20);
        toast(`🎉 Đã mở khóa <b>${ex.e} ${ex.n}</b>! Ngày mai có thể thu hoạch đợt đầu tiên!`, 4200);
        checkBadges(); renderShop(); updateHud(); save();
      }, (earnOk && cashOk) ? 'g' : ''],
      ['Để sau', null, 'o']
    ]
  });
}

function doTile(i) {
  const p = S.plots[i], x = tcx(i), y = tcy(i);
  if (p.s === 'locked') return;
  if (fertMode) {
    if ((S.fert || 0) <= 0) { fertMode = false; updateHud(); toast('Đã hết 🌿 Phân hữu cơ! Mua thêm trong Sạp nhé.'); return; }
    S.fert--; p.fert = 100; fertMode = false; updateHud();
    puff(x, y, '#86d975', 10); SFX.plant(); float(x, y - 20, 'Đất 100% màu mỡ! 🌿', '#3b9e66'); return;
  }
  if (p.crow > 0) {
    p.crow = 0; earn(5); addXp(2); puff(x, y - 10, '#63324d', 8); SFX.pop();
    float(x, y - 22, 'Đuổi quạ! +5k', '#8e5ec4'); say('Bay đi chỗ khác nha quạ ơi! 🐦‍⬛'); return;
  }
  if (p.ice) {
    if (!need(2)) return; spend(2, 6); p.ice = false; puff(x, y, '#b6e2ff', 10); SFX.till();
    act('🔥'); float(x, y - 20, 'Tan băng!', '#4888cc'); progQuest('water', 1); return;
  }
  if (p.weed) { if (!need(2)) return; spend(2, 8); p.weed = false; puff(x, y, '#7bc49e', 10); SFX.till(); act('🌿'); progQuest('water', 1); addXp(1); return; }
  if (p.s === 'crop' && p.bug) { if (!need(2)) return; spend(2, 5); p.bug = false; puff(x, y, '#a8e6cf', 6); SFX.pop(); act('🫳'); float(x, y - 20, 'Bắt sâu!', '#3b9e66'); progQuest('water', 1); addXp(2); return; }
  if (p.s === 'grass') { const c = hoeCost(); if (!need(c)) return; spend(c, 12); p.s = 'tilled'; p.fert = p.fert ?? 100; puff(x, y + 10, '#ba8870', 10); SFX.till(); act('⛏️'); addXp(1); return; }
  if (p.s === 'tilled') {
    const k = S.sel;
    if (!S.seeds[k]) { toast(`Hết hạt ${CROPS[k].e} ${CROPS[k].n}! Chọn hạt khác hoặc vào 🛒 Sạp mua.`); SFX.err(); queue = queue.filter(q => q.type !== 'tile' || S.plots[q.i].s !== 'tilled'); return; }
    if (!need(1)) return; spend(1, 5); S.seeds[k]--;
    const autoWet = S.weather === 'rain' || S.weather === 'snow';
    Object.assign(p, { s: 'crop', crop: k, g: 0, w: autoWet, dry: 0, ripe: false, rd: 0, dead: false, bug: false, ice: false, rainbow: false });
    SFX.plant(); act('🌱'); puff(x, y + 8, '#d9bc9c', 5); addXp(1); return;
  }
  if (p.s === 'crop') {
    const c = CROPS[p.crop];
    if (p.dead) { if (!need(2)) return; spend(2, 5); clearPlot(p); puff(x, y, '#9c6c56', 8); SFX.till(); act('🧹'); return; }
    if (p.ripe) {
      if (!need(1)) return; spend(1, 5);
      const e = p.rainbow ? 'rainbow' : p.crop;
      const extra = harvestPlot(p);
      float(x, y - 22, `+${1 + extra} ${itemInfo(e).e}`, '#d95b88');
      if (extra) say('Được mùa, thêm 1 nông sản! ✨');
      puff(x, y - 6, '#ffee93', 12); SFX.harvest(); act('✨'); return;
    }
    if (!p.w) {
      const cc = canCost(); if (!need(cc)) return; spend(cc, 5); p.w = true;
      for (let k = 0; k < 10; k++) parts.push({ x: x + rnd(-16, 16), y: y - 18, vx: rnd(-10, 10), vy: rnd(40, 100), life: .35, col: '#92ccf0', r: 2.2 });
      SFX.water(); act('💧'); progQuest('water', 1); addXp(1); return;
    }
    toast(`${c.e} ${c.n}: còn ${c.days - p.g} ngày nữa là chín (độ màu mỡ đất: ${p.fert ?? 100}%).`);
  }
}

function doGym() {
  if (S.gymDay === S.day) { say('Hôm nay tập rồi, nghỉ cơ mai tập tiếp! 💪'); return; }
  if (!need(12)) return;
  spend(12, 55); S.maxSt += 4; S.gymDay = S.day; ck.lift = 2.0; SFX.gym(); progQuest('gym', 1); addXp(6);
  setTimeout(() => { say('Sức tối đa +4! Khỏe khoắn quá 💪'); float(ck.x, ck.y - 90, '+4 ⚡ tối đa', '#d95b88'); checkRelics(); }, 1200);
}

function doFish() {
  const cost = S.up.rod ? 6 : 9;
  if (!need(cost)) return;
  spend(cost, 35); ck.face = -1; ck.fish = 1.5; SFX.water();
  setTimeout(() => {
    if (!S) return;
    S.today.fish = (S.today.fish || 0) + 1; S.stats.fish = (S.stats.fish || 0) + 1;
    progQuest('fish', 1); addXp(4);
    if (S.min >= 1080 && (S.weather === 'fog' || S.weather === 'snow')) unlockRelic('whale');
    if (Math.random() < (S.up.rod ? .06 : .03)) {
      S.inv.tuna = (S.inv.tuna || 0) + 1;
      addFans(25); SFX.supertuna();
      float(ck.x, ck.y - 95, '🦈 SUPER TUNA! 참치!', '#d95b88');
      say('팔딱팔딱! Câu trúng Cá Ngừ Super Tuna của Jin rồi!! 🦈💜');
      unlockRelic('tuna');
      return;
    }
    const fk = S.up.rod ? pick(['salmon', 'shrimp', 'carp', 'carp', 'star']) : pick(['carp', 'carp', 'carp', 'shrimp', 'salmon']);
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
  if (S.inv.carrot <= 0) { toast('Hết cà rốt trong kho rồi! Trồng thêm 🥕 hoặc vào 🧁 Bếp dùng món nhé.'); SFX.err(); return; }
  if (S.st >= S.maxSt) { say('Đang tràn trề năng lượng rồi!'); return; }
  const heal = 16 + ((S.fr?.rj || 1) - 1) * 3;
  S.inv.carrot--; S.st = Math.min(S.maxSt, S.st + heal); S.min += 10; ck.eat = 1.0; SFX.pop();
  float(ck.x, ck.y - 90, `+${heal} ⚡`, '#e07a5f'); say(pick(['Cà rốt Đà Lạt ngọt lịm~ 🥕', 'Nạp lại năng lượng làm vườn! ✨']));
}

/* ---------- Radio 06.13 FM, Trivia & Secret Codes (Symbolic Rewards) ---------- */
function openRadio() {
  SFX.dynamite();
  const doneToday = S.triviaDay === S.day;
  const tv = TRIVIA[(S.day - 1) % TRIVIA.length];
  let html = `<p class="c">🎶 Đang phát giai điệu Chiptune: <b>Dynamite × Jingle Bells</b> 💜</p>`;
  if (!doneToday) {
    html += `<hr style="border:0;border-top:1px dashed #f3b8ce;margin:.5em 0"><p><b>🎤 Đố vui ARMY hôm nay (Quà kỷ niệm +12k & +15💜):</b></p><p>${tv.q}</p>`;
  } else {
    html += `<p class="c">✅ Bạn đã hoàn thành câu đố hôm nay. Quay lại vào ngày mai nhé!</p>`;
  }
  const btns = [];
  if (!doneToday) {
    tv.a.forEach((ans, idx) => {
      btns.push([`💜 ${ans}`, () => {
        S.triviaDay = S.day;
        if (idx === tv.ok) {
          S.stats.trivia = (S.stats.trivia || 0) + 1;
          earn(12); addFans(15); addXp(5); SFX.win();
          toast('🎉 Chính xác! Quà khích lệ tinh thần: <b>+12k & +15💜</b>!');
          checkRelics();
        } else {
          addFans(5); SFX.err();
          toast(`Chưa đúng rồi! Đáp án là: <b>${tv.a[tv.ok]}</b> (+5💜 khích lệ).`);
        }
        save();
      }, idx === 0 ? '' : 'b']);
    });
  }
  btns.push(['🔑 Nhập Mã Bí Mật ARMY (Code)', () => askSecretCode(), 'g']);
  btns.push(['Đóng Radio', null, 'o']);
  modal({ ic: '📻💜', t: 'Đài Radio Đà Lạt · Tần Số 06.13 FM', d: html, b: btns });
}

function askSecretCode() {
  modal({
    ic: '🔑💜', t: 'Nhập Mật Mã Kỷ Niệm ARMY',
    d: `<p class="c">Nhập từ khóa quen thuộc của BTS & ARMY để nhận quà lưu niệm nhỏ xinh (VD: <i>BORAHAE, 0613, SUPERTUNA, JUNGKOOK, INTHESOOP, OT7</i>):</p>
        <input id="codeInp" class="modal-inp" type="text" maxlength="20" placeholder="Nhập mã bí mật...">`,
    b: [
      ['Kích hoạt Mã ✨', () => {
        const raw = ($('#codeInp')?.value || '').trim().toUpperCase().replace(/\s+/g, '');
        if (!raw) return;
        S.codes = S.codes || {};
        if (S.codes[raw]) { toast('Mã bí mật này bạn đã nhận quà lưu niệm rồi nhé! 💜'); return; }
        const rewards = {
          BORAHAE:   () => { earn(15); addFans(25); S.fert = (S.fert || 0) + 1; return '💜 I Purple You! Quà lưu niệm: +15k, +25💜 & +1 Phân hữu cơ!'; },
          '0613':    () => { earn(13); addFans(30); S.seeds.carrot += 2; return '🎉 Kỷ niệm 13/06! Tặng +13k, +30💜 & +2 hạt Cà rốt!'; },
          SUPERTUNA: () => { S.inv.carp = (S.inv.carp || 0) + 1; addFans(20); SFX.supertuna(); return '🦈 참치! Tặng +1 Cá chép suối & +20💜!'; },
          JUNGKOOK:  () => { S.st = S.maxSt; S.seeds.carrot += 2; return '🐰 Golden Maknae tiếp sức: Hồi đầy 100% ⚡ Sức lực & +2 hạt Cà rốt!'; },
          INTHESOOP: () => { S.fert = (S.fert || 0) + 2; addFans(15); return '🌲 Chữa lành giữa rừng thông: +2 Phân hữu cơ & +15💜!'; },
          OT7:       () => { addFans(35); earn(10); return '💜 Tình bạn 7 thành viên: +35💜 Fan & +10k!'; },
          ARMY:      () => { addFans(30); earn(10); return '💣 Cảm ơn ARMY! +30💜 Fan & +10k!'; },
        };
        if (rewards[raw]) {
          S.codes[raw] = true;
          const msg = rewards[raw]();
          SFX.jingle(); puff(ck.x, ck.y - 40, '#b392f0', 16);
          toast(msg, 4000); updateHud(); save();
        } else {
          SFX.err(); toast('Mã chưa đúng! Thử nhập: BORAHAE, 0613, SUPERTUNA, JUNGKOOK, INTHESOOP, OT7 nhé!');
        }
      }],
      ['Quay lại', null, 'o']
    ]
  });
}

/* ---------- PWA Install & Screen Zoom / Fit Modes ---------- */
function applyViewMode(m) {
  viewMode = m % 3;
  const fr = $('#frame');
  fr.classList.toggle('fill-mode', viewMode === 1 || viewMode === 2);
  fr.classList.toggle('zoom-mode', viewMode === 2);
  resize();
  const names = ['🖼️ Khung chuẩn (3:2)', '🖥️ Tràn viền 100% màn hình', '🔎 Phóng to cận cảnh Ruộng (1.24x)'];
  toast(`Chế độ hiển thị: <b>${names[viewMode]}</b> (Bấm 🔍 hoặc phím Z để đổi)`);
}

function openInstallZoomModal() {
  const btns = [
    ['🖥️ Chế độ Tràn Viền 100% Cửa Sổ (Rõ nét hơn)', () => applyViewMode(1)],
    ['🔎 Chế độ Phóng To Cận Cảnh 1.24x (Dễ bấm trên điện thoại)', () => applyViewMode(2)],
    ['🖼️ Chế độ Khung Chuẩn 3:2', () => applyViewMode(0), 'b'],
    ['⛶ Bật / Tắt Toàn Màn Hình (Fullscreen)', () => toggleFullscreen(), 'b'],
  ];
  if (deferredPrompt) {
    btns.unshift(['📲 Cài đặt App Cooky Farm ra Màn Hình Chính ngay!', async () => {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      deferredPrompt = null;
    }, 'g']);
  }
  btns.push(['Đóng', null, 'o']);
  modal({
    ic: '📲🖥️',
    t: 'Thêm vào Màn Hình Chính & Phóng To Giao Diện',
    d: `<p>Để quan sát nông trại to, rõ ràng nhất trên điện thoại và máy tính:</p>
        <p>1️⃣ <b>Trên Điện thoại (iPhone / Android):</b> Bấm nút <b>Chia sẻ (Share)</b> hoặc menu <b>⋮</b> → Chọn <b>"Thêm vào Màn hình chính" (Add to Home Screen)</b> và xoay ngang màn hình.</p>
        <p>2️⃣ <b>Trên Máy tính (Edge / Chrome):</b> Bấm biểu tượng <b>📲 Cài đặt Cooky Farm</b> trên thanh địa chỉ để mở cửa sổ riêng biệt.</p>
        <p>3️⃣ <b>Đổi nhanh góc nhìn:</b> Chọn <b>Tràn viền 100%</b> hoặc <b>Phóng to cận cảnh 1.24x</b> ngay bên dưới!</p>`,
    b: btns
  });
}

function toggleFullscreen() {
  const el = document.documentElement;
  if (!document.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen || (() => {})).call(el);
  else if (document.exitFullscreen) document.exitFullscreen();
}

function enqueue(j) {
  if (j.type === 'tile' && ((cur && cur.type === 'tile' && cur.i === j.i) || queue.some(q => q.type === 'tile' && q.i === j.i))) return;
  if (j.type === 'walk') queue = [];
  if (queue.length >= 16) { toast('Đang xếp nhiều việc quá, đợi một chút nhé!'); return; }
  queue.push(j); SFX.click();
}

function buyPlot(i) {
  const c = plotCost();
  modal({ ic: '🌱', t: 'Khai hoang ô đất mới?', d: `<p class="c">Mở rộng thêm 1 ô đất canh tác với chi phí <b>${fmt(c)}</b>.<br><small>(Mở thêm đất sẽ tăng nhẹ chi phí bảo trì nông trại mỗi tuần)</small></p>`, b: [
    [`Khai hoang (${fmt(c)})`, () => {
      if (S.cash < c) { toast('Chưa đủ tiền rồi! Hãy trồng và bán thêm nông sản nhé 💸'); SFX.err(); return; }
      S.cash -= c; S.bought++; S.plots[i].s = 'grass'; S.plots[i].fert = 100; puff(tcx(i), tcy(i), '#ffee93', 14); SFX.coin(); checkRelics(); checkBadges(); save();
    }],
    ['Để sau', null, 'o']] });
}

function askRename() {
  modal({
    ic: '🏷️', t: 'Đổi tên nhân vật & Mật mã ARMY',
    d: `<p class="c">Nhập tên mới cho chú thỏ của bạn:</p><input id="modalNameInp" class="modal-inp" type="text" maxlength="16" value="${S.name}">`,
    b: [
      ['Lưu tên mới ✨', () => {
        const el = $('#modalNameInp');
        if (el && el.value.trim()) { S.name = el.value.trim().slice(0, 16); updateHud(); save(); toast(`Đã đổi tên thành <b>${S.name}</b>! 🌸`); }
      }],
      ['🔑 Nhập Mã Bí Mật ARMY', () => askSecretCode(), 'b'],
      ['Huỷ', null, 'o']
    ]
  });
}

function askSleep() {
  const early = S.min < 1080;
  modal({ ic: '🛏️', t: 'Về nhà nghỉ ngơi?', d: `<p class="c">Kết thúc <b>ngày ${S.day}</b>${early ? ' sớm' : ''}. Cây đã tưới (không đóng băng) sẽ lớn qua đêm!</p>`, b: [['Ngủ ngon 😴', () => endDay(false)], ['Làm tiếp', null, 'o']] });
}
function passOut() {
  queue = []; cur = null;
  modal({ ic: '😵', t: `${S.name} ngủ gục ngoài sương lạnh!`, d: '<p class="c">Đã quá 0 giờ đêm… Sáng mai thức dậy chỉ còn <b>50% sức lực</b> và tốn 20k tiền thuốc cảm.</p>', b: [['Ôi thương quá… 🥲', () => { S.cash = Math.max(0, S.cash - 20); endDay(true); }]] });
}

/* ---------- Day Cycle & Challenges ---------- */
function rollWx() {
  const r = Math.random();
  const frostRate = S?.diff === 'hard' ? .25 : S?.diff === 'chill' ? .08 : .17;
  if (r < frostRate) return 'frost';
  if (r < frostRate + .25) return 'snow';
  if (r < frostRate + .62) return 'sun';
  if (r < frostRate + .82) return 'rain';
  return 'fog';
}

function endDay(passed) {
  queue = []; cur = null; fertMode = false;
  const L = [], d = S.day;
  L.push(`<p>💰 Doanh thu hôm nay: <b>${fmt(S.today.earn)}</b> · Thu hoạch: <b>${S.today.harv}</b> · Câu cá: <b>${S.today.fish || 0}</b></p>`);

  if (S.up.koya) {
    if (S.cash >= 25) {
      S.cash -= 25;
      if (Math.random() < .75) {
        let n = 0; S.plots.forEach(p => { if (p.s === 'crop' && p.ripe && !p.dead && !p.ice) { harvestPlot(p); n++; } });
        L.push(n ? `<p>🐨 Koya hái giúp <b>${n}</b> ô chín (phí 25k).</p>` : '<p>🐨 Koya đi tuần quanh vườn canh sương đêm.</p>');
      } else L.push('<p>🐨 Koya ôm gối ngủ quên mất tiêu… (vẫn tốn 25k 💤)</p>');
    } else { S.up.koya = false; L.push('<p>🐨 Chưa đủ 25k trả lương, Koya tạm nghỉ.</p>'); }
  }

  // Thú cưng chỉ tặng lợi tức vừa phải khi được cho ăn trong ngày
  let pCash = 0, pFan = 0, unfed = 0;
  PETS.forEach(p => {
    if (!S.pets[p.id]) return;
    if (S.petFed[p.id] === d) {
      if (p.id === 'chick') pCash += 18;
      if (p.id === 'sheep') { pCash += 32; pFan += 6; }
      if (p.id === 'cat') pFan += 10;
      if (p.id === 'deer') { pCash += 45; const sk = pick(['carrot', 'cabbage', 'sweet', 'tomato']); S.seeds[sk]++; L.push(`<p>🦌 Tuần lộc Mũi Hồng tặng 1 hạt ${CROPS[sk].e} ${CROPS[sk].n}!</p>`); }
    } else unfed++;
  });
  if (unfed > 0) L.push(`<p>🥣 Có <b>${unfed} thú cưng</b> chưa được cho ăn nên không tạo sản phẩm sáng mai.</p>`);
  if (S.miles.train) pFan += 20;
  if (pCash || pFan) {
    earn(pCash); addFans(pFan);
    L.push(`<p>🐣✨ Thu hoạch phụ từ Thú cưng & Du khách: <b>+${fmt(pCash)}</b> & <b>+${pFan}💜</b></p>`);
  }

  // Kiểm tra hạn chót Đơn Hàng Chuyến Xe (mỗi 5 ngày)
  if (S.order && d >= S.order.due) {
    if (!S.order.done && S.diff !== 'chill') {
      const pen = S.diff === 'hard' ? 140 : 85;
      S.cash = Math.max(0, S.cash - pen);
      addFans(-50);
      L.push(`<p style="color:#d9385a">📦 <b>Trễ Đơn Hàng Tuần (${S.order.n})</b>: Phạt đền hợp đồng <b>-${fmt(pen)}</b> & <b>-50💜</b>!</p>`);
    } else if (S.order.done) {
      L.push(`<p style="color:#2e9d5b">📦 Đã hoàn thành xuất sắc Đơn hàng tuần!</p>`);
    }
  }

  // Kiểm tra Hóa đơn Thuế & Điện sưởi mỗi 7 ngày
  if (d % 7 === 0) {
    const bill = weeklyBill();
    if (S.cash >= bill) {
      S.cash -= bill;
      L.push(`<p>🧾 Đã thanh toán Thuế đất & Điện sưởi tuần: <b>-${fmt(bill)}</b>.</p>`);
    } else {
      const rem = S.cash; S.cash = 0; addFans(-80);
      L.push(`<p style="color:#d9385a">🧾 Thiếu tiền đóng Thuế tuần (${fmt(bill)}): Thu hết ${fmt(rem)} và trừ <b>-80💜 uy tín</b>!</p>`);
    }
  }

  let grown = 0, died = 0, rot = 0;
  const rChance = .015 + ((S.fr?.tata || 1) - 1) * .015;
  const maxRotDays = S.miles?.barn ? 5 : 3;
  S.plots.forEach(p => {
    p.crow = 0;
    if (p.s !== 'crop' || p.dead) return;
    const c = CROPS[p.crop];
    if (p.ice) {
      p.dry++; if (p.dry >= 2) { p.dead = true; died++; }
    } else if (p.ripe) {
      p.rd++; if (p.rd >= maxRotDays) { p.dead = true; rot++; }
    } else if (p.w && !p.weed && !p.bug) {
      if ((p.fert ?? 100) < 55 && Math.random() < .45) {
        // đất bạc màu làm chậm lớn 1 đêm
      } else {
        p.g++; p.dry = 0;
        if (p.g >= c.days) { p.ripe = true; p.rd = 0; grown++; if (Math.random() < rChance) p.rainbow = true; }
      }
    } else if (!p.w) {
      p.dry++; if (p.dry >= 2) { p.dead = true; died++; }
    }
    p.w = false;
  });
  if (grown) L.push(`<p>🌾 <b>${grown}</b> ô cây đã chín rộ!</p>`);
  if (died) L.push(`<p>🥀 ${died} ô bị héo vì khô hạn hoặc đóng băng.</p>`);
  if (rot) L.push(`<p>🍂 ${rot} ô chín để quá lâu bị hỏng.</p>`);

  S.day++;
  if (S.order && d >= S.order.due) makeOrder(S);
  if (!S.endless && S.day > DAYS && !S.miles.concert) {
    save(); return finalEnding();
  }
  if (S.day > DAYS && S.miles.concert && !S.endless) S.endless = true;

  S.weather = S.tmr; S.tmr = rollWx();
  CK.forEach(k => {
    const fertPenalty = S.plots.some(p => p.s === 'crop' && p.crop === k && (p.fert ?? 100) < 60) ? 0.85 : 1;
    S.prev[k] = S.price[k];
    S.price[k] = clamp(+((S.price[k] + rnd(-.18, .18) + (1 - S.price[k]) * .25) * fertPenalty).toFixed(2), .65, 1.55);
  });
  S.st = Math.round(S.maxSt * (passed ? .5 : 1)); S.min = 360;
  S.today = { earn: 0, harv: 0, fish: 0, cook: 0 };
  rollQuests(S);
  ck.x = ZONES.house.pos.x; ck.y = ZONES.house.pos.y; ck.face = 1;

  const M = [];
  if (S.weather === 'snow') { waterAll(); M.push('❄️ Tuyết rơi – cả cánh đồng được tưới mát & giá bán +8%!'); }
  else if (S.weather === 'rain') { waterAll(); M.push('🌧️ Mưa phùn Đà Lạt – cả ruộng đã được tưới.'); }
  else if (S.up.sprk) { waterAll(); M.push('💦 Hệ thống tưới tự động đã tưới đẫm cả ruộng.'); }

  if (S.weather === 'frost' && !S.up.green) {
    let iceN = 0;
    const freezeRate = S.up.heater ? .22 : .45;
    S.plots.forEach(p => { if (p.s === 'crop' && !p.dead && Math.random() < freezeRate) { p.ice = true; iceN++; } });
    if (iceN) M.push(`🥶 <b>Sương muối Đà Lạt</b> làm đóng băng <b>${iceN} ô cây</b>! Chạm vào ô băng để phá băng ngay nhé!`);
  } else if (S.weather === 'frost' && S.up.green) {
    M.push('🏡 Nhà Kính Pha Lê đã bảo vệ toàn bộ ruộng khỏi Sương muối!');
  }

  let w = 0, b = 0;
  const weedRate = Math.max(.015, .07 - ((S.fr?.koya || 1) - 1) * .01);
  const catFed = S.pets.cat && S.petFed.cat === d;
  S.plots.forEach(p => {
    if (p.s === 'locked') return;
    if (!p.weed && Math.random() < weedRate) { p.weed = true; w++; }
    if (!catFed && p.s === 'crop' && !p.ripe && !p.dead && !p.bug && Math.random() < (S.up.green ? .025 : .07)) { p.bug = true; b++; }
  });
  if (catFed) M.push('🐱 Mèo Tuyết Lil Meow đã được ăn no nên bắt sạch sâu bọ!');
  if (w) M.push(`🌿 ${w} bụi cỏ dại mọc lên.`);
  if (b) M.push(`🐛 ${b} ô bị sâu – chạm vào bắt ngay nhé!`);

  const cm = curMile();
  modal({
    ic: '🌙', t: `Khép lại Ngày ${d}`,
    d: L.join('') + `<hr style="border:0;border-top:1px dashed #f3b8ce;margin:.5em 0"><p><b>☀️ Ngày ${S.day}</b> · ${WX[S.weather].e} ${WX[S.weather].n} · mai ${WX[S.tmr].e}</p>` + M.map(m => `<p>${m}</p>`).join('') + `<p>🎯 Cột mốc tiếp theo: <b>${cm.e} ${cm.n}</b> (${fmt(Math.min(S.cash, cm.cost))}/${fmt(cm.cost)} · ⭐ ${S.stars || 0}/${cm.stars})</p>`,
    b: [['Bắt đầu ngày mới 🌱', () => { maybeEvent(); save(); }]]
  });
}

function finalEnding() {
  if ((S.cash >= 2200 && (S.stars || 0) >= 3) || S.miles.concert) return unlockMilestone('concert');
  modal({
    ic: '🎄💜', t: 'Đêm Giáng Sinh Đà Lạt',
    d: `<p>Đã khép lại 30 ngày đầu tiên trên nông trại. Bạn có muốn <b>Chơi tiếp không giới hạn ngày</b> để mở khóa toàn bộ <b>4 Khu vực mở rộng</b> và <b>6 Cột mốc lớn</b> không?</p>`,
    b: [['🌱 Chơi tiếp Chế độ Vĩnh Cửu!', () => { S.endless = true; save(); }], ['🔄 Chơi lại từ đầu', () => startNew(S.name, S.diff), 'o']]
  });
}

function unlockMilestone(id) {
  const m = MILES.find(x => x.id === id);
  if (!m || S.miles[id]) return;
  if (S.cash < m.cost || (S.stars || 0) < m.stars) {
    toast(`Cần đủ <b>${fmt(m.cost)}</b> và <b>${m.stars}⭐ Sao Tím</b> (từ Đơn hàng tuần) để mở khóa ${m.n}!`);
    SFX.err(); return;
  }
  S.cash -= m.cost; S.miles[id] = true;
  if (id === 'concert') S.endless = true;
  if (id === 'villa') { S.maxSt += 35; S.st = S.maxSt; }
  addXp(30); SFX.jingle(); checkBadges(); save(); updateHud();
  modal({
    ic: m.e + '🎉', t: `Chúc mừng đạt ${m.n}!`,
    d: `<p>${m.d}</p><p>🌾 Hãy tiếp tục phát triển nông trại, mở rộng 4 Khu vực bản đồ và chinh phục các Cột mốc tiếp theo nhé!</p>`,
    b: [['Tuyệt vời quá! 💜', () => { renderShop(); save(); }]]
  });
}

/* ---------- Events (Balanced around Farming) ---------- */
const EVS = [
  { id: 'santa_rj', w: 3, c: () => true, f: () => ({ ic: '🎅', t: 'RJ mang giỏ bánh nóng ghé thăm!', d: `RJ quàng khăn đỏ mang theo bánh nướng ấm áp tới thăm <b>${S.name}</b> giữa sương sớm Đà Lạt!`, b: [
    ['Thưởng thức bánh (+25⚡ & +1 Phân)', () => { S.st = Math.min(S.maxSt, S.st + 25); S.fert = (S.fert || 0) + 1; SFX.jingle(); return '+25⚡ Sức lực & +1 🌿 Phân hữu cơ!'; }],
    ['Cùng RJ chia sẻ bánh (+35💜)', () => { addFans(35); S.fr.rj = Math.min(5, (S.fr.rj || 1) + 1); return '+35💜 & tăng cấp thân thiết với RJ!'; }, 'b']] }) },
  { id: 'chimmy', w: 3, c: () => invCount() > 0, f: () => ({ ic: '💛', t: 'Chimmy thu mua nông sản tươi', d: `Chimmy mặc áo hoodie vàng vẫy tay: “${S.name} ơi, để lại cho tớ vài món nông sản với giá +40% để làm quà nhé!”`, b: [
    ['Bán 3 món giá +40% 💰', () => { let v = 0, n = 0; for (let i = 0; i < 3; i++) { const k = randInv(); if (!k) break; v += sell(k, 1, 1.4); n++; } SFX.coin(); return `Thu về ${fmt(v)} cho ${n} nông sản!`; }],
    ['Tặng Chimmy 2 món 💜', () => { for (let i = 0; i < 2; i++) { const k = randInv(); if (k) S.inv[k]--; } addFans(40); S.fr.chimmy = Math.min(5, (S.fr.chimmy || 1) + 1); return '+40💜 & tăng cấp thân thiết Chimmy!'; }, 'b']] }) },
  { id: 'shooky', w: 2.5, c: () => ripes().length > 0, f: () => S.up.scare ? { ic: '🍪', t: 'Shooky nể Người Tuyết!', d: 'Shooky định lăn qua luống rau nhưng thấy Người Tuyết Canh Vườn nên đứng cười toe toét chụp ảnh rồi về! 😆', b: [['Dễ thương ghê (+20💜)', () => { addFans(20); return '+20💜 từ bức ảnh của Shooky!'; }]] } :
    { ic: '🍪', t: 'Shooky lăn cầu tuyết qua ruộng!', d: 'Shooky tinh nghịch dẫn đội bánh quy lăn cầu tuyết qua luống cây chín!', b: [
      ['Chơi cùng Shooky (-8⚡)', () => { S.st = Math.max(0, S.st - 8); S.seeds.carrot += 2; return 'Shooky tặng lại 2 hạt 🥕 Cà rốt!'; }],
      ['Nhắc Shooky cẩn thận', () => `Hỏng mất ${stealRipe(1)} ô chín. (Sắm Người Tuyết ở mục Nâng cấp nhé!)`, 'o']] } },
  { id: 'tata', w: 2.5, c: () => growing().length > 0, f: () => ({ ic: '❤️', t: 'Tia nắng ấm của Tata', d: `Tata ghé thăm và chiếu tia sáng ấm áp giúp cánh đồng của <b>${S.name}</b> vượt qua sương lạnh!`, b: [
    ['Giúp cây lớn thêm 1 ngày 🌱', () => { growing().forEach(p => { if (!p.weed && !p.bug && !p.ice) { p.g++; if (p.g >= CROPS[p.crop].days) { p.ripe = true; p.rd = 0; } } }); return 'Các ô cây đang trồng lớn thêm 1 ngày!'; }],
    ['Bồi bổ đất đai (+2 Phân bón)', () => { S.fert = (S.fert || 0) + 2; return 'Nhận thêm +2 🌿 Phân hữu cơ!'; }, 'b']] }) },
  { id: 'market', w: 3, c: () => true, f: () => { const k = pick(CK.filter(x => canUseSeed(x))), c = CROPS[k], up = Math.random() < .52; return up ?
    { ic: '📈', t: `Chợ Đà Lạt hút hàng ${c.n}!`, d: `Thương lái đang tìm mua ${c.e} ${c.n} số lượng lớn. Giá thu mua hôm nay tăng cao!`, b: [['Tốt quá!', () => { S.price[k] = 1.45; return `${c.e} ${c.n} hôm nay tăng giá x1.45!`; }]] } :
    { ic: '📉', t: `${c.n} dội chợ mùa đông`, d: `Nguồn cung ${c.e} ${c.n} đang nhiều, giá bán thô giảm nhẹ. Bạn có thể trữ trong kho hoặc đưa vào 🧁 Bếp chế biến nhé!`, b: [['Đã rõ!', () => { S.price[k] = .7; return `${c.e} giá bán thô hôm nay x0.70.`; }]] }; } },
];

function maybeEvent() {
  if (Math.random() > .45) return;
  const pool = EVS.filter(e => e.id !== S.lastEv && e.c());
  if (!pool.length) return;
  let r = Math.random() * pool.reduce((a, e) => a + e.w, 0), ev = pool[0];
  for (const e of pool) { r -= e.w; if (r <= 0) { ev = e; break; } }
  S.lastEv = ev.id; S.stats.ev++;
  const o = ev.f(); SFX.ev();
  modal({ ic: o.ic, t: o.t, d: `<p>${o.d}</p>`, b: o.b.map(([label, fn, cls]) => [label, () => { const m = fn ? fn() : null; if (m) toast(m, 3600); save(); }, cls]) });
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

/* ---------- Multi-Tab Hub ---------- */
function openShop(tab) {
  if (tab) shopTab = tab;
  shopOpen = true; $('#shop').hidden = false;
  $('#shopTitle').textContent = `🏡 Sạp của ${S.name}`;
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
    const keys = [...CK, 'rainbow', ...SK, ...FK, ...RECIPES.map(r => r.id)].filter(k => CK.includes(k) || S.inv[k] > 0);
    keys.forEach(k => {
      const it = itemInfo(k), n = S.inv[k] || 0;
      h += `<div class="li"><span class="e">${it.e}</span><div class="nm"><b>${it.n}</b><small>Trong kho: ${n}</small></div><div class="pr"><b>${fmt(priceOf(k))}</b>${trend(k)}</div>
        <button class="btn o" data-a="s1" data-k="${k}" ${n ? '' : 'disabled'}>Bán 1</button><button class="btn g" data-a="sa" data-k="${k}" ${n ? '' : 'disabled'}>Bán hết</button></div>`;
    });
    const tot = allSellKeys().reduce((a, k) => a + priceOf(k) * S.inv[k], 0), bn = Math.round((bonus() - 1) * 100);
    f = `<span class="note">Hệ số giá hiện tại: <b>${bn >= 0 ? '+' + bn : bn}%</b> · Kinh nghiệm cấp Lv.${S.lv}: <b>${S.xp}/${xpNeed(S.lv)} XP</b></span>
      <button class="btn g" data-a="sell-all" ${tot ? '' : 'disabled'}>Bán tất cả (${fmt(tot)})</button>
      <button class="btn b" data-a="live" ${S.liveDay === S.day || !tot ? 'disabled' : ''}>📱 Livestream +20%</button>`;
  } else if (shopTab === 'seed') {
    h += `<div class="li"><span class="e">🌿</span><div class="nm"><b>Phân hữu cơ Đà Lạt <small>(có ${S.fert || 0})</small></b><small>Bón vào ô đất bạc màu để khôi phục 100% độ màu mỡ</small></div>
      <button class="btn g" data-a="buy-fert" data-k="1" ${S.cash >= 14 ? '' : 'disabled'}>+1 (14k)</button>
      <button class="btn b" data-a="buy-fert" data-k="5" ${S.cash >= 62 ? '' : 'disabled'}>+5 (62k)</button></div>`;
    CK.forEach(k => {
      const c = CROPS[k], unlocked = canUseSeed(k);
      let reqTxt = '';
      if (!unlocked) {
        const partsReq = [];
        if ((S.lv || 1) < (c.reqLv || 1)) partsReq.push(`Cần Lv.${c.reqLv}`);
        if (c.reqZone && !(S.exp && S.exp[c.reqZone])) partsReq.push('Cần mở Đồi Hoa');
        reqTxt = `<span class="lk-tag">🔒 ${partsReq.join(' & ')}</span>`;
      }
      h += `<div class="li"><span class="e">${c.e}</span><div class="nm"><b>${c.n} <small>(có ${S.seeds[k]})</small></b><small>Hạt ${fmt(c.seed)} · ${c.days} ngày · bán ~${fmt(priceOf(k))} · +${c.xp}XP${c.regrow ? ` · hái lặp ${c.regrow}N` : ''}</small></div>
        ${!unlocked ? reqTxt : `<button class="btn o" data-a="b1" data-k="${k}" ${S.cash >= c.seed ? '' : 'disabled'}>+1</button><button class="btn" data-a="b5" data-k="${k}" ${S.cash >= c.seed * 5 ? '' : 'disabled'}>+5</button><button class="btn b" data-a="b10" data-k="${k}" ${S.cash >= c.seed * 10 ? '' : 'disabled'}>+10</button>`}</div>`;
    });
    f = `<span class="note">🌾 Lên cấp Nông trại (thu hoạch nhiều vụ) và mở Khu Đồi Hoa để mở khóa hạt giống cao cấp!</span>`;
  } else if (shopTab === 'cook') {
    RECIPES.forEach(r => {
      const reqStr = Object.entries(r.req).map(([k, q]) => `${q} ${itemInfo(k).e} (có ${S.inv[k] || 0})`).join(' + ');
      const canMake = Object.entries(r.req).every(([k, q]) => (S.inv[k] || 0) >= q);
      const have = S.inv[r.id] || 0;
      h += `<div class="li"><span class="e">${r.e}</span><div class="nm"><b>${r.n} <small>(kho: ${have})</small></b><small>Cần: ${reqStr} · Bán ~${fmt(priceOf(r.id))}</small><small>${r.d}</small></div>
        <button class="btn" data-a="cook" data-k="${r.id}" ${canMake ? '' : 'disabled'}>Chế biến</button>
        <button class="btn g" data-a="eat-dish" data-k="${r.id}" ${have ? '' : 'disabled'}>Dùng (+${r.st}⚡)</button></div>`;
    });
    f = `<span class="note">🧁 Chế biến nông sản thành món ăn giúp tăng giá trị bán ra và hồi nhiều ⚡ Sức lực!</span>`;
  } else if (shopTab === 'pet') {
    h += `<div class="subhead"><span>💜 Hội Bạn Thân BT21 (Chuẩn Tạo Hình)</span><span>Tặng quà (65k) kết thân</span></div>`;
    FRIENDS.forEach(fr => {
      const lv = S.fr[fr.id] || 1, gifted = S.frGiftDay[fr.id] === S.day;
      h += `<div class="li"><div class="bt21-av">${bt21Svg(fr.id)}</div><div class="nm"><b>${fr.n} · Cấp ${lv}/5</b><small>${fr.role}</small><small style="color:#7b4bb3;font-weight:700">${fr.buff}</small></div>
        ${lv >= 5 ? '<span class="own">♥ Thân thiết tối đa</span>' : `<button class="btn b" data-a="gift" data-k="${fr.id}" ${gifted || S.cash < 65 ? 'disabled' : ''}>${gifted ? 'Đã tặng hôm nay' : '🎁 Tặng quà (65k)'}</button>`}</div>`;
    });
    h += `<div class="subhead"><span>🐣 Thú Cưng Nông Trại (Cho ăn mỗi ngày)</span><span>Thức ăn: 1 🥕 hoặc 12k</span></div>`;
    PETS.forEach(p => {
      const own = S.pets[p.id], fed = S.petFed[p.id] === S.day;
      h += `<div class="li"><span class="e">${p.e}</span><div class="nm"><b>${p.n}</b><small>${p.d}</small></div>
        ${!own ? `<button class="btn" data-a="pet" data-k="${p.id}" ${S.cash >= p.cost ? '' : 'disabled'}>Nhận nuôi (${fmt(p.cost)})</button>` :
          fed ? '<span class="own">💜 Đã no bụng</span>' : `<button class="btn g" data-a="feed-pet" data-k="${p.id}" ${(S.inv.carrot > 0 || S.cash >= 12) ? '' : 'disabled'}>🥣 Cho ăn (${S.inv.carrot > 0 ? '1🥕' : '12k'})</button>`}</div>`;
    });
    f = `<span class="note">💜 Khi thành viên BT21 đạt Cấp 2 trở lên, họ sẽ thường xuyên xuất hiện dạo chơi ngay trên bản đồ nông trại!</span>`;
  } else if (shopTab === 'up') {
    UPS.forEach(u => {
      const own = S.up[u.id];
      h += `<div class="li"><span class="e">${u.e}</span><div class="nm"><b>${u.n}</b><small>${u.d}</small></div>
        ${own ? '<span class="own">✓ Đã sắm</span>' : `<button class="btn" data-a="up" data-k="${u.id}" ${S.cash >= u.cost ? '' : 'disabled'}>${fmt(u.cost)}</button>`}</div>`;
    });
    f = `<span class="note">🔥 Sắm <b>Lò Sưởi</b> hoặc <b>Nhà Kính</b> để bảo vệ cây trước thời tiết 🥶 Sương muối!</span>`;
  } else if (shopTab === 'goal') {
    if (S.order) {
      const o = S.order;
      const reqStr = Object.entries(o.req).map(([k, q]) => `${itemInfo(k).e} ${itemInfo(k).n}: <b>${S.inv[k] || 0}/${q}</b>`).join(' · ');
      h += `<div class="subhead"><span>📦 Đơn Hàng Chuyến Xe (Hạn: Ngày ${o.due})</span><span>Thưởng +1⭐ Sao Tím</span></div>`;
      h += `<div class="li"><span class="e">🚚</span><div class="nm"><b>${o.n}</b><small>Yêu cầu: ${reqStr}</small><small>Thưởng: <b>+${fmt(o.cash)}, +${o.fan}💜 & +1⭐ Sao Tím</b> (Trễ hạn bị phạt!)</small></div>
        ${o.done ? '<span class="own">✓ Đã giao</span>' : `<button class="btn g" data-a="deliver" ${canDeliverOrder() ? '' : 'disabled'}>Giao đơn</button>`}</div>`;
    }

    h += `<div class="subhead"><span>🗺️ Mở Rộng 4 Khu Vực Mới (Tổng DT: ${fmt(S.stats.earn)})</span><span>Mở khi đạt mốc doanh thu</span></div>`;
    EXPANSIONS.forEach(ex => {
      const own = S.exp && S.exp[ex.id];
      const ok = S.stats.earn >= ex.reqEarn && S.cash >= ex.cost;
      const nextD = S.expDay?.[ex.id] || 1;
      h += `<div class="li"><span class="e">${ex.e}</span><div class="nm"><b>${ex.n}</b><small>${ex.d}</small></div>
        ${own ? (S.day >= nextD ? `<button class="btn g" data-a="harv-exp" data-k="${ex.id}">🧺 Thu hoạch</button>` : `<span class="own">Còn ${nextD - S.day} ngày</span>`) :
          `<button class="btn ${ok ? 'g' : 'b'}" data-a="unlock-exp" data-k="${ex.id}">${fmt(ex.cost)} (DT ${fmt(ex.reqEarn)})</button>`}</div>`;
    });

    h += `<div class="subhead"><span>🏆 6 Cột Mốc Phát Triển (Đang có: ⭐ ${S.stars || 0} Sao Tím)</span><span>Chinh phục dài hạn</span></div>`;
    MILES.forEach(m => {
      const own = S.miles[m.id], ok = S.cash >= m.cost && (S.stars || 0) >= m.stars;
      h += `<div class="li"><span class="e">${m.e}</span><div class="nm"><b>${m.n}</b><small>${m.d}</small></div>
        ${own ? '<span class="own">✓ Đã đạt</span>' : `<button class="btn g" data-a="mile" data-k="${m.id}" ${ok ? '' : 'disabled'}>${fmt(m.cost)} + ${m.stars}⭐</button>`}</div>`;
    });

    h += `<div class="subhead"><span>📋 3 Nhiệm Vụ Hàng Ngày (Ngày ${S.day})</span><span>Làm mới mỗi sáng</span></div>`;
    S.quests.forEach(q => {
      h += `<div class="li"><span class="e">${q.e}</span><div class="nm"><b>${q.n} (${q.cur}/${q.goal})</b><small>Thưởng: +${fmt(q.rCash)} & +${q.rFan}💜</small></div>
        ${q.done ? '<span class="own">✓ Hoàn thành</span>' : `<span class="sm">${Math.round(q.cur / q.goal * 100)}%</span>`}</div>`;
    });
    f = `<span class="note">🧾 Chi phí bảo trì & điện sưởi tuần tiếp theo (Ngày ${Math.ceil(S.day / 7) * 7}): <b>${fmt(weeklyBill())}</b>.</span>`;
  } else if (shopTab === 'army') {
    const rCount = Object.keys(S.relics || {}).length;
    h += `<div class="subhead"><span>💎 10 Kỷ Vật Bí Mật ARMY (${rCount}/10)</span><span>Mỗi kỷ vật: +1% giá & +3⚡</span></div><div class="badge-grid">`;
    RELICS.forEach(r => {
      const ok = S.relics[r.id];
      h += `<div class="badge-card ${ok ? '' : 'locked'}"><span class="be">${r.e}</span><div><b>${r.n}</b><br><small>${r.d}</small></div></div>`;
    });
    h += `</div>`;
    h += `<div class="subhead"><span>🏅 12 Huy Hiệu Thành Tựu (${Object.keys(S.badges).length}/12)</span><span>Thưởng mốc khám phá</span></div><div class="badge-grid">`;
    BADGES.forEach(b => {
      const ok = S.badges[b.id];
      h += `<div class="badge-card ${ok ? '' : 'locked'}"><span class="be">${b.e}</span><div><b>${b.n}</b><br><small>${b.d} (+${fmt(b.reward)})</small></div></div>`;
    });
    h += `</div>`;
    f = `<button class="btn b" data-a="open-radio">📻 Mở Đài Radio 06.13 FM</button>
         <button class="btn g" data-a="open-code">🔑 Nhập Mã Kỷ Niệm ARMY</button>`;
  }
  B.innerHTML = h; F.innerHTML = f;
}

function shopAction(a, k) {
  if (a === 's1' || a === 'sa') {
    const v = sell(k, a === 's1' ? 1 : S.inv[k]);
    if (v) { SFX.coin(); float(ck.x, ck.y - 90, '+' + fmt(v), '#3b9e66'); }
  } else if (a === 'sell-all') {
    let v = 0; allSellKeys().forEach(x => { if (x !== 'carrot' || S.inv.carrot > 2) v += sell(x, S.inv[x]); });
    if (v) { SFX.coin(); float(ck.x, ck.y - 90, '+' + fmt(v), '#3b9e66'); toast(`Bán nông sản thu về <b>+${fmt(v)}</b> 💰`); }
  } else if (a === 'live') {
    if (S.st < 12) { toast('Cần ít nhất 12⚡ để Livestream!'); SFX.err(); return; }
    const n = invCount(); S.st -= 12; S.min += 75; S.liveDay = S.day;
    let v = 0; allSellKeys().forEach(x => v += sell(x, S.inv[x], 1.2));
    const mangMul = 1 + ((S.fr?.mang || 1) - 1) * .1;
    let f = Math.round((ri(18, 38) + n * 4) * mangMul);
    let m = `📱 Livestream thành công! Thu <b>${fmt(v)}</b> · <b>+${f}💜</b>`;
    if (Math.random() < .18) { f += 90; S.viral = S.day + 1; m = `🔥 LÊN XU HƯỚNG! Thu <b>${fmt(v)}</b>, <b>+${f}💜</b>, ngày mai giá bán +15%!`; }
    addFans(f); addXp(8); SFX.win(); toast(m, 3800);
  } else if (a === 'buy-fert') {
    const n = +k, cost = n === 1 ? 14 : 62;
    if (S.cash < cost) return;
    S.cash -= cost; S.fert = (S.fert || 0) + n; SFX.coin();
    toast(`Đã mua +${n} 🌿 Phân hữu cơ! Bấm nút 🌿 dưới thanh công cụ rồi chạm ô đất để bón.`);
  } else if (a[0] === 'b') {
    if (!canUseSeed(k)) return;
    const n = +a.slice(1), c = CROPS[k].seed * n;
    if (S.cash < c) return; S.cash -= c; S.seeds[k] += n; S.sel = k; SFX.coin();
  } else if (a === 'cook') {
    const r = RECIPES.find(x => x.id === k);
    if (!r || !Object.entries(r.req).every(([ik, q]) => (S.inv[ik] || 0) >= q)) return;
    Object.entries(r.req).forEach(([ik, q]) => S.inv[ik] -= q);
    S.inv[r.id] = (S.inv[r.id] || 0) + 1;
    S.today.cook = (S.today.cook || 0) + 1; S.stats.cook = (S.stats.cook || 0) + 1;
    addFans(r.fans); progQuest('cook', 1); addXp(6); SFX.win();
    toast(`🧁 Đã chế biến <b>${r.e} ${r.n}</b> (+${r.fans}💜)!`);
  } else if (a === 'eat-dish') {
    const r = RECIPES.find(x => x.id === k);
    if (!r || !S.inv[r.id]) return;
    const bonusHeal = ((S.fr?.rj || 1) - 1) * 3;
    S.inv[r.id]--; S.st = Math.min(S.maxSt + 15, S.st + r.st + bonusHeal); SFX.pop();
    toast(`Thưởng thức ${r.e} ${r.n}: <b>+${r.st + bonusHeal}⚡</b>!`);
  } else if (a === 'pet') {
    const p = PETS.find(x => x.id === k);
    if (!p || S.cash < p.cost || S.pets[k]) return;
    S.cash -= p.cost; S.pets[k] = true; S.petFed[k] = S.day; addFans(25); addXp(12); SFX.jingle();
    toast(`🐣 Chào mừng <b>${p.e} ${p.n}</b> về với nông trại!`);
  } else if (a === 'feed-pet') {
    if (S.petFed[k] === S.day) return;
    if (S.inv.carrot > 0) S.inv.carrot--;
    else if (S.cash >= 12) S.cash -= 12;
    else return;
    S.petFed[k] = S.day; SFX.pop(); addXp(2);
    const p = PETS.find(x => x.id === k);
    toast(`💜 Đã cho <b>${p.e} ${p.n}</b> ăn no!`);
  } else if (a === 'gift') {
    if (S.cash < 65 || S.frGiftDay[k] === S.day || S.fr[k] >= 5) return;
    S.cash -= 65; S.frGiftDay[k] = S.day; S.fr[k] = (S.fr[k] || 1) + 1;
    addFans(20); addXp(8); SFX.win(); checkRelics();
    const fr = FRIENDS.find(x => x.id === k);
    toast(`💜 Đã tặng quà cho <b>${fr.n}</b>! Lên <b>Cấp thân thiết ${S.fr[k]}/5</b> và xuất hiện trên nông trại!`);
  } else if (a === 'up') {
    const u = UPS.find(x => x.id === k);
    if (!u || S.cash < u.cost || S.up[k]) return;
    S.cash -= u.cost; S.up[k] = true; addXp(10); SFX.win();
    toast(`Đã sắm <b>${u.e} ${u.n}</b>!`);
    if (k === 'sprk') waterAll();
  } else if (a === 'unlock-exp') {
    closeShop(); askUnlockExpansion(k); return;
  } else if (a === 'harv-exp') {
    closeShop(); enqueue({ type: 'exp', id: k }); return;
  } else if (a === 'deliver') {
    deliverOrder(); return;
  } else if (a === 'mile') {
    unlockMilestone(k); return;
  } else if (a === 'open-radio') {
    closeShop(); openRadio(); return;
  } else if (a === 'open-code') {
    closeShop(); askSecretCode(); return;
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
  $('#hDay').textContent = S.endless ? `Ngày ${S.day} · Vĩnh Cửu 🎄` : `Ngày ${S.day}/${DAYS} 🎄`;
  $('#hWx').textContent = `${WX[S.weather].e} ${WX[S.weather].n}`;
  $('#hName').textContent = S.name;
  $('#hLv').textContent = `Lv.${S.lv || 1}`;
  const qDone = (S.quests || []).filter(q => q.done).length;
  $('#hQuestBadge').textContent = `${qDone}/${(S.quests || []).length || 3}`;
  const st = Math.max(0, Math.round(S.st)), pc = clamp(st / S.maxSt * 100, 0, 100), bar = $('#hSt');
  bar.style.width = pc + '%'; bar.classList.toggle('low', pc < 20); $('#hStT').textContent = `⚡ ${st}/${S.maxSt}`;
  $('#hCash').textContent = fmt(S.cash); $('#hFans').textContent = `💜 ${fmtFans(S.fans)}`;

  if (S.order) {
    const o = S.order;
    const reqShort = Object.entries(o.req).map(([k, q]) => `${itemInfo(k).e}${S.inv[k] || 0}/${q}`).join(' ');
    $('#hOrderTxt').innerHTML = o.done ? `📦 Đơn tuần: ✓ Đã giao (+1⭐)` : `📦 Hạn N.${o.due}: ${reqShort}`;
  }

  const cm = curMile();
  $('#hGoalName').textContent = `${cm.e} ${cm.n.split(':')[0]} (${cm.stars}⭐)`;
  $('#hGoal').style.width = clamp(S.cash / cm.cost * 100, 0, 100) + '%';
  $('#hGoalT').textContent = `${fmt(Math.min(S.cash, cm.cost))}/${fmt(cm.cost)}`;
  $('#hBillTxt').textContent = `🧾 Thuế N.${Math.ceil(S.day / 7) * 7}: ${fmt(weeklyBill())}`;
  $('#hStarTxt').textContent = `⭐ ${S.stars || 0} Sao Tím`;

  const canUnlockMile = !S.miles[cm.id] && S.cash >= cm.cost && (S.stars || 0) >= cm.stars;
  const bt = $('#bTicket');
  bt.hidden = !canUnlockMile;
  if (canUnlockMile) bt.textContent = `✨ Mở khóa ${cm.e} ${cm.n.split(':')[0]}!`;

  document.querySelectorAll('.seed').forEach(b => {
    const k = b.dataset.k, ok = canUseSeed(k);
    b.querySelector('.n').textContent = ok ? (S.seeds[k] || 0) : '🔒';
    b.classList.toggle('sel', !fertMode && S.sel === k);
    b.classList.toggle('zero', ok && !S.seeds[k]);
    b.classList.toggle('lk', !ok);
  });
  $('#eatN').textContent = S.inv.carrot || 0;
  $('#fertN').textContent = S.fert || 0;
  $('#bFert').classList.toggle('on', fertMode);
  document.querySelectorAll('[data-sp]').forEach(b => b.classList.toggle('on', paused ? b.dataset.sp === '0' : b.dataset.sp == speed));
}

function update(dt) {
  ck.t += dt;
  for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 150 * dt; if (p.life <= 0) parts.splice(i, 1); }
  for (let i = floats.length - 1; i >= 0; i--) { const f = floats[i]; f.life -= dt; f.y -= 26 * dt; if (f.life <= 0) floats.splice(i, 1); }
  if (!S || titleOpen) return;

  if (S.weather === 'snow' || S.weather === 'frost') {
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

  const in613 = (S.min >= 370 && S.min <= 400) || (S.min >= 1090 && S.min <= 1120);
  if (in613 && S.starDay !== S.day && !star613.active) {
    star613.active = true; star613.x = 180; star613.y = 75;
  }
  if (star613.active) {
    star613.x += star613.vx * dt;
    if (star613.x > W - 140) star613.active = false;
  }

  if (S.diff !== 'chill') {
    crowT -= sdt;
    if (crowT <= 0) {
      crowT = rnd(24, 42);
      const catGuard = S.pets.cat && S.petFed.cat === S.day;
      const scareChance = S.up.scare ? .32 : .85;
      const targets = S.plots.filter(p => p.s === 'crop' && !p.dead && !p.crow);
      if (!catGuard && targets.length >= 3 && Math.random() < scareChance) {
        const tp = pick(targets);
        tp.crow = 14;
        toast('🐦‍⬛ <b>Quạ Đen</b> vừa đáp xuống ruộng! Bấm vào ô có quạ để xua đuổi trước khi mất cây!');
      }
    }
    S.plots.forEach(p => {
      if (p.crow > 0) {
        p.crow -= sdt;
        if (p.crow <= 0) { p.crow = 0; p.dead = true; toast('🐦‍⬛ Quạ Đen đã mổ hỏng 1 ô cây vì không xua đuổi kịp!'); }
      }
    });
  }

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
  const t = ck.t;
  // Vẽ RJ và Chimmy đứng hai bên Cooky ngay trên màn hình chính!
  drawBT21(g, 'rj', 68, 244, t, 1.05);
  drawBT21(g, 'chimmy', 212, 244, t, 1.05);
  drawCooky(g, 140, 246, 2.75, { t, face: Math.sin(t * .6) > 0 ? 1 : -1, hop: Math.max(0, Math.sin(t * 3)) * 5 });
  const nm = ($('#inpName')?.value || 'Cooky').trim() || 'Cooky';
  g.fillStyle = 'rgba(255,255,255,.9)'; g.strokeStyle = '#f3b8ce'; g.lineWidth = 1.5;
  rr(g, 90, 18, 100, 22, 11); g.fill(); g.stroke();
  txt(g, `🐰 ${nm}`, 140, 29.5, 11, '#63324d', 800);
}

/* ---------- Save / Load & Input ---------- */
function save() { try { if (S && !S.over) localStorage.setItem(SAVE, JSON.stringify(S)); } catch (e) { } }
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE) || localStorage.getItem('cookyFarm.pastel.v3'));
    if (s && s.plots && s.plots.length === COLS * ROWS) return s;
  } catch (e) { }
  return null;
}

function enterGame() {
  titleOpen = false; $('#title').hidden = true; $('#hud').hidden = false; $('#bar').hidden = false;
  queue = []; cur = null; paused = false; speed = 1; shopOpen = false; $('#shop').hidden = true;
  modalQ.length = 0; modalCur = null; $('#modal').hidden = true;
  ck.x = ZONES.house.pos.x; ck.y = ZONES.house.pos.y; updateHud();
}

function startNew(nameOverride, diffOverride) {
  const chosenName = nameOverride || ($('#inpName')?.value || 'Cooky').trim() || 'Cooky';
  const d = diffOverride || selDiff || 'normal';
  S = newState(chosenName, d); enterGame(); save(); SFX.jingle();
  const diffLabel = d === 'chill' ? '🌸 Thư Giãn' : d === 'hard' ? '💜 Khó (Hardcore)' : '🔥 Thử Thách';
  modal({
    ic: '🎄🐰', t: `Chào mừng ${S.name} (${diffLabel})!`,
    d: `<p>Chào mừng bạn đến với nông trại Đà Lạt mùa đông! Lộ trình phát triển dành cho bạn:</p>
      <p>🌾 <b>Làm nông là cốt lõi:</b> Bạn khởi đầu với <b>6 ô đất</b>. Hãy trồng trọt, bón <b>🌿 Phân hữu cơ</b> giữ độ màu mỡ và tích lũy XP lên cấp mở hạt giống mới.</p>
      <p>🗺️ <b>Mở 4 Khu Vực Mới:</b> Khi tổng doanh thu đạt mốc (350k, 950k, 2.4tr, 5.5tr), hãy bấm trực tiếp vào các khu đất rào gỗ trên bản đồ hoặc mục <b>🗺️ Khu vực & Mốc</b> để mở <b>Đồi Hoa, Tổ Ong Mật, Vườn Hồng Treo Gió & Quán Cà Phê Săn Mây</b>!</p>
      <p>💜 <b>Hội bạn thân BT21:</b> Vào mục <b>🐣 Thú & BT21</b> để kết thân với Koya, RJ, Shooky, Mang, Chimmy, Tata & Van chuẩn tạo hình!</p>`,
    b: [['Bắt đầu canh tác thôi! 🌱', () => say(`Cố lên ${S.name}! Fighting 💜`)]]
  });
}

function backToTitle() { save(); titleOpen = true; $('#title').hidden = false; $('#hud').hidden = true; $('#bar').hidden = true; $('#shop').hidden = true; shopOpen = false; refreshCont(); }
function refreshCont() {
  const s = load(); const b = $('#bCont'); b.hidden = !s;
  if (s) { b.textContent = `▶ Tiếp tục (${s.name} · Ngày ${s.day})`; if ($('#inpName')) $('#inpName').value = s.name || 'Cooky'; }
}
function showHelp() {
  modal({
    ic: '📖💜', t: 'Cẩm nang Nông Trại & Khám Phá',
    d: `<p>🌾 <b>Kinh tế Nông trại:</b> Thu nhập chính đến từ trồng trọt, chế biến bếp, thu hoạch <b>4 Khu vực mở rộng</b> và giao <b>Đơn hàng tuần</b>. Hãy giữ độ màu mỡ đất trên 60% để không bị giảm giá bán!</p>
      <p>🗺️ <b>4 Khu Vực Mở Rộng:</b> Chạm vào các khu vực có biển khóa 🔒 trên bản đồ (Đồi Hoa, Thung Lũng Ong Mật, Vườn Hồng Treo Gió, Quán Cà Phê) để xem điều kiện doanh thu và mở khóa.</p>
      <p>💜 <b>Hội bạn thân BT21 & Easter Egg:</b> Kết thân với 7 thành viên BT21 để nhận buff nông trại. Các Easter Egg (Sao băng 06:13, Radio 06.13 FM, Mã Code) tặng quà lưu niệm nhỏ xinh và mở khóa 10 Kỷ vật sưu tầm.</p>`,
    b: [['📲 Cài đặt Màn Hình Chính / Đổi Góc Nhìn', () => openInstallZoomModal(), 'g'], ['Đã hiểu!', null], ['Về màn hình chính', () => backToTitle(), 'o']]
  });
}

function toLogical(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
cv.addEventListener('pointerdown', e => {
  if (blocked()) return; const { x, y } = toLogical(e);
  if (star613.active && Math.hypot(x - star613.x, y - star613.y) < 42) {
    star613.active = false; S.starDay = S.day;
    earn(10); addFans(15);
    SFX.jingle(); puff(star613.x, star613.y, '#d8c2ff', 16);
    toast('🌠 <b>Điều ước 06:13!</b> Nhận quà may mắn +10k & +15💜!');
    unlockRelic('mikro');
    return;
  }
  const i = tileAt(x, y);
  if (i >= 0) { if (S.plots[i].s === 'locked') { if (canBuy(i)) buyPlot(i); else toast('Hãy mở ô sát cạnh ruộng trước nhé!'); return; } enqueue({ type: 'tile', i }); return; }
  for (const k in ZONES) { const z = ZONES[k]; if (x > z.x && x < z.x + z.w && y > z.y && y < z.y + z.h) { enqueue({ type: k }); return; } }
  for (const ex of EXPANSIONS) {
    if (x > ex.x && x < ex.x + ex.w && y > ex.y && y < ex.y + ex.h) {
      if (!S.exp?.[ex.id]) askUnlockExpansion(ex.id);
      else enqueue({ type: 'exp', id: ex.id });
      return;
    }
  }
  if (y > 190) enqueue({ type: 'walk', x: clamp(x, 20, W - 20), y: clamp(y, 200, H - 10) });
});
cv.addEventListener('pointermove', e => { hover = toLogical(e); });
cv.addEventListener('pointerleave', () => { hover = null; });

$('#seeds').addEventListener('click', e => {
  const b = e.target.closest('.seed'); if (!b || !S) return;
  const k = b.dataset.k;
  if (!canUseSeed(k)) {
    const c = CROPS[k];
    toast(`🔒 Hạt <b>${c.e} ${c.n}</b> yêu cầu đạt <b>Cấp Lv.${c.reqLv}</b>${c.reqZone ? ' và mở <b>🍓 Khu Đồi Hoa Cao Nguyên</b>' : ''}!`);
    SFX.err(); return;
  }
  fertMode = false; S.sel = k; SFX.click(); updateHud();
  if (!S.seeds[S.sel]) toast(`Chưa có hạt ${CROPS[S.sel].n}, vào 🛒 Sạp mua nhé.`);
});
$('#bEat').onclick = eatCarrot;
$('#bFert').onclick = () => {
  if (blocked()) return;
  if ((S.fert || 0) <= 0) { toast('Hết 🌿 Phân hữu cơ rồi! Vào 🛒 Sạp (mục Hạt) để mua thêm nhé.'); SFX.err(); return; }
  fertMode = !fertMode; SFX.click(); updateHud();
  if (fertMode) toast('🌿 Đang bật chế độ <b>Bón phân</b>: Hãy chạm vào ô đất muốn khôi phục 100% độ màu mỡ!');
};
$('#bFish').onclick = () => { if (!blocked()) enqueue({ type: 'lake' }); };
$('#bCook').onclick = () => { if (!blocked()) enqueue({ type: 'cook' }); };
$('#bShop').onclick = () => { if (!blocked()) enqueue({ type: 'stall' }); };
$('#bGym').onclick = () => { if (!blocked()) enqueue({ type: 'gym' }); };
$('#bSleep').onclick = () => { if (!blocked()) enqueue({ type: 'house' }); };
$('#bRename').onclick = () => { if (!blocked()) askRename(); };
$('#bQuests').onclick = () => { if (!blocked()) openShop('goal'); };
$('#hOrderBox').onclick = () => { if (!blocked()) openShop('goal'); };
$('#bBell').onclick = () => { if (!blocked()) openRadio(); };
$('#bZoom').onclick = () => { SFX.click(); applyViewMode(viewMode + 1); };
$('#bInstall').onclick = () => { SFX.click(); openInstallZoomModal(); };
$('#bInstallTitle').onclick = () => { SFX.click(); openInstallZoomModal(); };
$('#hFans').onclick = () => {
  if (!S) return;
  fanClicks++;
  SFX.pop();
  if (fanClicks >= 7 && !S.relics.bomb) {
    unlockRelic('bomb');
  } else if (fanClicks < 7) {
    float(ck.x, ck.y - 85, `💜 Borahae x${fanClicks}!`, '#8e5ec4');
  }
};
$('#shopX').onclick = closeShop;
document.querySelector('.tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; shopTab = b.dataset.tab; SFX.click(); renderShop(); });
$('#shopBody').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b && !b.disabled) shopAction(b.dataset.a, b.dataset.k); });
$('#shopFoot').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b && !b.disabled) shopAction(b.dataset.a, b.dataset.k); });
document.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => { const v = +b.dataset.sp; if (v === 0) paused = !paused; else { paused = false; speed = v; } SFX.click(); updateHud(); });
$('#bSnd').onclick = () => { sndOn = !sndOn; $('#bSnd').textContent = sndOn ? '🔊' : '🔇'; };
$('#bHelp').onclick = () => { if (!modalCur) showHelp(); };
$('#bFs').onclick = toggleFullscreen;
$('#bTicket').onclick = () => { const cm = curMile(); if (S.cash >= cm.cost && (S.stars || 0) >= cm.stars && !modalCur) unlockMilestone(cm.id); };
$('#bRandName').onclick = () => { SFX.click(); const inp = $('#inpName'); if (inp) inp.value = pick(CUTE_NAMES); };
$('#diffSel').addEventListener('click', e => {
  const b = e.target.closest('.diff-btn'); if (!b) return;
  selDiff = b.dataset.d; SFX.click();
  document.querySelectorAll('.diff-btn').forEach(x => x.classList.toggle('on', x.dataset.d === selDiff));
});
$('#bNew').onclick = () => {
  SFX.click();
  const chosen = ($('#inpName')?.value || 'Cooky').trim() || 'Cooky';
  if (load()) {
    modal({ ic: '🌱', t: 'Bắt đầu nông trại mới?', d: `<p class="c">Tạo nông trại mới với tên <b>${chosen}</b> sẽ ghi đè tiến trình cũ. Tiếp tục nhé?</p>`, b: [['Bắt đầu luôn!', () => startNew(chosen, selDiff)], ['Huỷ', null, 'o']] });
    return;
  }
  startNew(chosen, selDiff);
};
$('#bCont').onclick = () => {
  const s = load(); if (!s) return;
  const def = newState(s.name, s.diff || 'normal');
  S = Object.assign(def, s);
  S.seeds = Object.assign(def.seeds, s.seeds || {});
  S.inv = Object.assign(def.inv, s.inv || {});
  S.exp = s.exp || {}; S.expDay = s.expDay || {};
  if (!S.quests || !S.quests.length) rollQuests(S);
  if (!S.order) makeOrder(S);
  SFX.click(); enterGame(); say(`Chào mừng ${S.name} quay lại! 🌱`);
};

addEventListener('keydown', e => {
  if (titleOpen || !S) return;
  if (e.key === 'Escape') { if (fertMode) { fertMode = false; updateHud(); return; } if (shopOpen) { closeShop(); return; } }
  if (modalCur) return;
  if (e.code === 'Space') { e.preventDefault(); paused = !paused; updateHud(); }
  else if (e.key >= '1' && e.key <= '9') {
    const k = CK[+e.key - 1];
    if (k && canUseSeed(k)) { fertMode = false; S.sel = k; SFX.click(); updateHud(); }
  }
  else if (e.key === 'e' || e.key === 'E') eatCarrot();
  else if (e.key === 'z' || e.key === 'Z') applyViewMode(viewMode + 1);
  else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
});

addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

setInterval(save, 10000);
addEventListener('beforeunload', save);

function resize() {
  const fr = $('#frame');
  const full = fr.classList.contains('fill-mode');
  const w = full ? innerWidth : Math.min(innerWidth, innerHeight * 1.5);
  const h = full ? innerHeight : w / 1.5;
  fr.style.width = w + 'px'; fr.style.height = h + 'px';
  // Tự động tăng kích thước chữ trên màn hình nhỏ / điện thoại để dễ quan sát
  const isSmall = innerWidth <= 920 || innerHeight <= 540;
  const basePx = (Math.min(w, h * 1.5) / 960) * (isSmall ? 18.2 : 16);
  fr.style.fontSize = Math.max(isSmall ? 12.2 : 11, basePx) + 'px';
  const dpr = Math.min(devicePixelRatio || 1, 2); K = w / W * dpr;
  cv.width = Math.round(W * K); cv.height = Math.round(H * K); drawBG();
}
addEventListener('resize', resize);
// Trên màn hình điện thoại tự động bật chế độ tràn viền để dễ quan sát nhất
if (innerWidth <= 920) {
  viewMode = 1;
  $('#frame')?.classList.add('fill-mode');
}
S = newState('Cooky', 'normal'); buildBar(); resize(); refreshCont();
if (document.fonts) document.fonts.ready.then(drawBG);
requestAnimationFrame(loop);
