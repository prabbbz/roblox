// ===== KONFIGURASI: ganti sesuai akunmu =====
const CONFIG = {
  name: "ReyyYuzora",
  username: "prabbbz",
  userId: "9164965658",
  profile: "https://www.roblox.com/id/users/9164965658/profile",
  avatar: "https://tr.rbxcdn.com/30DAY-Avatar-B28BC904C94890749D2E74CC5E058125-Png/352/352/Avatar/Png/noFilter",
 discord: "https://discord.gg/pe3tb2dZCU",

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
document.querySelectorAll("article[data-optional]").forEach(a => { if (!CONFIG.discord) a.remove(); });
const ava = $("ava"); ava.src = CONFIG.avatar; ava.onerror = () => ava.style.display = "none";

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
        ${g.visits ? `<span class="meta"><svg class="i"><use href="#i-eye"/></svg>${Number(g.visits).toLocaleString("id-ID")} kunjungan</span>` : ""}
        <a class="btn sm" href="${esc(g.url)}" target="_blank" rel="noopener"><svg class="i f"><use href="#i-play"/></svg>Mainkan</a>
      </div>
    </article>`).join("") : `<p class="empty">Belum ada game yang ditampilkan.</p>`;
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
    games = d.map(g => ({ name: g.name, desc: g.description, url: "https://www.roblox.com/games/" + g.rootPlace.id, visits: g.placeVisits, img: icons[g.id] || "" }));
    render();
  } catch { /* gagal: tetap pakai daftar manual */ }
}
loadGames();

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
    { t: "Discord", s: "Gabung komunitas & dapat info update", u: CONFIG.discord, i: "discord" },
    { t: "TikTok", s: "Cuplikan gameplay & pengumuman", u: "", i: "tiktok" },
    { t: "YouTube", s: "Video dan trailer game", u: "", i: "youtube" },
    { t: "Instagram", s: "Foto dan cerita sehari-hari", u: "", i: "instagram" },
    { t: "WhatsApp", s: "Chat langsung untuk kerja sama", u: "", i: "whatsapp" }
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
  try { await navigator.clipboard.writeText(url); bioMsg("Link bio disalin"); } catch { bioMsg("Salin dari address bar ya"); }
};
if (location.hash === "#bio") openBio();
