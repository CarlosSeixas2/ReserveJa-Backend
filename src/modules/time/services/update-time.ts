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

    const timeExist = await this.timeRepository.listById(id);

    if (!timeExist) throw new AppError(`Horário ${id} não encontrado`, 404);

    if (inicialTime && finalTime) {
      const conflict = await this.timeRepository.hasTimeOverlap(
        inicialTime,
        finalTime,
        id
      );

      if (conflict) {
        throw new AppError(
          "Intervalo de horário se sobrepõe a um já existente.",
          409
        );
      }
    }

    await this.timeRepository.update(id, {
      inicio: inicialTime,
      fim: finalTime,
    });

    return reply.status(201).send({
      message: "Horário atualizado com sucesso",
    });
  }
}
