import { Context } from 'hono';
import { sign } from 'hono/jwt';
import bcrypt from 'bcrypt';
import * as authService from './auth.service.js';
// import { sendNotificationEmail } from '../mailer/mailer.service.js'; // Uncomment if using mailer

export const registerUser = async (c: Context) => {
  try {
    const user = c.get('validatedData'); // Get data from validator
    
    const result = await authService.registerUserService(user);
    
    if (!result) {
      return c.json({ error: 'Email already exists' }, 409);
    }

    // Optional: Send Welcome Email
    // await sendNotificationEmail(user.email, user.first_name, "Welcome", "Thanks for joining!");

    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const { email, password } = c.get('validatedData');

    const user = await authService.loginUserService(email);
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    // Generate Payload
    const payload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expires in 24 hours
    };

    const secret = process.env.JWT_SECRET as string;
    const token = await sign(payload, secret);

    const userDetails = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role
    };

    return c.json({ message: 'Login successful', token, user: userDetails }, 200);

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};