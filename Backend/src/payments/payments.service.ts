import { getDbPool } from '../db/dbconfig.js'

export const getAllPaymentsService = async () => {
  const db = getDbPool()
  // Join Payments -> Bookings -> Users
  const query = `
    SELECT p.*, 
           u.first_name, u.last_name, u.email,
           b.total_amount as booking_total
    FROM Payments p
    JOIN Bookings b ON p.booking_id = b.booking_id
    JOIN Users u ON b.user_id = u.user_id
  `
  const result = await db.request().query(query)
  return result.recordset
}

export const getPaymentByIdService = async (id: number) => {
  const db = getDbPool()
  const query = `
    SELECT p.*, u.first_name, u.last_name
    FROM Payments p
    JOIN Bookings b ON p.booking_id = b.booking_id
    JOIN Users u ON b.user_id = u.user_id
    WHERE p.payment_id = @id
  `
  const result = await db.request().input('id', id).query(query)
  return result.recordset[0] || null
}

export const createPaymentService = async (payment: any) => {
  const db = getDbPool()
  const query = `
    INSERT INTO Payments (booking_id, amount, payment_status, payment_date, payment_method, transaction_id)
    VALUES (@booking_id, @amount, @payment_status, GETDATE(), @payment_method, @transaction_id)
  `
  const result = await db.request()
    .input('booking_id', payment.booking_id)
    .input('amount', payment.amount)
    .input('payment_status', payment.payment_status || 'Completed')
    .input('payment_method', payment.payment_method)
    .input('transaction_id', payment.transaction_id)
    .query(query)

  return result.rowsAffected[0] === 1 ? 'Payment recorded successfully' : 'Payment not recorded'
}

export const deletePaymentService = async (id: number) => {
  const db = getDbPool()
  const result = await db.request().input('id', id).query('DELETE FROM Payments WHERE payment_id = @id')
  return result.rowsAffected[0] === 1 ? 'Payment deleted successfully' : 'Payment not deleted'
}