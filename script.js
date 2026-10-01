const API="/api/games";
const PROFILE="https://www.roblox.com/users/9164965658/profile";
let games=[], filter="all";

const $=s=>document.querySelector(s);
const fmt=n=>new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(Number(n||0));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const safeUrl=u=>String(u||"").replace(/"/g,"%22");

async function fetchGames(){
  setLoading(true);
  try{
    const res=await fetch(`${API}?t=${Date.now()}`,{cache:"no-store"});
    const json=await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(json.detail||json.error||`HTTP ${res.status}`);
    games=(json.data||[]).filter(g=>g.isPlayable!==false);
    render();
    toast(`ROBLOX DATA LOADED • ${games.length} GAME${games.length===1?"":"S"}`);
  }catch(e){
    console.error(e); games=[];
    $("#featuredCard").innerHTML=`<div class="loading error"><p>ROBLOX DATA COULD NOT BE LOADED.<br><small>${esc(e.message||"Unknown error")}</small><br><button class="retry" onclick="fetchGames()">TRY AGAIN ↻</button></p></div>`;
    $("#gameGrid").innerHTML="";
    toast("ROBLOX DATA GAGAL DIMUAT");
  }finally{setLoading(false)}
}
function setLoading(on){
  $("#refresh").disabled=on;
  if(on){
    $("#featuredCard").innerHTML=`<div class="loading"><span></span><p>LOADING FEATURED GAME...</p></div>`;
    $("#gameGrid").innerHTML=`<div class="loading"><span></span><p>LOADING ROBLOX EXPERIENCES...</p></div>`;
  }
}
function render(){
  const q=$("#search").value.trim().toLowerCase();
  let list=games.filter(g=>(g.name+" "+(g.description||"")).toLowerCase().includes(q));
  if(filter==="popular") list.sort((a,b)=>(b.placeVisits||0)-(a.placeVisits||0));
  if(filter==="playing") list=list.filter(g=>(g.playing||0)>0).sort((a,b)=>(b.playing||0)-(a.playing||0));

  const totalVisits=games.reduce((s,g)=>s+(g.placeVisits||0),0);
  const totalPlaying=games.reduce((s,g)=>s+(g.playing||0),0);
  $("#gameCount").textContent=games.length;
  $("#heroCount").textContent=games.length+" GAMES";
  $("#totalVisits").textContent=fmt(totalVisits);
  $("#totalPlaying").textContent=fmt(totalPlaying);

  const hero=games.slice().sort((a,b)=>(b.playing||0)-(a.playing||0))[0];
  if(hero) renderFeatured(hero);

  $("#empty").hidden=list.length>0;
  $("#gameGrid").innerHTML=list.length?list.map(card).join(""):"";
}
function imageFor(g){return g.media?.thumbProxy||g.media?.thumb||g.media?.iconProxy||g.media?.icon||""}
function fallbackIcon(g){return g.media?.iconProxy||g.media?.icon||""}
function gameUrl(g){return `https://www.roblox.com/games/${encodeURIComponent(g.rootPlaceId)}`}
function imageMarkup(g,featured=false){
  const src=imageFor(g);
  const icon=fallbackIcon(g);
  const cls=featured?"featured-img":"";
  if(!src && !icon) return "";
  return `<img class="${cls}" src="${safeUrl(src||icon)}" data-fallback="${safeUrl(icon)}" alt="${esc(g.name)}" loading="${featured?"eager":"lazy"}" onerror="this.onerror=null;this.src=this.dataset.fallback||'';this.style.opacity='${src&&icon?'1':'0'}">`;
}
function card(g){
  const live=(g.playing||0)>0;
  return `<article class="game-card">
    <a href="${gameUrl(g)}" target="_blank" rel="noopener">
      <div class="thumb">${imageMarkup(g)}<span class="badge">${live?"● LIVE":"ROBLOX EXPERIENCE"}</span></div>
    </a>
    <div class="game-body">
      <h3 title="${esc(g.name)}">${esc(g.name)}</h3>
      <p>${esc(g.description||"Experience by ReyyYuzora.")}</p>
      <div class="meta"><span>PLAYING <b>${fmt(g.playing)}</b></span><span>VISITS <b>${fmt(g.placeVisits)}</b></span></div>
      <div class="game-footer"><span>UPDATED ${g.updated?new Date(g.updated).toLocaleDateString("id-ID"):"—"}</span><a class="play-small" href="${gameUrl(g)}" target="_blank" rel="noopener">PLAY ↗</a></div>
    </div>
  </article>`;
}
function renderFeatured(g){
  const img=imageFor(g), icon=fallbackIcon(g);
  const bg=img?`style="background-image:linear-gradient(90deg,rgba(3,5,7,.94),rgba(3,5,7,.2) 72%),linear-gradient(0deg,rgba(0,0,0,.85),transparent 55%),url('${safeUrl(img)}')"`:"";
  $("#featuredCard").innerHTML=`<article class="featured-card" ${bg}>
    <div class="featured-info"><span class="featured-badge">FEATURED EXPERIENCE</span><h3>${esc(g.name)}</h3>
    <p>${esc(g.description||"Explore this Roblox experience by ReyyYuzora.")}</p>
    <div class="featured-meta"><span>PLAYING <b>${fmt(g.playing)}</b></span><span>VISITS <b>${fmt(g.placeVisits)}</b></span></div></div>
    <a class="play" href="${gameUrl(g)}" target="_blank" rel="noopener">▶</a>
  </article>`;
  if(!img && icon) $("#featuredCard .featured-card").style.backgroundImage=`linear-gradient(90deg,rgba(3,5,7,.94),rgba(3,5,7,.2) 72%),url('${safeUrl(icon)}')`;
  if(img) $("#heroBg").style.backgroundImage=`linear-gradient(180deg,rgba(7,8,12,.42),rgba(7,8,12,.94)),url('${safeUrl(img)}')`;
  else if(icon) $("#heroBg").style.backgroundImage=`linear-gradient(180deg,rgba(7,8,12,.42),rgba(7,8,12,.94)),url('${safeUrl(icon)}')`;
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("on");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("on"),2500)}

$("#search").addEventListener("input",render);
$("#refresh").addEventListener("click",fetchGames);
$("#filters").addEventListener("click",e=>{if(!e.target.dataset.filter)return;filter=e.target.dataset.filter;document.querySelectorAll("#filters button").forEach(b=>b.classList.toggle("selected",b===e.target));render()});
$("#burger").addEventListener("click",()=>$("#menu").classList.toggle("open"));
document.querySelectorAll("#menu a").forEach(a=>a.addEventListener("click",()=>$("#menu").classList.remove("open")));
$("#copyProfile").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(PROFILE);toast("ROBLOX PROFILE LINK DISALIN")}catch{window.open(PROFILE,"_blank")}});
window.addEventListener("scroll",()=>{$("#nav").classList.toggle("solid",scrollY>30);const links=[...document.querySelectorAll("#menu a")];links.forEach(a=>a.classList.toggle("on",location.hash===a.getAttribute("href")))});
fetchGames();
setInterval(fetchGames,300000);
