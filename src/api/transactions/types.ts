import EventType from "../../../models/EventType";
import Model from "../../../models";

export interface SalesEvent {
  id: string;
  eventType: EventType.SALES;
  date: Date;
  invoiceId: string;
  items: {
    id: string;
    transactionId: string;
    cost: number;
    taxRate: number;
  }[];
}

export interface TaxPaymentEvent {
  id: string;
  eventType: EventType.TAX_PAYMENT;
  date: Date;
  amount: number;
}

export type TransactionEventType = SalesEvent | TaxPaymentEvent;

export type SaleItemWithTransactionType = {
  id: string;
  itemId: string;
  cost: number;
  taxRate: number;
  invoiceId: string;
  transaction: {
    id: string;
    eventType: EventType.SALES;
    date: Date;
    invoiceId: string;
    amount?: number;
  };
};
