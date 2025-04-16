import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllSolicitationTimeService {
  constructor(private solicitationTimeRepository: SolicitationTimeRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.solicitationTimeRepository.listAll();

    if (times.length === 0 || !times)
      throw new AppError("Nenhum horário encontrado", 404);

    return reply.status(200).send(times);
  }
}
