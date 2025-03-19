import { describe, it, expect, beforeEach, vi } from "vitest";
import { IUser, UserMemory } from "../in-memory/user-memory";
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllUserService } from "../../src/modules/user/services/find-all-user";
import { Tipo } from "@prisma/client";
import { AppError } from "../../src/errors/app-error";
import { Optional } from "../../src/@types/opcional";

let userRepository: UserMemory;
let findAllUserService: FindAllUserService;

describe("FindAllUserService", () => {
  beforeEach(() => {
    userRepository = new UserMemory();
    findAllUserService = new FindAllUserService(userRepository);
  });

  it("deve listar todos os usuários", async () => {
    const users: Optional<IUser, "id">[] = [
      {
        nome: "Carlos",
        email: "carlos@example.com",
        senha: "123456",
        tipo: Tipo.Aluno,
      },
      {
        nome: "Yuri",
        email: "yuri@example.com",
        senha: "654321",
        tipo: Tipo.Professor,
      },
    ];

    await Promise.all(
      users.map((user) => {
        return userRepository.create(user);
      })
    );

    const req = {} as FastifyRequest;
    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await findAllUserService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalled();
    expect(sendMock.mock.calls[0][0].length).toBe(2);
  });

  it("deve retornar 404 se não houver usuários", async () => {
    const req = {} as FastifyRequest;
    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(findAllUserService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
