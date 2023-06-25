import User from "./User";

export interface IAuthService {
  createUser(userData: User): Promise<User>;
  getUserById(userId: string): Promise<User | null>;
  updateUser(userId: string, User: User): Promise<User | null>;
  deleteUser(userId: string): Promise<boolean>;
}
