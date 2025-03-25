import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";

export class FindByIdReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  private reserveParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.reserveParamsSchema.parse(req.params);

    const reserve = await this.reserveRepository.listById(id);

    if (!reserve) return reply.code(404).send("Reserva não encontrada");

    return reply.code(200).send(reserve);
  }
}
