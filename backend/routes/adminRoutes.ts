import express from "express";
import { getPendingPosts, moderatePost, getUnverifiedVets, verifyVet, getAllPets, getAllUsers, getAdminStats } from "../controllers/adminController.ts";
import { protect, adminOnly } from "../middleware/authMiddleware.ts";

const router = express.Router();

// Stats dashboard
router.get("/stats", protect, adminOnly, getAdminStats);

// Users
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/pets", protect, adminOnly, getAllPets);

// Vet verification (roadmap naming)
router.get("/vets/pending", protect, adminOnly, getUnverifiedVets);
router.patch("/vets/:vetId/verify", protect, adminOnly, verifyVet);

// Community moderation
router.get("/pending-posts", protect, adminOnly, getPendingPosts);
router.patch("/post-moderation/:postId", protect, adminOnly, moderatePost);

export default router;
