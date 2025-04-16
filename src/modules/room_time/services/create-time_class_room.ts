import { z } from "zod";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../../room/repository/class-room-repository";
import { TimeRepository } from "../../time/repository/time-repository";

export class CreateTimeClassRoomService {
  constructor(
    private timeClassRoomRepository: TimeClassRoomRepository,
    private roomRepository: RoomClassRepository,
    private timeRepository: TimeRepository
  ) {}

  private timeBodySchema = z.object({
    timeId: z.string().nonempty("ID não pode ser vazio"),
    roomId: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { timeId, roomId } = this.timeBodySchema.parse(req.body);

    const timeExist = await this.timeRepository.listById(timeId);

    if (!timeExist) throw new AppError(`Horário ${timeId} não encontrado`, 404);

    const roomExist = await this.roomRepository.listById(roomId);

    if (!roomExist) throw new AppError(`Sala ${roomId} não encontrada`, 404);

    const timeRoomAlreadyExists =
      await this.timeClassRoomRepository.timeClassRoomExists(timeId, roomId);

    if (timeRoomAlreadyExists)
      throw new AppError("Horário já cadastrado em Horario Sala", 409);

    await this.timeClassRoomRepository.create({
      horarioId: timeId,
      salaId: roomId,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
