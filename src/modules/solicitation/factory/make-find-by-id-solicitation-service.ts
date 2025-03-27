import { SolicitationRepository } from "../repository/solicitation-repository";
import { FindByIdSolicitationService } from "../services/find-by-id-solicitation";

export function makeFindByIdSolicitationService() {
  const solicitationRepository = new SolicitationRepository();

  return new FindByIdSolicitationService(solicitationRepository);
}
