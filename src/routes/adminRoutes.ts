import express from "express";
import { isAdmin } from "../middleware/authMiddleware";
import {
  getAllUsers,
  getAllSessions,
  getAllRequests,
  updateUserRole,
  getStats,
  getAllFeedback,
  getAnnouncements,
  createAnnouncement,
} from "../controllers/adminController";

import protect from "../middleware/protect";
import adminOnly from "../middleware/adminOnly";

const router = express.Router();

router.use(protect, adminOnly); // All routes below require admin

router.get("/users", getAllUsers);
router.get("/sessions", getAllSessions);
router.get("/requests", getAllRequests);
router.put("/users/:id/role", updateUserRole);
router.get("/stats", protect, getStats);
router.get("/feedback", protect, isAdmin, getAllFeedback);
router.post("/announcements", protect, isAdmin, createAnnouncement);
router.get("/announcements", protect, isAdmin, getAnnouncements);


export default router;
