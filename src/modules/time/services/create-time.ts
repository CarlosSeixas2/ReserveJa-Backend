import { z } from "zod";
import { TimeRepository } from "../repository/time-repository";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateTimeService {
  constructor(private timeRepository: TimeRepository) {}

  private timeBodySchema = z.object({
    inicialTime: z.string().nonempty("Horário inicial não pode ser vazio"),
    finalTime: z.string().nonempty("Horário final não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { inicialTime, finalTime } = this.timeBodySchema.parse(req.body);

    const timeAlreadyExist = await this.timeRepository.hasTimeOverlap(
      inicialTime,
      finalTime
    );

    if (timeAlreadyExist)
      throw new AppError(
        "Intervalo de horário se sobrepõe a um já existente.",
        409
      );

    await this.timeRepository.create({
      inicio: inicialTime,
      fim: finalTime,
    });

    return reply.status(201).send({
      message: "Horário cadastrado com sucesso",
    });
  }
}
