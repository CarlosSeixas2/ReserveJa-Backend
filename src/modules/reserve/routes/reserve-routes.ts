import { FastifyInstance } from "fastify";
import { ReserveController } from "../controller/reserve-controller";
import { authMiddleware } from "../../../middlewares/auth-middleware";

export async function reserveRoutes(fastify: FastifyInstance) {
  const reserveController = new ReserveController();

  // fastify.get(
  //   "/search-from-date/:id/:date",
  //   { preHandler: authMiddleware },
  //   reserveController.searchReserveFromDate
  // );
  fastify.post("/", { preHandler: authMiddleware }, reserveController.create);
  // fastify.put("/:id", { preHandler: authMiddleware }, reserveController.update);
  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    reserveController.delete
  );
  fastify.get("/", reserveController.list);
  fastify.get("/:id", { preHandler: authMiddleware }, reserveController.get);
}
