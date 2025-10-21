<!--
Sync Impact Report:
Version Change: Initial Constitution → 1.0.0
Modification Type: Initial Creation
Added Principles:
  - I. Performance & User Experience
  - II. Technical Standards
  - III. Content Management
  - IV. Code Quality & Maintainability
  - V. SEO & Accessibility
  - VI. Deployment & Hosting
  - VII. Content Strategy
  - VIII. Privacy & Analytics
Added Sections:
  - Anti-Patterns & Prohibited Practices
  - Governance
Templates Status:
  ✅ plan-template.md - Aligned with constitution checks
  ✅ spec-template.md - Requirements sections compatible
  ✅ tasks-template.md - Task categorization supports all principles
Follow-up TODOs: None
-->

# Portfolio Website Constitution

## Core Principles

### I. Performance & User Experience

**NON-NEGOTIABLE**: All pages MUST achieve and maintain Lighthouse performance scores of 95+ across all metrics.

**Performance Targets**:
- First Contentful Paint (FCP): MUST be under 1.5 seconds
- Cumulative Layout Shift (CLS): MUST be under 0.1
- Largest Contentful Paint (LCP): MUST be under 2.5 seconds
- Time to Interactive (TTI): MUST be under 3.5 seconds
- Total Blocking Time (TBT): MUST be under 200ms

**Responsive Design Requirements**:
- Mobile-first design is MANDATORY for all components
- All layouts MUST be tested on viewport widths: 320px, 768px, 1024px, 1440px
- Touch targets MUST be minimum 44×44px on mobile devices
- No horizontal scrolling permitted on mobile viewports

**Zero Database Constraint**: This portfolio MUST NOT depend on any runtime database (SQL, NoSQL, or similar). All content MUST be statically generated at build time to ensure simplified deployment and maximum performance.

**Rationale**: Technical recruiters and users expect instant-loading portfolios. Poor performance signals lack of technical competence. The zero-database constraint ensures deployment simplicity, predictable costs, and eliminates runtime dependencies.

---

### II. Technical Standards

**NON-NEGOTIABLE**: TypeScript strict mode MUST be enabled; no `any` types permitted without explicit justification.

**Framework Requirements**:
- Next.js 15 App Router is the ONLY routing mechanism permitted
- Server Components are the default; Client Components (`"use client"`) MUST be justified
- Static Site Generation (SSG) via `generateStaticParams` is the default rendering strategy
- Dynamic rendering (`force-dynamic`) requires explicit approval with performance justification

**Component Architecture**:
- Follow Shadcn/ui conventions: extend via composition, NEVER modify core component files
- Components live in `@/components/ui` (shadcn) and `@/components/*` (custom)
- All UI components MUST accept `className` prop and merge via `cn()` utility

**TypeScript Conventions**:
- Use `import type` for type-only imports
- Export default for page/layout components
- Interface definitions MUST use PascalCase with descriptive names
- Props interfaces MUST be colocated with components (not in separate types files)

**Rationale**: Next.js 15 App Router provides optimal SSG support for portfolios. TypeScript strict mode prevents runtime errors. Server Components minimize JavaScript bundle size, critical for performance targets.

---

### III. Content Management

**NON-NEGOTIABLE**: All blog posts and project content MUST be managed through MDX files with frontmatter validation.

**Content Organization**:
- MDX files MUST be organized using content collections (e.g., `/content/blog/`, `/content/projects/`)
- Frontmatter schema MUST be validated using Zod or similar type-safe validator
- Required frontmatter fields for blog posts: `title`, `date`, `description`, `tags`
- Required frontmatter fields for projects: `title`, `description`, `techStack`, `liveUrl`, `githubUrl`

**Image Optimization**:
- ALL images MUST use Next.js `<Image>` component (never `<img>` tags)
- Images MUST specify explicit `width` and `height` properties
- Hero/above-the-fold images MUST use `priority` prop
- Image formats: WebP with PNG/JPEG fallbacks

**Version Control**:
- Content files MUST be tracked in Git
- No CMS-managed content permitted (conflicts with zero-database principle)
- Content edits follow standard Git workflow (branch → PR → review → merge)

**Rationale**: MDX provides type-safe, version-controlled content authoring with React component embedding. Explicit image dimensions prevent CLS. Git-based content enables reproducible builds and audit trails.

---

### IV. Code Quality & Maintainability

**NON-NEGOTIABLE**: Every component MUST have TypeScript interfaces with JSDoc comments explaining props and behavior.

**Component Design Patterns**:
- Composition over inheritance: build complex UIs by composing smaller components
- Single Responsibility Principle: each component should do one thing well
- Avoid prop drilling beyond 2 levels; use React Context for deeply nested state
- Functional components only; class components are PROHIBITED

**Error Handling Requirements**:
- ALL async operations MUST have error boundaries or try/catch blocks
- Loading states MUST be implemented for all data fetching operations
- Error messages MUST be user-friendly and actionable
- Use React Suspense boundaries for async components

**Code Organization**:
- Maximum file length: 200 lines (excluding types/interfaces)
- Maximum function length: 50 lines
- Complex logic MUST be extracted to utility functions in `@/lib/`
- Avoid nested ternaries; use early returns or helper functions

**Styling Constraints**:
- Tailwind utility classes ONLY; CSS-in-JS libraries are PROHIBITED
- No inline styles except for truly dynamic values (e.g., animation transforms)
- CSS modules are PROHIBITED
- Custom CSS limited to `app/globals.css` for design tokens only

**Rationale**: JSDoc ensures component APIs are self-documenting. Composition patterns improve testability. Tailwind-only approach maintains consistency and prevents style duplication. Functional programming patterns reduce bugs.

---

### V. SEO & Accessibility

**NON-NEGOTIABLE**: WCAG 2.1 AA compliance is MANDATORY; no exceptions for "design reasons."

**Metadata Requirements**:
- ALL pages MUST export `metadata` or `generateMetadata` with title and description
- OpenGraph tags MUST be present: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card metadata MUST be included: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Canonical URLs MUST be specified to prevent duplicate content issues

**Semantic HTML Standards**:
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- Heading hierarchy MUST be logical: single `<h1>` per page, no skipped levels
- Landmark regions MUST be properly labeled with ARIA when semantic HTML insufficient

**Accessibility Checklist**:
- ALL images MUST have descriptive `alt` text (empty `alt=""` only for decorative images)
- Form inputs MUST have associated `<label>` elements
- Interactive elements MUST be keyboard-navigable (Tab order logical, visible focus states)
- Color contrast MUST meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Avoid "click here" links; use descriptive link text

**Focus Management**:
- Modal dialogs MUST trap focus and return focus on close
- Skip-to-content link MUST be present for keyboard users
- Custom interactive components MUST handle Enter/Space key events

**Rationale**: Accessibility is non-negotiable for inclusive design. Proper SEO metadata improves discoverability for recruiters. Semantic HTML improves screen reader experience and SEO rankings.

---

### VI. Deployment & Hosting

**NON-NEGOTIABLE**: Production deployments MUST pass all Lighthouse checks before merging to main branch.

**Deployment Platform**:
- Target platform: Vercel (optimized for Next.js)
- Automatic deployments triggered on push to `main` branch
- Preview deployments MUST be generated for all pull requests
- Preview URLs MUST be shared in PR descriptions for review

**Environment Variables**:
- Environment variables MUST NEVER be committed to repository
- Use `.env.local` for local development (gitignored)
- Vercel environment variables configured via dashboard or Vercel CLI
- Sensitive keys (API tokens) MUST use Vercel's encrypted storage

**Build Validation**:
- CI/CD MUST run `npm run build` to validate builds before merge
- Lighthouse CI checks MUST be integrated into pull request workflow
- Failed builds MUST block deployment

**Rationale**: Vercel provides zero-config Next.js deployment with edge caching. Automated deployments prevent manual errors. Preview deployments enable visual regression testing. Environment variable security prevents credential leaks.

---

### VII. Content Strategy

**NON-NEGOTIABLE**: Technical and fitness content MUST be integrated, not siloed into separate sections.

**Content Integration Principles**:
- Blog posts MUST support dual-purpose tagging (technical: `react`, `typescript`; fitness: `marathon`, `training`)
- Project showcases MUST highlight transferable skills (discipline, goal-setting, data analysis)
- Author bio MUST present unified identity: "Fullstack engineer who applies software principles to marathon training"

**Project Showcase Requirements**:
- MUST include: Technology stack, live demo link, GitHub repository link, key technical learnings
- SHOULD include: Architecture diagrams, performance metrics, challenges overcome
- Personal reflection section explaining "why this project matters"

**Blog Post Structure**:
- Technical tutorials: problem statement, solution approach, code examples, lessons learned
- Fitness narratives: training journey, data insights, parallels to software development
- Cross-pollination: relate engineering concepts to running (CI/CD → training consistency)

**Tagging & Discovery**:
- ALL content MUST be tagged with 2-5 relevant keywords
- Tag pages MUST show related content across both domains
- Related content suggestions MUST bridge technical and fitness topics

**Rationale**: Unique differentiation comes from the intersection of fullstack engineering and endurance athletics. Siloed content dilutes personal brand. Integrated storytelling demonstrates holistic thinking valued by innovative companies.

---

### VIII. Privacy & Analytics

**NON-NEGOTIABLE**: No third-party tracking scripts permitted without explicit user consent mechanism.

**Analytics Implementation**:
- Use privacy-focused analytics: Plausible Analytics or Vercel Analytics ONLY
- Google Analytics is PROHIBITED (violates privacy-first principle)
- Analytics MUST be compliant with GDPR, CCPA without cookie banners
- No personally identifiable information (PII) MUST be tracked

**Contact Form Handling**:
- Contact forms MUST NOT store submissions in databases
- Use serverless email solutions: Resend, SendGrid, or email API routes
- Form data MUST be transmitted via HTTPS only
- No form data logging permitted except for error debugging (sanitized)

**Third-Party Scripts**:
- External scripts MUST be loaded with `next/script` component
- Use `strategy="lazyOnload"` for non-critical scripts
- MUST NOT load: Facebook Pixel, Google Tag Manager, Hotjar, or similar trackers

**Data Minimization**:
- Collect only data explicitly needed (e.g., name + email for contact form)
- No hidden tracking pixels or fingerprinting techniques
- Transparent privacy policy page explaining data practices

**Rationale**: Privacy-focused analytics respects user autonomy and complies with regulations without intrusive cookie banners. Serverless email avoids database overhead. Demonstrating privacy-first engineering signals ethical awareness.

---

## Anti-Patterns & Prohibited Practices

**PROHIBITED**: The following patterns are explicitly banned and MUST be rejected in code reviews:

**Rendering Anti-Patterns**:
- ❌ Client-side rendering for content that can be statically generated
- ❌ `useEffect` hooks for data fetching (use server components or `generateStaticParams`)
- ❌ Hydration mismatches due to client/server HTML differences

**Styling Anti-Patterns**:
- ❌ Inline styles except for truly dynamic CSS properties (animations, calculated positions)
- ❌ CSS Modules or styled-components (use Tailwind exclusively)
- ❌ Global CSS classes outside of design token definitions in `app/globals.css`
- ❌ `!important` declarations (fix specificity instead)

**Complexity Anti-Patterns**:
- ❌ Heavy JavaScript frameworks when vanilla React suffices (no Redux for simple state)
- ❌ Over-engineered abstractions for features with single use-case
- ❌ Premature optimization (optimize only when performance metrics show need)
- ❌ Auto-generated code without human review and understanding

**Dependency Anti-Patterns**:
- ❌ Unmaintained npm packages (no updates in >2 years)
- ❌ Packages with known security vulnerabilities
- ❌ Large libraries when small utilities suffice (e.g., lodash for single function)

**Content Anti-Patterns**:
- ❌ Lorem ipsum placeholder text in production
- ❌ Broken links or missing images
- ❌ Outdated technical information (e.g., deprecated API examples)

**Rationale**: Explicit anti-patterns prevent common mistakes and enforce architectural decisions. Banned patterns have direct negative impact on performance targets or maintainability.

---

## Governance

**Constitutional Authority**: This constitution supersedes all other development practices, style guides, or conventions. In case of conflict, principles outlined here take precedence.

**Amendment Process**:
1. Proposed amendments MUST be documented with rationale in a GitHub issue
2. Amendments require explicit approval (self-approval for personal project; team vote for collaborative projects)
3. Approved amendments MUST update this document with new version number and amendment date
4. Breaking changes to principles require migration plan for existing code

**Versioning Policy**:
- **MAJOR** (X.0.0): Backward-incompatible principle changes, removals, or architectural shifts
- **MINOR** (x.Y.0): New principles added, existing principles expanded with new rules
- **PATCH** (x.y.Z): Clarifications, typo fixes, rewording without semantic changes

**Compliance Review**:
- ALL pull requests MUST verify alignment with constitutional principles
- Violations MUST be flagged in code review with reference to specific principle number
- Exceptions require documented justification approved by project maintainer
- Regular audits (quarterly) to ensure codebase compliance

**Complexity Justification**: Any violation of constitution principles (e.g., using client component where server component possible, exceeding performance budgets) MUST be documented with:
- Technical reason for exception
- Alternative approaches considered
- Mitigation plan to reduce impact
- Timeline for resolution if temporary exception

**Living Document**: This constitution is a living document. As the portfolio evolves, principles may be refined to reflect new learnings, technology updates, or changing goals. Version history tracks all amendments.

---

**Version**: 1.0.0 | **Ratified**: 2025-10-21 | **Last Amended**: 2025-10-21
