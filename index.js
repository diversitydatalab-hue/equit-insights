// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Inclusive Impact Lab — Equity Insights">
      <div className="space-y-6">
        <section className="bg-white border rounded-md p-6">
          <h1 className="text-3xl font-bold">Equity Insights Portal</h1>
          <p className="mt-3 text-slate-700 max-w-3xl">
            The Equity Insights Portal by Inclusive Impact Lab offers open-source tools to explore global development indicators
            using the World Bank API. Discover indicators across countries, visualize trends, and export insights for reports and research.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-md p-6">
            <h2 className="text-xl font-semibold">Mission</h2>
            <p className="mt-2 text-slate-700">
              We believe accessible data and clear visualizations reduce barriers to evidence-driven policy and program design.
              Equity Insights is a lightweight portal that brings World Bank indicators into simple, shareable analyses.
            </p>
          </div>

          <div className="bg-white border rounded-md p-6">
            <h2 className="text-xl font-semibold">Get started</h2>
            <ol className="mt-2 list-decimal list-inside text-slate-700">
              <li>Open the Dashboard</li>
              <li>Search for an indicator (e.g., "GDP", "Life expectancy", "Population")</li>
              <li>Explore the chart and table showing values across countries</li>
            </ol>
          </div>
        </section>

        <section className="bg-white border rounded-md p-6">
          <h2 className="text-lg font-medium">Open source</h2>
          <p className="mt-2 text-slate-700">
            This project is open source under the MIT License. See About for contact details and the license text.
          </p>
        </section>
      </div>
    </Layout>
  );
}