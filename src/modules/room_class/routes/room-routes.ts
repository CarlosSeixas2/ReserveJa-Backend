import { FastifyInstance } from "fastify";
import { RoomController } from "../controller/room-controller";
import { authMiddleware } from "../../../middlewares/auth-middleware";

export async function roomRoutes(fastify: FastifyInstance) {
  const roomController = new RoomController();

  fastify.post("/", { preHandler: authMiddleware }, roomController.create);
  fastify.put("/:id", { preHandler: authMiddleware }, roomController.update);
  fastify.delete("/:id", { preHandler: authMiddleware }, roomController.delete);
  fastify.get("/", roomController.list);
  fastify.get("/:id", { preHandler: authMiddleware }, roomController.get);
}
