import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";

export class UpdateSolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  private solicitationParamsSchema = z.object({
    id: z.string(),
  });

  private solicitationBodySchema = z.object({
    inicial_time: z.string().optional(),
    final_time: z.string().optional(),
    status: z.enum(["Pendente", "Aprovada", "Recusada"]).optional(),
    reason: z.string().optional(),
    approverId: z.string().optional(),
    date: z.string().optional(),
  });

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.solicitationParamsSchema.parse(req.params);

    const { inicial_time, final_time, status, reason, approverId, date } =
      this.solicitationBodySchema.parse(req.body);

    let parsedDate: Date | undefined;

    if (date) {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) throw new AppError("Data inválida", 400);
    }

    const solicitations = await this.solicitationRepository.findById(id);

    if (!solicitations) throw new AppError("Solicitação não encontrada", 404);

    await this.solicitationRepository.update(id, {
      horarioInicio: inicial_time ?? solicitations.horarioInicio,
      horarioFim: final_time ?? solicitations.horarioFim,
      status: status ?? solicitations.status,
      motivo: reason ?? solicitations.motivo,
      aprovadorId: approverId ?? solicitations.aprovadorId,
      data: parsedDate ?? solicitations.data,
    });

    return reply
      .code(200)
      .send({ message: "Solicitação atualizada com sucesso" });
  }
}
