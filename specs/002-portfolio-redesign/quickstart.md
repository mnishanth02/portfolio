# Developer Quickstart Guide

**Feature**: Portfolio Redesign - Vertical Scroll Reduction
**Audience**: Developers implementing the redesign
**Last Updated**: 2025-10-21

## Overview

This guide provides step-by-step instructions for developers working on the portfolio redesign. Whether you're setting up the project locally, adding new content, or deploying changes, this document has you covered.

---

## Prerequisites

**Required**:
- Node.js 18.17+ or 20+ (check: `node --version`)
- Bun 1.0+ (install: `curl -fsSL https://bun.sh/install | bash`)
- Git (check: `git --version`)
- VS Code (recommended) with TypeScript extension

**Optional**:
- GitHub CLI (`gh`) for PR management
- Vercel CLI for local preview testing

---

## Initial Setup

### 1. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd portfolio

# Install dependencies
bun install

# Verify installation
bun run dev
# Visit http://localhost:3000
```

### 2. Environment Variables

Create `.env.local` in project root:

```bash
# PostHog Analytics (optional for local dev)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Vercel (auto-populated in production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: PostHog key not required for development. Analytics will be disabled if omitted.

### 3. Verify Setup

```bash
# Run TypeScript type check
npx tsc --noEmit

# Run Biome linter (NOT eslint)
bun run lint

# Format code with Biome (NOT prettier)
bun run format

# Build for production
bun run build
```

**Success indicators**:
- No TypeScript errors
- Biome reports 0 issues
- Build completes without errors
- Dev server runs on http://localhost:3000

---

## Development Workflow

### Branch Strategy

```bash
# Always work on feature branch (not main)
git checkout -b 002-portfolio-redesign

# For sub-tasks, create branches from feature branch
git checkout -b 002-timeline-component
```

### Development Commands

```bash
# Start dev server with Turbopack (fast refresh)
bun run dev

# Production build (test before PR)
bun run build

# Serve production build locally
bun run start

# Lint code (uses Biome, not ESLint)
bun run lint

# Format code (uses Biome, not Prettier)
bun run format
```

### Hot Reload Tips

- **Component changes**: Auto-reload (keep browser open)
- **Config changes** (`next.config.ts`, `tailwind.config.ts`): Restart dev server
- **Environment variables** (`.env.local`): Restart dev server
- **Type errors**: Check terminal output (not browser console)

---

## Project Structure

### Key Directories

```plaintext
portfolio/
├── app/                     # Next.js App Router pages
│   ├── globals.css          # Tailwind imports + design tokens
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage (integrate new sections here)
│   └── blog/                # Blog routes
├── components/
│   ├── home/                # Homepage-specific components (NEW)
│   ├── ui/                  # shadcn/ui components
│   └── shared/              # Reusable components
├── lib/                     # Utilities & data
│   ├── utils.ts             # cn() className utility
│   ├── constants.ts         # Timeline, skills, videos data
│   └── projects.ts          # Projects data
├── content/
│   └── blog/                # MDX blog posts
├── public/
│   └── images/              # Static images
└── types/
    └── index.ts             # TypeScript type definitions
```

### Important Files

- `app/globals.css`: Design tokens, Tailwind v4 imports, custom CSS variables
- `components.json`: shadcn/ui configuration
- `content-collections.ts`: MDX configuration
- `next.config.ts`: Next.js configuration
- `biome.json`: Linter/formatter configuration (NOT eslint/prettier)

---

## Adding New Components

### Step 1: Create Component File

```bash
# Create new component in appropriate directory
touch components/home/Timeline.tsx
```

### Step 2: Component Template

**Server Component (RSC) Template**:
```tsx
import type { TimelineItem } from '@/types';

interface TimelineProps {
  items: TimelineItem[];
  type: 'career' | 'running';
}

/**
 * Timeline component displaying career or running milestones
 * @param items - Array of timeline milestones
 * @param type - Timeline category (career/running)
 */
export default function Timeline({ items, type }: TimelineProps) {
  return (
    <section className="py-12" aria-label={`${type} timeline`}>
      <h2 className="text-3xl font-bold mb-8">My {type} Journey</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {items.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} total={items.length} />
        ))}
      </div>
    </section>
  );
}
```

**Client Component Template**:
```tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { SkillsData } from '@/types';

interface SkillTabsProps {
  skills: SkillsData;
}

/**
 * Tabbed interface for skills categorization
 * @param skills - Skills grouped by category
 */
export function SkillTabs({ skills }: SkillTabsProps) {
  return (
    <Tabs defaultValue="frontend">
      <TabsList>
        <TabsTrigger value="frontend">Frontend</TabsTrigger>
        {/* ... */}
      </TabsList>
      <TabsContent value="frontend">
        {/* Grid of skill cards */}
      </TabsContent>
    </Tabs>
  );
}
```

### Step 3: Import in Homepage

```tsx
// app/page.tsx
import Timeline from '@/components/home/Timeline';
import { careerMilestones, runningMilestones } from '@/lib/constants';

export default function HomePage() {
  return (
    <main>
      {/* Existing Hero section */}

      <Timeline items={careerMilestones} type="career" />
      <Timeline items={runningMilestones} type="running" />

      {/* Other sections */}
    </main>
  );
}
```

---

## Adding Content

### Adding Timeline Milestones

**File**: `lib/constants.ts`

```typescript
import { Briefcase, Trophy } from 'lucide-react';
import type { TimelineItem } from '@/types';

export const careerMilestones: TimelineItem[] = [
  {
    id: 'career-001',
    type: 'career',
    date: '2024-01-15',
    title: 'Senior Full Stack Engineer',
    subtitle: 'TechCorp Inc.',
    description: 'Led migration to Next.js 15 App Router, reducing load time by 40%',
    icon: Briefcase,
    link: {
      href: '/blog/migration-story',
      label: 'Read case study'
    }
  },
  // Add more milestones...
];
```

### Adding Skills

**File**: `lib/constants.ts`

```typescript
import type { Skill } from '@/types';

export const frontendSkills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    proficiency: 'expert',
    years: 7,
    icon: '/images/skills/react.svg',
    description: 'Server Components, Suspense, custom hooks'
  },
  // Add more skills...
];
```

### Adding Projects

**File**: `lib/projects.ts`

```typescript
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-001',
    title: 'E-commerce Platform',
    description: 'Modern storefront with AI recommendations',
    longDescription: '### Overview\n\nFull description here...',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    image: '/images/projects/ecommerce.jpg',
    featured: true,  // Only ONE project should be featured
    github: 'https://github.com/username/repo',
    demo: 'https://demo.url.com',
    metrics: [
      { label: 'Users', value: '15K+' },
      { label: 'Lighthouse', value: '98' }
    ]
  },
  // Add more projects...
];
```

### Adding Blog Posts

1. Create MDX file in `content/blog/my-new-post.mdx`
2. Add frontmatter:

```mdx
---
title: "How I Built a Type-Safe API with Zod"
date: "2024-10-15"
excerpt: "Learn how to add runtime validation to Next.js API routes"
readTime: 8
tags: ["Next.js", "TypeScript", "Zod"]
image: "/images/blog/type-safe-api.jpg"
---

Your content here...
```

3. Run `bun run build` to regenerate types
4. Article will auto-appear in carousel (sorted by date)

---

## Testing & Quality Assurance

### Pre-PR Checklist

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint code
bun run lint

# 3. Format code
bun run format

# 4. Production build
bun run build

# 5. Visual regression (manual)
bun run dev
# Test on:
# - iPhone SE (375px width)
# - iPad (768px width)
# - Desktop (1440px width)

# 6. Accessibility audit
# - Install WAVE extension
# - Install axe DevTools extension
# - Run Lighthouse audit
```

### Lighthouse Audit

```bash
# Option 1: Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Generate report
# 4. Verify scores ≥95

# Option 2: CLI
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:3000
```

**Target Scores**:
- Performance: ≥95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Accessibility Testing

**Keyboard Navigation Test**:
- Tab through all interactive elements
- Arrow keys work in tabs and carousels
- ESC closes modals
- Enter/Space activates buttons
- Focus visible (2px ring)

**Screen Reader Test** (macOS VoiceOver):
```bash
# Enable VoiceOver
Cmd + F5

# Test navigation:
# - Headings announced correctly
# - ARIA labels present
# - Tab count announced ("Tab 1 of 5")
# - Carousel count announced ("Article 1 of 3")
```

**Color Contrast**:
- Light mode: All text ≥4.5:1 contrast
- Dark mode: All text ≥4.5:1 contrast
- Use browser DevTools contrast checker

---

## Styling Guidelines

### Tailwind v4 Patterns

```tsx
// ✅ DO: Use semantic color tokens
<div className="bg-background text-foreground">

// ❌ DON'T: Use arbitrary colors
<div className="bg-white text-black">

// ✅ DO: Use cn() for conditional classes
import { cn } from '@/lib/utils';
<div className={cn(
  "base-classes",
  isActive && "active-classes"
)} />

// ❌ DON'T: Concatenate strings
<div className={"base-classes " + (isActive ? "active-classes" : "")} />
```

### Responsive Design Pattern

```tsx
// Mobile-first approach (Tailwind default)
<div className="
  grid-cols-1        /* Mobile: 1 column */
  md:grid-cols-2     /* Tablet: 2 columns (≥768px) */
  lg:grid-cols-3     /* Desktop: 3 columns (≥1024px) */
">
```

### Dark Mode Pattern

```tsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-800
">
```

---

## Troubleshooting

### TypeScript Errors

**Problem**: "Cannot find module '@/components/ui/tabs'"

**Solution**:
```bash
# Install missing shadcn/ui component
npx shadcn@latest add tabs
```

### Build Errors

**Problem**: "Module not found: Can't resolve 'content-collections'"

**Solution**:
```bash
# Regenerate content collections
bun run build
# Content collections auto-generate on build
```

**Problem**: "Error: Image optimization failed"

**Solution**:
```tsx
// Ensure images have proper width/height
<Image
  src="/images/project.jpg"
  alt="Project screenshot"
  width={1200}  // ✅ Explicit dimensions
  height={800}  // ✅ Required
/>
```

### Performance Issues

**Problem**: Lighthouse score < 95

**Diagnosis**:
1. Check LCP: Run Lighthouse, check "Largest Contentful Paint"
2. Check CLS: Look for layout shifts (videos, images without dimensions)
3. Check bundle size: Run `bun run build`, check output size

**Solutions**:
```tsx
// Fix 1: Preload critical images
<Image priority src="/hero.jpg" ... />

// Fix 2: Add blur placeholders
<Image placeholder="blur" blurDataURL="..." ... />

// Fix 3: Lazy load below-fold content
'use client';
import dynamic from 'next/dynamic';
const Videos = dynamic(() => import('@/components/home/Videos'));
```

### Dark Mode Not Working

**Problem**: Dark mode toggle doesn't change colors

**Solution**:
```tsx
// Ensure all components use dark: prefix
<div className="bg-white dark:bg-gray-900" />

// Check ThemeProvider is in layout.tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';
```

---

## Deployment

### Preview Deployment

```bash
# Push to GitHub (auto-triggers Vercel preview)
git push origin 002-portfolio-redesign

# View preview URL in:
# 1. GitHub PR checks
# 2. Vercel dashboard
# 3. Vercel bot comment on PR
```

### Production Deployment

```bash
# Merge PR to main (auto-deploys to production)
gh pr merge <pr-number> --squash

# Monitor deployment:
# https://vercel.com/dashboard
```

### Rollback

```bash
# In Vercel dashboard:
# 1. Go to Deployments
# 2. Find previous successful deployment
# 3. Click "..." menu → "Promote to Production"
```

---

## Resources

**Documentation**:
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

**Tools**:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

**Project-Specific**:
- [Feature Specification](./spec.md)
- [Research Decisions](./research.md)
- [Data Model](./data-model.md)
- [Implementation Plan](./plan.md)

---

## Getting Help

**Internal Resources**:
1. Check `docs/` directory for troubleshooting guides
2. Review existing components in `components/` for patterns
3. Read project constitution in `.specify/memory/constitution.md`

**External Resources**:
1. Next.js Discord: https://discord.gg/nextjs
2. Tailwind Discord: https://tailwindcss.com/discord
3. shadcn/ui GitHub Discussions

**Common Issues**:
- Build errors → Check terminal output, run `bun install`
- Type errors → Run `npx tsc --noEmit`, check `types/index.ts`
- Styling issues → Check `app/globals.css`, verify Tailwind classes
- Performance issues → Run Lighthouse, check image optimization

---

## Next Steps

1. **Read the Spec**: Start with [spec.md](./spec.md) to understand all requirements
2. **Review Research**: Check [research.md](./research.md) for technology decisions
3. **Understand Data Model**: Review [data-model.md](./data-model.md) for type definitions
4. **Follow Implementation Plan**: Use [plan.md](./plan.md) for task breakdown
5. **Start Coding**: Begin with Phase 2 (Timeline component)

**Happy coding! 🚀**
