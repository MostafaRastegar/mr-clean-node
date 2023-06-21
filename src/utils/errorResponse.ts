import { Response } from "express";

const errorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ error: message });
};

export default errorResponse;
