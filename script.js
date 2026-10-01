// ===== KONFIGURASI: ganti sesuai akunmu =====
const CONFIG = {
  name: "ReyyYuzora",
  username: "prabbbz",
  userId: "9164965658",
  profile: "https://www.roblox.com/id/users/9164965658/profile",
  avatar: "https://tr.rbxcdn.com/30DAY-Avatar-B28BC904C94890749D2E74CC5E058125-Png/352/352/Avatar/Png/noFilter",
  discord: "https://discord.gg/pe3tb2dZCU",

  // Alamat web MainYuk (mis. "https://nama-mainyuk.vercel.app/"). Kosong = tombol tampil "Segera".
  mainyuk: "https://mbg-kiw-kiw.vercel.app/",

  // true = daftar game diambil otomatis dari akun Roblox (lewat roproxy).
  // Kalau gagal / kamu mau atur sendiri, set false dan edit daftar di bawah.
  autoFetch: true,

  // Daftar manual (contoh, ganti dengan gamemu). img boleh dikosongkan.
  games: [
    { name: "Nama Game 1", desc: "Ganti dengan deskripsi singkat gamemu.", url: "https://www.roblox.com/id/users/9164965658/profile", genre: "Contoh", visits: 0, img: "" },
    { name: "Nama Game 2", desc: "Ganti dengan deskripsi singkat gamemu.", url: "https://www.roblox.com/id/users/9164965658/profile", genre: "Contoh", visits: 0, img: "" }
  ]
};

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
CONFIG.nameUpper = CONFIG.name.toUpperCase();

document.querySelectorAll("[data-text]").forEach(e => e.textContent = CONFIG[e.dataset.text]);
document.querySelectorAll("[data-href]").forEach(e => {
  const v = CONFIG[e.dataset.href];
  if (v) e.href = v;
  else if (e.hasAttribute("data-optional")) e.hidden = true;
});
document.querySelectorAll("[data-href=mainyuk]").forEach(e => { if (!CONFIG.mainyuk) { e.removeAttribute("href"); e.removeAttribute("target"); e.classList.add("off"); e.setAttribute("aria-disabled", "true"); } });
document.querySelectorAll("article[data-optional]").forEach(a => { if (!CONFIG.discord) a.remove(); });
const ava = $("ava"); ava.src = CONFIG.avatar; ava.onerror = () => ava.style.display = "none";

// ===== Bahasa (ID/EN) =====
const EN = {"Selain game Roblox, aku juga bikin MainYuk: kumpulan game browser gratis yang bisa langsung dimainkan tanpa unduh.": "Besides Roblox games, I also made MainYuk: a collection of free browser games you can play instantly, no download needed.", "Pilih game favoritmu, klik kotaknya, dan langsung main di browser. Bisa dicari lewat kategori atau diacak.": "Pick your favorite game, click its tile, and play right in your browser. Browse by category or shuffle.", "Gratis dan tanpa unduh": "Free, no download", "Banyak kategori game": "Lots of game categories", "Bisa di HP, tablet, dan PC": "Works on phone, tablet, and PC", "Buka MainYuk": "Open MainYuk", "Segera": "Soon", "Tentang": "About", "Kontak": "Contact", "Profil Roblox": "Roblox Profile", "Lihat Game": "View Games", "Kumpulan game Roblox buatan sendiri. Pilih game favoritmu, klik Mainkan, dan langsung masuk lewat Roblox.": "Roblox games I built myself. Pick your favorite, hit Play, and jump in through Roblox.", "Game": "Games", "Total Kunjungan": "Total Visits", "Sedang Main": "Playing Now", "Gratis Dimainkan": "Free to Play", "Developer game Roblox · @": "Roblox game developer · @", "Buka Profil": "Open Profile", "Game Buatanku": "My Games", "DAFTAR GAME": "GAME LIST", "Semua game Roblox yang sudah kubuat. Klik Mainkan untuk membukanya di Roblox.": "All the Roblox games I've made. Click Play to open them on Roblox.", "Memuat game…": "Loading games…", "KENAPA MAIN?": "WHY PLAY?", "Game dibuat di Roblox Studio dan bisa langsung dimainkan tanpa instalasi tambahan selain aplikasi Roblox.": "Games are built in Roblox Studio and play instantly, with nothing to install besides the Roblox app.", "Mainkan Langsung": "Play Instantly", "Satu klik dari website ini membuka game di aplikasi Roblox atau browser.": "One click from this site opens the game in the Roblox app or your browser.", "Banyak Perangkat": "Any Device", "Roblox tersedia di HP, PC, dan konsol, jadi kamu bisa bermain dari perangkat apa saja.": "Roblox runs on mobile, PC, and console, so you can play on whatever you have.", "Saran Diterima": "Feedback Welcome", "Punya ide atau menemukan bug? Kirim lewat Discord atau komentar di halaman game.": "Got an idea or found a bug? Send it via Discord or comment on the game page.", "TERHUBUNG DENGANKU": "GET IN TOUCH", "Ikuti profil Roblox-ku agar tidak ketinggalan game baru.": "Follow my Roblox profile so you never miss a new game.", "PROFIL ROBLOX": "ROBLOX PROFILE", "Lihat semua game, tambah teman, dan ikuti akun Roblox-ku.": "See all my games, add me as a friend, and follow my Roblox account.", "Komunitas": "Community", "SERVER DISCORD": "DISCORD SERVER", "Ngobrol dengan pemain lain, laporkan bug, dan dapatkan info update game.": "Chat with other players, report bugs, and get game update news.", "Kumpulan game Roblox buatan komunitas Indonesia.": "Roblox games from the Indonesian community.", ". Situs ini tidak berafiliasi dengan Roblox Corporation. Roblox adalah merek dagang Roblox Corporation.": ". This site is not affiliated with Roblox Corporation. Roblox is a trademark of Roblox Corporation.", "Bagikan bio": "Share bio", "Tidak berafiliasi dengan Roblox Corporation atau Discord Inc.": "Not affiliated with Roblox Corporation or Discord Inc.", "Developer game Roblox. Mainkan game buatanku dan gabung komunitasnya!": "Roblox game developer. Play my games and join the community!", "Lihat semua game buatanku": "See all my games", "Website Game Roblox": "Roblox Games Website", "Daftar lengkap game & info update": "Full game list & update info", "Gabung komunitas & dapat info update": "Join the community & get updates", "Cuplikan gameplay & pengumuman": "Gameplay clips & announcements", "Video dan trailer game": "Game videos & trailers", "Foto dan cerita sehari-hari": "Photos & daily stories", "Chat langsung untuk kerja sama": "Chat directly for collaborations", "Segera": "Soon", "Mainkan": "Play", "Belum ada game yang ditampilkan.": "No games to show yet.", "bermain": "playing", "suka": "liked", "kunjungan": "visits", "Update": "Updated", "hari ini": "today", "hari": "day", "bulan": "month", "tahun": "year", "Link bio disalin": "Bio link copied", "Salin dari address bar ya": "Copy it from the address bar"};
let lang = "id";
try { lang = localStorage.getItem("lang") || ((navigator.language || "id").startsWith("id") ? "id" : "en"); } catch {}
const T = k => (lang === "en" && EN[k]) || k;
const ago = t => { const d = Math.floor((Date.now() - new Date(t)) / 864e5); if (d < 1) return T("hari ini"); const n = d < 30 ? d : d < 365 ? Math.floor(d / 30) : Math.floor(d / 365), u = d < 30 ? "hari" : d < 365 ? "bulan" : "tahun"; return lang === "en" ? `${n} ${EN[u]}${n > 1 ? "s" : ""} ago` : `${n} ${u} lalu`; };
const stat = g => `<div class="gstat" data-u="${esc(g.id || "")}">${[
  g.playing != null && `<span class="meta on">${g.playing.toLocaleString("id-ID")} ${T("bermain")}</span>`,
  g.like != null && `<span class="meta">${g.like}% ${T("suka")}</span>`,
  g.visits && `<span class="meta"><svg class="i"><use href="#i-eye"/></svg>${Number(g.visits).toLocaleString("id-ID")} ${T("kunjungan")}</span>`,
  g.updated && `<span class="meta">${T("Update")} ${ago(g.updated)}</span>`
].filter(Boolean).join("")}</div>`;

let games = CONFIG.games;
function render() {
  const list = $("gameList");
  list.innerHTML = games.length ? games.map(g => `
    <article class="card gcard">
      <div class="cover"><svg class="i big"><use href="#i-pad"/></svg>${g.img ? `<img src="${esc(g.img)}" alt="${esc(g.name)}" loading="lazy" onerror="this.remove()">` : ""}</div>
      <div class="gbody">
        ${g.genre ? `<small>${esc(g.genre)}</small>` : ""}
        <h3>${esc(g.name)}</h3>
        <p>${esc((g.desc || "").slice(0, 140))}${(g.desc || "").length > 140 ? "…" : ""}</p>
        ${stat(g)}
        <a class="btn sm" href="${esc(g.url)}" target="_blank" rel="noopener"><svg class="i f"><use href="#i-play"/></svg>${T("Mainkan")}</a>
      </div>
    </article>`).join("") : `<p class="empty">${T("Belum ada game yang ditampilkan.")}</p>`;
  const total = games.reduce((a, g) => a + (Number(g.visits) || 0), 0);
  $("stGames").textContent = games.length;
  $("stVisits").textContent = total.toLocaleString("id-ID");
  $("stVisWrap").hidden = !total;
}
render();

async function loadGames() {
  if (!CONFIG.autoFetch) return;
  try {
    const ctl = new AbortController(); setTimeout(() => ctl.abort(), 8000);
    const r = await fetch(`https://games.roproxy.com/v2/users/${CONFIG.userId}/games?accessFilter=2&limit=50&sortOrder=Desc`, { signal: ctl.signal });
    const d = (await r.json()).data || [];
    if (!d.length) return;
    const icons = {};
    try {
      const t = await (await fetch(`https://thumbnails.roproxy.com/v1/games/icons?universeIds=${d.map(g => g.id).join(",")}&size=256x256&format=Png&isCircular=false`)).json();
      (t.data || []).forEach(x => icons[x.targetId] = x.imageUrl);
    } catch {}
    games = d.map(g => ({ name: g.name, desc: g.description, url: "https://www.roblox.com/games/" + g.rootPlace.id, visits: g.placeVisits, updated: g.updated, id: g.id, img: icons[g.id] || "" }));
    render(); loadLive(); setInterval(loadLive, 60000);
  } catch { /* gagal: tetap pakai daftar manual */ }
}
loadGames();

// Statistik live: pemain aktif, kunjungan, dan persentase suka (diperbarui tiap 60 detik)
async function loadLive() {
  const ids = games.map(g => g.id).filter(Boolean).join(",");
  if (!ids) return;
  try {
    const u = "https://games.roproxy.com/v1/games";
    const [a, b] = await Promise.all([
      fetch(`${u}?universeIds=${ids}`).then(r => r.json()),
      fetch(`${u}/votes?universeIds=${ids}`).then(r => r.json()).catch(() => ({}))
    ]);
    const m = {}, v = {};
    (a.data || []).forEach(x => m[x.id] = x);
    (b.data || []).forEach(x => v[x.id] = x);
    games.forEach(g => {
      const x = m[g.id]; if (!x) return;
      g.playing = x.playing; g.visits = x.visits ?? g.visits;
      const t = v[g.id] ? v[g.id].upVotes + v[g.id].downVotes : 0;
      if (t) g.like = Math.round(v[g.id].upVotes / t * 100);
      const el = document.querySelector(`.gstat[data-u="${g.id}"]`); if (el) el.outerHTML = stat(g);
    });
    $("stLive").textContent = games.reduce((s, g) => s + (g.playing || 0), 0).toLocaleString("id-ID");
    $("stLiveWrap").hidden = false;
    $("stVisits").textContent = games.reduce((s, g) => s + (Number(g.visits) || 0), 0).toLocaleString("id-ID");
  } catch { /* gagal: statistik live disembunyikan */ }
}

$("burger").onclick = () => $("menu").classList.toggle("open");
const links = [...$("menu").querySelectorAll("a")];
links.forEach(a => a.onclick = () => $("menu").classList.remove("open"));
const secs = links.map(a => document.querySelector(a.getAttribute("href")));
function onScroll() {
  $("nav").classList.toggle("solid", scrollY > 30);
  let i = 0; secs.forEach((s, n) => { if (s.getBoundingClientRect().top < innerHeight * .4) i = n; });
  links.forEach((a, n) => a.classList.toggle("on", n === i));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// ===== LUXE: efek interaktif =====
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll(".sec .eyebrow, .sec h2, .sec .sub, .sec .card:not(.gcard)").forEach((e, i) => { e.classList.add("rv"); io.observe(e); });

function countUp(el) {
  const t = parseInt(el.textContent.replace(/\D/g, "")) || 0; let s = null;
  const f = ts => { s ??= ts; const p = Math.min((ts - s) / 1200, 1); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))).toLocaleString("id-ID"); if (p < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
function afterRender() {
  document.querySelectorAll(".gcard").forEach((c, i) => { c.classList.add("rv"); c.style.setProperty("--d", (i % 4) * .08 + "s"); io.observe(c); });
  const names = games.map(g => `<span>${esc(g.name)}</span>`).join("").repeat(6);
  $("mq").innerHTML = names;
  countUp($("stGames")); countUp($("stVisits"));
}
const _render = render; render = function () { _render(); afterRender(); };
afterRender();

const glow = $("glow"), bar = $("bar");
document.addEventListener("pointermove", e => {
  glow.style.setProperty("--mx", e.clientX + "px"); glow.style.setProperty("--my", e.clientY + "px");
  const c = e.target.closest && e.target.closest(".card"); if (!c) return;
  const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
  c.style.setProperty("--x", x + "px"); c.style.setProperty("--y", y + "px");
  if (c.classList.contains("gcard") && e.pointerType === "mouse") {
    c.style.setProperty("--rx", (.5 - y / r.height) * 8 + "deg"); c.style.setProperty("--ry", (x / r.width - .5) * 10 + "deg");
  }
});
document.addEventListener("pointerleave", e => {
  if (e.target.classList && e.target.classList.contains("gcard")) { e.target.style.setProperty("--rx", "0deg"); e.target.style.setProperty("--ry", "0deg"); }
}, true);
addEventListener("scroll", () => { bar.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`; }, { passive: true });

// ===== BIO (link-in-bio) — panel yang muncul dari tombol "Bio" di navbar =====
// Link dengan u kosong tampil redup + label "Segera". Isi u untuk mengaktifkan.
const BIO = {
  text: "Developer game Roblox. Mainkan game buatanku dan gabung komunitasnya!",
  // icon: roblox | discord | tiktok | youtube | instagram | whatsapp | pad
  links: [
    { t: "Profil Roblox", s: "Lihat semua game buatanku", u: CONFIG.profile, i: "roblox", featured: true },
    { t: "Website Game Roblox", s: "Daftar lengkap game & info update", u: location.href.split("#")[0], i: "pad", same: true },
    { t: "MainYuk", s: "Game online gratis, langsung main", u: CONFIG.mainyuk, i: "pad" },
    { t: "Discord", s: "Gabung komunitas & dapat info update", u: CONFIG.discord, i: "discord" },
    { t: "TikTok", s: "Cuplikan gameplay & pengumuman", u: "https://www.tiktok.com/@sueprabu_21?is_from_webapp=1&sender_device=pc", i: "tiktok" },
    { t: "YouTube", s: "Video dan trailer game", u: "", i: "youtube" },
    { t: "Instagram", s: "Foto dan cerita sehari-hari", u: "", i: "instagram" },
    { t: "WhatsApp", s: "Chat langsung untuk kerja sama", u: "https://wa.me/6287781781230", i: "whatsapp" }
  ]
};
const FILL = ["roblox", "discord", "tiktok", "youtube"];
const ic = n => `<svg class="i${FILL.includes(n) ? " b" : ""}"><use href="#i-${esc(n)}"/></svg>`;
$("bName").textContent = CONFIG.name; $("bUser").textContent = CONFIG.username; $("bBio").textContent = BIO.text;
const bAva = $("bAva"); bAva.src = CONFIG.avatar; bAva.onerror = () => bAva.style.visibility = "hidden";

$("bLinks").innerHTML = BIO.links.map((l, n) => {
  const inner = `<span class="lic">${ic(l.i)}</span><span class="lt"><b>${esc(l.t)}</b><small>${esc(l.s)}</small></span>` +
    (l.u ? `<svg class="i arr"><use href="#i-arrow"/></svg>` : `<span class="soon">Segera</span>`);
  const cls = "lk" + (l.featured ? " feat" : "") + (l.u ? "" : " off");
  return l.u ? `<a class="${cls}" style="--n:${n}" href="${esc(l.u)}"${l.same ? ' data-close' : ' target="_blank" rel="noopener"'}>${inner}</a>`
             : `<div class="${cls}" style="--n:${n}">${inner}</div>`;
}).join("");
const bioLive = BIO.links.filter(l => l.u && !l.featured && !l.same);
$("bSoc").innerHTML = bioLive.map(l => `<a href="${esc(l.u)}" target="_blank" rel="noopener" aria-label="${esc(l.t)}">${ic(l.i)}</a>`).join("");
$("bSoc").hidden = !bioLive.length;

const bioEl = $("bio"), bioToast = $("toast");
function bioMsg(m) { bioToast.textContent = m; bioToast.classList.add("on"); clearTimeout(bioMsg.t); bioMsg.t = setTimeout(() => bioToast.classList.remove("on"), 2200); }
function openBio() {
  $("menu").classList.remove("open");
  bioEl.classList.add("open"); bioEl.setAttribute("aria-hidden", "false"); bioEl.scrollTop = 0;
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", location.pathname + location.search + "#bio");
  $("bioX").focus({ preventScroll: true });
}
function closeBio() {
  bioEl.classList.remove("open"); bioEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (location.hash === "#bio") history.replaceState(null, "", location.pathname + location.search);
  $("bioBtn").focus({ preventScroll: true });
}
$("bioBtn").onclick = openBio;
$("bioX").onclick = closeBio;
bioEl.addEventListener("click", e => {
  if (e.target === bioEl || e.target.classList.contains("bio-bg") || e.target.classList.contains("bio-card") || e.target.closest("[data-close]")) closeBio();
});
addEventListener("keydown", e => { if (e.key === "Escape" && bioEl.classList.contains("open")) closeBio(); });
addEventListener("hashchange", () => { if (location.hash === "#bio") openBio(); else if (bioEl.classList.contains("open")) closeBio(); });
$("bShare").onclick = async () => {
  const url = location.href.split("#")[0] + "#bio";
  try { if (navigator.share) { await navigator.share({ title: CONFIG.name, url }); return; } } catch { return; }
  try { await navigator.clipboard.writeText(url); bioMsg(T("Link bio disalin")); } catch { bioMsg(T("Salin dari address bar ya")); }
};
if (location.hash === "#bio") openBio();


// ===== Tema terang/gelap, bahasa, widget Discord =====
const root = document.documentElement, tbtn = $("themeBtn");
function applyTheme(t) {
  root.dataset.theme = t; tbtn.textContent = t === "light" ? "☾" : "☀";
  tbtn.setAttribute("aria-label", t === "light" ? "Dark mode" : "Light mode");
  document.querySelector('meta[name="theme-color"]').content = t === "light" ? "#f5f6fb" : "#07080c";
}
applyTheme(root.dataset.theme || "dark");
tbtn.onclick = () => { const t = root.dataset.theme === "light" ? "dark" : "light"; applyTheme(t); try { localStorage.setItem("theme", t); } catch {} };

function applyLang() {
  root.lang = lang;
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; n = w.nextNode();) {
    const o = n._o ?? n.nodeValue, k = o.trim();
    if (EN[k]) { n._o = o; n.nodeValue = lang === "en" ? o.replace(k, () => EN[k]) : o; }
  }
  document.title = lang === "en" ? "ReyyYuzora — Roblox Games" : "ReyyYuzora — Game Roblox";
  document.querySelector('meta[name="description"]').content = lang === "en" ? "Roblox games made by ReyyYuzora. Play them right on Roblox." : "Kumpulan game Roblox buatan ReyyYuzora. Mainkan langsung di Roblox.";
  $("langBtn").textContent = lang === "en" ? "ID" : "EN";
}
$("langBtn").onclick = () => { lang = lang === "en" ? "id" : "en"; try { localStorage.setItem("lang", lang); } catch {} render(); applyLang(); };
applyLang();

const dw = $("dw");
if (dw && CONFIG.discord) fetch(`https://discord.com/api/v10/invites/${CONFIG.discord.split("/").pop().split("?")[0]}?with_counts=true`)
  .then(r => r.json()).then(d => {
    if (!d.approximate_member_count) return;
    dw.innerHTML = `<span><i></i><b>${(d.approximate_presence_count ?? 0).toLocaleString("id-ID")}</b> online</span><span><b>${d.approximate_member_count.toLocaleString("id-ID")}</b> member</span>`;
    dw.hidden = false;
  }).catch(() => {});
