import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!logger) return next();

  logger.info(`Incoming request: ${req.method} ${req.url}`);
  logger.info(`Request params: ${JSON.stringify(req.params)}`);
  logger.info(`Request query: ${JSON.stringify(req.query)}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
};

export default loggerMiddleware;
