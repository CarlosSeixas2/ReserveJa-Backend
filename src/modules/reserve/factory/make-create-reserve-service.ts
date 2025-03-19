import { ReserveRepository } from "../repository/reserve-repository";
import { CreateReserveService } from "../services/create-reserve";

export function makeCreateReserveService() {
  const reserveRepository = new ReserveRepository();
  return new CreateReserveService(reserveRepository);
}
