import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { FindByIdTimeClassRoomService } from "../services/find-by-id-time_class_room";

export function makeFindByIdTimeClassRoomService() {
  const timeClassRoomRepository = new TimeClassRoomRepository();

  return new FindByIdTimeClassRoomService(timeClassRoomRepository);
}
