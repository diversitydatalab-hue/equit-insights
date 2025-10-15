// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
import Head from "next/head";

export default function Layout({ children, title = "Equity Insights Portal" }) {
  return (
    <>
      <Head>
        <title>{title} — Inclusive Impact Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-semibold">Equity Insights</div>
              <div className="text-sm text-slate-500">Inclusive Impact Lab</div>
            </div>
            <nav className="space-x-4">
              <a href="/" className="text-slate-600 hover:text-slate-900">Home</a>
              <a href="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</a>
              <a href="/about" className="text-slate-600 hover:text-slate-900">About</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Inclusive Impact Lab Limited — Licensed under the MIT License
          </div>
        </footer>
      </div>
    </>
  );
}