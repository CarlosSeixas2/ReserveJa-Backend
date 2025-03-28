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
    const user = (await req.user) as { id: string; tipo: string };

    const { id } = this.roomParamsSchema.parse(req.params);

    if (user?.tipo === "Aluno") throw new AppError("Usuário não autorizado");

    const room = await this.roomClassRepository.listById(id);

    if (!room) throw new AppError("Sala não encontrada", 404);

    return reply.code(200).send(room);
  }
}
