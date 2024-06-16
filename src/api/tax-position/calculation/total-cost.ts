import { SaleAmendmentType } from "../../sale-amendment/types";
import { SaleItemWithTransactionType } from "../../transactions/types";

const updateSaleItemWithAmendment = (
  saleItem: SaleItemWithTransactionType,
  saleAmendment: SaleAmendmentType | undefined
): SaleItemWithTransactionType => {
  if (!saleAmendment) {
    return saleItem;
  }

  return {
    ...saleItem,
    cost: saleAmendment.cost ?? saleItem.cost,
    taxRate: saleAmendment.taxRate ?? saleItem.taxRate,
  };
};

export const calculateTotalCost = async (
  saleAmendmentsMap: Record<string, SaleAmendmentType>,
  saleItems: SaleItemWithTransactionType[]
): Promise<number> => {
  return saleItems.reduce<number>((acc, saleItem) => {
    const key = `${saleItem.transaction.invoiceId}-${saleItem.itemId}`;
    const saleAmendment = saleAmendmentsMap[key];

    const updatedSaleItem = updateSaleItemWithAmendment(
      saleItem,
      saleAmendment
    );

    const cost = (updatedSaleItem.cost ?? 0) * (updatedSaleItem.taxRate ?? 0);
    return acc + cost;
  }, 0);
};
