import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { FindAllGroupByRoomService } from "../services/find-all-group-by-room";

export function makeFindAllGroupByRoom() {
  const timeClassRoomRepository = new TimeClassRoomRepository();

  return new FindAllGroupByRoomService(timeClassRoomRepository);
}
