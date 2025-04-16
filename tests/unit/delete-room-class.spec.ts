import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { DeleteRoomService } from "../../src/modules/room/services/delete-rom";
import { AppError } from "../../src/errors/app-error";

let roomclassRepository: ClassRoomMemory;
let deleteRoomService: DeleteRoomService;

describe("Delete Room Service", () => {
  beforeEach(() => {
    roomclassRepository = new ClassRoomMemory();
    deleteRoomService = new DeleteRoomService(roomclassRepository);
  });

  it("devem deletar uma sala com sucesso", async () => {
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

    await deleteRoomService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(200);
    expect((await roomclassRepository.listAll()).length).toBe(0);
  });

  it("deve lançar erro se a sala não existir", async () => {
    const req = {
      params: {
        id: "123",
      },
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(deleteRoomService.execute(req, reply)).rejects.toThrow(
      AppError
    );
  });

  it("deve lancar erro caso os campos não sejam preenchidos", async () => {
    const req = {} as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(deleteRoomService.execute(req, reply)).rejects.toThrow(
      ZodError
    );
  });
});
