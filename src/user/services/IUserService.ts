import User, { UserRegisterDTO, UserUpdateDTO } from "@/user/models/User";

export interface IUserService {
  createUser(userData: UserRegisterDTO): Promise<User>;
  getUserByEmail(userEmail: string): Promise<User | null>;
  updateUser(userId: string, User: UserUpdateDTO): Promise<User | null>;
  deleteUser(userId: string): Promise<boolean>;
}
