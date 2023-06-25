import type { Express } from "express";

const globalExpressMiddlewares = (app: Express, express: any) => {
  app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
};

export default globalExpressMiddlewares;
