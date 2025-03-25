import { ReserveRepository } from "../repository/reserve-repository";
import { FindByIdReserveService } from "../services/find-by-id-reserve";

export function makeFindByIdReserveService() {
  const roomRepository = new ReserveRepository();
  return new FindByIdReserveService(roomRepository);
}
