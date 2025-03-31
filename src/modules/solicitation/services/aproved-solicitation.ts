import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { ReserveRepository } from "../../reserve/repository/reserve-repository";

export class AprovedSolicitationService {
  constructor(
    private solicitationRepository: SolicitationRepository,
    private reserveRepository: ReserveRepository
  ) {}

  private solicitationParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { id } = this.solicitationParamsSchema.parse(req.params);

    if (user.tipo !== "Professor")
      throw new AppError("Acesso não autorizado", 403);

    const solicitation = await this.solicitationRepository.findById(id);

    if (!solicitation) throw new AppError("Solicitação não encontrada", 404);

    const checkReserves = await this.reserveRepository.listRoomReserves(
      solicitation.salaId,
      solicitation.horarioInicio,
      solicitation.horarioFim,
      new Date()
    );

    if (checkReserves.length > 0)
      throw new AppError("Sala já reservada, por favor check os horários", 400);

    await this.solicitationRepository.update(solicitation.id, {
      status: "Aprovada",
    });

    await this.reserveRepository.create({
      salaId: solicitation.salaId,
      usuarioId: user.id,
      horarioFim: solicitation.horarioFim,
      horarioInicio: solicitation.horarioInicio,
      status: "Aprovada",
    });

    return reply.status(200).send({
      message: "Solicitação aprovada com sucesso",
    });
  }
}
