import { Router } from "express";
import { FeedController } from "../controllers/feed.controller.js";

const router = Router();
const controller = new FeedController();

router.get("/", controller.getFeed);

export default router;
