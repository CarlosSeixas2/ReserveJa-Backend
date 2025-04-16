import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateRoomService } from "../factory/make-create-room-service";
import { makeUpdateRoomService } from "../factory/make-update-room-service";
import { makeDeleteRoomService } from "../factory/make-delete-room-service";
import { makeFindAllRoomService } from "../factory/make-find-all-room-service";
import { makeFindByIdRoomService } from "../factory/make-find-by-id-room-service";

export class RoomController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createRoomService = makeCreateRoomService();
    await createRoomService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateRoomService();
    await createUpdateService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteRoomService();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllRoomService();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdRoomService();
    await createFindByIdService.execute(req, reply);
  }
}
