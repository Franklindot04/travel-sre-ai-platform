/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Webpack instead of Turbopack
  webpack: (config) => {
    return config;
  },

  // Enable Turbopack root detection override
  turbopack: {
    root: "./",
  },
};

module.exports = nextConfig;
