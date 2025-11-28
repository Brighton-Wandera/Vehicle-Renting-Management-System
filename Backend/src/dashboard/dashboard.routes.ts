import { Hono } from 'hono'
import { getAdminStats, getUserStats } from './dashboard.controller.js'
import { bothRolesAuth } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'

export const dashboardRouter = new Hono()

// Admin dashboard (requires both auth and admin role)
dashboardRouter.get('/admin', bothRolesAuth, isAdmin, getAdminStats)

// User dashboard (requires auth)
dashboardRouter.get('/user', bothRolesAuth, getUserStats)
