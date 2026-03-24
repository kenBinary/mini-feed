import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { Video } from "../../../types/feed";
import audioLogo from "../../../assets/feed/audio-svgrepo-com.svg";
import muteLogo from "../../../assets/feed/mute-svgrepo-com.svg";

interface VideoPlayerProps {
  video: Video;
}

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const { ref: playRef, inView: playInView } = useInView({
    threshold: 0.8,
  });

  const setRefs = (element: HTMLDivElement | null) => {
    playRef(element);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    if (playInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Playback prevented by browser: ", error);
        });
      }

      const currentFeedItem = videoRef.current.closest(
        "[data-feed-item='true']",
      );
      const nextFeedItem =
        currentFeedItem?.nextElementSibling as HTMLElement | null;
      const nextVideo = nextFeedItem?.querySelector("video") as
        | HTMLVideoElement
        | undefined;

      if (nextVideo && nextVideo.preload !== "auto") {
        nextVideo.preload = "auto";
        nextVideo.load();
      }
    } else {
      videoRef.current.pause();
    }
  }, [playInView]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <div
      ref={setRefs}
      className="relative h-screen w-full snap-start snap-always bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        preload="metadata"
        loop
        muted={isMuted}
        playsInline
        className="h-full w-full object-cover overflow-hidden"
        onClick={toggleMute}
      />

      <div className="absolute bottom-10 left-0 right-0 p-4 bg-linear-to-t  flex flex-col pointer-events-none">
        <h2 className="text-white text-xl font-bold mb-2">{video.title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="btn btn-circle btn-sm btn-ghost text-white pointer-events-auto"
          >
            {isMuted ? (
              <img src={audioLogo} alt="Unmute" className="size-16" />
            ) : (
              <img src={muteLogo} alt="Mute" className="size-16" />
            )}
          </button>
          <span className="text-sm text-gray-300 pointer-events-auto">
            Tap anywhere to {isMuted ? "unmute" : "mute"}
          </span>
        </div>
      </div>
    </div>
  );
};
