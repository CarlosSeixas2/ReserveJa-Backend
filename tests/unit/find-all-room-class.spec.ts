import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { FindAllRoomService } from "../../src/modules/class_room/services/find-all-room";
import { AppError } from "../../src/errors/app-error";

let roomclassRepository: ClassRoomMemory;
let listAllRoomService: FindAllRoomService;

describe("ListAll Room Service", () => {
  beforeEach(() => {
    roomclassRepository = new ClassRoomMemory();
    listAllRoomService = new FindAllRoomService(roomclassRepository);
  });

  it("devem listar todas as sala com sucesso", async () => {
    const rooms = [
      {
        nome: "Sala 1",
        capacidade: 30,
        disponivel: true,
      },
      {
        nome: "Sala 2",
        capacidade: 40,
        disponivel: true,
      },
    ];

    Promise.all(rooms.map(async (room) => roomclassRepository.create(room)));

    const req = {} as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await listAllRoomService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect((await roomclassRepository.listAll()).length).toBe(2);
  });

  it("deve retornar erro ao listar as salas", async () => {
    const req = {} as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(listAllRoomService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });
});
