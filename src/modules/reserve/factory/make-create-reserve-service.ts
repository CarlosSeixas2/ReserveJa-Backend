import { RoomClassRepository } from "../../class_room/repository/class-room-repository";
import { ReservesTimeRepository } from "../../reserves_time/repository/reserves-time-repository";
import { TimeClassRoomRepository } from "../../time_class_room/repository/time-class-room-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { ReserveRepository } from "../repository/reserve-repository";
import { CreateReserveService } from "../services/create-reserve";

export function makeCreateReserveService() {
  const reserveRepository = new ReserveRepository();
  const userRepository = new UserRepository();
  const roomRepository = new RoomClassRepository();
  const reservesTimeRepository = new ReservesTimeRepository();
  const timeClassRoomRepository = new TimeClassRoomRepository();

  return new CreateReserveService(
    reserveRepository,
    userRepository,
    roomRepository,
    reservesTimeRepository,
    timeClassRoomRepository
  );
}
