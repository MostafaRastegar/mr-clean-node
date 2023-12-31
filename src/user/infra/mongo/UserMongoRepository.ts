import UserRepositoryModel from "./UserMongoRepositoryModel";
import { IUserRepository } from "@/user/repositories/IUserRepository";
import User, { UserWithId, UserWithoutId } from "@/user/models/User";

const mapUserRepositoryToUser = function (userMongoose: any): UserWithId {
  return {
    email: userMongoose.email,
    name: userMongoose.name,
    password: userMongoose.password,
    isAdmin: userMongoose.isAdmin,
    id: userMongoose._id,
    created_at: userMongoose?.created_at,
    updated_at: userMongoose?.updated_at,
  };
};

function UserMongoRepository(): IUserRepository {
  return {
    async create(userData: UserWithoutId): Promise<User> {
      const user = await UserRepositoryModel.create(userData);
      return mapUserRepositoryToUser(user);
    },

    async getById(userId: string): Promise<User | null> {
      const user = await UserRepositoryModel.findById(userId).exec();
      return user ? mapUserRepositoryToUser(user) : null;
    },
    async getByEmail(userEmail: string): Promise<User | null> {
      const user = await UserRepositoryModel.findOne({
        email: userEmail,
      }).exec();
      return user ? mapUserRepositoryToUser(user) : null;
    },

    async update(userId: string, userData: User): Promise<User | null> {
      const updatedUser = await UserRepositoryModel.findByIdAndUpdate(
        userId,
        { ...userData, updated_at: Date.now() },
        {
          new: true,
        }
      ).exec();
      return updatedUser ? mapUserRepositoryToUser(updatedUser) : null;
    },

    async delete(userId: string): Promise<boolean> {
      const result = await UserRepositoryModel.findByIdAndDelete(userId).exec();
      return !!result;
    },
  };
}

export default UserMongoRepository;
