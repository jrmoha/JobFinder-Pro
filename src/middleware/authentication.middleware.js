import jwt from "jsonwebtoken";
import { APIError } from "../utils/APIError.js";
import StatusCodes from "http-status-codes";
import { async_ } from "./async.handler.js";
import userModel from "../../database/models/user.model.js";

export const authenticate = (roles = []) => {
  return async_(async (req, res, next) => {
    const { token } = req.headers;

    if (!token) throw new APIError("No token provided", StatusCodes.NOT_FOUND);

    if (!token.startsWith(process.env.BEARER_KEY))
      throw new APIError(
        "Invalid bearer key",
        StatusCodes.NON_AUTHORITATIVE_INFORMATION
      );

    const base_token = token.split(" ")[1];
    const decoded = jwt.verify(base_token, process.env.JWT_SIGNATURE);

    if (!decoded) throw new APIError("Invalid token", StatusCodes.UNAUTHORIZED);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) throw new APIError("User doesn't exist", StatusCodes.NOT_FOUND);

    if (user.status == "offline")
      throw new APIError(
        "You have to login first",
        StatusCodes.NON_AUTHORITATIVE_INFORMATION
      );

    if (roles.length && !roles.includes(user.role))
      throw new APIError(
        "You are not authorized to access this route",
        StatusCodes.UNAUTHORIZED
      );

    req.user = decoded;
    next();
  });
};
