# Implementation Plan: Portfolio Redesign - Vertical Scroll Reduction

**Branch**: `002-portfolio-redesign` | **Date**: 2025-10-21 | **Updated**: 2025-10-21 (Post-Analysis) | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-portfolio-redesign/spec.md`
**Project Type**: **BROWNFIELD REFACTORING** - Modifying existing components, NOT creating from scratch

## Summary

This plan implements a comprehensive homepage REFACTORING to reduce vertical scroll by 50-60% (~3000-3800px) while maintaining Lighthouse 95+ performance and WCAG AA accessibility. The redesign MODIFIES 6 existing components to implement: dual timeline layout, tabbed skills interface, horizontal article carousel, bento grid for projects, tabbed videos, and engineering philosophy relocation. All components follow React Server Component architecture where possible, with selective client-side interactivity using Next.js 15 App Router patterns.

**CRITICAL CONTEXT**: Components already exist in `components/home/` directory:
- Timeline.tsx (single alternating → needs dual-column redesign)
- Skills.tsx (card grid → needs tabbed interface)
- Blog.tsx (vertical grid → needs horizontal carousel + rename to Articles.tsx)
- Projects.tsx (client component → needs server component conversion + bento grid)
- Videos.tsx (simple grid → needs tabbed categories)

**Constitution Violations to Fix**:
1. Projects.tsx uses `'use client'` with useEffect - MUST refactor to Server Component
2. Mock data embedded in Projects.tsx - MUST extract to lib/projects.ts
3. Missing ARIA labels on all sections - MUST add
4. Incomplete JSDoc comments - MUST add comprehensive documentation
5. Inconsistent spacing (mb-16 vs py-20) - MUST standardize to py-16

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

## Phase 6: Implementation - Videos Component REFACTORING

**Estimated Time**: 5-6 hours
**Dependencies**: Phase 1 complete
**Priority**: P3 (Nice-to-have)
**Current State**: `components/home/Videos.tsx` exists with simple grid layout
**Target State**: Tabbed interface with Running/Coding/Talks categories

### Scope

**REFACTOR** existing Videos.tsx to add tabbed categories.

### Tasks

1. **Reorganize Videos Data** (1h)
   - File: `lib/constants.ts`
   - **REFACTOR**: Split existing videos array into 3 category arrays
   - Categories: running, coding, talks (4-6 videos per category)
   - Ensure data structure includes: title, youtubeId, duration, publishedAt, category
   - Verify thumbnail URLs: `https://i.ytimg.com/vi/{youtubeId}/hqdefault.jpg`

2. **Refactor Videos Wrapper** (30m)
   - File: **RENAME** `components/home/Videos.tsx` to `VideosWrapper.tsx`
   - Keep as Server Component wrapper
   - Update to fetch categorized video data
   - Pass to new VideoTabs client component

3. **Create VideoTabs Component** (2h)
   - File: `components/home/VideoTabs.tsx` (NEW - client component)
   - Mark as `'use client'`
   - Use shadcn Tabs component
   - 3 TabsTriggers: Running (default), Coding, Talks
   - Add count badges to tabs (e.g., "Running (5)")
   - Grid layout per tab: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - Tab selection via useState (no URL persistence)

4. **Extract VideoCard Component** (1.5h)
   - File: `components/home/VideoCard.tsx` (NEW - server component)
   - Extract from existing Videos.tsx rendering logic
   - Display: thumbnail, title, duration overlay, publish date
   - Click → Open YouTube modal or inline player
   - Use existing YouTubeEmbed component (`components/shared/YouTubeEmbed.tsx`)
   - Hover effect: Subtle scale + shadow
   - Verify lazy loading enabled

5. **Update Homepage Integration** (30m)
   - File: `app/page.tsx`
   - **UPDATE** import from `Videos` to `VideosWrapper`
   - Verify Videos section positioned after Projects section
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

- [ ] FR-034 through FR-041a: Bento grid displays 5-6 projects with featured project
- [ ] SC-012: Vertical scroll reduced by 600-800px
- [ ] **CRITICAL**: Projects.tsx is Server Component (no 'use client')
- [ ] **CRITICAL**: Project data extracted to lib/projects.ts
- [ ] Performance: Images optimized, LCP <1.0s
- [ ] Accessibility: Modal keyboard accessible

### Files Modified/Created

**Modified** (REFACTORED):
- `components/home/Projects.tsx` - **REMOVE** 'use client', convert to RSC
- `components/shared/ProjectCard.tsx` - Add featured variant support
- `components/shared/ProjectModal.tsx` - Verify modal still works

**Created**:
- `lib/projects.ts` - Extract project data and getProjects() function

## Phase 4: Implementation - Blog → Articles Carousel REFACTORING

**Estimated Time**: 2-3 hours
**Dependencies**: Phase 1 complete, `@content-collections/mdx` configured
**Priority**: P2 (Important)
**Current State**: `components/home/Blog.tsx` displays vertical grid of blog cards
**Target State**: Horizontal carousel with 3 most recent articles, touch/arrow navigation

### Scope

**REFACTOR** existing Blog.tsx to horizontal carousel + **RENAME** to Articles.tsx.

### Tasks

1. **Verify Content Collections Schema** (15m)
   - File: `content-collections.ts`
   - Verify blog collection schema includes: title, excerpt, date, tags, image
   - Ensure types are generated
   - Test: `bun run build` to verify schema

2. **Create ArticlesCarousel Component** (1.5h)
   - File: `components/home/ArticlesCarousel.tsx` (NEW - client component)
   - Mark as `'use client'`
   - Use useRef for scroll container
   - CSS scroll-snap for smooth horizontal scrolling
   - Arrow buttons (left/right) with click handlers
   - Hide arrows if ≤3 articles (spec clarification)
   - Center cards when few items
   - Add scrollbar-hide utility to `app/globals.css`

3. **Rename Blog to Articles** (30m)
   - **RENAME**: `components/home/Blog.tsx` → `Articles.tsx`
   - Keep as Server Component wrapper
   - Update to fetch 3 most recent articles via content-collections
   - Pass data to ArticlesCarousel client component
   - Update section heading to "Recent Articles"

4. **Extract/Verify ArticleCard Component** (30m)
   - File: `components/blog/BlogCard.tsx` (REUSE if suitable OR create ArticleCard.tsx)
   - Verify displays: image, title, excerpt, date, read time, tags
   - Verify link to `/blog/[slug]`
   - Minimal hover effect (shadow increase)
   - Responsive card width: 100% (mobile) → 400px (desktop)

5. **Update Homepage Integration** (30m)
   - File: `app/page.tsx`
   - **UPDATE** import from `Blog` to `Articles`
   - Verify Articles section positioned correctly
   - Test responsive layout on all breakpoints

6. **Accessibility & Testing** (30m)
   - Add `aria-label="Articles carousel"`
   - Keyboard scroll support (native browser)
   - Touch gesture testing (iPad, iPhone)
   - Verify smooth scroll with `prefers-reduced-motion`

### Acceptance Criteria

- [ ] FR-024 through FR-033b: Horizontal carousel with 3 recent articles
- [ ] SC-004: Vertical scroll reduced by 300-400px
- [ ] **BREAKING CHANGE**: Blog.tsx renamed to Articles.tsx
- [ ] Accessibility: Keyboard navigable, screen reader announces count
- [ ] Performance: No layout shift (CLS <0.1)

### Files Modified/Created

**Modified** (REFACTORED):
- `components/home/Blog.tsx` → **RENAMED** to `Articles.tsx`
- `app/page.tsx` - Update import from Blog to Articles

**Created**:
- `components/home/ArticlesCarousel.tsx` - Client component for horizontal scroll
- `components/home/ArticleCard.tsx` - IF BlogCard not suitable for reuse

**Modified**:
- `content-collections.ts` - Verify schema
- `app/globals.css` - Add scrollbar-hide utility if needed

## Phase 2: Implementation - Timeline Dual-Column Layout REFACTORING

**Estimated Time**: 6-8 hours
**Dependencies**: Phase 1 complete
**Priority**: P1 (Critical - MVP)
**Current State**: `components/home/Timeline.tsx` displays single alternating column
**Target State**: Dual parallel columns (Career | Running) side-by-side on desktop

### Scope

**REFACTOR** existing Timeline.tsx from single alternating column to dual parallel layout.

### Tasks

1. **Split Timeline Data** (1.5h)
   - File: `lib/constants.ts`
   - **REFACTOR**: Split existing timeline data into `careerMilestones` and `runningMilestones` arrays
   - Add any missing career milestones (target: 10-12 items)
   - Add any missing running achievements (target: 5-7 items)
   - Verify Lucide icons: Briefcase, Trophy, Award, Target, etc.
   - Validate chronological ordering

2. **Refactor Timeline Component** (2.5h)
   - File: `components/home/Timeline.tsx` (keep as RSC)
   - **BREAKING CHANGE**: Update to accept `type` prop: `'career' | 'running'`
   - **REMOVE** alternating logic (index % 2) - no longer needed
   - Convert to simple vertical timeline (no left/right positioning)
   - Add section heading with icon per type (Briefcase for career, Trophy for running)
   - Maintain dark mode support

3. **Extract TimelineItem Component** (1.5h)
   - File: `components/home/TimelineItem.tsx` (NEW - RSC)
   - Extract from existing Timeline.tsx rendering logic
   - Vertical line connecting items (CSS pseudo-elements)
   - Icon circle with background
   - Date, title, subtitle, description layout
   - Optional link with arrow icon
   - Hover effect: subtle scale on card

4. **Update Homepage Integration** (1.5h)
   - File: `app/page.tsx`
   - **BREAKING CHANGE**: Wrap TWO Timeline instances in grid container
   - Render: `<Timeline type="career" />` and `<Timeline type="running" />`
   - Grid: `grid-cols-1 lg:grid-cols-2 gap-6`
   - Top-align with `items-start`
   - Verify positioned after Hero section

5. **Testing & Refinement** (1h)
   - Test responsive behavior: side-by-side ≥1024px, stacked <1024px
   - Mobile responsiveness (iPhone SE, iPad)
   - Dark mode contrast verification
   - Accessibility audit (semantic HTML, keyboard focus, ARIA labels)
   - Lighthouse audit (maintain 95+)

### Acceptance Criteria

- [ ] FR-001 through FR-009c: Dual timeline displays career and running milestones
- [ ] SC-002: Vertical scroll reduced by 500-700px
- [ ] **BREAKING CHANGE**: Timeline.tsx now requires `type` prop
- [ ] Lighthouse Performance ≥95
- [ ] No TypeScript errors

### Files Modified/Created

**Modified** (REFACTORED):
- `components/home/Timeline.tsx` - Add type prop, remove alternating logic
- `lib/constants.ts` - Split timeline data into two arrays
- `app/page.tsx` - Render TWO Timeline instances

**Created**:
- `components/home/TimelineItem.tsx` - Extracted from Timeline.tsx

## Phase 3: Implementation - Skills Tabbed Interface REFACTORING

**Estimated Time**: 6-8 hours
**Dependencies**: Phase 1 complete
**Priority**: P1 (Critical - MVP)
**Current State**: `components/home/Skills.tsx` displays simple grid (2 columns on md)
**Target State**: Tabbed interface with 4 categories (Frontend/Backend/DevOps/Additional)

### Scope

**REFACTOR** existing Skills.tsx to implement tabbed category interface.

### Tasks

1. **Reorganize Skills Data** (1.5h)
   - File: `lib/constants.ts`
   - **REFACTOR**: Reorganize existing skills data into 4 category arrays
   - Categories: frontend, backend, devops, additional
   - Ensure each skill has: name, icon, proficiency (optional)
   - Verify Lucide icons are available for all skills

2. **Rename Skills to Wrapper** (30m)
   - **RENAME**: `components/home/Skills.tsx` → `SkillsWrapper.tsx`
   - Keep as Server Component wrapper
   - Update to fetch categorized skill data
   - Pass to new SkillTabs client component

3. **Create SkillTabs Client Component** (2.5h)
   - File: `components/home/SkillTabs.tsx` (NEW - client component)
   - Mark as `'use client'`
   - Use shadcn/ui Tabs component
   - 4 TabsTriggers: Frontend (default), Backend, DevOps, Additional
   - Add icons to tabs from lucide-react
   - Responsive tab labels: full text on md+, icon-only on mobile with aria-label
   - Grid per tab: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`

4. **Extract SkillCard Component** (1.5h)
   - File: `components/home/SkillCard.tsx` (NEW - RSC)
   - Extract from existing Skills.tsx rendering logic
   - Display: icon, skill name, optional proficiency indicator
   - Use shadcn/ui Card component
   - Hover effect: subtle lift + shadow
   - Dark mode support

5. **Update Homepage Integration** (30m)
   - File: `app/page.tsx`
   - **UPDATE** import from `Skills` to `SkillsWrapper`
   - Verify Skills section positioned correctly
   - Test responsive layout on all breakpoints

6. **Testing & Refinement** (1h)
   - Test tab switching: verify Frontend selected by default
   - Test keyboard navigation: Tab key + Arrow keys
   - Verify screen reader announces tab counts ("Frontend tab, 1 of 4")
   - Mobile responsiveness (icon-only tabs on <768px)
   - Dark mode contrast verification
   - Lighthouse audit (maintain 95+)

### Acceptance Criteria

- [ ] FR-010 through FR-018b: Tabbed skills interface with 4 categories
- [ ] SC-003: Vertical scroll reduced by 400-600px
- [ ] **BREAKING CHANGE**: Skills.tsx renamed to SkillsWrapper.tsx
- [ ] Accessibility: Keyboard navigation, screen reader support
- [ ] Performance: No layout shift (CLS <0.1)
- [ ] Lighthouse Performance ≥95

### Files Modified/Created

**Modified** (REFACTORED):
- `components/home/Skills.tsx` → **RENAMED** to `SkillsWrapper.tsx`
- `lib/constants.ts` - Reorganize skills into 4 category arrays
- `app/page.tsx` - Update import from Skills to SkillsWrapper

**Created**:
- `components/home/SkillTabs.tsx` - Client component for tab interface
- `components/home/SkillCard.tsx` - Extracted from Skills.tsx

## Phase 1: Foundation & Research


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
