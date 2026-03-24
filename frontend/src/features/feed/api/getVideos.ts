import type { FeedResponse } from "../../../types/feed";

export const fetchVideos = async (page: number): Promise<FeedResponse> => {
  const domain = import.meta.env.VITE_API_DOMAIN || "http://localhost:3000";

  const response = await fetch(`${domain}/feed?page=${page}&limit=4`);

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  return response.json();
};
