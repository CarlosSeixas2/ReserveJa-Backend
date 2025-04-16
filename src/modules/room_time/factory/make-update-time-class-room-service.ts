import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { UpdateTimeClassRoomService } from "../services/update-time-class-room";

export function makeUpdateTimeClassRoom() {
  const timeClassRoomRepository = new TimeClassRoomRepository();

  return new UpdateTimeClassRoomService(timeClassRoomRepository);
}
