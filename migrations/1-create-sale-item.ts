module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SaleItem", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Transaction",
          key: "id",
        },
      },
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      taxRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("SaleItem");
  },
};
