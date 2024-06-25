import joi from "joi";
import { textInputSchema } from "../../utils/input.schema.js";

export const createCompanySchema = {
  body: joi.object().required().keys({
    companyName: textInputSchema.companyName.required(),
    description: textInputSchema.description.required(),
    industry: textInputSchema.industry.required(),
    address: textInputSchema.address.required(),
    numberOfEmployees: textInputSchema.numberOfEmployees.required(),
    companyEmail: textInputSchema.companyEmail.required(),
  }),
};

export const updateCompanySchema = {
  body: joi.object().required().keys({
    companyName: textInputSchema.companyName,
    description: textInputSchema.description,
    industry: textInputSchema.industry,
    address: textInputSchema.address,
    numberOfEmployees: textInputSchema.numberOfEmployees,
    companyEmail: textInputSchema.companyEmail,
  }),
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
};

export const deleteCompanySchema = {
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
};

export const getCompanySchema = {
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
};

export const searchCompanySchema = {
  query: joi.object().required().keys({
    q: textInputSchema.companyName.required(),
  }),
};
