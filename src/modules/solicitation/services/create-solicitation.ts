import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../user/repository/user-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { RoomClassRepository } from "../../room_class/repository/room-class-repository";

export class CreateSolicitationService {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository,
    private solicitationRepository: SolicitationRepository
  ) {}

  private solicitationBodySchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    time: z.string(),
    status: z.enum(["Pendente", "Aprovada", "Recusada"]),
    reason: z.string(),
    approverId: z.string().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { userId, roomId, time, status, reason, approverId } =
      this.solicitationBodySchema.parse(req.body);

    const checkUser = await this.userRepository.listById(userId);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    const solicitation = await this.solicitationRepository.create({
      usuarioId: userId,
      salaId: roomId,
      horario: time,
      status,
      motivo: reason,
      aprovadorId: approverId || null,
    });

    return reply.code(201).send(solicitation);
  }
}
