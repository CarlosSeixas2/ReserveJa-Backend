import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";

export class DeleteSolicitationTimeService {
  constructor(private solicitationTimeRepository: SolicitationTimeRepository) {}

  private timeBodySchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeBodySchema.parse(req.body);

    await this.solicitationTimeRepository.delete(id);

    return reply.status(201).send({
      message: "Horário deletado com sucesso",
    });
  }
}
