import { StatusCodes } from "http-status-codes";
import responseFormatter from "./responseFormatter";
import { Response } from "express";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";

const checkUser = (userId: string, req: RequestWithUser, res: Response) => {
  console.log("userId :>> ", userId);
  if (userId !== req.user.id) {
    responseFormatter(res)({
      message: "User not permission.",
      code: StatusCodes.FORBIDDEN,
    });
  }
};

export default checkUser;
