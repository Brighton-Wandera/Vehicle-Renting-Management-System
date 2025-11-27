import { getDbPool } from '../db/dbconfig.js'

export const getAllTicketsService = async () => {
  const db = getDbPool()
  // Join Tickets with Users
  const query = `
    SELECT t.*, u.first_name, u.last_name, u.email
    FROM CustomerSupportTickets t
    JOIN Users u ON t.user_id = u.user_id
  `
  const result = await db.request().query(query)
  return result.recordset
}

export const getTicketByIdService = async (id: number) => {
  const db = getDbPool()
  const query = `
    SELECT t.*, u.first_name, u.last_name, u.email
    FROM CustomerSupportTickets t
    JOIN Users u ON t.user_id = u.user_id
    WHERE t.ticket_id = @id
  `
  const result = await db.request().input('id', id).query(query)
  return result.recordset[0] || null
}

export const createTicketService = async (ticket: any) => {
  const db = getDbPool()
  const query = `
    INSERT INTO CustomerSupportTickets (user_id, subject, description, status)
    VALUES (@user_id, @subject, @description, @status)
  `
  const result = await db.request()
    .input('user_id', ticket.user_id)
    .input('subject', ticket.subject)
    .input('description', ticket.description)
    .input('status', 'Open')
    .query(query)
  return result.rowsAffected[0] === 1 ? 'Ticket created successfully' : 'Ticket not created'
}

export const deleteTicketService = async (id: number) => {
    const db = getDbPool()
    const result = await db.request().input('id', id).query('DELETE FROM CustomerSupportTickets WHERE ticket_id = @id')
    return result.rowsAffected[0] === 1 ? 'Ticket deleted successfully' : 'Ticket not deleted'
}