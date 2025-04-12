import { FastifyReply, FastifyRequest } from "fastify";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllTimeClassRoomService {
  constructor(private timeClassRoomRepository: TimeClassRoomRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.timeClassRoomRepository.listAll();

    if (!times || times.length === 0)
      throw new AppError("Nenhum horário encontrado", 404);

    return reply.status(200).send(times);
  }
}
