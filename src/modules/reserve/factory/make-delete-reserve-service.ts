import { ReserveRepository } from "../repository/reserve-repository";
import { DeleteReserveService } from "../services/delete-rom";

export function makeDeleteReserveService() {
  const reserveRepository = new ReserveRepository();
  return new DeleteReserveService(reserveRepository);
}
