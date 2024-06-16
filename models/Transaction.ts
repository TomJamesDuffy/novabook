import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import EventType from "./EventType";

class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  id!: CreationOptional<string>;
  eventType!: EventType;
  date!: Date;
  invoiceId?: string;
  amount?: number;

  public static associate(models: any) {
    Transaction.hasMany(models.SaleItem, {
      foreignKey: "transactionId",
      as: "items",
    });
  }
}

export default (sequelize: Sequelize) => {
  Transaction.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eventType: {
        type: DataTypes.ENUM,
        values: Object.values(EventType),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      invoiceId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "Transaction",
      sequelize,
      timestamps: false,
    }
  );

  return Transaction;
};
