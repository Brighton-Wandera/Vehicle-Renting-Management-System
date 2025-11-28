import { Hono } from 'hono'
import { listVehicles, getVehicle, createVehicle, deleteVehicle, createVehicleWithSpecs, updateVehicle, updateVehicleSpecs, getVehicleStats } from './vehicles.controller.js'
import { bothRolesAuth } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'

export const vehicleRouter = new Hono()

// Public routes
vehicleRouter.get('/', listVehicles)
vehicleRouter.get('/:id', getVehicle)

// Admin routes (protected)
vehicleRouter.post('/', bothRolesAuth, isAdmin, createVehicleWithSpecs)
vehicleRouter.put('/:id', bothRolesAuth, isAdmin, updateVehicle)
vehicleRouter.put('/specs/:specId', bothRolesAuth, isAdmin, updateVehicleSpecs)
vehicleRouter.delete('/:id', bothRolesAuth, isAdmin, deleteVehicle)
vehicleRouter.get('/admin/stats', bothRolesAuth, isAdmin, getVehicleStats)