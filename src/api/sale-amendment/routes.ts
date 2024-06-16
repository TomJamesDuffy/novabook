import express from "express";
import * as saleAmendmentController from "./controller";

const router = express.Router();

router.patch("/sale", saleAmendmentController.SaleAmendment);

export default router;
