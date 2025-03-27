import { RoomClassRepository } from "../../room_class/repository/room-class-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { ReserveRepository } from "../repository/reserve-repository";
import { UpdateReserveService } from "../services/update-reserve";

export function makeUpdateReserveService() {
  const reserveRepository = new ReserveRepository();
  const userRepository = new UserRepository();
  const roomRepository = new RoomClassRepository();

  return new UpdateReserveService(
    reserveRepository,
    userRepository,
    roomRepository
  );
}
