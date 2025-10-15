// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout title="About — Equity Insights">
      <div className="space-y-6">
        <section className="bg-white border rounded-md p-6">
          <h1 className="text-2xl font-bold">About Inclusive Impact Lab</h1>
          <p className="mt-3 text-slate-700">
            Inclusive Impact Lab Limited builds open-source tools to help organisations and researchers make data-informed decisions for equitable outcomes.
          </p>
        </section>

        <section className="bg-white border rounded-md p-6">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="mt-2 text-slate-700">
            Email: <a className="text-sky-600" href="mailto:hello@inclusiveimpactlab.org">hello@inclusiveimpactlab.org</a>
          </p>
        </section>

        <section className="bg-white border rounded-md p-6">
          <h2 className="text-lg font-medium">License</h2>
          <p className="mt-2 text-slate-700">This project is open source under the MIT License.</p>
          <pre className="mt-3 text-xs bg-slate-50 p-3 rounded text-slate-600">
{`Equity Insights Portal © 2025 Inclusive Impact Lab Limited
Licensed under the MIT License - Open Source`}
          </pre>
        </section>
      </div>
    </Layout>
  );
}