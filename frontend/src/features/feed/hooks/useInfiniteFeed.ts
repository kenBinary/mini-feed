import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVideos } from "../api/getVideos";
import type { FeedResponse } from "../../../types/feed";

export const useInfiniteFeed = () => {
  return useInfiniteQuery<FeedResponse>({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => fetchVideos(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
