---
description: "Implementation tasks for Portfolio Redesign - Vertical Scroll Reduction"
---

# Tasks: Portfolio Redesign - Vertical Scroll Reduction

**Feature Branch**: `002-portfolio-redesign`
**Input**: Design documents from `/specs/002-portfolio-redesign/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Tests**: Not explicitly requested in specification - focusing on implementation tasks with manual testing checkpoints.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

**Estimated Time**: 1-2 hours

- [ ] T001 Create feature branch `002-portfolio-redesign` from main
- [ ] T002 Verify Turbopack build works with `bun run build`
- [ ] T003 [P] Verify shadcn/ui Tabs component exists at `components/ui/tabs.tsx`
- [ ] T004 [P] Verify shadcn/ui Badge component exists at `components/ui/badge.tsx`
- [ ] T005 [P] Verify shadcn/ui Card component exists at `components/ui/card.tsx`
- [ ] T006 Install any missing shadcn/ui components with `npx shadcn@latest add [component]`
- [ ] T007 Create baseline Lighthouse audit report for current homepage (save as `docs/lighthouse-baseline.json`)
- [ ] T008 Document current vertical scroll height in pixels (capture screenshot with measurement)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data structures and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

**Estimated Time**: 3-4 hours

- [ ] T009 Create TypeScript interfaces in `types/index.ts` for TimelineItem, Skill, Article, Project, Video
- [ ] T010 [P] Create `lib/timeline-data.ts` with empty arrays for careerMilestones and runningMilestones
- [ ] T011 [P] Create `lib/skills-data.ts` with empty objects for skillCategories (frontend, backend, cloud, data, tools)
- [ ] T012 [P] Verify `lib/projects.ts` exists (create if missing with empty projects array)
- [ ] T013 [P] Create `lib/videos-data.ts` with empty arrays for video categories (running, coding, talks)
- [ ] T014 Verify `content-collections.ts` has blog collection schema with title, date, excerpt, tags, image fields
- [ ] T015 Add scrollbar-hide utility to `app/globals.css` for carousel implementation
- [ ] T016 [P] Create `components/home/` directory for homepage-specific components
- [ ] T017 Run `bun run build` to generate content-collections types and verify no errors

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Dual Professional Identity (Priority: P1) 🎯 MVP

**Goal**: Display IT career and running achievements side-by-side (desktop) or stacked (mobile) to showcase dual professional identity

**Independent Test**: Navigate to homepage, verify on desktop (≥1024px) both timelines appear side-by-side with career on left and running on right. Resize to mobile (<1024px) and verify timelines stack vertically. Test keyboard navigation through timeline items with visible focus indicators.

**Acceptance Criteria**: FR-001 through FR-009c, SC-002

**Estimated Time**: 8-10 hours

### Implementation for User Story 1

- [ ] T018 [P] [US1] Populate career timeline data in `lib/timeline-data.ts` (10-12 career milestones with Briefcase icons from lucide-react)
- [ ] T019 [P] [US1] Populate running timeline data in `lib/timeline-data.ts` (5-7 running achievements with Trophy icons from lucide-react)
- [ ] T020 [US1] Create `components/home/TimelineItem.tsx` (RSC) with props: item, index, total
- [ ] T021 [US1] Implement TimelineItem visual structure: dot indicator (absolute positioning), card container, date/title/description layout
- [ ] T022 [US1] Add CSS for vertical connecting line between timeline dots using border-l on container
- [ ] T023 [US1] Add hover effects to TimelineItem: subtle scale on card, shadow increase
- [ ] T024 [US1] Create `components/home/Timeline.tsx` (RSC) as wrapper component with props: items, type
- [ ] T025 [US1] Implement Timeline responsive grid: `grid-cols-1 lg:grid-cols-2` with `items-start` for top-alignment
- [ ] T026 [US1] Add section headings in Timeline component with appropriate icons (Briefcase for career, Trophy for running)
- [ ] T027 [US1] Add ARIA labels to Timeline sections: `aria-label="IT Career Timeline"` and `aria-label="Running Achievements Timeline"`
- [ ] T028 [US1] Integrate Timeline component into `app/page.tsx` after Hero section
- [ ] T029 [US1] Test Timeline component on iPhone SE (375px), iPad (768px), Desktop (1440px) viewports
- [ ] T030 [US1] Verify keyboard navigation: Tab key moves through items with visible focus ring
- [ ] T031 [US1] Test with screen reader (VoiceOver/NVDA): verify timeline type and milestone announcements
- [ ] T032 [US1] Verify dark mode support: all text has ≥4.5:1 contrast in both light and dark modes
- [ ] T033 [US1] Measure vertical scroll reduction: should save 500-700px compared to single-column layout
- [ ] T034 [US1] Run Lighthouse audit: Performance ≥95, Accessibility 100, verify LCP <1.0s and CLS <0.1

**Checkpoint**: User Story 1 complete - dual timeline fully functional and independently testable

---

## Phase 4: User Story 2 - Explore Technical Skills Efficiently (Priority: P1) 🎯 MVP

**Goal**: Display technical skills in tabbed categories (Frontend, Backend, DevOps, Additional) to reduce vertical space while maintaining discoverability

**Independent Test**: Navigate to skills section, verify Frontend tab selected by default showing skill grid. Click through all 4 tabs (Frontend, Backend, DevOps, Additional) and verify smooth transitions with appropriate skills displayed. Test keyboard navigation with Tab and Arrow keys. Resize to mobile and verify tab labels become icon-only with skill grid adjusting to 2 columns.

**Acceptance Criteria**: FR-010 through FR-018b, SC-003

**Estimated Time**: 6-8 hours

### Implementation for User Story 2

- [ ] T035 [P] [US2] Populate frontend skills in `lib/skills-data.ts` (React, TypeScript, Next.js, Tailwind CSS, etc. with proficiency levels and years)
- [ ] T036 [P] [US2] Populate backend skills in `lib/skills-data.ts` (Node.js, Python, PostgreSQL, etc.)
- [ ] T037 [P] [US2] Populate cloud/DevOps skills in `lib/skills-data.ts` (AWS, Docker, Vercel, etc.)
- [ ] T038 [P] [US2] Populate additional/tools skills in `lib/skills-data.ts` (Git, VS Code, Figma, etc.)
- [ ] T039 [US2] Create `components/home/SkillCard.tsx` (RSC) with props: skill, showProficiency, showYears
- [ ] T040 [US2] Implement SkillCard layout: skill name (heading), proficiency badge (using shadcn/ui Badge), years of experience
- [ ] T041 [US2] Add hover effects to SkillCard: subtle lift and shadow increase
- [ ] T042 [US2] Add dark mode support to SkillCard: appropriate badge colors for dark theme
- [ ] T043 [US2] Create `components/home/SkillTabs.tsx` (Client Component) marked with `'use client'` directive
- [ ] T044 [US2] Implement SkillTabs using shadcn/ui Tabs component with defaultValue="frontend"
- [ ] T045 [US2] Add TabsList with 4 TabsTriggers: Frontend, Backend, DevOps, Additional (with icons from lucide-react)
- [ ] T046 [US2] Implement responsive TabsTriggers: full labels on md+, icon-only on mobile with aria-label
- [ ] T047 [US2] Create TabsContent for each category with grid layout: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
- [ ] T048 [US2] Map skills data to SkillCard components within each TabsContent
- [ ] T049 [US2] Create `components/home/Skills.tsx` (RSC wrapper) to fetch skills data and pass to SkillTabs
- [ ] T050 [US2] Integrate Skills component into `app/page.tsx` after Timeline section
- [ ] T051 [US2] Test tab switching performance: transitions should complete in <200ms perceived time
- [ ] T052 [US2] Verify keyboard navigation: Tab key moves between triggers, Arrow keys switch tabs, Enter/Space activates
- [ ] T053 [US2] Test responsive grid: verify 2 cols (mobile), 3 cols (tablet), 4 cols (desktop)
- [ ] T054 [US2] Test with screen reader: verify tab counts announced ("Frontend tab, 1 of 4")
- [ ] T055 [US2] Verify state management: tab state persists during page interactions but resets on reload (no URL persistence)
- [ ] T056 [US2] Measure vertical scroll reduction: should save 600-800px compared to single-list layout
- [ ] T057 [US2] Run Lighthouse audit: verify Performance ≥95 and no CLS issues

**Checkpoint**: User Story 2 complete - tabbed skills interface fully functional and independently testable

---

## Phase 5: User Story 3 - Browse Articles Without Vertical Scroll (Priority: P2)

**Goal**: Display recent blog articles in horizontal carousel with touch/arrow navigation to reduce vertical space

**Independent Test**: Navigate to articles section, verify 3 article cards visible on desktop with left/right navigation arrows. Click arrows to scroll smoothly by 400px increments. Test on mobile with touch swipe gestures (left/right). Verify with ≤3 articles that cards are centered and arrows hidden. Test keyboard navigation through visible cards.

**Acceptance Criteria**: FR-024 through FR-033b, SC-004

**Estimated Time**: 5-6 hours

### Implementation for User Story 3

- [ ] T058 [US3] Verify content-collections blog schema in `content-collections.ts` includes title, date, excerpt, tags, image
- [ ] T059 [US3] Create `components/home/ArticleCard.tsx` (RSC) with props: article, showExcerpt, showTags
- [ ] T060 [US3] Implement ArticleCard layout: image (aspect-video), title, excerpt (line-clamp-3), date, tags (badges)
- [ ] T061 [US3] Set ArticleCard fixed width: `w-full md:w-[400px]` for horizontal scroll container
- [ ] T062 [US3] Add ArticleCard hover effect: shadow increase (CSS only, no client state)
- [ ] T063 [US3] Link ArticleCard to blog post: Next.js Link to `/blog/[slug]`
- [ ] T064 [US3] Create `components/home/ArticlesCarousel.tsx` (Client Component) marked with `'use client'`
- [ ] T065 [US3] Implement useRef hook for scroll container in ArticlesCarousel
- [ ] T066 [US3] Create scroll container div with classes: `flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide`
- [ ] T067 [US3] Implement CSS scroll-snap on ArticleCard: `snap-start` for smooth snapping behavior
- [ ] T068 [US3] Create left/right arrow button components with onClick handlers scrolling by 400px
- [ ] T069 [US3] Implement arrow visibility logic: hide left when at start, hide right when at end, hide both when ≤3 articles
- [ ] T070 [US3] Add arrow button styling: absolute positioning, rounded background, hover effects
- [ ] T071 [US3] Implement centering logic for ≤3 articles: `justify-center` on container when articles.length ≤ 3
- [ ] T072 [US3] Add ARIA labels to carousel: `aria-label="Articles carousel"` and announce count to screen readers
- [ ] T073 [US3] Create `components/home/Articles.tsx` (RSC wrapper) to fetch 3 most recent blog posts from content-collections
- [ ] T074 [US3] Integrate Articles component into `app/page.tsx` after Skills section
- [ ] T075 [US3] Test horizontal scroll on desktop: verify smooth scrolling with smooth behavior
- [ ] T076 [US3] Test touch gestures on mobile: swipe left/right to scroll through articles
- [ ] T077 [US3] Verify `prefers-reduced-motion`: disable smooth scroll animation for users who prefer reduced motion
- [ ] T078 [US3] Test with 1, 2, 3, and 6+ articles: verify centering and arrow visibility logic
- [ ] T079 [US3] Verify keyboard navigation: Tab moves through visible cards and arrow buttons
- [ ] T080 [US3] Measure vertical scroll reduction: should save 500-600px compared to vertical grid
- [ ] T081 [US3] Run Lighthouse audit: verify no CLS from carousel loading, images have blur placeholders

**Checkpoint**: User Story 3 complete - article carousel fully functional and independently testable

---

## Phase 6: User Story 4 - Discover Featured Projects Quickly (Priority: P2)

**Goal**: Display 5-6 projects in bento grid layout with 1 featured project spanning 2 columns for visual hierarchy

**Independent Test**: Navigate to projects section, verify featured project spans 2 columns on desktop with larger image while other projects display in compact cards. Hover over project cards and verify image scale-up effect. Resize to mobile and verify all cards stack in single column with featured project showing larger image. Click "View All Projects" CTA and verify navigation to projects page.

**Acceptance Criteria**: FR-034 through FR-041a, SC-012

**Estimated Time**: 6-8 hours

### Implementation for User Story 4

- [ ] T082 [P] [US4] Populate projects data in `lib/projects.ts` (5-6 projects with title, description, tags, image, featured flag)
- [ ] T083 [P] [US4] Ensure exactly ONE project has featured: true flag
- [ ] T084 [P] [US4] Add project images to `public/images/projects/` directory (1200×800px recommended)
- [ ] T085 [US4] Verify `components/shared/ProjectCard.tsx` exists (read file to understand current structure)
- [ ] T086 [US4] Extend ProjectCard component to accept `featured` prop for variant styling
- [ ] T087 [US4] Implement featured variant in ProjectCard: larger image size, more description text visible
- [ ] T088 [US4] Implement regular variant in ProjectCard: compact card with truncated description
- [ ] T089 [US4] Add hover effect to ProjectCard: image scale-up with `hover:scale-105 transition-transform`
- [ ] T090 [US4] Display tech stack tags in ProjectCard using shadcn/ui Badge component
- [ ] T091 [US4] Add CTA buttons to ProjectCard: "View Demo" and "View Code" (if links provided)
- [ ] T092 [US4] Verify `components/shared/ProjectModal.tsx` exists and works (optional enhancement)
- [ ] T093 [US4] Create `components/home/ProjectsGrid.tsx` (RSC) with props: projects, heading
- [ ] T094 [US4] Implement ProjectsGrid bento layout: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] T095 [US4] Apply column span to featured project: `md:col-span-2 lg:row-span-2` for featured cards
- [ ] T096 [US4] Add section heading to ProjectsGrid: "Featured Projects"
- [ ] T097 [US4] Limit projects display to 6 maximum, add "View All Projects" button linking to `/projects` page
- [ ] T098 [US4] Optimize images in ProjectsGrid: use Next.js Image with priority={false}, loading="lazy"
- [ ] T099 [US4] Add blur placeholder to project images: `placeholder="blur"` with blurDataURL
- [ ] T100 [US4] Handle missing project images: fallback background with project title initials
- [ ] T101 [US4] Integrate ProjectsGrid into `app/page.tsx` after Articles section
- [ ] T102 [US4] Test grid responsiveness: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- [ ] T103 [US4] Verify featured project visual prominence on all breakpoints
- [ ] T104 [US4] Test hover effects on all project cards: smooth scale transition
- [ ] T105 [US4] Verify touch target sizes on mobile: buttons ≥44x44px
- [ ] T106 [US4] Test ProjectModal (if implemented): keyboard accessible, ESC closes, focus trap
- [ ] T107 [US4] Measure vertical scroll reduction: should save 300-400px compared to full project list
- [ ] T108 [US4] Run Lighthouse audit: verify LCP <1.0s with optimized images

**Checkpoint**: User Story 4 complete - bento grid projects layout fully functional and independently testable

---

## Phase 7: User Story 5 - Access Categorized Videos (Priority: P3)

**Goal**: Display technical and fitness videos in tabbed interface with grid layout and video thumbnails

**Independent Test**: Navigate to videos section, verify Technical tab selected by default with video count badge (e.g., "Technical (12)"). Click Fitness tab and verify video grid updates. Click video thumbnail and verify YouTube video opens. Resize to mobile and verify grid adjusts from 3 to 1 column. Test keyboard navigation between tabs.

**Acceptance Criteria**: FR-042 through FR-049b

**Estimated Time**: 5-6 hours

### Implementation for User Story 5

- [ ] T109 [P] [US5] Populate running videos in `lib/videos-data.ts` (4-6 videos with youtubeId, duration, title)
- [ ] T110 [P] [US5] Populate coding videos in `lib/videos-data.ts` (4-6 videos)
- [ ] T111 [P] [US5] Populate talks videos in `lib/videos-data.ts` (4-6 videos)
- [ ] T112 [US5] Create `components/home/VideoCard.tsx` (RSC) with props: video, showDuration, showDate
- [ ] T113 [US5] Implement VideoCard layout: aspect-video container, YouTube thumbnail image, title (line-clamp-2)
- [ ] T114 [US5] Add duration overlay to VideoCard: bottom-right badge with duration from video data
- [ ] T115 [US5] Add hover effect to VideoCard: title color change, subtle shadow increase
- [ ] T116 [US5] Link VideoCard to YouTube: use existing YouTubeEmbed component from `components/shared/YouTubeEmbed.tsx`
- [ ] T117 [US5] Verify YouTubeEmbed component has lazy iframe loading enabled
- [ ] T118 [US5] Create `components/home/VideoTabs.tsx` (Client Component) marked with `'use client'`
- [ ] T119 [US5] Implement VideoTabs using shadcn/ui Tabs with defaultValue="running"
- [ ] T120 [US5] Add TabsList with 3 TabsTriggers: Running, Coding, Talks (with icons and count badges)
- [ ] T121 [US5] Implement video count calculation: display count in tab label (e.g., "Running (5)")
- [ ] T122 [US5] Create TabsContent for each category with grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] T123 [US5] Map videos to VideoCard components within each TabsContent
- [ ] T124 [US5] Handle thumbnail load failures: placeholder background with video title
- [ ] T125 [US5] Create `components/home/Videos.tsx` (RSC wrapper) to fetch video data and pass to VideoTabs
- [ ] T126 [US5] Integrate Videos component into `app/page.tsx` after Projects section
- [ ] T127 [US5] Add section heading: "Videos"
- [ ] T128 [US5] Test tab switching: verify smooth transitions between video categories
- [ ] T129 [US5] Test YouTube embed loading: verify lazy loading works, no performance impact
- [ ] T130 [US5] Verify keyboard navigation: Tab and Arrow keys work for tab selection
- [ ] T131 [US5] Test responsive grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- [ ] T132 [US5] Test dark mode: thumbnail borders visible in dark theme
- [ ] T133 [US5] Measure vertical scroll reduction: should save 400-500px compared to full video list
- [ ] T134 [US5] Run Lighthouse audit: verify Performance ≥95 with lazy-loaded videos

**Checkpoint**: User Story 5 complete - tabbed videos interface fully functional and independently testable

---

## Phase 8: User Story 6 - Find Engineering Philosophy (Priority: P3)

**Goal**: Remove engineering philosophy from homepage and create dedicated /about page to reduce homepage clutter

**Independent Test**: Navigate to homepage and verify engineering philosophy section is NOT present. Verify optional callout card displays (if implemented) with "Learn More" CTA. Click CTA and verify navigation to `/about` page. On /about page, verify comprehensive engineering philosophy content displays with proper formatting and accessibility.

**Acceptance Criteria**: FR-019 through FR-023

**Estimated Time**: 2-3 hours

### Implementation for User Story 6

- [ ] T135 [US6] Create `app/about/page.tsx` for dedicated engineering philosophy page
- [ ] T136 [US6] Move existing engineering philosophy content from homepage to `/about` page
- [ ] T137 [US6] Add comprehensive philosophy content to `/about` page: values, approach, methodology
- [ ] T138 [US6] Style `/about` page content with proper typography, headings, spacing using Tailwind classes
- [ ] T139 [US6] Add metadata to `/about` page: title, description for SEO
- [ ] T140 [US6] Remove engineering philosophy section from `app/page.tsx`
- [ ] T141 [US6] (Optional) Create `components/home/PhilosophyCallout.tsx` (RSC) as small CTA card
- [ ] T142 [US6] (Optional) Implement PhilosophyCallout with heading, brief teaser, "Learn More" button linking to `/about`
- [ ] T143 [US6] (Optional) Integrate PhilosophyCallout into `app/page.tsx` (strategic placement after main sections)
- [ ] T144 [US6] Test navigation from homepage to `/about` page: verify link works
- [ ] T145 [US6] Verify `/about` page accessibility: semantic HTML, proper heading hierarchy (h1, h2, h3)
- [ ] T146 [US6] Test responsive layout on `/about` page: readable on mobile, tablet, desktop
- [ ] T147 [US6] Verify SEO metadata preserved: check Open Graph tags, meta description
- [ ] T148 [US6] Measure vertical scroll reduction: should save 400-500px from homepage by removing philosophy section
- [ ] T149 [US6] Run Lighthouse audit on `/about` page: verify Performance ≥95, Accessibility 100

**Checkpoint**: User Story 6 complete - engineering philosophy relocated to dedicated page

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories and overall quality

**Estimated Time**: 10-12 hours

- [ ] T150 [P] Add JSDoc comments to all new components in `components/home/` directory
- [ ] T151 [P] Verify all images use Next.js Image component with proper width/height attributes
- [ ] T152 [P] Add blur placeholders to all images: generate blurDataURL for each image
- [ ] T153 [P] Optimize image sizes: ensure all images are WebP format, properly sized for responsive breakpoints
- [ ] T154 Code review and refactoring: extract repeated patterns into shared utilities
- [ ] T155 Verify consistent spacing scale: 64px between sections, 32px between components
- [ ] T156 [P] Test all components in dark mode: verify color contrast ≥4.5:1 for all text
- [ ] T157 [P] Test all components with `prefers-reduced-motion`: disable animations appropriately
- [ ] T158 [P] Comprehensive keyboard navigation test: Tab through entire homepage, verify focus indicators
- [ ] T159 [P] Screen reader testing with VoiceOver (macOS): verify announcements for all interactive elements
- [ ] T160 [P] Screen reader testing with NVDA (Windows): cross-platform accessibility verification
- [ ] T161 Run WAVE browser extension audit: fix any accessibility issues flagged
- [ ] T162 Run axe DevTools audit: fix any accessibility violations
- [ ] T163 [P] Test on iPhone SE (375px): verify layout, touch interactions, no horizontal scroll
- [ ] T164 [P] Test on iPad (768px): verify tablet layout transitions
- [ ] T165 [P] Test on Desktop (1440px and 1920px): verify all components display correctly
- [ ] T166 Test orientation changes (mobile): portrait to landscape and back
- [ ] T167 [P] Cross-browser testing: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- [ ] T168 Performance optimization: implement code splitting for below-fold components using `next/dynamic`
- [ ] T169 Bundle size analysis: run `bun run build` and verify no significant increase in bundle size
- [ ] T170 Run comprehensive Lighthouse audit: Performance ≥95, Accessibility 100, Best Practices 100, SEO 100
- [ ] T171 Verify Core Web Vitals: LCP <1.0s, CLS <0.1, FID <100ms
- [ ] T172 Measure total vertical scroll reduction: document before/after measurements (target: 3000-3800px reduction)
- [ ] T173 Create comparison screenshots: before/after with scroll measurements overlay
- [ ] T174 Update README.md with new component documentation and development instructions
- [ ] T175 Run through quickstart.md validation: verify all steps work for new developer setup
- [ ] T176 Final Biome lint and format: `bun run lint && bun run format`
- [ ] T177 Commit all changes with meaningful commit messages following conventional commits
- [ ] T178 Create comprehensive PR description with before/after metrics, screenshots, testing checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if multiple developers available)
  - Or sequentially in priority order: US1 (P1) → US2 (P1) → US3 (P2) → US4 (P2) → US5 (P3) → US6 (P3)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (Timeline - P1)**: Can start after Foundational (Phase 2) ✅ **No dependencies on other stories**
- **User Story 2 (Skills - P1)**: Can start after Foundational (Phase 2) ✅ **No dependencies on other stories**
- **User Story 3 (Articles - P2)**: Can start after Foundational (Phase 2) ✅ **No dependencies on other stories**
- **User Story 4 (Projects - P2)**: Can start after Foundational (Phase 2) ✅ **No dependencies on other stories**
- **User Story 5 (Videos - P3)**: Can start after Foundational (Phase 2) ✅ **No dependencies on other stories**
- **User Story 6 (Philosophy - P3)**: Can start after Foundational (Phase 2) ✅ **No dependencies on other stories**

### Within Each User Story

- Populate data before creating components that consume the data
- Create child components (Cards, Items) before parent containers (Grids, Carousels, Tabs)
- Implement core functionality before integration into homepage
- Test independently before moving to next story

### Parallel Opportunities

#### Within Setup (Phase 1)
- Tasks T003, T004, T005 (verify shadcn components) can run in parallel

#### Within Foundational (Phase 2)
- Tasks T010, T011, T012, T013 (create data files) can run in parallel
- Tasks T016 can run in parallel with data file creation

#### Across User Stories (if team capacity allows)
Once Foundational phase completes, all 6 user stories can start in parallel by different developers:
- **Developer A**: User Story 1 (Timeline)
- **Developer B**: User Story 2 (Skills)
- **Developer C**: User Story 3 (Articles)
- **Developer D**: User Story 4 (Projects)
- **Developer E**: User Story 5 (Videos)
- **Developer F**: User Story 6 (Philosophy)

#### Within Individual User Stories
- **US1**: T018, T019 (populate data) run in parallel
- **US2**: T035, T036, T037, T038 (populate skills data) run in parallel
- **US4**: T082, T083, T084 (populate projects data) run in parallel
- **US5**: T109, T110, T111 (populate videos data) run in parallel

#### Within Polish (Phase 9)
- Tasks T150, T151, T152, T153 (documentation and optimization) run in parallel
- Tasks T156, T157, T158, T159, T160 (accessibility testing) run in parallel
- Tasks T163, T164, T165 (device testing) run in parallel
- Task T167 (cross-browser testing) can run in parallel with device testing

---

## Parallel Example: User Story 1 (Timeline)

```bash
# Launch data population tasks together:
Task T018: "Populate career timeline data in lib/timeline-data.ts"
Task T019: "Populate running timeline data in lib/timeline-data.ts"

# Then sequentially (T020 blocks T021):
Task T020: "Create components/home/TimelineItem.tsx"
Task T021: "Implement TimelineItem visual structure"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only - Both P1)

**Week 1-2**: Critical vertical scroll reduction with highest ROI

1. Complete Phase 1: Setup (2 hours)
2. Complete Phase 2: Foundational (4 hours) - **CRITICAL - blocks all stories**
3. Complete Phase 3: User Story 1 - Timeline (10 hours)
4. **STOP and VALIDATE**: Test Timeline independently on all devices
5. Complete Phase 4: User Story 2 - Skills (8 hours)
6. **STOP and VALIDATE**: Test Skills independently on all devices
7. Run comprehensive testing on MVP (both stories together)
8. Deploy/demo MVP

**Expected Result**: ~1100-1500px vertical scroll reduction (500-700 + 600-800) with dual identity showcase

### Incremental Delivery (Full Feature)

**Week 1-2**: Foundation + Critical Features (P1)
1. Setup + Foundational → Foundation ready
2. Add User Story 1 (Timeline) → Test independently → Deploy/Demo
3. Add User Story 2 (Skills) → Test independently → Deploy/Demo

**Week 2-3**: Important Features (P2)
4. Add User Story 3 (Articles) → Test independently → Deploy/Demo
5. Add User Story 4 (Projects) → Test independently → Deploy/Demo

**Week 3-4**: Nice-to-Have Features + Polish (P3)
6. Add User Story 5 (Videos) → Test independently → Deploy/Demo
7. Add User Story 6 (Philosophy) → Test independently → Deploy/Demo
8. Complete Phase 9 (Polish & Cross-Cutting)
9. Final QA and production deployment

**Expected Result**: ~3000-3800px vertical scroll reduction with all features

### Parallel Team Strategy (3 Developers)

With 3 developers working simultaneously:

**Week 1**: Foundation (All together)
- All devs: Complete Setup + Foundational (1 day)

**Week 1-2**: Critical Features (Parallel)
- Developer A: User Story 1 (Timeline)
- Developer B: User Story 2 (Skills)
- Developer C: User Story 3 (Articles)

**Week 2-3**: Important + Nice-to-Have (Parallel)
- Developer A: User Story 4 (Projects)
- Developer B: User Story 5 (Videos)
- Developer C: User Story 6 (Philosophy)

**Week 3**: Polish (Distributed)
- Developer A: Performance optimization (T168-T172)
- Developer B: Accessibility testing (T156-T162)
- Developer C: Cross-device/browser testing (T163-T167)

**Expected Timeline**: 3 weeks to complete all features with parallel execution

---

## Testing Strategy

### Manual Testing Checkpoints

Each user story has testing tasks embedded within the phase. Key checkpoints:

1. **After Each Component**: Verify component renders correctly in isolation
2. **After Integration**: Verify component works within homepage context
3. **After Responsive Implementation**: Test on 3 devices (mobile, tablet, desktop)
4. **After Accessibility Implementation**: Test keyboard navigation and screen reader
5. **After Story Completion**: Run Lighthouse audit for that section

### Testing Tools Required

- **Performance**: Chrome DevTools Lighthouse, WebPageTest
- **Accessibility**: WAVE browser extension, axe DevTools, screen readers (VoiceOver/NVDA)
- **Responsive**: Chrome DevTools device mode, real devices (iPhone, iPad, Android)
- **Cross-browser**: BrowserStack or manual testing (Chrome, Firefox, Safari, Edge)
- **Code Quality**: Biome (already configured), TypeScript compiler

### Acceptance Criteria Validation

Each user story lists specific acceptance criteria from spec.md. Verify each criterion is met before marking story complete:

- **US1**: FR-001 through FR-009c, SC-002
- **US2**: FR-010 through FR-018b, SC-003
- **US3**: FR-024 through FR-033b, SC-004
- **US4**: FR-034 through FR-041a, SC-012
- **US5**: FR-042 through FR-049b
- **US6**: FR-019 through FR-023

### Final Validation (Before Production)

- [ ] All Lighthouse scores ≥95 (Performance), 100 (Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals: LCP <1.0s, CLS <0.1, FID <100ms
- [ ] Total vertical scroll reduction: 3000-3800px (50-60% from baseline)
- [ ] Zero TypeScript errors: `npx tsc --noEmit`
- [ ] Zero Biome lint errors: `bun run lint`
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader compatibility verified (VoiceOver + NVDA)
- [ ] Cross-browser testing passed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing passed (iPhone, iPad, Android)
- [ ] Dark mode verified on all components

---

## Notes

### Component Architecture Decisions

- **[P] tasks**: Different files, no dependencies, can run in parallel
- **[Story] label**: Maps task to specific user story for traceability (US1, US2, US3, US4, US5, US6)
- **RSC by default**: Timeline, Skills (grid), Articles (card), Projects (grid), Videos (card) are Server Components
- **Client when needed**: SkillTabs, ArticlesCarousel, VideoTabs use `'use client'` for interactivity
- **Composition pattern**: Wrapper RSCs fetch data and pass to client components (e.g., Skills → SkillTabs)

### Data Strategy

- **Static data**: Timeline, skills, videos in `lib/*.ts` files
- **Build-time data**: Articles from MDX using content-collections (zero runtime overhead)
- **Image optimization**: All images via Next.js Image with blur placeholders, lazy loading
- **Type safety**: All data structures defined in `types/index.ts`, TypeScript strict mode

### Performance Targets

- **Bundle size**: <10% increase from baseline
- **LCP**: <1.0s (aggressive target, constitution allows <2.5s)
- **CLS**: <0.1 (no layout shifts during component loading)
- **FID**: <100ms (responsive interactions)
- **Lighthouse**: Performance ≥95, Accessibility 100

### Accessibility Requirements (WCAG AA)

- All interactive elements keyboard accessible (Tab, Arrow, Enter, Space, ESC)
- Focus indicators visible (2px ring minimum)
- Color contrast ≥4.5:1 for all text (light and dark modes)
- ARIA labels for all interactive widgets (carousels, tabs)
- Screen reader announcements for dynamic content
- Touch targets ≥44x44px on mobile

### Critical Success Metrics

1. **Vertical Scroll Reduction**: 3000-3800px (50-60%)
   - Timeline: 500-700px savings
   - Skills: 600-800px savings
   - Articles: 500-600px savings
   - Projects: 300-400px savings
   - Videos: 400-500px savings
   - Philosophy: 400-500px savings

2. **Performance Maintained**: Lighthouse ≥95 after all changes

3. **Accessibility Maintained**: WCAG AA compliance, 100% Lighthouse Accessibility

4. **User Experience**: Smooth interactions, responsive across all devices

---

## Summary

**Total Tasks**: 178 tasks
**Estimated Timeline**: 3-4 weeks (solo developer) | 2-3 weeks (team of 3)

### Task Distribution by User Story

- **Setup (Phase 1)**: 8 tasks
- **Foundational (Phase 2)**: 9 tasks
- **User Story 1 - Timeline (P1)**: 17 tasks
- **User Story 2 - Skills (P1)**: 23 tasks
- **User Story 3 - Articles (P2)**: 24 tasks
- **User Story 4 - Projects (P2)**: 27 tasks
- **User Story 5 - Videos (P3)**: 26 tasks
- **User Story 6 - Philosophy (P3)**: 15 tasks
- **Polish & Cross-Cutting (Phase 9)**: 29 tasks

### Parallel Opportunities Identified

- **42 tasks** can run in parallel (marked with [P])
- **6 user stories** can be developed independently after Foundational phase
- **Within user stories**: Data population, component creation (child before parent)

### Independent Test Criteria

Each user story has clear independent test criteria:
- **US1**: Test dual timeline layout, keyboard navigation, screen reader
- **US2**: Test tab switching, keyboard navigation, responsive grid
- **US3**: Test carousel scrolling, touch gestures, arrow visibility
- **US4**: Test bento grid layout, hover effects, featured project prominence
- **US5**: Test video tabs, YouTube embed, responsive grid
- **US6**: Test /about page navigation, content display

### Suggested MVP Scope

**Recommendation**: User Stories 1 & 2 (both P1 priority)
- **Deliverables**: Dual timeline + Tabbed skills
- **Vertical Reduction**: ~1100-1500px (35-40% of target)
- **Value**: Showcases unique dual identity + efficient skill browsing
- **Timeline**: 2 weeks (solo) | 1 week (team)
- **Risk**: Low - both stories fully independent, well-defined requirements

### Format Validation

✅ **ALL tasks follow checklist format**:
- Checkbox: `- [ ]` prefix ✅
- Task ID: Sequential (T001-T178) ✅
- [P] marker: Present only on parallelizable tasks ✅
- [Story] label: Present on all user story phase tasks (US1-US6) ✅
- Description: Clear action with file path ✅

### Next Steps

1. **Immediate**: Complete Phase 1 (Setup) - verify all prerequisites
2. **Critical**: Complete Phase 2 (Foundational) - blocks all stories
3. **MVP Path**: Implement US1 + US2 → Test → Deploy → Gather feedback
4. **Full Feature**: Add US3 → US4 → US5 → US6 incrementally
5. **Final**: Polish phase → Production deployment

**Ready to implement! 🚀**
