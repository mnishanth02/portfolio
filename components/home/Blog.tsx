import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { getPostsByCategory, getRecentPosts } from "@/lib/mdx";

interface BlogSectionProps {
  showFitnessFirst?: boolean;
  limit?: number;
}

export function Blog({ showFitnessFirst = true, limit = 4 }: BlogSectionProps) {
  let posts = getRecentPosts(limit);

  // If showFitnessFirst is true, prioritize fitness content for US2
  if (showFitnessFirst) {
    const fitnessPosts = getPostsByCategory("fitness");
    const otherPosts = getRecentPosts(20).filter(
      (post) => post.category !== "fitness",
    );

    // Mix: Show 2 fitness posts first, then fill with other recent posts
    posts = [...fitnessPosts.slice(0, 2), ...otherPosts].slice(0, limit);
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Articles
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
    <section id="blog" className="py-20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Exploring the intersection of software engineering and endurance
            athletics
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>

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
