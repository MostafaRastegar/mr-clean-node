import User, { UserWithoutId } from "@/user/models/User";

export const registerUserDTO = (body: UserWithoutId): UserWithoutId => ({
  email: body?.email,
  name: body?.name,
  isAdmin: body?.isAdmin || false,
  password: body?.password,
});
