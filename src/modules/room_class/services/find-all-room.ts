import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/room-class-repository";

export class FindAllRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const rooms = await this.roomRepository.listAll();

    if (!rooms) return reply.code(404).send("Nenhuma sala encontrada");

    return reply.code(200).send(rooms);
  }
}
