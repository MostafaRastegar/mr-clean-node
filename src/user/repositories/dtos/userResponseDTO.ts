import User, { UserResponseDTO } from "@/user/models/User";

export const userResponseDTO = (user: User): UserResponseDTO => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
