import type { NextConfig } from "next";

const repoName = 'gemma3_chat';
const basePath = `/${repoName}`;

const nextConfig = {
  output: 'export',
  distDir: 'out',
  devIndicators: false,

  basePath: basePath,

  assetPrefix: basePath,

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;