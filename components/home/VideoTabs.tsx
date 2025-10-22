"use client";

import { Code2, MessageSquare, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FeaturedVideo } from "@/types";
import { VideoCard } from "./VideoCard";

interface VideoTabsProps {
    runningVideos: FeaturedVideo[];
    codingVideos: FeaturedVideo[];
    talksVideos: FeaturedVideo[];
}

/**
 * VideoTabs Component
 *
 * Client component providing tabbed interface for categorized videos.
 * Features Running, Coding, and Talks categories with video counts.
 *
 * @component
 * @param {VideoTabsProps} props - Component props
 * @param {FeaturedVideo[]} props.runningVideos - Running category videos
 * @param {FeaturedVideo[]} props.codingVideos - Coding/tech category videos
 * @param {FeaturedVideo[]} props.talksVideos - Talks/presentations category videos
 * @returns {JSX.Element} Tabbed interface with video grids
 *
 * @example
 * ```tsx
 * <VideoTabs
 *   runningVideos={running}
 *   codingVideos={coding}
 *   talksVideos={talks}
 * />
 * ```
 *
 * @remarks
 * - Default tab: "running" (per brand identity - runner first)
 * - Tab labels include video counts (e.g., "Running (5)")
 * - Icons: Trophy (running), Code2 (coding), MessageSquare (talks)
 * - Responsive: Full labels on md+, icon-only on mobile with aria-label
 * - Grid: 1 col (mobile), 2 cols (md), 3 cols (lg)
 * - Keyboard navigation: Tab key between triggers, Arrow keys switch tabs
 */
export function VideoTabs({
    runningVideos,
    codingVideos,
    talksVideos,
}: VideoTabsProps) {
    return (
        <Tabs defaultValue="running" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                {/* Running Tab */ }
                <TabsTrigger value="running" className="gap-2">
                    <Trophy className="h-4 w-4" />
                    <span className="hidden md:inline">Running</span>
                    <Badge variant="secondary" className="ml-1 hidden md:inline-flex">
                        { runningVideos.length }
                    </Badge>
                    <span className="sr-only">
                        Running tab, { runningVideos.length } videos
                    </span>
                </TabsTrigger>

                {/* Coding Tab */ }
                <TabsTrigger value="coding" className="gap-2">
                    <Code2 className="h-4 w-4" />
                    <span className="hidden md:inline">Coding</span>
                    <Badge variant="secondary" className="ml-1 hidden md:inline-flex">
                        { codingVideos.length }
                    </Badge>
                    <span className="sr-only">
                        Coding tab, { codingVideos.length } videos
                    </span>
                </TabsTrigger>

                {/* Talks Tab */ }
                <TabsTrigger value="talks" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden md:inline">Talks</span>
                    <Badge variant="secondary" className="ml-1 hidden md:inline-flex">
                        { talksVideos.length }
                    </Badge>
                    <span className="sr-only">
                        Talks tab, { talksVideos.length } videos
                    </span>
                </TabsTrigger>
            </TabsList>

            {/* Running Tab Content */ }
            <TabsContent value="running" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    { runningVideos.map((video) => (
                        <VideoCard key={ video.id } video={ video } />
                    )) }
                </div>
                { runningVideos.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">
                        No running videos available yet.
                    </p>
                ) }
            </TabsContent>

            {/* Coding Tab Content */ }
            <TabsContent value="coding" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    { codingVideos.map((video) => (
                        <VideoCard key={ video.id } video={ video } />
                    )) }
                </div>
                { codingVideos.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">
                        No coding videos available yet.
                    </p>
                ) }
            </TabsContent>

            {/* Talks Tab Content */ }
            <TabsContent value="talks" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    { talksVideos.map((video) => (
                        <VideoCard key={ video.id } video={ video } />
                    )) }
                </div>
                { talksVideos.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">
                        No talks videos available yet.
                    </p>
                ) }
            </TabsContent>
        </Tabs>
    );
}
