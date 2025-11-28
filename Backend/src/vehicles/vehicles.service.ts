import { getDbPool } from '../db/dbconfig.js'

export const getAllVehiclesService = async () => {
  const db = getDbPool()
  const query = `
    SELECT v.vehicle_id, v.rental_rate, v.availability, v.created_at,
           s.vehicleSpec_id, s.manufacturer, s.model, s.year, s.fuel_type, 
           s.engine_capacity, s.transmission, s.seating_capacity, s.color, s.features, s.image_url
    FROM Vehicles v
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    ORDER BY v.created_at DESC
  `
  const result = await db.request().query(query)
  return result.recordset
}

export const getVehicleByIdService = async (id: number) => {
  const db = getDbPool()
  const query = `
    SELECT v.vehicle_id, v.rental_rate, v.availability, v.created_at,
           s.vehicleSpec_id, s.manufacturer, s.model, s.year, s.fuel_type, 
           s.engine_capacity, s.transmission, s.seating_capacity, s.color, s.features, s.image_url
    FROM Vehicles v
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    WHERE v.vehicle_id = @id
  `
  const result = await db.request().input('id', id).query(query)
  return result.recordset[0] || null
}

export const createVehicleWithSpecsService = async (data: any) => {
  const db = getDbPool()
  const transaction = db.transaction()

  try {
    await transaction.begin()

    // Create specification
    const specQuery = `
      INSERT INTO VehicleSpecifications (manufacturer, model, year, fuel_type, engine_capacity, 
                                         transmission, seating_capacity, color, features, image_url)
      OUTPUT INSERTED.vehicleSpec_id
      VALUES (@manufacturer, @model, @year, @fuel_type, @engine_capacity, 
              @transmission, @seating_capacity, @color, @features, @image_url)
    `
    const specResult = await transaction.request()
      .input('manufacturer', data.manufacturer)
      .input('model', data.model)
      .input('year', data.year)
      .input('fuel_type', data.fuel_type)
      .input('engine_capacity', data.engine_capacity)
      .input('transmission', data.transmission)
      .input('seating_capacity', data.seating_capacity)
      .input('color', data.color)
      .input('features', data.features)
      .input('image_url', data.image_url || null)
      .query(specQuery)

    const vehicleSpec_id = specResult.recordset[0].vehicleSpec_id

    // Create vehicle
    const vehicleQuery = `
      INSERT INTO Vehicles (vehicleSpec_id, rental_rate, availability)
      OUTPUT INSERTED.vehicle_id
      VALUES (@vehicleSpec_id, @rental_rate, @availability)
    `
    const vehicleResult = await transaction.request()
      .input('vehicleSpec_id', vehicleSpec_id)
      .input('rental_rate', data.rental_rate)
      .input('availability', data.availability ?? true)
      .query(vehicleQuery)

    await transaction.commit()
    return { success: true, vehicle_id: vehicleResult.recordset[0].vehicle_id }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const updateVehicleService = async (id: number, data: any) => {
  const db = getDbPool()
  const query = `
    UPDATE Vehicles 
    SET rental_rate = @rental_rate, 
        availability = @availability,
        updated_at = GETDATE()
    WHERE vehicle_id = @id
  `
  const result = await db.request()
    .input('id', id)
    .input('rental_rate', data.rental_rate)
    .input('availability', data.availability)
    .query(query)
  return result.rowsAffected[0] === 1
}

export const updateVehicleSpecsService = async (specId: number, data: any) => {
  const db = getDbPool()
  const query = `
    UPDATE VehicleSpecifications
    SET manufacturer = @manufacturer,
        model = @model,
        year = @year,
        fuel_type = @fuel_type,
        engine_capacity = @engine_capacity,
        transmission = @transmission,
        seating_capacity = @seating_capacity,
        color = @color,
        features = @features,
        image_url = @image_url,
        updated_at = GETDATE()
    WHERE vehicleSpec_id = @specId
  `
  const result = await db.request()
    .input('specId', specId)
    .input('manufacturer', data.manufacturer)
    .input('model', data.model)
    .input('year', data.year)
    .input('fuel_type', data.fuel_type)
    .input('engine_capacity', data.engine_capacity)
    .input('transmission', data.transmission)
    .input('seating_capacity', data.seating_capacity)
    .input('color', data.color)
    .input('features', data.features)
    .input('image_url', data.image_url)
    .query(query)
  return result.rowsAffected[0] === 1
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

export const getVehicleStatsService = async () => {
  const db = getDbPool()
  const query = `
    SELECT 
      COUNT(*) as total_vehicles,
      SUM(CASE WHEN availability = 1 THEN 1 ELSE 0 END) as available_vehicles,
      SUM(CASE WHEN availability = 0 THEN 1 ELSE 0 END) as rented_vehicles,
      AVG(rental_rate) as avg_rental_rate
    FROM Vehicles
  `
  const result = await db.request().query(query)
  return result.recordset[0]
}