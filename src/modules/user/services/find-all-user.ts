import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/user-repository";
import { AppError } from "../../../errors/app-error";

export class FindAllUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const users = await this.userRepository.listAll();

    if (users?.length == 0)
      throw new AppError("Nenhum usuário encontrado", 404);

    return reply.code(200).send(users);
  }
}
