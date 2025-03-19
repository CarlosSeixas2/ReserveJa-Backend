import { UserRepository } from "../repository/user-repository";
import { UpdateUserService } from "../services/update-user";

export function makeUpdateUserService() {
  const userRepository = new UserRepository();
  return new UpdateUserService(userRepository);
}
