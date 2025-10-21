"use client";

import type { Project } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface ProjectModalProps {
    project: Project;
    open: boolean;
    onClose: () => void;
}

/**
 * ProjectModal Component
 * Modal dialog for quick project preview
 */
export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
    return (
        <Dialog open={ open } onOpenChange={ onClose }>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{ project.title }</DialogTitle>
                    <DialogDescription>{ project.description }</DialogDescription>
                </DialogHeader>

                {/* Project Image */ }
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                    <SafeImage
                        src={ `/images/projects/${project.image}` }
                        alt={ project.title }
                        width={ 800 }
                        height={ 450 }
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Long Description */ }
                { project.longDescription && (
                    <div className="prose dark:prose-invert max-w-none">
                        <p>{ project.longDescription }</p>
                    </div>
                ) }

                {/* Technologies */ }
                <div>
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                        { project.technologies.map((tech) => (
                            <Badge key={ tech } variant="secondary">
                                { tech }
                            </Badge>
                        )) }
                    </div>
                </div>

                {/* Project Details */ }
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2 font-medium capitalize">
                            { project.category }
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Status:</span>
                        <span className="ml-2 font-medium capitalize">
                            { project.status }
                        </span>
                    </div>
                    { project.startDate && (
                        <div>
                            <span className="text-muted-foreground">Started:</span>
                            <span className="ml-2 font-medium">{ project.startDate }</span>
                        </div>
                    ) }
                    { project.endDate && (
                        <div>
                            <span className="text-muted-foreground">Completed:</span>
                            <span className="ml-2 font-medium">{ project.endDate }</span>
                        </div>
                    ) }
                </div>

                {/* Action Buttons */ }
                <div className="flex gap-4 pt-4">
                    { project.demoUrl && (
                        <Button asChild className="flex-1">
                            <Link
                                href={ project.demoUrl }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Demo
                            </Link>
                        </Button>
                    ) }
                    { project.githubUrl && (
                        <Button asChild variant="outline" className="flex-1">
                            <Link
                                href={ project.githubUrl }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                            </Link>
                        </Button>
                    ) }
                </div>

                {/* Learn More Button - Prominent CTA for detail page */ }
                <div className="pt-4">
                    <Button asChild variant="secondary" className="w-full">
                        <Link href={ `/projects/${project.id}` } onClick={ onClose }>
                            Learn More About This Project →
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
