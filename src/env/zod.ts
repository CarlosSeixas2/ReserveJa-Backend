import "dotenv/config";
import { z } from "zod";

const isTestEnv = process.env.NODE_ENV === "test";

const envSchema = z.object({
  DATABASE_URL: isTestEnv ? z.string().optional() : z.string(),
  SECRET_WORD: z.string().default("teste"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Invalid environment variables ❌", _env.error.format());
  throw new Error("Invalid environment variables ❌");
}

export const env = _env.data;
