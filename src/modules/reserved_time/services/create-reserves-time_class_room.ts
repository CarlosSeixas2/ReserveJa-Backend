import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReservesTimeRepository } from "../repository/reserves-time-repository";

export class CreateReserveTimeService {
  constructor(private reservesTimeRepository: ReservesTimeRepository) {}

  private timeBodySchema = z.object({
    reserveId: z.string().nonempty("ID não pode ser vazio"),
    roomTimeId: z.string().nonempty("ID não pode ser vazio"),
    date: z.string().datetime().optional().default(new Date().toISOString()),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { reserveId, roomTimeId, date } = this.timeBodySchema.parse(req.body);

    const parsedDate = new Date(date);

    await this.reservesTimeRepository.create({
      reservaId: reserveId,
      horarioSalaId: roomTimeId,
      criadoEm: parsedDate,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
