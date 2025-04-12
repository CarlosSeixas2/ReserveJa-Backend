import { z } from "zod";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";

export class DeleteTimeClassRoomService {
  constructor(private timeClassRoomRepository: TimeClassRoomRepository) {}

  private timeBodySchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeBodySchema.parse(req.params);

    const timeClassRoom = await this.timeClassRoomRepository.listById(id);

    if (!timeClassRoom) throw new AppError("Horário não encontrado", 404);

    await this.timeClassRoomRepository.delete(id);

    return reply.status(201).send({
      message: "Horário deletado com sucesso",
    });
  }
}
