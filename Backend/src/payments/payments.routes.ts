import { Hono } from 'hono'
import { listPayments, getPayment, createPayment, deletePayment } from './payments.controller.js'

export const paymentsRouter = new Hono()

paymentsRouter.get('/', listPayments)
paymentsRouter.get('/:id', getPayment)
paymentsRouter.post('/', createPayment)
paymentsRouter.delete('/:id', deletePayment)