import { Video } from "../../generated/client";

export interface GetVideosResult {
  data: Video[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
