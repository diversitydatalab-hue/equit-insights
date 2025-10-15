// Equity Insights Portal © 2025 Inclusive Impact Lab Limited
// Licensed under the MIT License - Open Source
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No environment variables required; external fetch allowed for World Bank API.
  images: {
    domains: ["upload.wikimedia.org", "www.worldbank.org", "api.worldbank.org"]
  }
};

module.exports = nextConfig;