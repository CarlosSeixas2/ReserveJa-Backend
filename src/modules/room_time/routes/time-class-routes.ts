import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { TimeClassRoomController } from "../controller/time-class-room-controller";

export async function timeClassRoomRoutes(fastify: FastifyInstance) {
  const timeClassRoomController = new TimeClassRoomController();

  fastify.post(
    "/",
    { preHandler: authMiddleware },
    timeClassRoomController.create
  );

  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    timeClassRoomController.delete
  );

  fastify.put(
    "/:id",
    { preHandler: authMiddleware },
    timeClassRoomController.update
  );

  fastify.get("/by-room", timeClassRoomController.listByRoom);

  fastify.get("/", timeClassRoomController.list);

  fastify.get(
    "/:id",
    { preHandler: authMiddleware },
    timeClassRoomController.get
  );
}
