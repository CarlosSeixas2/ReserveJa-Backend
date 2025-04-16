import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";

export class UpdateTimeClassRoomService {
  constructor(private timeClassRoomRepository: TimeClassRoomRepository) {}

  private timeClassRoomParamsSchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  private timeClassRoomBodySchema = z.object({
    timeId: z.string().nonempty("ID não pode ser vazio"),
    classRoomId: z.string().nonempty("ID não pode ser vazio"),
  });

  async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeClassRoomParamsSchema.parse(req.params);
    const { classRoomId, timeId } = this.timeClassRoomBodySchema.parse(
      req.body
    );

    const timeClassRoom = await this.timeClassRoomRepository.listById(id);

    if (!timeClassRoom) {
      throw new AppError("Horário não encontrado", 404);
    }

    await this.timeClassRoomRepository.update(id, {
      horarioId: timeId,
      salaId: classRoomId,
    });

    return reply.status(200).send({
      message: "Horário atualizado com sucesso",
    });
  }
}
