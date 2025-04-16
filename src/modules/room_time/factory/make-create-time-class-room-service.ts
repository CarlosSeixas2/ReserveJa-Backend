import { RoomClassRepository } from "../../room/repository/class-room-repository";
import { TimeRepository } from "../../time/repository/time-repository";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { CreateTimeClassRoomService } from "../services/create-time_class_room";

export function makeCreateTimeClassRoom() {
  const timeClassRoomRepository = new TimeClassRoomRepository();
  const roomRepository = new RoomClassRepository();
  const timeRepository = new TimeRepository();

  return new CreateTimeClassRoomService(
    timeClassRoomRepository,
    roomRepository,
    timeRepository
  );
}
