import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "../../src/errors/app-error";
import { ZodError } from "zod";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { UpdateRoomService } from "../../src/modules/room_class/services/update-rom";

let roomclassRepository: ClassRoomMemory;
let updateRoomClassService: UpdateRoomService;

describe("UpdateRoomClassService", () => {
  beforeEach(() => {
    roomclassRepository = new ClassRoomMemory();
    updateRoomClassService = new UpdateRoomService(roomclassRepository);
  });

  it("deve atualizar uma sala de aula com sucesso", async () => {
    const room_class = await roomclassRepository.create({
      nome: "Sala 01",
      capacidade: 20,
      disponivel: true,
    });

    const req = {
      params: {
        id: room_class.id,
      },
      body: {
        name: "Sala 02",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await updateRoomClassService.execute(req, reply);

    const updated_room_class = await roomclassRepository.listById(
      room_class.id
    );

    expect(reply.code).toHaveBeenCalledWith(200);
    expect(updated_room_class?.nome).toBe("Sala 02");
  });

  it("deve retornar erro ao tentar atualizar uma sala de aula inexistente", async () => {
    const req = {
      params: {
        id: "123",
      },
      body: {
        name: "Sala 02",
      },
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(updateRoomClassService.execute(req, reply)).rejects.instanceOf(
      AppError
    );
  });

  it("deve retornar erro ao não passar dados no body e params", async () => {
    const req = {
      params: {},
      body: {},
    } as FastifyRequest;

    const sendMock = vi.fn();
    const reply = {
      code: vi.fn().mockReturnThis(),
      send: sendMock,
    } as unknown as FastifyReply;

    await expect(updateRoomClassService.execute(req, reply)).rejects.instanceOf(
      ZodError
    );
  });
});
