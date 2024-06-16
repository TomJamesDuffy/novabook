import supertest from "supertest";
import { Express } from "express";
import Models from "../../../models";

import { runMigrations, rollbackMigrations } from "../../utils/migrate";

import sequelize from "../../../db/sequelize.config";
import createApp from "../../app";

let app: Express;

describe("Create Sales Transaction Endpoint", () => {
  beforeAll(async () => {
    app = await createApp(sequelize);
    await runMigrations();
  });

  afterAll(async () => {
    await rollbackMigrations();
  });

  it("should create a sales transaction", async () => {
    const newSalesTransaction = {
      eventType: "SALES",
      date: new Date().toISOString(),
      invoiceId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
      items: [
        {
          itemId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
          cost: 500,
          taxRate: 0.1,
        },
        {
          itemId: "4303ebef-627a-4593-9bb9-e8ff724d3530",
          cost: 450,
          taxRate: 0.1,
        },
      ],
    };

    await supertest(app)
      .post("/transactions")
      .send(newSalesTransaction)
      .expect(202);

    const salesItems = await Models.SaleItem.findAll({
      where: {
        cost: 500,
      },
    });

    expect(salesItems).toHaveLength(1);
  });
});
