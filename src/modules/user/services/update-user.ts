import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/user-repository";
import { z } from "zod";
import { AppError } from "../../../errors/app-error";
import { ComparePassword } from "../../../utils/compare-password";
import { CreateHashPassword } from "../../../utils/hash-password";

export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  private userParamsSchema = z.object({
    id: z.string(),
  });

  private userBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .optional(),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { id } = this.userParamsSchema.parse(req.params);
    const { name, email, password } = this.userBodySchema.parse(req.body);

    const user = await this.userRepository.listById(id);

    if (!user) throw new AppError("Usuário não encontrado", 404);

    let hashedPassword = user.senha;

    if (password) {
      const comparedPassword = await ComparePassword(password, user.senha);

      if (comparedPassword)
        throw new AppError("Nova senha não pode ser igual a senha atual", 400);

      hashedPassword = await CreateHashPassword(password);
    }

    await this.userRepository.update(id, {
      nome: name,
      email,
      senha: hashedPassword,
    });

    return reply.code(200).send({ message: "Usuário atualizado com sucesso" });
  }
}
