import { Request, Response } from "express";
import User from "../models/User";
import { IUserService } from "../models/IUserService";
import responseFormatter from "@root/presentation/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
class UserController {
  constructor(private userService: IUserService) {
    this.userService = userService;
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: User = req.body;
      const createdUser = await this.userService.createUser(userData);
      responseFormatter(res)({
        data: createdUser,
        message: ReasonPhrases.OK,
        code: StatusCodes.CREATED,
      });
    } catch (error) {
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const userEmail: string = req.body.email;
      const user = await this.userService.getUserByEmail(userEmail);
      if (!user) {
        responseFormatter(res)({
          message: "User not found.",
          code: StatusCodes.NOT_FOUND,
        });
        return;
      }
      return responseFormatter(res)({
        data: user,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      console.log("error :>> ", error);
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updatedUser = await this.userService.updateUser(userId, userData);
      if (!updatedUser) {
        responseFormatter(res)({
          message: "User not found.",
          code: StatusCodes.NOT_FOUND,
        });
      }
      responseFormatter(res)({
        data: updatedUser,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id;
      const deleted = await this.userService.deleteUser(userId);
      if (!deleted) {
        responseFormatter(res)({
          message: "User not found.",
          code: StatusCodes.NOT_FOUND,
        });
        return;
      }
      responseFormatter(res)({
        message: "User deleted successfully.",
        code: StatusCodes.CREATED,
      });
    } catch (error) {
      res;

      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default UserController;
