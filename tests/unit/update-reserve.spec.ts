import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ReserveMemory } from "../in-memory/reserve-memory";
import { UserMemory } from "../in-memory/user-memory";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { UpdateReserveService } from "../../src/modules/reserve/services/update-reserve";
import { AppError } from "../../src/errors/app-error";

let reserveRepository: ReserveMemory;
let userRepository: UserMemory;
let roomRepository: ClassRoomMemory;
let updateReserveService: UpdateReserveService;

describe("FindAllReserveService", () => {
  beforeEach(() => {
    reserveRepository = new ReserveMemory();
    userRepository = new UserMemory();
    roomRepository = new ClassRoomMemory();
    updateReserveService = new UpdateReserveService(
      reserveRepository,
      userRepository
    );
  });

  it("deve atualizar uma reserva com sucesso", async () => {
    const user = await userRepository.create({
      nome: "Carlos",
      email: "carlos@gmail.com",
      senha: "123456",
      tipo: "Aluno",
    });

    const room = await roomRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const reserve = await reserveRepository.create({
      usuarioId: user.id,
      salaId: room.id,
      horario: "08:00",
      status: "Aprovada",
      data: new Date(),
    });

    const req = {
      params: {
        id: reserve.id,
      },
      body: {
        roomId: room.id,
        status: "Recusada",
        time: "09:00",
      },
      user: {
        id: user.id,
        tipo: user.tipo,
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await updateReserveService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
  });

  it("deve retornar erro se o usuario e a sala não existir", async () => {
    const req = {
      params: {
        id: "123",
      },
      body: {
        roomId: "123",
        status: "Recusada",
        time: "09:00",
      },
      user: {
        id: "123",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(updateReserveService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
