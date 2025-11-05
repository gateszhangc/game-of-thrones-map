/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["node-html-parser"]
  }
};

module.exports = nextConfig;
