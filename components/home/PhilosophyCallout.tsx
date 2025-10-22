import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * PhilosophyCallout Component
 *
 * Call-to-action card inviting users to learn more about engineering philosophy.
 * Links to the dedicated /about page.
 *
 * @component
 * @returns {JSX.Element} CTA card for philosophy section
 *
 * @example
 * ```tsx
 * <PhilosophyCallout />
 * ```
 *
 * @remarks
 * - Optional component for homepage integration
 * - Reduces homepage length while maintaining discoverability
 * - Positioned after main content sections (e.g., after Contact)
 * - Uses subtle background with hover effect
 */
export function PhilosophyCallout() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                My Engineering Philosophy
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Curious about the principles that guide my work? Learn about my
              approach to building exceptional software.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              From user-centric design to data-driven iteration, discover the
              values and methodologies that shape every project I work on—and
              how marathon training influences my engineering mindset.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="group">
              <Link href="/about">
                Learn More About My Philosophy
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
