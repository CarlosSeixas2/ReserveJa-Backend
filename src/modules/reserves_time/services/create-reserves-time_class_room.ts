import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReservesTimeRepository } from "../repository/reserves-time-repository";

export class CreateReserveTimeService {
  constructor(private reservesTimeRepository: ReservesTimeRepository) {}

  private timeBodySchema = z.object({
    reserveId: z.string().nonempty("ID não pode ser vazio"),
    classRoomId: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { reserveId, classRoomId } = this.timeBodySchema.parse(req.body);

    await this.reservesTimeRepository.create(reserveId, classRoomId);

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
