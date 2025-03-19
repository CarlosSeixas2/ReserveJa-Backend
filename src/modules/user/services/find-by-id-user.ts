import { z } from "zod";
import { UserRepository } from "../repository/user-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";

export class FindByIdUserService {
  constructor(private readonly userRepository: UserRepository) {}

  private userParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.userParamsSchema.parse(req.params);

    const user = await this.userRepository.listById(id);

    if (!user) throw new AppError("Usuário não encontrado");

    return reply.code(200).send(user);
  }
}
