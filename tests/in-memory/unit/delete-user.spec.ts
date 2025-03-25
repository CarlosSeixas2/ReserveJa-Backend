import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { UserMemory } from "../user-memory";
import { DeleteUserService } from "../../../src/modules/user/services/delete-user";

let userRepository: UserMemory;
let deleteUserService: DeleteUserService;

describe("DeleteUserService", () => {
  beforeEach(() => {
    userRepository = new UserMemory();
    deleteUserService = new DeleteUserService(userRepository);
  });

  it("deve deletar um usuário com sucesso", async () => {
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

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await deleteUserService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Usuário deletado com sucesso",
    });
  });

  it("deve lançar erro se o usuário não for encontrado", async () => {
    const req = {
      params: {
        id: "1",
      },
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(() => deleteUserService.execute(req, reply)).rejects.toThrow(
      "Usuário não encontrado"
    );
  });

  it("deve lançar erro se o id não for informado", async () => {
    const req = {
      params: {},
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(deleteUserService.execute(req, reply)).rejects.instanceOf(
      ZodError
    );
  });
});
