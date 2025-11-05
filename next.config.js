/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["node-html-parser"]
  },
  // Disable Tailwind CSS warnings
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.warnings = false;
        }
      });
    }
    return config;
  }
};

module.exports = nextConfig;
