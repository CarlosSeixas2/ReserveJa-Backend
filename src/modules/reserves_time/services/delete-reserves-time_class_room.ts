import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { AppError } from "../../../errors/app-error";

export class DeleteReserveTimeService {
  constructor(private reservesTimeRepository: ReservesTimeRepository) {}

  private timeBodySchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeBodySchema.parse(req.body);

    await this.reservesTimeRepository.delete(id);

    const reserveTime = await this.reservesTimeRepository.listById(id);

    if (!reserveTime) throw new AppError("Horário não encontrado", 404);

    return reply.status(201).send({
      message: "Horário deletado com sucesso",
    });
  }
}
