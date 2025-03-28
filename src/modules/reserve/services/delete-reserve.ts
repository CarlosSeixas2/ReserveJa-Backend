import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";

export class DeleteReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  private reserveParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.reserveParamsSchema.parse(req.params);

    const reserve = await this.reserveRepository.listById(id);

    if (!reserve) throw new AppError("Reserva não encontrada");

    await this.reserveRepository.delete(id);

    return reply.code(200).send({ message: "Reserva deletada com sucesso" });
  }
}
