import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/room-class-repository";
import { z } from "zod";
import { AppError } from "../../../errors/app-error";

export class DeleteRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  private roomParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.roomParamsSchema.parse(req.params);

    const user = await this.roomRepository.listById(id);

    if (!user) throw new AppError("Sala não encontrada");

    await this.roomRepository.delete(id);

    return reply.code(200).send({ message: "Sala deletada com sucesso" });
  }
}
