import User from "./User";

export interface IUserRepository {
  create(userData: User): Promise<User>;
  getById(userId: string): Promise<User | null>;
  getByEmail(userEmail: string): Promise<User | null>;
  update(userId: string, User: User): Promise<User | null>;
  delete(userId: string): Promise<boolean>;
}
