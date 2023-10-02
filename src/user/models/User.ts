import { ObjectId } from "mongoose";

export interface UserUpdateDTO extends Pick<User, "isAdmin" | "name"> {}
export interface UserRegisterDTO extends User {}
export interface UserResponseDTO extends Omit<User, "password"> {}

interface User {
  email: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  _id: ObjectId;
}
export default User;
