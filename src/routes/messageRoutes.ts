import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController";
import protect from "../middleware/protect";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:otherUserId", protect, getMessages);

export default router;
