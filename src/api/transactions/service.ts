import Models from "../../../models";
import { TransactionEventType } from "./types";

const Transaction = Models.Transaction;
const SaleItem = Models.SaleItem;

export const createTransaction = async (eventData: TransactionEventType) => {
  await Transaction.create(eventData, {
    include: [
      {
        model: SaleItem,
        as: "items",
      },
    ],
  });
};
