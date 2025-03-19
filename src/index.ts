import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import { userRoutes } from "./modules/user/routes/user-routes";
import { errorMiddleware } from "./middlewares/error-middleware";
import { roomRoutes } from "./modules/room_class/routes/room-routes";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*",
});

fastify.register(helmet);

fastify.setErrorHandler(errorMiddleware);

fastify.register(userRoutes, { prefix: "/user" });
fastify.register(roomRoutes, { prefix: "/room" });

export default fastify;
