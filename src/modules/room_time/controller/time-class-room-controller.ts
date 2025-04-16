import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateTimeClassRoom } from "../factory/make-create-time-class-room-service";
import { makeDeleteTimeClassRoom } from "../factory/make-delete-time-class-room-service";
import { makeFindAllTimeClassRoom } from "../factory/make-find-all-time-class-room-service";
import { makeFindByIdTimeClassRoomService } from "../factory/make-find-by-id-time-class-room-service";
import { makeUpdateTimeClassRoom } from "../factory/make-update-time-class-room-service";
import { makeFindAllGroupByRoom } from "../factory/make-find-all-group-by-room";

export class TimeClassRoomController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createSolicitationService = makeCreateTimeClassRoom();
    await createSolicitationService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteTimeClassRoom();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllTimeClassRoom();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdTimeClassRoomService();
    await createFindByIdService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateTimeClassRoom();
    await createUpdateService.execute(req, reply);
  }

  async listByRoom(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllGroupByRoom = makeFindAllGroupByRoom();
    await createFindAllGroupByRoom.execute(req, reply);
  }
}
