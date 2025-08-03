import { Request, Response } from "express";
import User from "../models/User";
import Session from "../models/Session";
import RequestModel from "../models/Request";
import Announcement from "../models/Announcement";

// @desc Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

// @desc Get all sessions
export const getAllSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await Session.find().populate("mentor mentee", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions", error: err });
  }
};

// @desc Get all mentorship requests
export const getAllRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find().populate("mentor mentee", "name email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err });
  }
};

// @desc Update a user's role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = req.body.role;
    await user.save();

    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update role", error: err });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const mentors = await User.countDocuments({ role: "mentor" });
    const mentees = await User.countDocuments({ role: "mentee" });

    const totalRequests = await RequestModel.countDocuments();
const accepted = await RequestModel.countDocuments({ status: "accepted" });
const rejected = await RequestModel.countDocuments({ status: "rejected" });

    const totalSessions = await Session.countDocuments();
    const completedSessions = await Session.countDocuments({ status: "completed" });

    res.json({
      totalUsers,
      mentors,
      mentees,
      totalRequests,
      accepted,
      rejected,
      totalSessions,
      completedSessions,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err });
  }
};
export const getPlatformStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMentors = await User.countDocuments({ role: "mentor" });
    const totalMentees = await User.countDocuments({ role: "mentee" });

    const totalRequests = await RequestModel.countDocuments();
    const totalSessions = await Session.countDocuments();

    res.json({
      totalUsers,
      totalMentors,
      totalMentees,
      totalRequests,
      totalSessions,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err });
  }
};

// View all feedback across sessions
export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Session.find({ feedback: { $ne: null } })
      .populate("mentor", "name email")
      .populate("mentee", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedback", error: err });
  }
};

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body;
    // @ts-ignore
    const createdBy = req.user._id;

    const announcement = await Announcement.create({ title, message, createdBy });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: "Failed to create announcement", error: err });
  }
};

export const getAnnouncements = async (_req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements", error: err });
  }
};