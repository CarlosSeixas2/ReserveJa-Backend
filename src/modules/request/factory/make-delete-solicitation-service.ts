import { SolicitationTimeRepository } from "../../requested_time/repository/solicitation-time-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { DeleteSolicitationService } from "../services/delete-solicitation";

export function makeDeleteSolicitationService() {
  const solicitationRepository = new SolicitationRepository();
  const solicitationTimeRepository = new SolicitationTimeRepository();

  return new DeleteSolicitationService(
    solicitationRepository,
    solicitationTimeRepository
  );
}
