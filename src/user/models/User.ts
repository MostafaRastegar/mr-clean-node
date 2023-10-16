import { ObjectId } from "mongoose";

export interface UserUpdateDTO extends Pick<User, "isAdmin" | "name"> {}
export interface UserRegisterDTO extends UserWithoutId {}
export interface UserResponseDTO extends Omit<User, "password"> {}

export interface UserWithoutId extends Omit<User, "_id"> {}
export interface UserWithId extends User {
  id: ObjectId;
}

interface User {
  email: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
export default User;
