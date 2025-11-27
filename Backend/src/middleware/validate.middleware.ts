import { Context, Next } from 'hono';
import { z } from 'zod';

export const validateData = (schema: z.ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const validation = schema.safeParse(body);

      if (!validation.success) {
        const errorMessages = validation.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return c.json({ error: 'Validation Failed', details: errorMessages }, 400);
      }

      c.set('validatedData', validation.data);
      await next();
    } catch (error) {
      return c.json({ error: 'Invalid JSON format' }, 400);
    }
  };
};