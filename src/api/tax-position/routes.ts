import express from "express";
import * as taxPositionController from "./controller";

const router = express.Router();

router.get("/tax-position", taxPositionController.calculateTaxPosition);

export default router;
