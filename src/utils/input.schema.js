import joi from "joi";
import { Types } from "mongoose";

export const objectId_ = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid objectId");
};

export const textInputSchema = {
  firstName: joi.string().trim(),
  lastName: joi.string().trim(),
  email: joi.string().trim().lowercase().email(),
  password: joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least 6 characters, uppercase letter, lowercase letter and numbers",
    }),
  password_confirmation: joi
    .string()
    .valid(joi.ref("password"))
    .messages({ "any.only": "Passwords do not match" }),
  DOB: joi.date(),
  mobileNumber: joi.string().trim(),
  recoveryEmail: joi.string().trim().lowercase().email(),
  signinQuery: joi.string().trim(),
  companyName: joi.string().trim(),
  description: joi.string().trim(),
  industry: joi.string().trim(),
  address: joi.string().trim(),
  numberOfEmployees: joi.number().integer().min(11).max(20),
  companyEmail: joi.string().trim().lowercase().email(),
  _id: joi.string().custom(objectId_, "objectId validation"),
  userTechSkills: joi.array().items(joi.string().trim()),
  userSoftSkills: joi.array().items(joi.string().trim()),
  otp: joi.string().trim().max(6),
  jobTitle: joi.string().trim(),
  jobLocation: joi.string().trim().valid("onsite", "remotely", "hybrid"),
  workingTime: joi.string().trim().valid("full-time", "part-time"),
  seniorityLevel: joi
    .string()
    .trim()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"),
  jobDescription: joi.string().trim(),
  techinicalSkills: joi.array().items(joi.string().trim()),
  softSkills: joi.array().items(joi.string().trim()),
};

export const fileInputSchema = {
  file: joi.object().keys({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
};
