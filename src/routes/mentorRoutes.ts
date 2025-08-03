import express from "express";
import { getAllMentors, getMentorById } from "../controllers/mentorController";
import protect from "../middleware/protect";

const router = express.Router();

router.get("/", getAllMentors);

router.get("/:id", protect, getMentorById);

export default router;
