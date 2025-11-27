import { getDbPool } from '../db/dbconfig.js'
import { sendNotificationEmail } from '../mailer/mailer.service.js'

export const getAllBookingsService = async () => {
  const db = getDbPool()
  // Join Bookings with Users and Vehicle Specs
  const query = `
    SELECT b.*, 
           u.first_name, u.last_name, u.email, u.contact_phone,
           s.manufacturer, s.model, s.image_url
    FROM Bookings b
    JOIN Users u ON b.user_id = u.user_id
    JOIN Vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
  `
  const result = await db.request().query(query)
  return result.recordset
}

export const getBookingByIdService = async (id: number) => {
  const db = getDbPool()
  const query = `
    SELECT b.*, 
           u.first_name, u.last_name, u.email,
           s.manufacturer, s.model
    FROM Bookings b
    JOIN Users u ON b.user_id = u.user_id
    JOIN Vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    WHERE b.booking_id = @id
  `
  const result = await db.request().input('id', id).query(query)
  return result.recordset[0] || null
}

export const createBookingService = async (booking: any) => {
  const db = getDbPool()
  const query = `
    INSERT INTO Bookings (user_id, vehicle_id, booking_date, return_date, total_amount, booking_status)
    VALUES (@user_id, @vehicle_id, @booking_date, @return_date, @total_amount, @booking_status)
  `
  const result = await db.request()
    .input('user_id', booking.user_id)
    .input('vehicle_id', booking.vehicle_id)
    .input('booking_date', booking.booking_date)
    .input('return_date', booking.return_date)
    .input('total_amount', booking.total_amount)
    .input('booking_status', 'Pending')
    .query(query)

  // Send Email Logic (Simplified for brevity, assuming insert worked)
  if (result.rowsAffected[0] === 1) {
      // Fetch user email to send notification
      const user = (await db.request().input('id', booking.user_id).query('SELECT email, first_name FROM Users WHERE user_id = @id')).recordset[0]
      if(user) await sendNotificationEmail(user.email, user.first_name, "Booking Confirmation", "Your booking is Pending.");
      return 'Booking created successfully'
  }
  return 'Booking not created'
}

export const deleteBookingService = async (id: number) => {
    const db = getDbPool()
    const result = await db.request().input('id', id).query('DELETE FROM Bookings WHERE booking_id = @id')
    return result.rowsAffected[0] === 1 ? 'Booking deleted successfully' : 'Booking not deleted'
}