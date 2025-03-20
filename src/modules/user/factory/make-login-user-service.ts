import { UserRepository } from "../repository/user-repository";
import { LoginUserService } from "../services/login-user";

export function makeLoginUserService() {
  const userRepository = new UserRepository();
  return new LoginUserService(userRepository);
}
