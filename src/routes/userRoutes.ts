import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";
import protect from "../middleware/protect";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
