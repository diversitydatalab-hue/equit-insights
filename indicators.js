// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
// Serverless API route that fetches the full list of World Bank indicators and caches results in-memory (TTL).
const INDICATORS_URL = "https://api.worldbank.org/v2/indicator?format=json&per_page=20000";

let cache = {
  ts: 0,
  data: null
};

const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export default async function handler(req, res) {
  try {
    const now = Date.now();
    if (cache.data && now - cache.ts < TTL_MS) {
      return res.status(200).json({ ok: true, indicators: cache.data, cached: true });
    }

    const response = await fetch(INDICATORS_URL, { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ ok: false, error: `World Bank API error: ${response.status}`, details: text });
    }

    const json = await response.json();
    if (!Array.isArray(json) || json.length < 2 || !Array.isArray(json[1])) {
      return res.status(502).json({ ok: false, error: "Unexpected World Bank indicators response shape" });
    }

    const indicators = json[1].map((i) => ({
      id: i.id,
      name: i.name,
      sourceNote: i.source?.note || null,
      sourceOrganization: i.source?.organization || null
    }));

    cache = { ts: now, data: indicators };
    return res.status(200).json({ ok: true, indicators, cached: false });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}