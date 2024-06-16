import { Request, Response, NextFunction } from "express";

import * as taxPositionService from "./service";
import { validateTransaction } from "./validation/validation";
import { TaxPositionQueryType, TaxPositionReturnType } from "./types";

export const calculateTaxPosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateTransaction(req.query as TaxPositionQueryType);
    const json: TaxPositionReturnType =
      await taxPositionService.calculateTaxPosition(req.query.date as string);
    res.status(200).json(json);
  } catch (error) {
    next(error);
  }
};
