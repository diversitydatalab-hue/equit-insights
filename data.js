// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
// Serverless API route that fetches indicator data across all countries and caches per-indicator results (simple in-memory TTL).
const BASE_URL = "https://api.worldbank.org/v2/country/all/indicator";
let perIndicatorCache = {}; // { [indicator]: { ts, data } }
const TTL_MS = 1000 * 60 * 60; // 1 hour

function validateIndicatorId(id) {
  // Basic validation: must be non-empty string of letters, numbers, dots, or underscores, hyphens allowed.
  return typeof id === "string" && /^[A-Za-z0-9\.\-_]+$/.test(id) && id.length <= 64;
}

export default async function handler(req, res) {
  try {
    const { indicator } = req.query;
    if (!indicator || !validateIndicatorId(indicator)) {
      return res.status(400).json({ ok: false, error: "Invalid or missing indicator query parameter." });
    }

    const now = Date.now();
    const cacheEntry = perIndicatorCache[indicator];
    if (cacheEntry && now - cacheEntry.ts < TTL_MS) {
      return res.status(200).json({ ok: true, data: cacheEntry.data, cached: true });
    }

    const url = `${BASE_URL}/${encodeURIComponent(indicator)}?format=json&per_page=20000`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ ok: false, error: `World Bank API error: ${response.status}`, details: text });
    }

    const json = await response.json();

    // Expecting [metadata, data[]]
    if (!Array.isArray(json) || json.length < 2 || !Array.isArray(json[1])) {
      return res.status(502).json({ ok: false, error: "Unexpected World Bank data response shape" });
    }

    const raw = json[1];

    // Normalize data entries to safe shape
    const data = raw.map((d) => ({
      country: { id: d.country?.id || null, name: d.country?.value || null },
      countryiso3code: d.countryiso3code || null,
      date: d.date || null,
      value: d.value === null ? null : d.value
    }));

    perIndicatorCache[indicator] = { ts: now, data };
    return res.status(200).json({ ok: true, data, cached: false });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}