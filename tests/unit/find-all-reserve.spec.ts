import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ReserveMemory } from "../in-memory/reserve-memory";
import { UserMemory } from "../in-memory/user-memory";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { FindAllReserveService } from "../../src/modules/reserve/services/find-all-reserve";
import { AppError } from "../../src/errors/app-error";

let reserveRepository: ReserveMemory;
let userRepository: UserMemory;
let roomRepository: ClassRoomMemory;
let findAllReserveService: FindAllReserveService;

describe("FindAllUserService", () => {
  beforeEach(() => {
    reserveRepository = new ReserveMemory();
    userRepository = new UserMemory();
    roomRepository = new ClassRoomMemory();
    findAllReserveService = new FindAllReserveService(reserveRepository);
  });

  it("deve listar todas as reservas com sucesso", async () => {
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

    await reserveRepository.create({
      usuarioId: user.id,
      salaId: room.id,
      horario: "08:00",
      status: "Aprovada",
    });

    const req = {} as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await findAllReserveService.execute(req, reply);

    expect(sendMock.mock.calls[0][0].length).toBe(1);
  });

  it("deve retornar erro se não houver reservas", async () => {
    const req = {} as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(findAllReserveService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
