import { type Context } from 'hono'
import * as vehicleService from './vehicles.service.js'

export const listVehicles = async (c: Context) => {
  try {
    const result = await vehicleService.getAllVehiclesService()
    if (result.length === 0) return c.json({ message: 'No vehicles found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const getVehicle = async (c: Context) => {
  const id = parseInt(c.req.param('id'))
  try {
    const result = await vehicleService.getVehicleByIdService(id)
    if (result === null) return c.json({ message: 'Vehicle not found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const createVehicle = async (c: Context) => {
  try {
    const body = await c.req.json() as { vehicleSpec_id: number, rental_rate: number, availability: boolean }
    const result = await vehicleService.createVehicleService(body)
    if (result === 'Vehicle not created') return c.json({ error: 'Failed to create vehicle' }, 400)
    return c.json({ message: result }, 201)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const deleteVehicle = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    try {
        const check = await vehicleService.getVehicleByIdService(id)
        if (check === null) return c.json({ error: 'Vehicle not found' }, 404)
        
        const result = await vehicleService.deleteVehicleService(id)
        if(!result) return c.json({ error: 'Failed to delete vehicle' }, 400)
        return c.json({ message: result }, 200)
    } catch (error: any) {
        return c.json({ error: 'Server not found' }, 500)
    }
}