import UserMongoRepository from "@/user/infra/mongo/UserMongoRepository";

const UserRepository = UserMongoRepository();

export { UserRepository };
