import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  let status = 500;
  let message = "Internal Server Error";

  if (err instanceof CustomError) {
    // Handle custom errors
    status = err.status;
    message = err.message;
  } else if (err.name === "ValidationError") {
    // Handle validation errors
    status = 400;
    message = err.message;
  }

  // Log the error
  if (logger) {
    logger.error(`Error occurred: ${message}`, {
      status,
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body,
    });
  }

  res.status(status).json({ error: message });
};

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
