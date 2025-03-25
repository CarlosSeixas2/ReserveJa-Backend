import { ReserveRepository } from "../repository/reserve-repository";
import { UpdateReserveService } from "../services/update-reserve";

export function makeUpdateReserveService() {
  const roomRepository = new ReserveRepository();
  return new UpdateReserveService(roomRepository);
}
