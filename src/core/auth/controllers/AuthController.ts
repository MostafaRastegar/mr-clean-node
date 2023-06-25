import { Request, Response } from "express";
import User from "../models/User";
import { IAuthService } from "../models/IAuthService";
import responseFormatter from "@root/presentation/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
class AuthController {
  constructor(private authService: IAuthService) {
    this.authService = authService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: User = req.body;
      const createdUser = await this.authService.createUser(userData);
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

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id;
      const user = await this.authService.getUserById(userId);
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
      const updatedUser = await this.authService.updateUser(userId, userData);
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
      const deleted = await this.authService.deleteUser(userId);
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

export default AuthController;
