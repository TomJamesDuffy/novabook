import { Sequelize, Dialect } from "sequelize";

import logger from "../src/utils/logger";
import config from "./config.json";

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port: number;
}

const environment = process.env.NODE_ENV || "development";
const envConfig = config[environment as keyof typeof config] as DBConfig;

const connectionUri = `postgresql://${envConfig.username}:${envConfig.password}@${envConfig.host}:${envConfig.port}/${envConfig.database}`;

const sequelize = new Sequelize(connectionUri, {
  dialect: "postgres",
  logging: (msg) => {
    if (logger) return logger.info(msg);
  },
});

export default sequelize;
