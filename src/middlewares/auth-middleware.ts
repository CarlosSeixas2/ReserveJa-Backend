import jwt from "jsonwebtoken";
import { env } from "../env/zod";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, env.SECRET_WORD) as { id: string };

    req.user = { id: decoded.id };
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}
