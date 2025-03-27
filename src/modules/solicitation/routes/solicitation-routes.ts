import { FastifyInstance } from "fastify";
import { SolicitationController } from "../controller/solicitation-controllet";
import { authMiddleware } from "../../../middlewares/auth-middleware";

export async function solicitationRoutes(fastify: FastifyInstance) {
  const solicitationController = new SolicitationController();

  fastify.post(
    "/",
    { preHandler: authMiddleware },
    solicitationController.create
  );
  fastify.put(
    "/:id",
    { preHandler: authMiddleware },
    solicitationController.update
  );
  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    solicitationController.delete
  );
  fastify.get("/", solicitationController.list);
  fastify.get(
    "/:id",
    { preHandler: authMiddleware },
    solicitationController.get
  );
}
