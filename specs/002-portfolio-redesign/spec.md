# Feature Specification: Portfolio Redesign - Vertical Scroll Reduction

**Feature Branch**: `002-portfolio-redesign`
**Created**: 2025-10-21
**Status**: Draft
**Input**: User description: "Portfolio redesign to reduce vertical scroll by 50-60% while improving UX and maintaining accessibility/performance standards"

## Clarifications

### Session 2025-10-21

- Q: How should the article carousel retrieve article metadata (title, excerpt, date, tags)? → A: Parse MDX frontmatter at build time using @next/mdx with gray-matter
- Q: Which tab should be selected by default for skills section and should state persist in URL? → A: Frontend tab selected by default, state resets on page reload (no URL persistence)
- Q: How should dual timelines be aligned when they have significantly different lengths (e.g., 10 career items vs 3 running items)? → A: Top-align both timelines (oldest events aligned), allow natural height difference at bottom
- Q: How does the article carousel behave with only 1-2 articles (fewer than 3 visible slots on desktop)? → A: Center the available items, hide navigation arrows entirely when ≤3 articles
- Q: Which components should use React Server Components vs Client Components? → A: RSC for Timeline/Skills/Projects layout, Client only for Tabs/Carousel controls (optimal)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Dual Professional Identity (Priority: P1)

As a portfolio visitor, I want to see both IT career and running achievements side-by-side so I can understand the dual professional identity at a glance without excessive scrolling.

**Why this priority**: This is the unique value proposition of the portfolio - showcasing dual expertise. The side-by-side timeline provides immediate visual impact and tells a cohesive story.

**Independent Test**: Can be fully tested by viewing the homepage on desktop (≥1024px) and verifying both timelines appear side-by-side, then resizing to mobile (<1024px) and verifying they stack vertically. Delivers immediate understanding of the person's dual journey.

**Acceptance Scenarios**:

1. **Given** a visitor on desktop (≥1024px), **When** they scroll to the timeline section, **Then** they see IT career milestones on the left with briefcase icons and running achievements on the right with trophy icons in parallel columns
2. **Given** a visitor on mobile (<1024px), **When** they scroll to the timeline section, **Then** they see both timelines stacked vertically with clear visual separation
3. **Given** a visitor using keyboard navigation, **When** they tab through timeline items, **Then** focus moves logically through both timelines with visible focus indicators
4. **Given** a visitor using screen reader, **When** they navigate the timeline section, **Then** they hear clear announcements for each timeline type and individual milestones

---

### User Story 2 - Explore Technical Skills Efficiently (Priority: P1)

As a recruiter or technical visitor, I want to quickly browse categorized technical skills without scrolling through long lists so I can assess expertise in specific areas.

**Why this priority**: Technical skills are critical for professional evaluation. Tabbed interface reduces cognitive load and allows focused exploration of relevant skill categories.

**Independent Test**: Can be fully tested by clicking through Frontend, Backend, DevOps, and Additional tabs and verifying skills display in organized grids within each category. Delivers efficient skill assessment.

**Acceptance Scenarios**:

1. **Given** a visitor on the skills section, **When** they click the "Frontend" tab, **Then** they see a grid of frontend technologies with proficiency levels and years of experience
2. **Given** a visitor switches between tabs, **When** they select different skill categories, **Then** the content transitions smoothly with appropriate loading states
3. **Given** a visitor on mobile, **When** they view the skills section, **Then** tabs display with icons only (full labels on larger screens) and grid adjusts to 2 columns
4. **Given** a visitor using keyboard, **When** they navigate tabs with arrow keys, **Then** focus moves between tabs and Enter/Space activates the selected tab

---

### User Story 3 - Browse Articles Without Vertical Scroll (Priority: P2)

As a blog reader, I want to browse recent articles in a horizontal carousel so I can quickly scan multiple posts without endless vertical scrolling.

**Why this priority**: Horizontal carousels are modern UX patterns that significantly reduce vertical space while maintaining content discoverability.

**Independent Test**: Can be fully tested by viewing the articles section and using navigation arrows or touch swipe to browse cards horizontally. Delivers Netflix-style content browsing experience.

**Acceptance Scenarios**:

1. **Given** a visitor on desktop, **When** they view the articles section, **Then** they see 3 article cards visible at once with navigation arrows
2. **Given** a visitor clicks the right arrow, **When** the carousel scrolls, **Then** it smoothly transitions to show the next set of articles
3. **Given** a visitor on mobile, **When** they swipe left/right, **Then** the carousel responds to touch gestures with smooth scrolling
4. **Given** a visitor using keyboard, **When** they tab through articles, **Then** focus moves through visible cards and arrows, with off-screen content accessible via arrow navigation

---

### User Story 4 - Discover Featured Projects Quickly (Priority: P2)

As a portfolio visitor, I want to see featured projects in a compact bento grid layout so I can understand key work samples without scrolling excessively.

**Why this priority**: Bento grids provide visual hierarchy and modern aesthetic while maximizing information density.

**Independent Test**: Can be fully tested by viewing the projects section and verifying featured project spans larger area while others display compactly. Delivers at-a-glance project overview.

**Acceptance Scenarios**:

1. **Given** a visitor on desktop, **When** they scroll to projects section, **Then** they see the featured project spanning 2 columns/rows with others in smaller cards
2. **Given** a visitor hovers over project cards, **When** cursor moves over images, **Then** images scale up slightly with smooth transition
3. **Given** a visitor on mobile, **When** they view projects, **Then** all cards display in single column with featured project showing larger image
4. **Given** a visitor wants to see all projects, **When** they click "View All Projects" CTA, **Then** they navigate to the dedicated projects page

---

### User Story 5 - Access Categorized Videos (Priority: P3)

As a content consumer, I want to browse technical and fitness videos separately so I can focus on my area of interest without mixing content types.

**Why this priority**: Tabbed video organization improves content findability and reduces visual clutter.

**Independent Test**: Can be fully tested by switching between Technical and Fitness tabs and verifying video grids display correctly with counts. Delivers organized video browsing.

**Acceptance Scenarios**:

1. **Given** a visitor on the videos section, **When** they view the default tab, **Then** they see "Technical" tab selected with video count badge (e.g., "Technical (12)")
2. **Given** a visitor clicks the "Fitness" tab, **When** the tab activates, **Then** they see a grid of fitness-related videos with thumbnails, duration, and view counts
3. **Given** a visitor on desktop, **When** they view video grids, **Then** they see 3 columns of videos with consistent aspect ratios
4. **Given** a visitor clicks a video thumbnail, **When** the video is selected, **Then** it opens in a modal or navigates to detailed video page

---

### User Story 6 - Find Engineering Philosophy (Priority: P3)

As an interested visitor, I want to learn about engineering philosophy without cluttering the homepage so I can dive deeper when desired.

**Why this priority**: Removes homepage bloat while preserving content accessibility for interested visitors.

**Independent Test**: Can be fully tested by verifying engineering philosophy is removed from homepage and accessible via dedicated /about page or callout card CTA. Delivers focused homepage narrative.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they scroll through sections, **Then** they do NOT see a large engineering philosophy section
2. **Given** a visitor sees the optional callout card, **When** they click "Learn More", **Then** they navigate to /about page with comprehensive philosophy content
3. **Given** a visitor navigates directly to /about, **When** the page loads, **Then** they see detailed engineering philosophy, values, and approach
4. **Given** a visitor on mobile, **When** they view the callout card (if present), **Then** it displays compactly with clear CTA button

---

### Edge Cases

- What happens when timeline data is missing for certain years (gaps in career or running history)?
- **RESOLVED**: Timelines with significantly different lengths (e.g., 10 career items vs 3 running items) are top-aligned with natural height difference at bottom
- What happens when skill categories have vastly different numbers of items (e.g., 20 frontend skills vs 5 DevOps)?
- **RESOLVED**: Article carousel with only 1-2 articles (fewer than visible slots) centers available items and hides navigation arrows entirely
- What happens when video thumbnails fail to load or API is unavailable?
- How does the bento grid adapt when there are only 2-3 projects total?
- What happens when a visitor disables JavaScript (progressive enhancement)?
- How does the system handle very long project/article titles that overflow cards?
- What happens when images fail to load (broken image states)?
- How does layout adapt to extremely wide monitors (>2560px) or very narrow (320px)?

## Requirements *(mandatory)*

### Functional Requirements

#### Phase 1 - Critical Redesign

**Dual Timeline Component**

- **FR-001**: System MUST display two parallel timeline columns on screens ≥1024px width
- **FR-002**: System MUST show IT career timeline on the left with briefcase icon indicators
- **FR-003**: System MUST show running achievements timeline on the right with trophy icon indicators
- **FR-004**: System MUST stack timelines vertically on screens <1024px with clear section headers
- **FR-005**: System MUST render timeline items with date, title, description, and contextual icon
- **FR-006**: System MUST support keyboard navigation through all timeline items with visible focus states
- **FR-007**: System MUST provide ARIA labels distinguishing career vs running timelines
- **FR-008**: System MUST display visual connecting line between timeline dots
- **FR-009**: System MUST handle empty or incomplete timeline data gracefully with placeholder states
- **FR-009a**: System MUST top-align both timelines when rendered side-by-side (oldest events at top)
- **FR-009b**: System MUST allow natural height difference at bottom when timelines have unequal lengths
- **FR-009c**: System MUST be implemented as React Server Component (static layout, no client-side state)

**Technical Skills Section**

- **FR-010**: System MUST display four tabs: Frontend, Backend, DevOps, Additional
- **FR-010a**: System MUST select Frontend tab by default on initial page load
- **FR-010b**: System MUST NOT persist tab state in URL (state resets on page reload)
- **FR-011**: System MUST show active tab state with visual indicator
- **FR-012**: System MUST display skills in responsive grid (2 columns mobile, 3 tablet, 4 desktop)
- **FR-013**: System MUST show skill name, proficiency level badge, and years of experience for each skill
- **FR-014**: System MUST support keyboard navigation with Tab key and Arrow keys for tab selection
- **FR-015**: System MUST preserve tab state during page interactions (no reset to default)
- **FR-016**: System MUST provide smooth transitions when switching tabs
- **FR-017**: System MUST display tab counts on mobile with icon-only labels
- **FR-018**: System MUST support alternative bento grid layout option
- **FR-018a**: System MUST implement tabs component using 'use client' directive for interactivity
- **FR-018b**: System MUST implement skill grid layout as React Server Component (static content)

**Engineering Philosophy Removal**

- **FR-019**: System MUST remove engineering philosophy section from homepage
- **FR-020**: System MUST create dedicated /about page with comprehensive philosophy content
- **FR-021**: System MUST optionally display small callout card on homepage with CTA to /about
- **FR-022**: System MUST preserve SEO metadata when moving content to /about page
- **FR-023**: System MUST maintain accessibility when implementing callout card CTA

#### Phase 2 - Content Optimization

**Latest Articles Carousel**

- **FR-024**: System MUST display article cards in horizontal scrollable container
- **FR-024a**: System MUST parse MDX frontmatter from content/blog/*.mdx files using @next/mdx with gray-matter at build time
- **FR-024b**: System MUST extract title, excerpt, date, tags, and optional image from frontmatter
- **FR-025**: System MUST show 3 cards visible simultaneously on desktop (≥1024px)
- **FR-025a**: System MUST center available items and hide navigation arrows entirely when ≤3 articles exist
- **FR-026**: System MUST provide left/right navigation arrow buttons
- **FR-027**: System MUST support touch swipe gestures on mobile and tablet
- **FR-028**: System MUST scroll smoothly by 400px increments when arrows clicked
- **FR-029**: System MUST disable left arrow when at start, right arrow when at end
- **FR-030**: System MUST support keyboard navigation through visible cards
- **FR-031**: System MUST display article title, excerpt (truncated), date, and tags
- **FR-032**: System MUST hide scrollbar visually while maintaining scroll functionality
- **FR-033**: System MUST snap cards to visible position on mobile
- **FR-033a**: System MUST implement carousel controls using 'use client' directive for interactivity
- **FR-033b**: System MUST render article card layout as React Server Component (static content)

**Featured Products Bento Grid**

- **FR-034**: System MUST display projects in responsive grid (1 column mobile, 2 tablet, 3 desktop)
- **FR-035**: System MUST feature first project with larger card spanning 2 columns on desktop
- **FR-036**: System MUST display project image with hover scale effect
- **FR-037**: System MUST show project title, description (truncated), and tech stack tags
- **FR-038**: System MUST limit to 6 projects maximum with "View All Projects" CTA
- **FR-039**: System MUST load images lazily with blur placeholder
- **FR-040**: System MUST handle missing project images with fallback background
- **FR-041**: System MUST provide adequate touch target sizes (≥44x44px) on mobile
- **FR-041a**: System MUST implement project grid layout as React Server Component (static content)

**Videos Section**

- **FR-042**: System MUST display two tabs: Technical and Fitness with video counts
- **FR-042a**: System MUST select Technical tab by default on initial page load
- **FR-042b**: System MUST NOT persist tab state in URL (state resets on page reload)
- **FR-043**: System MUST show videos in 3-column grid on desktop, 2 columns tablet, 1 mobile
- **FR-044**: System MUST display video thumbnail with aspect ratio 16:9
- **FR-045**: System MUST overlay duration badge on bottom-right of thumbnails
- **FR-046**: System MUST show video title (truncated to 2 lines) and view count
- **FR-047**: System MUST apply hover effect on video cards (title color change)
- **FR-048**: System MUST limit to 6 videos per tab with option to show more
- **FR-049**: System MUST handle thumbnail load failures with placeholder background
- **FR-049a**: System MUST implement tabs component using 'use client' directive for interactivity
- **FR-049b**: System MUST implement video grid layout as React Server Component (static content)

#### Cross-Cutting Requirements

- **FR-050**: System MUST maintain WCAG AA color contrast (≥4.5:1) for all text
- **FR-051**: System MUST support dark mode with appropriate color adjustments
- **FR-052**: System MUST respect prefers-reduced-motion for users who disable animations
- **FR-053**: System MUST load images with Next.js Image component optimization
- **FR-054**: System MUST implement code splitting for heavy interactive components
- **FR-055**: System MUST use semantic HTML5 elements (article, section, nav, etc.)
- **FR-056**: System MUST provide skip links for keyboard users
- **FR-057**: System MUST work without JavaScript where possible (progressive enhancement)
- **FR-058**: System MUST maintain consistent spacing scale (64px sections, 32px components)
- **FR-059**: System MUST use Tailwind CSS v4 utility classes exclusively
- **FR-060**: System MUST follow shadcn/ui component patterns

### Key Entities

**Timeline Item**
- Represents a single milestone in career or running journey
- Attributes: date (YYYY-MM-DD), title (string), description (string), category (career | running), icon (ReactNode)
- Relationships: Belongs to Timeline collection

**Skill**
- Represents a technical proficiency
- Attributes: name (string), level (Expert | Advanced | Intermediate), years (string), category (frontend | backend | devops | additional)
- Relationships: Grouped by category in Skills section

**Article**
- Represents a blog post preview
- Attributes: slug (string), title (string), excerpt (string), date (YYYY-MM-DD), tags (string[]), image (optional)
- Data Source: Parsed from MDX frontmatter in content/blog/*.mdx files at build time using @next/mdx with gray-matter
- Relationships: Links to full article at /blog/[slug]

**Project**
- Represents a portfolio work sample
- Attributes: id (string), title (string), description (string), image (string), tech (string[]), featured (boolean), link (optional)
- Relationships: Links to detailed project page at /projects/[slug]

**Video**
- Represents a video content item
- Attributes: id (string), title (string), thumbnail (string), duration (string HH:MM:SS), views (number), category (technical | fitness), url (string)
- Relationships: Grouped by category in Videos section

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Vertical Scroll Reduction**
- **SC-001**: Homepage vertical scroll distance reduces by 50-60% (from ~6000-7000px to ~3000-3500px)
- **SC-002**: Dual timeline section consumes 800-1000px less vertical space compared to stacked layout
- **SC-003**: Technical skills section consumes 600-800px less vertical space with tabbed interface
- **SC-004**: Articles section consumes 500-600px less vertical space with horizontal carousel
- **SC-005**: Projects section consumes 300-400px less vertical space with bento grid

**Performance**
- **SC-006**: Lighthouse Performance score remains ≥95 after redesign
- **SC-007**: Largest Contentful Paint (LCP) stays under 1.0 seconds
- **SC-008**: Cumulative Layout Shift (CLS) remains under 0.1
- **SC-009**: First Input Delay (FID) stays under 100ms
- **SC-010**: Page weight increases by no more than 10% despite new interactive components

**Accessibility**
- **SC-011**: WCAG AA compliance maintained across all new components
- **SC-012**: 100% keyboard navigability for all interactive elements
- **SC-013**: Screen reader compatibility verified with NVDA and VoiceOver
- **SC-014**: Color contrast ratios ≥4.5:1 for all text in light and dark modes
- **SC-015**: Touch targets meet 44x44px minimum size on mobile devices

**User Experience**
- **SC-016**: Visitors can view complete dual timeline without scrolling on desktop ≥1440px width
- **SC-017**: Visitors can browse 3 article cards simultaneously on desktop without horizontal overflow
- **SC-018**: Tab switching in skills/videos sections completes in <200ms perceived time
- **SC-019**: Carousel scroll animations complete in 300-400ms
- **SC-020**: Hover effects trigger within 50ms of mouse entry

**Responsive Design**
- **SC-021**: All components adapt gracefully across 5 breakpoints (320px, 640px, 768px, 1024px, 1280px)
- **SC-022**: No horizontal scrolling on any viewport width 320px and above
- **SC-023**: Touch gestures work correctly on mobile and tablet devices
- **SC-024**: Layout maintains visual hierarchy and readability on all screen sizes

**Content Integrity**
- **SC-025**: All existing content remains accessible after redesign
- **SC-026**: Engineering philosophy content viewable on dedicated /about page
- **SC-027**: Article, project, and video data displays consistently across layouts
- **SC-028**: Timeline data preserves chronological order in both parallel and stacked layouts

## Assumptions *(mandatory)*

1. **Technology Stack**: Portfolio uses Next.js 15 with App Router, React 19, Tailwind CSS v4, and TypeScript
2. **Component Library**: shadcn/ui components are available and configured (New York style)
3. **Font System**: Geist Sans and Geist Mono fonts already loaded via next/font
4. **Content Source**: Timeline, skills, articles, projects, and videos data exists in static files or can be easily created
5. **Image Assets**: All project, article, and video thumbnails exist in public/images/ directory
6. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) last 2 versions
7. **Mobile First**: Design prioritizes mobile experience, progressively enhances for desktop
8. **Dark Mode**: Existing dark mode implementation works via .dark class selector
9. **Analytics**: PostHog analytics already integrated and will track new component interactions
10. **Build Tool**: Turbopack used for development and production builds
11. **Code Quality**: Biome configured for linting/formatting (not ESLint/Prettier)
12. **Accessibility Tools**: WAVE and axe DevTools available for accessibility testing
13. **Icon Library**: lucide-react icons available for UI elements
14. **State Management**: Client-side state handled with React hooks ('use client' directive)
15. **Progressive Enhancement**: Components work with basic HTML/CSS when JavaScript unavailable
16. **Image Optimization**: Next.js Image component used for all images with automatic optimization
17. **Responsive Breakpoints**: Tailwind default breakpoints (sm:640px, md:768px, lg:1024px, xl:1280px)
18. **Content Length**: Reasonable limits on text length (titles, descriptions) to prevent overflow
19. **Data Validation**: Content follows expected schema (dates in YYYY-MM-DD, required fields present)
20. **Performance Budget**: Existing page meets Lighthouse ≥95 baseline before redesign

## Dependencies *(optional)*

### Internal Dependencies
- Existing shadcn/ui components: `Tabs`, `Card`, `Badge`, `Button`, `Separator`, `Skeleton`
- Utility function: `cn()` from `@/lib/utils` for className merging
- Global styles: CSS variables in `app/globals.css` for theme tokens
- Image assets: Project/article/video thumbnails in `public/images/`
- Content data: Timeline/skills/articles/projects/videos in `lib/` or `content/` directories

### External Dependencies
- Next.js 15.5.6 Image component for optimization
- React 19 for client components
- @next/mdx for MDX file processing
- gray-matter for parsing MDX frontmatter at build time
- lucide-react for icons (Briefcase, Trophy, Code, Server, Cloud, Activity, ChevronLeft, ChevronRight)
- Tailwind CSS v4 for styling
- TypeScript for type safety

### Optional Dependencies (Future Enhancements)
- Framer Motion for advanced animations (if performance allows)
- Embla Carousel for more robust carousel functionality
- React Intersection Observer for lazy loading triggers

## Out of Scope *(optional)*

1. **Content Management System (CMS)**: All content remains in static files/code
2. **Backend API**: No server-side data fetching or database integration
3. **User Authentication**: No login or personalization features
4. **Search Functionality**: No search bar for articles/projects (future enhancement)
5. **Filtering/Sorting**: No ability to filter projects by tech or articles by tags
6. **Video Playback**: Videos link externally (YouTube), no inline player
7. **Analytics Dashboard**: No admin interface for viewing metrics
8. **A/B Testing**: No variant testing of layouts
9. **Internationalization**: English-only content
10. **Real-time Updates**: All content static, no live data streams
11. **Social Sharing**: No share buttons or Open Graph enhancements
12. **Comments System**: No blog comments or feedback forms
13. **Newsletter Signup**: No email capture functionality
14. **Related Content**: No "related articles" or "similar projects" suggestions
15. **Detailed Project Pages**: Existing /projects/[slug] routes remain as-is
16. **Blog Migration**: Existing blog posts in `content/blog/` remain unchanged
17. **Contact Form Changes**: Existing contact form unchanged
18. **Navigation Updates**: Header/footer navigation structure remains the same
19. **SEO Optimization**: No schema.org structured data additions (beyond current)
20. **Accessibility Audit**: Assumes existing components meet WCAG AA already

## Risks & Mitigations *(optional)*

### Risk 1: Layout Shift During Component Loading
**Severity**: Medium
**Impact**: Poor CLS score, janky user experience
**Mitigation**:
- Use skeleton loaders for all async content
- Reserve space with min-height on containers
- Implement blur placeholder for images
- Test with slow 3G throttling

### Risk 2: Carousel Performance on Low-End Devices
**Severity**: Medium
**Impact**: Laggy scrolling, poor mobile experience
**Mitigation**:
- Use CSS scroll-snap for hardware-accelerated scrolling
- Avoid JavaScript-based scroll libraries initially
- Test on older iPhone/Android devices
- Implement reduced-motion variant

### Risk 3: Content Overflow in Compact Layouts
**Severity**: Low
**Impact**: Truncated text, broken layouts
**Mitigation**:
- Use line-clamp utilities for text truncation
- Test with maximum expected content lengths
- Implement ellipsis with tooltips for full text
- Add max-width constraints on cards

### Risk 4: Tab State Loss on Page Navigation
**Severity**: Low
**Impact**: User frustration returning to default tab
**Mitigation**:
- Use URL query params to persist tab state (optional)
- Implement sessionStorage for tab memory
- Document behavior in user testing

### Risk 5: Accessibility Regression in Custom Interactions
**Severity**: High
**Impact**: WCAG compliance failure, unusable for keyboard/screen reader users
**Mitigation**:
- Follow ARIA Authoring Practices Guide for carousels/tabs
- Test every component with keyboard only
- Validate with screen readers (NVDA, VoiceOver)
- Include accessibility in PR review checklist

### Risk 6: Image Loading Performance
**Severity**: Medium
**Impact**: Slow LCP, poor perceived performance
**Mitigation**:
- Use Next.js Image with priority flag for above-fold images
- Implement lazy loading for below-fold content
- Optimize image sizes (WebP format, responsive srcsets)
- Use blur placeholders during load

### Risk 7: Responsive Breakpoint Edge Cases
**Severity**: Low
**Impact**: Awkward layouts at specific widths
**Mitigation**:
- Test thoroughly at all 5 breakpoints (320, 640, 768, 1024, 1280)
- Use responsive design mode in DevTools
- Test on real devices (iPhone SE, iPad, various Androids)
- Document any known quirks in component comments

## Timeline *(optional)*

### Phase 1 - Critical Redesign (Week 1-2)
**Sprint 1 (Days 1-7)**
- Day 1-2: Dual Timeline Component
  - Create TimelineItem component
  - Implement parallel layout for desktop
  - Add responsive stacking for mobile
  - Accessibility testing

- Day 3-4: Technical Skills Section
  - Create tabbed interface with shadcn/ui Tabs
  - Build SkillCard component
  - Implement grid layouts
  - Test tab navigation

- Day 5-7: Engineering Philosophy Removal
  - Create /about page
  - Migrate content from homepage
  - Optional: Build callout card
  - Update navigation links

**Testing Checkpoint**: Verify 2000px vertical reduction, Lighthouse score ≥95

### Phase 2 - Content Optimization (Week 2-3)
**Sprint 2 (Days 8-14)**
- Day 8-9: Latest Articles Carousel
  - Create ArticlesCarousel component
  - Implement horizontal scroll
  - Add navigation arrows
  - Touch gesture support

- Day 10-11: Featured Products Bento Grid
  - Create ProductCard component
  - Implement bento grid layout
  - Add hover effects
  - Lazy loading

- Day 12-14: Videos Section
  - Create tabbed video layout
  - Build VideoCard component
  - Implement grid responsiveness
  - Test video thumbnail loading

**Testing Checkpoint**: Verify total 3000-3800px vertical reduction

### Phase 3 - Polish & Testing (Week 3-4)
**Sprint 3 (Days 15-21)**
- Day 15-16: Mobile Responsiveness
  - Test all breakpoints
  - Fix layout issues
  - Touch interaction testing

- Day 17-18: Performance Optimization
  - Lighthouse audit
  - Image optimization
  - Code splitting
  - Bundle size analysis

- Day 19-20: Accessibility Testing
  - WAVE tool scan
  - Keyboard navigation test
  - Screen reader testing
  - Color contrast verification

- Day 21: Cross-Browser Testing & Launch
  - Test Chrome, Firefox, Safari, Edge
  - Fix browser-specific issues
  - Final QA checklist
  - Deploy to production

**Total Duration**: 21 days (3 weeks)

## Notes *(optional)*

### Design Decisions

1. **Why Tabs Over Accordions**: Tabs provide cleaner visual hierarchy and better discoverability than accordions for skill categories. Industry-standard pattern (GitHub, LinkedIn profiles).

2. **Why Horizontal Carousel Over Grid**: Horizontal scrolling is proven pattern (Netflix, App Store) that significantly reduces vertical space while maintaining content density.

3. **Why Bento Grid Over List**: Bento grids create visual interest and hierarchy, drawing attention to featured projects while keeping layout compact.

4. **Why Remove Philosophy from Homepage**: 400-500px savings with minimal user impact - philosophy is "nice to know" not "must see" for homepage visitors.

### Technical Considerations

1. **React Server Components**: Timeline, Skills sections can be RSC since content is static. Carousel, Tabs require 'use client' for interactivity.

2. **Code Splitting**: Lazy load carousel with `React.lazy()` or `next/dynamic` since it's below fold.

3. **CSS-First Animations**: Use Tailwind transitions and CSS scroll-snap instead of JavaScript for better performance.

4. **Image Strategy**: Use Next.js Image with blur placeholders. Generate multiple sizes (320w, 640w, 1024w) for responsive loading.

### Implementation Priorities

**Must Have (MVP)**:
- Dual timeline side-by-side on desktop
- Skills tabbed interface with grid
- Article carousel with arrow navigation
- Basic responsive behavior

**Should Have**:
- Touch swipe gestures for carousel
- Hover effects on cards
- Skeleton loading states
- Dark mode support

**Could Have**:
- Animation polish (framer-motion)
- Parallax effects on timeline
- Advanced carousel features (infinite scroll)
- Video modal playback

**Won't Have (This Version)**:
- Timeline filtering/search
- Skill proficiency animations
- Article recommendations
- Project filtering

### Content Requirements

**Timeline Data Structure**:
```typescript
interface TimelineMilestone {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  category: 'career' | 'running';
  icon: ReactNode;
}
```

**Skills Data Structure**:
```typescript
interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  years: string; // e.g., "5+", "3-4"
  category: 'frontend' | 'backend' | 'devops' | 'additional';
}
```

**Article Data Structure**:
```typescript
interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  image?: string;
}
```

**Project Data Structure**:
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  featured: boolean;
  link?: string;
}
```

**Video Data Structure**:
```typescript
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string; // HH:MM:SS
  views: number;
  category: 'technical' | 'fitness';
  url: string;
}
```

### Testing Strategy

**Unit Tests**: Not required for presentational components
**Integration Tests**: Not required for static content
**Manual Testing**: Critical for responsive design and accessibility
**Tools**: Chrome DevTools, Lighthouse, WAVE, axe DevTools, real devices

### Success Metrics Tracking

- Before/After screenshots with scroll distance overlay
- Lighthouse reports (before vs after)
- Mobile usability scores
- Real User Monitoring (PostHog) for scroll depth
- Heatmaps to verify content engagement

### Future Enhancements (Post-Launch)

1. **Phase 4**: Add search/filter for articles and projects
2. **Phase 5**: Implement related content suggestions
3. **Phase 6**: Add animation polish with Framer Motion
4. **Phase 7**: Consider CMS integration for easier updates
5. **Phase 8**: A/B test variations (carousel vs grid for articles)
