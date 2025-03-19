import { UserRepository } from "../repository/user-repository";
import { FindAllUserService } from "../services/find-all-user";

export function makeFindAllUserService() {
  const userRepository = new UserRepository();
  return new FindAllUserService(userRepository);
}
