import { type Context } from 'hono'
import * as dashboardService from './dashboard.service.js'

// Admin dashboard statistics
export const getAdminStats = async (c: Context) => {
    try {
        const stats = await dashboardService.getAdminStatsService()
        return c.json(stats)
    } catch (error: any) {
        console.error('Admin stats error:', error)
        return c.json({ error: 'Server error' }, 500)
    }
}

// User dashboard statistics
export const getUserStats = async (c: Context) => {
    try {
        const userPayload = c.get('user')
        if (!userPayload) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        const stats = await dashboardService.getUserStatsService(userPayload.userId)
        return c.json(stats)
    } catch (error: any) {
        console.error('User stats error:', error)
        return c.json({ error: 'Server error' }, 500)
    }
}
