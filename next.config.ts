// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
 
// };

// export default nextConfig;










// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },

  output: process.env.NEXT_OUTPUT_MODE === "export" ? "export" : undefined,
};

export default nextConfig;
