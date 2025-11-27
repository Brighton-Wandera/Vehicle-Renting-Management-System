import { Hono } from 'hono'
import { listTickets, getTicket, createTicket, deleteTicket } from './tickets.controller.js'

export const ticketsRouter = new Hono()

ticketsRouter.get('/', listTickets)
ticketsRouter.get('/:id', getTicket)
ticketsRouter.post('/', createTicket)
ticketsRouter.delete('/:id', deleteTicket)