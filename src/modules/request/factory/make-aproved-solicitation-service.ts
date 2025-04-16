import { ReserveRepository } from "../../reserve/repository/reserve-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { AprovedSolicitationService } from "../services/aproved-solicitation";

export function makeAprovedSolicitationService() {
  const solicitationRepository = new SolicitationRepository();
  const reserveRepository = new ReserveRepository();

  return new AprovedSolicitationService(
    solicitationRepository,
    reserveRepository
  );
}
