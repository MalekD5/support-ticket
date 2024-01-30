import { z } from "zod";
import { config } from "dotenv";

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string().url(),
  CLERK_PEM_PUBLIC_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

config();

export const env: EnvSchema = envSchema.parse(process.env);
