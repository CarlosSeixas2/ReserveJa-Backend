import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../user/repository/user-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { RoomClassRepository } from "../../room/repository/class-room-repository";

export class CreateSolicitationService {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository,
    private solicitationRepository: SolicitationRepository
  ) {}

  private solicitationBodySchema = z.object({
    roomId: z.string(),
    reason: z.string(),
    date: z.string().datetime().optional().default(new Date().toISOString()),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { roomId, reason, date } = this.solicitationBodySchema.parse(
      req.body
    );

    const parseDate = new Date(date);

    const checkUser = await this.userRepository.listById(user.id);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    await this.solicitationRepository.create({
      usuarioId: user.id,
      salaId: roomId,
      criadoEm: parseDate,
      motivo: reason,
    });

    return reply
      .code(201)
      .send({ message: "Solicitação feita, aguarde a aprovação" });
  }
}
