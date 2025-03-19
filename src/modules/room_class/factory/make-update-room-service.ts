import { RoomClassRepository } from "../repository/room-class-repository";
import { UpdateRoomService } from "../services/update-rom";

export function makeUpdateRoomService() {
  const roomRepository = new RoomClassRepository();
  return new UpdateRoomService(roomRepository);
}
