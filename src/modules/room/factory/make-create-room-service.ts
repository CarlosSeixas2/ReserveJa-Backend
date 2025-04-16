import { RoomClassRepository } from "../repository/class-room-repository";
import { CreateRoomService } from "../services/create-rom";

export function makeCreateRoomService() {
  const roomRepository = new RoomClassRepository();
  return new CreateRoomService(roomRepository);
}
