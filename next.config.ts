import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "**.run.app",
    "*.run.app",
    "**.google.com",
    "**.googlers.com",
  ],
};

export default nextConfig;
