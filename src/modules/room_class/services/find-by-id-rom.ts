import { z } from "zod";
import { RoomClassRepository } from "../repository/room-class-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";

export class FindByIdRoomService {
  constructor(private roomClassRepository: RoomClassRepository) {}

  private roomParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.roomParamsSchema.parse(req.params);

    const user = this.roomClassRepository.listById(id);

    if (!user) throw new AppError("Room not found", 404);

    return reply.status(200).send(user);
  }
}
