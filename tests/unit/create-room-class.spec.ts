import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { CreateRoomService } from "../../src/modules/room/services/create-rom";
import { ClassRoomMemory } from "../in-memory/class-room-memory";
import { UserMemory } from "../in-memory/user-memory";

let roomclassRepository: ClassRoomMemory;
let createRoomService: CreateRoomService;

describe("Create Room Service", () => {
  beforeEach(() => {
    roomclassRepository = new ClassRoomMemory();
    createRoomService = new CreateRoomService(roomclassRepository);
  });

  it("devem criar uma sala com sucesso", async () => {
    const req = {
      body: {
        name: "Sala 1",
        capacity: 30,
        diponility: true,
      },
    } as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await createRoomService.execute(req, reply);

    expect(reply.code).toHaveBeenCalledWith(201);
    expect((await roomclassRepository.listAll()).length).toBe(1);
  });

  it("deve lançar erro se os campos não forem preenchidos", async () => {
    await roomclassRepository.create({
      nome: "Sala 1",
      capacidade: 30,
      disponivel: true,
    });

    const req = {} as FastifyRequest;

    const reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    await expect(createRoomService.execute(req, reply)).rejects.toThrow(
      ZodError
    );
  });
});
