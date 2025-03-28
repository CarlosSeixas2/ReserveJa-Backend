import { FastifyReply, FastifyRequest } from "fastify";
import { date, z } from "zod";
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
    roomId: z.string().nonempty(),
    time: z.string().nonempty(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { roomId, time } = this.reserveBodySchema.parse(req.body);

    const checkUser = await this.userRepository.listById(user.id);

    const checkRoom = await this.roomRepository.listById(roomId);

    if (!checkUser || !checkRoom)
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);

    if (checkUser.tipo !== "Professor")
      throw new AppError("Apenas professores podem reservar salas", 403);

    let date = new Date();

    const findRoomReserves = await this.reserveRepository.listRoomReserves(
      roomId,
      time,
      date
    );

    if (findRoomReserves.length > 0)
      throw new AppError("Sala já reservada nesse horário", 400);

    await this.reserveRepository.create({
      salaId: roomId,
      usuarioId: user.id,
      horario: time,
      status: "Aprovada",
    });

    return reply.code(201).send({ message: "Reserva criada com sucesso" });
  }
}
