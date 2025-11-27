import { type Context } from 'hono'
import * as bookingService from './bookings.service.js'

export const listBookings = async (c: Context) => {
  try {
    const result = await bookingService.getAllBookingsService()
    if (result.length === 0) return c.json({ message: 'No bookings found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const getBooking = async (c: Context) => {
  const id = parseInt(c.req.param('id'))
  try {
    const result = await bookingService.getBookingByIdService(id)
    if (result === null) return c.json({ message: 'Booking not found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const createBooking = async (c: Context) => {
  try {
    const body = await c.req.json() as { user_id: number, vehicle_id: number, booking_date: string, return_date: string, total_amount: number }
    const result = await bookingService.createBookingService(body)
    if (result === 'Booking not created') return c.json({ error: 'Failed to create booking' }, 400)
    return c.json({ message: result }, 201)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const deleteBooking = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    try {
        const check = await bookingService.getBookingByIdService(id)
        if (check === null) return c.json({ error: 'Booking not found' }, 404)

        const result = await bookingService.deleteBookingService(id)
        if (result === 'Booking not deleted') return c.json({ error: 'Failed to delete booking' }, 400)
        return c.json({ message: result }, 200)
    } catch (error: any) {
        return c.json({ error: 'Server not found' }, 500)
    }
}