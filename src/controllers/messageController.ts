import { Request, Response } from "express";
import Message from "../models/Message";

// Send a message
export const sendMessage = async (req: Request, res: Response) => {
  const { receiverId, content } = req.body;
  // @ts-ignore
  const senderId = req.user._id;

  try {
    const message = await Message.create({ sender: senderId, receiver: receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err });
  }
};

// Get all messages between logged-in user and another user
export const getMessages = async (req: Request, res: Response) => {
  const { otherUserId } = req.params;
  // @ts-ignore
  const userId = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err });
  }
};
