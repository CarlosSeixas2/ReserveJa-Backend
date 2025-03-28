import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteReserveService } from "../../src/modules/reserve/services/delete-reserve";
import { ReserveMemory } from "../in-memory/reserve-memory";
import { UserMemory } from "../in-memory/user-memory";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { AppError } from "../../src/errors/app-error";

let reserveMemory: ReserveMemory;
let userMemory: UserMemory;
let roomMemory: ClassRoomMemory;
let deleteReserveService: DeleteReserveService;

describe("DeleteUserService", () => {
  beforeEach(() => {
    reserveMemory = new ReserveMemory();
    userMemory = new UserMemory();
    roomMemory = new ClassRoomMemory();
    deleteReserveService = new DeleteReserveService(reserveMemory);
  });

  it("deve deletar uma reserva com sucesso", async () => {
    const user = await userMemory.create({
      nome: "Carlos",
      email: "carlos@gmail.com",
      senha: "123456",
      tipo: "Aluno",
    });

    const room = await roomMemory.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const reserve = await reserveMemory.create({
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

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await deleteReserveService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
  });

  it("deve retornar erro ao tentar deletar uma reserva inexistente", async () => {
    const req = {
      params: {
        id: "123",
      },
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(deleteReserveService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
