import User from "../models/User";
import { IAuthRepository } from "../models/IAuthRepository";

class AuthService {
  AuthRepository: IAuthRepository;
  constructor(AuthRepository: IAuthRepository) {
    this.AuthRepository = AuthRepository;
  }

  async createUser(userData: User): Promise<User> {
    return await this.AuthRepository.create(userData);
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.AuthRepository.getById(userId);
  }

  async updateUser(userId: string, userData: User): Promise<User | null> {
    return await this.AuthRepository.update(userId, userData);
  }

  async deleteUser(userId: string): Promise<boolean> {
    return await this.AuthRepository.delete(userId);
  }
}

export default AuthService;
