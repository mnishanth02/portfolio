# Data Model

**Feature**: Portfolio Redesign - Vertical Scroll Reduction
**Created**: 2025-10-21
**Status**: Draft

## Overview

This document defines TypeScript interfaces for all data structures used in the portfolio redesign. All types follow Next.js 15 + React 19 patterns with strict TypeScript enabled.

---

## Timeline Data Types

### TimelineItem

Represents a single milestone in either the career or running timeline.

```typescript
import type { LucideIcon } from 'lucide-react';

interface TimelineItem {
  /** Unique identifier for the timeline item */
  id: string;

  /** Category: career achievements or running milestones */
  type: 'career' | 'running';

  /** Date of the milestone (ISO format: YYYY-MM-DD) */
  date: string;

  /** Primary title of the milestone */
  title: string;

  /** Optional subtitle (e.g., company name, race distance) */
  subtitle?: string;

  /** Detailed description of the achievement */
  description: string;

  /** Lucide icon component for visual representation */
  icon: LucideIcon;

  /** Optional external link with label */
  link?: {
    href: string;
    label: string;
  };

  /** Optional image URL for the milestone */
  image?: string;
}

/** Timeline data grouped by type */
interface TimelineData {
  career: TimelineItem[];
  running: TimelineItem[];
}
```

**Usage Example**:
```typescript
import { Briefcase, Trophy } from 'lucide-react';

const careerMilestones: TimelineItem[] = [
  {
    id: 'career-001',
    type: 'career',
    date: '2020-06-15',
    title: 'Senior Full Stack Engineer',
    subtitle: 'TechCorp Inc.',
    description: 'Led migration to Next.js 13 App Router, reducing load time by 40%',
    icon: Briefcase,
    link: {
      href: '/blog/migration-to-app-router',
      label: 'Read case study'
    }
  },
  // ...
];
```

---

## Skills Data Types

### Skill

Represents a single technical skill with proficiency metadata.

```typescript
interface Skill {
  /** Unique skill name */
  name: string;

  /** Category for tabbed organization */
  category: 'frontend' | 'backend' | 'cloud' | 'data' | 'tools';

  /** Proficiency level */
  proficiency: 'expert' | 'advanced' | 'intermediate';

  /** Years of experience with this skill */
  years: number;

  /** Optional icon URL (logo or badge) */
  icon?: string;

  /** Optional description for tooltips */
  description?: string;
}

/** Skills grouped by category for efficient rendering */
interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  cloud: Skill[];
  data: Skill[];
  tools: Skill[];
}
```

**Usage Example**:
```typescript
const frontendSkills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    proficiency: 'expert',
    years: 7,
    icon: '/images/skills/react.svg',
    description: 'Advanced patterns including Server Components, Suspense, and custom hooks'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 'expert',
    years: 5,
    icon: '/images/skills/typescript.svg'
  },
  // ...
];
```

---

## Article Data Types

### Article

Represents blog post metadata extracted from MDX frontmatter.

```typescript
interface Article {
  /** URL-safe slug (filename without .mdx) */
  slug: string;

  /** Article title (from frontmatter) */
  title: string;

  /** Short summary/preview (from frontmatter) */
  excerpt: string;

  /** Publication date (ISO format: YYYY-MM-DD) */
  date: string;

  /** Estimated reading time in minutes */
  readTime: number;

  /** Tags/categories for filtering */
  tags: string[];

  /** Optional hero image URL */
  image?: string;

  /** Author name (default: site owner) */
  author?: string;
}
```

**Schema Alignment** (content-collections.ts):
```typescript
import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const blog = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    readTime: z.number().optional().default(5),
    tags: z.array(z.string()),
    image: z.string().optional(),
    author: z.string().optional().default('Your Name'),
  }),
});

export default defineConfig({
  collections: [blog],
});
```

**Usage Example**:
```typescript
import { allBlog } from 'content-collections';

// Get 3 most recent articles
const recentArticles: Article[] = allBlog
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);
```

---

## Project Data Types

### Project

Represents a portfolio project with metadata and links.

```typescript
interface Project {
  /** Unique project identifier */
  id: string;

  /** Project title */
  title: string;

  /** Short description (1-2 sentences) */
  description: string;

  /** Full description for modal (Markdown supported) */
  longDescription?: string;

  /** Technology tags */
  tags: string[];

  /** Project thumbnail/hero image */
  image: string;

  /** Featured flag (true for 1 project, spans 2 columns) */
  featured: boolean;

  /** Optional GitHub repository URL */
  github?: string;

  /** Optional live demo URL */
  demo?: string;

  /** Optional metrics/achievements */
  metrics?: ProjectMetric[];

  /** Optional additional screenshots */
  screenshots?: string[];
}

interface ProjectMetric {
  /** Metric label (e.g., "Users", "Performance", "Awards") */
  label: string;

  /** Metric value (e.g., "10K+", "95 Lighthouse", "Winner") */
  value: string;

  /** Optional icon for visual representation */
  icon?: LucideIcon;
}
```

**Usage Example**:
```typescript
import { Users, Zap, Award } from 'lucide-react';

const projects: Project[] = [
  {
    id: 'project-001',
    title: 'E-commerce Platform',
    description: 'Modern storefront with real-time inventory and AI recommendations',
    longDescription: '### Overview\n\nFull-stack platform built with Next.js 15...',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Vercel AI'],
    image: '/images/projects/ecommerce.jpg',
    featured: true,
    github: 'https://github.com/username/ecommerce',
    demo: 'https://demo.ecommerce.com',
    metrics: [
      { label: 'Active Users', value: '15K+', icon: Users },
      { label: 'Lighthouse Score', value: '98', icon: Zap },
      { label: 'Award', value: 'Product Hunt #1', icon: Award }
    ],
    screenshots: [
      '/images/projects/ecommerce-home.jpg',
      '/images/projects/ecommerce-cart.jpg'
    ]
  },
  // ...
];
```

---

## Video Data Types

### Video

Represents a YouTube video entry for the Videos section.

```typescript
interface Video {
  /** Unique video identifier */
  id: string;

  /** Category for tabbed organization */
  category: 'running' | 'coding' | 'talks';

  /** Video title */
  title: string;

  /** YouTube video ID (from URL: youtube.com/watch?v=VIDEO_ID) */
  youtubeId: string;

  /** Video duration (format: "MM:SS" or "HH:MM:SS") */
  duration: string;

  /** Publication date (ISO format: YYYY-MM-DD) */
  publishedAt: string;

  /** Optional description/summary */
  description?: string;
}

/** Auto-generated thumbnail URL helper */
function getYouTubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}
```

**Usage Example**:
```typescript
const videos: Video[] = [
  {
    id: 'video-001',
    category: 'running',
    title: 'Boston Marathon 2024 - Sub-3 Hour Attempt',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '12:34',
    publishedAt: '2024-04-15',
    description: 'Race recap and lessons learned from my first Boston qualifier'
  },
  {
    id: 'video-002',
    category: 'coding',
    title: 'Building Type-Safe APIs with Zod in Next.js 15',
    youtubeId: 'abc123def45',
    duration: '18:42',
    publishedAt: '2024-09-10',
    description: 'Deep dive into runtime validation and type inference'
  },
  // ...
];
```

---

## Component Prop Types

### Timeline Components

```typescript
/** Props for Timeline wrapper component (RSC) */
export interface TimelineProps {
  /** Timeline items to display */
  items: TimelineItem[];

  /** Timeline type (career or running) */
  type: 'career' | 'running';

  /** Optional section heading */
  heading?: string;
}

/** Props for individual TimelineItem component (RSC) */
export interface TimelineItemProps {
  /** Timeline item data */
  item: TimelineItem;

  /** Item index (for stagger animations) */
  index: number;

  /** Total item count (for connector line logic) */
  total: number;
}
```

### Skills Components

```typescript
/** Props for Skills wrapper (RSC) */
export interface SkillsProps {
  /** All skills grouped by category */
  skills: SkillsData;
}

/** Props for SkillTabs component (Client) */
export interface SkillTabsProps {
  /** All skills grouped by category */
  skills: SkillsData;

  /** Default tab (default: 'frontend') */
  defaultTab?: 'frontend' | 'backend' | 'cloud' | 'data' | 'tools';
}

/** Props for individual SkillCard component (RSC) */
export interface SkillCardProps {
  /** Skill data */
  skill: Skill;

  /** Show proficiency badge */
  showProficiency?: boolean;

  /** Show years of experience */
  showYears?: boolean;
}
```

### Articles Components

```typescript
/** Props for ArticlesCarousel component (Client) */
export interface ArticlesCarouselProps {
  /** Articles to display */
  articles: Article[];

  /** Maximum articles to show (default: 3) */
  maxArticles?: number;

  /** Section heading (default: "Recent Articles") */
  heading?: string;
}

/** Props for ArticleCard component (RSC) */
export interface ArticleCardProps {
  /** Article data */
  article: Article;

  /** Show full excerpt (default: true) */
  showExcerpt?: boolean;

  /** Show tags (default: true) */
  showTags?: boolean;
}
```

### Projects Components

```typescript
/** Props for ProjectsGrid component (RSC) */
export interface ProjectsGridProps {
  /** Projects to display */
  projects: Project[];

  /** Section heading (default: "Featured Projects") */
  heading?: string;
}

/** Props for ProjectCard component (RSC) */
export interface ProjectCardProps {
  /** Project data */
  project: Project;

  /** Featured variant (larger card) */
  featured?: boolean;

  /** Show metrics (default: true) */
  showMetrics?: boolean;
}

/** Props for ProjectModal component (Client) */
export interface ProjectModalProps {
  /** Project to display */
  project: Project | null;

  /** Modal open state */
  open: boolean;

  /** Close handler */
  onClose: () => void;
}
```

### Videos Components

```typescript
/** Props for Videos wrapper (RSC) */
export interface VideosProps {
  /** All videos grouped by category */
  videos: Video[];
}

/** Props for VideoTabs component (Client) */
export interface VideoTabsProps {
  /** All videos */
  videos: Video[];

  /** Default tab (default: 'running') */
  defaultTab?: 'running' | 'coding' | 'talks';
}

/** Props for VideoCard component (RSC) */
export interface VideoCardProps {
  /** Video data */
  video: Video;

  /** Show duration overlay (default: true) */
  showDuration?: boolean;

  /** Show publish date (default: true) */
  showDate?: boolean;
}
```

---

## Type Exports

**File**: `types/index.ts`

```typescript
// Timeline types
export type { TimelineItem, TimelineData, TimelineProps, TimelineItemProps };

// Skills types
export type { Skill, SkillsData, SkillsProps, SkillTabsProps, SkillCardProps };

// Article types
export type { Article, ArticlesCarouselProps, ArticleCardProps };

// Project types
export type { Project, ProjectMetric, ProjectsGridProps, ProjectCardProps, ProjectModalProps };

// Video types
export type { Video, VideosProps, VideoTabsProps, VideoCardProps };
```

---

## Validation & Testing

### Type Safety Validation

```bash
# Verify TypeScript compilation
bun run build

# Check for type errors
npx tsc --noEmit
```

### Data Validation

```typescript
// Example: Validate timeline data at build time
import { z } from 'zod';

const TimelineItemSchema = z.object({
  id: z.string(),
  type: z.enum(['career', 'running']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(10),
  link: z.object({
    href: z.string().url(),
    label: z.string()
  }).optional(),
  image: z.string().optional()
});

// Validate at build time
timelineData.forEach((item) => {
  TimelineItemSchema.parse(item);
});
```

---

## Notes

- All interfaces exported from `types/index.ts` for centralized type management
- Dates use ISO 8601 format (`YYYY-MM-DD`) for consistency
- Optional fields marked with `?` for TypeScript strictness
- Component prop types follow React 19 conventions (no React.FC)
- Lucide icons typed as `LucideIcon` for type safety
- MDX frontmatter schema matches `@content-collections/mdx` configuration
