import { swaggerOptions } from "./swagger/swagger_setup";
import { authenticateMiddleware } from "./middlewares/auth_middleware";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const specs = swaggerJsdoc(swaggerOptions);

export const appPromise: Promise<any> = new Promise((resolve) => {
  const app = express();
  const port = process.env.PORT;

  mongoose.connect(process.env.DB_CONNECT);
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to database"));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

  app.use(authenticateMiddleware);

  const postsRouter = require("./routes/posts_route");
  const commentsRouter = require("./routes/comments_route");
  const usersRouter = require("./routes/users_route");
  const authRouter = require("./routes/auth_route");
  app.use("/auth", authRouter);
  app.use("/posts", postsRouter);
  app.use("/comments", commentsRouter);
  app.use("/users", usersRouter);

  app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
  });
});