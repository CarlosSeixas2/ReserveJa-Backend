import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateTime } from "../factory/make-create-time-service";
import { makeDeleteTime } from "../factory/make-delete-time-class-room-service";
import { makeFindAllTime } from "../factory/make-find-all-time-class-room-service";
import { makeFindByIdTime } from "../factory/make-find-by-id-time-class-room-service";
import { makeUpdateTime } from "../factory/make-update-time-class-room-service";

export class TimeController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createSolicitationService = makeCreateTime();
    await createSolicitationService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteTime();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllTime();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdTime();
    await createFindByIdService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateTime();
    await createUpdateService.execute(req, reply);
  }
}
