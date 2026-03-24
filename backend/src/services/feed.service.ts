import { FeedRepository } from "../repositories/feed.repository.js";
import { PaginationParams, PaginatedResult } from "../types/pagination.js";
import { Video } from "../../generated/client";

export class FeedService {
  private repository = new FeedRepository();

  async getFeed(params: PaginationParams): Promise<PaginatedResult<Video>> {
    const page = params.page > 0 ? params.page : 1;
    const limit = params.limit > 0 ? params.limit : 10;

    const result = await this.repository.getVideos({ page, limit });

    return {
      data: result.data,
      metadata: {
        totalItems: result.totalItems,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        limit: limit,
      },
    };
  }
}
