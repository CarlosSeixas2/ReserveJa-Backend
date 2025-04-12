import { z } from "zod";
import { TimeRepository } from "../repository/time-repository";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateTimeService {
  constructor(private timeRepository: TimeRepository) {}

  private timeParamsSchema = z.object({
    id: z.string(),
  });

  private timeBodySchema = z.object({
    inicialTime: z.string().optional(),
    finalTime: z.string().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);
    const { inicialTime, finalTime } = this.timeBodySchema.parse(req.body);

    const time = await this.timeRepository.listById(id);

    if (!time) throw new AppError("Horário não encontrado", 404);

    await this.timeRepository.update(id, {
      horarioInicio: inicialTime,
      horarioFim: finalTime,
    });

    return reply.status(201).send({
      message: "Horário atualizado com sucesso",
    });
  }
}
