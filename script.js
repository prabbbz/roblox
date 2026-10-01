// ===== KONFIGURASI: ganti sesuai akunmu =====
const CONFIG = {
  name: "ReyyYuzora",
  username: "prabbbz",
  userId: "9164965658",
  profile: "https://www.roblox.com/id/users/9164965658/profile",
  avatar: "https://tr.rbxcdn.com/30DAY-Avatar-B28BC904C94890749D2E74CC5E058125-Png/352/352/Avatar/Png/noFilter",
  discord: "", // isi link Discord, kosongkan untuk menyembunyikan

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
      <div class="cover">🎮${g.img ? `<img src="${esc(g.img)}" alt="${esc(g.name)}" loading="lazy" onerror="this.remove()">` : ""}</div>
      <div class="gbody">
        ${g.genre ? `<small>${esc(g.genre)}</small>` : ""}
        <h3>${esc(g.name)}</h3>
        <p>${esc((g.desc || "").slice(0, 140))}${(g.desc || "").length > 140 ? "…" : ""}</p>
        ${g.visits ? `<span class="meta">${Number(g.visits).toLocaleString("id-ID")} kunjungan</span>` : ""}
        <a class="btn sm" href="${esc(g.url)}" target="_blank" rel="noopener">Mainkan</a>
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
