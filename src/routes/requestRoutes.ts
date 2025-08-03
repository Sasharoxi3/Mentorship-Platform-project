import express from "express";
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
} from "../controllers/requestController";
import protect from "../middleware/protect";
import {getIncomingRequests} from "../controllers/requestController";

const router = express.Router();

router.post("/", protect, sendRequest);
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);
router.get("/incoming", protect, getIncomingRequests);
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);


export default router;
