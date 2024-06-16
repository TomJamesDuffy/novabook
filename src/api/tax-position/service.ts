import { TaxPositionReturnType } from "./types";

import {
  calculateTaxPaymentsDue,
  retrieveMostRecentSaleAmendments,
  createRelevantSalesAmendmentsMap,
  retrieveSalesItems,
  calculateTotalCost,
} from "./calculation";
import { parseDate, formatDateToUTC } from "../../utils/dates";

/**
 * This function calculates the totalCost for a given date.
 * The steps involved are:
 * 1. Calculate the total of the tax payments preceding the taxDate.
 * 2. Retrieve and order (ASC) the sale amendments preceding the taxDate.
 * 3. Create a map of the most recent sale amendment with a key of invoiceId + itemId.
 * 4. Retrieve all sales items.
 * 5. Calculate the total cost by iterating over the sales items, matching them to the latest sale amendment (if it exists),
 *    applying totalCost * taxRate, then summing them.
 * 6. Subtract the totalCost from the taxPaymentDue to get the taxPosition.
 */

export const calculateTaxPosition = async (
  isoDateString: string
): Promise<TaxPositionReturnType> => {
  const taxDate = parseDate(isoDateString);

  const taxPaymentDue = await calculateTaxPaymentsDue(taxDate);
  const mostRecentSaleAmendments = await retrieveMostRecentSaleAmendments(
    taxDate
  );
  const saleAmendmentsMap = await createRelevantSalesAmendmentsMap(
    mostRecentSaleAmendments
  );
  const saleItems = await retrieveSalesItems(taxDate);
  const totalCost = await calculateTotalCost(saleAmendmentsMap, saleItems);

  const taxPosition = taxPaymentDue - totalCost;

  return {
    date: formatDateToUTC(taxDate),
    taxPosition,
  };
};
