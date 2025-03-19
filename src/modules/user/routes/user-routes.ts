import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user-controller";

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.post("/", userController.create);
  fastify.put("/:id", userController.update);
  fastify.delete("/:id", userController.delete);
  fastify.get("/", userController.list);
  fastify.get("/:id", userController.get);
}
