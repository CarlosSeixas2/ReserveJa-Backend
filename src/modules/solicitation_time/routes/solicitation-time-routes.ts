import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { SolicitationController } from "../../solicitation/controller/solicitation-controllet";

export async function solicitationRoutes(fastify: FastifyInstance) {
  const solicitationController = new SolicitationController();

  fastify.post(
    "/",
    { preHandler: authMiddleware },
    solicitationController.create
  );

  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    solicitationController.delete
  );

  fastify.put(
    "/:id",
    { preHandler: authMiddleware },
    solicitationController.update
  );

  fastify.get("/", solicitationController.list);

  fastify.get(
    "/:id",
    { preHandler: authMiddleware },
    solicitationController.get
  );
}
