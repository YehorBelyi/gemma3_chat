import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;