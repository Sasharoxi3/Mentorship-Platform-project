import { Request, Response } from "express";
import User from "../models/User";

// @desc   Get logged in user's profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      console.log("REQ.USER:", req.user); // 🪵 Add this
  
      // @ts-ignore
      const user = await User.findById(req.user._id).select("-password");
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      console.error("Error fetching profile:", err); // 🪵 Add this
      res.status(500).json({ message: "Server error", error: err });
    }
  };
  

// @desc   Update logged in user's profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, bio, skills, goals } = req.body;

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.goals = goals || user.goals;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      goals: updatedUser.goals,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
