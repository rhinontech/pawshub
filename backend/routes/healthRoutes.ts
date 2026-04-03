import express from "express";
import { 
  getVitals, addVital,
  getVaccines, addVaccine,
  getMedications, addMedication,
  getMedicalRecords, addMedicalRecord
} from "../controllers/healthController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.route("/vitals/:petId")
  .get(protect, getVitals)
  .post(protect, addVital);

router.route("/vaccines/:petId")
  .get(protect, getVaccines)
  .post(protect, addVaccine);

router.route("/meds/:petId")
  .get(protect, getMedications)
  .post(protect, addMedication);

router.route("/records/:petId")
  .get(protect, getMedicalRecords)
  .post(protect, addMedicalRecord);

export default router;
