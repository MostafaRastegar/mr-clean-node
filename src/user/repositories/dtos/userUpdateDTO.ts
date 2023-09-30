import { UserUpdateDTO } from "@/user/models/User";

export const userUpdateDTO = (body: UserUpdateDTO): UserUpdateDTO => ({
  name: body?.name,
  isAdmin: body?.isAdmin,
});
