import { RoomClassRepository } from "../repository/room-class-repository";
import { FindAllRoomService } from "../services/find-all-room";

export function makeFindAllRoomService() {
  const roomRepository = new RoomClassRepository();
  return new FindAllRoomService(roomRepository);
}
