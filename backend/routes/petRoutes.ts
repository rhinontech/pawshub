import express from "express";
import { getMyPets, createPet, updateListingStatus } from "../controllers/petController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.route("/")
  .get(protect, getMyPets)
  .post(protect, createPet);

router.route("/:id/listing")
  .patch(protect, updateListingStatus);

export default router;
