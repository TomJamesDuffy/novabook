import { Op } from "sequelize";

import Models from "../../../../models";
import EventType from "../../../../models/EventType";

const Transaction = Models.Transaction;

export const calculateTaxPaymentsDue = async (
  taxDate: Date
): Promise<number> => {
  const amount = await Transaction.sum("amount", {
    where: {
      eventType: EventType.TAX_PAYMENT,
      date: {
        [Op.lt]: taxDate,
      },
    },
  });

  return amount || 0;
};
