// src/models/MentorshipRequest.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMentorshipRequest extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const MentorshipRequestSchema = new Schema<IMentorshipRequest>(
  {
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const MentorshipRequest = mongoose.model<IMentorshipRequest>(
  "MentorshipRequest",
  MentorshipRequestSchema
);

export default MentorshipRequest;
