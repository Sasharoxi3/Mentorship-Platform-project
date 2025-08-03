/// <reference path="../types/express/index.d.ts" />
import { Request, Response } from "express";
import Session from "../models/Session";

// @desc Book a session
export const bookSession = async (req: Request, res: Response) => {
  try {
    console.log("REQ.USER:", req.user); // Optional for debugging

    const { mentorId, scheduledAt } = req.body;
    // @ts-ignore
    const menteeId = req.user._id;

    const session = await Session.create({
      mentor: mentorId,
      mentee: menteeId,
      scheduledAt,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err });
  }
};

// @desc Add feedback to a session
export const addFeedback = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    const { feedback, rating } = req.body;
    session.feedback = feedback;
    session.rating = rating;
    session.status = "completed";

    await session.save();

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to add feedback", error: err });
  }
};

// sessionsController.ts
export const getMySessions = async (req: Request, res: Response) => {
  // @ts-ignore
  const menteeId = req.user._id;

  try {
    const sessions = await Session.find({ mentee: menteeId })
      .populate("mentor", "name email")
      .sort({ scheduledAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions", error: err });
  }
};

