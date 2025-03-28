import { FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      tipo: string;
    };
    jwtVerify: () => Promise<{ id: string; tipo: string }>;
  }
}
