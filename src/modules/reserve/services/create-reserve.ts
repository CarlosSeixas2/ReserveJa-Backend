import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ReserveRepository } from "../repository/reserve-repository";

export class CreateReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  private reserveBodySchema = z.object({
    userId: z.string().nonempty(),
    roomId: z.string().nonempty(),
    status: z.enum(["Pendente", "Aprovada", "Recusada"]).default("Pendente"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { userId, roomId, status } = this.reserveBodySchema.parse(req.body);

    await this.reserveRepository.create({
      salaId: roomId,
      usuarioId: userId,
      data_hora: new Date(),
      status,
    });

    return reply.code(201).send("Reserva criada com sucesso");
  }
}
