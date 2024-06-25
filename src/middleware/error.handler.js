import { APIError } from "../utils/APIError.js";
import StatusCodes from "http-status-codes";

export const routeError = (req, res, next) => {
  let err = new APIError(
    `Can't find ${req.originalUrl} on this server!`,
    StatusCodes.NOT_FOUND
  );
  next(err);
};

export default function (err, req, res, next) {
  if (err instanceof APIError) {
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
