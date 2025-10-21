# Data Model: Personal Portfolio Website

**Phase**: 1 - Design & Contracts
**Date**: 2025-10-21
**Status**: Complete

## Overview

This document defines all data entities for the personal portfolio website. Since the project follows a zero-database architecture (Constitution Principle I), all entities are represented as:
- **Static JSON files** for projects
- **MDX files with frontmatter** for blog posts
- **TypeScript constants** for site configuration

All content is version-controlled in Git and processed at build time via @content-collections/next.

---

## Entity Schemas

### BlogPost

**Source**: `/content/blog/*.mdx`
**Collection**: Managed by @content-collections/next
**Purpose**: Represents individual blog articles covering technical and fitness topics

**Schema** (Zod validation):
```typescript
import { z } from 'zod'

export const blogPostSchema = z.object({
  // Required fields
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(200),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  category: z.enum(['technical', 'fitness', 'lifestyle']),
  tags: z.array(z.string()).min(1).max(10),

  // Optional fields
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  image: z.string().optional(), // Path relative to /public/images/blog/
  featured: z.boolean().default(false),
  author: z.string().default('Your Name'),

  // Computed fields (added by transform)
  slug: z.string(), // Generated from filename
  readingTime: z.number(), // Calculated from word count
})

export type BlogPost = z.infer<typeof blogPostSchema>
```

**Example** (`content/blog/marathon-training-plan.mdx`):
```yaml
---
title: "Building a Marathon Training Plan with Data-Driven Insights"
description: "How I applied software engineering principles to design a 16-week marathon training plan using heart rate data and progressive overload."
publishedAt: "2025-09-15"
updatedAt: "2025-10-01"
category: "fitness"
tags: ["marathon", "training", "data-analysis", "running"]
image: "marathon-training.jpg"
featured: true
author: "Your Name"
---

## Introduction

Training for a marathon is like building a complex software system...
```

**Validation Rules**:
- Title: 10-100 characters (SEO optimization)
- Description: 50-200 characters (meta description length)
- Tags: 1-10 tags (prevents over-tagging)
- Date format: ISO 8601 (YYYY-MM-DD)
- Image path: Must exist in `/public/images/blog/`

**Relationships**:
- Belongs to one `category`
- Has many `tags`
- May reference `Project` entities in content (via links)

---

### Project

**Source**: `/content/projects/*.json`
**Collection**: Manually loaded via utilities
**Purpose**: Represents portfolio projects showcasing technical work

**Schema** (Zod validation):
```typescript
import { z } from 'zod'

export const projectSchema = z.object({
  // Required fields
  id: z.string().regex(/^[a-z0-9-]+$/), // Slug-safe ID
  title: z.string().min(10).max(80),
  description: z.string().min(50).max(200), // Short description for card
  technologies: z.array(z.string()).min(1).max(15),
  category: z.enum(['web', 'mobile', 'backend', 'fullstack', 'other']),
  status: z.enum(['completed', 'in-progress', 'archived']),

  // Optional fields
  longDescription: z.string().optional(), // Detailed description for project page
  image: z.string(), // Path relative to /public/images/projects/
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  startDate: z.string().regex(/^\d{4}-\d{2}$/).optional(), // YYYY-MM
  endDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),

  // Project detail page fields (optional)
  problemStatement: z.string().optional(),
  technicalApproach: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  metrics: z.object({
    usersImpacted: z.number().optional(),
    performanceImprovement: z.string().optional(),
    codeReduction: z.string().optional(),
  }).optional(),
})

export type Project = z.infer<typeof projectSchema>
```

**Example** (`content/projects/ecommerce-platform.json`):
```json
{
  "id": "ecommerce-platform-redesign",
  "title": "E-commerce Platform Redesign",
  "description": "Led full-stack redesign of e-commerce platform, improving checkout conversion by 32% and reducing page load time by 58%.",
  "longDescription": "Comprehensive overhaul of legacy e-commerce platform serving 50k+ monthly users. Migrated from monolithic PHP application to Next.js + Node.js microservices architecture.",
  "technologies": ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
  "category": "fullstack",
  "status": "completed",
  "image": "ecommerce-platform.jpg",
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/username/ecommerce-platform",
  "featured": true,
  "startDate": "2024-01",
  "endDate": "2024-09",
  "problemStatement": "Legacy platform suffered from slow page loads (5s+), 68% cart abandonment, and difficult-to-maintain PHP codebase.",
  "technicalApproach": "Migrated to Next.js for frontend with static generation, Node.js microservices for API, PostgreSQL for data persistence, Redis for session management.",
  "challenges": [
    "Zero-downtime migration of 50k active users",
    "Data migration from MySQL to PostgreSQL",
    "Maintaining SEO rankings during platform transition"
  ],
  "outcomes": [
    "Page load time reduced from 5.2s to 2.1s (58% improvement)",
    "Checkout conversion increased from 23% to 32%",
    "Mobile performance score improved from 45 to 92 (Lighthouse)"
  ],
  "metrics": {
    "usersImpacted": 50000,
    "performanceImprovement": "58% faster page loads",
    "codeReduction": "40% less code (PHP → TypeScript)"
  }
}
```

**Validation Rules**:
- ID: Lowercase alphanumeric + hyphens only (URL-safe)
- Description: 50-200 characters (card preview)
- Technologies: 1-15 items (prevents clutter)
- Dates: YYYY-MM format (month precision)
- URLs: Must be valid HTTP/HTTPS URLs

**Relationships**:
- Belongs to one `category`
- Has many `technologies` (tags)
- May be referenced in `BlogPost` content

---

### SiteConfig

**Source**: `/lib/constants.ts`
**Type**: TypeScript constant
**Purpose**: Global site configuration, metadata, and navigation

**Schema**:
```typescript
export const siteConfig = {
  // Site metadata
  name: 'Your Name',
  title: 'Your Name | Fullstack Engineer & Marathon Runner',
  description: 'Personal portfolio showcasing fullstack development projects and marathon running journey. Exploring the intersection of software engineering and endurance athletics.',
  url: 'https://yourportfolio.com',

  // Author information
  author: {
    name: 'Your Name',
    email: 'your-email@example.com',
    location: 'San Francisco, CA',
    availability: 'Open to opportunities',

    // Social profiles
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    strava: 'https://strava.com/athletes/123456',
    youtube: 'https://youtube.com/@username',
  },

  // Navigation links
  nav: [
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Blog', href: '#blog' },
    { title: 'Contact', href: '#contact' },
  ],

  // OpenGraph metadata
  ogImage: '/og-image.png',

  // Analytics
  analytics: {
    posthog: {
      key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    },
  },

  // Featured content
  featuredProjects: 6, // Number of projects to show on home page
  featuredPosts: 4,    // Number of blog posts to show on home page
  featuredVideos: [
    { id: 'dQw4w9WgXcQ', title: 'Marathon Training Tips' },
    { id: 'jNQXAC9IVRw', title: 'React Server Components Explained' },
    { id: 'oHg5SJYRHA0', title: 'My First Marathon Experience' },
  ],
}

export type SiteConfig = typeof siteConfig
```

**Usage**:
```typescript
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  // ...
}
```

---

### ContactSubmission

**Source**: Ephemeral (not persisted)
**Transport**: API route → Email service (Resend)
**Purpose**: Represents contact form submission data

**Schema** (Zod validation):
```typescript
import { z } from 'zod'

export const contactSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email required').max(200),
  message: z.string().min(20, 'Message must be at least 20 characters').max(5000),

  // Honeypot field (must be empty)
  website: z.string().max(0, 'Spam detected'),
})

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>
```

**Example Submission**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Hi! I'm interested in discussing a potential collaboration on a new project. Would you be available for a call next week?",
  "website": ""
}
```

**Validation Rules**:
- Name: 1-100 characters
- Email: Valid email format (RFC 5322 compliant)
- Message: 20-5000 characters (prevents spam and empty submissions)
- Website: Must be empty (honeypot anti-spam)

**Data Flow**:
1. User submits form (Client Component)
2. Client-side validation via React Hook Form + Zod
3. POST request to `/api/contact`
4. Server-side validation + honeypot check
5. Email sent via Resend API
6. Response returned to client (success/error)
7. **Data is NOT persisted** (Constitution I compliance)

**No Database Storage**: Per Constitution Principle I and zero-database constraint, contact submissions are NOT stored. They are immediately forwarded to email and discarded.

---

### Skill

**Source**: `/lib/constants.ts`
**Type**: TypeScript constant array
**Purpose**: Technical skills and expertise for About section

**Schema**:
```typescript
export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'other'
  proficiency: 'expert' | 'advanced' | 'intermediate'
  icon?: string // lucide-react icon name or path to custom SVG
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', proficiency: 'expert', icon: 'React' },
  { name: 'Next.js', category: 'frontend', proficiency: 'expert', icon: 'FrameIcon' },
  { name: 'TypeScript', category: 'frontend', proficiency: 'expert', icon: 'FileCode' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 'advanced', icon: 'Palette' },

  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 'expert', icon: 'Server' },
  { name: 'PostgreSQL', category: 'backend', proficiency: 'advanced', icon: 'Database' },
  { name: 'REST APIs', category: 'backend', proficiency: 'expert', icon: 'Zap' },

  // DevOps
  { name: 'Docker', category: 'devops', proficiency: 'advanced', icon: 'Package' },
  { name: 'Git', category: 'devops', proficiency: 'expert', icon: 'GitBranch' },
  { name: 'Vercel', category: 'devops', proficiency: 'advanced', icon: 'Cloud' },

  // Tools
  { name: 'VS Code', category: 'tools', proficiency: 'expert', icon: 'Code' },
  { name: 'Figma', category: 'tools', proficiency: 'intermediate', icon: 'Figma' },
]
```

**Relationships**:
- Grouped by `category` in About section UI
- Displayed as badges or icon grid

---

### Achievement

**Source**: `/lib/constants.ts`
**Type**: TypeScript constant array
**Purpose**: Career milestones and running accomplishments for About section timeline

**Schema**:
```typescript
export interface Achievement {
  title: string
  description: string
  date: string // YYYY-MM format
  type: 'career' | 'fitness'
  icon?: string // lucide-react icon name
}

export const achievements: Achievement[] = [
  // Career achievements
  {
    title: 'Senior Fullstack Engineer at TechCorp',
    description: 'Led team of 5 engineers to rebuild core product platform',
    date: '2024-01',
    type: 'career',
    icon: 'Briefcase',
  },
  {
    title: 'Launched E-commerce Platform Redesign',
    description: 'Improved checkout conversion by 32% and page load time by 58%',
    date: '2024-09',
    type: 'career',
    icon: 'Rocket',
  },

  // Fitness achievements
  {
    title: 'Boston Marathon Finisher',
    description: 'Qualified and completed the Boston Marathon in 3:15:42',
    date: '2024-04',
    type: 'fitness',
    icon: 'Trophy',
  },
  {
    title: '1,000 Miles Run in 2023',
    description: 'Logged 1,000+ miles and completed 5 marathons',
    date: '2023-12',
    type: 'fitness',
    icon: 'Activity',
  },
]
```

**Display**:
- Rendered as vertical timeline in About section
- Chronological order (most recent first)
- Filtered by type or shown together (integrated narrative per Constitution VII)

---

### SocialLink

**Source**: Derived from `siteConfig.author` in `/lib/constants.ts`
**Type**: Computed from site configuration
**Purpose**: Social media profile links for hero and footer

**Schema**:
```typescript
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'strava' | 'youtube' | 'email'
  url: string
  icon: string // lucide-react icon name
  label: string
}

export const socialLinks: SocialLink[] = [
  { platform: 'github', url: siteConfig.author.github, icon: 'Github', label: 'GitHub' },
  { platform: 'linkedin', url: siteConfig.author.linkedin, icon: 'Linkedin', label: 'LinkedIn' },
  { platform: 'twitter', url: siteConfig.author.twitter, icon: 'Twitter', label: 'Twitter' },
  { platform: 'strava', url: siteConfig.author.strava, icon: 'Activity', label: 'Strava' },
  { platform: 'youtube', url: siteConfig.author.youtube, icon: 'Youtube', label: 'YouTube' },
  { platform: 'email', url: `mailto:${siteConfig.author.email}`, icon: 'Mail', label: 'Email' },
]
```

**Usage**:
- Displayed in hero section as icon links
- Repeated in footer
- Icons from `lucide-react` library

---

## Entity Relationships

```text
SiteConfig (constants)
├── Used by: All pages for metadata
└── Contains: Author info → SocialLink

BlogPost (MDX)
├── Belongs to: 1 category
├── Has many: tags
└── May reference: Project (via links in content)

Project (JSON)
├── Belongs to: 1 category
├── Has many: technologies
└── May be referenced by: BlogPost

Skill (constants)
└── Grouped by: category

Achievement (constants)
└── Filtered by: type

ContactSubmission (ephemeral)
└── Sent to: Email (Resend API) → NOT stored

SocialLink (derived)
└── Derived from: SiteConfig.author
```

---

## Content Collections Configuration

**File**: `/content-collections.config.ts`

```typescript
import { defineCollection, defineConfig } from '@content-collections/next'
import { z } from 'zod'
import readingTime from 'reading-time'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string().min(10).max(100),
    description: z.string().min(50).max(200),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    category: z.enum(['technical', 'fitness', 'lifestyle']),
    tags: z.array(z.string()).min(1).max(10),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    author: z.string().default('Your Name'),
  }),
  transform: (doc, ctx) => ({
    ...doc,
    slug: doc._meta.path,
    readingTime: Math.ceil(readingTime(doc.content).minutes),
    url: `/blog/${doc._meta.path}`,
  }),
})

export default defineConfig({
  collections: [posts],
})
```

**Generated Types**: TypeScript types are automatically generated at `.content-collections/generated/index.d.ts` and imported as:
```typescript
import { allPosts } from 'content-collections'
```

---

## Type Definitions

**File**: `/types/index.ts`

```typescript
import { z } from 'zod'

// Re-export schemas
export { blogPostSchema, projectSchema, contactSubmissionSchema } from '@/lib/validations'

// Re-export types
export type { BlogPost, Project, ContactSubmission, Skill, Achievement, SocialLink, SiteConfig } from '@/lib/constants'

// Utility types
export type WithSlug<T> = T & { slug: string }
export type WithReadingTime<T> = T & { readingTime: number }
```

---

## Validation Utilities

**File**: `/lib/validations.ts`

```typescript
import { z } from 'zod'

// Blog Post Schema
export const blogPostSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(200),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category: z.enum(['technical', 'fitness', 'lifestyle']),
  tags: z.array(z.string()).min(1).max(10),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  author: z.string().default('Your Name'),
})

// Project Schema
export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(10).max(80),
  description: z.string().min(50).max(200),
  longDescription: z.string().optional(),
  technologies: z.array(z.string()).min(1).max(15),
  category: z.enum(['web', 'mobile', 'backend', 'fullstack', 'other']),
  status: z.enum(['completed', 'in-progress', 'archived']),
  image: z.string(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  startDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  problemStatement: z.string().optional(),
  technicalApproach: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  metrics: z.object({
    usersImpacted: z.number().optional(),
    performanceImprovement: z.string().optional(),
    codeReduction: z.string().optional(),
  }).optional(),
})

// Contact Submission Schema
export const contactSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email required').max(200),
  message: z.string().min(20, 'Message must be at least 20 characters').max(5000),
  website: z.string().max(0, 'Spam detected'),
})

export type BlogPost = z.infer<typeof blogPostSchema>
export type Project = z.infer<typeof projectSchema>
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>
```

---

## Summary

| Entity | Source | Persistence | Validation | Purpose |
|--------|--------|-------------|------------|---------|
| BlogPost | MDX files | Git | Zod + content-collections | Blog articles |
| Project | JSON files | Git | Zod | Portfolio projects |
| SiteConfig | TypeScript constant | Code | TypeScript | Site metadata |
| ContactSubmission | HTTP POST | Email only (not stored) | Zod | Contact form |
| Skill | TypeScript constant | Code | TypeScript | Technical skills |
| Achievement | TypeScript constant | Code | TypeScript | Timeline milestones |
| SocialLink | Derived from SiteConfig | Code | TypeScript | Social profiles |

**Zero Database Compliance**: All entities either:
1. Live in Git-tracked files (MDX, JSON, TypeScript)
2. Are ephemeral and not persisted (ContactSubmission)

No runtime database is used, per Constitution Principle I.
