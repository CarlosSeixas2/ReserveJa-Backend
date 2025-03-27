import { RoomClassRepository } from "../../room_class/repository/room-class-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { CreateSolicitationService } from "../services/create-solicitation";

export function makeCreateSolicitationService() {
  const solicitationRepository = new SolicitationRepository();
  const userRepository = new UserRepository();
  const roomRepository = new RoomClassRepository();

  return new CreateSolicitationService(
    userRepository,
    roomRepository,
    solicitationRepository
  );
}
