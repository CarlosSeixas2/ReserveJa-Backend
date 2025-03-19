import { RoomClassRepository } from "../repository/room-class-repository";
import { DeleteRoomService } from "../services/delete-rom";

export function makeDeleteRoomService() {
  const roomRepository = new RoomClassRepository();
  return new DeleteRoomService(roomRepository);
}
