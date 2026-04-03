import express from "express";
import {
  createCommunityPost,
  getCommunityFeed,
  getPostById,
  toggleLike,
  addComment,
  deleteComment,
} from "../controllers/communityController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

// Feed & posts
router.get("/feed", protect, getCommunityFeed);
router.post("/posts", protect, createCommunityPost);
router.get("/posts/:id", protect, getPostById);

// Social actions on posts
router.post("/posts/:id/like", protect, toggleLike);
router.post("/posts/:id/comment", protect, addComment);

// Comment management
router.delete("/comments/:id", protect, deleteComment);

export default router;
