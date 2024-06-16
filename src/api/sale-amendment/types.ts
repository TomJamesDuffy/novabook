import Models from "../../../models";

export type SaleAmendmentEventType = {
  date: string;
  invoiceId: string;
  itemId: string;
  cost?: number;
  taxRate?: number;
};

export type SaleAmendmentType = {
  date: Date;
  invoiceId: string;
  itemId: string;
  cost?: number;
  taxRate?: number;
};

export type SaleAmendmentInstance = InstanceType<typeof Models.SaleAmendment>;
