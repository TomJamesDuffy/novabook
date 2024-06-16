import Models from "../../../../models";
import { Op } from "sequelize";
import { SaleAmendmentInstance } from "../../sale-amendment/types";

export const retrieveMostRecentSaleAmendments = async (
  taxDate: Date
): Promise<SaleAmendmentInstance[]> => {
  const SaleAmendment = Models.SaleAmendment;
  return await SaleAmendment.findAll({
    where: {
      date: {
        [Op.lt]: taxDate,
      },
    },
    order: [["date", "DESC"]],
  });
};
