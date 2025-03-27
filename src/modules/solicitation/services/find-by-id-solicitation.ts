import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { z } from "zod";

export class FindByIdSolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  private solicitationParamsSchema = z.object({
    id: z.string(),
  });

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.solicitationParamsSchema.parse(req.params);

    const solicitations = await this.solicitationRepository.findById(id);

    if (!solicitations) {
      return reply.code(404).send("Nenhuma solicitação encontrada");
    }

    return reply.code(200).send(solicitations);
  }
}
