// import { FastifyReply, FastifyRequest } from "fastify";
// import { ReserveRepository } from "../repository/reserve-repository";
// import { AppError } from "../../../errors/app-error";
// import { z } from "zod";

// export class SearchReserveFromDateService {
//   constructor(private reserveRepository: ReserveRepository) {}

//   private reserveBodySchema = z.object({
//     id: z.string(),
//     date: z.string().datetime(),
//   });

//   public async execute(req: FastifyRequest, reply: FastifyReply) {
//     const { id, date } = this.reserveBodySchema.parse(req.params);

//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate.getTime())) {
//       throw new AppError("Data inválida", 400);
//     }

//     const reserves = await this.reserveRepository.searchReserveFromDate(
//       id,
//       parsedDate
//     );

//     if (!reserves || reserves.length === 0)
//       return reply.code(204).send("Nenhuma reserva encontrada");

//     return reply.code(200).send(reserves);
//   }
// }
