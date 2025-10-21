# SafeImage Component Documentation

## Overview

The `SafeImage` component is a wrapper around Next.js's `Image` component that provides automatic fallback handling for missing or failed-to-load images. This prevents console errors and failed network requests from repeatedly trying to fetch non-existent images.

## Location

`components/ui/safe-image.tsx`

## Purpose

SafeImage solves several critical issues:

1. **Graceful Degradation**: Shows placeholder when images fail to load instead of broken icons
2. **Error Prevention**: Stops repeated 404 requests after first failure
3. **SVG Support**: Properly handles SVG files without "dangerouslyAllowSVG" warnings
4. **Better UX**: Displays "Image Not Available" placeholder instead of broken image icon
5. **Development Experience**: Cleaner console logs without image loading errors

## Key Features

- ✅ Handles missing images gracefully
- ✅ Supports SVG files and mixed image formats
- ✅ Prevents Next.js Image Optimization errors
- ✅ Automatic fallback to placeholder
- ✅ Single error attempt (no retry loops)
- ✅ Clean console output

## Usage

### Basic Example

```tsx
import { SafeImage } from "@/components/ui/safe-image";

<SafeImage
  src="/images/projects/my-project.jpg"
  alt="My Project"
  width={600}
  height={400}
  className="object-cover w-full h-full"
/>
```

### With SVG Images

```tsx
<SafeImage
  src="/images/icons/logo.svg"
  alt="Logo"
  width={100}
  height={100}
  unoptimized  // SVGs are automatically unoptimized
/>
```

### Blog Post Featured Image

```tsx
<SafeImage
  src={`/images/blog/${post.image}`}
  alt={post.title}
  width={1200}
  height={630}
  priority
  className="rounded-lg"
/>
```

## Props

Inherits all props from `next/image` including:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | string | Yes | Image source path |
| `alt` | string | Yes | Alternative text |
| `width` | number | Yes* | Image width (*unless fill=true) |
| `height` | number | Yes* | Image height (*unless fill=true) |
| `className` | string | No | CSS classes |
| `priority` | boolean | No | Load image eagerly (above the fold) |
| `fill` | boolean | No | Fill parent container |
| `unoptimized` | boolean | No | Skip optimization (auto-set for SVGs) |

## How It Works

1. **Initial Render**: Tries to load the image with Next.js Image component
2. **Error Detection**: onError handler catches failed loads
3. **Fallback State**: Sets `hasError` to true, triggering placeholder render
4. **SVG Detection**: Automatically sets `unoptimized={true}` for .svg files
5. **No Retry**: Once failed, component won't attempt to reload

## Troubleshooting

### Image Not Showing

- ✅ Check file exists in `public/` directory
- ✅ Verify path starts with `/` (e.g., `/images/...` not `images/...`)
- ✅ Confirm file extension matches actual file
- ✅ Check file permissions

### SVG Issues

- ✅ SafeImage automatically handles SVGs with `unoptimized={true}`
- ✅ No need to set `dangerouslyAllowSVG` config option
- ✅ SVG dimensions should be explicitly set via width/height props

### Placeholder Showing Instead of Image

- ✅ Open browser DevTools Network tab
- ✅ Check if image request returns 404
- ✅ Verify image path matches actual file location
- ✅ Clear Next.js cache: `rm -rf .next`

## Implementation Details

```tsx
"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export function SafeImage(props: ImageProps) {
  const [hasError, setHasError] = useState(false);
  
  // Auto-detect SVG files
  const isSvg = typeof props.src === "string" && props.src.endsWith(".svg");
  const shouldUnoptimize = props.unoptimized || isSvg;

  if (hasError) {
    return (
      <div className="flex items-center justify-center bg-muted text-muted-foreground">
        <span className="text-sm">Image Not Available</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      unoptimized={shouldUnoptimize}
      onError={() => setHasError(true)}
    />
  );
}
```

## Best Practices

1. **Always provide alt text** for accessibility
2. **Use priority for above-the-fold images** to improve LCP
3. **Specify dimensions** to prevent layout shift
4. **Use fill for responsive containers** when aspect ratio varies
5. **Test with missing images** to verify fallback behavior

## Related Components

- `next/image` - Base image component
- `ProjectCard` - Uses SafeImage for project thumbnails
- `BlogCard` - Uses SafeImage for post featured images

## Future Enhancements

- [ ] Custom fallback image prop
- [ ] Loading skeleton state
- [ ] Retry mechanism with exponential backoff
- [ ] Image blur placeholder support
- [ ] Analytics tracking for failed images
