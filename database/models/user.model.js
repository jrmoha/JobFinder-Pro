import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
    },
    DOB: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Company_HR"],
      default: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["online", "offline"],
      default: "offline",
    },
    OTP: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("user", userSchema);
