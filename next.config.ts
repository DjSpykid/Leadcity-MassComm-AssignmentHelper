// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint errors during build
  },
  // Optional: If you're using static exports
  output: process.env.NEXT_OUTPUT_MODE === "export" ? "export" : undefined,
};

export default nextConfig;
