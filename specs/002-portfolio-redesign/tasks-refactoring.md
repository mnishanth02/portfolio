---
description: "REFACTORING tasks for Portfolio Redesign - Modifying Existing Components"
---

# Tasks: Portfolio Redesign - REFACTORING EXISTING IMPLEMENTATION

**Feature Branch**: `002-portfolio-redesign`
**Project Type**: **BROWNFIELD REFACTORING** - NOT greenfield development
**Input**: Design documents from `/specs/002-portfolio-redesign/` + existing codebase analysis

**CRITICAL**: This replaces the original tasks.md which incorrectly assumed greenfield implementation. All tasks now focus on MODIFYING existing components.

## Format: `- [ ] [ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Foundation - Fix Constitution Violations & Standardize Design Tokens

**Purpose**: Critical fixes that affect ALL components - must complete before feature work

**Estimated Time**: 4-6 hours

### Constitution Violations (MUST FIX FIRST)

- [ ] R001 **[CRITICAL]** Refactor `components/home/Projects.tsx` from client to server component - remove `'use client'` directive
- [ ] R002 **[CRITICAL]** Extract mock project data from `Projects.tsx` to `lib/projects.ts` file
- [ ] R003 **[CRITICAL]** Add ARIA labels to all sections: Timeline, Skills, Projects, Videos, Blog (`aria-label` attributes)
- [ ] R004 [P] Add comprehensive JSDoc comments to `components/home/Timeline.tsx` with @param, @returns, @example
- [ ] R005 [P] Add comprehensive JSDoc comments to `components/home/Skills.tsx` with @param, @returns, @example
- [ ] R006 [P] Add comprehensive JSDoc comments to `components/home/Projects.tsx` with @param, @returns, @example
- [ ] R007 [P] Add comprehensive JSDoc comments to `components/home/Videos.tsx` with @param, @returns, @example
- [ ] R008 [P] Add comprehensive JSDoc comments to `components/home/Blog.tsx` with @param, @returns, @example

### Design Token Standardization (Per FR-058a-e, FR-064-065)

- [ ] R009 [P] Update Timeline.tsx: Change `mb-16` to `py-16` for section spacing
- [ ] R010 [P] Update Skills.tsx: Change spacing to `py-16` for section container
- [ ] R011 [P] Update Projects.tsx: Verify uses `py-16` (currently py-20 - FIX if needed)
- [ ] R012 [P] Update Videos.tsx: Change `py-20` to `py-16` for section spacing
- [ ] R013 [P] Update Blog.tsx: Change `py-20` to `py-16` for section spacing
- [ ] R014 [P] Update Timeline.tsx: Change h2 heading from `text-2xl font-bold` to `text-3xl font-bold tracking-tight`
- [ ] R015 [P] Update Skills.tsx: Change h3 heading from `text-2xl font-bold` to `text-3xl font-bold tracking-tight`
- [ ] R016 [P] Verify all h2 headings use `mb-8` for consistent margin-bottom
- [ ] R017 [P] Update all grid layouts to use `gap-6` consistently (Skills, Projects, Videos, Blog)
- [ ] R018 [P] Update Timeline icon sizes from `h-5 w-5` to `h-6 w-6` for better visibility
- [ ] R019 [P] Add container class to all sections: `<div className="container mx-auto max-w-7xl">`
- [ ] R020 Fix typo in Videos.tsx line 7: Change `ontainer` to `container`
- [ ] R021 [P] Standardize all hover effects to use `transition-all duration-300 ease-in-out`

**Checkpoint**: All components now follow consistent design system - safe to proceed with feature refactoring

---

## Phase 2: User Story 1 - Refactor Timeline to Dual-Column Layout (Priority: P1) 🎯 MVP

**Goal**: Convert existing single alternating timeline to dual parallel columns (career | running)

**Current State**: Timeline.tsx displays single column with alternating left/right positioning
**Target State**: Two parallel timelines side-by-side on desktop (≥1024px), stacked on mobile

**Acceptance Criteria**: FR-001 through FR-009c, SC-002

**Estimated Time**: 6-8 hours

### Refactoring Tasks for User Story 1

- [ ] R022 [US1] **BREAKING CHANGE** Modify Timeline.tsx grid layout from single column to `grid-cols-1 lg:grid-cols-2`
- [ ] R023 [US1] Update Timeline.tsx to accept `type` prop: `'career' | 'running'` instead of rendering both
- [ ] R024 [US1] Split timeline data in `lib/constants.ts` into `careerMilestones` and `runningMilestones` arrays
- [ ] R025 [US1] Remove alternating logic (index % 2) from Timeline.tsx - no longer needed with dual columns
- [ ] R026 [US1] Extract TimelineItem to separate component: `components/home/TimelineItem.tsx`
- [ ] R027 [US1] Update TimelineItem to use top-aligned layout with `items-start` on grid container
- [ ] R028 [US1] Add section headings with icons to each timeline column (Briefcase for career, Trophy for running)
- [ ] R029 [US1] Update `app/page.tsx` to render TWO Timeline instances: `<Timeline type="career" />` and `<Timeline type="running" />`
- [ ] R030 [US1] Test responsive behavior: verify side-by-side on ≥1024px, stacked on <1024px
- [ ] R031 [US1] Test keyboard navigation through both timelines with visible focus rings
- [ ] R032 [US1] Verify ARIA labels distinguish career vs running timelines
- [ ] R033 [US1] Run Lighthouse audit: Performance ≥95, Accessibility 100

**Checkpoint**: Dual timeline fully functional - career and running visible side-by-side

---

## Phase 3: User Story 2 - Refactor Skills to Tabbed Interface (Priority: P1) 🎯 MVP

**Goal**: Convert existing grid of skill cards to tabbed categories

**Current State**: Skills.tsx displays grid with 2 columns (md) showing all skills at once
**Target State**: Tabbed interface with 4 tabs (Frontend/Backend/DevOps/Additional) showing filtered skills

**Acceptance Criteria**: FR-010 through FR-018b, SC-003

**Estimated Time**: 6-8 hours

### Refactoring Tasks for User Story 2

- [ ] R034 [US2] Reorganize skills data in `lib/constants.ts` into categories: frontend, backend, devops, additional
- [ ] R035 [US2] Extract SkillCard to separate component: `components/home/SkillCard.tsx`
- [ ] R036 [US2] **BREAKING CHANGE** Rename Skills.tsx to SkillsWrapper.tsx (server component)
- [ ] R037 [US2] Create new `components/home/SkillTabs.tsx` with `'use client'` directive
- [ ] R038 [US2] Implement shadcn/ui Tabs in SkillTabs with `defaultValue="frontend"`
- [ ] R039 [US2] Add 4 TabsTriggers: Frontend, Backend, DevOps, Additional with lucide-react icons
- [ ] R040 [US2] Implement responsive tab labels: full text on md+, icon-only on mobile with aria-label
- [ ] R041 [US2] Update grid layout to `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6` per FR-012
- [ ] R042 [US2] Move skill rendering logic from Skills.tsx to SkillCard component
- [ ] R043 [US2] Update SkillsWrapper to fetch data and pass to SkillTabs as props
- [ ] R044 [US2] Test tab switching: verify Frontend selected by default, smooth transitions
- [ ] R045 [US2] Test keyboard navigation: Tab key between triggers, Arrow keys switch tabs
- [ ] R046 [US2] Verify screen reader announces tab counts ("Frontend tab, 1 of 4")

**Checkpoint**: Tabbed skills interface functional - all categories accessible

---

## Phase 4: User Story 3 - Refactor Blog to Horizontal Carousel (Priority: P2)

**Goal**: Convert vertical blog grid to horizontal scrolling carousel + RENAME component

**Current State**: Blog.tsx displays vertical grid of blog cards
**Target State**: Horizontal carousel with 3 visible cards, arrow navigation, touch swipe

**Acceptance Criteria**: FR-024 through FR-033b, SC-004

**Estimated Time**: 6-8 hours

### Refactoring Tasks for User Story 3

- [ ] R047 [US3] **BREAKING CHANGE** Rename `components/home/Blog.tsx` to `Articles.tsx`
- [ ] R048 [US3] Update all imports in `app/page.tsx` from `Blog` to `Articles`
- [ ] R049 [US3] Extract ArticleCard to separate component: `components/blog/ArticleCard.tsx` (reuse BlogCard if suitable)
- [ ] R050 [US3] Create `components/home/ArticlesCarousel.tsx` with `'use client'` directive
- [ ] R051 [US3] Implement useRef hook for scroll container in ArticlesCarousel
- [ ] R052 [US3] **BREAKING CHANGE** Convert vertical grid to horizontal scroll container with classes: `flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide`
- [ ] R053 [US3] Add scrollbar-hide utility to `app/globals.css` if not present
- [ ] R054 [US3] Implement left/right arrow buttons with onClick handlers scrolling by 400px
- [ ] R055 [US3] Add arrow visibility logic: hide when ≤3 articles, disable at start/end
- [ ] R056 [US3] Implement centering logic for ≤3 articles: `justify-center` class
- [ ] R057 [US3] Update Articles.tsx wrapper to fetch 3 most recent posts and pass to carousel
- [ ] R058 [US3] Test horizontal scroll: verify smooth scrolling with mouse wheel and touch swipe
- [ ] R059 [US3] Test `prefers-reduced-motion`: verify smooth scroll disabled appropriately

**Checkpoint**: Horizontal article carousel functional - Netflix-style browsing

---

## Phase 5: User Story 4 - Refactor Projects to Bento Grid + Server Component (Priority: P2)

**Goal**: Convert client component to server component + implement bento grid layout

**Current State**: Projects.tsx uses `'use client'` with useEffect, displays standard grid
**Target State**: Server component with bento grid, featured project spanning 2 columns

**Acceptance Criteria**: FR-034 through FR-041a, SC-012

**Estimated Time**: 6-8 hours

### Refactoring Tasks for User Story 4

- [ ] R060 [US4] **CRITICAL** Remove `'use client'` directive from Projects.tsx
- [ ] R061 [US4] **CRITICAL** Delete useEffect, useState imports from Projects.tsx
- [ ] R062 [US4] **CRITICAL** Move all project data loading logic to `lib/projects.ts`
- [ ] R063 [US4] Create `getProjects()` server function in lib/projects.ts returning Project[]
- [ ] R064 [US4] Update Projects.tsx to call `getProjects()` directly (server-side data fetch)
- [ ] R065 [US4] Ensure exactly ONE project has `featured: true` flag in project data
- [ ] R066 [US4] Verify `components/shared/ProjectCard.tsx` accepts `featured` prop
- [ ] R067 [US4] **BREAKING CHANGE** Update grid layout to bento grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] R068 [US4] Apply `md:col-span-2 lg:row-span-2` classes to featured project card
- [ ] R069 [US4] Update ProjectCard to render larger image/description for featured variant
- [ ] R070 [US4] Remove filtering/sorting client logic (move to server if needed)
- [ ] R071 [US4] Test bento grid responsiveness: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- [ ] R072 [US4] Verify featured project visual prominence on all breakpoints
- [ ] R073 [US4] Run Lighthouse audit: verify LCP <1.0s with optimized images

**Checkpoint**: Projects as server component with bento grid layout

---

## Phase 6: User Story 5 - Add Tabbed Interface to Videos (Priority: P3)

**Goal**: Add tabbed categories to existing Videos component

**Current State**: Videos.tsx displays simple grid of all videos
**Target State**: Tabbed interface with Running/Coding/Talks categories

**Acceptance Criteria**: FR-042 through FR-049b

**Estimated Time**: 5-6 hours

### Refactoring Tasks for User Story 5

- [ ] R074 [US5] Reorganize videos data in `lib/constants.ts` into categories: running, coding, talks
- [ ] R075 [US5] Extract VideoCard to separate component: `components/home/VideoCard.tsx`
- [ ] R076 [US5] **BREAKING CHANGE** Rename Videos.tsx to VideosWrapper.tsx (server component)
- [ ] R077 [US5] Create new `components/home/VideoTabs.tsx` with `'use client'` directive
- [ ] R078 [US5] Implement shadcn/ui Tabs in VideoTabs with `defaultValue="running"` per brand identity
- [ ] R079 [US5] Add 3 TabsTriggers: Running, Coding, Talks with icons and count badges
- [ ] R080 [US5] Implement video count calculation: display in tab labels (e.g., "Running (5)")
- [ ] R081 [US5] Create TabsContent for each category with grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] R082 [US5] Update VideosWrapper to fetch video data and pass to VideoTabs
- [ ] R083 [US5] Verify YouTubeEmbed component has lazy loading enabled
- [ ] R084 [US5] Test tab switching: verify smooth transitions between categories
- [ ] R085 [US5] Test keyboard navigation: Tab and Arrow keys work

**Checkpoint**: Videos tabbed interface functional

---

## Phase 7: User Story 6 - Relocate Engineering Philosophy (Priority: P3)

**Goal**: Move philosophy from homepage to dedicated /about page

**Current State**: Philosophy likely embedded in About.tsx or similar
**Target State**: Dedicated /about page, optional homepage callout card

**Acceptance Criteria**: FR-019 through FR-023

**Estimated Time**: 2-3 hours

### Refactoring Tasks for User Story 6

- [ ] R086 [US6] Create `app/about/page.tsx` if doesn't exist
- [ ] R087 [US6] Move engineering philosophy content from homepage to `/about` page
- [ ] R088 [US6] Add comprehensive philosophy content with values, approach, methodology
- [ ] R089 [US6] Add metadata to `/about` page for SEO
- [ ] R090 [US6] Remove philosophy section from `app/page.tsx`
- [ ] R091 [US6] (Optional) Create `components/home/PhilosophyCallout.tsx` as CTA card
- [ ] R092 [US6] (Optional) Integrate callout into homepage after main sections
- [ ] R093 [US6] Test navigation from homepage to `/about` page
- [ ] R094 [US6] Run Lighthouse audit on `/about` page

**Checkpoint**: Engineering philosophy accessible via dedicated page

---

## Phase 8: Cross-Cutting Polish & Quality Assurance

**Purpose**: Final consistency checks and accessibility verification

**Estimated Time**: 8-10 hours

### Component Consistency

- [ ] R095 [P] Verify all sections use shadcn/ui Card component (not custom bg-card divs)
- [ ] R096 [P] Verify all sections have semantic `<section>` tags with id attributes
- [ ] R097 [P] Audit all heading hierarchy: proper h1 → h2 → h3 structure
- [ ] R098 [P] Verify all images use Next.js Image component with width/height
- [ ] R099 [P] Add blur placeholders to all images: `placeholder="blur" blurDataURL="..."`
- [ ] R100 [P] Verify all buttons meet 44x44px minimum touch target size

### Accessibility Audit

- [ ] R101 [P] Run WAVE browser extension: fix all flagged issues
- [ ] R102 [P] Run axe DevTools: fix all accessibility violations
- [ ] R103 [P] Test keyboard navigation: Tab through entire homepage
- [ ] R104 [P] Test screen reader (VoiceOver): verify all announcements
- [ ] R105 [P] Test screen reader (NVDA): cross-platform verification
- [ ] R106 [P] Verify color contrast ≥4.5:1 in both light and dark modes

### Responsive & Cross-Browser Testing

- [ ] R107 [P] Test on iPhone SE (375px): verify layout and touch interactions
- [ ] R108 [P] Test on iPad (768px): verify tablet layout transitions
- [ ] R109 [P] Test on Desktop (1440px and 1920px): verify all components
- [ ] R110 [P] Test orientation changes (mobile): portrait ↔ landscape
- [ ] R111 [P] Cross-browser test: Chrome, Firefox, Safari, Edge (latest)

### Performance Optimization

- [ ] R112 Implement code splitting for below-fold components using `next/dynamic`
- [ ] R113 Run `bun run build` and analyze bundle size (verify <10% increase)
- [ ] R114 Run comprehensive Lighthouse audit: Performance ≥95, Accessibility 100
- [ ] R115 Verify Core Web Vitals: LCP <1.0s, CLS <0.1, FID <100ms
- [ ] R116 Measure total vertical scroll reduction (target: 3000-3800px)

### Documentation & Cleanup

- [ ] R117 Update README.md with new component documentation
- [ ] R118 Run through quickstart.md validation
- [ ] R119 Final Biome lint and format: `bun run lint && bun run format`
- [ ] R120 Create comparison screenshots: before/after with measurements
- [ ] R121 Commit all changes with conventional commit messages
- [ ] R122 Create comprehensive PR description with metrics and testing checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: No dependencies - START HERE
- **Phase 2-6 (User Stories)**: All depend on Phase 1 completion
  - Can proceed in parallel IF multiple developers
  - Recommended sequential: US1 (P1) → US2 (P1) → US3 (P2) → US4 (P2) → US5 (P3) → US6 (P3)
- **Phase 8 (Polish)**: Depends on all desired user stories complete

### Critical Path

1. **MUST COMPLETE FIRST**: R001-R003 (constitution violations)
2. **SHOULD COMPLETE EARLY**: R009-R021 (design token standardization)
3. **THEN PROCEED**: User story refactoring (R022-R094)
4. **FINAL**: Cross-cutting polish (R095-R122)

### Parallel Opportunities

**Within Phase 1**:
- R004-R008 (JSDoc comments) can run in parallel
- R009-R019 (design token updates) can run in parallel per component

**Across User Stories**:
With multiple developers, user stories can be tackled in parallel:
- Developer A: Timeline refactoring (US1)
- Developer B: Skills refactoring (US2)
- Developer C: Blog→Articles refactoring (US3)

**Within Phase 8**:
- R095-R100 (consistency) can run in parallel
- R101-R106 (accessibility) can run in parallel
- R107-R111 (responsive testing) can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

**Week 1**: Foundation + Critical Features

1. Complete Phase 1: Foundation (constitution fixes + design tokens)
2. Complete Phase 2: Timeline dual-column refactoring
3. Complete Phase 3: Skills tabbed interface
4. **STOP and VALIDATE**: Test both features independently
5. Run Lighthouse, WAVE audits
6. Deploy to preview for feedback

**Expected Result**: ~1100-1500px vertical scroll reduction with core features

### Full Feature Implementation

**Week 2**: Important Features (P2)

4. Complete Phase 4: Blog→Articles carousel refactoring
5. Complete Phase 5: Projects bento grid + server component
6. **VALIDATE**: Test all P1 + P2 features together

**Week 3**: Nice-to-Have + Polish (P3)

7. Complete Phase 6: Videos tabbed interface
8. Complete Phase 7: Philosophy relocation
9. Complete Phase 8: Cross-cutting polish
10. Final QA and production deployment

**Expected Result**: Full 3000-3800px vertical scroll reduction

---

## Key Differences from Original tasks.md

**Original tasks.md (INCORRECT)**:
- Assumed greenfield: "Create Timeline.tsx"
- Assumed greenfield: "Create Skills.tsx"
- Total: 178 tasks for NEW implementation

**This file (CORRECT)**:
- Brownfield reality: "Refactor Timeline.tsx"
- Brownfield reality: "Convert Skills to tabs"
- Total: 122 tasks for MODIFYING existing code

**Critical Fixes Added**:
- Constitution violation remediation (R001-R008)
- Design token standardization (R009-R021)
- Breaking change warnings for major refactors
- Explicit "remove/delete" tasks for refactoring

---

## Summary

**Total Refactoring Tasks**: 122 tasks
**Estimated Timeline**: 3-4 weeks (solo developer) | 2 weeks (team of 3)

### Task Distribution

- **Phase 1 (Foundation)**: 21 tasks - CRITICAL, blocks all feature work
- **Phase 2 (Timeline)**: 12 tasks
- **Phase 3 (Skills)**: 13 tasks
- **Phase 4 (Articles)**: 13 tasks
- **Phase 5 (Projects)**: 14 tasks
- **Phase 6 (Videos)**: 12 tasks
- **Phase 7 (Philosophy)**: 9 tasks
- **Phase 8 (Polish)**: 28 tasks

### Next Steps

1. **Immediate**: Review this refactoring task list for accuracy
2. **Phase 1**: Fix constitution violations (R001-R003) - top priority
3. **Phase 1**: Standardize design tokens (R009-R021)
4. **Choose MVP or Full**: Implement US1+US2 for MVP OR all 6 user stories
5. **Final**: Polish phase → Production deployment

**This refactoring task list accurately reflects the brownfield reality and is ready for execution! 🚀**
