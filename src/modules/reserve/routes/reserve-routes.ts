import { FastifyInstance } from "fastify";
import { ReserveController } from "../controller/reserve-controller";

export async function reserveRoutes(fastify: FastifyInstance) {
  const reserveController = new ReserveController();

  fastify.post("/", reserveController.create);
  fastify.put("/:id", reserveController.update);
  fastify.delete("/:id", reserveController.delete);
  fastify.get("/", reserveController.list);
  fastify.get("/:id", reserveController.get);
}
