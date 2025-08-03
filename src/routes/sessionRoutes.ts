import express from "express";
import { bookSession, addFeedback, getMySessions } from "../controllers/sessionController";
import protect from "../middleware/protect";

const router = express.Router();

router.post("/", protect, bookSession);
router.put("/:id/feedback", protect, addFeedback);
router.get("/me", protect, getMySessions);

export default router;
