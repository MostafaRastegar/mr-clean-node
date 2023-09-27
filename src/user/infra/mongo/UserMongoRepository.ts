import UserRepositoryModel from "./UserMongoRepositoryModel";
import { IUserRepository } from "@/user/repositories/IUserRepository";
import User from "@/user/models/User";

class UserMongoRepository implements IUserRepository {
  private mapUserRepositoryToUser(userMongoose: any): User {
    return {
      email: userMongoose.email,
      name: userMongoose.name,
      password: userMongoose.password,
      isAdmin: userMongoose.isAdmin,
      id: userMongoose._id.toString(),
    };
  }
  async create(userData: User): Promise<User> {
    const user = await UserRepositoryModel.create(userData);
    return this.mapUserRepositoryToUser(user);
  }

  async getById(userId: string): Promise<User | null> {
    const user = await UserRepositoryModel.findById(userId).exec();
    return user ? this.mapUserRepositoryToUser(user) : null;
  }
  async getByEmail(userEmail: string): Promise<User | null> {
    const user = await UserRepositoryModel.findOne({ email: userEmail }).exec();
    return user ? this.mapUserRepositoryToUser(user) : null;
  }

  async update(userId: string, userData: User): Promise<User | null> {
    const updatedUser = await UserRepositoryModel.findByIdAndUpdate(
      userId,
      userData,
      {
        new: true,
      }
    ).exec();
    return updatedUser ? this.mapUserRepositoryToUser(updatedUser) : null;
  }

  async delete(userId: string): Promise<boolean> {
    const result = await UserRepositoryModel.findByIdAndDelete(userId).exec();
    return !!result;
  }
}

export default UserMongoRepository;
