import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { DeleteTimeClassRoomService } from "../services/delete-time_class_room";

export function makeDeleteTimeClassRoom() {
  const timeClassRoomRepository = new TimeClassRoomRepository();

  return new DeleteTimeClassRoomService(timeClassRoomRepository);
}
