import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";
import { AppError } from "../../../errors/app-error";

export class FindByIdReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  private reserveParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.reserveParamsSchema.parse(req.params);

    const reserve = await this.reserveRepository.listById(id);

    if (!reserve) throw new AppError("Reserva não encontrada", 404);

    return reply.code(200).send(reserve);
  }
}
