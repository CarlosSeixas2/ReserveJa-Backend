import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = await req.jwtVerify<{ id: string }>();

    req.user = { id: decoded.id };
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}
