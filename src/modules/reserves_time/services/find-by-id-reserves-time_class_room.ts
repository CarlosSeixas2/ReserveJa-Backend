import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";
import { ReservesTimeRepository } from "../repository/reserves-time-repository";

export class FindByIdReserveTimeService {
  constructor(private reservesTimeRepository: ReservesTimeRepository) {}

  private timeParamsSchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);

    const time = await this.reservesTimeRepository.listById(id);

    if (!time) throw new AppError("Horário não encontrado", 404);

    return reply.status(200).send(time);
  }
}
