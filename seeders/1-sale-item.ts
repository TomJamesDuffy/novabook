module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("SaleItem", [
      {
        id: "9f7fa185-13ec-4a50-b8ad-7c83950aa9c2",
        transactionId: "e31a13b7-b650-463a-a550-03af085eeafe",
        itemId: "d1af4d85-4395-40fa-a6cd-39bbd68b9014",
        cost: 800,
        taxRate: 0.1,
      },
      {
        id: "3c7dab25-6e3a-4b28-b682-333ca24e5a7e",
        transactionId: "e31a13b7-b650-463a-a550-03af085eeafe",
        itemId: "454f25bc-957f-4eb7-a157-2abc80e52708",
        cost: 1000,
        taxRate: 0.2,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("SaleItem", {}, {});
  },
};
