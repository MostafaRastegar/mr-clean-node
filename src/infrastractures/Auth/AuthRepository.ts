import AuthRepositoryModel from "./AuthRepositoryModel";
import { IAuthRepository } from "../../core/auth/models/IAuthRepository";
import User from "../../core/auth/models/User";

class AuthRepository implements IAuthRepository {
  private mapAuthRepositoryToUser(authMongoose: any): User {
    return {
      id: authMongoose._id.toString(),
      email: authMongoose.email,
      name: authMongoose.name,
      password: authMongoose.password,
      isAdmin: authMongoose.isAdmin,
      createdAt: authMongoose.createdAt,
    };
  }
  async create(userData: User): Promise<User> {
    const user = await AuthRepositoryModel.create(userData);
    return this.mapAuthRepositoryToUser(user);
  }

  async getById(userId: string): Promise<User | null> {
    const user = await AuthRepositoryModel.findById(userId).exec();
    return user ? this.mapAuthRepositoryToUser(user) : null;
  }

  async update(userId: string, userData: User): Promise<User | null> {
    const updatedUser = await AuthRepositoryModel.findByIdAndUpdate(
      userId,
      userData,
      {
        new: true,
      }
    ).exec();
    return updatedUser ? this.mapAuthRepositoryToUser(updatedUser) : null;
  }

  async delete(userId: string): Promise<boolean> {
    const result = await AuthRepositoryModel.findByIdAndDelete(userId).exec();
    return !!result;
  }
}

export default AuthRepository;
