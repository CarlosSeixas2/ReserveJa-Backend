import { z } from "zod";
import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/user-repository";
import { AppError } from "../../../errors/app-error";
import { CreateHashPassword } from "../../../utils/hash-password";
import { env } from "../../../env/zod";

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  private userBodySchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    type: z.enum(["Professor", "Aluno"]),
  });

  public async execute(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, type } = this.userBodySchema.parse(req.body);

    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail) throw new AppError("E-mail já cadastrado", 400);

    const passwordHash = await CreateHashPassword(password);

    const user = await this.userRepository.create({
      nome: name,
      email,
      senha: passwordHash,
      tipo: type,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      env.SECRET_WORD,
      { expiresIn: "1d" }
    );

    return reply
      .code(201)
      .send({ message: "Usuário criado com sucesso", token });
  }
}
