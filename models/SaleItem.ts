import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

class SaleItem extends Model<
  InferAttributes<SaleItem>,
  InferCreationAttributes<SaleItem>
> {
  id!: CreationOptional<string>;
  transactionId!: ForeignKey<string>;
  cost!: number;
  taxRate!: number;
  itemId!: string;

  public static associate(models: any) {
    SaleItem.belongsTo(models.Transaction, {
      foreignKey: "transactionId",
      as: "transaction",
    });
  }
}

export default (sequelize: Sequelize) => {
  SaleItem.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      transactionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Transaction",
          key: "id",
        },
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taxRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "SaleItem",
      sequelize,
      timestamps: false,
    }
  );

  return SaleItem;
};
