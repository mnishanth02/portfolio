# Research: Personal Portfolio Website

**Phase**: 0 - Outline & Research
**Date**: 2025-10-21
**Status**: Complete

## Overview

This document consolidates research findings for all technical decisions required to build the personal portfolio website. All research items identified from the Technical Context have been investigated and decisions have been documented with rationale.

---

## R1: Content Management System Selection

### Decision
Use **@content-collections/next** for MDX content management with Zod schema validation.

### Rationale
- **Modern API**: Designed specifically for Next.js 15+ App Router with first-class TypeScript support
- **Zero Runtime Overhead**: Compiles content at build time, no runtime database needed (Constitution I compliance)
- **Type Safety**: Generates TypeScript types from content schemas automatically
- **Performance**: Content processed during build, resulting in zero runtime parsing overhead
- **Zod Integration**: Native Zod schema support for frontmatter validation (FR-059 requirement)
- **Transform Pipeline**: Built-in content transformation (reading time calculation, slug generation)

### Alternatives Considered

**Contentlayer**:
- Rejected: Project appears to be in maintenance mode with limited updates
- Last major release was over 6 months ago
- Community concerns about long-term support

**next-mdx-remote**:
- Rejected: Requires manual implementation of content collection logic
- No built-in schema validation or type generation
- More boilerplate code needed for frontmatter parsing and validation

**@next/mdx**:
- Rejected: Designed for MDX pages, not content collections
- Limited support for frontmatter and metadata extraction
- Not suitable for blog post management at scale

### Implementation Notes
```typescript
// content-collections.config.ts
import { defineCollection, defineConfig } from '@content-collections/next'
import { z } from 'zod'
import readingTime from 'reading-time'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    category: z.enum(['technical', 'fitness', 'lifestyle']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  }),
  transform: (doc) => ({
    ...doc,
    slug: doc._meta.path,
    readingTime: Math.ceil(readingTime(doc.content).minutes),
  }),
})

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.json',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    demoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    technologies: z.array(z.string()),
    category: z.enum(['web', 'mobile', 'backend', 'other']),
    featured: z.boolean().default(false),
    status: z.enum(['completed', 'in-progress', 'archived']),
  }),
})

export default defineConfig({
  collections: [posts, projects],
})
```

---

## R2: Contact Form Email Service

### Decision
Use **Resend** for serverless email delivery with honeypot spam protection.

### Rationale
- **Generous Free Tier**: 3,000 emails/month (later updated to 5,000) - sufficient for personal portfolio
- **Modern API**: Simple RESTful API with excellent TypeScript SDK
- **Developer Experience**: Minimal setup, clear documentation, React Email template support
- **Deliverability**: High deliverability rates, SPF/DKIM configuration handled
- **No Database Required**: Aligns with Constitution I zero-database constraint
- **Pricing**: Free tier covers expected volume (<50 submissions/month per spec)

### Alternatives Considered

**SendGrid**:
- Rejected: More complex API, overkill for simple contact form
- Free tier: 100 emails/day (3,000/month) - same as Resend but worse DX
- Older API design, less TypeScript-friendly

**Formspree**:
- Rejected: Third-party form hosting, less control over implementation
- Free tier: 50 submissions/month - insufficient for growth
- Harder to customize validation and spam protection

**mailto: Link Only**:
- Rejected: Poor user experience, exposes email publicly
- No spam protection, no submission tracking
- Fails FR-027 requirement for contact form

### Implementation Notes
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'
import { z } from 'zod'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  website: z.string().max(0), // Honeypot field
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, website } = contactSchema.parse(body)

    // Honeypot check
    if (website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: 'your-email@example.com',
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
```

**Environment Variables**:
- `RESEND_API_KEY`: Obtained from resend.com dashboard after signup

---

## R3: Analytics Service Selection

### Decision
Use **PostHog** for privacy-focused product analytics.

### Rationale
- **Privacy-First**: GDPR/CCPA compliant out of the box, no cookie banners required
- **Comprehensive Tracking**: Page views, custom events, session recordings (optional), feature flags
- **Open Source Core**: Transparency into data practices, self-hostable option for maximum privacy
- **Generous Free Tier**: 1M events/month - far exceeds expected portfolio traffic (<10k monthly visitors)
- **Next.js Integration**: Official `@posthog/next` package with App Router support
- **No PII Collection**: Anonymous session tracking, no personally identifiable information required
- **Constitution VIII Compliance**: Explicitly privacy-focused, no third-party tracking scripts

### Alternatives Considered

**Plausible Analytics**:
- Considered favorably, but rejected for feature set limitations
- Pros: Simplest privacy-focused analytics, no cookie banner, lightweight script
- Cons: Limited event tracking capabilities, no session recordings, higher cost at scale
- Pricing: $9/month for 10k visitors (acceptable) but limited insights compared to PostHog

**Vercel Analytics**:
- Rejected: Limited to basic Web Vitals and page views
- No custom event tracking for contact form clicks, video plays, etc.
- Insufficient for SC-007 to SC-011 engagement metrics requirements

**Google Analytics**:
- Rejected: Explicitly prohibited by Constitution VIII
- Privacy concerns, requires cookie consent banners
- Violates privacy-first principle

**Fathom Analytics**:
- Rejected: Similar to Plausible but more expensive ($14/month for 10k visitors)
- Limited feature set compared to PostHog free tier

### Implementation Notes
```typescript
// app/layout.tsx
import { PHProvider } from '@/components/providers/posthog-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  )
}

// components/providers/posthog-provider.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // Manual page view tracking
      disable_session_recording: true, // Privacy: disable by default
      anonymize_ip: true, // GDPR compliance
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

**Environment Variables**:
- `NEXT_PUBLIC_POSTHOG_KEY`: Project API key from posthog.com
- `NEXT_PUBLIC_POSTHOG_HOST`: Usually `https://app.posthog.com`

**Custom Events to Track**:
- `project_viewed`: When user clicks on project card
- `project_demo_clicked`: When user clicks demo link
- `blog_post_viewed`: When user opens blog post
- `contact_form_submitted`: When contact form successfully submits
- `resume_downloaded`: When user downloads resume PDF
- `social_link_clicked`: Which social platform was clicked
- `video_played`: When embedded YouTube video plays

---

## R4: Project Detail Page Strategy

### Decision
**Hybrid approach**: Modal preview for quick browsing + dedicated project pages for comprehensive case studies.

### Rationale
- **Multi-Persona Optimization**: Serves both recruiters (P1 - quick scanning) and collaborators (P3 - deep evaluation)
- **SEO Benefit**: Project pages have unique URLs for sharing and search indexing
- **Progressive Disclosure**: Users can choose depth of engagement (modal = quick, page = detailed)
- **Performance**: Modal loads instantly without page navigation, reduces friction
- **Shareable Content**: Deep links to project case studies for LinkedIn/Twitter sharing

### Alternatives Considered

**Modal Only**:
- Rejected: Insufficient detail for P3 collaborators who need comprehensive case studies
- No SEO benefit from unique URLs
- Cannot share specific project details on social media

**Dedicated Pages Only**:
- Rejected: Forces page navigation for quick browsers (P1 recruiters)
- Slower interaction for users just wanting to see tech stack
- Higher friction for mobile users

**Inline Expansion**:
- Rejected: Causes layout shift, poor mobile experience
- Difficult to maintain scroll position
- No unique URLs for sharing

### Implementation Notes

**Project Card Component**:
```typescript
// components/home/ProjectCard.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

export function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        {/* Project card UI */}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="flex gap-2">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank">
                  <ExternalLink /> Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank">
                  <Github /> GitHub
                </a>
              </Button>
            )}
            <Button asChild>
              <Link href={`/projects/${project.slug}`}>
                Learn More
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

**Project Detail Page**:
```typescript
// app/projects/[slug]/page.tsx
import { allProjects } from 'content-collections'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }) {
  const project = allProjects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <article>
      {/* Comprehensive case study with:
          - Problem statement
          - Technical approach
          - Architecture diagrams
          - Challenges overcome
          - Measurable outcomes
          - Related projects
      */}
    </article>
  )
}
```

---

## R5: Client-Side Search Implementation

### Decision
Use **Fuse.js** for client-side fuzzy search across blog posts with pre-built search index.

### Rationale
- **Zero Backend**: Client-side only, aligns with zero-database constraint (Constitution I)
- **Fuzzy Matching**: Tolerates typos and partial matches (e.g., "reacthooks" finds "React Hooks")
- **Small Bundle Size**: ~4KB gzipped, minimal performance impact
- **Simple API**: Easy to configure and integrate with existing content collections
- **Search Across Fields**: Can search titles, descriptions, tags, and content simultaneously

### Alternatives Considered

**FlexSearch**:
- Rejected: More complex API, harder to configure
- Pros: Slightly faster, more advanced features
- Cons: Overkill for expected content volume (<50 blog posts initially)

**Pagefind** (Static Search):
- Rejected: Requires build-time index generation, more complex setup
- Better for larger sites (100+ pages)
- Unnecessary complexity for portfolio scale

**Server-Side Search with API Route**:
- Rejected: Violates zero-database principle
- Requires backend infrastructure and runtime overhead
- Slower user experience (network roundtrip)

**No Search** (Tag Filtering Only):
- Rejected: Fails FR-025 requirement for full-text search
- Poor user experience for finding specific content

### Implementation Notes
```typescript
// lib/search.ts
import Fuse from 'fuse.js'
import { allPosts } from 'content-collections'

export function createSearchIndex() {
  return new Fuse(allPosts, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3, // 0.0 = exact match, 1.0 = match anything
    includeScore: true,
  })
}

// components/blog/SearchBar.tsx
'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { createSearchIndex } from '@/lib/search'

export function SearchBar({ onResults }) {
  const [query, setQuery] = useState('')
  const fuse = useMemo(() => createSearchIndex(), [])

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length === 0) {
      onResults([]) // Show all posts
    } else {
      const results = fuse.search(value).map(r => r.item)
      onResults(results)
    }
  }

  return (
    <Input
      type="search"
      placeholder="Search blog posts..."
      value={query}
      onChange={handleSearch}
    />
  )
}
```

---

## R6: YouTube Video Embedding Strategy

### Decision
Use **lite-youtube-embed** for performant, lazy-loaded YouTube video embeds with manual video ID configuration.

### Rationale
- **Performance**: Lazy loads YouTube iframe only on user interaction (click to play)
- **Core Web Vitals**: Prevents YouTube's heavy JavaScript from blocking initial page load
- **Bundle Size**: <2KB, replaces ~500KB of YouTube embed scripts
- **User Experience**: Shows thumbnail immediately, loads player on click
- **Manual Configuration**: Hardcoded video IDs in content (no YouTube Data API needed)

### Alternatives Considered

**Native YouTube iframe Embed**:
- Rejected: Loads ~500KB JavaScript immediately, blocks page load
- Negative impact on Lighthouse performance score
- Fails performance targets (FCP <1.5s requirement)

**YouTube Data API Integration**:
- Rejected: Requires API key, quota management, runtime requests
- Violates zero-database/zero-runtime-dependency principle
- Unnecessary complexity for 3-4 manually curated videos

**react-player**:
- Rejected: Larger bundle size (~30KB), supports multiple platforms (unnecessary)
- Still loads YouTube scripts immediately unless configured for lazy loading

### Implementation Notes
```typescript
// components/home/FeaturedVideos.tsx
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const FEATURED_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'Marathon Training Tips' },
  { id: 'jNQXAC9IVRw', title: 'React Server Components Explained' },
  { id: 'oHg5SJYRHA0', title: 'My First Marathon Experience' },
]

export function FeaturedVideos() {
  return (
    <section>
      <h2>Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURED_VIDEOS.map((video) => (
          <LiteYouTubeEmbed
            key={video.id}
            id={video.id}
            title={video.title}
            poster="hqdefault" // Thumbnail quality
          />
        ))}
      </div>
    </section>
  )
}
```

**Configuration**:
- Video IDs stored in `lib/constants.ts` for easy updates
- Thumbnails automatically loaded from YouTube CDN
- No API keys or quotas required

---

## R7: Testing Strategy

### Decision
Use **Playwright** for E2E testing of critical user flows and **Lighthouse CI** for automated performance validation.

### Rationale
- **Playwright Benefits**:
  - Modern E2E framework with excellent Next.js support
  - Cross-browser testing (Chrome, Firefox, Safari)
  - Fast execution, parallel test running
  - Built-in mobile viewport testing
  - Better TypeScript support than Cypress

- **Lighthouse CI Benefits**:
  - Automated performance regression detection
  - Runs on every pull request via GitHub Actions
  - Prevents merging code that degrades performance
  - Enforces Constitution I performance targets (95+ score)

### Alternatives Considered

**Cypress**:
- Rejected: Slower than Playwright, less TypeScript-friendly
- Configuration more complex for Next.js App Router

**Jest + Testing Library** (Unit Tests Only):
- Rejected as sole testing strategy: Insufficient coverage for user flows
- Still useful for utility function testing (optional)

**No E2E Tests**:
- Rejected: Fails to validate critical user journeys (contact form, navigation)
- Manual testing prone to regressions

### Implementation Notes

**Playwright Tests**:
```typescript
// tests/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Contact')

  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('textarea[name="message"]', 'This is a test message with more than 20 characters.')

  await page.click('button[type="submit"]')

  await expect(page.locator('text=Message sent successfully')).toBeVisible()
})

test('honeypot spam protection', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Contact')

  // Fill honeypot field (should be hidden)
  await page.fill('input[name="website"]', 'spam')
  await page.fill('input[name="name"]', 'Spammer')
  await page.fill('input[name="email"]', 'spam@example.com')
  await page.fill('textarea[name="message"]', 'Spam message')

  await page.click('button[type="submit"]')

  await expect(page.locator('text=Message sent successfully')).not.toBeVisible()
})
```

**Lighthouse CI Configuration**:
```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Lighthouse CI Config**:
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: '.next',
      url: ['http://localhost:3000/', 'http://localhost:3000/blog'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

---

## R8: Dark Mode Implementation

### Decision
**Optional for MVP** - Implement theme toggle using next-themes with CSS variable-based theming (OKLCH color space).

### Rationale
- **Constitution Alignment**: FR-062 marks dark mode as "SHOULD" (optional), not "MUST"
- **User Preference**: Many modern users expect dark mode option
- **System Preference Detection**: Automatically detects `prefers-color-scheme` media query
- **CSS Variables**: Theme switching via CSS variables (already used in globals.css)
- **Zero Runtime Cost**: Pure CSS theming, no JavaScript overhead

### Alternatives Considered

**No Dark Mode**:
- Considered acceptable for MVP per FR-062
- Rejected: Low implementation cost, high user value

**Tailwind Dark Mode Plugin**:
- Rejected: Already using CSS variables approach (better for Tailwind v4)
- `next-themes` provides better system preference integration

**Manual Theme Toggle**:
- Rejected: Reinventing the wheel, `next-themes` is battle-tested

### Implementation Notes
```typescript
// components/providers/ThemeProvider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}

// components/shared/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

**CSS Variables** (already in `app/globals.css`):
```css
:root {
  --background: oklch(100% 0 0);
  --foreground: oklch(15% 0 0);
  /* Other light theme variables */
}

.dark {
  --background: oklch(15% 0 0);
  --foreground: oklch(100% 0 0);
  /* Other dark theme variables */
}
```

---

## R9: Font Loading Strategy

### Decision
Use **next/font/google** for automatic font optimization with Geist Sans and Geist Mono (already configured in project).

### Rationale
- **Already Implemented**: Project already uses Geist fonts via `next/font` (see `app/layout.tsx`)
- **Zero CLS**: Fonts preloaded and optimized by Next.js, prevents layout shift
- **Performance**: Fonts self-hosted automatically, no external requests
- **Font Display**: Uses `font-display: swap` to prevent invisible text

### Implementation Notes
```typescript
// app/layout.tsx (already exists)
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

**CSS Usage**:
```css
/* app/globals.css */
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
```

---

## R10: Image Optimization Workflow

### Decision
Store images in `/public/images/` directory, version-controlled with Git, using Next.js Image component for automatic optimization.

### Rationale
- **Simple Workflow**: No external image CDN or CMS needed
- **Version Control**: Images tracked alongside code for reproducibility
- **Automatic Optimization**: Next.js Image component generates WebP/AVIF, responsive sizes
- **Local Preview**: Images available immediately in `npm run dev` without deployment
- **Constitution Compliance**: Aligns with zero-database, Git-based content management

### Alternatives Considered

**External Image CDN** (Cloudinary, Imgix):
- Rejected: Adds external dependency, costs at scale
- Unnecessary for portfolio image volume (<100 images)

**Unsplash/External Images**:
- Rejected: Slower loading, no control over availability
- External requests hurt performance

**Base64 Inline Images**:
- Rejected: Bloats HTML/CSS, prevents lazy loading
- Worse performance than optimized external images

### Implementation Notes

**Image Organization**:
```text
public/
├── images/
│   ├── headshot.jpg           # 800x800px, priority load
│   ├── og-image.png            # 1200x630px for social sharing
│   ├── projects/
│   │   ├── ecommerce.jpg       # 1200x675px (16:9)
│   │   ├── fitness-tracker.jpg
│   │   └── portfolio.jpg
│   └── blog/
│       ├── react-hooks.jpg
│       ├── marathon-training.jpg
│       └── typescript-tips.jpg
```

**Usage Example**:
```typescript
import Image from 'next/image'

// Hero headshot (priority load)
<Image
  src="/images/headshot.jpg"
  alt="John Doe - Fullstack Engineer"
  width={800}
  height={800}
  priority
  className="rounded-full"
/>

// Project card (lazy load)
<Image
  src="/images/projects/ecommerce.jpg"
  alt="E-commerce Platform"
  width={1200}
  height={675}
  loading="lazy"
  className="rounded-lg"
/>
```

**Optimization Guidelines**:
- Use JPG for photos (80-85% quality)
- Use PNG for screenshots with text
- Compress with tools like Squoosh or ImageOptim before committing
- Specify exact dimensions to prevent CLS

---

## Summary Table

| Research Item | Decision | Rationale |
|--------------|----------|-----------|
| Content Management | @content-collections/next | Modern, type-safe, zero runtime overhead |
| Contact Form Email | Resend | Simple API, generous free tier, TypeScript SDK |
| Analytics | PostHog | Privacy-focused, feature-rich, open source |
| Project Pages | Hybrid (Modal + Pages) | Optimizes for both quick browsing and deep evaluation |
| Search | Fuse.js | Client-side fuzzy search, small bundle, simple API |
| YouTube Embeds | lite-youtube-embed | Lazy loading, minimal bundle, no API required |
| Testing | Playwright + Lighthouse CI | Modern E2E framework, automated performance checks |
| Dark Mode | next-themes (optional MVP) | Low cost, high value, system preference support |
| Fonts | next/font/google (Geist) | Already configured, zero CLS, automatic optimization |
| Images | /public/images + Next.js Image | Version-controlled, auto-optimized, simple workflow |

---

## Next Steps

1. ✅ Research complete
2. → **Phase 1**: Generate data-model.md with entity schemas
3. → **Phase 1**: Generate API contracts in /contracts/ directory
4. → **Phase 1**: Generate quickstart.md for local development setup
5. → **Phase 1**: Update agent context (.github/copilot-instructions.md)
6. → **Phase 1**: Re-evaluate Constitution Check post-design
