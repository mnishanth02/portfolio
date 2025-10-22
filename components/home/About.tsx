import { Download, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { achievements } from "@/lib/constants";
import { SkillsWrapper } from "./SkillsWrapper";
import { Timeline } from "./Timeline";

/**
 * About Section Component
 * Personal narrative, skills, timeline, and achievements
 */
export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fullstack engineer passionate about building scalable web
            applications and pushing physical limits through marathon running
          </p>
        </div>

        {/* Personal Narrative */}
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mb-16">
          <p>
            I'm a fullstack software engineer with a passion for creating
            high-performance web applications that solve real-world problems.
            With expertise spanning React, Next.js, Node.js, and modern cloud
            infrastructure, I specialize in building scalable, user-centric
            solutions.
          </p>
          <p>
            Beyond the keyboard, I channel the same dedication into marathon
            running. Training for and racing marathons has taught me invaluable
            lessons about goal-setting, perseverance, and systematic improvement
            - principles I apply directly to software development. Whether it's
            optimizing code or shaving seconds off my race time, I'm driven by
            continuous improvement.
          </p>
          <p>
            This portfolio showcases my technical projects and running journey,
            demonstrating how discipline, data-driven decision making, and
            relentless iteration drive excellence in both domains.
          </p>
        </div>

        {/* Skills Section */}
        <SkillsWrapper />

        {/* Running Achievements */}
        <div className="mt-16 mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Trophy className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-center">
              Running Achievements
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.title}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {achievement.value}
                  </div>
                  <div className="font-semibold mb-1">{achievement.title}</div>
                  {achievement.description && (
                    <div className="text-sm text-muted-foreground">
                      {achievement.description}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dual Timeline - Career & Running */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <Timeline type="career" />
          <Timeline type="running" />
        </div>

        {/* Resume Download CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="/resume.txt" download>
              <Download className="mr-2 h-4 w-4" />
              Download Full Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
