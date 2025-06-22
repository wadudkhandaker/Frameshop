/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  // Ensure CSS is properly handled
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Frameshop' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Frameshop' : '',
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.pexels.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
};

module.exports = nextConfig;