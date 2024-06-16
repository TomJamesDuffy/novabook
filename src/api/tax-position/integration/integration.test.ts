import supertest from "supertest";
import { Express } from "express";

import { runMigrations, rollbackMigrations } from "../../../utils/migrate";
import sequelize from "../../../../db/sequelize.config";
import createApp from "../../../app";
import Model from "../../../../models";

import {
  newSalesTransaction,
  newTaxTransaction,
  newSaleAmendments,
} from "./data";

let app: Express;

describe("Create Sales Transaction Endpoint", () => {
  beforeAll(async () => {
    app = await createApp(sequelize);
    await runMigrations();
  });

  afterAll(async () => {
    await rollbackMigrations();
  });

  it("should calculate the tax position, removing the seed data at different points in time", async () => {
    await Model.Transaction.bulkCreate(
      [...newSalesTransaction, ...newTaxTransaction],
      {
        include: [
          {
            model: Model.SaleItem,
            as: "items",
          },
        ],
      }
    );
    await Model.SaleAmendment.bulkCreate(newSaleAmendments);

    await supertest(app)
      .get("/tax-position?date=2022-12-31T00:00:00Z")
      .expect(200)
      .expect({
        date: "2022-12-31T00:00:00Z",
        taxPosition: 0,
      });

    await supertest(app)
      .get("/tax-position?date=2023-01-31T00:00:00Z")
      .expect(200)
      .expect({
        date: "2023-01-31T00:00:00Z",
        taxPosition: -95,
      });

    await supertest(app)
      .get("/tax-position?date=2023-03-31T00:00:00Z")
      .expect(200)
      .expect({
        date: "2023-03-31T00:00:00Z",
        taxPosition: -490,
      });

    await supertest(app)
      .get("/tax-position?date=2023-05-31T00:00:00Z")
      .expect(200)
      .expect({
        date: "2023-05-31T00:00:00Z",
        taxPosition: -2250,
      });

    await supertest(app)
      .get("/tax-position?date=2023-08-31T00:00:00Z")
      .expect(200)
      .expect({
        date: "2023-08-31T00:00:00Z",
        taxPosition: -3350,
      });
  });
});
