import { RoomClassRepository } from "../repository/room-class-repository";
import { FindByIdRoomService } from "../services/find-by-id-rom";

export function makeFindByIdRoomService() {
  const roomRepository = new RoomClassRepository();
  return new FindByIdRoomService(roomRepository);
}
