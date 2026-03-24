import { Video } from "../../generated/client";
import { prisma } from "../config/db";
import { GetVideosResult } from "../types/feed.repository";
import { PaginationParams } from "../types/pagination";

export class FeedRepository {
  async getVideos({ page, limit }: PaginationParams): Promise<GetVideosResult> {
    const skip = Math.max(0, (page - 1) * limit);

    const [data, totalItems] = (await prisma.$transaction([
      prisma.video.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.video.count(),
    ])) as [Video[], number];

    return {
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }
}
