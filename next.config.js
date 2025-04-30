/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org", "newsapi.org", "alphavantage.co", "example.com", "localhost"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add any other Next.js config options here
}

// Change from ES module syntax to CommonJS syntax
module.exports = nextConfig
