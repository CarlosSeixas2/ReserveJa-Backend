import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";
import { z } from "zod";

export class UpdateReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  private reserveParamsSchema = z.object({
    id: z.string(),
  });

  private reserveBodySchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    status: z.enum(["Pendente", "Aprovada", "Recusada"]),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.reserveParamsSchema.parse(req.params);
    const { userId, roomId, status } = this.reserveBodySchema.parse(req.body);

    await this.reserveRepository.update(id, {
      salaId: roomId,
      usuarioId: userId,
      status,
    });

    return reply.code(200).send("Reserva atualizada com sucesso");
  }
}
