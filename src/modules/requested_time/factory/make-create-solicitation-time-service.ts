import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { CreateSolicitationTimeService } from "../services/create-time_solicitation";

export function makeCreateSolicitationTime() {
  const solicitationTimeRepository = new SolicitationTimeRepository();

  return new CreateSolicitationTimeService(solicitationTimeRepository);
}
