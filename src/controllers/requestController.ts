import { Request, Response } from "express";
import RequestModel from "../models/Request";

// @desc Send mentorship request (mentee → mentor)
export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { mentorId } = req.body;
    // @ts-ignore
    const menteeId = req.user._id;

    const newRequest = await RequestModel.create({
      mentee: menteeId,
      mentor: mentorId,
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: "Error sending request", error: err });
  }
};

// @desc Accept mentorship request
export const acceptRequest = async (req: Request, res: Response) => {
  try {
    const request = await RequestModel.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "accepted";
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Error accepting request", error: err });
  }
};

// @desc Reject mentorship request
export const rejectRequest = async (req: Request, res: Response) => {
  try {
    const request = await RequestModel.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "rejected";
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting request", error: err });
  }
};

// @desc Get requests made to the logged-in mentor
export const getIncomingRequests = async (req: Request, res: Response) => {
  // @ts-ignore
  const mentorId = req.user._id;

  try {
    const requests = await RequestModel.find({ mentor: mentorId })
      .populate("mentee", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err });
  }
};
