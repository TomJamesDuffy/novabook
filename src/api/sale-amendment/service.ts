import Models from "../../../models";
import { SaleAmendmentEventType } from "./types";

const SaleAmendment = Models.SaleAmendment;

export const create = async (updateData: SaleAmendmentEventType) => {
  try {
    const saleAmendmentData = {
      ...updateData,
      date: new Date(updateData.date),
    };

    await SaleAmendment.create(saleAmendmentData);
  } catch (error) {
    throw error;
  }
};
