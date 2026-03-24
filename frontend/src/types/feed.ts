export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
}

export interface FeedMetadata {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface FeedResponse {
  data: Video[];
  metadata: FeedMetadata;
}
