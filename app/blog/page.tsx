import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { BlogList } from "@/components/blog/BlogList";
import { siteConfig } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: `Blog | ${siteConfig.name}`,
    description:
        "Technical insights, running adventures, and lessons learned from building software and training for marathons.",
    keywords: [
        "software engineering blog",
        "fullstack development",
        "marathon training",
        "running blog",
        "tech articles",
    ],
    openGraph: {
        title: `Blog | ${siteConfig.name}`,
        description:
            "Technical insights, running adventures, and lessons learned from building software and training for marathons.",
        url: `${siteConfig.url}/blog`,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `Blog | ${siteConfig.name}`,
        description:
            "Technical insights, running adventures, and lessons learned from building software and training for marathons.",
    },
    alternates: {
        canonical: `${siteConfig.url}/blog`,
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <div className="min-h-screen py-20">
            <div className="container">
                {/* Page Header */ }
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                        Blog
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Exploring the intersection of software engineering and endurance
                        athletics. Technical insights, running adventures, and lessons
                        learned along the way.
                    </p>
                </div>

                {/* Popular Tags */ }
                { tags.length > 0 && (
                    <div className="mb-8">
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Popular Topics
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            { tags.slice(0, 10).map((tag) => (
                                <Badge key={ tag } variant="secondary" className="text-sm">
                                    { tag }
                                </Badge>
                            )) }
                        </div>
                    </div>
                ) }

                {/* Blog List with Search and Filters */ }
                <BlogList posts={ posts } />
            </div>
        </div>
    );
}
