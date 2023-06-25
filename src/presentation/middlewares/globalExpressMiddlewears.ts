import type { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const globalExpressMiddlewares = (app: Express, express: any) => {
  app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "*", // Set the allowed origin
      methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH"], // Set the allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Set the allowed headers
    })
  );
};

export default globalExpressMiddlewares;
