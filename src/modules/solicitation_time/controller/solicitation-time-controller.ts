import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateSolicitationTime } from "../factory/make-create-solicitation-time-service";
import { makeDeleteSolicitationTime } from "../factory/make-delete-solicitation-time-service";
import { makeFindAllSolicitationTime } from "../factory/make-find-all-solicitation-time-service";
import { makeFindByIdSolicitationTime } from "../factory/make-find-by-id-solicitation-time-service";
import { makeUpdateSolicitationTime } from "../factory/make-update-solicitation-time-service";

export class TimeController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createSolicitationService = makeCreateSolicitationTime();
    await createSolicitationService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteSolicitationTime();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllSolicitationTime();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdSolicitationTime();
    await createFindByIdService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateSolicitationTime();
    await createUpdateService.execute(req, reply);
  }
}
