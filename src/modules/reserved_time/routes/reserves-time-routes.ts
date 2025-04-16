import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { ReservesTimeController } from "../controller/reserves-time-controller";

export async function reservesTimeRoutes(fastify: FastifyInstance) {
  const reservesTimeController = new ReservesTimeController();

  fastify.post(
    "/",
    { preHandler: authMiddleware },
    reservesTimeController.create
  );

  fastify.put(
    "/:id",
    { preHandler: authMiddleware },
    reservesTimeController.update
  );

  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    reservesTimeController.delete
  );

  fastify.get("/", reservesTimeController.list);

  fastify.get(
    "/:id",
    { preHandler: authMiddleware },
    reservesTimeController.get
  );
}
