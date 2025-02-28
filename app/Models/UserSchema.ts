import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    emailAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
