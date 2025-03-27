import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { AppError } from "../../../errors/app-error";

export class UpdateSolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  private solicitationParamsSchema = z.object({
    id: z.string(),
  });

  private solicitationBodySchema = z.object({
    userId: z.string().optional(),
    roomId: z.string().optional(),
    time: z.string().optional(),
    status: z.enum(["Pendente", "Aprovada", "Recusada"]).optional(),
    reason: z.string().optional(),
    approverId: z.string().optional(),
  });

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.solicitationParamsSchema.parse(req.params);

    const { userId, roomId, time, status, reason, approverId } =
      this.solicitationBodySchema.parse(req.body);

    const solicitations = await this.solicitationRepository.findById(id);

    if (!solicitations) throw new AppError("Solicitação não encontrada", 404);

    await this.solicitationRepository.update(id, {
      usuarioId: userId ?? solicitations.usuarioId,
      salaId: roomId ?? solicitations.salaId,
      horario: time ?? solicitations.horario,
      status: status ?? solicitations.status,
      motivo: reason ?? solicitations.motivo,
      aprovadorId: approverId ?? solicitations.aprovadorId,
    });

    return reply
      .code(200)
      .send({ message: "Solicitação atualizada com sucesso" });
  }
}
