import { UserRepository } from "../../user/repository/user-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { UpdateSolicitationService } from "../services/update-solicitation";

export function makeUpdateSolicitationService() {
  const solicitationRepository = new SolicitationRepository();
  const userRepository = new UserRepository();

  return new UpdateSolicitationService(solicitationRepository, userRepository);
}
