import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { TimeController } from "../controller/time-controller";

export async function timeRoutes(fastify: FastifyInstance) {
  const timeController = new TimeController();

  fastify.post("/", { preHandler: authMiddleware }, timeController.create);

  fastify.delete("/:id", { preHandler: authMiddleware }, timeController.delete);

  fastify.get("/", timeController.list);

  fastify.get("/:id", timeController.get);

  fastify.put("/:id", { preHandler: authMiddleware }, timeController.update);
}
