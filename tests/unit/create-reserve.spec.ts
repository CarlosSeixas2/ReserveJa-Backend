import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "../../src/errors/app-error";
import { UserMemory } from "../in-memory/user-memory";
import { ZodError } from "zod";
import { ReserveMemory } from "../in-memory/reserve-memory";
import { CreateReserveService } from "../../src/modules/reserve/services/create-reserve";
import { ClassRoomMemory } from "../in-memory/class-room-memory";

let reserveRepository: ReserveMemory;
let userRepository: UserMemory;
let roomRepository: ClassRoomMemory;
let createReserveService: CreateReserveService;

describe("Create Reserve Service", () => {
  beforeEach(() => {
    reserveRepository = new ReserveMemory();
    userRepository = new UserMemory();
    roomRepository = new ClassRoomMemory();
    createReserveService = new CreateReserveService(
      reserveRepository,
      userRepository,
      roomRepository
    );
  });

  const mockReply = (): FastifyReply => {
    const sendMock = vi.fn();
    return {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;
  };

  it("deve criar uma reserva com sucesso", async () => {
    const user = await userRepository.create({
      nome: "Carlos",
      email: "carlos@example.com",
      senha: "123456",
      tipo: "Professor",
    });

    const room = await roomRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const req = {
      body: {
        roomId: room.id,
        time: "08:00",
      },
      user: { id: user.id },
    } as FastifyRequest;

    const reply = mockReply();
    await createReserveService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(201);
    expect(await reserveRepository.listAll()).toHaveLength(1);
  });

  it("deve retornar erro se o usuário não existir", async () => {
    const room = await roomRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const req = {
      body: {
        roomId: room.id,
        time: "08:00",
      },
      user: {},
    } as FastifyRequest;

    const reply = mockReply();
    await expect(
      createReserveService.execute(req, reply)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("deve retornar erro se a sala não existir", async () => {
    const user = await userRepository.create({
      nome: "Carlos",
      email: "carlos@example.com",
      senha: "123456",
      tipo: "Professor",
    });

    const req = {
      body: {
        roomId: "123",
        time: "08:00",
      },
      user: { id: user.id },
    } as FastifyRequest;

    const reply = mockReply();
    await expect(createReserveService.execute(req, reply)).rejects.toThrow(
      "Usuário ou Sala não encontrado(a)"
    );
  });

  it("deve retornar erro se os campos do body não forem preenchidos", async () => {
    const req = {} as FastifyRequest;
    const reply = mockReply();

    await expect(
      createReserveService.execute(req, reply)
    ).rejects.toBeInstanceOf(ZodError);
  });

  it("deve retornar erro ao tentar criar reserva duplicada", async () => {
    const user = await userRepository.create({
      nome: "Carlos",
      email: "carlos@example.com",
      senha: "123456",
      tipo: "Professor",
    });

    const room = await roomRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const req = {
      body: {
        roomId: room.id,
        time: "08:00",
      },
      user: { id: user.id },
    } as FastifyRequest;

    const reply = mockReply();
    await createReserveService.execute(req, reply);
    await expect(createReserveService.execute(req, reply)).rejects.toThrow(
      AppError
    );
  });
});
