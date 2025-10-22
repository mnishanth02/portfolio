# Personal Portfolio Website

A high-performance, accessible portfolio website built with Next.js 15, showcasing software engineering projects and marathon running journey. Features zero-database architecture, static site generation, and modern web best practices.

## 🚀 Tech Stack

### Core Framework
- **Next.js 15.5.6** - React framework with App Router and Turbopack
- **React 19** - UI library with Server Components
- **TypeScript 5.9.3** - Strict type safety

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS with OKLCH color space
- **shadcn/ui** - Accessible component library (New York style)
- **Lucide React** - Icon system
- **next-themes** - Dark mode support

### Content & Data
- **Content Collections** - Type-safe MDX content management
- **Zod** - Runtime schema validation
- **Fuse.js** - Client-side fuzzy search

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Resend** - Transactional email API

### Analytics & Monitoring
- **PostHog** - Privacy-first product analytics

### Code Quality
- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)

## ✨ Features

### Performance
- ⚡ **Lighthouse Score: 95+** - Optimized for Core Web Vitals
- 🎯 **LCP < 1s** - Fast initial page loads with static generation
- 📦 **Bundle Optimization** - Code splitting and tree shaking
- 🖼️ **Image Optimization** - Next.js Image component with WebP support

### Accessibility
- ♿ **WCAG AA Compliant** - Semantic HTML and ARIA attributes
- ⌨️ **Keyboard Navigation** - Full keyboard support with focus indicators and skip links
- 🎨 **Color Contrast** - 4.5:1 minimum contrast ratios (OKLCH color space)
- 📱 **Touch Targets** - Minimum 44×44px tap targets (all buttons h-11)
- 🏗️ **Semantic Components** - All sections use shadcn/ui Card components consistently

### SEO & Discovery
- 🔍 **Dynamic Sitemap** - Auto-generated from content
- 🤖 **Robots.txt** - Search engine optimization
- 📊 **Structured Data** - JSON-LD for rich snippets
- 🔗 **OpenGraph & Twitter Cards** - Social media previews

### Content Features
- 📝 **MDX Blog** - Markdown with React components
- 🏷️ **Tag Filtering** - Category-based content discovery
- 🔎 **Fuzzy Search** - Client-side blog search
- 📖 **Reading Time** - Automatic calculation
- 🎥 **YouTube Embeds** - Lazy-loaded video player

### User Experience
- 🌓 **Dark Mode** - System preference detection
- 📱 **Mobile First** - Responsive design (320px+)
- ⚡ **Smooth Scrolling** - Enhanced navigation
- 🎨 **Touch-Optimized** - Mobile-friendly interactions

## 🛠️ Local Development

### Prerequisites
- **Bun** (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Contact Form (Resend)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=your-email@example.com

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run development server**
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Commands

```bash
# Start development server with Turbopack
bun run dev

# Production build
bun run build

# Start production server
bun start

# Lint and format with Biome
bun run lint
bun run format

# Type checking
bun run type-check
```

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage (Hero, About, Projects, Contact)
│   ├── not-found.tsx        # 404 page
│   ├── globals.css          # Global styles and design tokens
│   ├── blog/                # Blog routes
│   │   ├── page.tsx         # Blog listing
│   │   ├── layout.tsx       # Blog layout
│   │   └── [slug]/          # Dynamic blog post pages
│   ├── projects/            # Project detail pages
│   │   └── [slug]/
│   └── api/                 # API routes
│       └── contact/         # Contact form endpoint
├── components/
│   ├── home/                # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── blog/                # Blog components
│   │   ├── BlogList.tsx
│   │   ├── BlogCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── MDXComponents.tsx
│   ├── shared/              # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   └── SocialLinks.tsx
│   ├── providers/           # Context providers
│   │   ├── ThemeProvider.tsx
│   │   └── PostHogProvider.tsx
│   └── ui/                  # shadcn/ui components
├── content/
│   ├── blog/                # MDX blog posts
│   └── projects/            # Project JSON files
├── lib/
│   ├── constants.ts         # Site configuration
│   ├── utils.ts             # Utility functions
│   ├── validations.ts       # Zod schemas
│   ├── mdx.ts               # MDX utilities
│   └── analytics.ts         # Analytics helpers
├── public/
│   ├── images/              # Static images
│   │   ├── blog/
│   │   └── projects/
│   └── resume.pdf           # Downloadable resume
├── types/
│   └── index.ts             # TypeScript type definitions
├── specs/                   # Project specifications
├── biome.json               # Biome configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── content-collections.ts   # Content Collections config
```

## 📝 Content Management

### Adding Blog Posts

Create a new MDX file in `content/blog/`:

```markdown
---
title: "Your Post Title (10-100 chars)"
description: "Post description for SEO (50-200 chars)"
publishedAt: "2024-01-15"
category: "technical" # or "fitness" or "lifestyle"
tags: ["nextjs", "react", "typescript"]
image: "post-image.jpg"
featured: false
---

Your content here with **markdown** and React components!
```

### Adding Projects

Create a JSON file in `content/projects/`:

```json
{
  "id": "project-slug",
  "title": "Project Title",
  "description": "Short description (50-200 chars)",
  "technologies": ["Next.js", "TypeScript", "PostgreSQL"],
  "category": "fullstack",
  "status": "completed",
  "image": "project-thumbnail.jpg",
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": true
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Select repository

2. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Set `NEXT_PUBLIC_SITE_URL` to your domain

3. **Deploy**
   - Vercel auto-deploys on push to main
   - Preview deployments for PRs

### Manual Deployment

```bash
# Build for production
bun run build

# Start production server
bun start
```

## 🧪 Testing

### Error Handling Tests

✅ **Contact Form**
- Invalid inputs (empty fields, invalid email)
- Honeypot spam protection
- API failure with mailto fallback

✅ **Content**
- Empty states (no blog posts/projects)
- YouTube embed errors
- 404 page navigation

✅ **Accessibility**
- Keyboard navigation
- Screen reader compatibility
- Touch target sizes (44×44px minimum)

### Performance Benchmarks

- **Lighthouse Performance**: 95+
- **LCP (Largest Contentful Paint)**: < 1s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FID (First Input Delay)**: < 100ms

## 🔧 Configuration

### Site Metadata

Edit `lib/constants.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title | Tagline",
  description: "Your description",
  url: "https://yourdomain.com",
  author: {
    name: "Your Name",
    email: "your@email.com",
    location: "Your Location",
  },
};
```

### Theme Customization

Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 142.1 76.2% 36.3%;
  /* ... more variables */
}
```

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact [your@email.com](mailto:your@email.com).

---

**Built with ❤️ using Next.js 15 and modern web technologies**
