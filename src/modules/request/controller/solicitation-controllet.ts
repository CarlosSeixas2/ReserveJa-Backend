import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateSolicitationService } from "../factory/make-create-solicitation-service";
import { makeUpdateSolicitationService } from "../factory/make-update-solicitation-service";
import { makeDeleteSolicitationService } from "../factory/make-delete-solicitation-service";
import { makeFindAllSolicitationService } from "../factory/make-find-all-solicitation-service";
import { makeFindByIdSolicitationService } from "../factory/make-find-by-id-solicitation-service";
import { makeAprovedSolicitationService } from "../factory/make-aproved-solicitation-service";

export class SolicitationController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createSolicitationService = makeCreateSolicitationService();
    await createSolicitationService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateSolicitationService();
    await createUpdateService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteSolicitationService();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllSolicitationService();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdSolicitationService();
    await createFindByIdService.execute(req, reply);
  }

  async aproved(req: FastifyRequest, reply: FastifyReply) {
    const createAprovedSolicitationService = makeAprovedSolicitationService();
    await createAprovedSolicitationService.execute(req, reply);
  }
}
