import { Schema, model, Types } from "mongoose";

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
    enum: ["onsite", "remotely", "hybrid"],
  },
  workingTime: {
    type: String,
    required: true,
    enum: ["full-time", "part-time"],
  },
  seniorityLevel: {
    type: String,
    required: true,
    enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
  },
  jobDescription: {
    type: String,
    required: true,
  },
  techinicalSkills: {
    type: [String],
    required: true,
  },
  softSkills: {
    type: [String],
    required: true,
  },
  addedBy: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default model("job", jobSchema);
