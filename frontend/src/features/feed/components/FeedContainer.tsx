import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteFeed } from "../hooks/useInfiniteFeed";
import { VideoPlayer } from "./VideoPlayer";

export const FeedContainer = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteFeed();

  const { ref: nearEndRef, inView: nearEndInView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (nearEndInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [nearEndInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white p-4 text-center">
        <div>
          <p className="text-xl font-bold mb-2">Failed to load feed</p>
          <p className="text-sm text-gray-400">{error?.message}</p>
        </div>
      </div>
    );
  }

  const videos = data?.pages.flatMap((page) => page.data) || [];
  const prefetchTriggerIndex = Math.max(videos.length - 2, 0);

  if (videos.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <p>No videos found.</p>
      </div>
    );
  }

  return (
    <div className="mockup-phone ">
      <div className="mockup-phone-camera"></div>

      <div className="mockup-phone-display overflow-y-auto snap-y snap-mandatory bg-black [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {videos.map((video, index) => (
          <div
            key={video.id + video.createdAt + index}
            ref={index === prefetchTriggerIndex ? nearEndRef : undefined}
            data-feed-item="true"
          >
            <VideoPlayer video={video} />
          </div>
        ))}

        <div className="h-1 w-full bg-black" aria-hidden="true" />
      </div>
    </div>
  );
};
