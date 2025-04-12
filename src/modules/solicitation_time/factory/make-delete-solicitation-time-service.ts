import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { DeleteSolicitationTimeService } from "../services/delete-time_solicitation";

export function makeDeleteSolicitationTime() {
  const solicitationTimeRepository = new SolicitationTimeRepository();

  return new DeleteSolicitationTimeService(solicitationTimeRepository);
}
