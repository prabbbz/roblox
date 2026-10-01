const USER_ID = "9164965658";

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "PRABU-ROBLOX-HUB/1.0" },
      signal: controller.signal,
    });
    if (!r.ok) throw new Error(`Roblox ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const gamesUrl = `https://games.roblox.com/v2/users/${USER_ID}/games?accessFilter=Public&sortOrder=Asc&limit=50`;
    const json = await fetchJson(gamesUrl);
    const games = (json.data || []).filter(g => g.isPlayable !== false);

    // Thumbnails are fetched server-side so the browser does not have to call
    // Roblox directly (avoids CORS/network issues on the deployed site).
    const ids = games.map(g => g.universeId).filter(Boolean);
    const media = {};

    if (ids.length) {
      const q = ids.join(",");
      const [thumb, icon] = await Promise.allSettled([
        fetchJson(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${q}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`),
        fetchJson(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${q}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`),
      ]);

      if (thumb.status === "fulfilled") {
        for (const item of thumb.value.data || []) {
          media[item.universeId] = media[item.universeId] || {};
          media[item.universeId].thumb = item.thumbnails?.[0]?.imageUrl || "";
        }
      }
      if (icon.status === "fulfilled") {
        for (const item of icon.value.data || []) {
          media[item.targetId] = media[item.targetId] || {};
          media[item.targetId].icon = item.imageUrl || "";
        }
      }
    }

    const output = games.map(g => ({
      ...g,
      media: media[g.universeId] || {},
    }));

    return res.status(200).json({ data: output, count: output.length, source: "Roblox public experiences API" });
  } catch (error) {
    console.error(error);
    return res.status(502).json({
      error: "Roblox data could not be loaded",
      detail: String(error?.message || error),
    });
  }
};
