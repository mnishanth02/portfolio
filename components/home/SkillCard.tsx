import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Skill } from "@/types";

interface SkillCardProps {
    skill: Skill;
}

/**
 * SkillCard Component
 *
 * Displays a single skill with proficiency level and years of experience.
 * Features color-coded badges based on proficiency level.
 *
 * @component
 * @param {SkillCardProps} props - Component configuration
 * @param {Skill} props.skill - Skill data with name, proficiency, and experience
 * @returns {JSX.Element} A skill card with badge and experience indicator
 *
 * @example
 * ```tsx
 * <SkillCard skill={{
 *   name: "React",
 *   proficiency: "expert",
 *   yearsOfExperience: 5
 * }} />
 * ```
 *
 * @remarks
 * - Proficiency levels: expert (primary badge), advanced (secondary badge), intermediate/learning (outline badge)
 * - Shows years of experience when available
 * - Includes hover effect for better interactivity
 */
export function SkillCard({ skill }: SkillCardProps) {
    const getProficiencyColor = (
        proficiency: "expert" | "advanced" | "intermediate" | "learning",
    ) => {
        switch (proficiency) {
            case "expert":
                return "default"; // Primary color
            case "advanced":
                return "secondary";
            case "intermediate":
            case "learning":
                return "outline";
            default:
                return "secondary";
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between gap-4 py-1">
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={ getProficiencyColor(skill.proficiency) }
                            className="capitalize min-w-24 justify-center"
                        >
                            { skill.proficiency }
                        </Badge>
                        <span className="font-medium">{ skill.name }</span>
                    </div>
                    { skill.yearsOfExperience && (
                        <span className="text-sm text-muted-foreground shrink-0">
                            { skill.yearsOfExperience }+ yrs
                        </span>
                    ) }
                </div>
            </CardContent>
        </Card>
    );
}
