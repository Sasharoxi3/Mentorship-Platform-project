import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  mentee: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const requestSchema = new Schema<IRequest>(
  {
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const RequestModel = mongoose.model<IRequest>("Request", requestSchema);
export default RequestModel;
