import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateReserveService } from "../factory/make-create-reserve-service";
import { makeUpdateReserveService } from "../factory/make-update-reserve-service";
import { makeDeleteReserveService } from "../factory/make-delete-reserve-service";
import { makeFindAllReserveService } from "../factory/make-find-all-reserve-service";
import { makeFindByIdReserveService } from "../factory/make-find-by-id-reserve-service";
import { makeSearchReserveFromDate } from "../factory/make-search-reserve-from-date";

export class ReserveController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createReserveService = makeCreateReserveService();
    await createReserveService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateReserveService();
    await createUpdateService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteReserveService();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllReserveService();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdReserveService();
    await createFindByIdService.execute(req, reply);
  }

  async searchReserveFromDate(req: FastifyRequest, reply: FastifyReply) {
    const searchReserveFromDateService = makeSearchReserveFromDate();
    await searchReserveFromDateService.execute(req, reply);
  }
}
