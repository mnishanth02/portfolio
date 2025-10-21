# SafeImage Component Documentation# SafeImage Component Documentation



## Overview## Overview

The `SafeImage` component is a wrapper around Next.js's `Image` component that provides automatic fallback handling for missing or failed-to-load images. This prevents console errors and failed network requests from repeatedly trying to fetch non-existent images.

The `SafeImage` component is a wrapper around Next.js's `Image` component that provides:

- **Automatic fallback handling** for missing or failed-to-load images## Location

- **SVG and mixed format support** with the `unoptimized` property`components/ui/safe-image.tsx`

- **Error prevention** that stops repeated 404 requests

- **Better UX** with graceful placeholder display instead of broken images## Purpose

- **Graceful Degradation**: Shows placeholder when images fail to load

## Key Features- **Error Prevention**: Stops repeated 404 requests for missing images

- **Better UX**: Displays "Image Not Available" placeholder instead of broken image icon

- ✅ Handles missing images gracefully- **Development Experience**: Cleaner console logs without image loading errors

- ✅ Supports SVG files and mixed image formats

- ✅ Prevents Next.js Image Optimization errors## Usage

- ✅ Automatic fallback to placeholder

- ✅ Single error attempt (no retry loops)### Basic Example

- ✅ Clean console output```tsx

import { SafeImage } from "@/components/ui/safe-image";

## Location

<SafeImage

`components/ui/safe-image.tsx`  src="/images/projects/my-project.jpg"

  alt="My Project"

## Purpose  width={600}

  height={400}

SafeImage solves several critical issues:  className="object-cover w-full h-full"

/>

1. **Graceful Degradation**: Shows placeholder when images fail to load instead of broken icons```

2. **Error Prevention**: Stops repeated 404 requests after first failure

3. **SVG Support**: Properly handles SVG files without "dangerouslyAllowSVG" warnings### With Custom Fallback

4. **Format Flexibility**: Works with any image format (JPG, PNG, SVG, WebP, etc.)```tsx

5. **Development Experience**: Clean logs without optimization errors<SafeImage

  src="/images/profile.jpg"

## Usage  alt="Profile Picture"

  width={400}

### Basic Example  height={400}

  fallbackSrc="/images/placeholder.svg"

```tsx  className="rounded-full"

import { SafeImage } from "@/components/ui/safe-image";/>

```

<SafeImage

  src="/images/projects/my-project.jpg"### With fill Layout

  alt="My Project"```tsx

  width={600}<div className="relative aspect-video w-full">

  height={400}  <SafeImage

  className="object-cover w-full h-full"    src="/images/blog/post-cover.jpg"

/>    alt="Blog Post Cover"

```    fill

    className="object-cover"

### With Custom Fallback    priority

  />

```tsx</div>

<SafeImage```

  src="/images/profile.jpg"

  alt="Profile Picture"## API

  width={400}

  height={400}### Props

  fallbackSrc="/images/custom-placeholder.svg"All props from Next.js `ImageProps` are supported, except:

  className="rounded-full"- `onError` - Handled internally by the component

/>

```Additional props:

- `fallbackSrc?: string` - Optional custom fallback image URL. If not provided, uses default SVG placeholder.

### With fill Layout (Responsive)

### Default Fallback

```tsxWhen no `fallbackSrc` is provided, the component generates an inline SVG placeholder with:

<div className="relative aspect-video w-full">- Gray background (#f3f4f6)

  <SafeImage- "Image Not Available" text centered

    src="/images/blog/post-cover.jpg"- Dimensions matching the `width` and `height` props

    alt="Blog Post Cover"

    fill## Implementation Details

    className="object-cover"

    priority### State Management

  />The component uses React `useState` to track:

</div>- `imageSrc`: Current image source (initially set to `src` prop)

```- `hasError`: Boolean flag to prevent infinite error loops



### With SVG Images### Error Handling Flow

1. Image fails to load (404, network error, etc.)

```tsx2. `handleError` function is triggered

<SafeImage3. Check if error hasn't been handled yet (`!hasError`)

  src="/images/logo.svg"4. Set `hasError` to true

  alt="Company Logo"5. Replace `imageSrc` with fallback (custom or default)

  width={200}6. Component re-renders with fallback image

  height={200}7. No further error events are triggered

  // unoptimized is handled automatically

/>### Default Fallback Generation

``````javascript

const defaultFallback = `data:image/svg+xml;base64,${btoa(`

## API Reference  <svg width="${props.width || 800}" height="${props.height || 600}" xmlns="http://www.w3.org/2000/svg">

    <rect width="100%" height="100%" fill="#f3f4f6"/>

### Props    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"

          font-family="system-ui, sans-serif" font-size="18" fill="#9ca3af">

All props from Next.js `ImageProps` are supported, plus:      Image Not Available

    </text>

| Prop | Type | Default | Description |  </svg>

|------|------|---------|-------------|`)}`;

| `src` | `string` | Required | Image source URL |```

| `alt` | `string` | Required | Alternative text for accessibility |

| `fallbackSrc` | `string` | `/images/placeholder.svg` | Custom fallback image URL |## Components Updated

| `width` | `number` | Required | Image width in pixels |

| `height` | `number` | Required | Image height in pixels |The following components have been updated to use `SafeImage`:

| `unoptimized` | `boolean` | `true` (automatic) | Always enabled - no configuration needed |

| `priority` | `boolean` | `false` | Load with high priority (above-the-fold images) |1. **`components/shared/ProjectCard.tsx`**

| `className` | `string` | - | Tailwind CSS classes |   - Project thumbnail images

| `fill` | `boolean` | `false` | Use CSS `position: absolute` for responsive sizing |   - Prevents 404 errors for missing project images



### Default Fallback2. **`components/shared/ProjectModal.tsx`**

   - Project detail modal images

When no `fallbackSrc` is provided, SafeImage uses `/images/placeholder.svg` which features:   - Consistent fallback in quick view

- Light gray background (#f3f4f6)

- "Image Not Available" centered text3. **`components/blog/BlogCard.tsx`**

- Professional appearance matching the design system   - Blog post cover images

   - Graceful handling of missing blog images

## How It Works

4. **`components/home/Hero.tsx`**

### Component Flow   - Headshot/profile image

   - Critical above-the-fold image with fallback

```

1. Component Mounts5. **`components/blog/MDXComponents.tsx`**

   ↓   - MDX image rendering

2. Try Loading Image (src)   - All images in blog post content

   ├─ Success → Display Image ✓

   └─ Failure → 6. **`app/blog/[slug]/page.tsx`**

      ↓   - Featured blog post images

3. Set Error State   - Detail page hero images

   ↓

4. Display Fallback Image## Benefits

   ↓

5. No Further Retries (prevents 404 loops)### Before SafeImage

``````

❌ Repeated 404 errors in console

### Implementation Details❌ Network tab cluttered with failed requests

❌ Broken image icons in UI

**State Management:**❌ No visual feedback for missing images

- `imgSrc`: Tracks current image source (src or fallback)```

- `isError`: Boolean flag preventing infinite error loops

### After SafeImage

**Error Handling:**```

```tsx✅ Single error attempt, then fallback

const handleError = () => {✅ Clean console logs

    if (!isError) {  // Only switch once✅ Professional placeholder UI

        setIsError(true);✅ Clear "Image Not Available" message

        setImgSrc(fallbackSrc);✅ No performance impact from retry attempts

    }```

};

```## Testing



**Automatic unoptimized Property:**### Test Missing Images

```tsx1. Reference a non-existent image:

// Always enabled to prevent:   ```tsx

// - SVG format warnings   <SafeImage src="/images/does-not-exist.jpg" alt="Test" width={600} height={400} />

// - Mixed format issues     ```

// - Image optimization errors2. Verify placeholder appears

unoptimized3. Check console for single error (not repeated)

```

### Test Working Images

## Components Using SafeImage1. Reference an existing image

2. Verify image loads normally

The following components have been updated to use SafeImage:3. Confirm no fallback is shown



| Component | Location | Purpose |### Test Custom Fallback

|-----------|----------|---------|1. Provide custom `fallbackSrc`:

| ProjectCard | `components/shared/ProjectCard.tsx` | Project thumbnail images |   ```tsx

| ProjectModal | `components/shared/ProjectModal.tsx` | Project detail modal images |   <SafeImage

| BlogCard | `components/blog/BlogCard.tsx` | Blog post cover images |     src="/missing.jpg"

| Hero | `components/home/Hero.tsx` | Profile/headshot image |     fallbackSrc="/images/placeholder.svg"

| MDXComponents | `components/blog/MDXComponents.tsx` | Blog post content images |     alt="Test"

| Blog Detail Page | `app/blog/[slug]/page.tsx` | Featured blog post images |     width={600}

     height={400}

## Before vs After   />

   ```

### Before SafeImage Implementation2. Verify custom fallback is used



```## Best Practices

❌ Repeated 404 errors in console

❌ Network tab cluttered with failed requests1. **Always provide meaningful alt text** - Accessibility is still critical

❌ Broken image icons in UI (painful UX)2. **Use appropriate dimensions** - Match actual display size for better fallback rendering

❌ SVG warnings about dangerouslyAllowSVG3. **Custom fallbacks for branding** - Consider custom placeholder for professional appearance

❌ No visual feedback for missing images4. **Priority for above-fold** - Use `priority` prop for critical images

❌ Optimization errors for mismatched formats5. **Consistent sizing** - Use same dimensions across related images for visual consistency

```

## Performance Considerations

Example console spam:

```- **Single Error**: Only one failed network request per missing image

⨯ GET /images/projects/project-1.jpg 404 in 148ms- **Base64 SVG**: Default fallback is inline, no additional HTTP request

⨯ The requested resource isn't a valid image for /images/projects/project-1.jpg- **State Management**: Minimal React state overhead

⨯ GET /images/projects/project-1.jpg 404 in 147ms- **No Re-renders**: Error state prevents re-render loops

⨯ The requested resource isn't a valid image for /images/projects/project-1.jpg

... [repeating 50+ times]## Future Enhancements

```

Potential improvements for consideration:

### After SafeImage Implementation- [ ] Loading skeleton/spinner before error

- [ ] Retry mechanism with exponential backoff

```- [ ] Analytics tracking for missing images

✅ Single error attempt, then fallback- [ ] Different fallbacks per image category

✅ Clean console - zero image errors- [ ] Blur placeholder support

✅ Professional placeholder UI- [ ] Progressive image loading

✅ Clear "Image Not Available" message
✅ Supports any image format
✅ No optimization warnings
```

## File Structure

```
public/images/
├── placeholder.svg          # Generic placeholder
├── blog/
│   ├── first-marathon.svg
│   ├── nextjs-type-safe-apis.jpg (SVG file)
│   ├── react-performance-optimization.jpg (SVG file)
│   └── zero-database-architecture.jpg (SVG file)
└── projects/
    ├── placeholder.svg      # Project fallback
    └── project-1.jpg        # Project images
```

## Best Practices

### 1. Always Use for Dynamic Images
```tsx
// ✅ DO: Use SafeImage for dynamic content
<SafeImage
  src={project.image}
  alt={project.title}
  width={600}
  height={400}
/>

// ❌ DON'T: Use Image directly for user/data-driven content
<Image
  src={project.image}
  alt={project.title}
  width={600}
  height={400}
/>
```

### 2. Meaningful Alt Text
```tsx
// ✅ DO: Descriptive alt text
<SafeImage
  src="/images/projects/ecommerce.jpg"
  alt="E-commerce Platform Redesign - Product showcase"
  width={600}
  height={400}
/>

// ❌ DON'T: Vague or missing alt text
<SafeImage
  src="/images/projects/ecommerce.jpg"
  alt="image"
  width={600}
  height={400}
/>
```

### 3. Optimize Above-the-Fold Images
```tsx
// ✅ DO: Priority for hero images
<SafeImage
  src="/images/hero-banner.jpg"
  alt="Hero Section"
  width={1200}
  height={675}
  priority  // Preload this image
/>

// ❌ DON'T: Load hero images without priority
<SafeImage
  src="/images/hero-banner.jpg"
  alt="Hero Section"
  width={1200}
  height={675}
  // missing priority - slower load
/>
```

### 4. Use fill for Responsive Images
```tsx
// ✅ DO: Use fill for aspect-ratio containers
<div className="relative aspect-video w-full">
  <SafeImage
    src="/images/blog/post.jpg"
    alt="Blog Post"
    fill
    className="object-cover"
  />
</div>

// ❌ DON'T: Hard-code dimensions for responsive images
<SafeImage
  src="/images/blog/post.jpg"
  alt="Blog Post"
  width={800}
  height={600}
  // Won't scale properly on mobile
/>
```

### 5. Custom Fallbacks for Branding
```tsx
// ✅ DO: Use brand-specific placeholder for important images
<SafeImage
  src="/images/project-missing.jpg"
  alt="Project"
  width={600}
  height={400}
  fallbackSrc="/images/projects/branded-placeholder.svg"
/>

// ✅ OK: Default placeholder for less critical images
<SafeImage
  src="/images/blog/post.jpg"
  alt="Blog Post"
  width={800}
  height={600}
  // Uses default /images/placeholder.svg
/>
```

## Performance Considerations

### Advantages
- **Single Request**: Only one failed network request per missing image (not hundreds)
- **No Retries**: Error state prevents infinite retry loops
- **Inline Fallback**: Default SVG placeholder is inline (no extra HTTP request)
- **Minimal State**: Two simple boolean/string state variables
- **No Re-render Loops**: Error flag prevents state update loops

### unoptimized Property
- **Why It's Enabled**: Prevents SVG format warnings and optimization errors
- **Impact**: Negligible performance cost compared to preventing errors
- **Benefit**: Works with any image format without warnings
- **Network**: Saves bandwidth by preventing repeated 404 requests

## Troubleshooting

### Images Not Showing (Always Fallback)

**Check 1: File exists?**
```bash
ls -la public/images/blog/
# Should show your image file
```

**Check 2: Correct path?**
```tsx
// Correct
<SafeImage src="/images/blog/post.jpg" ... />

// Wrong
<SafeImage src="images/blog/post.jpg" ... />  // Missing leading slash
<SafeImage src="./images/blog/post.jpg" ... /> // Relative path
```

**Check 3: Alt text provided?**
```tsx
// ✅ Correct
<SafeImage src="/path" alt="Description" width={600} height={400} />

// ❌ Missing alt text
<SafeImage src="/path" width={600} height={400} />
```

### SVG Warnings in Console (SOLVED!)

**Issue:** Was seeing warnings like this:
```
⨯ The requested resource "/images/blog/zero-database-architecture.jpg"
  has type "image/svg+xml" but dangerouslyAllowSVG is disabled
```

**Solution:** SafeImage automatically enables `unoptimized` property which:
- Disables optimization checks
- Eliminates SVG warnings
- Allows any image format
- Prevents dangerouslyAllowSVG errors

### 404 Errors Still Appearing?

**Check 1: Clear browser cache**
```bash
# Hard refresh in browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

**Check 2: Verify image file exists**
```bash
file /Users/nishanth/projects/techlete/portfolio/public/images/blog/post.jpg
# Should output file type, not "No such file"
```

**Check 3: Check file permissions**
```bash
ls -la public/images/
# Should show read permissions for all files
```

## Migration Guide

### From regular Image to SafeImage

```tsx
// Before
import Image from "next/image";

<Image
  src={project.image}
  alt={project.title}
  width={600}
  height={400}
/>

// After
import { SafeImage } from "@/components/ui/safe-image";

<SafeImage
  src={project.image}
  alt={project.title}
  width={600}
  height={400}
/>
```

### Changes Required
1. Import `SafeImage` instead of `Image`
2. Everything else stays the same!
3. No prop changes needed
4. Automatic fallback handling works immediately

## Examples by Use Case

### Project Showcase
```tsx
<SafeImage
  src={`/images/projects/${project.image}`}
  alt={project.title}
  width={600}
  height={400}
  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
  priority
/>
```

### Blog Cards
```tsx
<SafeImage
  src={`/images/blog/${post.image}`}
  alt={post.title}
  fill
  className="object-cover transition-transform duration-300 group-hover:scale-105"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isFeatured}
/>
```

### MDX Content Images
```tsx
<SafeImage
  src={imagePath}
  alt={altText}
  width={1200}
  height={675}
  className="w-full object-cover"
/>
```

### Hero Section (Profile Picture)
```tsx
<SafeImage
  src="/images/headshot.svg"
  alt="Professional Headshot"
  width={400}
  height={400}
  priority
  className="rounded-full object-cover border-4 border-primary/20 shadow-2xl"
/>
```

### SVG Logos
```tsx
<SafeImage
  src="/images/logo.svg"
  alt="Company Logo"
  width={200}
  height={50}
  className="h-auto"
  // unoptimized is automatic - no warnings!
/>
```

## Future Enhancements

Potential improvements for consideration:
- [ ] Loading skeleton/spinner before error
- [ ] Retry mechanism with exponential backoff (optional)
- [ ] Analytics tracking for missing images
- [ ] Different fallbacks per category (projects, blog, etc.)
- [ ] Blur placeholder support
- [ ] Progressive image loading (LQIP)
- [ ] AVIF format support
- [ ] WebP format support

## Related Files

- **Component**: `components/ui/safe-image.tsx`
- **Usage Examples**: `components/home/Hero.tsx`, `components/shared/ProjectCard.tsx`, `components/blog/BlogCard.tsx`
- **Placeholders**: `public/images/placeholder.svg`, `public/images/projects/placeholder.svg`
- **Blog Images**: `public/images/blog/*.{jpg,svg}`

## Support & Questions

For issues with SafeImage:
1. Check the **Troubleshooting** section above
2. Verify image files exist in `public/images/`
3. Ensure correct file paths with leading `/`
4. Check browser DevTools (F12) Network tab for 404 errors
5. Test with absolute URL paths
6. Verify alt text is provided
7. Clear browser cache with hard refresh

---

**Last Updated:** October 21, 2025
**Component Version:** 2.0 (with SVG and unoptimized support)
**Status:** Production Ready ✅
**Features:** Auto fallback • SVG support • Error prevention • Format flexibility
