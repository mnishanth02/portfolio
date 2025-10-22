import { Briefcase, Trophy } from "lucide-react";
import { careerMilestones, runningMilestones } from "@/lib/constants";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
    type: "career" | "running";
}

/**
 * Timeline Component
 *
 * Displays a vertical timeline of career milestones or running achievements.
 * Features icon indicators for event types and chronological ordering.
 *
 * @component
 * @param {TimelineProps} props - Component configuration
 * @param {"career" | "running"} props.type - Type of timeline to display
 * @returns {JSX.Element} A server-rendered timeline section
 *
 * @example
 * ```tsx
 * // Career timeline
 * <Timeline type="career" />
 *
 * // Running timeline
 * <Timeline type="running" />
 * ```
 *
 * @remarks
 * - Uses careerMilestones or runningMilestones data from `lib/constants.ts`
 * - Event types: career (Briefcase icon), running (Trophy icon)
 * - Responsive: vertical layout on all breakpoints
 * - Accessibility: Wrapped in semantic `<section>` with aria-label
 */
export function Timeline({ type }: TimelineProps) {
    const milestones = type === "career" ? careerMilestones : runningMilestones;
    const sectionTitle =
        type === "career" ? "Career Timeline" : "Running Journey";
    const Icon = type === "career" ? Briefcase : Trophy;

    return (
        <section className="py-16" aria-label={ sectionTitle }>
            <div className="mb-8 flex items-center justify-center gap-3">
                <Icon className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">{ sectionTitle }</h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */ }
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                {/* Timeline events */ }
                <div className="space-y-8">
                    { milestones.map((event, index) => (
                        <TimelineItem key={ `${event.date}-${index}` } event={ event } />
                    )) }
                </div>
            </div>
        </section>
    );
}
