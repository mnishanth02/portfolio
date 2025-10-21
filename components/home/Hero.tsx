"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/lib/constants";
import { ArrowRight, FileDown } from "lucide-react";

/**
 * Hero Section Component
 * First impression with headshot, name, tagline, and CTAs
 */
export function Hero() {
    const handleScrollTo = (sectionId: string) => {
        const element = document.querySelector(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center px-4 py-20"
        >
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Content */ }
                    <div className="order-2 md:order-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Hi, I'm{ " " }
                            <span className="text-primary">{ siteConfig.name }</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
                            Fullstack Engineer & Marathon Runner
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                            Building high-performance web applications while chasing personal
                            records on the track. Exploring the intersection of software
                            engineering and endurance athletics.
                        </p>

                        {/* CTA Buttons */ }
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                            <Button
                                size="lg"
                                onClick={ () => handleScrollTo("#projects") }
                                className="group"
                            >
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={ () => handleScrollTo("#contact") }
                            >
                                Contact Me
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                asChild
                            >
                                <a href="/resume.txt" download>
                                    <FileDown className="mr-2 h-4 w-4" />
                                    Resume
                                </a>
                            </Button>
                        </div>

                        {/* Social Links */ }
                        <div className="flex justify-center md:justify-start">
                            <SocialLinks />
                        </div>
                    </div>

                    {/* Headshot Image */ }
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            <Image
                                src="/images/headshot.svg"
                                alt={ `${siteConfig.name} - Professional headshot` }
                                width={ 400 }
                                height={ 400 }
                                priority
                                className="rounded-full object-cover border-4 border-primary/20 shadow-2xl"
                            />
                            {/* Decorative gradient circle */ }
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
