import type { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 * Controls search engine crawling
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.com"}/sitemap.xml`,
  };
}
