import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";

export class FindByIdTimeClassRoomService {
  constructor(private timeClassRoomRepository: TimeClassRoomRepository) {}

  private timeParamsSchema = z.object({
    id: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.timeParamsSchema.parse(req.params);

    const time = await this.timeClassRoomRepository.listById(id);

    if (!time) throw new AppError("Horário não encontrado", 404);

    return reply.status(200).send(time);
  }
}
