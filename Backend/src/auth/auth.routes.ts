import { Hono } from 'hono';
import { registerUser, loginUser, verifyEmail, resendOtp, forgotPassword, resetPassword } from './auth.controller.js';
import { validateData } from '../middleware/validate.middleware.js';
import { registerUserSchema, loginUserSchema, verifyEmailSchema, resendOtpSchema, forgotPasswordSchema, resetPasswordSchema } from '../validator/user.validator.js';

export const authRouter = new Hono();

authRouter.post('/register', validateData(registerUserSchema), registerUser);
authRouter.post('/login', validateData(loginUserSchema), loginUser);
authRouter.post('/verify-email', validateData(verifyEmailSchema), verifyEmail);
authRouter.post('/resend-otp', validateData(resendOtpSchema), resendOtp);
authRouter.post('/forgot-password', validateData(forgotPasswordSchema), forgotPassword);
authRouter.post('/reset-password', validateData(resetPasswordSchema), resetPassword);