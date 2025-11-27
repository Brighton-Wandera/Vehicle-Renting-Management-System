import { Hono } from 'hono'
import { listVehicles, getVehicle, createVehicle, deleteVehicle } from './vehicles.controller.js'

export const vehicleRouter = new Hono()

vehicleRouter.get('/', listVehicles)
vehicleRouter.get('/:id', getVehicle)
vehicleRouter.post('/', createVehicle)
vehicleRouter.delete('/:id', deleteVehicle)