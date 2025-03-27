import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";
import { z } from "zod";
import { UserRepository } from "../../user/repository/user-repository";
import { RoomClassRepository } from "../../room_class/repository/room-class-repository";
import { AppError } from "../../../errors/app-error";

export class UpdateReserveService {
  constructor(
    private reserveRepository: ReserveRepository,
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository
  ) {}

  private reserveParamsSchema = z.object({
    id: z.string(),
  });

  private reserveBodySchema = z.object({
    userId: z.string().nonempty(),
    roomId: z.string().nonempty(),
    status: z.enum(["Pendente", "Aprovada", "Recusada"]).optional(),
    time: z.string().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.reserveParamsSchema.parse(req.params);
    const { userId, roomId, status, time } = this.reserveBodySchema.parse(
      req.body
    );

    const reserve = await this.reserveRepository.listById(id);

    if (!reserve) throw new AppError("Reserva não encontrada", 404);

    const checkUser = await this.userRepository.listById(userId);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    await this.reserveRepository.update(id, {
      salaId: roomId,
      usuarioId: userId,
      status: status ?? reserve.status,
      horario: time ?? reserve.horario,
    });

    return reply.code(200).send({ message: "Reserva atualizada com sucesso" });
  }
}
