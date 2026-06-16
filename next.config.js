/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'images.contentstack.io' },
      { protocol: 'https', hostname: '**.contentstack.io' },
      { protocol: 'https', hostname: '**.contentstackapps.com' },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH,
  },
};
module.exports = nextConfig;