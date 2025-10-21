# Implementation Plan: Portfolio Redesign - Vertical Scroll Reduction

**Branch**: `002-portfolio-redesign` | **Date**: 2025-10-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-portfolio-redesign/spec.md`

## Summary

This plan implements a comprehensive homepage redesign to reduce vertical scroll by 50-60% (~3000-3800px) while maintaining Lighthouse 95+ performance and WCAG AA accessibility. The redesign introduces 6 major features across 3 phases: dual timeline layout, tabbed skills interface, horizontal article carousel, bento grid for projects, tabbed videos, and engineering philosophy relocation. All components follow React Server Component architecture where possible, with selective client-side interactivity using Next.js 15 App Router patterns.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled), React 19.2.0, Next.js 15.5.6
**Primary Dependencies**:
- UI Framework: Tailwind CSS v4, shadcn/ui (Radix UI primitives)
- Content: @content-collections/mdx 0.2.2, gray-matter (for frontmatter parsing)
- Icons: lucide-react 0.546.0
- Utilities: clsx 2.1.1, class-variance-authority 0.7.1
- Build: Turbopack (Next.js 15 default)

**Storage**: Filesystem-based (MDX files in /content/blog/*.mdx, static data in /lib/*.ts)
**Testing**: Manual testing (Lighthouse, WAVE, axe DevTools, real device testing), no automated test suite
**Target Platform**: Web (SSG via Next.js App Router), deployed on Vercel
**Project Type**: Next.js web application (brownfield - existing portfolio)
**Performance Goals**:
- Lighthouse Performance ≥95
- LCP <1.0s
- CLS <0.1
- FID <100ms
- Page weight increase <10%

**Constraints**:
- Zero database (all static generation)
- Mobile-first responsive design
- WCAG AA compliance mandatory
- No CSS-in-JS or CSS Modules
- Server Components default, Client Components only when necessary

**Scale/Scope**:
- 6 major features
- ~3000-3800px vertical scroll reduction
- 3-4 week implementation timeline
- Solo developer execution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. Performance & User Experience
- **Target**: Lighthouse 95+ maintained (currently met, must preserve)
- **LCP**: Target <1.0s (aggressive target, constitution allows <2.5s)
- **CLS**: Target <0.1 (aligned with constitution)
- **Mobile-first**: All new components designed mobile-first ✅
- **Zero database**: No runtime database, all static generation ✅

### ✅ II. Technical Standards
- **TypeScript strict mode**: Enabled in tsconfig.json ✅
- **Next.js 15 App Router**: Already using App Router ✅
- **Server Components**: Default strategy, Client only for tabs/carousel ✅
- **shadcn/ui**: Follow composition patterns, no core file modifications ✅

### ✅ III. Content Management
- **MDX with frontmatter**: Blog posts already in /content/blog/*.mdx ✅
- **Clarification resolved**: Using @content-collections/mdx (already installed) ✅
- **Next.js Image**: All images use <Image> component ✅
- **Git-based content**: All content version controlled ✅

### ✅ IV. Code Quality & Maintainability
- **JSDoc comments**: Required for all new components ✅
- **Composition patterns**: Timeline, skills, carousel built via composition ✅
- **Error boundaries**: Suspense boundaries for async components ✅
- **Tailwind-only styling**: No CSS-in-JS, Tailwind v4 exclusively ✅

### ✅ V. SEO & Accessibility
- **WCAG AA compliance**: Mandatory for all new components ✅
- **ARIA labels**: Timeline, tabs, carousel properly labeled ✅
- **Keyboard navigation**: Tab order, arrow keys, focus management ✅
- **Semantic HTML**: article, section, nav elements used ✅

### ✅ VI. Deployment & Hosting
- **Vercel deployment**: Already deployed on Vercel ✅
- **Lighthouse CI**: Will integrate before Phase 3 ✅
- **Preview deployments**: Automatic on PRs ✅

### ✅ VII. Content Strategy
- **Dual-purpose integration**: Timeline shows both IT career and running ✅
- **Unified identity**: Feature demonstrates integrated storytelling ✅

### ✅ VIII. Privacy & Analytics
- **PostHog analytics**: Already integrated (privacy-focused) ✅
- **No invasive tracking**: Compliant with constitution ✅

**Gate Status**: ✅ **PASS** - All constitutional requirements aligned. No violations to justify.

## Phase 6: Implementation - Videos Component

**Estimated Time**: 5-6 hours
**Dependencies**: Phase 1 complete
**Priority**: P2 (Important)

### Scope

Implement tabbed video gallery with 3 categories (Running, Coding, Talks).

### Tasks

1. **Create Videos Data** (1h)
   - File: `lib/constants.ts`
   - Define video arrays for each category (4-6 videos per category)
   - Include: title, youtubeId, duration, publishedAt, category
   - Thumbnail URLs: Auto-generate from `https://i.ytimg.com/vi/{youtubeId}/hqdefault.jpg`

2. **Build Videos Wrapper (RSC)** (30m)
   - File: `components/home/Videos.tsx`
   - Server Component wrapper
   - Fetch static video data
   - Pass to client component

3. **Build VideoTabs Component (Client)** (2h)
   - File: `components/home/VideoTabs.tsx`
   - Mark as `'use client'`
   - Use shadcn Tabs component
   - 3 tabs: Running, Coding, Talks (Running default)
   - Grid layout for video cards (2-3 per row)
   - Tab selection via useState (no URL persistence)

4. **Build VideoCard Component (RSC)** (1.5h)
   - File: `components/home/VideoCard.tsx`
   - Display: thumbnail, title, duration overlay, publish date
   - Click → Open YouTube modal or inline player
   - Use existing YouTubeEmbed component (`components/shared/YouTubeEmbed.tsx`)
   - Hover effect: Subtle scale + shadow

5. **Integrate into Homepage** (30m)
   - File: `app/page.tsx`
   - Insert Videos after Projects section
   - Section heading: "Videos"

6. **Testing & Refinement** (1h)
   - YouTube embed loading (lazy iframe)
   - Keyboard navigation between tabs
   - Mobile responsiveness (grid → single column)
   - Dark mode thumbnail borders

### Acceptance Criteria

- [ ] FR-028: Tabbed interface with 3 categories
- [ ] FR-029: Running tab default on load
- [ ] FR-030: Grid layout (2-3 videos per row)
- [ ] FR-031: YouTube thumbnails display
- [ ] FR-032: Click opens video player
- [ ] FR-033: Duration overlay on thumbnails
- [ ] FR-034: Hover effects functional
- [ ] SC-015: Vertical scroll reduced by 400-500px
- [ ] Performance: Lazy load YouTube iframes
- [ ] Accessibility: Keyboard tab navigation

### Files Modified/Created

**Created**:
- `components/home/Videos.tsx` (RSC wrapper)
- `components/home/VideoTabs.tsx` (Client component)
- `components/home/VideoCard.tsx` (RSC)

**Modified**:
- `lib/constants.ts` (add videos data)
- `app/page.tsx` (integrate Videos component)
- `components/shared/YouTubeEmbed.tsx` (verify lazy loading)

**Estimated Time**: 6-8 hours
**Dependencies**: Phase 1 complete
**Priority**: P1 (Critical)

### Scope

Implement bento grid layout showcasing 5-6 projects with 1 featured project spanning 2 columns.

### Tasks

1. **Create Projects Data** (2h)
   - File: `lib/projects.ts` (may already exist, extend if needed)
   - Define 5-6 project objects with:
     - title, description, tags, image, github, demo links
     - featured flag (true for 1 project)
     - Optional: metrics (users, performance, awards)
   - Ensure high-quality project images (1200×800px)

2. **Build ProjectsGrid Component (RSC)** (2h)
   - File: `components/home/ProjectsGrid.tsx`
   - CSS Grid layout:
     - Mobile: 1 column
     - Tablet: 2 columns
     - Desktop: 3 columns
   - Featured project spans 2 columns on md+
   - Gap spacing: 4 (1rem)
   - Section heading: "Featured Projects"

3. **Extend ProjectCard Component** (2h)
   - File: `components/shared/ProjectCard.tsx` (already exists, modify)
   - Add `featured` prop for larger variant
   - Featured: Larger image, more description text
   - Regular: Compact card
   - Hover effect: Lift + shadow increase
   - Tags display with badges
   - CTA buttons: "View Demo" / "View Code"

4. **Add Project Modal** (2h)
   - File: `components/shared/ProjectModal.tsx` (already exists, verify)
   - Click on card → Open modal with full details
   - Display: Full description, metrics, tech stack, screenshots
   - Close on ESC key or backdrop click

5. **Integrate into Homepage** (1h)
   - File: `app/page.tsx`
   - Insert ProjectsGrid after Skills section
   - Fetch projects data statically
   - Pass to ProjectsGrid component

6. **Testing & Refinement** (1h)
   - Grid responsiveness on all breakpoints
   - Modal accessibility (focus trap, ESC key)
   - Image optimization (WebP, blur placeholders)
   - Dark mode theme verification

### Acceptance Criteria

- [ ] FR-021: Bento grid displays 5-6 projects
- [ ] FR-022: Featured project spans 2 columns
- [ ] FR-023: Responsive grid (1 → 2 → 3 columns)
- [ ] FR-024: Hover effects functional
- [ ] FR-025: Modal opens with full project details
- [ ] FR-026: Tags/tech stack visible
- [ ] FR-027: GitHub/demo links functional
- [ ] SC-012: Vertical scroll reduced by 600-800px
- [ ] Performance: Images optimized, LCP <1.0s
- [ ] Accessibility: Modal keyboard accessible

### Files Modified/Created

**Modified**:
- `components/shared/ProjectCard.tsx` (add featured variant)
- `components/shared/ProjectModal.tsx` (verify modal works)
- `lib/projects.ts` (add project data)

**Created**:
- `components/home/ProjectsGrid.tsx` (RSC)

**Modified**:
- `app/page.tsx` (integrate ProjectsGrid)

**Estimated Time**: 2-3 hours
**Dependencies**: Phase 1 complete, `@content-collections/mdx` configured
**Priority**: P2 (Important)

### Scope

Implement horizontal carousel showing 3 most recent blog articles with touch/arrow navigation.

### Tasks

1. **Configure Content Collections** (30m)
   - File: `content-collections.ts`
   - Ensure blog collection schema includes: title, excerpt, date, tags, image
   - Export collection configuration
   - Test: `bun run build` to generate types

2. **Build ArticlesCarousel Component (Client)** (1.5h)
   - File: `components/home/ArticlesCarousel.tsx`
   - Mark as `'use client'`
   - Use useRef for scroll container
   - CSS scroll-snap for smooth scrolling
   - Arrow buttons (left/right) with click handlers
   - Hide arrows if ≤3 articles (spec clarification)
   - Center cards when few items

3. **Build ArticleCard Component (RSC)** (30m)
   - File: `components/home/ArticleCard.tsx`
   - Display: image, title, excerpt, date, read time, tags
   - Link to `/blog/[slug]`
   - Minimal hover effect (shadow increase)
   - Responsive card width: 100% (mobile) → 400px (desktop)

4. **Integrate into Homepage** (30m)
   - File: `app/page.tsx`
   - Fetch 3 most recent articles via content-collections
   - Pass to ArticlesCarousel
   - Section heading: "Recent Articles"

5. **Accessibility & Testing** (30m)
   - Add `aria-label="Articles carousel"`
   - Keyboard scroll support (native browser)
   - Touch gesture testing (iPad, iPhone)
   - Verify smooth scroll with `prefers-reduced-motion`

### Acceptance Criteria

- [ ] FR-015: Horizontal carousel displays 3 recent articles
- [ ] FR-016: Touch swipe gestures work on mobile
- [ ] FR-017: Arrow navigation functional
- [ ] FR-018: Smooth CSS scroll-snap behavior
- [ ] FR-019: Cards centered when ≤3 articles
- [ ] FR-020: Links to full blog posts
- [ ] SC-010: Vertical scroll reduced by 300-400px
- [ ] Accessibility: Keyboard navigable, screen reader announces count
- [ ] Performance: No layout shift (CLS <0.1)

### Files Modified/Created

**Created**:
- `components/home/ArticlesCarousel.tsx` (Client)
- `components/home/ArticleCard.tsx` (RSC)

**Modified**:
- `content-collections.ts` (verify schema)
- `app/page.tsx` (integrate carousel)
- `app/globals.css` (add scrollbar-hide utility if needed)

**Estimated Time**: 8-10 hours
**Dependencies**: Phase 1 complete
**Priority**: P1 (Critical)

### Scope

Implement dual timeline layout (Career | Running) with chronological ordering and top-alignment.

### Tasks

1. **Create Timeline Data** (2h)
   - File: `lib/constants.ts`
   - Add career milestones array (10-12 items)
   - Add running achievements array (5-7 items)
   - Use Lucide icons: Briefcase, Trophy, Award, Target, etc.
   - Validate chronological ordering

2. **Build Timeline Component** (3h)
   - File: `components/home/Timeline.tsx` (RSC)
   - Responsive grid: 1 column (mobile) → 2 columns (lg breakpoint)
   - Top-align containers with `items-start`
   - Section heading: "My Journey"
   - Dark mode support

3. **Build TimelineItem Component** (2h)
   - File: `components/home/TimelineItem.tsx` (RSC)
   - Vertical line connecting items (CSS pseudo-elements)
   - Icon circle with background
   - Date, title, subtitle, description layout
   - Optional link with arrow icon
   - Hover effect: subtle scale on card

4. **Add Iconography** (1h)
   - Import Lucide icons: `import { Briefcase, Trophy } from 'lucide-react'`
   - Career icons: Briefcase, Code, Award, GraduationCap
   - Running icons: Trophy, Target, Flag, Zap

5. **Integrate into Homepage** (1h)
   - File: `app/page.tsx`
   - Insert Timeline after Hero section
   - Test scroll behavior
   - Verify 500-700px vertical space savings

6. **Testing & Refinement** (1h)
   - Mobile responsiveness (iPhone SE, iPad)
   - Dark mode contrast verification
   - Accessibility audit (semantic HTML, keyboard focus)
   - Lighthouse audit (maintain 95+)

### Acceptance Criteria

- [ ] FR-001: Dual timeline displays career and running milestones
- [ ] FR-002: Items chronologically ordered (oldest to newest)
- [ ] FR-003: Top-aligned timelines
- [ ] FR-004: Responsive breakpoints (stacked → side-by-side)
- [ ] FR-005: Visual connector line between items
- [ ] FR-006: Icons for each milestone type
- [ ] FR-007: Hover effects functional
- [ ] SC-002: Vertical scroll reduced by 500-700px
- [ ] Lighthouse Performance ≥95
- [ ] No TypeScript errors

### Files Modified/Created

**Created**:
- `components/home/Timeline.tsx`
- `components/home/TimelineItem.tsx`

**Modified**:
- `lib/constants.ts` (add timeline data)
- `app/page.tsx` (integrate Timeline component)
- `app/globals.css` (timeline-specific styles if needed)

```plaintext
specs/002-portfolio-redesign/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output (technology decisions)
├── data-model.md        # Phase 1 output (data structures)
├── quickstart.md        # Phase 1 output (developer onboarding)
├── contracts/           # Phase 1 output (TypeScript interfaces)
│   └── components.ts    # Component prop interfaces
├── checklists/          # Quality validation
│   └── requirements.md  # Spec validation checklist
└── spec.md              # Feature specification (already exists)

└── spec.md              # Feature specification (already exists)
```

### Source Code (repository root)

```plaintext
app/
├── globals.css          # Design tokens, Tailwind v4 imports
├── layout.tsx           # Root layout (existing)
├── page.tsx             # Homepage (MODIFIED - integrate new sections)
├── about/               # NEW - Engineering philosophy page
│   └── page.tsx
└── (existing routes remain unchanged)

components/
├── home/                # Homepage-specific components
│   ├── Timeline.tsx         # NEW - Dual timeline (RSC)
│   ├── TimelineItem.tsx     # NEW - Timeline milestone card
│   ├── Skills.tsx           # NEW - Tabbed skills section (Client)
│   ├── SkillCard.tsx        # NEW - Individual skill card
│   ├── ArticlesCarousel.tsx # NEW - Horizontal carousel (Client)
│   ├── ArticleCard.tsx      # NEW - Article preview card
│   ├── ProjectsGrid.tsx     # NEW - Bento grid layout (RSC)
│   ├── ProjectCard.tsx      # NEW - Project card component
│   ├── Videos.tsx           # NEW - Tabbed videos (Client)
│   ├── VideoCard.tsx        # NEW - Video thumbnail card
│   └── PhilosophyCallout.tsx # NEW - CTA card to /about
├── ui/                  # shadcn/ui components (existing + new)
│   ├── tabs.tsx         # ALREADY EXISTS (shadcn/ui)
│   ├── card.tsx         # ALREADY EXISTS
│   ├── badge.tsx        # ALREADY EXISTS
│   ├── button.tsx       # ALREADY EXISTS
│   ├── separator.tsx    # ALREADY EXISTS
│   └── skeleton.tsx     # ALREADY EXISTS
└── (existing components remain unchanged)

lib/
├── utils.ts             # cn() utility (existing)
├── timeline-data.ts     # NEW - Timeline milestones data
├── skills-data.ts       # NEW - Skills categorization data
├── mdx.ts               # MODIFIED - Add article metadata parsing
└── (existing utilities remain unchanged)

content/
└── blog/                # Existing MDX files (no changes needed)
    ├── *.mdx

public/
└── images/              # Image assets (existing)
    ├── blog/
    ├── projects/
    └── timeline/        # NEW - Timeline milestone images
```

**Structure Decision**: This is a Next.js web application using App Router. New components are organized under `components/home/` for homepage-specific features. All React Server Components (RSC) for static layouts, Client Components only for interactive elements (tabs, carousel controls). Follows existing project conventions with minimal structural changes to reduce brownfield migration risk.

## Complexity Tracking

**No constitutional violations** - All requirements align with portfolio constitution. No complexity justification needed.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
