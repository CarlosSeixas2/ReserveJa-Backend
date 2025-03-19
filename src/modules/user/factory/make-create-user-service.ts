import { UserRepository } from "../repository/user-repository";
import { CreateUserService } from "../services/create-user";

export function makeCreateUserService() {
  const userRepository = new UserRepository();
  return new CreateUserService(userRepository);
}
