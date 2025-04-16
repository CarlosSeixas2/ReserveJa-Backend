import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { z } from "zod";
import { AppError } from "../../../errors/app-error";

export class FindByIdSolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  private solicitationParamsSchema = z.object({
    id: z.string(),
  });

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.solicitationParamsSchema.parse(req.params);

    const solicitations = await this.solicitationRepository.findById(id);

    if (!solicitations) throw new AppError("Solicitação não encontrada", 404);

    return reply.code(200).send(solicitations);
  }
}
