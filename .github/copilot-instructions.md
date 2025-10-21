# AI Coding Agent Instructions

## Project Overview
This is a portfolio website built with **Next.js 15.5.6** (App Router), **React 19**, and **Tailwind CSS v4**. It uses **Turbopack** for fast development and production builds.

## Tech Stack & Architecture
- **Framework**: Next.js 15 with App Router (`app/` directory structure)
- **Styling**: Tailwind CSS v4 with PostCSS, custom design tokens via CSS variables (OKLCH color space)
- **UI Components**: shadcn/ui (New York style) with `lucide-react` icons - components live in `@/components/ui`
- **Code Quality**: Biome (not ESLint/Prettier) for linting and formatting
- **Fonts**: Geist Sans & Geist Mono loaded via `next/font/google` in `app/layout.tsx`
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → root directory)

## Critical Developer Workflows

### Development Commands
```bash
bun run dev          # Start dev server with Turbopack
bun run build        # Production build with Turbopack
bun run lint         # Run Biome checks (NOT eslint)
bun run format       # Format code with Biome (NOT prettier)
```

### Adding shadcn/ui Components
This project is pre-configured for shadcn/ui but components must be added manually:
```bash
npx shadcn@latest add [component-name]
```
- Components install to `@/components/ui` (configured in `components.json`)
- Always use the `cn()` utility from `@/lib/utils` for className merging

## Project-Specific Conventions

### Styling Standards
1. **CSS Variables over Tailwind arbitrary values**: Use semantic tokens defined in `app/globals.css`
   - Example: `bg-background text-foreground` not `bg-white text-black`
   - All colors use OKLCH color space for better perceptual uniformity
   - Dark mode via `.dark` class (not `prefers-color-scheme`)

2. **Theme customization**: Edit CSS variables in `app/globals.css` under `:root` and `.dark`
   - Tailwind v4 imports: `@import "tailwindcss"` and `@import "tw-animate-css"`
   - Custom variant: `@custom-variant dark (&:is(.dark *))`

3. **Component structure**: Use `clsx` + `tailwind-merge` via the `cn()` utility for conditional classes
   ```tsx
   import { cn } from "@/lib/utils"

   <div className={cn("base-classes", condition && "conditional-classes")} />
   ```

### File Organization
- **Routes**: `app/[route]/page.tsx` (App Router structure)
- **Layouts**: `app/layout.tsx` (root), nested layouts in subdirectories
- **Components**: `components/[component-name].tsx` or `components/ui/[shadcn-component].tsx`
- **Utilities**: `lib/[util-name].ts`
- **Styles**: Global styles in `app/globals.css`, component-specific styles inline with Tailwind

### TypeScript Patterns
- Use `import type` for type-only imports (see `app/layout.tsx`)
- Export default for page/layout components
- Leverage `Readonly<>` for props that shouldn't mutate

## Integration Points

### Font Loading
Fonts are loaded in `app/layout.tsx` and applied via CSS variables:
```tsx
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
// Applied: className={`${geistSans.variable} ...`}
// Used in CSS: --font-sans: var(--font-geist-sans)
```

### Image Optimization
Always use `next/image` for images - never `<img>` tags. See `app/page.tsx` for examples with proper `width`, `height`, and `priority` props.

## Common Pitfalls
1. **Don't use ESLint/Prettier commands** - this project uses Biome exclusively
2. **Turbopack is enabled by default** - don't remove `--turbopack` flags from scripts
3. **shadcn/ui components aren't pre-installed** - add them as needed with `npx shadcn@latest add`
4. **Tailwind v4 syntax differences** - uses native CSS imports, not `tailwind.config.js`
5. **Path aliases** - Use `@/` prefix consistently (e.g., `@/lib/utils`, `@/components/ui/button`)
