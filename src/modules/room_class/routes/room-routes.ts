import { FastifyInstance } from "fastify";
import { RoomController } from "../controller/room-controller";

export async function roomRoutes(fastify: FastifyInstance) {
  const roomController = new RoomController();

  fastify.post("/", roomController.create);
  fastify.put("/:id", roomController.update);
  fastify.delete("/:id", roomController.delete);
  fastify.get("/", roomController.list);
  fastify.get("/:id", roomController.get);
}
