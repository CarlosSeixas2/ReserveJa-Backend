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

    const timeExist = await this.timeRepository.findByTime(
      inicialTime,
      finalTime
    );

    if (timeExist)
      throw new AppError(
        `Horário já cadastrado entre ${inicialTime} e ${finalTime}`,
        409
      );

    await this.timeRepository.create({
      horarioInicio: inicialTime,
      horarioFim: finalTime,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
