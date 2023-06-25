import { Request, Response, NextFunction } from "express";
import type { Express } from "express";
import responseFormatter from "../utils/responseFormatter";

export class HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  error: string | null;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}

const errorMiddleware = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    responseFormatter({
      res,
      success: false,
      data: null,
      message: "Post not found.",
      code: 404,
    });
  });

  app.use(
    (error: HttpException, req: Request, res: Response, next: NextFunction) => {
      const status = error.statusCode || error.status || 500;
      responseFormatter({
        res,
        success: false,
        data: error,
        message: "server error",
        code: status,
      });
      next();
    }
  );
};

export default errorMiddleware;
