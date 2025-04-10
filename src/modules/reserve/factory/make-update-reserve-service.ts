import { RoomClassRepository } from "../../class_room/repository/class-room-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { ReserveRepository } from "../repository/reserve-repository";
import { UpdateReserveService } from "../services/update-reserve";

export function makeUpdateReserveService() {
  const reserveRepository = new ReserveRepository();
  const userRepository = new UserRepository();

  return new UpdateReserveService(reserveRepository, userRepository);
}
