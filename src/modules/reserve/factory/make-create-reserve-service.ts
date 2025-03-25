import { RoomClassRepository } from "../../room_class/repository/room-class-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { ReserveRepository } from "../repository/reserve-repository";
import { CreateReserveService } from "../services/create-reserve";

export function makeCreateReserveService() {
  const reserveRepository = new ReserveRepository();
  const userRepository = new UserRepository();
  const roomRepository = new RoomClassRepository();
  return new CreateReserveService(
    reserveRepository,
    userRepository,
    roomRepository
  );
}
