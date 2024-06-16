module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transaction", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      eventType: {
        type: Sequelize.ENUM,
        values: ["SALES", "TAX_PAYMENT"],
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      invoiceId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Transaction");
  },
};
