import express from "express";
// src/routes/authRoutes.ts
import { login, register } from "../controllers/authController";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

export default router;
