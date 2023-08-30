import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface ResponseFormatterProps {
  data?: any;
  message: string;
  code: number;
}

const responseFormatter =
  (res: Response) =>
  ({ data = null, message, code }: ResponseFormatterProps) => {
    const response = {
      success: code >= StatusCodes.OK && code < StatusCodes.MULTIPLE_CHOICES,
      data: data,
      message: message,
      code: code,
    };
    res.status(code).json(response);
  };

export default responseFormatter;
