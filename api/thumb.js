module.exports=async function(req,res){
  if(req.method!=="GET") return res.status(405).end();
  const raw=req.query?.url;
  if(!raw) return res.status(400).end("Missing image URL");
  let url;
  try{
    url=decodeURIComponent(raw);
    const u=new URL(url);
    if(!["https:","http:"].includes(u.protocol) || !u.hostname.endsWith("rbxcdn.com"))
      return res.status(403).end("Invalid image host");
  }catch{return res.status(400).end("Invalid image URL")}
  try{
    const r=await fetch(url,{headers:{"User-Agent":"PRABU-ROBLOX-HUB/1.0"}});
    if(!r.ok) return res.status(r.status).end();
    const type=r.headers.get("content-type")||"image/png";
    const buf=Buffer.from(await r.arrayBuffer());
    res.setHeader("Content-Type",type);
    res.setHeader("Cache-Control","public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).send(buf);
  }catch(e){
    console.error(e);
    return res.status(502).end();
  }
};
