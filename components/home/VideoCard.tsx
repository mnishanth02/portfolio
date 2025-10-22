import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import type { FeaturedVideo } from "@/types";

interface VideoCardProps {
  video: FeaturedVideo;
}

/**
 * VideoCard Component
 *
 * Displays an individual YouTube video with title and description.
 * Extracted from Videos.tsx to support tabbed interface.
 *
 * @component
 * @param {VideoCardProps} props - Component props
 * @param {FeaturedVideo} props.video - Video data with YouTube ID, title, description
 * @returns {JSX.Element} Video card with YouTube embed
 *
 * @example
 * ```tsx
 * <VideoCard video={video} />
 * ```
 *
 * @remarks
 * - Uses YouTubeEmbed component with lazy loading
 * - Displays title and optional description below embed
 * - Space-y-3 for consistent vertical spacing
 */
export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="space-y-3">
      <YouTubeEmbed id={video.id} title={video.title} />
      <div>
        <h3 className="font-semibold">{video.title}</h3>
        {video.description && (
          <p className="text-sm text-muted-foreground">{video.description}</p>
        )}
      </div>
    </div>
  );
}
