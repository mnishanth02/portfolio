import { VideoTabs } from "@/components/home/VideoTabs";
import { videosByCategory } from "@/lib/constants";

/**
 * VideosWrapper Component
 *
 * Server component wrapper for tabbed videos section.
 * Fetches categorized video data and passes to VideoTabs client component.
 *
 * @component
 * @returns {JSX.Element | null} A server-rendered videos section with tabbed interface or null if no videos
 *
 * @example
 * ```tsx
 * <VideosWrapper />
 * ```
 *
 * @remarks
 * - Server Component: Fetches data from `lib/constants.ts`
 * - Passes categorized videos (running/coding/talks) to VideoTabs client component
 * - Returns null if no videos are available across all categories
 * - Section uses bg-muted/50 for subtle background differentiation
 * - Tabbed interface implemented in VideoTabs.tsx (client component)
 */
export function VideosWrapper() {
  const { running, coding, talks } = videosByCategory;
  const totalVideos = running.length + coding.length + talks.length;

  if (totalVideos === 0) {
    return null;
  }

  return (
    <section
      id="videos"
      className="py-16 bg-muted/50"
      aria-label="Featured videos"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Videos
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Training content, technical deep-dives, and talks exploring the
            intersection of software engineering and endurance athletics
          </p>
        </div>

        {/* Tabbed Videos Interface */}
        <VideoTabs
          runningVideos={running}
          codingVideos={coding}
          talksVideos={talks}
        />
      </div>
    </section>
  );
}
