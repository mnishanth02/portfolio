import { featuredVideos } from "@/lib/constants";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";

export function Videos() {
    if (featuredVideos.length === 0) {
        return null;
    }

    return (
        <section id="videos" className="py-20 bg-muted/50">
            <div className="container">
                {/* Section Header */ }
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Training Videos
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Follow my running journey on YouTube - training tips, race recaps,
                        and the intersection of software and endurance athletics
                    </p>
                </div>

                {/* Videos Grid */ }
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    { featuredVideos.map((video) => (
                        <div key={ video.id } className="space-y-3">
                            <YouTubeEmbed id={ video.id } title={ video.title } />
                            <div>
                                <h3 className="font-semibold">{ video.title }</h3>
                                { video.description && (
                                    <p className="text-sm text-muted-foreground">
                                        { video.description }
                                    </p>
                                ) }
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </section>
    );
}
