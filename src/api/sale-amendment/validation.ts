import { SaleAmendmentEventType } from "./types";
import { ValidationError } from "../../utils/ValidationError";

export const validateSaleAmendment = (body: SaleAmendmentEventType) => {
  const { invoiceId, itemId, cost, taxRate } = body;

  if (!invoiceId || !itemId) {
    throw new ValidationError(
      `Both invoiceId-${invoiceId} and itemId-${itemId} are required.`
    );
  }

  if (cost === undefined && taxRate === undefined) {
    throw new ValidationError("At least one of cost or taxRate is required.");
  }

  if (cost !== undefined && typeof cost !== "number") {
    throw new ValidationError("Cost must be a number.");
  }

  if (taxRate !== undefined && typeof taxRate !== "number") {
    throw new ValidationError("TaxRate must be a number.");
  }
};
