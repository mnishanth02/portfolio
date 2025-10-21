# Feature Specification: Personal Portfolio Website

**Feature Branch**: `001-portfolio-site-v1`
**Created**: 2025-10-21
**Status**: Draft
**Input**: User description: "Create a detailed specification for building a personal portfolio website for a fullstack engineer who is also a passionate marathon runner"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Technical Recruiter Quick Evaluation (Priority: P1)

Sarah, a technical recruiter, needs to quickly evaluate a candidate's engineering skills and experience within 30-60 seconds while reviewing multiple portfolios daily. She needs immediate access to technical capabilities, project quality indicators, and contact information without navigating through complex menus.

**Why this priority**: This is the highest ROI user journey. Technical recruiters are the primary gateway to employment opportunities. If they cannot quickly assess qualifications, the portfolio fails its core purpose. This represents 60-70% of target audience value.

**Independent Test**: Navigate to the portfolio URL, and within 60 seconds a recruiter can identify: (1) primary technical skills, (2) quality of work through 2-3 project examples, (3) GitHub activity verification, and (4) method to initiate contact or download resume. Success = all four objectives achieved without scrolling more than 3 screen heights.

**Acceptance Scenarios**:

1. **Given** Sarah lands on the portfolio homepage, **When** she views the hero and about sections, **Then** she sees the engineer's name, primary technical role, key technologies, and professional summary within the first 2 screens
2. **Given** Sarah wants to evaluate project quality, **When** she scrolls to the projects section, **Then** she sees 6-8 project cards with thumbnails, tech stack badges, and clear links to live demos and GitHub repositories
3. **Given** Sarah needs to initiate contact, **When** she looks for contact options, **Then** she finds clearly visible email, GitHub, LinkedIn links and/or a contact form within 3 clicks from any section
4. **Given** Sarah wants to download a resume, **When** she searches for a resume option, **Then** she finds a downloadable PDF link in the about or contact section
5. **Given** Sarah is on a mobile device during commute, **When** she accesses the portfolio, **Then** all information displays properly on her phone screen without horizontal scrolling

---

### User Story 2 - Fitness Community Connection (Priority: P2)

Mike, a fellow marathon runner, discovers the portfolio through Instagram or Strava and wants to explore authentic training content, race experiences, and connect with someone who shares his passion for running. He's looking for relatable stories and practical training insights, not generic fitness advice.

**Why this priority**: This journey differentiates this portfolio from typical developer portfolios and builds community connections. While not directly related to employment, it establishes thought leadership and authentic personal brand. Represents 20-25% of visitor value and creates memorable differentiation.

**Independent Test**: Starting from a social media referral link, Mike can find and consume 2-3 pieces of fitness-related content (blog posts, videos, or race results) within 3 minutes, understand the owner's running journey, and identify at least one social platform to follow for ongoing updates. Success = Mike follows at least one social channel and bookmarks the site.

**Acceptance Scenarios**:

1. **Given** Mike arrives from an Instagram link, **When** he reads the about section, **Then** he finds a personal narrative connecting running achievements with the engineer's background, including notable race results and training philosophy
2. **Given** Mike wants to explore running content, **When** he scrolls to the content hub, **Then** he sees 3-4 recent blog posts or videos tagged with fitness/running topics with engaging thumbnails and titles
3. **Given** Mike is interested in a specific training topic, **When** he clicks on a blog post about marathon training, **Then** he can read the full post with personal anecdotes, actionable tips, and embedded race photos or training data
4. **Given** Mike wants to follow for more content, **When** he looks for social media links, **Then** he finds clearly displayed links to Strava, Instagram, YouTube, and/or Twitter in both hero and footer sections
5. **Given** Mike wants to watch video content, **When** he navigates to the video section, **Then** he sees 3-4 embedded YouTube videos about running or training that load quickly and play without buffering issues

---

### User Story 3 - Collaborator Deep Technical Assessment (Priority: P2)

Alex, a potential project collaborator or startup founder, was referred by a mutual connection and needs to deeply evaluate technical expertise, communication style, and project approach before proposing a partnership. He needs detailed project case studies, technical writing samples, and evidence of problem-solving capabilities.

**Why this priority**: This journey leads to high-value opportunities (freelance contracts, co-founder partnerships, advisory roles). While less frequent than recruiter visits, these visitors have higher intent and potential value. Represents 10-15% of visitor value but with outsized impact potential.

**Independent Test**: Given 10-15 minutes of exploration time, Alex can review 3-4 detailed project case studies, read 2-3 technical blog posts to assess expertise depth, verify GitHub activity, and submit a project proposal via contact form. Success = Alex gains confidence to initiate a serious business conversation.

**Acceptance Scenarios**:

1. **Given** Alex wants to understand technical depth, **When** he explores the about section, **Then** he finds a comprehensive skill overview including years of experience, technology expertise, and professional philosophy
2. **Given** Alex needs project details, **When** he clicks on a project card, **Then** he accesses a detailed view showing: problem statement, technical approach, architecture decisions, challenges overcome, and measurable outcomes
3. **Given** Alex wants to assess communication skills, **When** he browses blog posts, **Then** he finds well-structured technical articles demonstrating clear explanation of complex concepts, code examples, and lessons learned
4. **Given** Alex wants to verify active development, **When** he clicks the GitHub link, **Then** he's directed to an active GitHub profile showing recent contributions and quality repositories
5. **Given** Alex is ready to reach out, **When** he navigates to the contact section, **Then** he finds a functional contact form with fields for name, email, and detailed message submission
6. **Given** Alex submits a contact form, **When** the form is submitted successfully, **Then** he receives immediate confirmation feedback and can trust the message was delivered

---

### User Story 4 - Mobile Visitor Quick Browse (Priority: P3)

Emma, a conference attendee, received a business card with the portfolio URL and wants to quickly browse the site on her phone while commuting home. She needs the site to load fast on mobile data and display all content readably without zooming or horizontal scrolling.

**Why this priority**: Mobile traffic represents 40-50% of web visitors. While mobile users have lower conversion rates for deep engagement, failing mobile experience loses half the audience. This is table-stakes functionality rather than differentiating value.

**Independent Test**: On a mobile device (iPhone or Android) with 3G connection, Emma can load the portfolio homepage in under 3 seconds, navigate through all sections with touch gestures, read text without zooming, and access all interactive elements with thumb-reachable tap targets. Success = completion of any P1/P2 journey on mobile device.

**Acceptance Scenarios**:

1. **Given** Emma is on a 3G mobile connection, **When** she navigates to the portfolio URL, **Then** the page loads and displays meaningful content (hero section) within 1.5 seconds
2. **Given** Emma is using a mobile device, **When** she views any section, **Then** text is readable without zooming, images scale appropriately, and no horizontal scrolling is required
3. **Given** Emma wants to navigate, **When** she taps on navigation links or buttons, **Then** tap targets are at least 44x44 pixels and respond immediately without accidental mis-taps
4. **Given** Emma wants to view a project, **When** she taps a project card, **Then** the project details display in a mobile-optimized format (modal or dedicated view) with touch-friendly navigation
5. **Given** Emma wants to watch a video, **When** she taps a YouTube embed, **Then** the video plays in a responsive player without layout shifts or breaking the page layout

---

### Edge Cases

- What happens when a user has JavaScript disabled or fails to load?
  * Core content (hero, about, projects list, contact info) must be visible in static HTML
  * Navigation links must work as standard anchor links
  * Contact form gracefully degrades to mailto: link

- What happens when blog posts contain very long code blocks or large images?
  * Code blocks scroll horizontally on mobile without breaking layout
  * Images are automatically optimized and lazy-loaded
  * Reading time calculation warns if post exceeds 15 minutes

- What happens when external services (YouTube, GitHub, social media) are unavailable?
  * Embedded videos show placeholder with link to YouTube
  * Social media icons remain visible but may show unavailable status
  * Contact form backend failure shows fallback mailto: link

- What happens when a user tries to submit the contact form multiple times rapidly?
  * Form includes rate limiting or disables submit button after first submission
  * Clear feedback indicates "Message sent, we'll respond within 24 hours"

- What happens when blog content is empty or no projects exist yet?
  * Sections gracefully show "Coming soon" state instead of breaking
  * Empty states have clear messaging about content being added

- What happens when a user accesses the site on very large screens (4K+)?
  * Content maintains maximum width (e.g., 1440px) and centers on screen
  * Background extends naturally without pixelation
  * Typography remains readable without becoming comically large

## Requirements *(mandatory)*

### Functional Requirements

**Navigation & Structure**
- **FR-001**: Site MUST be a single-page application with smooth scrolling between sections: Hero, About, Projects, Blog, Contact, Footer
- **FR-002**: Site MUST include a sticky/fixed navigation bar that remains accessible as users scroll through content
- **FR-003**: Navigation links MUST smoothly scroll to corresponding sections with visual indication of active section
- **FR-004**: All external links (GitHub, LinkedIn, social media, live demos) MUST open in new browser tabs

**Hero Section**
- **FR-005**: Hero section MUST display: professional headshot, full name, tagline/role, and two primary call-to-action buttons
- **FR-006**: Hero section MUST include quick-access social media links (GitHub, LinkedIn, Twitter/X, Strava, YouTube)
- **FR-007**: Headshot image MUST be optimized with priority loading to appear immediately on page load

**About Section**
- **FR-008**: About section MUST include: personal narrative (300-500 words), timeline of key milestones, technical skills showcase, running achievements
- **FR-009**: Technical skills MUST be displayed visually with technology badges or icons organized by category (Frontend, Backend, DevOps, etc.)
- **FR-010**: Running stats MUST include: total races completed, personal records, notable achievements with dates
- **FR-011**: About section MUST include a downloadable resume button that triggers PDF download

**Projects Showcase**
- **FR-012**: Projects section MUST display 6-8 featured projects in a responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- **FR-013**: Each project card MUST include: thumbnail image, project title, short description (50-100 words), technology badges, and action buttons
- **FR-014**: Each project card MUST provide links to: live demo URL and GitHub repository URL
- **FR-015**: Project cards MUST have hover effects that reveal additional information or visual feedback
- **FR-016**: Projects MUST support filtering or categorization by technology type (e.g., "Show all React projects")
- **FR-017**: Projects MUST be sortable by: recent first, alphabetical, or project type

**Content Hub (Blog & Videos)**
- **FR-018**: Content section MUST display 3-4 most recent blog post previews with: featured image, title, excerpt (100-150 words), read time, publish date, tags
- **FR-019**: Blog posts MUST be written in MDX format with frontmatter containing: title, date, description, tags, featuredImage, author
- **FR-020**: Each blog post preview MUST link to a dedicated blog post page or expanded view
- **FR-021**: Content section MUST include a "View All Posts" link directing to a full blog listing page with tag filtering and search functionality
- **FR-022**: Content section MUST display 3-4 manually selected featured YouTube videos with responsive embedded players using hardcoded video IDs
- **FR-023**: Videos MUST support lazy loading to prevent blocking initial page load
- **FR-024**: Content MUST support tagging system with at least two categories: Technical and Fitness/Running
- **FR-025**: Blog listing page MUST provide tag-based filtering and client-side full-text search across post titles, descriptions, and content
- **FR-026**: Blog posts MUST support auto-generated table of contents from heading structure for posts exceeding 1000 words

**Contact & Footer**
- **FR-027**: Contact section MUST include: contact form with fields (name, email, message), direct email link, and social media links
- **FR-028**: Contact form MUST validate: name is not empty, email is valid format, message has minimum 20 characters
- **FR-029**: Contact form MUST display clear error messages for validation failures inline with each field
- **FR-030**: Contact form MUST show success confirmation message after successful submission
- **FR-031**: Contact form MUST implement spam protection using honeypot technique
- **FR-032**: Footer MUST display: copyright notice, social media links, "Built with [tech stack]" credits, current location/availability status

**Performance**
- **FR-033**: Site MUST achieve Lighthouse performance score of 95 or higher on both mobile and desktop
- **FR-034**: First Contentful Paint (FCP) MUST occur within 1.5 seconds on standard 3G connection
- **FR-035**: Cumulative Layout Shift (CLS) MUST be below 0.1 to prevent visual content jumping
- **FR-036**: All images MUST be optimized using Next.js Image component with appropriate width, height, and quality settings
- **FR-037**: All images MUST be stored in `/public/images/` directory and version-controlled with the codebase
- **FR-038**: Site MUST use Static Site Generation (SSG) for all routes to ensure instant loading

**Responsive Design**
- **FR-039**: Site MUST be fully responsive across mobile (320px-768px), tablet (768px-1024px), and desktop (1024px+) viewports
- **FR-040**: Touch targets (buttons, links) MUST be minimum 44x44 pixels on mobile devices
- **FR-041**: Text MUST be readable without zooming on mobile devices (minimum 16px font size for body text)
- **FR-042**: Images MUST scale proportionally without breaking layout on any screen size
- **FR-043**: Navigation MUST adapt for mobile (e.g., hamburger menu or horizontal scrollable tabs)

**SEO & Accessibility**
- **FR-044**: Every page/section MUST have unique, descriptive title tags (50-60 characters)
- **FR-045**: Every page/section MUST have meta descriptions (150-160 characters)
- **FR-046**: Site MUST include OpenGraph metadata for social media sharing: og:title, og:description, og:image, og:url
- **FR-047**: Site MUST include Twitter Card metadata: twitter:card, twitter:title, twitter:description, twitter:image
- **FR-048**: Site MUST generate a sitemap.xml file listing all pages for search engine crawling
- **FR-049**: Site MUST include a robots.txt file with appropriate crawling directives
- **FR-050**: All images MUST have descriptive alt text (empty alt="" only for purely decorative images)
- **FR-051**: Site MUST use semantic HTML5 elements: header, nav, main, article, section, aside, footer
- **FR-052**: Heading hierarchy MUST be logical with single h1 per page and no skipped levels (h1 → h2 → h3)
- **FR-053**: All interactive elements MUST be keyboard navigable with visible focus indicators
- **FR-054**: Color contrast MUST meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- **FR-055**: Structured data (JSON-LD) SHOULD be added for blog posts (Article schema) and project showcases (SoftwareApplication schema)
- **FR-056**: Page load speed MUST achieve 90+ Lighthouse performance score on both mobile and desktop

**Content Management**
- **FR-057**: Blog posts MUST be managed through MDX files stored in a `/content/blog/` directory
- **FR-058**: Project data MUST be managed through MDX or JSON files stored in a `/content/projects/` directory
- **FR-059**: MDX frontmatter MUST be validated using Zod schemas to ensure type safety
- **FR-060**: Code blocks within blog posts MUST have syntax highlighting appropriate to the language
- **FR-061**: Blog posts MUST display estimated reading time calculated from word count

**Dark Mode (Optional)**
- **FR-062**: Site SHOULD support dark mode theme toggle or automatic detection based on system preference
- **FR-063**: Dark mode SHOULD maintain WCAG AA contrast standards with adjusted color palette

### Key Entities

- **Project**: Represents a portfolio project showcase
  - Attributes: title, description, thumbnailImage, techStack (array of technologies), liveUrl, githubUrl, featured (boolean), category, completionDate
  - Relationships: Has multiple tags, belongs to one or more categories

- **Blog Post**: Represents a blog article written in MDX
  - Attributes: title, slug, description, content (MDX), publishDate, lastUpdated, featuredImage, readingTime, tags, category (Technical/Fitness/Lifestyle), author
  - Relationships: Has multiple tags, belongs to one category, may reference projects

- **Social Link**: Represents external social media profile
  - Attributes: platform (GitHub, LinkedIn, Twitter, Strava, YouTube), url, iconName, displayName
  - Relationships: Displayed in hero and footer sections

- **Skill**: Represents technical skill or technology expertise
  - Attributes: name, category (Frontend/Backend/DevOps/Tools), proficiencyLevel, iconUrl
  - Relationships: Grouped by category in about section

- **Achievement**: Represents career milestone or running accomplishment
  - Attributes: title, description, date, type (career/fitness), iconName
  - Relationships: Displayed chronologically in about section timeline

- **Contact Submission**: Represents a contact form submission (ephemeral - not persisted to database)
  - Attributes: senderName, senderEmail, message, timestamp, ipAddress (for rate limiting)
  - Relationships: Sent via email API, no database storage per zero-database constraint

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Performance Metrics**
- **SC-001**: Site loads and displays hero section content within 1.5 seconds on 3G mobile connection (95th percentile)
- **SC-002**: Site achieves Lighthouse performance score of 95 or higher on mobile and desktop devices
- **SC-003**: First Contentful Paint (FCP) occurs within 1.5 seconds for 95% of visitors
- **SC-004**: Largest Contentful Paint (LCP) occurs within 2.5 seconds for 95% of visitors
- **SC-005**: Time to Interactive (TTI) is under 3 seconds for 90% of visitors
- **SC-006**: Cumulative Layout Shift (CLS) score remains below 0.1 for all page views

**User Engagement Metrics**
- **SC-007**: Average session duration exceeds 2 minutes (indicates meaningful engagement)
- **SC-008**: Bounce rate remains below 40% (indicates visitors find relevant content)
- **SC-009**: Average page views per session exceeds 2.5 (indicates exploration of multiple sections)
- **SC-010**: Contact form submission rate or email click rate exceeds 5% of total visitors
- **SC-011**: Social media link click-through rate exceeds 10% of visitors

**Usability Metrics**
- **SC-012**: 90% of technical recruiter visitors (P1) can identify key skills and access 2+ project examples within 60 seconds
- **SC-013**: 85% of fitness community visitors (P2) can find and consume 2+ pieces of running content within 3 minutes
- **SC-014**: 80% of collaborator visitors (P3) can review 3+ detailed projects and submit contact form within 10 minutes
- **SC-015**: Mobile visitors can complete any primary task (view project, read blog post, submit contact form) at the same success rate as desktop visitors

**Accessibility & SEO Metrics**
- **SC-016**: Site achieves 100% accessibility score in Lighthouse audit (WCAG 2.1 AA compliance)
- **SC-017**: All pages are indexed by Google Search Console within 7 days of deployment
- **SC-018**: Site appears in search results for "[Owner Name] portfolio" and "[Owner Name] developer" queries
- **SC-019**: OpenGraph previews display correctly when shared on LinkedIn, Twitter, and Facebook

**Content Quality Metrics**
- **SC-020**: 80% of blog post readers complete reading the full article (measured via scroll depth)
- **SC-021**: Embedded YouTube videos achieve play rate of 30% or higher from visitors who view the video section
- **SC-022**: Project case study views average 2+ minutes of time on page (indicates thorough review)

**Technical Reliability Metrics**
- **SC-023**: Site maintains 99.9% uptime over 30-day measurement period
- **SC-024**: Contact form successfully delivers 100% of valid submissions to owner's email
- **SC-025**: Zero broken internal links or missing images across the site
- **SC-026**: All external links (GitHub, social media, live demos) remain valid and accessible

## Assumptions

**Technical Assumptions**
- The portfolio will be built using Next.js 15 with TypeScript and deployed to Vercel
- Tailwind CSS v4 with custom design tokens will be used for styling
- Shadcn/ui component library provides base UI components
- MDX content is committed to Git repository alongside code (no external CMS)
- Serverless email service (Resend or SendGrid) will handle contact form submissions without database

**Content Assumptions**
- Owner has 6-8 completed projects ready to showcase with thumbnails and descriptions
- Owner has professional headshot and at least 2-3 blog posts ready for initial launch
- Owner has YouTube channel with 3+ videos suitable for embedding
- Owner maintains active GitHub profile with public repositories
- Resume exists as PDF and is updated regularly by owner
- Images are stored in `/public/images/` directory and version-controlled alongside code
- Content previews are validated using local development server (npm run dev) before commits

**Design Assumptions**
- Design follows minimalist aesthetic inspired by provided screenshots: clean typography, generous whitespace, subtle animations
- Dark mode is optional for MVP but architecture supports future implementation
- Mobile-first approach prioritizes mobile experience over desktop
- Design system uses OKLCH color space for better color perceptual uniformity (per Tailwind v4)

**User Behavior Assumptions**
- Primary traffic sources: LinkedIn, GitHub profile, Twitter/X, direct shares, conference networking
- 50-60% of traffic comes from mobile devices
- Technical recruiters spend 30-60 seconds on initial scan
- Fitness community members spend 3-5 minutes exploring content
- Average visitor reads 1.5 blog posts per visit

**Business Assumptions**
- Portfolio serves dual purpose: technical recruiting and fitness community building
- Success is measured by quality opportunities (job offers, collaborations) not just traffic volume
- Owner commits to quarterly content updates (new projects, blog posts)
- Owner responds to contact form submissions within 24-48 hours

## Constraints

**Technical Constraints**
- MUST NOT use runtime database (SQL, NoSQL, or similar) per Constitution Principle I
- MUST use Next.js 15 App Router exclusively (no Pages Router) per Constitution Principle II
- MUST use Tailwind CSS only for styling (no CSS-in-JS libraries) per Constitution Principle IV
- MUST achieve Static Site Generation for all routes (no server-side rendering except for contact form API route)
- MUST use TypeScript strict mode with no `any` types without justification
- Server Components are default; Client Components require explicit justification

**Performance Constraints**
- MUST achieve Lighthouse performance score of 95+ (Constitutional requirement)
- First Contentful Paint MUST be under 1.5 seconds
- Cumulative Layout Shift MUST be under 0.1
- Total JavaScript bundle size SHOULD be under 200KB (gzipped)
- Images MUST be optimized to WebP format with fallbacks

**Accessibility Constraints**
- MUST achieve WCAG 2.1 AA compliance (Constitutional requirement)
- MUST support keyboard navigation for all interactive elements
- MUST provide descriptive alt text for all content images
- MUST maintain 4.5:1 color contrast for normal text, 3:1 for large text
- MUST use semantic HTML throughout

**Privacy & Analytics Constraints**
- MUST NOT use tracking scripts without user consent (Google Analytics prohibited) per Constitution Principle VIII
- MUST use privacy-focused analytics (Plausible or Vercel Analytics only)
- Contact form MUST NOT store submissions in database
- MUST NOT collect personally identifiable information beyond what's explicitly provided by user

**Content Constraints**
- Blog posts and projects MUST be version-controlled in Git per Constitution Principle III
- Content updates require Git commit and deployment (no live editing interface)
- All content MUST be written in MDX with validated frontmatter schemas
- Code examples in blog posts MUST be tested and functional

**Deployment Constraints**
- Target platform MUST be Vercel (optimized for Next.js) per Constitution Principle VI
- MUST support automatic deployment on push to main branch
- MUST generate preview deployments for pull requests
- Environment variables MUST NEVER be committed to repository

## Out of Scope

The following features are explicitly **NOT** included in this specification and should not be implemented:

**Backend Infrastructure**
- Backend database or CMS integration (violates zero-database principle)
- User authentication or login system (no user accounts)
- Admin dashboard for content management (Git-based workflow only)
- Server-side session management or cookies

**E-commerce & Payments**
- E-commerce functionality or product selling
- Payment processing or donation buttons
- Subscription or membership features
- Booking or appointment scheduling

**Advanced Features**
- Multi-language support (English only for MVP)
- Native mobile applications (iOS/Android apps)
- Real-time features (WebSockets, live chat, notifications)
- Comments system on blog posts
- Search functionality across blog posts (may be added in future iteration)
- Newsletter subscription integration (may be added in future iteration)
- RSS feed generation (may be added in future iteration)

**Third-Party Integrations**
- Strava API integration to pull live running data (static data only for MVP)
- GitHub API to fetch live repository stats (static links only)
- Twitter feed embedding or social media aggregation
- Google Calendar integration for availability
- Calendly or scheduling tool integration

**Content Features**
- Blog post series or multi-part content organization
- Related posts recommendation engine
- Content voting or popularity tracking
- Reading progress indicator for blog posts (may be added in future iteration)
- Table of contents generation for long posts (may be added in future iteration)

**Analytics & Marketing**
- A/B testing framework
- Heatmap or session recording tools
- Email marketing integration (Mailchimp, ConvertKit)
- SEO rank tracking or keyword monitoring tools
- Conversion funnel tracking beyond basic analytics

## Dependencies

**External Services**
- **Vercel**: Hosting platform for deployment and preview environments
- **Email Service**: Resend, SendGrid, or similar serverless email API for contact form (decision needed in Q1)
- **Analytics**: Plausible Analytics or Vercel Analytics for privacy-focused tracking (decision needed in Q2)
- **YouTube**: Video hosting and embedding for fitness content
- **DNS Provider**: Domain registration and DNS management (assumed to be configured)

**Development Tools**
- Node.js 18+ and npm for package management
- Git for version control
- Biome for linting and formatting (not ESLint/Prettier per project configuration)
- Next.js 15.5.6 with Turbopack for development and builds
- Client-side search library: Fuse.js or FlexSearch for fuzzy search on blog posts and projects

**Design Assets**
- Professional headshot photo (high resolution, 800x800px minimum)
- Project thumbnail images (16:9 or 4:3 aspect ratio, 1200x675px recommended)
- Blog post featured images (16:9 aspect ratio, 1200x675px recommended)
- Technology/skill icons (SVG format preferred, or sourced from icon library)
- Favicon and OpenGraph share image (1200x630px for OG image)

## Open Questions (Maximum 3)

### Question 1: Contact Form Backend Service - RESOLVED ✅

**Context**: From FR-025 to FR-030, the contact form requires backend processing to send emails.

**Decision**: Use Resend (5,000 free emails/month) with honeypot spam protection

**Rationale**: Modern API, generous free tier perfect for personal portfolio volume, excellent documentation, minimal setup overhead. Honeypot spam protection sufficient for low-volume contact form. Aligns with minimalist, modern technology approach.

**Implementation Notes**:
- Contact form API route: `app/api/contact/route.ts`
- Use Resend SDK with TypeScript support
- Environment variable: `NEXT_PUBLIC_RESEND_API_KEY` (requires signup at resend.com)
- Honeypot field: hidden `website` input field (spambots fill all fields)
- Rate limiting: IP-based with 1 submission per minute per IP
- Success response: 200 with confirmation message
- Error handling: Graceful fallback to mailto: link if Resend fails

---

### Question 2: Analytics Privacy Level - RESOLVED ✅

**Context**: FR-031 mentions performance tracking, and SC-007 to SC-011 require user engagement metrics. Constitution Principle VIII requires privacy-first analytics.

**Decision**: Use PostHog for privacy-focused product analytics

**Rationale**: PostHog provides product analytics with privacy controls, session recordings (optional), feature flags, and A/B testing capabilities. Self-hostable for maximum privacy control (optional). Strong Next.js integration with SDK support. Generous free tier supports portfolio analytics needs. Open-source core allows transparency into data practices.

**Implementation Notes**:
- PostHog Next.js SDK: `@posthog/next` for App Router support
- Initialize in `app/layout.tsx` with PostHog provider wrapper
- Track events: page views, project views, blog reads, contact form clicks, video plays
- Event data: anonymous session IDs (no PII), event name, timestamp, URL
- Configuration: Disable IP geolocation if privacy concern; use anonymized session IDs
- Environment variables: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
- No cookies: Use sessionStorage for session tracking
- Dashboard: Real-time analytics on posthog.com
- GDPR compliance: Privacy-first configuration with data minimization
- Cost: Free tier includes 1M events/month (sufficient for portfolio volume)

---

### Question 3: Project Showcase Detail Level - RESOLVED ✅

**Context**: FR-012 to FR-017 describe project cards, but it's unclear if projects should have dedicated detail pages or expand within the single-page layout.

**Decision**: Hybrid approach - Modal for quick preview, dedicated project pages for comprehensive case studies

**Rationale**: Optimal user experience across all personas. Recruiters (P1) can quickly preview projects in modal without page navigation. Collaborators (P3) can access detailed case study pages for thorough evaluation. SEO benefit from project-specific URLs. Supports deep content while maintaining fast interaction paths for quick browsers.

**Implementation Notes**:
- Project card component: Clickable modal trigger
- Modal view: Thumbnail, title, excerpt, tech stack, quick links (demo, GitHub, "Learn More" button)
- Dedicated page: `/projects/[slug]` route using App Router
- Project pages: Comprehensive case studies including problem statement, approach, architecture, learnings, metrics
- Navigation: Modal "Learn More" button navigates to full project page
- Breadcrumbs: Back navigation on project pages to return to hero/projects section
- URL structure: `/projects/project-slug` (e.g., `/projects/ecommerce-platform-redesign`)
- SSG: All project pages pre-rendered at build time via `generateStaticParams`
- SEO: Each project page has unique meta tags, OpenGraph, Twitter Cards
- Related projects: Link to 2-3 similar projects at bottom of project pages
- Shareable: Project page URLs can be shared on LinkedIn/Twitter with proper OG previews

---

## Clarifications

### Session 2025-10-21

- Q: How will new blog posts and projects be previewed before deploying to production? → A: Local development server with hot reload (`npm run dev` shows content immediately)
- Q: Should YouTube videos be pulled dynamically via YouTube Data API or manually embedded with static video IDs? → A: Manual embedding with hardcoded video IDs in MDX/config file
- Q: Where should images be stored for optimal performance and workflow simplicity? → A: Store in `/public/images/` folder within repository
- Q: What additional blog post features beyond reading time and tags should be supported? → A: Reading time + auto-generated table of contents + author metadata (no series for MVP)
- Q: Should the blog listing support search functionality beyond tag-based filtering? → A: Tag-based filtering + client-side full-text search with pre-built index

## Next Steps

After clarification questions are answered:

1. Run `/speckit.clarify` to validate all [NEEDS CLARIFICATION] markers are resolved
2. Run `/speckit.plan` to create detailed implementation plan with architecture and design
3. Review constitution compliance before proceeding to development
4. Create design mockups if needed based on referenced screenshots
5. Set up development environment and initialize Next.js project structure
