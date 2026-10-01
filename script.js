const USER_ID="9164965658";
const API=`https://games.roblox.com/v2/users/${USER_ID}/games?accessFilter=Public&sortOrder=Asc&limit=50`;
const THUMBS="https://thumbnails.roblox.com/v1/games/multiget/thumbnails";
const ICONS="https://thumbnails.roblox.com/v1/games/icons";
let games=[], filter="all";

const $=s=>document.querySelector(s);
const fmt=n=>new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(Number(n||0));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

async function fetchGames(){
  $("#gameGrid").innerHTML=`<div class="loading"><span></span><p>LOADING ROBLOX EXPERIENCES...</p></div>`;
  $("#featured").innerHTML="";
  try{
    const res=await fetch(API,{cache:"no-store"});
    if(!res.ok) throw new Error("Roblox API error");
    const json=await res.json();
    games=(json.data||[]).filter(g=>g.isPlayable!==false);
    await loadThumbs();
    render();
  }catch(e){
    console.error(e);
    $("#gameGrid").innerHTML=`<div class="loading"><p>ROBLOX DATA COULD NOT BE LOADED.<br><br>Refresh the page and try again.</p></div>`;
    toast("ROBLOX DATA GAGAL DIMUAT");
  }
}

async function loadThumbs(){
  const ids=games.map(g=>g.universeId).filter(Boolean);
  if(!ids.length)return;
  const chunks=[];
  for(let i=0;i<ids.length;i+=50)chunks.push(ids.slice(i,i+50));
  const maps={};
  for(const chunk of chunks){
    try{
      const q=chunk.join(",");
      const [thumbRes,iconRes]=await Promise.all([
        fetch(`${THUMBS}?universeIds=${q}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`),
        fetch(`${ICONS}?universeIds=${q}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`)
      ]);
      const thumbs=thumbRes.ok?(await thumbRes.json()).data||[]:[];
      const icons=iconRes.ok?(await iconRes.json()).data||[]:[];
      thumbs.forEach(x=>maps[x.universeId]={thumb:x.thumbnails?.[0]?.imageUrl});
      icons.forEach(x=>maps[x.targetId]=Object.assign(maps[x.targetId]||{},{icon:x.imageUrl}));
    }catch{}
  }
  games.forEach(g=>{g.media=maps[g.universeId]||{}});
}

function render(){
  const q=$("#search").value.trim().toLowerCase();
  let list=games.filter(g=>(g.name+" "+(g.description||"")).toLowerCase().includes(q));
  if(filter==="popular") list.sort((a,b)=>(b.placeVisits||0)-(a.placeVisits||0));
  if(filter==="playing") list=list.filter(g=>(g.playing||0)>0).sort((a,b)=>(b.playing||0)-(a.playing||0));

  const totalVisits=games.reduce((s,g)=>s+(g.placeVisits||0),0);
  const totalPlaying=games.reduce((s,g)=>s+(g.playing||0),0);
  $("#gameCount").textContent=games.length; $("#heroGameCount").textContent=games.length;
  $("#totalVisits").textContent=fmt(totalVisits); $("#heroVisits").textContent=fmt(totalVisits);
  $("#totalPlaying").textContent=fmt(totalPlaying); $("#heroPlaying").textContent=fmt(totalPlaying);

  const hero=games.slice().sort((a,b)=>(b.playing||0)-(a.playing||0))[0];
  if(hero) renderFeatured(hero);

  $("#empty").hidden=list.length>0;
  if(!list.length){$("#gameGrid").innerHTML="";return}
  $("#gameGrid").innerHTML=list.map(card).join("");
}

function imageFor(g){
  return g.media?.thumb||g.media?.icon||"";
}
function gameUrl(g){
  return `https://www.roblox.com/games/${g.rootPlaceId}`;
}
function card(g){
  const img=imageFor(g);
  return `<article class="game-card">
    <a href="${gameUrl(g)}" target="_blank" rel="noopener">
      <div class="thumb" style="background-image:url('${img}')"><span class="badge">${g.playing>0?"● LIVE":"ROBLOX EXPERIENCE"}</span></div>
    </a>
    <div class="game-body">
      <h3 title="${esc(g.name)}">${esc(g.name)}</h3>
      <p>${esc(g.description||"Experience by ReyyYuzora.")}</p>
      <div class="meta"><span>PLAYING <b>${fmt(g.playing)}</b></span><span>VISITS <b>${fmt(g.placeVisits)}</b></span></div>
      <div class="game-footer"><span>UPDATED ${new Date(g.updated||Date.now()).toLocaleDateString("id-ID")}</span><a class="play-small" href="${gameUrl(g)}" target="_blank" rel="noopener">PLAY ↗</a></div>
    </div>
  </article>`;
}
function renderFeatured(g){
  const img=imageFor(g);
  $("#featured").innerHTML=`<article class="featured-card" style="background-image:url('${img}')">
    <div class="featured-info"><span class="featured-badge">FEATURED EXPERIENCE</span><h3>${esc(g.name)}</h3>
    <p>${esc(g.description||"Explore this Roblox experience by ReyyYuzora.")}</p>
    <div class="featured-meta"><span>PLAYING <b>${fmt(g.playing)}</b></span><span>VISITS <b>${fmt(g.placeVisits)}</b></span></div></div>
    <a class="play" href="${gameUrl(g)}" target="_blank" rel="noopener">▶</a>
  </article>`;
  const hero=$("#heroMedia");
  if(img) hero.style.backgroundImage=`linear-gradient(90deg,#05070a 0%,rgba(5,7,10,.78) 40%,rgba(5,7,10,.3)),linear-gradient(0deg,#07090d,transparent 45%),url("${img}")`;
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2000)}

$("#search").addEventListener("input",render);
$("#refresh").addEventListener("click",fetchGames);
$("#filters").addEventListener("click",e=>{if(!e.target.dataset.filter)return;filter=e.target.dataset.filter;document.querySelectorAll("#filters button").forEach(b=>b.classList.toggle("selected",b===e.target));render()});
$("#menu").addEventListener("click",()=>$("#mobileNav").classList.toggle("open"));
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>$("#mobileNav").classList.remove("open")));
window.addEventListener("scroll",()=>$("#topbar").classList.toggle("scrolled",scrollY>25));

fetchGames();
setInterval(fetchGames,300000);
