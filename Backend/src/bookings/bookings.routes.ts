import { Hono } from 'hono'
import { listBookings, getBooking, createBooking, deleteBooking } from './bookings.controller.js'

export const bookingsRouter = new Hono()

bookingsRouter.get('/', listBookings)
bookingsRouter.get('/:id', getBooking)
bookingsRouter.post('/', createBooking)
bookingsRouter.delete('/:id', deleteBooking)