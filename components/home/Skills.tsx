import { skills } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

/**
 * Skills Component
 * Display technical skills organized by category
 */
export function Skills() {
    return (
        <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                { skills.map((skillCategory) => (
                    <div key={ skillCategory.category } className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">
                            { skillCategory.category }
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            { skillCategory.skills.map((skill) => (
                                <Badge key={ skill } variant="secondary" className="text-sm">
                                    { skill }
                                </Badge>
                            )) }
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
