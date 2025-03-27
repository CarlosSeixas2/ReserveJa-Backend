import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";

export class FindAllSolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const solicitations = await this.solicitationRepository.listAll();

    if (!solicitations || solicitations.length === 0) {
      return reply.code(404).send("Nenhuma solicitação encontrada");
    }

    return reply.code(200).send(solicitations);
  }
}
