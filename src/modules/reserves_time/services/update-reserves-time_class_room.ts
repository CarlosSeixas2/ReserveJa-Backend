import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReservesTimeRepository } from "../repository/reserves-time-repository";

export class UpdateReserveTimeService {
  constructor(private reservesTimeRepository: ReservesTimeRepository) {}

  private timeParamsSchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  private timeBodySchema = z.object({
    reserveId: z.string().nonempty("ID não pode ser vazio"),
    classRoomId: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);
    const { reserveId, classRoomId } = this.timeBodySchema.parse(req.body);

    const reserve = await this.reservesTimeRepository.listById(id);

    if (!reserve) throw new AppError("Reserva não encontrada", 404);

    await this.reservesTimeRepository.update(id, {
      horarioSalaId: classRoomId,
      reservaId: reserveId,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
