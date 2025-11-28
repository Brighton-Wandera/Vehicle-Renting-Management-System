import { getDbPool } from '../db/dbconfig.js'

// Get admin dashboard statistics
export const getAdminStatsService = async () => {
    const db = getDbPool()

    // Total statistics
    const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM Users WHERE role = 'user') as total_users,
      (SELECT COUNT(*) FROM Vehicles) as total_vehicles,
      (SELECT COUNT(*) FROM Bookings) as total_bookings,
      (SELECT COUNT(*) FROM Bookings WHERE booking_status = 'Pending') as pending_bookings,
      (SELECT COALESCE(SUM(total_amount), 0) FROM Bookings WHERE booking_status = 'Completed') as total_revenue,
      (SELECT COUNT(*) FROM Vehicles WHERE availability = 1) as available_vehicles
  `

    const stats = await db.request().query(statsQuery)

    // Recent bookings
    const recentBookingsQuery = `
    SELECT TOP 5 b.booking_id, b.booking_date, b.return_date, b.total_amount, b.booking_status,
           u.first_name + ' ' + u.last_name as customer_name,
           s.manufacturer + ' ' + s.model as vehicle_name
    FROM Bookings b
    JOIN Users u ON b.user_id = u.user_id
    JOIN Vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    ORDER BY b.created_at DESC
  `

    const recentBookings = await db.request().query(recentBookingsQuery)

    //  Revenue by month (last 6 months)
    const revenueQuery = `
    SELECT 
      FORMAT(booking_date, 'MMM yyyy') as month,
      SUM(total_amount) as revenue
    FROM Bookings
    WHERE booking_status = 'Completed' 
      AND booking_date >= DATEADD(month, -6, GETDATE())
    GROUP BY FORMAT(booking_date, 'MMM yyyy'), YEAR(booking_date), MONTH(booking_date)
    ORDER BY YEAR(booking_date), MONTH(booking_date)
  `

    const revenueByMonth = await db.request().query(revenueQuery)

    return {
        ...stats.recordset[0],
        recent_bookings: recentBookings.recordset,
        revenue_by_month: revenueByMonth.recordset
    }
}

// Get user dashboard statistics
export const getUserStatsService = async (userId: number) => {
    const db = getDbPool()

    const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM Bookings WHERE user_id = @userId) as total_bookings,
      (SELECT COUNT(*) FROM Bookings WHERE user_id = @userId AND booking_status = 'Pending') as pending_bookings,
      (SELECT COUNT(*) FROM Bookings WHERE user_id = @userId AND booking_status = 'Confirmed') as active_bookings,
      (SELECT COUNT(*) FROM Bookings WHERE user_id = @userId AND booking_status = 'Completed') as completed_bookings,
      (SELECT COALESCE(SUM(total_amount), 0) FROM Bookings WHERE user_id = @userId AND booking_status = 'Completed') as total_spent
  `

    const stats = await db.request().input('userId', userId).query(statsQuery)

    // Get user's active bookings
    const activeBookingsQuery = `
    SELECT b.booking_id, b.booking_date, b.return_date, b.total_amount, b.booking_status,
           s.manufacturer, s.model, s.image_url, v.vehicle_id
    FROM Bookings b
    JOIN Vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    WHERE b.user_id = @userId AND b.booking_status IN ('Pending', 'Confirmed')
    ORDER BY b.booking_date ASC
  `

    const activeBookings = await db.request().input('userId', userId).query(activeBookingsQuery)

    // Get user's booking history
    const historyQuery = `
    SELECT TOP 10 b.booking_id, b.booking_date, b.return_date, b.total_amount, b.booking_status,
           s.manufacturer, s.model, s.image_url, v.vehicle_id
    FROM Bookings b
    JOIN Vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN VehicleSpecifications s ON v.vehicleSpec_id = s.vehicleSpec_id
    WHERE b.user_id = @userId AND b.booking_status IN ('Completed', 'Cancelled')
    ORDER BY b.created_at DESC
  `

    const history = await db.request().input('userId', userId).query(historyQuery)

    return {
        ...stats.recordset[0],
        active_bookings: activeBookings.recordset,
        booking_history: history.recordset
    }
}
