import { Request, Response, NextFunction } from "express";

import * as saleAmendmentService from "./service";
import { validateSaleAmendment } from "./validation";

export const SaleAmendment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateSaleAmendment(req.body);
    await saleAmendmentService.create(req.body);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
};
