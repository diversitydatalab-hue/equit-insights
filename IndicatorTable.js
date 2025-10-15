// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
export default function IndicatorTable({ rows = [] }) {
  return (
    <div className="overflow-auto border rounded-md bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Country</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-slate-600">Year</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-slate-600">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} className="px-3 py-4 text-sm text-slate-500">No data available.</td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={`${r.country?.id}-${r.year}`} className="hover:bg-slate-50">
              <td className="px-3 py-2 text-sm text-slate-800">{r.country?.name || r.country?.id}</td>
              <td className="px-3 py-2 text-right text-sm text-slate-600">{r.year}</td>
              <td className="px-3 py-2 text-right text-sm text-slate-900">{r.value === null ? "—" : Number(r.value).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}