import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const reserves = await this.reserveRepository.listAll();

    if (!reserves || reserves.length == 0)
      throw new AppError("Nenhuma reserva encontrada", 404);

    return reply.code(200).send(reserves);
  }
}
