import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";
import { UserRepository } from "../../user/repository/user-repository";
import { RoomClassRepository } from "../../class_room/repository/class-room-repository";
import { AppError } from "../../../errors/app-error";

export class CreateReserveService {
  constructor(
    private reserveRepository: ReserveRepository,
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository
  ) {}

  private reserveBodySchema = z.object({
    roomId: z.string().nonempty(),
    inicial_time: z.string().nonempty(),
    final_time: z.string().nonempty(),
    date: z.string().datetime(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { roomId, inicial_time, final_time, date } =
      this.reserveBodySchema.parse(req.body);

    const checkUser = await this.userRepository.listById(user.id);
    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    if (checkUser.tipo !== "Professor")
      throw new AppError("Acesso não autorizado", 403);

    const reservationDate = new Date(date);
    const findRoomReserves = await this.reserveRepository.listRoomReserves(
      roomId,
      inicial_time,
      final_time,
      reservationDate
    );

    if (findRoomReserves.length > 0)
      throw new AppError("Sala já reservada, por favor check os horários", 400);

    await this.reserveRepository.create({
      salaId: roomId,
      usuarioId: user.id,
      horarioInicio: inicial_time,
      horarioFim: final_time,
      status: "Aprovada",
      data: reservationDate,
    });

    return reply.code(201).send({ message: "Reserva criada com sucesso" });
  }
}
