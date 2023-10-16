import type { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
const cookieParser = require("cookie-parser");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

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
  app.use(limiter);
  app.use(
    cors({
      origin: "http://localhost:5000",
    })
  );
};

export default globalExpressMiddlewares;
