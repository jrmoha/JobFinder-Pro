import { Schema, Types, model } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: {
      type: Types.ObjectId,
      ref: "job",
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    userTechSkills: {
      type: [String],
      required: true,
    },
    userSoftSkills: {
      type: [String],
      required: true,
    },
    userResume: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("application", applicationSchema);
