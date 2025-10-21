# Quickstart Guide: Personal Portfolio Website

**Purpose**: Get the portfolio website running locally for development in under 5 minutes.

**Prerequisites**:
- Node.js 18+ installed ([download](https://nodejs.org/))
- Git installed ([download](https://git-scm.com/))
- Code editor (VS Code recommended)
- GitHub account (for deployment)

---

## 1. Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local
```

**What this does**:
- Downloads the codebase to your local machine
- Installs Next.js, React, Tailwind, and all dependencies (~300MB)
- Creates local environment file for API keys

---

## 2. Configure Environment Variables (1 minute)

Edit `.env.local` with your actual values:

```bash
# Required for contact form (optional for local dev)
RESEND_API_KEY=re_your_actual_api_key_here

# Required for analytics (optional for local dev)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site URL (change for production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**How to get API keys**:
- **Resend**: Sign up at [resend.com](https://resend.com) → API Keys → Create API Key
- **PostHog**: Sign up at [posthog.com](https://posthog.com) → Project Settings → Copy Project API Key

**⚠️ For local development**: You can skip this step temporarily. The contact form will show an error, but everything else works.

---

## 3. Start Development Server (30 seconds)

```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 15.5.6
- Local:        http://localhost:3000
- Turbopack:    enabled

✓ Ready in 1.2s
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**What you'll see**:
- Hero section with placeholder name and headshot
- About section with timeline (placeholder data)
- Projects grid (empty until you add projects)
- Blog section (empty until you add blog posts)
- Contact form (works if RESEND_API_KEY is set)

---

## 4. Add Your First Blog Post (2 minutes)

Create `content/blog/my-first-post.mdx`:

```mdx
---
title: "My First Blog Post"
description: "This is my first blog post on my new portfolio website. I'm excited to share my journey in software development and marathon running."
publishedAt: "2025-10-21"
category: "technical"
tags: ["blogging", "portfolio", "next.js"]
featured: true
---

## Welcome to My Blog!

This is my first blog post. I'm excited to share my experiences as a fullstack engineer and marathon runner.

### Why I Started This Blog

I wanted a place to document my learnings in:
- **Software Engineering**: Building scalable web applications
- **Marathon Running**: Training insights and race experiences
- **Life**: Balancing tech and fitness

Stay tuned for more content!
```

**Refresh your browser** - the blog post appears immediately (hot reload)!

---

## 5. Add Your First Project (2 minutes)

Create `content/projects/my-portfolio.json`:

```json
{
  "id": "personal-portfolio-website",
  "title": "Personal Portfolio Website",
  "description": "Built a modern portfolio website using Next.js 15, React 19, and Tailwind CSS v4. Features static site generation, MDX blog, and privacy-focused analytics.",
  "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
  "category": "web",
  "status": "completed",
  "image": "portfolio-placeholder.jpg",
  "githubUrl": "https://github.com/username/portfolio",
  "featured": true,
  "startDate": "2025-10",
  "endDate": "2025-10"
}
```

**Refresh your browser** - the project appears in the Projects section!

---

## 6. Customize Site Configuration (3 minutes)

Edit `lib/constants.ts`:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Name | Fullstack Engineer & Marathon Runner',
  description: 'Personal portfolio showcasing fullstack development projects and marathon running journey.',
  url: 'https://yourportfolio.com',

  author: {
    name: 'Your Name',
    email: 'your-email@example.com',
    location: 'San Francisco, CA',
    availability: 'Open to opportunities',

    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    strava: 'https://strava.com/athletes/123456',
    youtube: 'https://youtube.com/@username',
  },

  // ... rest of config
}
```

**Save the file** - changes appear immediately!

---

## 7. Add Your Headshot (1 minute)

1. Place your headshot image at `public/images/headshot.jpg`
   - Recommended size: 800x800px
   - Format: JPG or PNG
   - Keep file size under 500KB

2. The hero section will automatically load your image!

---

## Common Development Tasks

### Run Build Check
```bash
npm run build
```
Validates that your site builds successfully for production.

### Run Format Check
```bash
npm run format
```
Auto-formats code using Biome (not Prettier).

### Run Linting
```bash
npm run lint
```
Checks for code quality issues using Biome (not ESLint).

### Preview Production Build
```bash
npm run build
npm start
```
View the optimized production version locally.

---

## Project Structure Quick Reference

```
portfolio/
├── app/                      # Next.js App Router pages
│   ├── (home)/page.tsx       # Home page (hero, about, projects, blog, contact)
│   ├── blog/[slug]/page.tsx  # Blog post pages
│   ├── projects/[slug]/page.tsx # Project detail pages
│   └── api/contact/route.ts  # Contact form API endpoint
├── components/
│   ├── ui/                   # Shadcn/ui components (button, card, etc.)
│   ├── home/                 # Home page sections (Hero, About, Projects, etc.)
│   ├── blog/                 # Blog components (BlogCard, MDXComponents)
│   └── shared/               # Shared components (Navigation, Footer)
├── content/
│   ├── blog/                 # MDX blog posts ← ADD YOUR POSTS HERE
│   └── projects/             # Project JSON files ← ADD YOUR PROJECTS HERE
├── lib/
│   ├── constants.ts          # Site config ← CUSTOMIZE THIS
│   ├── validations.ts        # Zod schemas
│   └── utils.ts              # Utility functions
├── public/
│   └── images/               # Static images ← ADD YOUR IMAGES HERE
├── .env.local                # Environment variables (gitignored)
└── .env.example              # Environment template
```

---

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module not found errors
```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Images not loading
- Check that images exist in `public/images/`
- Use paths relative to `/public` (e.g., `/images/headshot.jpg` not `./images/headshot.jpg`)
- Image paths in frontmatter should be filenames only (e.g., `headshot.jpg`)

### Contact form not working
- Verify `RESEND_API_KEY` is set in `.env.local`
- Check Resend API key is valid at [resend.com/api-keys](https://resend.com/api-keys)
- Ensure `.env.local` is not committed to Git (check `.gitignore`)

### Build fails with TypeScript errors
```bash
# Check TypeScript errors
npm run build

# Common fix: ensure all required fields in MDX frontmatter are present
```

---

## Next Steps

1. **Customize Content**:
   - Replace placeholder text in `components/home/Hero.tsx`
   - Update About section in `components/home/About.tsx`
   - Add your skills and achievements in `lib/constants.ts`

2. **Add More Content**:
   - Write 2-3 blog posts in `content/blog/`
   - Add 6-8 projects in `content/projects/`
   - Upload project screenshots to `public/images/projects/`

3. **Test Locally**:
   - Test contact form submission (requires Resend API key)
   - Test mobile responsiveness (Chrome DevTools → Device Toolbar)
   - Run Lighthouse audit (Chrome DevTools → Lighthouse tab)

4. **Deploy to Production**:
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment guide
   - Configure custom domain
   - Set up environment variables in Vercel dashboard

---

## Development Tips

**Hot Reload**: Next.js automatically reloads when you save files. No need to restart the server.

**TypeScript Autocomplete**: Use VS Code for best TypeScript experience. The project has strict type checking enabled.

**Tailwind IntelliSense**: Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) VS Code extension for class name autocomplete.

**Content Preview**: All content changes (MDX, JSON) appear immediately in the browser thanks to hot module replacement.

**Error Overlay**: If there's an error, Next.js shows a detailed error overlay in the browser. Fix the error and the site auto-recovers.

---

## Getting Help

- **Documentation**: See `/docs/` folder for detailed guides
- **Spec**: See `/specs/001-portfolio-site-v1/spec.md` for requirements
- **Issues**: Check GitHub Issues for known problems
- **Constitution**: See `.specify/memory/constitution.md` for project principles

---

**Estimated Setup Time**: 5-10 minutes
**Difficulty**: Beginner-friendly
**Last Updated**: 2025-10-21
