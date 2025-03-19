import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateUserService } from "../factory/make-create-user-service";
import { makeUpdateUserService } from "../factory/make-update-user-service";
import { makeDeleteUserService } from "../factory/make-delete-user-service";
import { makeFindAllUserService } from "../factory/make-find-all-user-service";
import { makeFindByIdUserService } from "../factory/make-find-by-id-user-service";

export class UserController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const createUserService = makeCreateUserService();
    await createUserService.execute(req, reply);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const createUpdateService = makeUpdateUserService();
    await createUpdateService.execute(req, reply);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const createDeleteService = makeDeleteUserService();
    await createDeleteService.execute(req, reply);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const createFindAllService = makeFindAllUserService();
    await createFindAllService.execute(req, reply);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const createFindByIdService = makeFindByIdUserService();
    await createFindByIdService.execute(req, reply);
  }
}
