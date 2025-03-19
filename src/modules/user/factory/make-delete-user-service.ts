import { UserRepository } from "../repository/user-repository";
import { DeleteUserService } from "../services/delete-user";

export function makeDeleteUserService() {
  const userRepository = new UserRepository();
  return new DeleteUserService(userRepository);
}
