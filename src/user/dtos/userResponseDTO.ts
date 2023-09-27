import User, { UserResponseDTO } from "../models/User";

export const userResponseDTO = (user: User): UserResponseDTO => ({
  email: user?.email,
  name: user?.name,
  isAdmin: user?.isAdmin,
  id: user?.id,
});
