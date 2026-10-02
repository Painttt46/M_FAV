/* ==========================================================
   ตั้งค่าตรงนี้ได้เลย
   ========================================================== */
const CONFIG = {
  examDate: '2026-10-10',   // วันสอบ (ปี-เดือน-วัน ค.ศ.)
  examTime: '09:00',        // เวลาเริ่มสอบ (เวลาไทย) แก้ให้ตรงกับจริงได้
};

const CHEER_MESSAGES = [
  'แฟร์ทำได้อยู่แล้ว! ขอให้สอบราบรื่นนะ ✨',
  'หายใจลึก ๆ… ค่อย ๆ ทำไปทีละข้อก็พอ 🌿',
  'ที่อ่านมาทั้งหมดไม่เสียเปล่าแน่นอน 📚',
  'ไม่ต้องสมบูรณ์แบบก็ได้ เอาแค่เต็มที่ก็พอนะ 🌷',
  'ทุกมาตราที่อ่านไป รออยู่ในหัวแฟร์แล้ว ⚖️',
  'วันสอบขอให้สมองแล่น มือลื่น ใจนิ่ง! 🔥',
  'ถ้าเหนื่อยก็พักได้นะ แล้วค่อยกลับไปลุยต่อ ☕',
  'แฟร์คือผู้มีสิทธิ์สอบผ่านโดยชอบด้วยกฎหมาย ⚖️',
  'เจอข้อที่ไม่แน่ใจ ก็ตั้งสติ แล้วตีความให้เป็นคุณกับตัวเองนะ 😆',
  'ผ่อนคลายไว้ ไม่ต้องเกร็งนะ ยิ้มไว้ก่อน 🌸',
  'กินข้าวให้อิ่ม นอนให้พอ แล้วไปลุยข้อสอบกัน! 🍙',
  'ความพยายามที่ผ่านมา น่าชื่นชมมากเลยนะ 🌟',
  'ข้อสอบยากแค่ไหน แฟร์ก็รับมือได้! 💪',
  'ใจเย็น ๆ อ่านโจทย์ช้า ๆ ตอบทีละข้อนะ 📝',
  'ขอให้โชคดี ออกข้อที่อ่านมาเยอะ ๆ เลย 🍀',
  'สอบเสร็จแล้วอย่าลืมให้รางวัลตัวเองด้วยนะ 🧋',
  'สู้ ๆ นะ ขอให้ทุกอย่างผ่านไปด้วยดี 🌈',
];

const CHECKLIST = [
  ['📚', 'ทบทวนมาตราสำคัญรอบสุดท้าย (แค่เบา ๆ ไม่ต้องอัดหนัก)'],
  ['🪪', 'เตรียมบัตรประชาชน / เอกสารเข้าสอบ'],
  ['✏️', 'เตรียมปากกา ดินสอ ยางลบ (เผื่อสำรองด้วย)'],
  ['🗺️', 'เช็กเส้นทางและสถานที่สอบ'],
  ['💧', 'เตรียมน้ำดื่มกับขนมนิดหน่อย'],
  ['🌙', 'เข้านอนเร็ว ๆ ก่อนวันสอบ'],
  ['🍳', 'กินมื้อเช้าให้อิ่มก่อนไปสอบ'],
  ['🌟', 'หายใจลึก ๆ แล้วบอกตัวเองว่า “ทำได้!”'],
];

const REWARDS = [
  ['🧋', 'ชานมไข่มุกแก้วใหญ่'],
  ['🍲', 'ชาบูหม้อโปรด'],
  ['🍧', 'บิงซูเย็น ๆ'],
  ['🍰', 'เค้กชิ้นโตหนึ่งชิ้น'],
  ['🍣', 'ซูชิจัดเต็ม'],
  ['🍦', 'ไอติมสองสกู๊ป'],
  ['🥐', 'ครัวซองต์ + กาแฟนมอุ่น ๆ'],
  ['🍕', 'พิซซ่าชีสยืด ๆ'],
  ['🍜', 'ราเมนร้อน ๆ'],
  ['😴', 'นอนยาว ๆ ทั้งวัน ไม่ต้องทำอะไรเลย'],
  ['🎬', 'ดูหนังเรื่องที่รอมานาน'],
];

/* ==========================================================
   ตัวช่วย
   ========================================================== */
const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ไม่เป็นไร */ }
  },
};

function pickDifferent(list, lastIndex) {
  if (list.length < 2) return 0;
  let i;
  do { i = Math.floor(Math.random() * list.length); } while (i === lastIndex);
  return i;
}

const rand = (min, max) => min + Math.random() * (max - min);

/* ==========================================================
   อนุภาค: หัวใจพุ่ง / confetti
   ========================================================== */
function burst(x, y, emojis, count = 14) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = rand(18, 34) + 'px';
    document.body.appendChild(el);

    const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05);
    const dist = rand(70, 190);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const spin = rand(-50, 50);

    el.animate([
      { transform: 'translate(-50%,-50%) scale(.3) rotate(0)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1) rotate(${spin}deg)`, opacity: 1, offset: .6 },
      { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 70}px)) scale(.9) rotate(${spin * 1.4}deg)`, opacity: 0 },
    ], { duration: rand(900, 1500), easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => el.remove();
  }
}

function confettiRain(count = 60) {
  if (reduceMotion) return;
  const bits = ['✨', '🎉', '🌸', '⭐', '🍀', '🎀'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = bits[Math.floor(Math.random() * bits.length)];
    el.style.left = rand(0, 100) + 'vw';
    el.style.top = '-40px';
    el.style.fontSize = rand(18, 32) + 'px';
    document.body.appendChild(el);

    const drift = rand(-80, 80);
    el.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${drift}px, ${window.innerHeight + 80}px) rotate(${rand(-540, 540)}deg)`, opacity: 1 },
    ], { duration: rand(2200, 4200), delay: rand(0, 900), easing: 'cubic-bezier(.3,.1,.6,1)', fill: 'backwards' })
      .onfinish = () => el.remove();
  }
}

/* ==========================================================
   ของลอยฉากหลัง
   ========================================================== */
(function floaters() {
  const host = document.querySelector('.bg-float');
  if (!host || reduceMotion) return;
  const icons = ['✨', '🌸', '⚖️', '📚', '☁️', '⭐', '🍀', '🎀', '🌷'];
  const n = window.innerWidth < 600 ? 10 : 16;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.textContent = icons[i % icons.length];
    s.style.left = rand(2, 96) + '%';
    s.style.fontSize = rand(16, 30) + 'px';
    s.style.animationDuration = rand(14, 28) + 's';
    s.style.animationDelay = (-rand(0, 28)) + 's';
    s.style.setProperty('--drift', rand(-60, 60) + 'px');
    s.style.setProperty('--spin', rand(-40, 40) + 'deg');
    host.appendChild(s);
  }
})();

/* ==========================================================
   นับถอยหลัง
   ========================================================== */
const examAt = new Date(`${CONFIG.examDate}T${CONFIG.examTime}:00+07:00`);

// นับจำนวนวันตามปฏิทินเวลาไทย (ไม่ขึ้นกับเวลาในเครื่อง)
const bkkDay = (ms) => Math.floor((ms + 7 * 3600e3) / 86400e3);

function stageMessage(daysLeft) {
  if (daysLeft > 7) return 'ยังมีเวลาอีกหน่อยนะ ค่อย ๆ ทบทวนไปทีละนิด ไม่ต้องรีบ 🌱';
  if (daysLeft >= 4) return 'ใกล้แล้วน้า~ ทบทวนประเด็นสำคัญ แล้วอย่าลืมพักด้วยนะ 📚';
  if (daysLeft >= 2) return 'อีกแค่ไม่กี่วัน! เริ่มเบาลงได้แล้ว ไม่ต้องอัดหนักนะ 🍵';
  if (daysLeft === 1) return 'พรุ่งนี้แล้ว! ติ๊กเช็กลิสต์ให้ครบ แล้วนอนเร็ว ๆ นะ 🌙';
  if (daysLeft === 0) return 'วันนี้แล้ว!! แฟร์พร้อมที่สุดแล้ว ลุยเลย ⚖️🔥';
  return 'สอบเสร็จแล้ว! แฟร์เก่งที่สุดเลย ไปพักผ่อนและกินของอร่อยได้แล้วนะ 🎉';
}

function tickCountdown() {
  const now = Date.now();
  const diff = Math.max(0, examAt.getTime() - now);
  const d = Math.floor(diff / 86400e3);
  const h = Math.floor(diff / 3600e3) % 24;
  const m = Math.floor(diff / 60e3) % 60;
  const s = Math.floor(diff / 1e3) % 60;
  const pad = (n) => String(n).padStart(2, '0');

  $('#cdD').textContent = d;
  $('#cdH').textContent = pad(h);
  $('#cdM').textContent = pad(m);
  $('#cdS').textContent = pad(s);

  const daysLeft = bkkDay(examAt.getTime()) - bkkDay(now);
  $('#cdNote').textContent = stageMessage(daysLeft);
}

(function initDates() {
  const opt = { timeZone: 'Asia/Bangkok' };
  const short = examAt.toLocaleDateString('th-TH', { ...opt, day: 'numeric', month: 'long' });
  const full = examAt.toLocaleDateString('th-TH', { ...opt, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const day = examAt.toLocaleDateString('th-TH', { ...opt, day: 'numeric' });
  $('#examShort').textContent = short;
  $('#cdDate').textContent = `${full} · ${CONFIG.examTime} น.`;
  document.querySelector('.exam-day').textContent = day;
})();

tickCountdown();
setInterval(tickCountdown, 1000);

/* ==========================================================
   กดรับกำลังใจ
   ========================================================== */
const bubble = $('#bubble');
const counterEl = $('#counter');
const mascotBtn = $('#mascotBtn');
let cheerCount = store.get('fair.cheerCount', 0);
let lastMsg = -1;

function renderCounter() {
  counterEl.innerHTML = cheerCount > 0
    ? `แฟร์รับกำลังใจไปแล้ว <b>${cheerCount}</b> ครั้ง ✨`
    : 'แฟร์ยังไม่ได้รับกำลังใจเลย กดเลย ๆ';
}
renderCounter();

function say(text) {
  bubble.textContent = text;
  bubble.classList.remove('pop');
  void bubble.offsetWidth; // รีสตาร์ทแอนิเมชัน
  bubble.classList.add('pop');
}

function giveCheer(originEl) {
  lastMsg = pickDifferent(CHEER_MESSAGES, lastMsg);
  say(CHEER_MESSAGES[lastMsg]);

  cheerCount += 1;
  store.set('fair.cheerCount', cheerCount);
  renderCounter();

  mascotBtn.classList.remove('jump');
  void mascotBtn.offsetWidth;
  mascotBtn.classList.add('jump');

  const r = originEl.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, ['✨', '🌸', '⭐', '🍀', '🌷']);
}

$('#cheerBtn').addEventListener('click', (e) => giveCheer(e.currentTarget));
mascotBtn.addEventListener('click', (e) => giveCheer(e.currentTarget));

/* ==========================================================
   เช็กลิสต์
   ========================================================== */
const listEl = $('#checklist');
const progFill = $('#progFill');
const progText = $('#progText');
const progBar = document.querySelector('.progress');
let done = store.get('fair.checklist', []);
let celebrated = false;

CHECKLIST.forEach(([icon, text], i) => {
  const li = document.createElement('li');
  const label = document.createElement('label');
  label.className = 'check';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = done.includes(i);
  input.addEventListener('change', () => {
    done = input.checked ? [...new Set([...done, i])] : done.filter((x) => x !== i);
    store.set('fair.checklist', done);
    renderProgress(true);
    if (input.checked) {
      const r = label.querySelector('.box').getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, ['✨', '⭐', '🌸'], 7);
    }
  });

  const box = document.createElement('span');
  box.className = 'box';
  const txt = document.createElement('span');
  txt.className = 'txt';
  txt.textContent = `${icon} ${text}`;

  label.append(input, box, txt);
  li.appendChild(label);
  listEl.appendChild(li);
});

function renderProgress(fromUser) {
  const pct = Math.round((done.length / CHECKLIST.length) * 100);
  progFill.style.width = pct + '%';
  progBar.setAttribute('aria-valuenow', pct);

  if (pct === 100) {
    progText.textContent = 'พร้อมลุยแล้ว 100%! แฟร์เก่งมาก 🎉';
    if (fromUser && !celebrated) { celebrated = true; confettiRain(); }
  } else {
    celebrated = false;
    progText.textContent = pct === 0 ? 'พร้อมแล้ว 0% — มาเริ่มกัน!' : `พร้อมแล้ว ${pct}% — ไปต่ออีกนิดนะ`;
  }
}
renderProgress(false);

/* ==========================================================
   สุ่มรางวัลหลังสอบ
   ========================================================== */
const rewardBox = $('#rewardBox');
let lastReward = -1;

$('#gachaBtn').addEventListener('click', (e) => {
  lastReward = pickDifferent(REWARDS, lastReward);
  const [emoji, text] = REWARDS[lastReward];
  $('#rwEmoji').textContent = emoji;
  $('#rwText').textContent = text;

  rewardBox.classList.remove('spin');
  void rewardBox.offsetWidth;
  rewardBox.classList.add('spin');

  const r = rewardBox.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, ['🎉', '✨', '⭐', '🌸'], 12);
});

/* ==========================================================
   เลื่อนแล้วค่อยโผล่
   ========================================================== */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();
