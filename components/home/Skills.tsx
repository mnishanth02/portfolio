import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/lib/constants";

/**
 * Skills Component
 * Display technical skills organized by category with proficiency levels
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
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-8">Technical Skills</h3>
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
    </div>
  );
}
