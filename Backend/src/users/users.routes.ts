import { Hono } from "hono";
import { getAllUsers, getUserById, updateUser, deleteUser, getMe, updateProfile } from "./users.controller.js";
import { adminRoleAuth, bothRolesAuth } from "../middleware/auth.middleware.js";

export const usersRouter = new Hono();

// Protect routes
usersRouter.get('/', adminRoleAuth, getAllUsers);       // Only Admin can see all users
usersRouter.get('/me', bothRolesAuth, getMe);           // Get current user (must be before /:id)
usersRouter.put('/profile', bothRolesAuth, updateProfile); // Update current user profile
usersRouter.get('/:id', bothRolesAuth, getUserById);    // User can see self, Admin can see user
usersRouter.put('/:id', bothRolesAuth, updateUser);     // User can update self
usersRouter.delete('/:id', adminRoleAuth, deleteUser);  // Only Admin can delete