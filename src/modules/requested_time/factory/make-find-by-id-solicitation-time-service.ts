import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { FindByIdSolicitationTimeService } from "../services/find-by-id-time_solicitation";

export function makeFindByIdSolicitationTime() {
  const solicitationTimeRepository = new SolicitationTimeRepository();

  return new FindByIdSolicitationTimeService(solicitationTimeRepository);
}
