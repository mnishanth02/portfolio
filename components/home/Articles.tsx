import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ArticlesCarousel } from "@/components/home/ArticlesCarousel";
import { Button } from "@/components/ui/button";
import { getRecentPosts } from "@/lib/mdx";

/**
 * Articles Component
 *
 * Displays a horizontal carousel of the 3 most recent blog articles.
 * Features smooth scroll navigation with arrow controls and touch gestures.
 *
 * @component
 * @returns {JSX.Element} A server-rendered articles section with carousel
 *
 * @example
 * ```tsx
 * // Display recent articles carousel
 * <Articles />
 * ```
 *
 * @remarks
 * - Fetches 3 most recent posts using `getRecentPosts(3)` from lib/mdx
 * - Passes posts to ArticlesCarousel client component for horizontal scrolling
 * - Includes "View All Posts" CTA button linking to /blog
 * - Shows empty state message if no posts available
 * - Section uses semantic HTML with proper ARIA labels
 */
export function Articles() {
  const posts = getRecentPosts(3);

  if (posts.length === 0) {
    return (
      <section id="articles" className="py-16" aria-label="Recent articles">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Recent Articles
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Blog posts coming soon! Check back later for technical insights
              and running adventures.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-16" aria-label="Recent articles">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Recent Articles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Exploring the intersection of software engineering and endurance
            athletics
          </p>
        </div>

        {/* Articles Carousel */}
        <ArticlesCarousel posts={posts} />

        {/* View All Posts CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="group">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
