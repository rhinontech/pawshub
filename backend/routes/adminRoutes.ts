import express from "express";
import { getPendingPosts, moderatePost, getUnverifiedVets, verifyVet, getAllPets, getAllUsers } from "../controllers/adminController.ts";
import { protect, adminOnly } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/users", getAllUsers); // Unlocked for dev test
router.route("/pets")
  .get(getAllPets); // Unlocked for dev test

router.get("/unverified-vets", getUnverifiedVets); // Unlocked for dev test
router.patch("/verify-vet/:vetId", protect, adminOnly, verifyVet);

router.get("/pending-posts", getPendingPosts); // Unlocked for dev test
router.patch("/post-moderation/:postId", protect, adminOnly, moderatePost);

export default router;
