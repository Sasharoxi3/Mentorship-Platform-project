// createAdmin.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("hubby23", 10);

    const existing = await User.findOne({ email: "roxysasha288@gmail.com" });
    if (existing) {
      console.log("⚠️ User already exists.");
      return process.exit();
    }

    const admin = new User({
      name: "Roxy Admin",
      email: "roxysasha288@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
  } finally {
    process.exit();
  }
};

createAdmin();
