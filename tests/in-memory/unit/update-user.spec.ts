import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { UserMemory } from "../user-memory";
import { UpdateUserService } from "../../../src/modules/user/services/update-user";
import { AppError } from "../../../src/errors/app-error";

let userRepository: UserMemory;
let updateUserService: UpdateUserService;

describe("UpdateUserService", () => {
  beforeEach(() => {
    userRepository = new UserMemory();
    updateUserService = new UpdateUserService(userRepository);
  });

  it("deve atualizar um usuário com sucesso", async () => {
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
      body: {
        name: "Carlos Silva",
        email: "carlossilva@gmail.com",
        type: "Professor",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await updateUserService.execute(req, reply);

    const person = await userRepository.listAll();

    expect(person[0]).toEqual({
      id: user.id,
      nome: "Carlos Silva",
      email: "carlossilva@gmail.com",
      tipo: "Professor",
    });
  });

  it("deve retornar erro ao tentar atualizar um usuário inexistente", async () => {
    const req = {
      params: {
        id: "123",
      },
      body: {
        name: "Carlos Silva",
        email: "carlossilva@gmail.com",
        type: "Professor",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(updateUserService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });

  it("deve retornar erro ao não passar dados no body e params", async () => {
    const req = {
      params: {},
      body: {},
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(updateUserService.execute(req, reply)).rejects.instanceOf(
      ZodError
    );
  });

  it("deve retornar erro ao não passar dados no body", async () => {
    const req = {
      params: {
        id: "123",
      },
      body: {},
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(updateUserService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
