import User from "./User";

export interface IUserService {
  createUser(userData: User): Promise<User>;
  getUserByEmail(userEmail: string): Promise<User | null>;
  updateUser(userId: string, User: User): Promise<User | null>;
  deleteUser(userId: string): Promise<boolean>;
}
