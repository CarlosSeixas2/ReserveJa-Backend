import { SolicitationRepository } from "../repository/solicitation-repository";
import { UpdateSolicitationService } from "../services/update-solicitation";

export function makeUpdateSolicitationService() {
  const solicitationRepository = new SolicitationRepository();

  return new UpdateSolicitationService(solicitationRepository);
}
