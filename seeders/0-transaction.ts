module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Transaction", [
      {
        id: "e31a13b7-b650-463a-a550-03af085eeafe",
        eventType: "SALES",
        date: new Date("2023-01-01T00:00:00Z"),
        invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
      },
      {
        id: "03d26989-cfa5-4573-a76e-bc41282574bd",
        eventType: "TAX_PAYMENT",
        date: new Date("2023-02-01T00:00:00Z"),
        amount: 100,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Transaction", {}, {});
  },
};
