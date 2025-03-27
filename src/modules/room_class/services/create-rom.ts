import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/room-class-repository";
import { z } from "zod";

export class CreateRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  private roomBodySchema = z.object({
    name: z.string(),
    capacity: z.number(),
    diponility: z.boolean(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { name, capacity, diponility } = this.roomBodySchema.parse(req.body);

    await this.roomRepository.create({
      nome: name,
      capacidade: capacity,
      disponivel: diponility,
    });

    return reply.code(201).send({ message: "Sala criada com sucesso" });
  }
}
