import { IUserService } from "@/user/services/IUserService";
import registerUser from "./registerUser";
import loginUser from "./loginUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

function UserController(userService: IUserService) {
  return {
    registerUser: registerUser(userService),
    loginUser: loginUser(userService),
    updateUser: updateUser(userService),
    deleteUser: deleteUser(userService),
  };
}

export default UserController;
