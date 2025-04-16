import { SolicitationRepository } from "../repository/solicitation-repository";
import { FindAllSolicitationService } from "../services/find-all-solicitation";

export function makeFindAllSolicitationService() {
  const solicitationRepository = new SolicitationRepository();

  return new FindAllSolicitationService(solicitationRepository);
}
