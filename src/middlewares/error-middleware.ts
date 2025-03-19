import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/app-error";
import { z } from "zod";

export function errorMiddleware(
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
): void {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({ message: error.message });
  } else if (error instanceof z.ZodError) {
    reply.status(400).send({
      message: "Validation error",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  } else {
    console.error(error);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}
