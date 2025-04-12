import { FastifyReply, FastifyRequest } from "fastify";
import { TimeRepository } from "../repository/time-repository";

export class FindAllTimeService {
  constructor(private timeRepository: TimeRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.timeRepository.listAll();

    return reply.status(200).send(times);
  }
}
