import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { TimeRepository } from "../repository/time-repository";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteTimeService {
  constructor(private timeRepository: TimeRepository) {}

  private timeParamsSchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);

    const timeExist = await this.timeRepository.listById(id);

    if (!timeExist) throw new AppError("Horário não encontrado", 404);

    await this.timeRepository.delete(id);

    return reply.status(200).send({
      message: `Horário ${id} deletado com sucesso`,
    });
  }
}
