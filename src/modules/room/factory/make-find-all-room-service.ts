import { RoomClassRepository } from "../repository/class-room-repository";
import { FindAllRoomService } from "../services/find-all-room";

export function makeFindAllRoomService() {
  const roomRepository = new RoomClassRepository();
  return new FindAllRoomService(roomRepository);
}
