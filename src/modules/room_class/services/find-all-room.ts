import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/room-class-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const rooms = await this.roomRepository.listAll();

    if (rooms?.length === 0) throw new AppError("Nenhuma sala encontrada", 404);

    return reply.code(200).send(rooms);
  }
}
