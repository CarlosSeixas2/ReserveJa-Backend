import { ReserveRepository } from "../repository/reserve-repository";
import { FindAllReserveService } from "../services/find-all-reserve";

export function makeFindAllReserveService() {
  const reserveRepository = new ReserveRepository();
  return new FindAllReserveService(reserveRepository);
}
