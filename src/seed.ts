import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import User from "./models/User";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🌱 Connected to DB");

    // Clear existing users
    await User.deleteMany();

    const admins = [
      {
        name: "Admin One",
        email: "admin1@mail.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Admin Two",
        email: "admin2@mail.com",
        password: "admin123",
        role: "admin",
      },
    ];

    const mentors = Array.from({ length: 10 }).map((_, i) => ({
      name: `Mentor ${i + 1}`,
      email: `mentor${i + 1}@mail.com`,
      password: "mentor123",
      role: "mentor",
      skills: ["React", "Node", "MongoDB"].slice(0, (i % 3) + 1),
      bio: `Mentor ${i + 1} bio`,
    }));

    const mentees = Array.from({ length: 10 }).map((_, i) => ({
      name: `Mentee ${i + 1}`,
      email: `mentee${i + 1}@mail.com`,
      password: "mentee123",
      role: "mentee",
      goals: `Learn tech topic ${i + 1}`,
    }));

    const users = [...admins, ...mentors, ...mentees];

    await User.insertMany(users);
    console.log("✅ Seeded users");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seedData();
