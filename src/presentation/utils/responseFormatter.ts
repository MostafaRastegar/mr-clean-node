import { Response } from "express";

interface ResponseFormatterProps {
  res: Response;
  success: boolean;
  data: any;
  message: string;
  code: number;
}

const responseFormatter = ({
  res,
  success,
  data,
  message,
  code,
}: ResponseFormatterProps) => {
  const response = {
    success: success,
    data: data,
    message: message,
    code: code,
  };
  res.status(code).json(response);
};

export default responseFormatter;
