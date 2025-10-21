import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle2 } from "lucide-react";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/constants";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

/**
 * Generate static paths for all projects
 */
export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

/**
 * Generate metadata for project page
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const title = `${project.title} | ${siteConfig.name}`;
    const description = project.description;
    const imageUrl = project.image
        ? `${siteConfig.url}/images/projects/${project.image}`
        : `${siteConfig.url}/og-image.png`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            url: `${siteConfig.url}/projects/${slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 675,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

/**
 * Project Detail Page
 * Comprehensive case study view with problem statement, technical approach, and outcomes
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Format date range
    const dateRange = project.startDate
        ? project.endDate
            ? `${project.startDate} - ${project.endDate}`
            : `${project.startDate} - Present`
        : "Date not specified";

    // JSON-LD structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        ...(project.demoUrl && { url: project.demoUrl }),
        ...(project.githubUrl && {
            codeRepository: project.githubUrl,
        }),
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        datePublished: project.startDate,
        ...(project.endDate && { dateModified: project.endDate }),
    };

    return (
        <>
            {/* JSON-LD Structured Data */ }
            <script
                type="application/ld+json"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe static JSON-LD data
                dangerouslySetInnerHTML={ { __html: JSON.stringify(jsonLd) } }
            />

            <article className="min-h-screen py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Breadcrumb Navigation */ }
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/#projects" className="hover:text-foreground transition-colors">
                                    Projects
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li aria-current="page" className="text-foreground">
                                { project.title }
                            </li>
                        </ol>
                    </nav>

                    {/* Back Button */ }
                    <Button variant="ghost" size="sm" asChild className="mb-6">
                        <Link href="/#projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>

                    {/* Project Header */ }
                    <header className="mb-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{ project.title }</h1>
                                <p className="text-xl text-muted-foreground">{ project.description }</p>
                            </div>
                            <Badge variant={ project.status === "completed" ? "default" : "secondary" } className="capitalize">
                                { project.status }
                            </Badge>
                        </div>

                        {/* Meta Information */ }
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{ dateRange }</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="capitalize">{ project.category }</span>
                            </div>
                        </div>

                        {/* Action Buttons */ }
                        <div className="flex gap-4">
                            { project.demoUrl && (
                                <Button asChild>
                                    <a href={ project.demoUrl } target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                </Button>
                            ) }
                            { project.githubUrl && (
                                <Button variant="outline" asChild>
                                    <a href={ project.githubUrl } target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        View Code
                                    </a>
                                </Button>
                            ) }
                        </div>
                    </header>

                    {/* Project Image */ }
                    { project.image && (
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12 bg-muted">
                            <Image
                                src={ `/images/projects/${project.image}` }
                                alt={ project.title }
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    ) }

                    {/* Technologies */ }
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            { project.technologies.map((tech) => (
                                <Badge key={ tech } variant="secondary" className="text-sm">
                                    { tech }
                                </Badge>
                            )) }
                        </div>
                    </section>

                    <Separator className="my-12" />

                    {/* Long Description */ }
                    { project.longDescription && (
                        <section className="mb-12">
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">{ project.longDescription }</p>
                            </div>
                        </section>
                    ) }

                    {/* Problem Statement */ }
                    { project.problemStatement && (
                        <section className="mb-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Problem Statement</CardTitle>
                                    <CardDescription>The challenge we set out to solve</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed">{ project.problemStatement }</p>
                                </CardContent>
                            </Card>
                        </section>
                    ) }

                    {/* Technical Approach */ }
                    { project.technicalApproach && (
                        <section className="mb-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Technical Approach</CardTitle>
                                    <CardDescription>How we solved the problem</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="leading-relaxed whitespace-pre-line">{ project.technicalApproach }</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    ) }

                    {/* Challenges */ }
                    { project.challenges && project.challenges.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">Challenges Overcome</h2>
                            <div className="space-y-4">
                                { project.challenges.map((challenge) => (
                                    <Card key={ challenge }>
                                        <CardContent className="pt-6">
                                            <div className="flex gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <p className="leading-relaxed">{ challenge }</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )) }
                            </div>
                        </section>
                    ) }

                    {/* Outcomes */ }
                    { project.outcomes && project.outcomes.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">Outcomes & Impact</h2>
                            <div className="space-y-4">
                                { project.outcomes.map((outcome) => (
                                    <Card key={ outcome }>
                                        <CardContent className="pt-6">
                                            <div className="flex gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                                <p className="leading-relaxed">{ outcome }</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )) }
                            </div>
                        </section>
                    ) }

                    {/* Metrics */ }
                    { project.metrics && Object.keys(project.metrics).length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                { project.metrics.usersImpacted && (
                                    <Card>
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-4xl font-bold text-primary mb-2">
                                                { project.metrics.usersImpacted.toLocaleString() }+
                                            </div>
                                            <p className="text-muted-foreground">Users Impacted</p>
                                        </CardContent>
                                    </Card>
                                ) }
                                { project.metrics.performanceImprovement && (
                                    <Card>
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-4xl font-bold text-primary mb-2">
                                                { project.metrics.performanceImprovement }
                                            </div>
                                            <p className="text-muted-foreground">Performance Improvement</p>
                                        </CardContent>
                                    </Card>
                                ) }
                                { project.metrics.codeReduction && (
                                    <Card>
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-4xl font-bold text-primary mb-2">
                                                { project.metrics.codeReduction }
                                            </div>
                                            <p className="text-muted-foreground">Code Reduction</p>
                                        </CardContent>
                                    </Card>
                                ) }
                            </div>
                        </section>
                    ) }

                    <Separator className="my-12" />

                    {/* Call to Action */ }
                    <section className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
                        <p className="text-muted-foreground mb-6">
                            I'm always open to discussing new projects and opportunities.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/#contact">Get in Touch</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/#projects">View More Projects</Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </article>
        </>
    );
}
