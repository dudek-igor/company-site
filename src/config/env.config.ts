/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import { z } from 'zod';

// Define the schema as an object with all of the env variables and their types
const envSchema = z.object({
  HOST: z.string().startsWith('https://', { message: 'Must provide secure URL' }),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASS: z.string().min(1),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const env = envSchema.parse(process.env);

export default env;
