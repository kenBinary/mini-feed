import { Video } from "../../generated/client.js";

export interface GetVideosResult {
  data: Video[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
