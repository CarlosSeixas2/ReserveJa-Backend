import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { FindByIdRoomService } from "../../src/modules/class_room/services/find-by-id-rom";

let roomclassRepository: ClassRoomMemory;
let findByIdRoomService: FindByIdRoomService;

describe("ListById Room Service", () => {
  beforeEach(() => {
    roomclassRepository = new ClassRoomMemory();
    findByIdRoomService = new FindByIdRoomService(roomclassRepository);
  });

  it("devem listar todas as sala com sucesso", async () => {
    const room = await roomclassRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const req = {
      params: {
        id: room.id,
      },
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await findByIdRoomService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect((await roomclassRepository.listAll()).length).toBe(1);
  });
});
