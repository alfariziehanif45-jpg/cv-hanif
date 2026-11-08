/* ===== CONFIG (EDIT DI SINI) ===== */
const GH_USER = "alfariziehanif45-jpg";
const MY_EMAIL = "zaykayla575@gmail.com";
const WEB3FORMS_KEY = "d744de2c-91b5-470c-992f-b97916e36714";
// URL yang dibuka saat QR di ID card di-scan. Kosongkan = otomatis pakai URL halaman ini (setelah deploy).
// Bisa juga diganti link LinkedIn, contoh: "https://www.linkedin.com/in/username"
const QR_URL = "";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ===== I18N (ID default di HTML, EN di sini) ===== */
const I18N = { en: {
  nav_home: "Home", nav_about: "About", nav_edu: "Education", nav_exp: "Experience", nav_skills: "Skills", nav_projects: "Projects", nav_certs: "Certificates", nav_contact: "Contact",
  hero_desc: "I'm a student interested in technology, web development, mobile development, and the digital world.",
  btn_projects: "View Projects", btn_cv: "Download CV",
  t_about: "About Me", about_h3: "Get To Know Me",
  about_p1: "Hi, I'm Hanif. I'm a student with a strong interest in technology and application development.",
  about_p2: "I enjoy learning how websites and apps can be made more engaging, interactive, and easy to use.",
  lbl_name: "Name", lbl_job: "Profession", lbl_loc: "Location", job_val: "Student / Developer",
  st_certs: "Certificates", st_projects: "Projects", st_years: "Years Learning", st_tech: "Technologies",
  t_edu: "Education", edu_now: "2025 - Present", edu_unsri: "D3 Informatics Management student. Learning web, mobile, and information systems development.",
  edu_sma: "Senior High School", edu_sma_p: "Senior secondary education.", edu_smp: "Junior High School", edu_smp_p: "Junior secondary education.", edu_sd: "Elementary School", edu_sd_p: "The start of my learning journey.",
  t_exp: "Experience & Organization", exp_desc: "Internships, committees, and organizations I've been part of.",
  exp1_date: "2025 - Present", exp1_t: "BEM Fasilkom Unsri — Relations Department (Internal)", exp1_p: "Member of the Relations Department, Internal division, at the Student Executive Board of the Faculty of Computer Science, Universitas Sriwijaya. Involved in maintaining relations and communication among board members and supporting organization events.",
  exp2_t: "[Committee / Internship Name] — Staff", exp2_p: "Replace with your committee or internship experience. Describe real contributions, e.g. building an event website.",
  t_skills: "My Skills", learning: "Currently Learning", gh_title: "GitHub Stats", gh_repos: "Repositories", gh_commits: "Recent commits",
  t_projects: "My Projects", proj_desc: "Some projects I've worked on in web and mobile. Click a card to see the details.", btn_detail: "View Details →",
  p_asean: "A website that helps users learn about tourism, cuisine, and cities across ASEAN countries.",
  p_campus: "A mobile app that helps students find and report lost items on campus.",
  p_rpg: "An RPG game with character gacha, team building, SPD-based turn battles, Boss Rush, crafting, a shop, and a Skill Tree.",
  t_certs: "Certificates", cert_desc: "Certificates of my learning and skill development.", btn_cert: "🔍 View Certificate",
  cert_flip: "🔄 Flip Certificate", cert_hint: "Drag to rotate • double-click to flip",
  term_desc: "Try typing commands like about, skills, projects, or contact.",
  t_contact: "Contact Me", contact_p: "Interested in working together or want to reach me?",
  ph_name: "Your name", ph_email: "Your email", ph_msg: "Write a message...", btn_send: "Send Message 🚀",
  pm_feat: "Key Features", pm_tech: "Technologies", pm_chal: "Challenges",
  s_ok: "Message sent to Gmail! Thank you 🙌", s_fail: "Failed", s_net: "Connection failed / timeout.", s_file: "Open via Live Server, not the file directly.", s_gmail: "Send via Gmail", s_sending: "Sending...",
  tm_welcome: "Welcome! Type 'help' to see available commands.", tm_unknown: "command not found. Type 'help'.", tm_lang: "Language switched.",
  tm_help: "about, skills, education, projects, certs, contact, github, whoami, open <project>, lang, clear",
  gh_fail: "Couldn't load live data (API limit or offline). Visit my GitHub instead:", gh_none: "No public repositories yet."
}};
const ID = {}; let lang = "id"; const langHooks = [];
try { lang = localStorage.getItem("lang") === "en" ? "en" : "id"; } catch (e) {}
const t = k => (lang === "en" && I18N.en[k]) || ID[k] || k;
const L = o => (o && (o[lang] || o.id)) || "";
$$("[data-i18n]").forEach(e => ID[e.dataset.i18n] = e.textContent.trim());
const ID_PH = {}; $$("[data-i18n-ph]").forEach(e => ID_PH[e.dataset.i18nPh] = e.placeholder);
Object.assign(ID, {
  s_ok: "Pesan terkirim ke Gmail! Terima kasih 🙌", s_fail: "Gagal", s_net: "Koneksi gagal / timeout.", s_file: "Buka lewat Live Server, bukan file langsung.", s_gmail: "Kirim lewat Gmail", s_sending: "Mengirim...",
  tm_welcome: "Selamat datang! Ketik 'help' untuk melihat daftar perintah.", tm_unknown: "perintah tidak ditemukan. Ketik 'help'.", tm_lang: "Bahasa diganti.",
  tm_help: "about, skills, education, projects, certs, contact, github, whoami, open <project>, lang, clear",
  gh_fail: "Data live tidak bisa dimuat (limit API / offline). Kunjungi GitHub saya:", gh_none: "Belum ada repository publik."
});
function applyLang() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  $$("[data-i18n-ph]").forEach(e => e.placeholder = lang === "en" ? I18N.en[e.dataset.i18nPh] : ID_PH[e.dataset.i18nPh]);
  $("#langBtn").textContent = lang === "id" ? "EN" : "ID";
  langHooks.forEach(f => f());
}
function setLang(l) { lang = l; try { localStorage.setItem("lang", l); } catch (e) {} applyLang(); }
$("#langBtn").addEventListener("click", () => setLang(lang === "id" ? "en" : "id"));

/* ===== INTRO / LOADING SCREEN (code editor boot) ===== */
(() => {
  const intro = document.getElementById("intro");
  if (!intro) { document.body.classList.remove("locked"); document.body.classList.add("ready"); return; }
  const $i = id => document.getElementById(id);
  const log = $i("introLog"), fill = $i("introFill"), pct = $i("introPct"), tabs = $i("edTabs"),
    code = $i("edCode"), langs = $i("introLangs"), clock = $i("introClock");
  const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
  // markup token: ⟦kelas|teks⟧ (k=keyword, s=string, f=function, n=number, t=tag, a=attribute)
  const STEPS = [
    { file: "index.html", name: "HTML", icon: "html5/html5-original", code: [
      "⟦t|<section⟧ ⟦a|id⟧=⟦s|\"hanif\"⟧⟦t|>⟧",
      "  ⟦t|<h1>⟧Hello, World!⟦t|</h1>⟧",
      "  ⟦t|<p>⟧Web & Mobile Developer⟦t|</p>⟧",
      "⟦t|</section>⟧"] },
    { file: "style.css", name: "CSS", icon: "css3/css3-original", code: [
      "⟦k|.hero⟧ {",
      "  ⟦a|color⟧: ⟦n|#00ff9c⟧;",
      "  ⟦a|display⟧: ⟦s|grid⟧;",
      "  ⟦a|animation⟧: ⟦f|glow⟧ 2s infinite;",
      "}"] },
    { file: "script.js", name: "JavaScript", icon: "javascript/javascript-original", code: [
      "⟦k|const⟧ dev = { name: ⟦s|\"Hanif\"⟧, role: ⟦s|\"Developer\"⟧ };",
      "⟦f|console⟧.⟦f|log⟧(⟦s|`Hi, ${dev.name}!`⟧);",
      "⟦k|export default⟧ dev;"] },
    { file: "web.php", name: "Laravel", icon: "laravel/laravel-original", code: [
      "⟦k|Route⟧::⟦f|get⟧(⟦s|'/hanif'⟧, ⟦k|function⟧ () {",
      "    ⟦k|return⟧ ⟦f|view⟧(⟦s|'portfolio'⟧);",
      "});"] },
    { file: "main.dart", name: "Flutter", icon: "flutter/flutter-original", code: [
      "⟦k|void⟧ ⟦f|main⟧() {",
      "  ⟦f|runApp⟧(⟦k|const⟧ HanifApp());",
      "}"] },
    { file: "skills.py", name: "Python", icon: "python/python-original", code: [
      "⟦k|import⟧ pandas ⟦k|as⟧ pd",
      "df = pd.⟦f|read_csv⟧(⟦s|\"skills.csv\"⟧)",
      "⟦f|print⟧(df.⟦f|head⟧())"] }
  ];
  const parse = l => { const o = []; l.replace(/⟦(\w)\|(.*?)⟧|([^⟦]+)/g, (m, c, a, b) => { o.push(c ? [c, a] : ["", b]); return m; }); return o; };
  STEPS.forEach(s => { s.lines = s.code.map(parse); s.total = s.lines.reduce((n, l) => n + l.reduce((m, t) => m + t[1].length, 0) + 1, 0); });

  const tabEls = STEPS.map(s => { const d = document.createElement("div"); d.className = "ed-tab"; d.textContent = s.file; tabs.appendChild(d); return d; });
  const langEls = STEPS.map(s => {
    const d = document.createElement("div"); d.className = "lg";
    const im = new Image(); im.src = CDN + s.icon + ".svg"; im.alt = s.name; im.decoding = "async"; im.onerror = () => { im.style.display = "none"; };
    const sp = document.createElement("span"); sp.textContent = s.name; d.append(im, sp); langs.appendChild(d); return d;
  });

  function paint(s, n) {
    code.textContent = ""; let left = n, last = null;
    for (const line of s.lines) {
      if (left <= 0) break;
      const row = document.createElement("div"); row.className = "cl"; last = row;
      for (const [c, tx] of line) {
        if (left <= 0) break;
        const part = tx.slice(0, left); left -= part.length;
        const sp = document.createElement("span"); if (c) sp.className = c; sp.textContent = part; row.appendChild(sp);
      }
      left -= 1; code.appendChild(row);
    }
    const caret = document.createElement("span"); caret.className = "caret";
    (last || code.appendChild(Object.assign(document.createElement("div"), { className: "cl" }))).appendChild(caret);
  }

  let line = null;
  const pushLog = (txt, cls = "") => {
    line = document.createElement("div"); line.textContent = txt; if (cls) line.className = cls; log.appendChild(line);
    while (log.children.length > 4) log.removeChild(log.firstChild);
  };
  const enter = i => { tabEls[i].classList.add("on"); langEls[i].classList.add("cur"); pushLog("> compiling " + STEPS[i].file + " ..."); };
  const leave = i => {
    tabEls[i].classList.replace("on", "done"); langEls[i].classList.replace("cur", "on");
    line.textContent = "✔ " + STEPS[i].file + " — " + STEPS[i].name + " ready"; line.className = "ok";
  };

  const STEP = 820, TYPE = .78, N = STEPS.length, TOTAL = N * STEP;
  let cur = -1, done = false; const start = performance.now();
  const tc = () => clock.textContent = new Date().toTimeString().slice(0, 8); tc();
  const clk = setInterval(tc, 1000);

  function finish() {
    if (done) return; done = true; clearInterval(clk);
    fill.style.width = "100%"; pct.textContent = "build 100%";
    intro.classList.add("done");
    setTimeout(() => { document.body.classList.remove("locked"); document.body.classList.add("ready"); }, 800);
    setTimeout(() => intro.remove(), 2400);
  }
  function success() {
    langEls.forEach(l => l.classList.add("on")); tabEls.forEach(t => t.classList.add("done"));
    pushLog("✔ BUILD SUCCESS — access granted", "big");
    setTimeout(finish, 700);
  }
  function tick(now) {
    if (done) return;
    const el = now - start, i = Math.min(Math.floor(el / STEP), N);
    while (cur < i) { if (cur >= 0) leave(cur); cur++; if (cur < N) enter(cur); }
    if (i < N) { const s = STEPS[i]; paint(s, Math.round(Math.min((el - i * STEP) / (STEP * TYPE), 1) * s.total)); }
    const p = Math.min(100, Math.round(el / TOTAL * 100));
    fill.style.width = p + "%"; pct.textContent = "build " + p + "%";
    if (el < TOTAL) requestAnimationFrame(tick); else success();
  }
  requestAnimationFrame(tick);
  $i("introSkip").addEventListener("click", finish);
  setTimeout(finish, 9000);
})();

/* ===== CODE RAIN + FLOATING SYMBOLS ===== */
(() => {
  const cv = document.getElementById("code-bg"), ctx = cv.getContext("2d");
  const chars = "01{}<>/;=()[]$#&+*".split(""), words = ["</>", "{ }", "01", "=>", "();", "&&", "[]", "fn", "<?>"];
  const mouse = { x: -999, y: -999 }, FS = 16;
  let w, h, cols, drops, parts;
  function resize() {
    w = cv.width = innerWidth; h = cv.height = innerHeight;
    cols = Math.floor(w / FS);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
    parts = Array.from({ length: Math.min(50, Math.floor(w / 30)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: -Math.random() * .5 - .1,
      t: words[Math.floor(Math.random() * words.length)], s: 12 + Math.random() * 14, a: .15 + Math.random() * .35
    }));
  }
  addEventListener("resize", resize); resize();
  addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function draw() {
    ctx.fillStyle = "rgba(3,7,18,.14)"; ctx.fillRect(0, 0, w, h);
    ctx.font = FS + "px JetBrains Mono, monospace"; ctx.fillStyle = "rgba(0,255,156,.32)";
    for (let i = 0; i < cols; i++) {
      const prev = Math.floor(drops[i]); drops[i] += .35;
      if (Math.floor(drops[i]) !== prev && drops[i] > 0)
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * FS, drops[i] * FS);
      if (drops[i] * FS > h && Math.random() > .975) drops[i] = 0;
    }
    parts.forEach(p => {
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy) || 1;
      if (d < 150) { p.x += dx / d * (150 - d) * .06; p.y += dy / d * (150 - d) * .06; }
      p.x += p.vx; p.y += p.vy;
      if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
      if (p.x < -40) p.x = w + 20; if (p.x > w + 40) p.x = -20;
      ctx.font = p.s + "px JetBrains Mono, monospace"; ctx.fillStyle = `rgba(34,211,238,${p.a})`;
      ctx.fillText(p.t, p.x, p.y);
    });
    requestAnimationFrame(draw);
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { ctx.fillStyle = "#030712"; ctx.fillRect(0, 0, w, h); } else draw();
})();

/* ===== LANYARD PHYSICS ===== */
(() => {
  const wrap = document.getElementById("lanyard"), cv = wrap.querySelector("canvas"),
    card = wrap.querySelector(".id-card"), ctx = cv.getContext("2d");
  const N = 8, SEG = 34, CH = 300, CW = 220, MAXLEN = (N - 1) * SEG + CH - 2,
    START = -(MAXLEN + 300), TOP = -START;
  let W, H, pts, ay = START, av = 0, falling = false, landed = false,
    dragging = false, off = { x: 0, y: 0 }, ptr = { x: 0, y: 0 };

  function init() {
    const r = wrap.getBoundingClientRect(), d = devicePixelRatio || 1;
    W = r.width; H = r.height;
    cv.style.top = -TOP + "px"; cv.style.height = (H + TOP) + "px";
    cv.width = W * d; cv.height = (H + TOP) * d; ctx.setTransform(d, 0, 0, d, 0, TOP * d);
    pts = [];
    for (let i = 0; i <= N; i++) {
      const by = i < N ? i * SEG : (N - 1) * SEG + CH, y = by + ay;
      pts.push({ x: W / 2, y, px: W / 2 + (i ? 4 : 0), py: y });
    }
  }
  const local = e => { const r = wrap.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  addEventListener("pointermove", e => { ptr = local(e); });
  card.addEventListener("pointerdown", e => {
    if (!landed) return;
    dragging = true; card.classList.add("drag"); card.setPointerCapture(e.pointerId);
    const p = local(e), b = pts[N]; off = { x: b.x - p.x, y: b.y - p.y };
  });
  addEventListener("pointerup", () => { dragging = false; card.classList.remove("drag"); });

  function step() {
    if (!pts || !falling) return;
    if (!landed) {
      av += .9; ay += av;
      if (ay >= 0) { ay = 0; if (av > 4) av = -av * .3; else { av = 0; landed = true; } }
    }
    for (let i = 1; i <= N; i++) {
      const p = pts[i], vx = (p.x - p.px) * .985, vy = (p.y - p.py) * .985;
      p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + .55;
    }
    const b = pts[N];
    if (dragging) {
      let tx = ptr.x + off.x, ty = ptr.y + off.y;
      const dx = tx - W / 2, dy = ty, d = Math.hypot(dx, dy);
      if (d > MAXLEN) { tx = W / 2 + dx / d * MAXLEN; ty = dy / d * MAXLEN; }
      b.x = tx; b.y = ty;
    }
    for (let k = 0; k < 12; k++) {
      pts[0].x = W / 2; pts[0].y = ay;
      for (let i = 0; i < N; i++) {
        const a = pts[i], c = pts[i + 1], len = i === N - 1 ? CH : SEG;
        const dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy) || 1, f = (d - len) / d;
        const wa = i === 0 ? 0 : .5, wc = (i + 1 === N && dragging) ? 0 : (i === 0 ? 1 : .5);
        const tot = wa + wc || 1;
        a.x += dx * f * wa / tot; a.y += dy * f * wa / tot;
        c.x -= dx * f * wc / tot; c.y -= dy * f * wc / tot;
      }
    }
  }
  function render() {
    ctx.clearRect(0, -TOP, W, H + TOP);
    const g = ctx.createLinearGradient(0, ay, 0, ay + N * SEG);
    g.addColorStop(0, "#00ff9c"); g.addColorStop(1, "#22d3ee");
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < N; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = g; ctx.lineWidth = 14; ctx.shadowColor = "#00ff9c"; ctx.shadowBlur = 12; ctx.stroke();
    ctx.shadowBlur = 0; ctx.strokeStyle = "rgba(3,7,18,.55)"; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.stroke(); ctx.setLineDash([]);
    const a = pts[N - 1], b = pts[N], ang = Math.atan2(-(b.x - a.x), b.y - a.y);
    ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(ang);
    ctx.fillStyle = "#0b1f2c"; ctx.strokeStyle = "#00ff9c"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-12, -10, 24, 22, 5); ctx.fill(); ctx.stroke(); ctx.restore();
    card.style.transform = `translate(${a.x - CW / 2}px,${a.y}px) rotate(${ang}rad)`;
  }
  addEventListener("resize", init); init();
  (function loop() { step(); render(); requestAnimationFrame(loop); })();

  const go = () => setTimeout(() => { falling = true; }, 500);
  if (document.body.classList.contains("ready")) go();
  else {
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains("ready")) { mo.disconnect(); go(); }
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }
})();

/* ===== QR CODE DI ID CARD ===== */
(() => {
  const box = document.getElementById("idQr");
  const url = QR_URL || location.href.split("#")[0];
  const draw = () => {
    if (typeof QRCode === "undefined") { box.remove(); return; }
    box.title = url;
    new QRCode(box, { text: url, width: 128, height: 128, colorDark: "#030712", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
  };
  if (document.readyState === "complete") draw(); else addEventListener("load", draw);
})();

/* ===== TYPING EFFECT ===== */
(() => {
  const el = document.getElementById("typing");
  const texts = ["Web Developer", "Mobile Developer", "UI Designer", "Tech Enthusiast"];
  let ti = 0, c = 0, del = false;
  (function type() {
    const cur = texts[ti];
    el.textContent = cur.substring(0, del ? --c : ++c);
    if (!del && c === cur.length) { del = true; return setTimeout(type, 1500); }
    if (del && c === 0) { del = false; ti = (ti + 1) % texts.length; }
    setTimeout(type, del ? 60 : 100);
  })();
})();

/* ===== EXTRA ANIMATIONS ===== */
$$(".about-info,.tech-grid,.timeline,.projects-container,.certificate-container,.contact-list,.stats,.learn-grid,.gh-nums")
  .forEach(g => [...g.children].forEach((c, i) => { c.classList.add("stg"); c.style.setProperty("--i", i); }));

const progress = document.getElementById("progress"),
  navLinks = $$(".nav-menu a"),
  navSecs = navLinks.map(a => document.querySelector(a.getAttribute("href")));
addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width = (scrollY / (h.scrollHeight - innerHeight) * 100) + "%";
  let cur = 0;
  navSecs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === cur));
}, { passive: true });

const glow = document.querySelector(".cursor-glow");
addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });

$$(".project-card,.certificate-card").forEach(c => {
  c.addEventListener("mousemove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 10 + "deg");
    c.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 10 + "deg");
  });
  c.addEventListener("mouseleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
});

/* ===== SCROLL REVEAL & SKILL BARS ===== */
const reveals = $$(".reveal"), bars = $$(".skill-progress[data-width]");
function onScroll() {
  const vh = innerHeight;
  reveals.forEach(el => { if (el.getBoundingClientRect().top < vh - 100) el.classList.add("active"); });
  bars.forEach(b => { if (b.getBoundingClientRect().top < vh - 100) b.style.width = b.dataset.width; });
}
addEventListener("scroll", onScroll); onScroll();

/* ===== ANGKA BERJALAN (COUNTERS) ===== */
function countTo(el, to, suffix = "") {
  const s = performance.now(), D = 1400;
  (function f(n) {
    const p = Math.min((n - s) / D, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(f);
  })(s);
}
(() => {
  const auto = { certs: $$(".certificate-card").length, projects: $$(".project-card").length, tech: $$(".tech").length };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, to = el.dataset.auto ? auto[el.dataset.auto] : +el.dataset.count;
    countTo(el, to, el.dataset.suffix || "");
  }), { threshold: .6 });
  $$("[data-auto],[data-count]").forEach(el => io.observe(el));
})();

/* ===== MOBILE MENU ===== */
const menuToggle = $(".menu-toggle"), navMenu = $(".nav-menu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", open); menuToggle.textContent = open ? "✕" : "☰";
});
$$(".nav-menu a").forEach(a => a.addEventListener("click", () => { navMenu.classList.remove("active"); menuToggle.textContent = "☰"; }));

/* ===== PROJECT FILTER ===== */
const filterBtns = $$(".filter-btn"), cards = $$(".project-card"), cats = $$(".project-category");
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.remove("active")); btn.classList.add("active");
  const f = btn.dataset.filter;
  cards.forEach(c => c.style.display = (f === "all" || c.dataset.category === f) ? "block" : "none");
  cats.forEach(cat => {
    const any = [...cat.querySelectorAll(".project-card")].some(c => c.style.display !== "none");
    cat.style.display = any ? "block" : "none";
  });
}));

/* ===== PROJECT DETAIL MODAL (EDIT data project di sini) ===== */
const GIT = "https://github.com/" + GH_USER;
const PROJECTS = {
  asean: {
    title: "Wisata Negara ASEAN",
    shots: ["images/project-asean.jpg"], // tambah screenshot lain: "images/asean-2.jpg", ...
    desc: { id: "Website edukasi yang membantu pengguna mempelajari wisata, kuliner, dan kota di negara-negara ASEAN.", en: "An educational website that helps users learn about tourism, cuisine, and cities across ASEAN countries." },
    features: { id: ["Informasi wisata, kuliner, dan kota tiap negara ASEAN", "Peta interaktif berbasis OpenStreetMap", "Tampilan responsif di desktop dan mobile"], en: ["Tourism, cuisine, and city info for each ASEAN country", "Interactive map powered by OpenStreetMap", "Responsive layout on desktop and mobile"] },
    tech: ["Laravel", "JavaScript", "OpenStreetMap"],
    challenge: { id: "Mengatur data banyak negara agar mudah dicari dan ditampilkan di peta dengan rapi. (Edit teks ini sesuai pengalamanmu.)", en: "Organizing data for many countries so it stays searchable and renders cleanly on the map. (Edit this text with your own experience.)" },
    links: [["git", "🐙 GitHub Repo", GIT]]
  },
  campus: {
    title: "Campus Lost",
    shots: ["images/project-campus-lost.jpg"],
    desc: { id: "Aplikasi mobile yang membantu mahasiswa menemukan dan melaporkan barang yang hilang di lingkungan kampus.", en: "A mobile app that helps students find and report lost items around campus." },
    features: { id: ["Laporan barang hilang dan ditemukan", "Data tersimpan real-time di Firebase", "Antarmuka sederhana untuk mahasiswa"], en: ["Lost and found item reports", "Real-time data stored in Firebase", "Simple interface built for students"] },
    tech: ["Flutter", "Firebase", "Dart"],
    challenge: { id: "Menyinkronkan data laporan secara real-time dan menjaga alur pelaporan tetap singkat. (Edit sesuai pengalamanmu.)", en: "Syncing reports in real time while keeping the reporting flow short. (Edit with your own experience.)" },
    links: [["git", "🐙 GitHub Repo", GIT]]
  },
  rpg: {
    title: "RPG Gacha",
    shots: ["images/project-rpg-gacha.png"],
    desc: { id: "Game bergenre RPG dengan sistem gacha karakter, penyusunan tim, dan pertarungan bergiliran berdasarkan SPD.", en: "An RPG with character gacha, team building, and SPD-based turn battles." },
    features: {
      id: ["Gacha karakter dengan pity counter", "Pertarungan bergiliran berdasarkan SPD, Boss Rush", "Crafting material, toko, dan Skill Tree", "Sistem elemen: Api → Udara → Tanah → Air, Cahaya ⇄ Kegelapan (+50% damage elemen unggul, -25% elemen lemah)", "Peningkatan stat tiap level (HP/ATK/DEF/SPD/CRIT)"],
      en: ["Character gacha with a pity counter", "SPD-based turn battles and Boss Rush", "Material crafting, shop, and Skill Tree", "Element system: Fire → Air → Earth → Water, Light ⇄ Dark (+50% damage on advantage, -25% on disadvantage)", "Per-level stat growth (HP/ATK/DEF/SPD/CRIT)"]
    },
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    challenge: { id: "Menyeimbangkan sistem elemen, urutan giliran berdasarkan SPD, dan peluang gacha agar permainan tetap adil. (Edit sesuai pengalamanmu.)", en: "Balancing the element system, SPD turn order, and gacha odds so the game stays fair. (Edit with your own experience.)" },
    links: [["live", "🚀 Live Demo", "https://gamerpg-omega.vercel.app/"], ["git", "🐙 GitHub Repo", GIT]]
  }
};
const pm = $("#projectModal"), pmTrack = $("#pmTrack"), pmDots = $("#pmDots"), pmSlider = $("#pmSlider");
let pmKey = null, pmIdx = 0;
function pmGo(i) {
  const n = pmTrack.children.length; if (!n) return;
  pmIdx = (i + n) % n; pmTrack.style.transform = `translateX(${-pmIdx * 100}%)`;
  [...pmDots.children].forEach((d, k) => d.classList.toggle("on", k === pmIdx));
}
function pmFill() {
  if (!pmKey) return; const p = PROJECTS[pmKey];
  $("#pmTitle").textContent = p.title; $("#pmDesc").textContent = L(p.desc); $("#pmChal").textContent = L(p.challenge);
  const ul = $("#pmFeat"); ul.innerHTML = ""; L(p.features).forEach(f => { const li = document.createElement("li"); li.textContent = f; ul.appendChild(li); });
  const tc = $("#pmTech"); tc.innerHTML = ""; p.tech.forEach(x => { const s = document.createElement("span"); s.textContent = x; tc.appendChild(s); });
  const lk = $("#pmLinks"); lk.innerHTML = "";
  p.links.forEach(([k, label, href]) => { const a = document.createElement("a"); a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer"; a.className = k === "live" ? "ov-live" : "ov-git"; a.textContent = label; lk.appendChild(a); });
}
function openProject(key) {
  const p = PROJECTS[key]; if (!p) return; pmKey = key;
  pmTrack.innerHTML = ""; pmDots.innerHTML = "";
  p.shots.forEach((src, k) => {
    const im = new Image(); im.src = src; im.alt = p.title + " screenshot " + (k + 1); im.draggable = false; pmTrack.appendChild(im);
    const d = document.createElement("i"); d.addEventListener("click", () => pmGo(k)); pmDots.appendChild(d);
  });
  pmSlider.classList.toggle("single", p.shots.length < 2);
  pmFill(); pmGo(0); pm.classList.add("active"); document.body.style.overflow = "hidden"; pm.scrollTop = 0; $(".pm-box", pm).scrollTop = 0;
}
function closeProject() { pm.classList.remove("active"); document.body.style.overflow = ""; pmKey = null; }
$("#pmPrev").addEventListener("click", () => pmGo(pmIdx - 1));
$("#pmNext").addEventListener("click", () => pmGo(pmIdx + 1));
$("#pmClose").addEventListener("click", closeProject);
pm.addEventListener("click", e => { if (e.target === pm) closeProject(); });
let sx = null;
pmSlider.addEventListener("pointerdown", e => { sx = e.clientX; });
pmSlider.addEventListener("pointerup", e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) pmGo(pmIdx + (dx < 0 ? 1 : -1)); });
document.addEventListener("keydown", e => {
  if (!pm.classList.contains("active")) return;
  if (e.key === "Escape") closeProject(); if (e.key === "ArrowLeft") pmGo(pmIdx - 1); if (e.key === "ArrowRight") pmGo(pmIdx + 1);
});
$$(".project-card").forEach(c => c.addEventListener("click", e => { if (e.target.closest(".project-overlay a")) return; openProject(c.dataset.project); }));
langHooks.push(pmFill);

/* ===== CERTIFICATE MODAL ===== */
const modal = document.getElementById("certificateModal"), modalImage = document.getElementById("modalImage");
function closeModal() { modal.classList.remove("active"); document.body.style.overflow = ""; }
const cert3d = document.getElementById("cert3d"), certScene = document.getElementById("certScene"), certBack = document.getElementById("certBack");
let cry = 0, crx = 0, cty = 0, ctx3 = 0, cdrag = false, clx = 0, cly = 0, cRun = false;
function certLoop() {
  if (!modal.classList.contains("active")) { cRun = false; return; }
  if (!cdrag) { cry += (cty - cry) * .12; crx += (ctx3 - crx) * .12; }
  if (cert3d) cert3d.style.transform = `rotateX(${crx}deg) rotateY(${cry}deg)`;
  requestAnimationFrame(certLoop);
}
function openCert(card, src) {
  modalImage.src = src;
  const ti = card.querySelector("h3").textContent, i = card.querySelector(".certificate-content p").textContent,
    d = card.querySelector(".certificate-date").textContent;
  if (certBack) certBack.innerHTML = `<div class="cb-badge">✔ VERIFIED</div><h3>${ti}</h3><p>${i}</p><span>${d}</span>` +
    `<div class="cb-id">Issued to: HANIF</div><div class="cb-bar"></div><div class="cb-logo">&lt;HANIF/&gt;</div>`;
  cry = crx = cty = ctx3 = 0;
  modal.classList.add("active"); document.body.style.overflow = "hidden";
  if (!cRun) { cRun = true; certLoop(); }
}
if (certScene) {
  certScene.addEventListener("pointerdown", e => { cdrag = true; clx = e.clientX; cly = e.clientY; certScene.setPointerCapture(e.pointerId); certScene.classList.add("drag"); });
  certScene.addEventListener("pointermove", e => {
    if (!cdrag) return;
    cry += (e.clientX - clx) * .45; crx = Math.max(-35, Math.min(35, crx - (e.clientY - cly) * .3));
    clx = e.clientX; cly = e.clientY;
  });
  const certRelease = () => { if (!cdrag) return; cdrag = false; certScene.classList.remove("drag"); cty = Math.round(cry / 180) * 180; ctx3 = 0; };
  certScene.addEventListener("pointerup", certRelease); certScene.addEventListener("pointercancel", certRelease);
  const certFlip = () => { cty = (Math.round(cry / 180) + 1) * 180; ctx3 = 0; };
  certScene.addEventListener("dblclick", certFlip);
  const flipBtn = document.getElementById("certFlip"); if (flipBtn) flipBtn.addEventListener("click", certFlip);
}
$$(".view-certificate").forEach(b => b.addEventListener("click", () => openCert(b.closest(".certificate-card"), b.dataset.image)));
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
$$(".certificate-image img").forEach(img => img.addEventListener("click", () => openCert(img.closest(".certificate-card"), img.src)));

/* ===== HERO GREETING TYPING (after intro) ===== */
function onReady(fn) {
  if (document.body.classList.contains("ready")) return fn();
  const mo = new MutationObserver(() => { if (document.body.classList.contains("ready")) { mo.disconnect(); fn(); } });
  mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
}
onReady(() => setTimeout(() => {
  const el = document.getElementById("hello"), txt = '> console.log("Hello, World!");'; let i = 0;
  (function run() { el.textContent = txt.slice(0, ++i) + (i < txt.length ? "▍" : ""); if (i < txt.length) setTimeout(run, 70); })();
}, 900));

/* ===== GITHUB LIVE STATS ===== */
(async () => {
  const note = $("#ghNote"), langsBox = $("#ghLangs"), graph = $("#ghGraph");
  const fail = () => { note.innerHTML = ""; note.append(t("gh_fail") + " "); const a = document.createElement("a"); a.href = GIT; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = "github.com/" + GH_USER; note.appendChild(a); };
  langHooks.push(() => { if (note.dataset.failed) fail(); });
  graph.src = `https://ghchart.rshah.org/00ff9c/${GH_USER}`; graph.onerror = () => graph.hidden = true;
  try {
    const api = "https://api.github.com/";
    const [u, r, ev] = await Promise.all([
      fetch(api + "users/" + GH_USER), fetch(api + "users/" + GH_USER + "/repos?per_page=100"), fetch(api + "users/" + GH_USER + "/events/public?per_page=100")
    ]);
    if (!u.ok || !r.ok) throw new Error("api " + u.status);
    const user = await u.json(), repos = (await r.json()).filter(x => !x.fork), events = ev.ok ? await ev.json() : [];
    countTo($("#ghRepos"), user.public_repos); countTo($("#ghFollow"), user.followers);
    const since = Date.now() - 30 * 864e5;
    const commits = events.filter(e => e.type === "PushEvent" && new Date(e.created_at) > since)
      .reduce((s, e) => s + (e.payload.size ?? e.payload.commits?.length ?? 1), 0);
    countTo($("#ghCommits"), commits);
    const count = {}; repos.forEach(x => { if (x.language) count[x.language] = (count[x.language] || 0) + 1; });
    const tot = Object.values(count).reduce((a, b) => a + b, 0), top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (!top.length) note.textContent = t("gh_none");
    top.forEach(([name, n]) => {
      const pct = Math.round(n / tot * 100), d = document.createElement("div"); d.className = "skill";
      d.innerHTML = '<div class="skill-header"><span></span><span>' + pct + '%</span></div><div class="skill-bar"><div class="skill-progress"></div></div>';
      d.querySelector("span").textContent = name; langsBox.appendChild(d);
      requestAnimationFrame(() => requestAnimationFrame(() => d.querySelector(".skill-progress").style.width = pct + "%"));
    });
  } catch (err) { console.warn("GitHub stats:", err); note.dataset.failed = 1; fail(); }
})();

/* ===== INTERACTIVE TERMINAL ===== */
(() => {
  const out = $("#termOut"), inp = $("#termIn"), body = $("#termBody"), chips = $("#termChips");
  const hist = []; let hi = 0;
  const print = (txt, cls = "") => { const d = document.createElement("div"); d.className = "tl " + cls; d.textContent = txt; out.appendChild(d); body.scrollTop = body.scrollHeight; return d; };
  const link = (label, url) => { const d = print(label + " "); const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = url; d.appendChild(a); };
  const sec = id => document.getElementById(id);
  const cmds = {
    help() { print(t("tm_help"), "hd"); },
    about() { print(t("about_p1"), "ok"); print(t("about_p2")); },
    whoami() { print("hanif — " + t("job_val") + " @ Universitas Sriwijaya", "ok"); },
    skills() { $$(".tech span").forEach(s => print("  [✔] " + s.textContent)); print("→ " + t("learning") + ": " + $$(".learn-card .skill-header span:first-child").map(s => s.textContent).join(", "), "hd"); },
    education() { $$(".timeline-content", sec("education")).forEach(c => { print(c.querySelector("span").textContent + "  " + c.querySelector("h3").textContent, "ok"); }); },
    projects() { Object.entries(PROJECTS).forEach(([k, p], i) => print(`${i + 1}. ${p.title}  [${p.tech.join(", ")}]   → open ${k}`)); },
    open(a) { const k = (a[0] || "").toLowerCase(); if (!PROJECTS[k]) return print("usage: open <" + Object.keys(PROJECTS).join("|") + ">", "err"); print("opening " + PROJECTS[k].title + " ...", "ok"); openProject(k); },
    certs() { $$(".certificate-card").forEach(c => print(`  🏆 ${c.querySelector("h3").textContent} — ${c.querySelector(".certificate-date").textContent}`)); },
    github() { link("GitHub:", GIT); print("Repo: " + $("#ghRepos").textContent + " | Followers: " + $("#ghFollow").textContent); },
    contact() { print("Email: " + MY_EMAIL, "ok"); link("GitHub:", GIT); link("Instagram:", "https://www.instagram.com/hanifalfarizie/"); },
    lang() { setLang(lang === "id" ? "en" : "id"); print(t("tm_lang"), "ok"); },
    ls() { print("about  skills  education  projects  certs  contact  github", "hd"); },
    date() { print(new Date().toString()); },
    sudo() { print("hanif is not in the sudoers file. This incident will be reported 😄", "err"); },
    clear() { out.innerHTML = ""; }
  };
  function run(raw) {
    const line = raw.trim(); if (!line) return;
    print("hanif@portfolio:~$ " + line, "cmd"); hist.push(line); hi = hist.length;
    const [c, ...a] = line.split(/\s+/), fn = cmds[c.toLowerCase()];
    if (fn && Object.hasOwn(cmds, c.toLowerCase())) fn(a); else print(c + ": " + t("tm_unknown"), "err");
  }
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") { run(inp.value); inp.value = ""; }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) inp.value = hist[--hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); inp.value = ++hi < hist.length ? hist[hi] : (hi = hist.length, ""); }
    else if (e.key === "Tab") { e.preventDefault(); const m = Object.keys(cmds).filter(k => k.startsWith(inp.value.toLowerCase())); if (m.length === 1) inp.value = m[0]; }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); cmds.clear(); }
  });
  body.addEventListener("click", () => { if (!getSelection().toString()) inp.focus({ preventScroll: true }); });
  ["help", "about", "skills", "projects", "education", "certs", "contact", "github", "clear"].forEach(c => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = c; b.addEventListener("click", () => run(c)); chips.appendChild(b);
  });
  print("HANIF-OS v1.0 — " + t("tm_welcome"), "ok");
})();

/* ===== CONTACT FORM ===== */
document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, status = document.getElementById("formStatus"), btn = form.querySelector("button");
  const n = $("#fname").value.trim(), em = $("#femail").value.trim(), m = $("#fmsg").value.trim();
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" + MY_EMAIL +
    "&su=" + encodeURIComponent("Pesan dari " + n) +
    "&body=" + encodeURIComponent(m + "\n\nNama: " + n + "\nEmail: " + em);
  const fail = reason => {
    status.style.color = "#ff6b6b"; status.textContent = reason + " ";
    const a = document.createElement("a"); a.href = gmailUrl; a.target = "_blank"; a.rel = "noopener noreferrer"; a.style.color = "#22d3ee"; a.textContent = t("s_gmail"); status.appendChild(a);
  };
  btn.disabled = true; btn.textContent = t("s_sending"); status.style.color = ""; status.textContent = "";
  try {
    const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST", signal: ctrl.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: "Pesan portfolio dari " + n, from_name: n, name: n, email: em, message: m })
    });
    clearTimeout(timer);
    const data = await res.json();
    if (data.success) { status.textContent = t("s_ok"); form.reset(); }
    else fail(t("s_fail") + ": " + (data.message || "error") + ".");
  } catch (err) {
    console.error(err);
    fail(location.protocol === "file:" ? t("s_file") : t("s_net"));
  }
  btn.disabled = false; btn.textContent = t("btn_send");
});

/* ===== BACK TO TOP ===== */
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 500), { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ===== CUSTOM CURSOR ===== */
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document.body.classList.add("cc");
  const dot = $(".cur-dot"), ring = $(".cur-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  const place = (el, x, y) => el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
  addEventListener("pointermove", e => {
    mx = e.clientX; my = e.clientY; place(dot, mx, my);
    ring.classList.toggle("hov", !!e.target.closest("a,button,.tech,input,textarea,.project-card,.certificate-card,.term-body,.pm-dots i"));
  });
  $(".id-card").addEventListener("pointerenter", () => ring.classList.add("grab"));
  $(".id-card").addEventListener("pointerleave", () => ring.classList.remove("grab"));
  (function follow() { rx += (mx - rx) * .18; ry += (my - ry) * .18; place(ring, rx, ry); requestAnimationFrame(follow); })();
}

/* ===== INIT BAHASA (jalankan terakhir) ===== */
if (lang === "en") applyLang();