import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image optimization */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  /* Production optimizations */
  compress: true, // Enable gzip compression
  reactStrictMode: true, // Enable React strict mode for better development experience
  poweredByHeader: false, // Remove X-Powered-By header for security

  /* Experimental features for better performance */
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default withContentCollections(nextConfig);
