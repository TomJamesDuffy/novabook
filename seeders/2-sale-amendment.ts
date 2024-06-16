module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("SaleAmendment", [
      {
        id: "657833ff-a1f3-460d-b295-30e8d40d264e",
        date: new Date("2023-05-01T00:00:00Z"),
        invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
        itemId: "d1af4d85-4395-40fa-a6cd-39bbd68b9014",
        taxRate: 0.15,
      },
      {
        id: "b76db39a-4cbd-4e43-a090-6c5e32cd65ba",
        date: new Date("2023-07-01T00:00:00Z"),
        invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
        itemId: "3c7dab25-6e3a-4b28-b682-333ca24e5a7e",
        taxRate: 0.2,
        cost: 50,
      },
      {
        id: "e0e4c363-ef32-4c91-8a90-3980c576c409",
        date: new Date("2023-09-01T00:00:00Z"),
        invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
        itemId: "3c7dab25-6e3a-4b28-b682-333ca24e5a7e",
        taxRate: 0.3,
        cost: 100,
      },
      {
        id: "4edf20b2-ae3e-477e-9f1c-9496709d1f07",
        date: new Date("2023-11-01T00:00:00Z"),
        invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
        itemId: "3c7dab25-6e3a-4b28-b682-333ca24e5a7e",
        cost: 500,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("SaleAmendment", {}, {});
  },
};
