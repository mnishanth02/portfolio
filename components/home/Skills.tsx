import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/lib/constants";

/**
 * Skills Component
 *
 * Displays technical skills organized by category (Frontend, Backend, DevOps, Additional)
 * with proficiency levels and years of experience indicators.
 *
 * @component
 * @returns {JSX.Element} A server-rendered skills section with categorized skill cards
 *
 * @example
 * ```tsx
 * <Skills />
 * ```
 *
 * @remarks
 * - Uses skills data from `lib/constants.ts`
 * - Proficiency levels: expert (primary badge), advanced (secondary badge), intermediate/learning (outline badge)
 * - Displays years of experience when available
 * - Includes legend explaining proficiency levels
 * - Responsive: 2-column grid on md+ breakpoints
 * - Accessibility: Wrapped in semantic `<section>` with aria-label
 */
export function Skills() {
  // Helper function to get badge variant based on proficiency
  const getProficiencyColor = (
    proficiency: "expert" | "advanced" | "intermediate" | "learning",
  ) => {
    switch (proficiency) {
      case "expert":
        return "default"; // Primary color
      case "advanced":
        return "secondary";
      case "intermediate":
        return "outline";
      case "learning":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <section className="py-16" aria-label="Technical Skills">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skillCategory) => (
          <Card key={skillCategory.category}>
            <CardContent className="pt-6 pb-6">
              <h4 className="text-lg font-semibold text-primary mb-4">
                {skillCategory.category}
              </h4>
              <div className="space-y-3">
                {skillCategory.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-4 py-1"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={getProficiencyColor(skill.proficiency)}
                        className="capitalize min-w-[90px] justify-center"
                      >
                        {skill.proficiency}
                      </Badge>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    {skill.yearsOfExperience && (
                      <span className="text-sm text-muted-foreground shrink-0">
                        {skill.yearsOfExperience}+ yrs
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Proficiency Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="h-5 w-5 p-0" />
          <span>Expert (5+ years or deep expertise)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-5 w-5 p-0" />
          <span>Advanced (3-4 years, production experience)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="h-5 w-5 p-0" />
          <span>Intermediate (1-2 years, growing proficiency)</span>
        </div>
      </div>
    </section>
  );
}
