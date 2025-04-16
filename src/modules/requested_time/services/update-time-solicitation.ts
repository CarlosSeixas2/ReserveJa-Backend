import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";
import { AppError } from "../../../errors/app-error";

export class UpdateSolicitationTimeService {
  constructor(private solicitationTimeRepository: SolicitationTimeRepository) {}

  private timeParamsSchema = z.object({
    id: z.string(),
  });

  private timeBodySchema = z.object({
    solicitationId: z.string().optional(),
    classRoomId: z.string().optional(),
    date: z.string().datetime().optional().default(new Date().toISOString()),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);
    const { solicitationId, classRoomId, date } = this.timeBodySchema.parse(
      req.body
    );

    const solicitationTime = await this.solicitationTimeRepository.listById(id);

    if (!solicitationTime)
      throw new AppError("Solicitação não encontrada", 404);

    await this.solicitationTimeRepository.update(id, {
      solicitacaoId: solicitationId ?? solicitationTime.solicitacaoId,
      horarioSalaId: classRoomId ?? solicitationTime.horarioSalaId,
      criadoEm: date ? new Date(date) : solicitationTime.criadoEm,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
