import { z } from "zod";
import { TimeRepository } from "../repository/time-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";

export class FindByIdTimeService {
  constructor(private timeRepository: TimeRepository) {}

  private timeParamsSchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);

    const time = await this.timeRepository.listById(id);

    if (!time) throw new AppError("Horário não encontrado", 404);

    return reply.status(200).send(time);
  }
}
