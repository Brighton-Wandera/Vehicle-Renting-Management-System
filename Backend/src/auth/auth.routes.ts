import { Hono } from 'hono';
import { registerUser, loginUser } from './auth.controller.js';
import { validateData } from '../middleware/validate.middleware.js';
import { registerUserSchema, loginUserSchema } from '../validator/user.validator.js';

export const authRouter = new Hono();

authRouter.post('/register', validateData(registerUserSchema), registerUser);
authRouter.post('/login', validateData(loginUserSchema), loginUser);