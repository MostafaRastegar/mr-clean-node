import User from "@/user/models/User";
import { IUserRepository } from "@/user/repositories/IUserRepository";
import { IUserService } from "@/user/services/IUserService";

function UserService(UserRepository: IUserRepository): IUserService {
  return {
    async createUser(userData: User): Promise<User> {
      return await UserRepository.create(userData);
    },

    async getUserByEmail(userEmail: string): Promise<User | null> {
      return await UserRepository.getByEmail(userEmail);
    },

    async updateUser(userId: string, userData: User): Promise<User | null> {
      return await UserRepository.update(userId, userData);
    },
    async deleteUser(userId: string): Promise<boolean> {
      return await UserRepository.delete(userId);
    },
  };
}

export default UserService;
