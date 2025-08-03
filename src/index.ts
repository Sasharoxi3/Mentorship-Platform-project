import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
// server/src/index.ts
import path from "path";


dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("MONGO_URI from .env:", process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
import authRoutes from "./routes/authRoutes";
app.use("/api/auth", authRoutes);
import userRoutes from "./routes/userRoutes";
app.use("/api/users", userRoutes);
import mentorRoutes from "./routes/mentorRoutes";
app.use("/api/mentors", mentorRoutes);
import requestRoutes from "./routes/requestRoutes";
app.use("/api/requests", requestRoutes);
import sessionRoutes from "./routes/sessionRoutes";
app.use("/api/sessions", sessionRoutes);
import adminRoutes from "./routes/adminRoutes";
app.use("/api/admin", adminRoutes);
import messageRoutes from "./routes/messageRoutes";
app.use("/api/messages", messageRoutes);


app.get("/", (_req, res) => {
  res.send("Mentorship API is running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
