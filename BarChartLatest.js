// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function BarChartLatest({ data = [] }) {
  // data: [{countryName, value}]
  if (!data || data.length === 0) {
    return <div className="text-sm text-slate-500">No chart data available.</div>;
  }

  return (
    <div style={{ width: "100%", height: 420 }} className="bg-white border rounded-md p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="countryName" tick={{ fontSize: 11 }} interval={0} angle={-45} textAnchor="end" height={80}/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}