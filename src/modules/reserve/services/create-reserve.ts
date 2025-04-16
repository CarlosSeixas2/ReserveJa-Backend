import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../user/repository/user-repository";
import { RoomClassRepository } from "../../room/repository/class-room-repository";
import { AppError } from "../../../errors/app-error";
import { ReserveRepository } from "../../reserve/repository/reserve-repository";
import { ReservesTimeRepository } from "../../reserved_time/repository/reserves-time-repository";
import { TimeClassRoomRepository } from "../../room_time/repository/time-class-room-repository";

export class CreateReserveService {
  constructor(
    private reserveRepository: ReserveRepository,
    private userRepository: UserRepository,
    private roomRepository: RoomClassRepository,
    private reservesTimeRepository: ReservesTimeRepository,
    private timeClassRoomRepository: TimeClassRoomRepository
  ) {}

  private reserveBodySchema = z.object({
    roomId: z.string(),
    date: z.string().datetime().optional().default(new Date().toISOString()),
    times: z
      .array(z.string().nonempty("Horário não pode ser vazio"))
      .nonempty("Deve haver pelo menos um horário"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { roomId, date, times } = this.reserveBodySchema.parse(req.body);
    const parsedDate = new Date(date);

    //verificando se o usuário existe
    const existUser = await this.userRepository.listById(user.id);
    if (!existUser) throw new AppError("Usuário não encontrado", 404);

    if (existUser.tipo === "Aluno")
      throw new AppError("Usuário não autorizado", 403);

    //verificando se a sala existe
    const room = await this.roomRepository.listById(roomId);
    if (!room) {
      throw new AppError("Sala não encontrada", 404);
    }

    //verificando se os horários existem
    for (const timeId of times) {
      const time = await this.timeClassRoomRepository.listById(timeId);
      if (!time) {
        throw new AppError(`Horário ${time} não encontrado`, 404);
      }
    }

    //verificando se não há reservas para o mesmo horário no mesmo dia
    const conflictingTimes =
      await this.reservesTimeRepository.findConflictingTimes(
        parsedDate,
        roomId,
        times
      );

    if (conflictingTimes.length > 0) {
      throw new AppError("Horário já reservado", 409);
    }

    //criando reserva
    const reserve = await this.reserveRepository.create({
      salaId: roomId,
      usuarioId: user.id,
      criadoEm: parsedDate,
    });

    for (const timeId of times) {
      await this.reservesTimeRepository.create({
        horarioSalaId: timeId,
        reservaId: reserve.id,
        criadoEm: parsedDate,
      });
    }

    return reply.status(201).send({ message: "Reserva criada com sucesso" });
  }
}
