import { FastifyInstance } from "fastify";
import { SolicitationController } from "../controller/solicitation-controllet";

export async function solicitationRoutes(fastify: FastifyInstance) {
  const solicitationController = new SolicitationController();

  fastify.post("/", solicitationController.create);
  fastify.put("/:id", solicitationController.update);
  fastify.delete("/:id", solicitationController.delete);
  fastify.get("/", solicitationController.list);
  fastify.get("/:id", solicitationController.get);
}
