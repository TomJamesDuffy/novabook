import createApp from "./app";

import sequelize from "../db/sequelize.config";

const startServer = async () => {
  const app = await createApp(sequelize);
  const port = 3001;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

startServer();
