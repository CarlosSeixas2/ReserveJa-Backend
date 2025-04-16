import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../repository/class-room-repository";
import { z } from "zod";
import { AppError } from "../../../errors/app-error";

export class CreateRoomService {
  constructor(private roomRepository: RoomClassRepository) {}

  private roomBodySchema = z.object({
    name: z.string(),
    capacity: z.number(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { name, capacity } = this.roomBodySchema.parse(req.body);

    if (user?.tipo === "Aluno") throw new AppError("Usuário não autorizado");

    await this.roomRepository.create({
      nome: name,
      capacidade: capacity,
    });

    return reply.code(201).send({ message: "Sala criada com sucesso" });
  }
}
