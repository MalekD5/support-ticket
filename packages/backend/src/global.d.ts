import { type EnvSchema } from './env';

namespace NodeJS {
  interface ProcessEnv extends EnvSchema { }
}
