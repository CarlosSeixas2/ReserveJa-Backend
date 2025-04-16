import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { SolicitationTimeRepository } from "../repository/solicitation-time-repository";

export class CreateSolicitationTimeService {
  constructor(private solicitationTimeRepository: SolicitationTimeRepository) {}

  private timeBodySchema = z.object({
    solicitationId: z.string().nonempty("ID não pode ser vazio"),
    classRoomId: z.string().nonempty("ID não pode ser vazio"),
    date: z.string().datetime().optional().default(new Date().toISOString()),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { solicitationId, classRoomId, date } = this.timeBodySchema.parse(
      req.body
    );

    const parsedDate = new Date(date);

    await this.solicitationTimeRepository.create({
      solicitacaoId: solicitationId,
      horarioSalaId: classRoomId,
      criadoEm: parsedDate,
    });

    return reply.status(201).send({
      message: "Horário criado com sucesso",
    });
  }
}
