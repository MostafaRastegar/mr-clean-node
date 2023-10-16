import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { UserUpdateDTO } from "@/user/models/User";
import { userResponseDTO } from "@/user/repositories/dtos/userResponseDTO";
import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
import checkUserId from "@/utils/checkUserId";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";
import { userUpdateDTO } from "@/user/repositories/dtos/userUpdateDTO";

export default (userService: IUserService) =>
  async function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const validUserId = checkUserId(userId, req as RequestWithUser, res);
      if (validUserId) {
        const userData: UserUpdateDTO = userUpdateDTO(req.body);
        const updatedUser = await userService.updateUser(userId, userData);

        if (updatedUser) {
          return responseFormatter(res)({
            data: userResponseDTO(updatedUser),
            message: ReasonPhrases.OK,
            code: StatusCodes.OK,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
