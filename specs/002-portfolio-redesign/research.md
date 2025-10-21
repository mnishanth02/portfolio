# Research & Technology Decisions

**Feature**: Portfolio Redesign - Vertical Scroll Reduction
**Date**: 2025-10-21
**Status**: Complete

## Overview

This document consolidates research findings and technology decisions for implementing the portfolio redesign. All clarifications from the specification phase have been resolved, and technology choices align with the project constitution.

---

## Decision 1: MDX Frontmatter Parsing Strategy

**Context**: Article carousel needs to extract metadata (title, excerpt, date, tags) from existing MDX blog posts in `/content/blog/*.mdx`.

**Decision**: Use `@content-collections/mdx` (already installed) for build-time parsing

**Rationale**:
- Already integrated in project (`package.json` shows `@content-collections/mdx` 0.2.2)
- Zero runtime overhead - all parsing happens at build time
- Type-safe content collections with automatic validation
- Supports frontmatter extraction natively
- Next.js 15 compatible

**Alternatives Considered**:
1. **@next/mdx + gray-matter**: More manual setup, requires custom loader configuration
2. **Contentlayer**: Deprecated/unmaintained (last update 2023)
3. **JSON manifest**: Duplicates metadata, violates DRY principle

**Implementation Approach**:
```typescript
// content-collections.ts (already exists, may need extension)
import { defineCollection, defineConfig } from '@content-collections/core';

const blog = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export default defineConfig({
  collections: [blog],
});
```

**Performance Impact**: None - static generation maintains Lighthouse 95+ target.

---

## Decision 2: React Server Component vs Client Component Boundaries

**Context**: Next.js 15 App Router supports RSC by default. Clarification specifies: "RSC for Timeline/Skills/Projects layout, Client only for Tabs/Carousel controls."

**Decision**: Hybrid architecture - static layouts as RSC, interactive widgets as Client Components

**Component Classification**:

| Component | Type | Justification |
|-----------|------|---------------|
| `Timeline.tsx` | RSC | Static content, no interactivity |
| `TimelineItem.tsx` | RSC | Pure presentation component |
| `Skills.tsx` (wrapper) | RSC | Container only |
| `SkillTabs.tsx` (tabs UI) | Client | Requires useState for tab selection |
| `SkillCard.tsx` | RSC | Static skill display |
| `ArticlesCarousel.tsx` | Client | Scroll state, arrow navigation |
| `ArticleCard.tsx` | RSC | Static article preview |
| `ProjectsGrid.tsx` | RSC | Static grid layout |
| `ProjectCard.tsx` | RSC | Static project display (hover via CSS) |
| `Videos.tsx` (wrapper) | RSC | Container only |
| `VideoTabs.tsx` (tabs UI) | Client | Requires useState for tab selection |
| `VideoCard.tsx` | RSC | Static video thumbnail |

**Rationale**:
- Minimizes JavaScript bundle size (performance target)
- Follows Next.js 15 best practices
- Interactive elements (tabs, carousel) require client-side state
- Hover effects handled via CSS (no client state needed)

**Pattern**:
```typescript
// RSC wrapper with data
export default async function Skills() {
  const skills = await getSkills(); // Static data
  return <SkillTabs skills={skills} />;
}

// Client component for interactivity
'use client';
export function SkillTabs({ skills }: { skills: Skill[] }) {
  const [activeTab, setActiveTab] = useState('frontend');
  // Interactive UI here
}
```

---

## Decision 3: Horizontal Carousel Implementation

**Context**: Article carousel must support touch gestures, arrow navigation, and meet accessibility requirements.

**Decision**: CSS scroll-snap + useRef for arrow controls (no external carousel library)

**Rationale**:
- Native browser scrolling = hardware-accelerated (60fps guarantee)
- CSS scroll-snap provides smooth snapping behavior
- Minimal JavaScript (performance budget)
- No external dependencies (reduces bundle size)
- Accessible by default (keyboard scroll works natively)

**Implementation Approach**:
```tsx
'use client';
import { useRef } from 'react';

export function ArticlesCarousel({ articles }: { articles: Article[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -400 : 400,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      <button onClick={() => scroll('left')}>←</button>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
      <button onClick={() => scroll('right')}>→</button>
    </div>
  );
}
```

**CSS**:
```css
/* globals.css */
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

**Alternatives Considered**:
1. **Embla Carousel**: Excellent library but adds 15KB gzip (performance budget concern)
2. **Swiper**: Too heavy (50KB+), overkill for simple horizontal scroll
3. **Framer Motion**: Powerful but unnecessary complexity for scroll behavior

**Accessibility**:
- Keyboard navigation: Native browser scroll with Tab + Arrow keys
- Screen readers: Announce article count, provide skip links
- Touch devices: Native touch scrolling
- Reduced motion: `prefers-reduced-motion` disables smooth scroll

---

## Decision 4: Timeline Alignment Strategy

**Context**: Dual timeline may have unequal lengths (e.g., 10 career milestones vs 3 running achievements).

**Decision**: Top-align timelines with natural height difference at bottom

**Rationale**:
- Most intuitive reading pattern (chronological from oldest to newest)
- No artificial padding or empty states needed
- Clean visual hierarchy
- Simplest implementation (flexbox with `align-items: flex-start`)

**Implementation**:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
  <Timeline type="career" items={careerItems} />
  <Timeline type="running" items={runningItems} />
</div>
```

**CSS**:
- `items-start` ensures top alignment
- Each timeline grows to natural content height
- No JavaScript height calculation needed

**Alternative Rejected**: Bottom-align (would require detecting tallest timeline and padding shorter one)

---

## Decision 5: Tab State Management

**Context**: Skills and Videos sections use tabs. Clarification specifies: "Frontend tab default, no URL persistence."

**Decision**: React useState for tab selection, no URL sync

**Rationale**:
- Simpler implementation (no router integration)
- Faster tab switching (no URL updates)
- Cleaner URLs (no query params)
- Session state not critical (users can easily re-select)

**Implementation**:
```tsx
'use client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function SkillTabs({ skills }: Props) {
  return (
    <Tabs defaultValue="frontend">
      <TabsList>
        <TabsTrigger value="frontend">Frontend</TabsTrigger>
        <TabsTrigger value="backend">Backend</TabsTrigger>
        {/* ... */}
      </TabsList>
      <TabsContent value="frontend">
        {/* Skills grid */}
      </TabsContent>
    </Tabs>
  );
}
```

**Alternative Rejected**: URL query params (`?tab=backend`) - adds complexity without user benefit

---

## Decision 6: Bento Grid Layout Strategy

**Context**: Projects section needs compact bento grid with featured project spanning 2 columns.

**Decision**: CSS Grid with named grid areas for featured project

**Rationale**:
- CSS Grid provides precise control over spanning
- Named areas make code readable
- Responsive breakpoints easy with Tailwind
- No JavaScript needed for layout

**Implementation**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <ProjectCard featured className="md:col-span-2 md:row-span-2" {...projects[0]} />
  {projects.slice(1, 6).map((project) => (
    <ProjectCard key={project.id} {...project} />
  ))}
</div>
```

**Responsive Behavior**:
- Mobile (< 768px): Single column, featured project shows larger image
- Tablet (768-1023px): 2 columns, featured spans both
- Desktop (≥1024px): 3 columns, featured spans 2×2

---

## Decision 7: Image Optimization Strategy

**Context**: All components display images. Constitution requires Next.js Image component.

**Decision**: Use `next/image` with blur placeholders for above-fold, lazy loading for below-fold

**Configuration**:
```tsx
import Image from 'next/image';

// Above-fold (hero section)
<Image
  src="/images/timeline/milestone.jpg"
  alt="Career milestone"
  width={800}
  height={600}
  priority // Preload
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Below-fold (carousel, grid)
<Image
  src="/images/projects/demo.jpg"
  alt="Project demo"
  width={400}
  height={300}
  loading="lazy" // Default behavior
  placeholder="blur"
/>
```

**Blur Placeholder Generation**:
- Use `plaiceholder` package at build time
- Generate base64 blur from source images
- Store in image metadata for static generation

**Rationale**:
- Prevents CLS (<0.1 target)
- Improves LCP (<1.0s target)
- Progressive loading improves perceived performance

---

## Decision 8: Dark Mode Implementation

**Context**: Existing portfolio uses `next-themes` with `.dark` class selector.

**Decision**: Maintain existing `next-themes` implementation, extend for new components

**Rationale**:
- Already integrated (`package.json` shows `next-themes` 0.4.6)
- Proven solution, works with Tailwind
- Automatic system preference detection
- No migration needed

**Usage in New Components**:
```tsx
<div className="bg-white dark:bg-gray-900">
  <h2 className="text-gray-900 dark:text-gray-100">Title</h2>
</div>
```

**Testing**:
- Light mode: Verify contrast ratios ≥4.5:1
- Dark mode: Verify contrast ratios ≥4.5:1
- Transition: Smooth theme toggle without flash

---

## Decision 9: Responsive Breakpoints

**Context**: Specification defines 5 breakpoints (320px, 640px, 768px, 1024px, 1280px).

**Decision**: Use Tailwind default breakpoints (already aligned)

**Breakpoint Mapping**:
```typescript
// tailwind.config.ts (defaults)
sm: 640px  // Mobile landscape
md: 768px  // Tablet
lg: 1024px // Desktop (key breakpoint for timeline side-by-side)
xl: 1280px // Large desktop
```

**Key Layout Transitions**:
- **< 1024px**: Timeline stacks vertically, skills tabs icon-only, carousel shows 1-2 cards
- **≥ 1024px**: Timeline side-by-side, full tab labels, carousel shows 3 cards
- **≥ 1280px**: Bento grid expands, more comfortable spacing

**Testing Targets**:
- iPhone SE (375px width)
- iPad (768px width)
- MacBook Air (1440px width)
- 4K display (2560px width)

---

## Decision 10: Accessibility Implementation

**Context**: WCAG AA compliance mandatory. Components must support keyboard and screen readers.

**Decision**: Follow ARIA Authoring Practices Guide patterns for tabs and carousels

**Tabs (shadcn/ui built-in support)**:
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Arrow key navigation (Left/Right)
- Tab key to move between tab list and content
- `aria-selected`, `aria-controls`, `aria-labelledby`

**Carousel (custom implementation)**:
- `aria-label="Articles carousel"`
- `aria-live="polite"` for scroll announcements
- Visible focus indicators (2px ring)
- Skip link: "Skip to articles"

**Timeline**:
- Semantic `<article>` for each item
- Chronological `<time datetime="YYYY-MM-DD">`
- `aria-label="Career timeline"` / `"Running timeline"`

**Color Contrast**:
- All text: ≥4.5:1 (WCAG AA)
- Large text (≥18pt): ≥3:1
- Interactive elements: ≥3:1

**Testing Tools**:
- WAVE browser extension
- axe DevTools
- Lighthouse accessibility audit
- Manual keyboard testing
- VoiceOver (macOS) / NVDA (Windows)

---

## Performance Budget

**Current Baseline** (before redesign):
- Lighthouse Performance: 95+
- LCP: ~1.2s
- CLS: 0.05
- Bundle size: ~150KB gzip

**Target After Redesign**:
- Lighthouse Performance: ≥95 (maintain)
- LCP: <1.0s (improvement)
- CLS: <0.1 (maintain)
- Bundle size: <165KB gzip (+10% max)

**Mitigation Strategies**:
1. **Code splitting**: Dynamic import carousel only when visible (below fold)
2. **Image optimization**: WebP format, responsive sizes, lazy loading
3. **CSS-first animations**: Avoid JavaScript-based animations
4. **Minimal dependencies**: No external carousel libraries
5. **Server Components**: Static layouts reduce client bundle

**Monitoring**:
- Lighthouse CI on every PR
- Bundle analyzer to track size increases
- Real User Monitoring via Vercel Analytics

---

## Security Considerations

**No new attack surface** introduced:
- All content static (no user input)
- No API routes added
- No external script loading
- Images from trusted sources only

**Content Security Policy** (existing):
- Maintain current CSP headers
- No inline scripts (Turbopack handles)
- Next.js handles nonce generation

---

## Migration Risk Mitigation

**Brownfield Strategy**:
1. **Feature flags**: Use environment variables to toggle new sections
2. **Gradual rollout**: Deploy to preview environment first
3. **Rollback plan**: Keep old components until new ones validated
4. **A/B testing**: Optional - compare old vs new layout metrics

**Backward Compatibility**:
- Existing blog posts: No changes needed (MDX frontmatter already exists)
- Existing components: Not modified (new components added)
- Existing routes: No changes (only /about page added)

**Testing Checklist Before Production**:
- [ ] All 6 features implemented and verified
- [ ] Lighthouse scores ≥95 on desktop and mobile
- [ ] Vertical scroll reduced by 3000-3800px
- [ ] Accessibility audit passed (WAVE + axe)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Dark mode functional
- [ ] Mobile responsiveness verified on real devices
- [ ] No console errors or warnings
- [ ] SEO metadata complete for /about page

---

## Summary

All research decisions align with:
- ✅ Project constitution (all gates passed)
- ✅ Performance targets (Lighthouse 95+, LCP <1.0s, CLS <0.1)
- ✅ Accessibility requirements (WCAG AA)
- ✅ Technology constraints (Next.js 15, TypeScript, Tailwind v4)
- ✅ Zero-database principle (static generation only)

**Ready for Phase 1**: Data model design and contract generation.
