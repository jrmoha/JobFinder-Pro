import joi from "joi";
import { fileInputSchema, textInputSchema } from "../../utils/input.schema.js";
export const addJobSchema = {
  body: joi.object().required().keys({
    jobTitle: textInputSchema.jobTitle.required(),
    jobLocation: textInputSchema.jobLocation.required(),
    workingTime: textInputSchema.workingTime.required(),
    seniorityLevel: textInputSchema.seniorityLevel.required(),
    jobDescription: textInputSchema.jobDescription.required(),
    techinicalSkills: textInputSchema.techinicalSkills.required(),
    softSkills: textInputSchema.softSkills.required(),
  }),
};
export const updateJobSchema = {
  body: joi
    .object()
    .required()
    .keys({
      jobTitle: textInputSchema.jobTitle,
      jobLocation: textInputSchema.jobLocation,
      workingTime: textInputSchema.workingTime,
      seniorityLevel: textInputSchema.seniorityLevel,
      jobDescription: textInputSchema.jobDescription,
      techinicalSkills: textInputSchema.techinicalSkills,
      softSkills: textInputSchema.softSkills,
    })
    .min(1)
    .messages({ "object.min": "At least one field is required" }),
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
};
export const deleteJobSchema = {
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
};
export const searchJobSchema = {
  query: joi.object().required().keys({
    name: textInputSchema.companyName.required(),
  }),
};
export const searchFilterJobSchema = {
  body: joi.object().required().keys({
    workingTime: textInputSchema.workingTime,
    jobLocation: textInputSchema.jobLocation,
    seniorityLevel: textInputSchema.seniorityLevel,
    jobTitle: textInputSchema.jobTitle,
    techinicalSkills: textInputSchema.techinicalSkills,
  }),
};
export const applySchema = {
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
  body: joi
    .object()
    .required()
    .keys({
      userTechSkills: textInputSchema.userTechSkills.min(1).required(),
      userSoftSkills: textInputSchema.userSoftSkills,
    }),
  file: fileInputSchema.file.required(),
};
