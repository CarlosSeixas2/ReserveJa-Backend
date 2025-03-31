import { FastifyReply, FastifyRequest } from "fastify";
import { ReserveRepository } from "../repository/reserve-repository";
import { z } from "zod";
import { UserRepository } from "../../user/repository/user-repository";
import { AppError } from "../../../errors/app-error";

export class UpdateReserveService {
  constructor(
    private reserveRepository: ReserveRepository,
    private userRepository: UserRepository
  ) {}

  private reserveParamsSchema = z.object({
    id: z.string(),
  });

  private reserveBodySchema = z.object({
    status: z.enum(["Pendente", "Aprovada", "Recusada"]).optional(),
    inicial_time: z.string().optional(),
    final_time: z.string().optional(),
    date: z.string().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { id } = this.reserveParamsSchema.parse(req.params);

    const { status, inicial_time, final_time, date } =
      this.reserveBodySchema.parse(req.body);

    let parsedDate: Date | undefined;

    if (date) {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) throw new AppError("Data inválida", 400);
    }

    const reserve = await this.reserveRepository.listById(id);

    if (!reserve) throw new AppError("Reserva não encontrada", 404);

    const checkUser = await this.userRepository.listById(user.id);

    if (!checkUser) throw new AppError("Usuário não encontrado", 404);

    await this.reserveRepository.update(id, {
      status: status ?? reserve.status,
      horarioInicio: inicial_time ?? reserve.horarioInicio,
      horarioFim: final_time ?? reserve.horarioFim,
      data: parsedDate ?? reserve.data,
    });

    return reply.code(200).send({ message: "Reserva atualizada com sucesso" });
  }
}
