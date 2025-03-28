import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/room-class-repository";
import { z } from "zod";
import { AppError } from "../../../errors/app-error";

export class UpdateRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  private roomParamsSchema = z.object({
    id: z.string(),
  });

  private roomBodySchema = z.object({
    name: z.string().optional(),
    capacity: z.number().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { id } = this.roomParamsSchema.parse(req.params);
    const { name, capacity } = this.roomBodySchema.parse(req.body);

    if (user?.tipo === "Aluno") throw new AppError("Usuário não autorizado");

    const room = await this.roomRepository.listById(id);

    if (!room) throw new AppError("Sala não encontrada");

    await this.roomRepository.update(id, {
      nome: name ?? room.nome,
      capacidade: capacity ?? room.capacidade,
    });

    return reply.code(200).send({ message: "Sala atualizada com sucesso" });
  }
}
