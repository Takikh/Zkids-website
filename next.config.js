/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Note: i18n is disabled for static export, we'll handle it manually
  // i18n,
};

module.exports = nextConfig;