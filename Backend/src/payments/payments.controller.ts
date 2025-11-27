import { type Context } from 'hono'
import * as paymentService from './payments.service.js'

export const listPayments = async (c: Context) => {
  try {
    const result = await paymentService.getAllPaymentsService()
    if (result.length === 0) return c.json({ message: 'No payments found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const getPayment = async (c: Context) => {
  const id = parseInt(c.req.param('id'))
  try {
    const result = await paymentService.getPaymentByIdService(id)
    if (result === null) return c.json({ message: 'Payment not found' }, 404)
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const createPayment = async (c: Context) => {
  try {
    const body = await c.req.json() as { booking_id: number, amount: number, payment_status: string, payment_method: string, transaction_id: string }
    const result = await paymentService.createPaymentService(body)
    if (result === 'Payment not recorded') return c.json({ error: 'Failed to create payment' }, 400)
    return c.json({ message: result }, 201)
  } catch (error: any) {
    return c.json({ error: 'Server not found' }, 500)
  }
}

export const deletePayment = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    try {
        const check = await paymentService.getPaymentByIdService(id)
        if (check === null) return c.json({ error: 'Payment not found' }, 404)

        const result = await paymentService.deletePaymentService(id)
        if (result === 'Payment not deleted') return c.json({ error: 'Failed to delete payment' }, 400)
        return c.json({ message: result }, 200)
    } catch (error: any) {
        return c.json({ error: 'Server not found' }, 500)
    }
}