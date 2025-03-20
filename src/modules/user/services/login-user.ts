import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/user-repository";
import { AppError } from "../../../errors/app-error";
import { ComparePassword } from "../../../utils/compare-password";
import { GenerateToken } from "../../../utils/generate-token";

export class LoginUserService {
  constructor(private userRepository: UserRepository) {}

  private userBodySchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = this.userBodySchema.parse(req.body);

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Usuário não encontrado", 404);

    const isPasswordCorrect = await ComparePassword(password, user.senha);

    if (!isPasswordCorrect) throw new AppError("Senha incorreta", 401);

    const token = await GenerateToken({ id: user.id });

    const { senha, ...userWithoutPassword } = user;

    return reply.code(200).send({ token });
  }
}
