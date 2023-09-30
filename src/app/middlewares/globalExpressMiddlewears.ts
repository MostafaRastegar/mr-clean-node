import type { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
var cookieParser = require("cookie-parser");

const globalExpressMiddlewares = (app: Express, express: any) => {
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  app.use(helmet());
  app.use(morgan("dev"));
};

export default globalExpressMiddlewares;
