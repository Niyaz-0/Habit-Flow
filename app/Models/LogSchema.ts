import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["ban", "unban", "delete"],
    },
    targetUserId: String,
    adminUserId: String,
    adminEmail: String,
    targetEmail: String,
  },
  { timestamps: true }
);

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

export default Log;