import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nirzak-streak-stats.vercel.app",
      },
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
    ],
  },
};

export default nextConfig;
