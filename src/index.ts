import { env } from "./env/zod";

import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import { userRoutes } from "./modules/user/routes/user-routes";
import { errorMiddleware } from "./middlewares/error-middleware";
import { roomRoutes } from "./modules/class_room/routes/room-routes";
import { authMiddleware } from "./middlewares/auth-middleware";
import { reserveRoutes } from "./modules/reserve/routes/reserve-routes";
import { timeRoutes } from "./modules/time/routes/time-routes";
import { timeClassRoomRoutes } from "./modules/time_class_room/routes/time-class-routes";
import { reservesTimeRoutes } from "./modules/reserves_time/routes/reserves-time-routes";
// import { solicitationRoutes } from "./modules/solicitation/routes/solicitation-routes";

const fastify = Fastify({ logger: true });

fastify.register(fastifyJwt, {
  secret: env.SECRET_WORD,
});

fastify.register(cors, {
  origin: "*",
});

fastify.register(helmet);

fastify.decorate("authenticate", authMiddleware);

fastify.setErrorHandler(errorMiddleware);

fastify.register(userRoutes, { prefix: "/user" });
fastify.register(roomRoutes, { prefix: "/room" });
fastify.register(reserveRoutes, { prefix: "/reserve" });
fastify.register(timeRoutes, { prefix: "/time" });
fastify.register(timeClassRoomRoutes, { prefix: "/time-class" });
fastify.register(reservesTimeRoutes, { prefix: "/reserves-time" });
// fastify.register(solicitationRoutes, { prefix: "/solicitation" });

export default fastify;
