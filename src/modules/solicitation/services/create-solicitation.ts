import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../user/repository/user-repository";
import { SolicitationRepository } from "../repository/solicitation-repository";
import { RoomClassRepository } from "../../room_class/repository/room-class-repository";
import { ReserveRepository } from "../../reserve/repository/reserve-repository";

export class CreateSolicitationService {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository,
    private solicitationRepository: SolicitationRepository,
    private reserveRepository: ReserveRepository
  ) {}

  private solicitationBodySchema = z.object({
    roomId: z.string(),
    time: z.string(),
    reason: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { roomId, time, reason } = this.solicitationBodySchema.parse(
      req.body
    );

    const checkUser = await this.userRepository.listById(user.id);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    let date = new Date();

    const findRoomReserves = await this.reserveRepository.listRoomReserves(
      roomId,
      time,
      date
    );

    if (findRoomReserves.length > 0)
      throw new AppError("Sala já reservada nesse horário", 400);

    await this.solicitationRepository.create({
      usuarioId: user.id,
      salaId: roomId,
      horario: time,
      status: "Pendente",
      motivo: reason,
    });

    return reply
      .code(201)
      .send({ message: "Solicitação feita, aguarde a aprovação" });
  }
}
