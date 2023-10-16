import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  errors.array();
  res.status(422).json({
    errors: errors.array(),
  });
};

export default validationMiddleware;
