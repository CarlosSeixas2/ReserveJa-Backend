import { describe, it, expect, beforeEach, vi } from "vitest";
import { UserMemory } from "../in-memory/user-memory";
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdUserService } from "../../src/modules/user/services/find-by-id-user";
import { ZodError } from "zod";
import { AppError } from "../../src/errors/app-error";

let userRepository: UserMemory;
let FindByidUserService: FindByIdUserService;

describe("FindAllUserService", () => {
  beforeEach(() => {
    userRepository = new UserMemory();
    FindByidUserService = new FindByIdUserService(userRepository);
  });

  it("deve listar todos os usuários", async () => {
    const user = await userRepository.create({
      nome: "Carlos",
      email: "carlos@example.com",
      senha: "123456",
      tipo: "Aluno",
    });

    const req = {
      params: {
        id: user.id,
      },
    } as FastifyRequest;
    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await FindByidUserService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect(sendMock.mock.calls[0][0].id).toBe(user.id);
  });

  it("deve retornar erro se não passar parâmetros", async () => {
    const req = {} as FastifyRequest;
    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(FindByidUserService.execute(req, reply)).rejects.instanceOf(
      ZodError
    );
  });

  it("deve retornar erro se o usuário não existir", async () => {
    const req = {
      params: {
        id: "123",
      },
    } as FastifyRequest;
    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(FindByidUserService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
