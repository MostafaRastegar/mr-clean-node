import User, { UserWithoutId } from "@/user/models/User";

export interface IUserRepository {
  create(userData: UserWithoutId): Promise<User>;
  getById(userId: string): Promise<User | null>;
  getByEmail(userEmail: string): Promise<User | null>;
  update(userId: string, User: User): Promise<User | null>;
  delete(userId: string): Promise<boolean>;
}
