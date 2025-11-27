import { getDbPool } from '../db/dbconfig.js'

export const getAllVehiclesService = async () => {
  const db = getDbPool()
  // Fetch Vehicle + Specification details
  const query = `
    SELECT v.vehicle_id, v.rental_rate, v.availability, v.created_at,
           s.manufacturer, s.model, s.year, s.fuel_type, 
           s.engine_capacity, s.transmission, s.seating_capacity, s.color, s.features
    FROM Vehicles v
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
  `
  const result = await db.request().query(query)
  return result.recordset
}

export const getVehicleByIdService = async (id: number) => {
  const db = getDbPool()
  const query = `
    SELECT v.vehicle_id, v.rental_rate, v.availability,
           s.manufacturer, s.model, s.year, s.fuel_type, 
           s.engine_capacity, s.transmission, s.seating_capacity, s.color, s.features
    FROM Vehicles v
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    WHERE v.vehicle_id = @id
  `
  const result = await db.request().input('id', id).query(query)
  return result.recordset[0] || null
}

export const createVehicleService = async (vehicle: any) => {
  const db = getDbPool()
  const query = `
    INSERT INTO Vehicles (vehicleSpec_id, rental_rate, availability)
    VALUES (@vehicleSpec_id, @rental_rate, @availability)
  `
  const result = await db.request()
    .input('vehicleSpec_id', vehicle.vehicleSpec_id)
    .input('rental_rate', vehicle.rental_rate)
    .input('availability', vehicle.availability ?? true)
    .query(query)
  return result.rowsAffected[0] === 1 ? 'Vehicle created successfully' : 'Vehicle not created'
}

export const deleteVehicleService = async (id: number) => {
    const db = getDbPool()
    const result = await db.request().input('id', id).query('DELETE FROM Vehicles WHERE vehicle_id = @id')
    return result.rowsAffected[0] === 1 ? 'Vehicle deleted successfully' : 'Vehicle not deleted'
}