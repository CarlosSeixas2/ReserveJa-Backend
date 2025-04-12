import { z } from "zod";
import { TimeClassRoomRepository } from "../repository/time-class-room-repository";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { RoomClassRepository } from "../../class_room/repository/class-room-repository";
import { TimeRepository } from "../../time/repository/time-repository";

export class CreateTimeClassRoomService {
  constructor(
    private timeClassRoomRepository: TimeClassRoomRepository,
    private roomRepository: RoomClassRepository,
    private timeRepository: TimeRepository
  ) {}

  private timeBodySchema = z.object({
    timeId: z.string().nonempty("ID não pode ser vazio"),
    classRoomId: z.string().nonempty("ID não pode ser vazio"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { timeId, classRoomId } = this.timeBodySchema.parse(req.body);

    const time = await this.timeRepository.listById(timeId);
    if (!time) throw new AppError("Horário não encontrado", 404);

    const classRoom = await this.roomRepository.listById(classRoomId);
    if (!classRoom) throw new AppError("Sala não encontrada", 404);

    const timeClassRoomExists =
      await this.timeClassRoomRepository.timeClassRoomExists(
        timeId,
        classRoomId
      );

    if (timeClassRoomExists) throw new AppError("Horário já cadastrado", 409);

    await this.timeClassRoomRepository.create({
      horarioId: timeId,
      salaId: classRoomId,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
