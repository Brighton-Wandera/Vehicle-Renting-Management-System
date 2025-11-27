import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import "dotenv/config";

// Middleware to verify token and role
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Token required' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verify(token, process.env.JWT_SECRET as string);
    
    // Attach user payload to context
    c.set('user', payload);

    // Role Checks
    if (requiredRole === 'both') {
      return next(); // Allow both admin and user
    }

    if (payload.role !== requiredRole) {
      return c.json({ error: 'Forbidden: Insufficient permissions' }, 403);
    }

    await next();
  } catch (error) {
    return c.json({ error: 'Unauthorized: Invalid token' }, 401);
  }
};

// Helper wrappers
export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, 'admin');
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, 'user');
export const bothRolesAuth = async (c: Context, next: Next) => await authMiddleware(c, next, 'both');