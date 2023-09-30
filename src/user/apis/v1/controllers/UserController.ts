import { NextFunction, Request, Response } from "express";
import { UserUpdateDTO, UserRegisterDTO } from "@/user/models/User";
import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { registerUserDTO } from "@/user/repositories/dtos/userRegisterDTO";
import { userResponseDTO } from "@/user/repositories/dtos/userResponseDTO";
import { userUpdateDTO } from "@/user/repositories/dtos/userUpdateDTO";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";
import checkUser from "@/utils/checkUserid";
const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET" } = process.env;

function UserController(userService: IUserService) {
  return {
    async registerUser(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const userData: UserRegisterDTO = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createdUser = await userService.createUser({
          ...registerUserDTO(userData),
          password: hashedPassword,
        });
        const response = createdUser
          ? {
              data: userResponseDTO(createdUser),
              message: ReasonPhrases.OK,
              code: StatusCodes.CREATED,
            }
          : {
              data: null,
              message: ReasonPhrases.UNPROCESSABLE_ENTITY,
              code: StatusCodes.UNPROCESSABLE_ENTITY,
            };

        return responseFormatter(res)(response);
      } catch (error) {
        next(error);
      }
    },

    async loginUser(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const userEmail: string = req.body.email;
        const user = await userService.getUserByEmail(userEmail);

        if (!user) {
          throw new Error("User not found.");
        }

        const result = await bcrypt.compare(req.body.password, user.password);

        if (!result) {
          throw new Error("Password doesn't match.");
        }

        const token = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET);

        res.cookie("JWT_TOKEN", token, {
          expires: new Date(Date.now() + 9999999),
          secure: true,
          httpOnly: true,
          maxAge: 30 * 60 * 24,
          domain: "localhost",
        });

        return responseFormatter(res)({
          data: token,
          message: ReasonPhrases.OK,
          code: StatusCodes.OK,
        });
      } catch (error) {
        next(error);
      }
    },

    async updateUser(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const userId: string = req.params.id;
        if (userId !== (req as RequestWithUser).user.id) {
          return responseFormatter(res)({
            message: "User not permission.",
            code: StatusCodes.FORBIDDEN,
          });
        }
        const userData: UserUpdateDTO = userUpdateDTO(req.body);
        const updatedUser = await userService.updateUser(userId, userData);

        if (updatedUser) {
          return responseFormatter(res)({
            data: userResponseDTO(updatedUser),
            message: ReasonPhrases.OK,
            code: StatusCodes.OK,
          });
        }

        return responseFormatter(res)({
          message: "User not found.",
          code: StatusCodes.NOT_FOUND,
        });
      } catch (error) {
        next(error);
      }
    },

    async deleteUser(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const userId: string = req.params.id;
        checkUser(userId, req as RequestWithUser, res);

        const deleted = await userService.deleteUser(userId);
        if (!deleted) {
          return responseFormatter(res)({
            message: "User not found.",
            code: StatusCodes.NOT_FOUND,
          });
        }
        return responseFormatter(res)({
          message: "User deleted successfully.",
          code: StatusCodes.CREATED,
        });
      } catch (error) {
        next(error);
      }
    },
  };
}

export default UserController;
