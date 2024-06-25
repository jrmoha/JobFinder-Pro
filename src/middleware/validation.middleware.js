import StatusCodes from "http-status-codes";
import { APIError } from "../utils/APIError.js";

const methods = ["params", "body", "query", "headers", "file", "files"];

export const validate = (schema) => {
  return (req, res, next) => {
    let errors = [];
    methods.forEach((key) => {
      if (schema[key]) {
        const { error } = schema[key].validate(req[key], { abortEarly: true });
        if (error?.details) {
          errors.push(...error.details);
        }
      }
    });
    if (errors.length) {
      return next(
        new APIError(
          errors.map((e) => e.message).join(", "),
          StatusCodes.BAD_REQUEST
        )
      );
    }
    next();
  };
};
