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
    diponility: z.boolean().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.roomParamsSchema.parse(req.params);
    const { name, capacity, diponility } = this.roomBodySchema.parse(req.body);

    const room = await this.roomRepository.listById(id);

    if (!room) throw new AppError("Sala não encontrada");

    await this.roomRepository.update(id, {
      nome: name ?? room.nome,
      capacidade: capacity ?? room.capacidade,
      disponivel: diponility ?? room.disponivel,
    });

    return reply.code(200).send("Sala atualizada com sucesso");
  }
}
