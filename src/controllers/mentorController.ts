import { Request, Response } from "express";
import User from "../models/User";

// GET /api/mentors?skill=JavaScript&name=Jane
export const getAllMentors = async (req: Request, res: Response) => {
  try {
    const { skill, name } = req.query;

    const filter: any = { role: "mentor" };

    if (skill) {
      filter.skills = { $in: [skill] };
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const mentors = await User.find(filter).select("-password");
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentors", error });
  }
};

export const getMentorById = async (req: Request, res: Response) => {
  try {
    const mentor = await User.findOne({ _id: req.params.id, role: "mentor" });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};