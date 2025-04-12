import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../user/repository/user-repository";
import { RoomClassRepository } from "../../class_room/repository/class-room-repository";
import { AppError } from "../../../errors/app-error";
import { ReserveRepository } from "../../reserve/repository/reserve-repository";
import { ReservesTimeRepository } from "../../reserves_time/repository/reserves-time-repository";
import { TimeRepository } from "../../time/repository/time-repository";
import { TimeClassRoomRepository } from "../../time_class_room/repository/time-class-room-repository";

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

    const userExists = await this.userRepository.listById(user.id);
    const roomExists = await this.roomRepository.listById(roomId);

    if (!userExists || !roomExists) {
      throw new AppError("Usuário ou Sala não encontrado(a)", 404);
    }

    if (userExists.tipo !== "Professor") {
      throw new AppError("Acesso não autorizado", 403);
    }

    for (const timeId of times) {
      const timeExists = await this.timeClassRoomRepository.listById(timeId);

      if (!timeExists) {
        throw new AppError("Horário não encontrado", 404);
      }

      const existingReserveinTime =
        await this.reservesTimeRepository.findReserveByDate(
          timeId,
          parsedDate.toISOString()
        );

      if (existingReserveinTime) {
        throw new AppError(
          `Já existe uma reserva para o horário ${timeId} na data ${parsedDate.toLocaleDateString()}`,
          409
        );
      }
    }

    const newReserve = await this.reserveRepository.create({
      salaId: roomId,
      usuarioId: user.id,
      data: parsedDate,
    });

    for (const timeId of times) {
      await this.reservesTimeRepository.create(newReserve.id, timeId);
    }

    return reply.code(201).send({ message: "Reserva criada com sucesso" });
  }
}
