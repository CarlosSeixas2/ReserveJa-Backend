import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "../../src/errors/app-error";
import { UserMemory } from "../in-memory/user-memory";
import { CreateUserService } from "../../src/modules/user/services/create-user";
import { ZodError } from "zod";

let userRepository: UserMemory;
let createUserService: CreateUserService;

describe("CreateUserService", () => {
  beforeEach(() => {
    userRepository = new UserMemory();
    createUserService = new CreateUserService(userRepository);
  });

  it("deve criar um usuário com sucesso", async () => {
    const req = {
      body: {
        name: "Carlos",
        email: "carlos@example.com",
        password: "123456",
        type: "Aluno",
      },
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await createUserService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(201);
    expect((await userRepository.listAll()).length).toBe(1);
  });

  it("deve lançar erro se o e-mail já estiver cadastrado", async () => {
    await userRepository.create({
      nome: "Carlos",
      email: "carlos@example.com",
      senha: "123456",
      tipo: "Aluno",
    });

    const req = {
      body: {
        name: "Outro Nome",
        email: "carlos@example.com",
        password: "123456",
        type: "Aluno",
      },
    } as FastifyRequest;

    const reply = {} as FastifyReply;

    await expect(createUserService.execute(req, reply)).rejects.toThrow(
      AppError
    );
  });

  it("deve lançar erro se os dados forem vazios", async () => {
    const req = {} as FastifyRequest;

    const reply = {} as FastifyReply;

    await expect(createUserService.execute(req, reply)).rejects.toThrow(
      ZodError
    );
  });

  it("deve lançar erro se o email for inválido", async () => {
    const req = {
      body: {
        name: "Carlos",
        email: "dawddwaw",
        password: "1234567",
        type: "Professor",
      },
    } as FastifyRequest;

    const reply = {} as FastifyReply;

    await expect(createUserService.execute(req, reply)).rejects.toThrow(
      ZodError
    );
  });

  it("deve lançar erro se não passar o Tipo correto", async () => {
    const req = {
      body: {
        name: "Carlos",
        email: "carlos@example.com",
        password: "123456",
        type: "Teste",
      },
    } as FastifyRequest;
    const reply = {} as FastifyReply;

    await expect(createUserService.execute(req, reply)).rejects.toThrow(
      ZodError
    );
  });
});
