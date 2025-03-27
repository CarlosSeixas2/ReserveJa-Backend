import { SolicitationRepository } from "../repository/solicitation-repository";
import { DeleteSolicitationService } from "../services/delete-solicitation";

export function makeDeleteSolicitationService() {
  const solicitationRepository = new SolicitationRepository();

  return new DeleteSolicitationService(solicitationRepository);
}
