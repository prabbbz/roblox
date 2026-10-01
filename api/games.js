const USER_ID = "9164965658";

async function fetchJson(url){
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(),12000);
  try{
    const r=await fetch(url,{signal:controller.signal});
    if(!r.ok) throw new Error(`Roblox ${r.status}`);
    return await r.json();
  }finally{clearTimeout(timer)}
}

function firstThumb(item){
  return item?.thumbnails?.[0]?.imageUrl || item?.thumbnails?.[0]?.imageUrl || "";
}

module.exports=async function(req,res){
  res.setHeader("Cache-Control","s-maxage=60, stale-while-revalidate=300");
  res.setHeader("Access-Control-Allow-Origin","*");
  if(req.method!=="GET") return res.status(405).json({error:"Method not allowed"});
  try{
    const gamesUrl=`https://games.roblox.com/v2/users/${USER_ID}/games?accessFilter=Public&sortOrder=Asc&limit=50`;
    const json=await fetchJson(gamesUrl);
    const games=(json.data||[]).filter(g=>g.isPlayable!==false);
    const ids=games.map(g=>g.universeId).filter(Boolean);
    const media={};

    if(ids.length){
      const q=ids.join(",");
      const [thumb,icon]=await Promise.allSettled([
        fetchJson(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${q}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`),
        fetchJson(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${q}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`)
      ]);

      if(thumb.status==="fulfilled"){
        for(const item of (thumb.value.data||[])){
          const u=firstThumb(item);
          if(u){
            media[item.universeId] ||= {};
            media[item.universeId].thumb=u;
            media[item.universeId].thumbProxy=`/api/thumb?url=${encodeURIComponent(u)}`;
          }
        }
      }
      if(icon.status==="fulfilled"){
        for(const item of (icon.value.data||[])){
          if(item.imageUrl){
            media[item.targetId] ||= {};
            media[item.targetId].icon=item.imageUrl;
            media[item.targetId].iconProxy=`/api/thumb?url=${encodeURIComponent(item.imageUrl)}`;
          }
        }
      }
    }

    const output=games.map(g=>({...g,media:media[g.universeId]||{}}));
    return res.status(200).json({data:output,count:output.length,source:"Roblox public experiences API"});
  }catch(error){
    console.error(error);
    return res.status(502).json({error:"Roblox data could not be loaded",detail:String(error?.message||error)});
  }
};
