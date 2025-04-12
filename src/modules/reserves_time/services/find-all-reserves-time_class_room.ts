import { FastifyReply, FastifyRequest } from "fastify";
import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllReserveTimeService {
  constructor(private reservesTimeRepository: ReservesTimeRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const times = await this.reservesTimeRepository.listAll();

    if (times.length == 0 || !times)
      throw new AppError("Nenhum horário encontrado", 404);

    return reply.status(200).send(times);
  }
}
