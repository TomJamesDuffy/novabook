import Models from "../../../../models";
import { SaleItemWithTransactionType } from "../../transactions/types";
import { Op } from "sequelize";

const Transaction = Models.Transaction;
const SaleItem = Models.SaleItem;

export const retrieveSalesItems = async (taxDate: Date) => {
  return (await SaleItem.findAll({
    include: [
      {
        model: Transaction,
        as: "transaction",
        required: true,

        where: {
          date: {
            [Op.lt]: taxDate,
          },
        },
      },
    ],
    raw: true,
    nest: true,
  })) as unknown as SaleItemWithTransactionType[];
};
