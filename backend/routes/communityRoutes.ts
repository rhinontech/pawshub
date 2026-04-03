import express from "express";
import { createCommunityPost, getCommunityFeed } from "../controllers/communityController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/posts", protect, createCommunityPost);
router.get("/feed", protect, getCommunityFeed);

export default router;
