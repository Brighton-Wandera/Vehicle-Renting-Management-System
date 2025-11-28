import { Context, Next } from 'hono';

export const isAdmin = async (c: Context, next: Next) => {
    try {
        const user = c.get('user');

        if (!user) {
            return c.json({ error: 'Unauthorized - No user found' }, 401);
        }

        if (user.role !== 'admin') {
            return c.json({ error: 'Forbidden - Admin access required' }, 403);
        }

        await next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
