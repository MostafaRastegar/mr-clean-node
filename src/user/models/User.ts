export interface UserUpdateDTO extends Pick<User, "isAdmin" | "name"> {}
export interface UserRegisterDTO extends Omit<User, "id"> {}
export interface UserResponseDTO extends Omit<User, "password"> {}

interface User {
  email: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  id: string;
}
export default User;
