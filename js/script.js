/* ===== INTRO / LOADING SCREEN ===== */
(() => {
  const intro = document.getElementById("intro");
  if (!intro) { document.body.classList.remove("locked"); document.body.classList.add("ready"); return; }
  const log = document.getElementById("introLog"), fill = document.getElementById("introFill"), pct = document.getElementById("introPct");
  const lines = [[0, "> booting hanif.portfolio ..."], [25, "> loading modules: html, css, js, laravel, flutter"],
    [55, "> compiling projects ..."], [80, "> connecting to universe ..."], [100, "> access granted ✔"]];
  const DUR = 3200; let i = 0, done = false, start = performance.now();
  function finish() {
    if (done) return; done = true; fill.style.width = "100%"; pct.textContent = "100%";
    intro.classList.add("done");
    setTimeout(() => { document.body.classList.remove("locked"); document.body.classList.add("ready"); }, 700);
    setTimeout(() => intro.remove(), 2200);
  }
  function tick(now) {
    if (done) return;
    const t = Math.min((now - start) / DUR, 1), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, p = Math.round(e * 100);
    fill.style.width = p + "%"; pct.textContent = p + "%";
    while (i < lines.length && p >= lines[i][0]) { const d = document.createElement("div"); d.textContent = lines[i++][1]; log.appendChild(d); }
    if (t < 1) requestAnimationFrame(tick); else setTimeout(finish, 450);
  }
  requestAnimationFrame(tick);
  document.getElementById("introSkip").addEventListener("click", finish);
  setTimeout(finish, 8000);
})();

/* ===== CODE RAIN + FLOATING SYMBOLS (cursor reactive) ===== */
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

/* ===== LANYARD PHYSICS (verlet rope, drop-in intro, drag to move) ===== */
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
    cv.style.top = -TOP + "px"; cv.style.height = (H + TOP) + "px";   // canvas extends above for the fall
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
    if (!landed) {                         // anchor drops from above, bounces, settles
      av += .9; ay += av;
      if (ay >= 0) { ay = 0; if (av > 4) av = -av * .3; else { av = 0; landed = true; } }
    }
    for (let i = 1; i <= N; i++) {
      const p = pts[i], vx = (p.x - p.px) * .985, vy = (p.y - p.py) * .985;
      p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + .55;
    }
    const b = pts[N];
    if (dragging) {                        // drag card with pointer
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
    ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(ang);   // metal clip
    ctx.fillStyle = "#0b1f2c"; ctx.strokeStyle = "#00ff9c"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-12, -10, 24, 22, 5); ctx.fill(); ctx.stroke(); ctx.restore();
    card.style.transform = `translate(${a.x - CW / 2}px,${a.y}px) rotate(${ang}rad)`;
  }
  addEventListener("resize", init); init();
  (function loop() { step(); render(); requestAnimationFrame(loop); })();

  // start the fall once the intro has finished
  const go = () => setTimeout(() => { falling = true; }, 500);
  if (document.body.classList.contains("ready")) go();
  else {
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains("ready")) { mo.disconnect(); go(); }
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }
})();

/* ===== TYPING EFFECT ===== */
(() => {
  const el = document.getElementById("typing");
  const texts = ["Web Developer", "Mobile Developer", "UI Designer", "Tech Enthusiast"];
  let t = 0, c = 0, del = false;
  (function type() {
    const cur = texts[t];
    el.textContent = cur.substring(0, del ? --c : ++c);
    if (!del && c === cur.length) { del = true; return setTimeout(type, 1500); }
    if (del && c === 0) { del = false; t = (t + 1) % texts.length; }
    setTimeout(type, del ? 60 : 100);
  })();
})();

/* ===== EXTRA ANIMATIONS ===== */
document.querySelectorAll(".about-info,.tech-grid,.timeline,.projects-container,.certificate-container,.contact-list")
  .forEach(g => [...g.children].forEach((c, i) => { c.classList.add("stg"); c.style.setProperty("--i", i); }));

const progress = document.getElementById("progress"),
  navLinks = [...document.querySelectorAll(".nav-menu a")],
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

document.querySelectorAll(".project-card,.certificate-card").forEach(c => {
  c.addEventListener("mousemove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 10 + "deg");
    c.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 10 + "deg");
  });
  c.addEventListener("mouseleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
});

/* ===== SCROLL REVEAL & SKILLS ===== */
const reveals = document.querySelectorAll(".reveal"), bars = document.querySelectorAll(".skill-progress");
function onScroll() {
  const vh = innerHeight;
  reveals.forEach(el => { if (el.getBoundingClientRect().top < vh - 100) el.classList.add("active"); });
  bars.forEach(b => { if (b.getBoundingClientRect().top < vh - 100) b.style.width = b.dataset.width; });
}
addEventListener("scroll", onScroll); onScroll();

/* ===== MOBILE MENU ===== */
const menuToggle = document.querySelector(".menu-toggle"), navMenu = document.querySelector(".nav-menu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", open); menuToggle.textContent = open ? "✕" : "☰";
});
document.querySelectorAll(".nav-menu a").forEach(a => a.addEventListener("click", () => { navMenu.classList.remove("active"); menuToggle.textContent = "☰"; }));

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll(".filter-btn"), cards = document.querySelectorAll(".project-card"),
  cats = document.querySelectorAll(".project-category");
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.remove("active")); btn.classList.add("active");
  const f = btn.dataset.filter;
  cards.forEach(c => c.style.display = (f === "all" || c.dataset.category === f) ? "block" : "none");
  cats.forEach(cat => {
    const any = [...cat.querySelectorAll(".project-card")].some(c => c.style.display !== "none");
    cat.style.display = any ? "block" : "none";
  });
}));

/* ===== CERTIFICATE MODAL ===== */
const modal = document.getElementById("certificateModal"), modalImage = document.getElementById("modalImage");
function closeModal() { modal.classList.remove("active"); document.body.style.overflow = ""; }
document.querySelectorAll(".view-certificate").forEach(b => b.addEventListener("click", () => {
  modalImage.src = b.dataset.image; modal.classList.add("active"); document.body.style.overflow = "hidden";
}));
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });


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

/* ===== CERTIFICATE IMAGE -> LIGHTBOX ===== */
document.querySelectorAll(".certificate-image img").forEach(img => img.addEventListener("click", () => {
  modalImage.src = img.src; modal.classList.add("active"); document.body.style.overflow = "hidden";
}));

/* ===== CONTACT FORM ===== */
// Daftar gratis di https://web3forms.com, masukkan Gmail kamu, lalu tempel Access Key di bawah ini.
const WEB3FORMS_KEY = "d744de2c-91b5-470c-992f-b97916e36714";
const MY_EMAIL = "zaykayla575@gmail.com";

document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, status = document.getElementById("formStatus"), btn = form.querySelector("button");
  const n = document.getElementById("fname").value.trim(), em = document.getElementById("femail").value.trim(), m = document.getElementById("fmsg").value.trim();

  if (WEB3FORMS_KEY.startsWith("ISI_")) {          // belum ada key -> buka Gmail di tab baru
    open("https://mail.google.com/mail/?view=cm&fs=1&to=" + MY_EMAIL +
      "&su=" + encodeURIComponent("Pesan dari " + n) +
      "&body=" + encodeURIComponent(m + "\n\nNama: " + n + "\nEmail: " + em), "_blank");
    status.textContent = "Membuka Gmail di tab baru... ✔"; form.reset(); return;
  }

  btn.disabled = true; status.textContent = "Mengirim...";
  try {                                            // kirim langsung ke Gmail kamu
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: "Pesan portfolio dari " + n, name: n, email: em, message: m })
    });
    const data = await res.json();
    status.textContent = data.success ? "Pesan terkirim! Terima kasih 🙌" : "Gagal mengirim, coba lagi.";
    if (data.success) form.reset();
  } catch { status.textContent = "Gagal mengirim, periksa koneksi internet."; }
  btn.disabled = false;
});

/* ===== BACK TO TOP ===== */
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 500), { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ===== CUSTOM CURSOR (dot + magnetic ring) ===== */
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document.body.classList.add("cc");
  const dot = document.querySelector(".cur-dot"), ring = document.querySelector(".cur-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  const place = (el, x, y) => el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
  addEventListener("pointermove", e => {
    mx = e.clientX; my = e.clientY; place(dot, mx, my);
    ring.classList.toggle("hov", !!e.target.closest("a,button,.tech,input,textarea,.project-card,.certificate-card"));
  });
  document.querySelector(".id-card").addEventListener("pointerenter", () => ring.classList.add("grab"));
  document.querySelector(".id-card").addEventListener("pointerleave", () => ring.classList.remove("grab"));
  (function follow() { rx += (mx - rx) * .18; ry += (my - ry) * .18; place(ring, rx, ry); requestAnimationFrame(follow); })();
}