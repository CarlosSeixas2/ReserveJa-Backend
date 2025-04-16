import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateTime } from "../factory/make-create-time-service";
import { makeDeleteTime } from "../factory/make-delete-time-service";
import { makeFindAllTime } from "../factory/make-find-all-time-service";
import { makeFindByIdTime } from "../factory/make-find-by-id-time-service";
import { makeUpdateTime } from "../factory/make-update-time-service";

export class TimeController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createTimeService = makeCreateTime();
    await createTimeService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const deleteTimeService = makeDeleteTime();
    await deleteTimeService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const findAllTimesService = makeFindAllTime();
    await findAllTimesService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const findTimeByIdService = makeFindByIdTime();
    await findTimeByIdService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const updateTimeService = makeUpdateTime();
    await updateTimeService.execute(req, reply);
  }
}
