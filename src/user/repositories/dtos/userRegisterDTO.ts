import { UserRegisterDTO } from "@/user/models/User";

export const registerUserDTO = (body: UserRegisterDTO): UserRegisterDTO => ({
  email: body?.email,
  name: body?.name,
  isAdmin: body?.isAdmin,
  password: body?.password,
});