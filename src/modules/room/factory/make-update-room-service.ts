import { RoomClassRepository } from "../repository/class-room-repository";
import { UpdateRoomService } from "../services/update-rom";

export function makeUpdateRoomService() {
  const roomRepository = new RoomClassRepository();
  return new UpdateRoomService(roomRepository);
}
