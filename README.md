```markdown
Equity Insights Portal © 2025 Inclusive Impact Lab Limited
Licensed under the MIT License - Open Source

# Equity Insights Portal

A lightweight Next.js portal to explore World Bank development indicators across countries. Built with TailwindCSS and Recharts.

## Features

- Two serverless API routes that proxy the World Bank API:
  - /api/worldbank/indicators — returns the full list of indicators
  - /api/worldbank/data?indicator={indicator} — returns data for selected indicator across all countries
- Search + dropdown UI for selecting indicators (real-time)
- Visualizations via Recharts (bar chart of latest values)
- Responsive layout with TailwindCSS
- MIT license

## Run locally

1. Install dependencies:
   npm install

2. Run the dev server:
   npm run dev

3. Open http://localhost:3000

No environment variables are required; data is fetched directly from the World Bank API.

## Notes for maintainers

- Simple in-memory caching is implemented in the API routes. For production scale, consider using an external cache (Redis).
- If your existing repo included Firebase, Supabase, Stripe, or auth-related files, remove those packages from package.json and the associated code to complete the refactor.
```