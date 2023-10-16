import { IUserService } from "@/user/services/IUserService";
import responseFormatter from "@/utils/responseFormatter";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function checkUserIsExist(
  userService: IUserService,
  userEmail: string,
  res: Response
): Promise<boolean> {
  const userDetail = await userService.getUserByEmail(userEmail);
  if (userDetail) {
    responseFormatter(res)({
      message: "User is exist",
      code: StatusCodes.CONFLICT,
    });
    return true;
  }
  return false;
}
export async function checkUserExistById(
  userService: IUserService,
  id: string,
  res: Response
): Promise<boolean> {
  const userDetail = await userService.getUserById(id);
  if (userDetail) {
    return true;
  }
  responseFormatter(res)({
    message: "User not exist",
    code: StatusCodes.NOT_FOUND,
  });
  return false;
}
