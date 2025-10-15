// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import SearchDropdown from "../components/SearchDropdown";
import IndicatorTable from "../components/IndicatorTable";
import BarChartLatest from "../components/BarChartLatest";

export default function Dashboard() {
  const [selected, setSelected] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSelect(indicator) {
    setSelected(indicator);
    setLoading(true);
    setError(null);
    setRawData([]);
    try {
      const res = await fetch(`/api/worldbank/data?indicator=${encodeURIComponent(indicator.id)}`);
      const json = await res.json();
      if (!json.ok) {
        setError(json.error || "Failed to load data");
      } else {
        setRawData(json.data || []);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  // Compute latest values per country (latest year with non-null value)
  const latestPerCountry = useMemo(() => {
    const map = new Map();
    for (const entry of rawData) {
      const key = entry.country?.id || entry.countryiso3code || "UNKNOWN";
      const year = parseInt(entry.date, 10);
      const value = entry.value;
      if (value === null || value === undefined) continue;
      const current = map.get(key);
      if (!current || (year && current.year < year)) {
        map.set(key, {
          country: entry.country || { id: key, name: key },
          year,
          value
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => (b.value ?? -Infinity) - (a.value ?? -Infinity));
  }, [rawData]);

  const chartData = useMemo(() => {
    // top 20 countries for chart
    return latestPerCountry.slice(0, 20).map((r) => ({
      countryName: r.country?.name || r.country?.id,
      value: typeof r.value === "number" ? r.value : null
    }));
  }, [latestPerCountry]);

  return (
    <Layout title="Dashboard — Equity Insights">
      <div className="space-y-6">
        <div className="bg-white border rounded-md p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-600 mt-1">Search for a World Bank indicator and explore values across countries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border rounded-md p-6">
              <SearchDropdown onSelect={handleSelect} placeholder="Search indicators (e.g. NY.GDP.MKTP.CD)" />
              {selected && (
                <div className="mt-4 text-sm text-slate-700">
                  <div className="font-medium">{selected.name}</div>
                  <div className="text-xs text-slate-500">{selected.id}</div>
                </div>
              )}
              {loading && <div className="mt-4 text-sm text-slate-500">Loading data...</div>}
              {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}
            </div>

            <div className="bg-white border rounded-md p-6">
              <h2 className="text-lg font-medium mb-3">Latest values by country</h2>
              <IndicatorTable rows={latestPerCountry} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border rounded-md p-6">
              <h2 className="text-lg font-medium">Top countries (latest)</h2>
              <div className="mt-4">
                <BarChartLatest data={chartData} />
              </div>
            </div>

            <div className="bg-white border rounded-md p-6 text-sm text-slate-600">
              <h3 className="font-medium">Notes</h3>
              <ul className="list-disc list-inside mt-2">
                <li>Data are fetched live from the World Bank API.</li>
                <li>Values shown are the most recent non-null year per country.</li>
                <li>Use the indicator code (e.g., NY.GDP.PCAP.CD) or search for a name.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}