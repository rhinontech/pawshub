import express from "express";
import { getMyPets, createPet, updateListingStatus, getPetById, updatePet, deletePet } from "../controllers/petController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.route("/")
  .get(protect, getMyPets)
  .post(protect, createPet);

router.route("/:id")
  .get(protect, getPetById)
  .put(protect, updatePet)
  .delete(protect, deletePet);

router.route("/:id/listing")
  .patch(protect, updateListingStatus);

export default router;
