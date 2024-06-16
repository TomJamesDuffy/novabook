import EventType from "../../../../models/EventType";
import { TaxPaymentEvent } from "../../transactions/types";

const salesTransactionJanuary = {
  eventType: EventType.SALES,
  date: new Date("2023-01-01T00:00:00Z"),
  invoiceId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
  items: [
    {
      itemId: "c12944c2-5133-47a0-baad-9c7409591cb6",
      cost: 500,
      taxRate: 0.1,
    },
    {
      itemId: "d517ae7c-1d29-42c1-96fb-64b4189ff823",
      cost: 450,
      taxRate: 0.1,
    },
  ],
};

const salesTransactionMarch = {
  eventType: EventType.SALES,
  date: new Date("2023-03-01T00:00:00Z"),
  invoiceId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
  items: [
    {
      itemId: "c12944c2-5133-47a0-baad-9c7409591cb6",
      cost: 500,
      taxRate: 0.1,
    },
    {
      itemId: "d517ae7c-1d29-42c1-96fb-64b4189ff823",
      cost: 450,
      taxRate: 0.1,
    },
  ],
};

const salesTransactionMay = {
  eventType: EventType.SALES,
  date: new Date("2023-05-01T00:00:00Z"),
  invoiceId: "a6a437b2-fe0e-44f2-8482-61cc3d8ff982",
  items: [
    {
      itemId: "4f791ba6-9f23-4b93-aa65-2343e2853ecb",
      cost: 200,
      taxRate: 0.3,
    },
    {
      itemId: "e91362c2-eb7a-43a3-a226-a9d6e04f3c10",
      cost: 600,
      taxRate: 0.5,
    },
  ],
};

const taxTransactionFebruary = {
  eventType: EventType.TAX_PAYMENT,
  date: new Date("2023-02-01T00:00:00Z"),
  amount: 100,
};

const taxTransactionApril = {
  eventType: EventType.TAX_PAYMENT,
  date: new Date("2023-04-01T00:00:00Z"),
  amount: 200,
};

const saleAmendmentFebruary = {
  date: new Date("2023-02-01T00:00:00Z"),
  invoiceId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
  itemId: "c12944c2-5133-47a0-baad-9c7409591cb6",
  taxRate: 0.5,
};

const saleAmendmentApril = {
  date: new Date("2023-04-01T00:00:00Z"),
  invoiceId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
  itemId: "c12944c2-5133-47a0-baad-9c7409591cb6",
  cost: 1500,
  taxRate: 0.7,
};

const saleAmendmentJune = {
  date: new Date("2023-06-01T00:00:00Z"),
  invoiceId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
  itemId: "c12944c2-5133-47a0-baad-9c7409591cb6",
  cost: 2000,
  taxRate: 0.8,
};

export const newSalesTransaction = [
  salesTransactionJanuary,
  salesTransactionMarch,
  salesTransactionMay,
];

export const newTaxTransaction = [taxTransactionFebruary, taxTransactionApril];

export const newSaleAmendments = [
  saleAmendmentFebruary,
  saleAmendmentApril,
  saleAmendmentJune,
];
