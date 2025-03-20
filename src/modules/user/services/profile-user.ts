import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/user-repository";
import { AppError } from "../../../errors/app-error";

export class ProfileUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    if (!req.user) throw new AppError("Usuário não autenticado", 401);

    const { id } = req.user as { id: string };

    const user = await this.userRepository.listById(id);

    if (!user) throw new AppError("Usuário não encontrado");

    return reply.code(200).send(user);
  }
}
