/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Pages Router explicitly
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
