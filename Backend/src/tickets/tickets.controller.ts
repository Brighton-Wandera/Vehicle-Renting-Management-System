import { type Context } from 'hono'
import * as ticketService from './tickets.service.js'

export const listTickets = async (c: Context) => {
  try {
    const result = await ticketService.getAllTicketsService()
    if (result.length === 0) return c.json({ message: 'No tickets found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const getTicket = async (c: Context) => {
  const id = parseInt(c.req.param('id'))
  try {
    const result = await ticketService.getTicketByIdService(id)
    if (result === null) return c.json({ message: 'Ticket not found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const createTicket = async (c: Context) => {
  try {
    const body = await c.req.json() as { user_id: number, subject: string, description: string }
    const result = await ticketService.createTicketService(body)
    if (result === 'Ticket not created') return c.json({ error: 'Failed to create ticket' }, 400)
    return c.json({ message: result }, 201)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const deleteTicket = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    try {
        const check = await ticketService.getTicketByIdService(id)
        if (check === null) return c.json({ error: 'Ticket not found' }, 404)

        const result = await ticketService.deleteTicketService(id)
        if (result === 'Ticket not deleted') return c.json({ error: 'Failed to delete ticket' }, 400)
        return c.json({ message: result }, 200)
    } catch (error: any) {
        return c.json({ error: 'Server not found' }, 500)
    }
}