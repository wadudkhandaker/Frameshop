/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Dynamic site with Strapi CMS - no static export needed
  trailingSlash: true,
  images: {
    domains: ['images.pexels.com', 'localhost'], // Added localhost for Strapi images
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
};

module.exports = nextConfig;