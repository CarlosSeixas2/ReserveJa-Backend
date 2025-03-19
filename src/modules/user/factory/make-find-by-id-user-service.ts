import { UserRepository } from "../repository/user-repository";
import { FindByIdUserService } from "../services/find-by-id-user";

export function makeFindByIdUserService() {
  const userRepository = new UserRepository();
  return new FindByIdUserService(userRepository);
}
