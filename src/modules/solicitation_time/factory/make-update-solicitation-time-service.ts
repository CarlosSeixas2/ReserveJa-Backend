import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { UpdateSolicitationTimeService } from "../services/update-time-solicitation";

export function makeUpdateSolicitationTime() {
  const solicitationTimeRepository = new SolicitationTimeRepository();

  return new UpdateSolicitationTimeService(solicitationTimeRepository);
}
