import type { NextConfig } from "next";

const repoName = 'gemma3_chat';

const nextConfig = {
  output: 'export',
  distDir: 'out',
  devIndicators: false,

  basePath: `/${repoName}`,

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
