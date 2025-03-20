import { UserRepository } from "../repository/user-repository";
import { ProfileUserService } from "../services/profile-user";

export function makeProfileUserService() {
  const userRepository = new UserRepository();
  return new ProfileUserService(userRepository);
}
