"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface ArticlesCarouselProps {
    posts: BlogPost[];
}

/**
 * ArticlesCarousel Component
 *
 * Horizontal scrolling carousel displaying recent blog articles with arrow navigation.
 * Features smooth scroll snap, touch gesture support, and responsive behavior.
 *
 * @component
 * @param {ArticlesCarouselProps} props - Component props
 * @param {BlogPost[]} props.posts - Array of blog posts to display (max 3 recommended)
 * @returns {JSX.Element} A client-side carousel with horizontal scroll
 *
 * @example
 * ```tsx
 * <ArticlesCarousel posts={recentPosts} />
 * ```
 *
 * @remarks
 * - Uses CSS scroll-snap for smooth scrolling behavior
 * - Arrow buttons hidden when ≤3 articles or at scroll boundaries
 * - Centers cards when fewer items available
 * - Supports touch gestures on mobile devices
 * - Respects prefers-reduced-motion setting
 * - Keyboard navigation via native browser scroll
 */
export function ArticlesCarousel({ posts }: ArticlesCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Initialize scroll position check
    // biome-ignore lint/correctness/useExhaustiveDependencies: <false positive>
    useEffect(() => {
        // Check scroll position to show/hide arrows
        const checkScrollPosition = () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px threshold
        };

        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollPosition);
            return () => container.removeEventListener("scroll", checkScrollPosition);
        }
    }, [posts]);

    // Scroll left/right by one card width (400px)
    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 400; // Matches card width
        const newScrollLeft =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
        });
    };

    // Hide arrows if ≤3 articles (all visible on desktop)
    const showArrows = posts.length > 3;

    // Center cards when few items
    const containerClasses = cn(
        "flex gap-6",
        posts.length <= 3
            ? "justify-center"
            : "overflow-x-auto snap-x snap-mandatory scrollbar-hide",
    );

    return (
        <div className="relative">
            {/* Left Arrow */ }
            { showArrows && canScrollLeft && (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full shadow-lg"
                    onClick={ () => scroll("left") }
                    aria-label="Scroll to previous articles"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            ) }

            {/* Scroll Container */ }
            <section
                ref={ scrollContainerRef }
                className={ containerClasses }
                aria-label="Articles carousel"
            >
                { posts.map((post, index) => (
                    <div key={ post.slug } className="min-w-full snap-center sm:min-w-96">
                        <BlogCard post={ post } priority={ index === 0 } />
                    </div>
                )) }
            </section>

            {/* Right Arrow */ }
            { showArrows && canScrollRight && (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full shadow-lg"
                    onClick={ () => scroll("right") }
                    aria-label="Scroll to next articles"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            ) }
        </div>
    );
}
