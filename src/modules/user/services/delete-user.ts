import { z } from "zod";
import { UserRepository } from "../repository/user-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../errors/app-error";

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  private userParamsSchema = z.object({
    id: z.string(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.userParamsSchema.parse(req.params);

    const user = await this.userRepository.listById(id);

    if (!user) throw new AppError("Usuário não encontrado", 404);

    await this.userRepository.delete(id);

    return reply.code(204).send({ message: "Usuário deletado com sucesso" });
  }
}
