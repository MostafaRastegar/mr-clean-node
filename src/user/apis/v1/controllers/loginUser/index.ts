import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
const { ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET" } = process.env;

export default (userService: IUserService) =>
  async function loginUser(
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
      const { password, ...userWithoutPassword } = user;
      const token = jwt.sign(userWithoutPassword, ACCESS_TOKEN_SECRET);

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
  };
