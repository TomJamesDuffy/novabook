import supertest from "supertest";
import { Express } from "express";

import { runMigrations, rollbackMigrations } from "../../utils/migrate";

import sequelize from "../../../db/sequelize.config";
import createApp from "../../app";

let app: Express;

describe("Sale Amendment Endpoint", () => {
  beforeAll(async () => {
    app = await createApp(sequelize);
    await runMigrations();
  });

  afterAll(async () => {
    await rollbackMigrations();
  });

  it("should create a sale amendment", async () => {
    const newSaleAmendment = {
      date: "2021-01-01",
      invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
      itemId: "3c7dab25-6e3a-4b28-b682-333ca24e5a7e",
      taxRate: 0.5,
      cost: 10000,
    };
    await supertest(app).patch("/sale").send(newSaleAmendment).expect(202);
  });
  it("should throw a 400 if there is no invoiceId", async () => {
    const newSaleAmendment = {
      date: "2021-01-01",
      itemId: "3c7dab25-6e3a-4b28-b682-333ca24e5a7e",
      taxRate: 0.5,
      cost: 10000,
    };
    await supertest(app).patch("/sale").send(newSaleAmendment).expect(400);
  });
  it("should throw a 400 if there is no itemId", async () => {
    const newSaleAmendment = {
      date: "2021-01-01",
      invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
      taxRate: 0.5,
      cost: 10000,
    };
    await supertest(app).patch("/sale").send(newSaleAmendment).expect(400);
  });
  it("should throw a 400 if there is no taxRate and no cost", async () => {
    const newSaleAmendment = {
      date: "2021-01-01",
      invoiceId: "3c06ba6a-47fb-4b32-ab2f-93274b6053b2",
    };
    await supertest(app).patch("/sale").send(newSaleAmendment).expect(400);
  });
});
