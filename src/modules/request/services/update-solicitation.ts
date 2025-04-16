import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { UserRepository } from "../../user/repository/user-repository";

export class UpdateSolicitationService {
  constructor(
    private solicitationRepository: SolicitationRepository,
    private userRepository: UserRepository
  ) {}

  private readonly solicitationParamsSchema = z.object({
    id: z.string(),
  });

  private readonly solicitationBodySchema = z.object({
    status: z.enum(["PENDENTE", "APROVADA", "RECUSADA"]).optional(),
    reason: z.string().optional(),
    approverId: z.string().optional(),
    date: z.string().optional(),
  });

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.solicitationParamsSchema.parse(req.params);
    const { status, reason, approverId, date } =
      this.solicitationBodySchema.parse(req.body);

    const solicitation = await this.solicitationRepository.findById(id);
    if (!solicitation) {
      throw new AppError("Solicitação não encontrada", 404);
    }

    let parsedDate: Date | null = null;
    if (date) {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new AppError("Data inválida", 400);
      }
    }

    let approver = null;
    if (approverId) {
      approver = await this.userRepository.listById(approverId);
      if (!approver) {
        throw new AppError("Aprovador não encontrado", 404);
      }
    }

    await this.solicitationRepository.update(id, {
      status: status ?? solicitation.status,
      motivo: reason ?? solicitation.motivo,
      aprovadorId: approver?.id ?? solicitation.aprovador?.id,
      criadoEm: parsedDate ?? solicitation.criadoEm,
    });

    return reply
      .code(200)
      .send({ message: "Solicitação atualizada com sucesso" });
  }
}
