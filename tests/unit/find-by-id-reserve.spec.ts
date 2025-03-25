import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ReserveMemory } from "../in-memory/reserve-memory";
import { UserMemory } from "../in-memory/user-memory";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { FindByIdReserveService } from "../../src/modules/reserve/services/find-by-id-reserve";

let reserveRepository: ReserveMemory;
let userRepository: UserMemory;
let roomRepository: ClassRoomMemory;
let findByIdReserveService: FindByIdReserveService;

describe("FindAllReserveService", () => {
  beforeEach(() => {
    reserveRepository = new ReserveMemory();
    userRepository = new UserMemory();
    roomRepository = new ClassRoomMemory();
    findByIdReserveService = new FindByIdReserveService(reserveRepository);
  });

  it("deve encontrar uma reserva pelo Id com sucesso", async () => {
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
    });

    const req = {
      params: {
        id: reserve.id,
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await findByIdReserveService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect((await reserveRepository.listAll()).length).toBe(1);
  });

  it("deve retornar erro se a reserva não existir", async () => {
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

    await findByIdReserveService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith("Reserva não encontrada");
  });
});
