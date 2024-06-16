import express from "express";
import { json } from "body-parser";
import { Sequelize } from "sequelize";

import routers from "./routers";

import { errorHandlingMiddleware } from "./middleware/error-handler";
import loggerMiddleware from "./middleware/logger";
import { metricsMiddleware, metricsRoute } from "./middleware/metrics";

const createApp = async (sequelize: Sequelize) => {
  await sequelize.authenticate();
  await sequelize.sync();

  const app = express();

  app.use(json());

  app.use(metricsMiddleware);
  app.use(loggerMiddleware);

  routers.forEach((router) => app.use(router));

  app.get("/metrics", metricsRoute);
  app.use(errorHandlingMiddleware);

  return app;
};

export default createApp;
