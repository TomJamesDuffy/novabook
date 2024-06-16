import {
  SaleAmendmentType,
  SaleAmendmentInstance,
} from "../../sale-amendment/types";

export const createRelevantSalesAmendmentsMap = async (
  saleAmendments: SaleAmendmentInstance[]
) => {
  return saleAmendments.reduce<Record<string, SaleAmendmentType>>(
    (acc, saleAmendment) => {
      const key = `${saleAmendment.invoiceId}-${saleAmendment.itemId}`;
      if (!acc[key]) {
        acc[key] = saleAmendment.get();
      }
      return acc;
    },
    {} as Record<string, SaleAmendmentType>
  );
};
