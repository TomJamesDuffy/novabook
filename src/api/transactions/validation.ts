import { TransactionEventType } from "./types";
import { ValidationError } from "../../utils/ValidationError";

export const validateTransaction = (body: TransactionEventType) => {
  const { eventType } = body;

  if (!eventType) {
    throw new ValidationError("Event type is required.");
  }

  if (eventType === "SALES") {
    const { invoiceId, items } = body as Extract<
      TransactionEventType,
      { eventType: "SALES" }
    >;

    if (!invoiceId) {
      throw new ValidationError("InvoiceId is required for SALES event.");
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ValidationError(
        "At least one item is required for SALES event."
      );
    }

    items.forEach((item) => {
      const { cost, taxRate } = item;

      if (cost === undefined || typeof cost !== "number") {
        throw new ValidationError("Each item must have a cost as a number.");
      }

      if (taxRate === undefined || typeof taxRate !== "number") {
        throw new ValidationError("Each item must have a taxRate as a number.");
      }
    });
  } else if (eventType === "TAX_PAYMENT") {
    const { amount } = body as Extract<
      TransactionEventType,
      { eventType: "TAX_PAYMENT" }
    >;

    if (amount === undefined || typeof amount !== "number") {
      throw new ValidationError(
        "Amount is required and must be a number for TAX_PAYMENT event."
      );
    }
  } else {
    throw new ValidationError("Invalid event type.");
  }
};
