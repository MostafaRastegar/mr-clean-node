import { Request, Response, NextFunction } from "express";
import type { Express } from "express";
import responseFormatter from "@/utils/responseFormatter";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  responseFormatter(res)({
    data: null,
    message: "API not found.",
    code: 404,
  });
};

export default notFoundMiddleware;
