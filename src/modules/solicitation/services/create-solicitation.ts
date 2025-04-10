import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../user/repository/user-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { RoomClassRepository } from "../../class_room/repository/class-room-repository";

export class CreateSolicitationService {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository,
    private solicitationRepository: SolicitationRepository
  ) {}

  private solicitationBodySchema = z.object({
    roomId: z.string(),
    inicial_time: z.string(),
    final_time: z.string(),
    reason: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { roomId, inicial_time, final_time, reason } =
      this.solicitationBodySchema.parse(req.body);

    const checkUser = await this.userRepository.listById(user.id);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    await this.solicitationRepository.create({
      usuarioId: user.id,
      salaId: roomId,
      horarioInicio: inicial_time,
      horarioFim: final_time,
      status: "Pendente",
      motivo: reason,
    });

    return reply
      .code(201)
      .send({ message: "Solicitação feita, aguarde a aprovação" });
  }
}
