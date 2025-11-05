/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ["node-html-parser"]
  }
};

module.exports = nextConfig;
