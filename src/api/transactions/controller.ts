import * as transactionService from "./service";
import { Request, Response, NextFunction } from "express";
import { validateTransaction } from "./validation";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateTransaction(req.body);
    await transactionService.createTransaction(req.body);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
};
