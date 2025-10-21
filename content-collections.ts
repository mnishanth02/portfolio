import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";

/**
 * Blog Posts Collection
 * MDX files in content/blog/ directory
 */
const blogPosts = defineCollection({
	name: "blogPosts",
	directory: "content/blog",
	include: "**/*.mdx",
	schema: (z) => ({
		title: z.string().min(10).max(100),
		description: z.string().min(50).max(200),
		publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
		category: z.enum(["technical", "fitness", "lifestyle"]),
		tags: z.array(z.string()).min(1).max(10),
		updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
		image: z.string().optional(),
		featured: z.boolean().default(false),
		author: z.string().default("Your Name"),
	}),
	transform: async (document, context) => {
		const body = await compileMDX(context, document);
		const stats = readingTime(document.content);

		return {
			...document,
			body,
			slug: document._meta.path,
			readingTime: Math.ceil(stats.minutes),
			url: `/blog/${document._meta.path}`,
		};
	},
});

export default defineConfig({
	collections: [blogPosts],
});
