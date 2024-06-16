module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SaleAmendment", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      invoiceId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      taxRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("SaleAmendment");
  },
};
