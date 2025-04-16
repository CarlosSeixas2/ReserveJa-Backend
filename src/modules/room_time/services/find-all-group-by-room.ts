import { FastifyReply, FastifyRequest } from "fastify";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllGroupByRoomService {
  constructor(private timeClassRoomRepository: TimeClassRoomRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.timeClassRoomRepository.listAllGroupedBySala();

    if (!times || times.length === 0)
      throw new AppError("Nenhum horário encontrado", 404);

    return reply.status(200).send(times);
  }
}
