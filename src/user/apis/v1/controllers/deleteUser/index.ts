import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
import checkUserId from "@/utils/checkUserId";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";

export default (userService: IUserService) =>
  async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: string = req.params.id;
      const validUserId = checkUserId(userId, req as RequestWithUser, res);
      console.log("validUserId :>> ", validUserId);
      if (validUserId) {
        const deleted = await userService.deleteUser(userId);
        if (deleted) {
          return responseFormatter(res)({
            message: "User deleted successfully.",
            code: StatusCodes.CREATED,
          });
        } else {
          return responseFormatter(res)({
            message: "User not found.",
            code: StatusCodes.NOT_FOUND,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
