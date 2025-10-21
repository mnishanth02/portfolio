import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { MDXRenderer } from "@/components/blog/MDXRenderer";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const ogImage = post.image
        ? `${siteConfig.url}/images/blog/${post.image}`
        : `${siteConfig.url}/og-image.svg`;

    return {
        title: `${post.title} | ${siteConfig.name}`,
        description: post.description,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${siteConfig.url}/blog/${post.slug}`,
            siteName: siteConfig.name,
            locale: "en_US",
            type: "article",
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author],
            tags: post.tags,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [ogImage],
        },
        alternates: {
            canonical: `${siteConfig.url}/blog/${post.slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // BlogPosting JSON-LD structured data
    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: post.image
            ? `${siteConfig.url}/images/blog/${post.image}`
            : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
            "@type": "Person",
            name: post.author,
            url: siteConfig.url,
        },
        publisher: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blog/${post.slug}`,
        },
        keywords: post.tags.join(", "),
    };

    return (
        <>
            {/* JSON-LD Structured Data */ }
            <script
                type="application/ld+json"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
                dangerouslySetInnerHTML={ { __html: JSON.stringify(blogPostingSchema) } }
            />

            <article className="py-12">
                <div className="container max-w-7xl">
                    {/* Back Button */ }
                    <Button variant="ghost" size="sm" className="mb-8" asChild>
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>

                    <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
                        {/* Main Content */ }
                        <div className="min-w-0 lg:col-span-2">
                            {/* Featured Image */ }
                            { post.image && (
                                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg border">
                                    <Image
                                        src={ `/images/blog/${post.image}` }
                                        alt={ post.title }
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            ) }

                            {/* Post Header */ }
                            <header className="mb-8">
                                {/* Category and Featured Badges */ }
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="capitalize">
                                        { post.category }
                                    </Badge>
                                    { post.featured && <Badge variant="default">Featured</Badge> }
                                </div>

                                {/* Title */ }
                                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                                    { post.title }
                                </h1>

                                {/* Meta Information */ }
                                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <time dateTime={ post.publishedAt }>
                                            { formatDate(post.publishedAt, "long") }
                                        </time>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{ post.readingTime } min read</span>
                                    </div>
                                </div>

                                {/* Description */ }
                                <p className="mt-6 text-xl text-muted-foreground">
                                    { post.description }
                                </p>

                                <Separator className="mt-8" />
                            </header>

                            {/* Post Content */ }
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                <MDXRenderer code={ post.body } />
                            </div>

                            {/* Tags */ }
                            { post.tags && post.tags.length > 0 && (
                                <footer className="mt-12 border-t pt-8">
                                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        { post.tags.map((tag) => (
                                            <Badge key={ tag } variant="secondary">
                                                { tag }
                                            </Badge>
                                        )) }
                                    </div>
                                </footer>
                            ) }
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
