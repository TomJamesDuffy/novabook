import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

class SaleAmendment extends Model<
  InferAttributes<SaleAmendment>,
  InferCreationAttributes<SaleAmendment>
> {
  id!: CreationOptional<string>;
  date!: Date;
  invoiceId!: string;
  itemId!: string;
  cost?: number;
  taxRate?: number;
}

export default (sequelize: Sequelize) => {
  SaleAmendment.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      invoiceId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      taxRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "SaleAmendment",
      sequelize,
      timestamps: false,
      validate: {
        costOrTaxRate() {
          if (this.cost === null && this.taxRate === null) {
            throw new Error("Either cost or taxRate must be provided.");
          }
        },
      },
    }
  );

  return SaleAmendment;
};
