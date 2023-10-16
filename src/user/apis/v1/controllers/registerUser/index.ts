import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { UserRegisterDTO, UserWithoutId } from "@/user/models/User";
import { userResponseDTO } from "@/user/repositories/dtos/userResponseDTO";
import { registerUserDTO } from "@/user/repositories/dtos/userRegisterDTO";
import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
import { checkUserIsExist } from "@/user/helpers";

export default (userService: IUserService) =>
  async function registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: UserWithoutId = req.body;
      const userExist = await checkUserIsExist(
        userService,
        userData.email,
        res
      );

      if (!userExist) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createdUser = await userService.createUser({
          ...registerUserDTO(userData),
          password: hashedPassword,
        });
        return responseFormatter(res)({
          data: userResponseDTO(createdUser),
          message: ReasonPhrases.OK,
          code: StatusCodes.CREATED,
        });
      }
    } catch (error) {
      next(error);
    }
  };
