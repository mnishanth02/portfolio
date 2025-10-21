import { timeline } from "@/lib/constants";
import { generateUniqueKey } from "@/lib/utils";
import { Briefcase, Trophy, GraduationCap } from "lucide-react";

/**
 * Timeline Component
 * Display career milestones and achievements
 */
export function Timeline() {
    const getIcon = (type: "career" | "achievement" | "education") => {
        switch (type) {
            case "career":
                return <Briefcase className="h-5 w-5" />;
            case "achievement":
                return <Trophy className="h-5 w-5" />;
            case "education":
                return <GraduationCap className="h-5 w-5" />;
        }
    };

    return (
        <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Career Timeline</h3>
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */ }
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

                {/* Timeline events */ }
                <div className="space-y-8">
                    { timeline.map((event, index) => (
                        <div
                            key={ generateUniqueKey() }
                            className="relative flex items-start md:items-center gap-6"
                        >
                            {/* Icon */ }
                            <div className="shrink-0 w-16 h-16 md:absolute md:left-1/2 md:-translate-x-1/2 bg-card border-2 border-primary rounded-full flex items-center justify-center text-primary z-10">
                                { getIcon(event.type) }
                            </div>

                            {/* Content */ }
                            <div
                                className={ `flex-1 bg-card p-6 rounded-lg border shadow-sm ${index % 2 === 0 ? "md:mr-auto md:w-[calc(50%-3rem)]" : "md:ml-auto md:w-[calc(50%-3rem)]"
                                    }` }
                            >
                                <div className="text-sm text-muted-foreground mb-1">
                                    { event.date }
                                </div>
                                <h4 className="text-lg font-semibold mb-2">{ event.title }</h4>
                                <p className="text-muted-foreground">{ event.description }</p>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}
