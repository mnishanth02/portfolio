Create a comprehensive technical implementation plan for the personal portfolio website based on the approved specification. The plan should follow the project constitution principles and provide detailed guidance for implementation.

## Tech Stack Selection

**Core Framework:**
- Next.js 15+ with App Router
- React 18+ (Server Components by default)
- TypeScript 5.0+ (strict mode enabled)

**Styling & UI:**
- Tailwind CSS 4+ with custom design tokens
- Shadcn/ui component library
- CSS Variables for theme management (dark mode support)

**Content Management:**
- MDX with @next/mdx or next-mdx-remote
- Content Collections using contentlayer or @content-collections/next
- Gray-matter for frontmatter parsing
- Reading-time for estimated read time calculation

**Image & Media:**
- Next.js Image component with automatic optimization
- Sharp for image processing (built-in with Next.js)
- Lite-youtube-embed for performant video embeds

**Form Handling:**
- [TO BE DECIDED based on clarification: Resend API / Formspree / mailto]
- React Hook Form for client-side validation
- Zod for schema validation

**Analytics & Monitoring:**
- Plausible Analytics (privacy-focused, no cookie banner required)
- Vercel Analytics for Web Vitals tracking

**Deployment & Hosting:**
- Vercel (optimized for Next.js)
- GitHub for version control and CI/CD

## Project Structure

portfolio-website/
├── .github/
│ └── workflows/ # CI/CD workflows (if needed)
├── app/
│ ├── (home)/ # Route group for home page
│ │ ├── page.tsx # Home page (hero, about, projects, contact)
│ │ └── layout.tsx # Home-specific layout
│ ├── blog/
│ │ ├── page.tsx # Blog listing page
│ │ ├── [slug]/
│ │ │ └── page.tsx # Individual blog post page
│ │ └── layout.tsx # Blog layout with sidebar
│ ├── projects/
│ │ └── [slug]/
│ │ └── page.tsx # Individual project detail pages (optional)
│ ├── api/
│ │ └── contact/
│ │ └── route.ts # API route for contact form (if serverless)
│ ├── layout.tsx # Root layout
│ ├── not-found.tsx # 404 page
│ └── globals.css # Global styles and Tailwind imports
├── components/
│ ├── ui/ # Shadcn/ui components (button, card, etc.)
│ ├── home/ # Home page sections
│ │ ├── Hero.tsx
│ │ ├── About.tsx
│ │ ├── Projects.tsx
│ │ ├── Blog.tsx
│ │ └── Contact.tsx
│ ├── blog/ # Blog-specific components
│ │ ├── BlogCard.tsx
│ │ ├── MDXComponents.tsx
│ │ └── TableOfContents.tsx
│ ├── shared/ # Shared components
│ │ ├── Navigation.tsx
│ │ ├── Footer.tsx
│ │ ├── SocialLinks.tsx
│ │ └── ScrollToTop.tsx
│ └── providers/ # Context providers
│ └── ThemeProvider.tsx
├── content/
│ ├── blog/ # MDX blog posts
│ │ ├── example-post.mdx
│ │ └── ...
│ └── projects/ # Project data (JSON or MDX)
│ ├── project-1.json
│ └── ...
├── lib/
│ ├── mdx.ts # MDX processing utilities
│ ├── utils.ts # Utility functions (cn helper, etc.)
│ ├── constants.ts # Site metadata and constants
│ └── validations.ts # Zod schemas for forms
├── public/
│ ├── images/ # Static images
│ ├── resume.pdf # Downloadable resume
│ ├── favicon.ico
│ └── ...
├── styles/
│ └── mdx.css # MDX-specific styles
├── types/
│ └── index.ts # TypeScript type definitions
├── .env.local # Environment variables (not committed)
├── .env.example # Example env file
├── content-collections.config.ts # Content collections config
├── next.config.mjs # Next.js configuration
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json # TypeScript configuration
└── package.json

text

## Data Models & Schemas

**Blog Post Frontmatter:**
interface BlogPost {
title: string
description: string
publishedAt: string // ISO date
updatedAt?: string
category: 'technical' | 'fitness' | 'lifestyle'
tags: string[]
featured?: boolean
image?: string // Featured image path
author?: string
readingTime?: number // Calculated
slug: string // Generated from filename
}

text

**Project Data:**
interface Project {
id: string
title: string
description: string
longDescription?: string // For detail page
image: string
demoUrl?: string
githubUrl?: string
technologies: string[] // ['Next.js', 'TypeScript', 'Tailwind']
category: 'web' | 'mobile' | 'backend' | 'other'
featured?: boolean
startDate?: string
endDate?: string
status: 'completed' | 'in-progress' | 'archived'
}

text

**Site Metadata:**
interface SiteConfig {
name: string
description: string
url: string
ogImage: string
author: {
name: string
email: string
twitter: string
github: string
linkedin: string
strava?: string
}
nav: { title: string; href: string }[]
}

text

## Component Architecture

**Home Page Structure:**
// app/(home)/page.tsx
export default function HomePage() {
return (
<>
<Hero />
<About />
<Projects />
<Blog />
<Contact />
</>
)
}

text

**Server Component Strategy:**
- All data fetching components are Server Components by default
- Use "use client" only for:
  - Contact form with React Hook Form
  - Navigation menu toggle (mobile)
  - Theme toggle
  - Scroll-to-top button
  - Any interactive animations

**Content Collections Setup:**
// content-collections.config.ts
import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
name: 'posts',
directory: 'content/blog',
include: '**/*.mdx',
schema: (z) => ({
title: z.string(),
description: z.string(),
publishedAt: z.string(),
category: z.enum(['technical', 'fitness', 'lifestyle']),
tags: z.array(z.string()),
image: z.string().optional(),
}),
transform: (doc) => ({
...doc,
slug: doc._meta.path,
readingTime: calculateReadingTime(doc.content),
}),
})

export default defineConfig({
collections: [posts],
})

text

## Implementation Phases

**Phase 1: Foundation Setup (Days 1-3)**
1. Initialize Next.js project with TypeScript and Tailwind
2. Install and configure Shadcn/ui
3. Set up content collections for MDX
4. Configure Next.js Image optimization
5. Create base layout and navigation structure
6. Implement theme provider for dark mode

**Phase 2: Home Page Sections (Days 4-7)**
1. Build Hero component with CTA buttons
2. Create About section with timeline
3. Implement Projects grid with filter/search
4. Add Blog preview section pulling latest posts
5. Build Contact section with form
6. Create Footer with social links

**Phase 3: Blog Functionality (Days 8-10)**
1. Set up MDX processing pipeline
2. Create blog listing page with pagination
3. Build individual blog post layout
4. Implement MDX custom components (code blocks, callouts)
5. Add table of contents generation
6. Create tag and category filtering

**Phase 4: Polish & Optimization (Days 11-13)**
1. Optimize images and implement lazy loading
2. Add loading states and error boundaries
3. Implement SEO meta tags and OpenGraph
4. Generate sitemap.xml and robots.txt
5. Set up analytics integration
6. Conduct accessibility audit and fixes

**Phase 5: Deployment & Testing (Day 14)**
1. Configure Vercel deployment
2. Set up environment variables
3. Test contact form submission
4. Run Lighthouse audits and optimize
5. Cross-browser and device testing
6. Final QA and launch

## Performance Optimization Strategy

**Image Optimization:**
- Use Next.js Image component with proper sizes attribute
- Implement blur placeholders for above-fold images
- Use priority loading for hero image only
- Lazy load all other images
- Serve images in modern formats (WebP/AVIF)

**Code Splitting:**
- Dynamic imports for heavy components (YouTube embed, contact form)
- Separate bundles for client vs server components
- Tree-shake unused Shadcn/ui components

**Caching Strategy:**
- Static generation for all blog posts and project pages
- Revalidate content on-demand via webhook (optional)
- Cache static assets with long expiry headers
- Use CDN for asset delivery (Vercel Edge Network)

**Font Optimization:**
- Use next/font for automatic font optimization
- Preload critical fonts
- Use font-display: swap to prevent layout shift

## SEO Implementation

**Meta Tags (app/layout.tsx):**
export const metadata: Metadata = {
metadataBase: new URL('https://yourportfolio.com'),
title: {
default: 'John Doe | Fullstack Engineer & Marathon Runner',
template: '%s | John Doe',
},
description: 'Personal portfolio showcasing fullstack development projects and marathon running journey.',
openGraph: {
type: 'website',
locale: 'en_US',
url: 'https://yourportfolio.com',
siteName: 'John Doe Portfolio',
images: ['/og-image.png'],
},
twitter: {
card: 'summary_large_image',
creator: '@yourtwitterhandle',
},
}

text

**Structured Data:**
- Add JSON-LD schema for Person, WebSite, BlogPosting
- Include breadcrumb navigation schema
- Add event schema for race results (optional)

**Sitemap Generation:**
// app/sitemap.ts
export default async function sitemap() {
const posts = await getAllPosts()
const projects = await getAllProjects()

return [
{ url: 'https://yourportfolio.com', lastModified: new Date() },
...posts.map(post => ({
url: https://yourportfolio.com/blog/${post.slug},
lastModified: post.updatedAt || post.publishedAt,
})),
...projects.map(project => ({
url: https://yourportfolio.com/projects/${project.id},
lastModified: new Date(),
})),
]
}

text

## Testing Strategy

**Unit Tests (Optional):**
- Utility functions (date formatting, reading time calculation)
- Form validation schemas

**E2E Tests (Recommended):**
- Contact form submission flow
- Navigation between pages
- Blog post rendering
- Mobile responsive behavior

**Performance Testing:**
- Lighthouse CI in GitHub Actions
- Core Web Vitals monitoring in Vercel
- Regular Lighthouse audits before deployment

## Deployment Configuration

**Vercel Configuration (vercel.json):**
{
"buildCommand": "next build",
"devCommand": "next dev",
"installCommand": "npm install",
"framework": "nextjs",
"regions": ["iad1"]
}

text

**Environment Variables:**
.env.local (not committed)
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

text

## Risk Mitigation

**Performance Risks:**
- Risk: Large images slow page load
- Mitigation: Use Next.js Image with proper sizing, implement lazy loading

**Content Risks:**
- Risk: Stale blog content
- Mitigation: Set up content update workflow with Git, automated reminders

**UX Risks:**
- Risk: Mobile navigation confusion
- Mitigation: User testing before launch, clear hamburger menu or sticky nav

**Technical Risks:**
- Risk: MDX parsing errors break builds
- Mitigation: Schema validation in content collections, local build testing

## Success Metrics Tracking

**Performance Metrics:**
- Lighthouse scores via Vercel Analytics
- Core Web Vitals (LCP, FID, CLS) tracking
- Page load time monitoring

**Engagement Metrics:**
- Plausible Analytics for page views, bounce rate, session duration
- Track CTA button clicks (View Projects, Contact, Resume Download)
- Social media link click tracking

**Conversion Metrics:**
- Contact form submission rate
- Resume download count
- External link clicks (GitHub, LinkedIn, project demos)

This plan provides a complete roadmap for implementation. Proceed to task breakdown once approved.