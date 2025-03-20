import jwt from "jsonwebtoken";
import { env } from "../env/zod";

export async function GenerateToken(payload: string | object) {
  return jwt.sign(payload, env.SECRET_WORD, {
    expiresIn: "1d",
  });
}
