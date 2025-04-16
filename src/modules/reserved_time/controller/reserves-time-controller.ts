import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteReservesTimeService } from "../factory/make-delete-reserves-time-service";
import { makeCreateReservesTimeService } from "../factory/make-create-reserves-time-service";
import { makeFindAllReservesTimeService } from "../factory/make-find-all-reserves-time-service";
import { makeFindByIdReservesTimeService } from "../factory/make-find-by-id-reserves-time-service";
import { makeUpdateReservesTimeService } from "../factory/make-update-reserves-time-service";

export class ReservesTimeController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createSolicitationService = makeCreateReservesTimeService();
    await createSolicitationService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteReservesTimeService();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllReservesTimeService();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdReservesTimeService();
    await createFindByIdService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateReservesTimeService();
    await createUpdateService.execute(req, reply);
  }
}
