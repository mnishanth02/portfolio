# Implementation Plan: Personal Portfolio Website

**Branch**: `001-portfolio-site-v1` | **Date**: 2025-10-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-site-v1/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a personal portfolio website for a fullstack engineer and marathon runner that serves dual purposes: technical recruiting and fitness community building. The site will be a single-page application with sections for hero introduction, about/timeline, projects showcase, blog/content hub, and contact form. Technical approach uses Next.js 15 App Router with Static Site Generation, MDX for content management, and Tailwind CSS for styling. No runtime database per constitution constraints; all content is statically generated at build time. Target Lighthouse performance score of 95+ with sub-1.5s First Contentful Paint.

## Technical Context

**Language/Version**: TypeScript 5.0+ (strict mode enabled)
**Primary Dependencies**: Next.js 15.5.6, React 19, Tailwind CSS v4, Shadcn/ui, MDX (@next/mdx or next-mdx-remote), Content Collections (@content-collections/next or contentlayer), React Hook Form, Zod
**Storage**: N/A (zero-database constraint - all content in Git-tracked MDX files)
**Testing**: Playwright for E2E (contact form, navigation), Vitest for utilities (optional unit tests), Lighthouse CI for performance validation
**Target Platform**: Vercel (production), Web browsers (Chrome, Safari, Firefox, Edge - latest 2 versions), Mobile responsive (320px-1440px+ viewports)
**Project Type**: Web application (Next.js App Router single-page app with blog routing)
**Performance Goals**: Lighthouse performance score 95+, First Contentful Paint <1.5s, Cumulative Layout Shift <0.1, Largest Contentful Paint <2.5s, Time to Interactive <3.5s
**Constraints**: Zero runtime database, static generation only (except contact form API route), Tailwind CSS only for styling (no CSS-in-JS), Server Components by default (Client Components require justification), privacy-focused analytics (no Google Analytics)
**Scale/Scope**: Single user portfolio, ~10-20 blog posts initially, 6-8 featured projects, 3-4 embedded YouTube videos, expected traffic <10k monthly visitors, contact form <50 submissions/month

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Performance & User Experience
- ✅ **Performance Targets**: Spec requires Lighthouse 95+, FCP <1.5s, CLS <0.1, LCP <2.5s, TTI <3.5s (FR-033 to FR-035, SC-002 to SC-005)
- ✅ **Zero Database Constraint**: No runtime database specified; all content in MDX files (FR-057 to FR-059, Constitution I)
- ✅ **Responsive Design**: Mobile-first approach with explicit viewport testing (FR-039 to FR-043, SC-015)
- ✅ **Touch Targets**: 44×44px minimum specified (FR-040)

### Principle II: Technical Standards
- ✅ **Next.js 15 App Router**: Specified in tech stack (input.md, Constitution II)
- ✅ **TypeScript Strict Mode**: Explicitly required in tech stack selection (input.md)
- ✅ **Server Components Default**: Architecture plan specifies server components by default with "use client" requiring justification (input.md)
- ✅ **Static Site Generation**: FR-038 mandates SSG for all routes

### Principle III: Content Management
- ✅ **MDX with Frontmatter**: FR-057 to FR-061 mandate MDX files in `/content/blog/` and `/content/projects/`
- ✅ **Frontmatter Validation**: Zod schema validation specified (FR-059, input.md)
- ✅ **Next.js Image Component**: FR-036 mandates use of Next.js Image component for all images
- ✅ **Git Version Control**: Content managed in Git per Constitution III

### Principle IV: Code Quality & Maintainability
- ✅ **Tailwind CSS Only**: Explicitly mandated styling approach (input.md, Constitution IV)
- ✅ **Component Composition**: Shadcn/ui component library follows composition pattern (input.md)
- ✅ **Error Boundaries**: Implementation plan includes error boundaries and loading states (input.md Phase 4)
- ✅ **TypeScript Interfaces**: Constitution IV requires JSDoc comments for all component props

### Principle V: SEO & Accessibility
- ✅ **WCAG 2.1 AA Compliance**: FR-054 mandates 4.5:1 contrast ratio, Constitution V requires AA compliance
- ✅ **Semantic HTML**: FR-051 mandates semantic HTML5 elements
- ✅ **Meta Tags**: FR-044 to FR-049 specify comprehensive meta tag requirements
- ✅ **Alt Text**: FR-050 requires descriptive alt text for all images
- ✅ **Keyboard Navigation**: FR-053 mandates keyboard navigability with visible focus indicators

### Principle VI: Deployment & Hosting
- ✅ **Vercel Platform**: Specified in tech stack and deployment configuration (input.md)
- ✅ **Lighthouse CI**: Implementation plan includes Lighthouse CI in GitHub Actions (input.md)
- ✅ **Environment Variables**: .env.example pattern specified, never committed (input.md)
- ✅ **Preview Deployments**: Vercel configuration enables automatic preview deployments

### Principle VII: Content Strategy
- ✅ **Integrated Content**: Spec requires unified technical and fitness content with dual-purpose tagging (FR-024, Constitution VII)
- ✅ **Cross-Domain Tagging**: Blog posts support technical and fitness tags (FR-019, FR-024)
- ✅ **Unified Identity**: About section integrates engineering and running narratives (FR-008, User Story 2)

### Principle VIII: Privacy & Analytics
- ✅ **Privacy-Focused Analytics**: PostHog specified (Open Question 2 resolution), Constitution VIII prohibits Google Analytics
- ✅ **No Database for Contact Form**: Resend email service specified (Open Question 1), no submission storage (FR-027 to FR-030)
- ✅ **GDPR Compliance**: PostHog configuration uses privacy-first settings (input.md clarification)
- ✅ **Honeypot Spam Protection**: FR-031 specifies honeypot technique (no tracking scripts)

**GATE STATUS**: ✅ **PASS** - All constitutional principles satisfied. No violations requiring justification.

**Post-Design Re-evaluation** (Phase 1 Complete):
- ✅ **Data Model**: Zero-database architecture maintained (Git-tracked MDX/JSON files only)
- ✅ **API Contracts**: Contact form API uses serverless email (Resend), no persistence
- ✅ **Content Collections**: @content-collections/next provides type-safe, build-time content processing
- ✅ **Performance**: Static generation strategy preserves sub-1.5s FCP target
- ✅ **Privacy**: PostHog configuration uses privacy-first settings (no PII tracking)

No design decisions violate constitution principles. Proceeding to Phase 2 (task breakdown).

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-site-v1/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── contact-api.openapi.yaml
│   └── mdx-frontmatter.schema.json
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
portfolio-website/
├── .github/
│   ├── workflows/
│   │   └── lighthouse-ci.yml     # Performance validation on PR
│   └── copilot-instructions.md   # Already exists
├── app/
│   ├── (home)/                   # Route group for home page
│   │   ├── page.tsx              # Home page (hero, about, projects, contact)
│   │   └── layout.tsx            # Home-specific layout (optional)
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page with filtering/search
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual blog post page (SSG)
│   │   └── layout.tsx            # Blog layout with sidebar/breadcrumbs
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx          # Individual project detail pages (SSG)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # POST /api/contact (Resend email)
│   ├── layout.tsx                # Root layout (metadata, fonts, providers)
│   ├── globals.css               # Tailwind imports + design tokens
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Sitemap generation
│   └── robots.ts                 # Robots.txt generation
├── components/
│   ├── ui/                       # Shadcn/ui components (button, card, etc.)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   └── ...                   # Other shadcn components
│   ├── home/                     # Home page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── blog/                     # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── MDXComponents.tsx     # Custom MDX component overrides
│   │   └── TableOfContents.tsx   # Auto-generated TOC
│   ├── shared/                   # Shared components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── SocialLinks.tsx
│   │   └── ScrollToTop.tsx
│   └── providers/                # Context providers
│       └── ThemeProvider.tsx     # Dark mode provider (optional)
├── content/
│   ├── blog/                     # MDX blog posts
│   │   ├── example-post.mdx
│   │   ├── marathon-training-plan.mdx
│   │   └── react-server-components.mdx
│   └── projects/                 # Project data (JSON or MDX)
│       ├── ecommerce-platform.json
│       ├── fitness-tracker.json
│       └── portfolio-website.json
├── lib/
│   ├── mdx.ts                    # MDX processing utilities
│   ├── utils.ts                  # cn() helper + misc utilities
│   ├── constants.ts              # Site metadata, nav links, social links
│   └── validations.ts            # Zod schemas for contact form + frontmatter
├── public/
│   ├── images/                   # Static images (projects, blog, headshot)
│   │   ├── headshot.jpg
│   │   ├── projects/
│   │   │   ├── project-1.jpg
│   │   │   └── ...
│   │   └── blog/
│   │       ├── post-1-hero.jpg
│   │       └── ...
│   ├── resume.pdf                # Downloadable resume
│   ├── favicon.ico
│   └── og-image.png              # OpenGraph share image
├── styles/
│   └── mdx.css                   # MDX-specific styles (code blocks, callouts)
├── types/
│   └── index.ts                  # TypeScript type definitions
├── tests/                        # E2E and integration tests
│   ├── e2e/
│   │   ├── contact-form.spec.ts
│   │   ├── navigation.spec.ts
│   │   └── blog.spec.ts
│   └── integration/
│       └── mdx-processing.spec.ts
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example env file (committed)
├── content-collections.config.ts # Content collections config
├── next.config.ts                # Next.js configuration (already exists)
├── tailwind.config.ts            # Tailwind configuration (if needed beyond v4 defaults)
├── tsconfig.json                 # TypeScript configuration (already exists)
├── package.json                  # Already exists
├── biome.json                    # Already exists
├── components.json               # Already exists (shadcn config)
└── README.md                     # Already exists
```

**Structure Decision**: Web application using Next.js 15 App Router structure. Chose App Router over Pages Router per Constitution Principle II. Single-page home experience implemented via route group `(home)` with smooth scrolling sections. Blog and project detail pages use dynamic routes with `generateStaticParams` for SSG. Content separated from code in `/content` directory for clear authoring workflow. Components organized by feature area (home, blog, shared, ui) for maintainability.

## Complexity Tracking

**No violations detected** - All constitutional principles are satisfied by the proposed architecture and technical approach. No complexity justifications required.
