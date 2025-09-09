
import express from "express";
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume
} from "../controllers/resumeControl.js";
import { protect } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/",protect, createResume);
router.get("/", protect, getResumes);
router.get("/:id",protect ,getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);

export default router;

