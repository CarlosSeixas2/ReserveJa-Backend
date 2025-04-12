import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";

export class FindAllSolicitationTimeService {
  constructor(private solicitationTimeRepository: SolicitationTimeRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.solicitationTimeRepository.listAll();

    return reply.status(200).send(times);
  }
}
