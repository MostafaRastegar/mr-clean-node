import { NextFunction, Request, Response } from "express";
import { UserUpdateDTO, UserRegisterDTO } from "@/user/models/User";
import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { registerUserDTO } from "@/user/dtos/userRegisterDTO";
import { userResponseDTO } from "@/user/dtos/userResponseDTO";
import { userUpdateDTO } from "@/user/dtos/userUpdateDTO";

const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET" } = process.env;

class UserController {
  constructor(private userService: IUserService) {
    this.userService = userService;
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: UserRegisterDTO = req.body;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const createdUser = await this.userService.createUser({
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
  }

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userEmail: string = req.body.email;
      const user = await this.userService.getUserByEmail(userEmail);

      if (!user) {
        throw new Error("User not found.");
      }

      const result = await bcrypt.compare(req.body.password, user.password);

      if (!result) {
        throw new Error("Password doesn't match.");
      }

      const token = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET);
      res.cookie("carData", token);

      responseFormatter(res)({
        data: token,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: string = req.params.id;
      const userData: UserUpdateDTO = userUpdateDTO(req.body);
      const updatedUser = await this.userService.updateUser(userId, userData);

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
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: string = req.params.id;
      const deleted = await this.userService.deleteUser(userId);
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
  }
}

export default UserController;
