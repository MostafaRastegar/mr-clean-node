import { StatusCodes } from "http-status-codes";
import responseFormatter from "./responseFormatter";
import { Response } from "express";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";

const checkUser = (userId: string, req: RequestWithUser, res: Response) => {
  if (userId !== req.user._id.toString()) {
    responseFormatter(res)({
      message: "User not permission.",
      code: StatusCodes.FORBIDDEN,
    });
  }
};

export default checkUser;
