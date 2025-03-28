import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = await req.jwtVerify<{ id: string; tipo: string }>();

    req.user = { id: decoded.id, tipo: decoded.tipo };
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}
