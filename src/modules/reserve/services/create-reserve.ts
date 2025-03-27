import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ReserveRepository } from "../repository/reserve-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { RoomClassRepository } from "../../room_class/repository/room-class-repository";
import { AppError } from "../../../errors/app-error";

export class CreateReserveService {
  constructor(
    private reserveRepository: ReserveRepository,
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository
  ) {}

  private reserveBodySchema = z.object({
    userId: z.string().nonempty(),
    roomId: z.string().nonempty(),
    time: z.string().nonempty(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { userId, roomId, time } = this.reserveBodySchema.parse(req.body);

    const checkUser = await this.userRepository.listById(userId);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    if (checkUser.tipo !== "Professor") {
      throw new AppError("Apenas professores podem reservar salas", 403);
    }

    const findRoomReserves = await this.reserveRepository.listRoomReserves(
      roomId,
      time
    );

    if (findRoomReserves.length > 0) {
      throw new AppError("Sala já reservada", 400);
    }

    await this.reserveRepository.create({
      salaId: roomId,
      usuarioId: userId,
      horario: time,
      status: "Aprovada",
    });

    return reply.code(201).send({ message: "Reserva criada com sucesso" });
  }
}
