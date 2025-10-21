import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

/**
 * Dynamic Sitemap Generator
 * Generates sitemap with all static pages and blog posts
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Blog posts will be added when content collections are working
  // For now, just return static pages
  return staticPages;
}
