import sequelize from "../db/sequelize.config";
import Transaction from "./Transaction";
import SaleItem from "./SaleItem";
import SaleAmendment from "./SaleAmendment";

const models = {
  Transaction: Transaction(sequelize),
  SaleItem: SaleItem(sequelize),
  SaleAmendment: SaleAmendment(sequelize),
};

Object.keys(models).forEach((modelName) => {
  if ((models as any)[modelName].associate) {
    (models as any)[modelName].associate(models);
  }
});

export default models;
