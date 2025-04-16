import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllSolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const solicitations = await this.solicitationRepository.listAll();

    if (!solicitations || solicitations.length === 0)
      throw new AppError("Nenhuma solicitação encontrada", 404);

    return reply.code(200).send(solicitations);
  }
}
