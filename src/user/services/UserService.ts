import User from "@/user/models/User";
import { IUserRepository } from "@/user/repositories/IUserRepository";
import { IUserService } from "@/user/services/IUserService";

class UserService implements IUserService {
  UserRepository: IUserRepository;
  constructor(UserRepository: IUserRepository) {
    this.UserRepository = UserRepository;
  }

  async createUser(userData: User): Promise<User> {
    console.log("userData :>> ", userData);
    return await this.UserRepository.create(userData);
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    return await this.UserRepository.getByEmail(userEmail);
  }

  async updateUser(userId: string, userData: User): Promise<User | null> {
    return await this.UserRepository.update(userId, userData);
  }

  async deleteUser(userId: string): Promise<boolean> {
    return await this.UserRepository.delete(userId);
  }
}

export default UserService;
