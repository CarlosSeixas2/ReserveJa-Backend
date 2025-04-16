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
    roomId: z.string().optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const user = (await req.user) as { id: string; tipo: string };

    const { id } = this.reserveParamsSchema.parse(req.params);
    const { roomId } = this.reserveBodySchema.parse(req.body);

    const reserve = await this.reserveRepository.listById(id);
    if (!reserve) throw new AppError("Reserva não encontrada", 404);

    const checkUser = await this.userRepository.listById(user.id);
    if (!checkUser) throw new AppError("Usuário não encontrado", 404);

    await this.reserveRepository.update(id, {
      salaId: roomId ?? reserve.salaId,
    });

    return reply.code(200).send({ message: "Reserva atualizada com sucesso" });
  }
}
