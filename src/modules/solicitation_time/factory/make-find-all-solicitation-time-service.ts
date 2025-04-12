import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { FindAllSolicitationTimeService } from "../services/find-all-time_solicitation";

export function makeFindAllSolicitationTime() {
  const solicitationTimeRepository = new SolicitationTimeRepository();

  return new FindAllSolicitationTimeService(solicitationTimeRepository);
}
