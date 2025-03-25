import { describe, it, expect, beforeEach, vi, beforeAll } from "vitest";
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
        userId: user.id,
        roomId: room.id,
        time: "08:00",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await createReserveService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(201);
    expect(await reserveRepository.listAll()).toHaveLength(1);
  });

  it("deve retornar erro 404 se o usuário não existir", async () => {
    const room = await roomRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const req = {
      body: {
        userId: "123",
        roomId: room.id,
        time: "08:00",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    try {
      await createReserveService.execute(req, reply);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("Usuário ou Sala não encontrado(a)");
    }
  });

  it("deve retornar erro 404 se a sala não existir", async () => {
    const user = await userRepository.create({
      nome: "Carlos",
      email: "carlos@example.com",
      senha: "123456",
      tipo: "Professor",
    });

    const req = {
      body: {
        userId: user.id,
        roomId: "123",
        time: "08:00",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    try {
      await createReserveService.execute(req, reply);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("Usuário ou Sala não encontrado(a)");
    }
  });

  it("deve retornar erro 400 se os campos do body for preenchido", async () => {
    const req = {} as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    try {
      await createReserveService.execute(req, reply);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
