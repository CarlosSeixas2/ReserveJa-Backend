import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/class-room-repository";
import { z } from "zod";
import { AppError } from "../../../errors/app-error";

export class DeleteRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  private roomParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { id } = this.roomParamsSchema.parse(req.params);

    if (user?.tipo === "Aluno") throw new AppError("Usuário não autorizado");

    const room = await this.roomRepository.listById(id);

    if (!room) throw new AppError("Sala não encontrada");

    await this.roomRepository.delete(id);

    return reply.code(200).send({ message: "Sala deletada com sucesso" });
  }
}
