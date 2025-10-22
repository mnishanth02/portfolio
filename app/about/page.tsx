import { Code2, Lightbulb, Shield, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { professionalPhilosophy, siteConfig } from "@/lib/constants";

/**
 * About Page SEO Metadata
 */
export const metadata: Metadata = {
    title: `About | ${siteConfig.name}`,
    description:
        "Learn about my engineering philosophy, approach to software development, and the principles that guide my work. User-centric design, data-driven iteration, and systematic excellence.",
    keywords: [
        "engineering philosophy",
        "software development principles",
        "user-centric design",
        "code quality",
        "best practices",
        "fullstack engineer",
        "technical leadership",
    ],
    openGraph: {
        title: `About | ${siteConfig.name}`,
        description:
            "Engineering philosophy and principles that guide my approach to building exceptional software.",
        url: `${siteConfig.url}/about`,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: `About | ${siteConfig.name}`,
        description:
            "Engineering philosophy and principles that guide my approach to building exceptional software.",
    },
};

/**
 * About Page Component
 *
 * Dedicated page for engineering philosophy, values, and technical approach.
 * Relocated from homepage to reduce vertical scroll and provide focused content.
 *
 * @returns {JSX.Element} About page with comprehensive philosophy section
 */
export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */ }
            <section className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Lightbulb className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            { professionalPhilosophy.title }
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        The principles and values that guide my approach to building
                        exceptional software and leading technical teams.
                    </p>
                </div>
            </section>

            {/* Core Principles */ }
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
                        Core Principles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        { professionalPhilosophy.principles.map((principle) => (
                            <Card key={ principle.title } className="h-full">
                                <CardHeader>
                                    <CardTitle className="text-xl">{ principle.title }</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-foreground/80">
                                        { principle.description }
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )) }
                    </div>
                </div>
            </section>

            {/* Development Approach */ }
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
                        My Development Approach
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Research & Planning */ }
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Code2 className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Research & Planning</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Before writing code, I invest time in understanding the problem
                                space, evaluating technical options, and designing scalable
                                architecture. Documentation and ADRs (Architecture Decision
                                Records) ensure decisions are transparent and reversible.
                            </p>
                        </div>

                        {/* Iterative Development */ }
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Iterative Development</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Ship early, ship often. I build MVPs to validate assumptions,
                                gather feedback, and iterate rapidly. Continuous deployment
                                pipelines enable confident releases multiple times per day while
                                maintaining stability.
                            </p>
                        </div>

                        {/* Collaborative Excellence */ }
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">
                                    Collaborative Excellence
                                </h3>
                            </div>
                            <p className="text-muted-foreground">
                                Great software is built by teams, not individuals. I prioritize
                                code reviews, pair programming, and knowledge sharing. Clear
                                communication and comprehensive documentation empower the entire
                                team.
                            </p>
                        </div>

                        {/* Quality Assurance */ }
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Quality Assurance</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Automated testing is non-negotiable. Unit tests validate logic,
                                integration tests verify workflows, and E2E tests ensure user
                                flows work. Lighthouse audits, type safety, and linting catch
                                issues before they reach production.
                            </p>
                        </div>

                        {/* Performance Obsession */ }
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Performance Obsession</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Every millisecond matters. I optimize bundle sizes, leverage
                                caching strategies, implement lazy loading, and monitor Core Web
                                Vitals. Performance is a feature, not an afterthought.
                            </p>
                        </div>

                        {/* Continuous Learning */ }
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Lightbulb className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Continuous Learning</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Technology evolves rapidly. I stay current through technical
                                blogs, open source contributions, and building side projects.
                                What I learn today becomes best practices I teach tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marathon Mindset */ }
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
                        The Marathon Mindset
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Training for marathons has profoundly shaped how I approach
                            software engineering. Both disciplines require:
                        </p>
                        <ul>
                            <li>
                                <strong>Consistent, incremental progress</strong> - Small daily
                                improvements compound into remarkable results
                            </li>
                            <li>
                                <strong>Data-driven optimization</strong> - Track metrics,
                                identify bottlenecks, and iterate systematically
                            </li>
                            <li>
                                <strong>Embrace discomfort</strong> - Growth happens outside the
                                comfort zone, whether it's learning a new framework or pushing
                                through mile 20
                            </li>
                            <li>
                                <strong>Systematic recovery</strong> - Sustainable performance
                                requires rest, reflection, and avoiding burnout
                            </li>
                            <li>
                                <strong>Goal-oriented execution</strong> - Clear objectives
                                (e.g., BQ time, 95+ Lighthouse score) drive focused effort
                            </li>
                        </ul>
                        <p>
                            This cross-domain discipline creates a multiplier effect: the grit
                            from marathon training fuels technical perseverance, while
                            engineering's analytical mindset optimizes athletic performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */ }
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        Let's Build Something Great
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        If these principles resonate with you, I'd love to collaborate on
                        your next project or discuss technical challenges you're facing.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button asChild>
                            <Link href="/#contact">Get in Touch</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/#projects">View Projects</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
