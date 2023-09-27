import { Request, Response, NextFunction } from "express";
import type { Express } from "express";
import responseFormatter from "@/utils/responseFormatter";
import { StatusCodes } from "http-status-codes";

const serverErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware Error Hadnling");
  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errMsg = error.message || "Something went wrong";

  responseFormatter(res)({
    data: null,
    message: errMsg,
    code: status,
  });
  next();
};

export default serverErrorMiddleware;
