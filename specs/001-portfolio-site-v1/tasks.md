# Tasks: Personal Portfolio Website

**Input**: Design documents from `/specs/001-portfolio-site-v1/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: E2E tests with Playwright are included in the implementation plan. Lighthouse CI will validate performance.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js App Router**: `app/`, `components/`, `lib/`, `content/`, `public/`
- All paths shown are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure that serves all user stories

- [x] T001 Verify Next.js 15.5.6 project structure with TypeScript and Tailwind CSS v4 in `package.json`
- [X] T002 [P] Verify Biome configuration for linting and formatting in `biome.json`
- [X] T003 [P] Install @content-collections/next and configure in `content-collections.config.ts`
- [x] T004 [P] Install React Hook Form and Zod for form validation: `bun install react-hook-form zod @hookform/resolvers`
- [X] T005 [P] Install Resend SDK for email: `bun install resend`
- [X] T006 [P] Install PostHog for analytics: `bun install posthog-js @posthog/next`
- [X] T007 [P] Install Fuse.js for search: `bun install fuse.js`
- [X] T008 [P] Install lite-youtube-embed: `bun install react-lite-youtube-embed`
- [X] T009 [P] Install reading-time utility: `bun install reading-time`
- [X] T010 [P] Install next-themes for dark mode: `bun install next-themes`
- [X] T011 Create environment variables template in `.env.example` with RESEND_API_KEY, NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST, NEXT_PUBLIC_SITE_URL
- [X] T012 [P] Create `content/blog/` directory for MDX blog posts
- [X] T013 [P] Create `content/projects/` directory for project JSON files
- [X] T014 [P] Create `public/images/projects/` directory for project thumbnails
- [X] T015 [P] Create `public/images/blog/` directory for blog featured images
- [X] T016 Create site configuration in `lib/constants.ts` with siteConfig, skills, achievements, and socialLinks
- [X] T017 Create validation schemas in `lib/validations.ts` for blogPostSchema, projectSchema, and contactSubmissionSchema
- [X] T018 Create type definitions in `types/index.ts` exporting all schemas and types

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T019 Configure content collections schema in `content-collections.config.ts` for blog posts with Zod validation
- [X] T020 Configure Next.js Image optimization in `next.config.ts` for optimized image delivery
- [X] T021 Create root layout in `app/layout.tsx` with metadata, fonts (Geist Sans/Mono), and theme provider
- [X] T022 Create global styles in `app/globals.css` with Tailwind imports, CSS variables for theme (OKLCH color space), and design tokens
- [X] T023 Create theme provider component in `components/providers/ThemeProvider.tsx` using next-themes
- [X] T024 Create PostHog provider component in `components/providers/PostHogProvider.tsx` for analytics
- [X] T025 Create utility functions in `lib/utils.ts` including cn() helper for className merging
- [X] T026 Create MDX processing utilities in `lib/mdx.ts` for getAllPosts(), getPostBySlug(), and reading time calculation
- [X] T027 [P] Create Navigation component in `components/shared/Navigation.tsx` with smooth scroll and mobile hamburger menu (FR-001 to FR-004)
- [X] T028 [P] Create Footer component in `components/shared/Footer.tsx` with copyright, social links, and tech stack credits (FR-032)
- [X] T029 [P] Create SocialLinks component in `components/shared/SocialLinks.tsx` for reusable social media icon links
- [X] T030 Create 404 page in `app/not-found.tsx` with helpful navigation back to home
- [X] T031 Create sitemap generator in `app/sitemap.ts` dynamically including all blog posts (FR-048)
- [X] T032 Create robots.txt generator in `app/robots.ts` with sitemap reference (FR-049)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Technical Recruiter Quick Evaluation (Priority: P1) 🎯 MVP

**Goal**: Enable technical recruiters to evaluate candidate skills, projects, and contact information within 60 seconds on a single-page portfolio

**Independent Test**: Navigate to portfolio URL → within 60 seconds identify: (1) primary technical skills in hero/about, (2) 2-3 project examples with tech stacks and links, (3) GitHub profile link, (4) contact method or resume download. Success = all 4 objectives without scrolling beyond 3 screen heights.

### Implementation for User Story 1

#### Hero Section (Immediate First Impression)

- [X] T033 [P] [US1] Create Hero section component in `components/home/Hero.tsx` with headshot, name, tagline, CTA buttons (FR-005, FR-006)
- [X] T034 [US1] Optimize headshot image with priority loading in Hero component using Next.js Image with priority prop (FR-007)
- [X] T035 [US1] Add social media quick links (GitHub, LinkedIn, Twitter, Strava, YouTube) to Hero using SocialLinks component (FR-006)
- [X] T036 [US1] Implement CTA buttons in Hero: "View Projects" (scroll to #projects) and "Contact Me" (scroll to #contact)

#### About Section (Skills & Qualifications)

- [X] T037 [P] [US1] Create About section component in `components/home/About.tsx` with personal narrative (300-500 words) (FR-008)
- [X] T038 [US1] Create Skills display component in `components/home/Skills.tsx` with technology badges organized by category (Frontend, Backend, DevOps) (FR-009)
- [X] T039 [US1] Create Timeline component in `components/home/Timeline.tsx` displaying career milestones and running achievements from constants (FR-008)
- [X] T040 [US1] Add resume download button in About section linking to `/public/resume.pdf` (FR-011)
- [X] T041 [US1] Display running achievements (total races, PRs, notable results) in About section (FR-010)

#### Projects Showcase (Work Quality Demonstration)

- [X] T042 [P] [US1] Create Projects section component in `components/home/Projects.tsx` with responsive grid layout (3 cols desktop, 2 tablet, 1 mobile) (FR-012)
- [X] T043 [US1] Create ProjectCard component in `components/shared/ProjectCard.tsx` with thumbnail, title, description, tech badges, demo/GitHub links (FR-013, FR-014)
- [X] T044 [US1] Add hover effects to ProjectCard revealing additional details (FR-015)
- [X] T045 [US1] Implement project modal preview component in `components/shared/ProjectModal.tsx` for quick view with Dialog from shadcn/ui
- [X] T046 [US1] Create project filtering logic in Projects component by technology (e.g., "Show React projects") (FR-016)
- [X] T047 [US1] Create project sorting logic (recent first, alphabetical, by type) in Projects component (FR-017)
- [X] T048 [US1] Load project data from `content/projects/*.json` in Projects component and validate against projectSchema

#### Contact Section (Recruiter Outreach)

- [X] T049 [P] [US1] Create Contact section component in `components/home/Contact.tsx` with form and social links (FR-027)
- [X] T050 [US1] Create ContactForm component in `components/home/ContactForm.tsx` using React Hook Form + Zod validation (FR-028, FR-029)
- [X] T051 [US1] Add honeypot spam protection field (hidden "website" input) to ContactForm (FR-031)
- [X] T052 [US1] Create contact form API route in `app/api/contact/route.ts` using Resend for email delivery
- [X] T053 [US1] Implement rate limiting in contact API route (1 submission per minute per IP)
- [X] T054 [US1] Add success/error message handling to ContactForm with clear user feedback (FR-030)
- [X] T055 [US1] Add direct email link and social media links in Contact section as fallback (FR-027)

#### Home Page Assembly

- [X] T056 [US1] Create home page route in `app/(home)/page.tsx` assembling Hero, About, Projects, Contact sections (FR-001)
- [X] T057 [US1] Implement smooth scrolling between sections in home page using scroll-behavior CSS or scroll library (FR-003)
- [X] T058 [US1] Add active section highlighting in Navigation based on scroll position (FR-003)

#### Mobile Responsiveness (P1 Requirement)

- [X] T059 [US1] Test and fix mobile responsiveness for all US1 components (320px-768px viewports) (FR-039 to FR-043)
- [X] T060 [US1] Ensure touch targets are minimum 44×44px on all interactive elements (FR-040)
- [X] T061 [US1] Verify text readability without zooming (minimum 16px font size) (FR-041)
- [X] T062 [US1] Test mobile navigation hamburger menu functionality

#### SEO & Performance (P1 Critical)

- [X] T063 [US1] Add metadata export to home page with title, description, OpenGraph, Twitter Cards (FR-044 to FR-047)
- [X] T064 [US1] Add Person structured data (JSON-LD) in home layout for homepage (FR-055)
- [X] T065 [US1] Verify all images use Next.js Image component with proper width/height (FR-036)
- [X] T066 [US1] Optimize all images stored in `public/images/` (compress to <500KB, WebP format) (FR-037)
- [X] T067 [US1] Run Lighthouse audit on home page - target 95+ performance score (FR-033, FR-056)
- [X] T068 [US1] Verify FCP <1.5s and CLS <0.1 on 3G mobile connection (FR-034, FR-035)

**Checkpoint**: At this point, User Story 1 (Technical Recruiter) should be fully functional. Recruiter can land on homepage → see skills/experience → browse projects → contact or download resume - all within 60 seconds.

---

## Phase 4: User Story 2 - Fitness Community Connection (Priority: P2)

**Goal**: Enable fitness community members to discover running content, training insights, and connect via social media within 3 minutes

**Independent Test**: Arrive from social media link → find 2-3 fitness blog posts or videos within 3 minutes → understand running journey from about section → identify social platform to follow. Success = follower bookmark site.

### Implementation for User Story 2

#### Blog Content Hub (Fitness Content Discovery)

- [X] T069 [P] [US2] Create Blog preview section component in `components/home/Blog.tsx` showing 3-4 recent posts (FR-018)
- [X] T070 [US2] Create BlogCard component in `components/blog/BlogCard.tsx` with featured image, title, excerpt, tags, reading time (FR-018)
- [X] T071 [US2] Add "View All Posts" link in Blog section linking to `/blog` page (FR-021)
- [X] T072 [US2] Fetch latest 3-4 blog posts from content collections in Blog component
- [X] T073 [US2] Filter blog posts by category to show fitness/running content prominently in Blog section (FR-024)

#### Blog Listing Page (Content Browsing)

- [X] T074 [P] [US2] Create blog listing page in `app/blog/page.tsx` displaying all blog posts with pagination or load more (FR-021)
- [X] T075 [US2] Create blog layout in `app/blog/layout.tsx` with breadcrumbs and sidebar (optional)
- [X] T076 [US2] Implement tag filtering in blog listing page (Technical, Fitness, Lifestyle categories) (FR-024, FR-025)
- [X] T077 [US2] Create search bar component in `components/blog/SearchBar.tsx` using Fuse.js for client-side search (FR-025)
- [X] T078 [US2] Integrate search functionality in blog listing page searching titles, descriptions, content (FR-025)
- [X] T079 [US2] Add blog listing metadata with title, description, OpenGraph tags

#### Individual Blog Post Pages (Deep Content Engagement)

- [X] T080 [P] [US2] Create blog post page in `app/blog/[slug]/page.tsx` with generateStaticParams for SSG (FR-020)
- [X] T081 [US2] Create MDX components in `components/blog/MDXComponents.tsx` for custom rendering (headings, links, code blocks, images)
- [X] T082 [US2] Add syntax highlighting for code blocks in blog posts using Prism or Shiki (FR-060)
- [X] T083 [US2] Create MDX styles in `styles/mdx.css` for prose formatting (Tailwind typography plugin)
- [X] T084 [US2] Create table of contents component in `components/blog/TableOfContents.tsx` for posts >1000 words (FR-026)
- [X] T085 [US2] Generate TOC from heading structure in blog post page (FR-026)
- [X] T086 [US2] Display reading time in blog post page (FR-061)
- [X] T087 [US2] Add BlogPosting structured data (JSON-LD) to blog post page (FR-055)
- [X] T088 [US2] Add metadata generation function to blog post page with title, description, OpenGraph tags (FR-044 to FR-047)

#### YouTube Video Embeds (Training Content)

- [X] T089 [P] [US2] Add featured videos section to Blog component or create separate Videos component in `components/home/Videos.tsx` (FR-022)
- [X] T090 [US2] Create YouTubeEmbed component in `components/shared/YouTubeEmbed.tsx` using lite-youtube-embed for lazy loading (FR-023)
- [X] T091 [US2] Add 3-4 hardcoded video IDs to siteConfig.featuredVideos in `lib/constants.ts`
- [X] T092 [US2] Embed YouTube videos in Videos section with lazy loading to prevent blocking page load (FR-023)

#### Running Achievements Integration (About Section Enhancement)

- [X] T093 [US2] Enhance About section narrative to integrate running journey with engineering background (Constitution VII)
- [X] T094 [US2] Add running stats display (total races, PRs, notable achievements) in About section (FR-010)
- [X] T095 [US2] Ensure social links prominently display Strava, Instagram, YouTube in Hero and Footer (FR-006, FR-032)

#### Sample Content Creation

- [X] T096 [P] [US2] Create 2-3 sample fitness blog posts in `content/blog/` with MDX frontmatter (marathon training, race reports, etc.)
- [X] T097 [US2] Add featured images for sample fitness blog posts to `public/images/blog/`
- [X] T098 [US2] Validate sample blog post frontmatter against blogPostSchema

**Checkpoint**: At this point, User Story 2 (Fitness Community) should be fully functional. Fitness enthusiast can discover running content → read blog posts → watch videos → follow on social media - all within 3 minutes.

---

## Phase 5: User Story 3 - Collaborator Deep Technical Assessment (Priority: P2)

**Goal**: Enable potential collaborators to deeply evaluate technical expertise through detailed project case studies and technical blog posts within 10-15 minutes

**Independent Test**: Given 10-15 minutes → review 3-4 detailed project case studies → read 2-3 technical blog posts → verify GitHub activity → submit project proposal. Success = confidence to initiate business conversation.

### Implementation for User Story 3

#### Detailed Project Pages (Case Studies)

- [X] T099 [P] [US3] Create project detail page route in `app/projects/[slug]/page.tsx` with generateStaticParams for SSG
- [X] T100 [US3] Enhance project JSON schema in `lib/validations.ts` to support longDescription, problemStatement, technicalApproach, challenges, outcomes, metrics
- [X] T101 [US3] Create comprehensive project page layout in `app/projects/[slug]/page.tsx` showing:
  - Problem statement
  - Technical approach and architecture
  - Challenges overcome
  - Measurable outcomes and metrics
  - Related projects
- [X] T102 [US3] Add SoftwareApplication structured data (JSON-LD) to project pages (FR-055)
- [X] T103 [US3] Add metadata generation for project pages with unique OpenGraph tags for sharing
- [X] T104 [US3] Add breadcrumb navigation in project pages to return to home/#projects
- [X] T105 [US3] Update ProjectCard modal to include "Learn More" button linking to full project page

#### Enhanced Project Modal (Quick Preview)

- [X] T106 [US3] Enhance ProjectModal component to show quick preview with thumbnail, description, tech stack, demo/GitHub links, and "Learn More" button
- [X] T107 [US3] Ensure modal is keyboard navigable and focus-trapped per accessibility requirements (FR-053)

#### Technical Blog Content

- [X] T108 [P] [US3] Create 2-3 sample technical blog posts in `content/blog/` demonstrating clear explanation of complex concepts, code examples, lessons learned
- [X] T109 [US3] Ensure technical blog posts have proper syntax highlighting for code blocks (FR-060)
- [X] T110 [US3] Add architecture diagrams or images to technical blog posts stored in `public/images/blog/`

#### Skills & Professional Philosophy (About Section Enhancement)

- [X] T111 [US3] Enhance About section to include comprehensive skill overview with years of experience and professional philosophy
- [X] T112 [US3] Organize skills by category (Frontend, Backend, DevOps, Tools) with proficiency levels
- [X] T113 [US3] Add career timeline showing progression and key achievements

#### Contact Form Enhancement (Project Proposal)

- [X] T114 [US3] Ensure contact form supports detailed message submissions (up to 5000 characters) for project proposals
- [X] T115 [US3] Add clear confirmation feedback after form submission (FR-030)

**Checkpoint**: At this point, User Story 3 (Collaborator) should be fully functional. Collaborator can review detailed project case studies → read technical blog posts → assess expertise → submit proposal - all within 10-15 minutes.

---

## Phase 6: User Story 4 - Mobile Visitor Quick Browse (Priority: P3)

**Goal**: Ensure fast loading, readable content, and accessible navigation on mobile devices with 3G connection

**Independent Test**: On mobile device with 3G connection → load homepage in <3s → navigate all sections with touch gestures → read text without zooming → access interactive elements with thumb-friendly tap targets. Success = complete any P1/P2 journey on mobile.

### Implementation for User Story 4

#### Mobile Performance Optimization

- [ ] T116 [P] [US4] Optimize hero headshot image size and format for fast mobile loading (target <100KB compressed)
- [ ] T117 [US4] Ensure all images use responsive sizes attribute for proper mobile sizing
- [ ] T118 [US4] Implement lazy loading for all images below the fold (except hero headshot with priority)
- [ ] T119 [US4] Defer non-critical JavaScript loading to improve FCP on mobile
- [ ] T120 [US4] Run Lighthouse mobile audit targeting FCP <1.5s on 3G connection (FR-034)

#### Mobile UI/UX Refinements

- [ ] T121 [US4] Verify all text is readable without zooming (minimum 16px font size for body text) (FR-041)
- [ ] T122 [US4] Ensure all touch targets (buttons, links, form inputs) are minimum 44×44px (FR-040)
- [ ] T123 [US4] Test and refine mobile navigation hamburger menu with smooth animations
- [ ] T124 [US4] Ensure project cards display properly in single column layout on mobile (FR-012)
- [ ] T125 [US4] Verify YouTube embeds are responsive and don't cause layout shifts on mobile (FR-022, FR-023)
- [ ] T126 [US4] Test contact form usability on mobile devices (keyboard behavior, validation messages)

#### Mobile Responsive Testing

- [ ] T127 [US4] Test all sections on iPhone (Safari) with 320px-375px viewport
- [ ] T128 [US4] Test all sections on Android (Chrome) with 360px-414px viewport
- [ ] T129 [US4] Test tablet layout (768px-1024px) on iPad
- [ ] T130 [US4] Fix any horizontal scrolling issues (FR-039)
- [ ] T131 [US4] Verify images scale proportionally without breaking layout (FR-042)

#### Mobile Edge Cases

- [ ] T132 [US4] Test project modal on mobile - ensure it opens and closes smoothly
- [ ] T133 [US4] Test blog post reading experience on mobile (prose formatting, code block horizontal scroll)
- [ ] T134 [US4] Ensure navigation links work on mobile and scroll to correct sections
- [ ] T135 [US4] Verify social media links open correctly on mobile devices

**Checkpoint**: At this point, User Story 4 (Mobile Visitor) should be fully functional. Mobile user can load site quickly → browse all sections → read content → interact with elements - all on mobile device.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final production readiness

### Accessibility & WCAG Compliance

- [X] T136 [P] Add alt text to all images (empty alt="" for decorative images) (FR-050)
- [X] T137 [P] Verify semantic HTML structure (header, nav, main, article, section, aside, footer) (FR-051)
- [X] T138 [P] Verify heading hierarchy (single h1, no skipped levels) (FR-052)
- [X] T139 Test keyboard navigation for all interactive elements with visible focus indicators (FR-053)
- [X] T140 Run axe DevTools accessibility audit and fix all WCAG AA violations
- [ ] T141 Verify color contrast meets 4.5:1 for normal text, 3:1 for large text (FR-054)
- [ ] T142 Test screen reader compatibility with NVDA or VoiceOver
- [X] T143 Add skip-to-content link for keyboard users

### Performance Optimization & Testing

- [X] T144 [P] Run Lighthouse audit on all pages (home, blog listing, blog post, project page)
- [X] T145 Optimize bundle size - remove unused dependencies and code
- [X] T146 Enable Next.js compression and optimize build output
- [X] T147 Verify Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1 (FR-033 to FR-035)
- [ ] T148 Test site performance on slow 3G connection
- [X] T149 Verify static generation for all routes (check .next/server output)

### Cross-Browser Testing

- [ ] T150 Test on Chrome (latest) - desktop and mobile
- [ ] T151 Test on Firefox (latest) - desktop and mobile
- [ ] T152 Test on Safari (latest) - desktop and iOS
- [ ] T153 Test on Edge (latest) - desktop
- [ ] T154 Fix any browser-specific layout or functionality issues

### SEO & Analytics

- [X] T155 [P] Verify all pages have unique meta titles and descriptions (FR-044, FR-045)
- [ ] T156 [P] Verify OpenGraph tags work correctly (test with Facebook Sharing Debugger)
- [ ] T157 [P] Verify Twitter Card tags work correctly (test with Twitter Card Validator)
- [X] T158 Verify sitemap.xml is generated correctly with all pages
- [X] T159 Verify robots.txt allows crawling
- [X] T160 Test PostHog analytics tracking (page views, custom events)
- [X] T161 Add custom PostHog events: project_viewed, blog_post_viewed, contact_form_submitted, resume_downloaded, social_link_clicked

### Content Quality

- [ ] T162 [P] Replace all placeholder text in Hero, About, and Contact sections with real content
- [ ] T163 [P] Add professional headshot image to `public/images/headshot.jpg` (800×800px, <500KB)
- [ ] T164 [P] Add 6-8 real project entries to `content/projects/` with thumbnails
- [ ] T165 [P] Add 5-10 real blog posts (mix of technical and fitness) to `content/blog/`
- [ ] T166 [P] Add project thumbnail images to `public/images/projects/` (1200×675px, <300KB each)
- [ ] T167 [P] Add blog featured images to `public/images/blog/` (1200×675px, <300KB each)
- [ ] T168 Upload resume PDF to `public/resume.pdf`
- [ ] T169 Add OpenGraph share image to `public/og-image.png` (1200×630px)
- [ ] T170 Update siteConfig in `lib/constants.ts` with real author information and social links

### Error Handling & Edge Cases

- [ ] T171 [P] Test contact form with invalid inputs (empty fields, invalid email, short message)
- [ ] T172 Test contact form with honeypot filled (spam detection)
- [ ] T173 Test contact form submission failure (Resend API error) - verify fallback mailto: link
- [ ] T174 Test YouTube video embeds when videos are unavailable or deleted
- [ ] T175 Test empty state for blog listing page (no posts yet)
- [ ] T176 Test empty state for projects section (no projects yet)
- [ ] T177 Test 404 page by navigating to non-existent URL
- [ ] T178 Test JavaScript disabled scenario - verify core content is visible

### Documentation & Deployment Prep

- [ ] T179 [P] Update README.md with project overview, tech stack, and local setup instructions
- [ ] T180 [P] Verify quickstart.md is accurate and up-to-date
- [ ] T181 [P] Create or update CHANGELOG.md documenting feature completion
- [ ] T182 Set up Vercel project and connect GitHub repository
- [ ] T183 Configure environment variables in Vercel dashboard (RESEND_API_KEY, NEXT_PUBLIC_POSTHOG_KEY, etc.)
- [ ] T184 Set up custom domain in Vercel (if applicable)
- [ ] T185 Enable automatic deployments on push to main branch
- [ ] T186 Create preview deployment from current branch and test
- [ ] T187 Run production build locally (`bun run build && bun start`) and verify all pages work
- [ ] T188 Deploy to production on Vercel

### Lighthouse CI & Pre-Launch Validation

- [ ] T189 [P] Set up Lighthouse CI workflow in `.github/workflows/lighthouse-ci.yml`
- [ ] T190 Configure Lighthouse CI thresholds (performance ≥95, accessibility 100, SEO ≥95)
- [ ] T191 Run final Lighthouse audit on production deployment
- [ ] T192 Verify all Lighthouse scores meet targets (performance 95+, accessibility 100, SEO 95+)

### Final QA Checklist

- [ ] T193 Verify all links work correctly (internal navigation, external links, social media links)
- [ ] T194 Verify contact form submits successfully and email is received
- [ ] T195 Verify resume downloads properly from About and Contact sections
- [ ] T196 Verify social media links open in new tabs and point to correct profiles
- [ ] T197 Verify blog posts render with proper formatting, syntax highlighting, and images
- [ ] T198 Verify project cards link to correct demo/GitHub URLs
- [ ] T199 Verify SEO meta tags present on all pages (home, blog, blog posts, projects)
- [ ] T200 Verify no console errors or warnings in production build
- [ ] T201 Verify analytics tracking is working (check PostHog dashboard)
- [ ] T202 Run final cross-browser and cross-device test
- [ ] T203 Verify site loads fast on mobile 3G connection (<3s FCP)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User Story 1 (P1): MVP - complete first
  - User Story 2 (P2): Can start after US1 or in parallel
  - User Story 3 (P2): Can start after US1 or in parallel
  - User Story 4 (P3): Can start after any user story or in parallel
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
  - Delivers: Homepage with hero, about, projects, contact sections
  - Independent test: Recruiter can evaluate skills and projects in 60 seconds

- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 components (Hero, About)
  - Delivers: Blog content hub, blog listing page, individual blog posts, YouTube videos
  - Independent test: Fitness enthusiast can find 2-3 fitness content pieces in 3 minutes
  - Integration points: Uses About section from US1, adds Blog section to home page

- **User Story 3 (P2)**: Can start after US1 (requires Projects section) - Extends US1 projects with detail pages
  - Delivers: Detailed project case study pages, enhanced project modal, technical blog content
  - Independent test: Collaborator can review 3-4 project case studies in 10-15 minutes
  - Integration points: Extends ProjectCard from US1, uses blog functionality from US2

- **User Story 4 (P3)**: Can start after any user story - Focuses on mobile optimization across all features
  - Delivers: Mobile-optimized experience, performance tuning, responsive refinements
  - Independent test: Mobile user can complete any P1/P2 journey on mobile device
  - Integration points: Optimizes all components from US1, US2, US3

### Within Each User Story

**User Story 1 (P1)**:
- Hero, About, Projects, Contact sections can be built in parallel (marked [P])
- Home page assembly (T056) requires all sections complete
- Mobile responsiveness (T059-T062) requires all components complete
- SEO & performance (T063-T068) can happen after core components

**User Story 2 (P2)**:
- Blog hub, listing page, and individual posts can be built in parallel (marked [P])
- YouTube embeds can be built independently (marked [P])
- Sample content creation can happen in parallel (marked [P])

**User Story 3 (P2)**:
- Project detail pages can be built in parallel with technical blog content (marked [P])
- Enhanced modal requires ProjectCard from US1 to be complete

**User Story 4 (P3)**:
- Mobile performance optimization tasks can run in parallel (marked [P])
- Mobile testing requires all previous components to exist

### Parallel Opportunities

- **Setup (Phase 1)**: Tasks T002-T010 (dependencies installation) can all run in parallel
- **Foundational (Phase 2)**: Tasks T027-T029 (Navigation, Footer, SocialLinks) can run in parallel
- **User Story 1**: Hero (T033-T036), About (T037-T041), Projects (T042-T048), Contact (T049-T055) sections can be built by different team members in parallel
- **User Story 2**: Blog hub (T069-T073), listing page (T074-T079), blog post pages (T080-T088), videos (T089-T092) can be built in parallel
- **User Story 3**: Project pages (T099-T105), enhanced modal (T106-T107), technical content (T108-T110) can be built in parallel
- **Polish (Phase 7)**: Accessibility (T136-T143), content creation (T162-T170), documentation (T179-T181) can all run in parallel

---

## Parallel Example: User Story 1 (MVP)

```bash
# After Foundational Phase is complete, launch all US1 sections in parallel:

# Team Member 1: Hero Section
Task T033: "Create Hero section component in components/home/Hero.tsx"
Task T034: "Optimize headshot image with priority loading"
Task T035: "Add social media quick links to Hero"
Task T036: "Implement CTA buttons in Hero"

# Team Member 2: About Section
Task T037: "Create About section component in components/home/About.tsx"
Task T038: "Create Skills display component"
Task T039: "Create Timeline component"
Task T040: "Add resume download button"
Task T041: "Display running achievements"

# Team Member 3: Projects Section
Task T042: "Create Projects section component"
Task T043: "Create ProjectCard component"
Task T044: "Add hover effects to ProjectCard"
Task T045: "Implement project modal preview"
Task T046: "Create project filtering logic"
Task T047: "Create project sorting logic"
Task T048: "Load project data from JSON files"

# Team Member 4: Contact Section
Task T049: "Create Contact section component"
Task T050: "Create ContactForm component with validation"
Task T051: "Add honeypot spam protection"
Task T052: "Create contact form API route"
Task T053: "Implement rate limiting in API route"
Task T054: "Add success/error message handling"
Task T055: "Add direct email and social links"

# Once all sections complete, proceed sequentially:
Task T056: "Assemble home page with all sections"
Task T057: "Implement smooth scrolling"
Task T058: "Add active section highlighting"
# ... continue with mobile responsiveness and SEO tasks
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - Recommended Path

1. **Week 1**: Complete Phase 1 (Setup) + Phase 2 (Foundational)
   - Foundation ready for user stories

2. **Week 2**: Complete Phase 3 (User Story 1 - Technical Recruiter)
   - Build Hero, About, Projects, Contact sections
   - Assemble single-page homepage
   - Optimize for mobile and performance
   - **STOP and VALIDATE**: Can recruiter evaluate candidate in 60 seconds?
   - Deploy MVP to production!

3. **Week 3**: Add Phase 4 (User Story 2 - Fitness Community)
   - Add blog content hub, listing page, individual posts
   - Add YouTube video embeds
   - **Test independently**: Can fitness enthusiast find content in 3 minutes?
   - Deploy to production

4. **Week 4**: Add Phase 5 (User Story 3 - Collaborator)
   - Add detailed project case study pages
   - Enhance blog with technical content
   - **Test independently**: Can collaborator assess expertise in 10-15 minutes?
   - Deploy to production

5. **Week 5**: Add Phase 6 (User Story 4 - Mobile Optimization)
   - Mobile performance tuning across all features
   - **Test independently**: Can mobile user complete any journey?
   - Deploy to production

6. **Week 6**: Complete Phase 7 (Polish)
   - Final accessibility, SEO, content quality improvements
   - Cross-browser testing and bug fixes
   - Launch!

### Incremental Delivery

Each user story adds value without breaking previous stories:
- **After US1**: Have working portfolio for recruiters (MVP!)
- **After US2**: Add fitness community content (differentiation!)
- **After US3**: Add detailed project case studies (depth!)
- **After US4**: Ensure mobile experience (reach!)
- **After Polish**: Production-ready portfolio (launch!)

### Parallel Team Strategy

With 3-4 developers after Foundational phase completes:
- **Developer 1**: User Story 1 (Hero, About - T033-T041)
- **Developer 2**: User Story 1 (Projects - T042-T048)
- **Developer 3**: User Story 1 (Contact - T049-T055)
- **Developer 4**: User Story 2 (Blog - T069-T088) can start in parallel

All user stories integrate independently and can be deployed incrementally.

---

## Estimated Task Count by Phase

- **Phase 1 (Setup)**: 18 tasks
- **Phase 2 (Foundational)**: 14 tasks
- **Phase 3 (User Story 1 - MVP)**: 36 tasks (T033-T068)
- **Phase 4 (User Story 2)**: 30 tasks (T069-T098)
- **Phase 5 (User Story 3)**: 17 tasks (T099-T115)
- **Phase 6 (User Story 4)**: 20 tasks (T116-T135)
- **Phase 7 (Polish)**: 68 tasks (T136-T203)

**Total**: 203 tasks

**MVP Scope** (Recommended): Phase 1 + Phase 2 + Phase 3 = **68 tasks** for fully functional recruiter-focused portfolio

**Parallel Opportunities**: ~60% of tasks marked [P] can run in parallel with proper team coordination

---

## Notes

- **[P] marker**: Tasks marked [P] work on different files and have no dependencies, enabling parallel execution
- **[Story] label**: Every user story task has [US1], [US2], [US3], or [US4] label for traceability
- **File paths**: All tasks include specific file paths for immediate implementation
- **Independent testing**: Each user story has clear independent test criteria
- **MVP focus**: User Story 1 (P1) is the recommended MVP - delivers core portfolio functionality
- **Incremental delivery**: Each user story can be deployed independently without breaking previous functionality
- **Constitution compliance**: All tasks align with project constitution (zero-database, performance targets, accessibility standards)
