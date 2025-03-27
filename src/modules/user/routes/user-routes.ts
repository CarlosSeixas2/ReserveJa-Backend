import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../../../middlewares/auth-middleware";

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.post("/", userController.create);
  fastify.put("/:id", { preHandler: authMiddleware }, userController.update);
  fastify.delete("/:id", { preHandler: authMiddleware }, userController.delete);
  fastify.get("/", userController.list);
  fastify.get("/:id", { preHandler: authMiddleware }, userController.get);
  fastify.get("/profile", { preHandler: authMiddleware }, userController.me);
  fastify.post("/login", userController.login);
}
