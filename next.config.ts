import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async redirects() {
    return [
      // Consolidate common legacy / misspelled paths to canonical routes
      { source: '/service', destination: '/services', permanent: true },
      { source: '/service/:slug', destination: '/services/:slug', permanent: true },
      { source: '/location', destination: '/locations', permanent: true },
      { source: '/location/:city', destination: '/locations/:city', permanent: true },
      { source: '/areas', destination: '/locations', permanent: true },
      { source: '/service-areas', destination: '/locations', permanent: true },
      { source: '/quote', destination: '/contact', permanent: true },
      { source: '/estimate', destination: '/contact', permanent: true },
      { source: '/get-a-quote', destination: '/contact', permanent: true },
      { source: '/free-quote', destination: '/contact', permanent: true },
      { source: '/testimonials', destination: '/reviews', permanent: true },
      { source: '/customer-reviews', destination: '/reviews', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ];
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ];
  },
};

export default nextConfig;
