import { ReserveRepository } from "../repository/reserve-repository";
import { UpdateReserveService } from "../services/update-rom";

export function makeUpdateReserveService() {
  const roomRepository = new ReserveRepository();
  return new UpdateReserveService(roomRepository);
}
