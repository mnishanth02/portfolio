import { z } from "zod";

/**
 * Blog Post Frontmatter Schema
 * Validates MDX frontmatter for blog posts
 */
export const blogPostSchema = z.object({
  // Required fields
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(200),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  category: z.enum(["technical", "fitness", "lifestyle"]),
  tags: z.array(z.string()).min(1).max(10),

  // Optional fields
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  image: z.string().optional(), // Path relative to /public/images/blog/
  featured: z.boolean().default(false),
  author: z.string().default("Your Name"),

  // Computed fields (added by transform)
  slug: z.string().optional(), // Generated from filename
  readingTime: z.number().optional(), // Calculated from word count
});

/**
 * Project Schema
 * Validates project JSON files
 */
export const projectSchema = z.object({
  // Required fields
  id: z.string().regex(/^[a-z0-9-]+$/), // Slug-safe ID
  title: z.string().min(10).max(80),
  description: z.string().min(50).max(200),
  technologies: z.array(z.string()).min(1).max(15),
  category: z.enum(["web", "mobile", "backend", "fullstack", "other"]),
  status: z.enum(["completed", "in-progress", "archived"]),

  // Optional fields
  longDescription: z.string().optional(),
  image: z.string(), // Path relative to /public/images/projects/
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(), // YYYY-MM
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),

  // Project detail page fields
  problemStatement: z.string().optional(),
  technicalApproach: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  metrics: z
    .object({
      usersImpacted: z.number().optional(),
      performanceImprovement: z.string().optional(),
      codeReduction: z.string().optional(),
    })
    .optional(),
});

/**
 * Contact Form Submission Schema
 * Validates contact form inputs
 */
export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
});

// Export types
export type BlogPost = z.infer<typeof blogPostSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
