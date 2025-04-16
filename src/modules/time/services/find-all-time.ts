import { FastifyReply, FastifyRequest } from "fastify";
import { TimeRepository } from "../repository/time-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllTimeService {
  constructor(private timeRepository: TimeRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.timeRepository.listAll();

    if (!times || times.length === 0)
      throw new AppError("Nenhum horário encontrado", 404);

    return reply.status(200).send(times);
  }
}
