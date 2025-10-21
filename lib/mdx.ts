import type { BlogPost } from "@/types";
import { allBlogPosts } from "../.content-collections/generated";

/**
 * Get all published blog posts, sorted by date (newest first)
 * @returns Array of blog posts
 */
export function getAllPosts(): BlogPost[] {
  return allBlogPosts.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
}

/**
 * Get a single blog post by slug
 * @param slug - The post slug (filename without extension)
 * @returns Blog post or undefined if not found
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((post) => post.slug === slug);
}

/**
 * Get featured blog posts (limited to 3 most recent)
 * @returns Array of featured blog posts
 */
export function getFeaturedPosts(limit = 3): BlogPost[] {
  return allBlogPosts
    .filter((post) => post.featured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

/**
 * Get blog posts by category
 * @param category - Category to filter by
 * @returns Array of blog posts in the category
 */
export function getPostsByCategory(
  category: "technical" | "fitness" | "lifestyle",
): BlogPost[] {
  return allBlogPosts
    .filter((post) => post.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

/**
 * Get blog posts by tag
 * @param tag - Tag to filter by
 * @returns Array of blog posts with the tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return allBlogPosts
    .filter((post) => post.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

/**
 * Get all unique tags from blog posts
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const tags = allBlogPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).sort();
}

/**
 * Get recent blog posts (default 4)
 * @param limit - Number of posts to return
 * @returns Array of recent blog posts
 */
export function getRecentPosts(limit = 4): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
