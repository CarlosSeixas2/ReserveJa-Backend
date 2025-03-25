import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";

export class FindAllReserveService {
  constructor(private reserveRepository: ReserveRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const reserves = await this.reserveRepository.listAll();

    if (!reserves || reserves.length == 0)
      return reply.code(404).send("Nenhuma reserva encontrada");

    return reply.code(200).send(reserves);
  }
}
