import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TimelineEvent } from "@/types";

interface TimelineItemProps {
  event: TimelineEvent;
}

/**
 * TimelineItem Component
 *
 * Displays a single timeline event with icon, date, title, and description.
 * Used as a child component within the Timeline component.
 *
 * @component
 * @param {TimelineItemProps} props - Component configuration
 * @param {TimelineEvent} props.event - Timeline event data
 * @returns {JSX.Element} A timeline item with icon and content
 *
 * @example
 * ```tsx
 * <TimelineItem event={{
 *   date: "2024-03",
 *   title: "Senior Engineer",
 *   description: "Leading development",
 *   type: "career"
 * }} />
 * ```
 *
 * @remarks
 * - Event types: career (Briefcase icon), achievement (Trophy icon), education (GraduationCap icon)
 * - Icon size: h-6 w-6 for better visibility
 * - Card includes hover effect for better interactivity
 */
export function TimelineItem({ event }: TimelineItemProps) {
  const getIcon = (type: "career" | "achievement" | "education") => {
    switch (type) {
      case "career":
        return <Briefcase className="h-6 w-6" />;
      case "achievement":
        return <Trophy className="h-6 w-6" />;
      case "education":
        return <GraduationCap className="h-6 w-6" />;
    }
  };

  return (
    <div className="relative flex items-start gap-6">
      {/* Icon */}
      <div className="shrink-0 w-16 h-16 bg-card border-2 border-primary rounded-full flex items-center justify-center text-primary z-10">
        {getIcon(event.type)}
      </div>

      {/* Content */}
      <Card className="flex-1 hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground mb-1">{event.date}</div>
          <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
          <p className="text-muted-foreground">{event.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
