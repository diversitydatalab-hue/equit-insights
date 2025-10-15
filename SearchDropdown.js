// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
import { useEffect, useMemo, useState } from "react";

export default function SearchDropdown({ onSelect, placeholder = "Search indicators..." }) {
  const [indicators, setIndicators] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/worldbank/indicators")
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        if (!json?.ok) {
          setError(json?.error || "Failed to load indicators");
          setIndicators([]);
        } else {
          // json.indicators is expected to be [{id, name, sourceNote, sourceOrganization}]
          setIndicators(json.indicators || []);
        }
      })
      .catch((err) => {
        setError(String(err));
        setIndicators([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return indicators.slice(0, 80);
    return indicators.filter((i) => {
      return (
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.id && i.id.toLowerCase().includes(q))
      );
    }).slice(0, 80);
  }, [indicators, query]);

  function handleSelect(item) {
    onSelect(item);
    setOpen(false);
    setQuery(item.name);
  }

  return (
    <div className="relative w-full max-w-3xl">
      <label className="block text-sm font-medium text-slate-700 mb-1">{placeholder}</label>
      <div className="relative">
        <input
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
        />
        {loading && (
          <div className="absolute right-2 top-2 text-xs text-slate-400">Loading...</div>
        )}
      </div>

      {error && <div className="mt-2 text-sm text-rose-600">{error}</div>}

      {open && filtered.length > 0 && (
        <ul className="mt-2 max-h-80 overflow-auto border rounded-md bg-white shadow-md">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="px-3 py-2 hover:bg-slate-50 cursor-pointer"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(item)}
            >
              <div className="text-sm font-medium text-slate-900">{item.name}</div>
              <div className="text-xs text-slate-500">{item.id}</div>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && filtered.length === 0 && (
        <div className="mt-2 text-sm text-slate-500">No indicators found.</div>
      )}
    </div>
  );
}