import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { FindAllTimeClassRoomService } from "../services/find-all-time_class_room";

export function makeFindAllTimeClassRoom() {
  const timeClassRoomRepository = new TimeClassRoomRepository();

  return new FindAllTimeClassRoomService(timeClassRoomRepository);
}
