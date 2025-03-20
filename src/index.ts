import { env } from "./env/zod";

import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import { userRoutes } from "./modules/user/routes/user-routes";
import { errorMiddleware } from "./middlewares/error-middleware";
import { roomRoutes } from "./modules/room_class/routes/room-routes";
import { authMiddleware } from "./middlewares/auth-middleware";

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

export default fastify;
