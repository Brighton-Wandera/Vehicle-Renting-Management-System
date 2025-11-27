import { z } from 'zod';

export const registerUserSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact_phone: z.string().min(10, "Phone number is required"),
  address: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(), // Default is user
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  contact_phone: z.string().optional(),
  address: z.string().optional(),
});