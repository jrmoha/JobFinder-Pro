import joi from "joi";
import { textInputSchema } from "../../utils/input.schema.js";

export const registerSchema = {
  body: joi.object().required().keys({
    firstName: textInputSchema.firstName.required(),
    lastName: textInputSchema.lastName.required(),
    email: textInputSchema.email.required(),
    password: textInputSchema.password.required(),
    password_confirmation: textInputSchema.password_confirmation.required(),
    DOB: textInputSchema.DOB.required(),
    mobileNumber: textInputSchema.mobileNumber.required(),
    recoveryEmail: textInputSchema.recoveryEmail,
  }),
};

export const loginSchema = {
  body: joi.object().required().keys({
    query: textInputSchema.signinQuery.required(),
    password: textInputSchema.password.required(),
  }),
};

export const updateSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: textInputSchema.email,
      mobileNumber: textInputSchema.mobileNumber,
      recoveryEmail: textInputSchema.recoveryEmail,
      DOB: textInputSchema.DOB,
      firstName: textInputSchema.firstName,
      lastName: textInputSchema.lastName,
    })
    .min(1),
};

export const profileSchema = {
  params: joi.object().required().keys({
    id: textInputSchema._id.required(),
  }),
};

export const changePasswordSchema = {
  body: joi.object().required().keys({
    old_password: textInputSchema.password.required(),
    password: textInputSchema.password.required(),
    password_confirmation:   textInputSchema.password_confirmation.required(),
  }),
};

export const forgotPasswordSchema = {
  body: joi.object().required().keys({
    email: textInputSchema.email.required(),
    password: textInputSchema.password.required(),
    password_confirmation: textInputSchema.password_confirmation.required(),
    otp: textInputSchema.otp.required(),
  }),
};

export const getAssociatedRecoveryEmailSchema = {
  query: joi.object().required().keys({
    recoveryEmail: textInputSchema.email.required(),
  }),
};

export const sendOTPSchema = {
  body: joi.object().required().keys({
    email: textInputSchema.email.required(),
  }),
};
