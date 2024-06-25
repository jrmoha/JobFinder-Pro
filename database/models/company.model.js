import { Schema, Types, model } from "mongoose";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          return value >= 11 && value <= 20;
        },
        message: "Number of employees must be between 11 and 20",
      },
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
    },
    companyHR: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("company", companySchema);
