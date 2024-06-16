import express from "express";
import * as transactionController from "./controller";

const router = express.Router();

router.post("/transactions", transactionController.create);

export default router;
