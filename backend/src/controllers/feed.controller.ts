import { Request, Response, NextFunction } from "express";
import { FeedService } from "../services/feed.service.js";

export class FeedController {
  private service = new FeedService();

  getFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.service.getFeed({ page, limit });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
