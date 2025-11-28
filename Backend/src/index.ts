import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import fs from 'fs';

// Import Database Connection
import { initDatabaseConnection } from './db/dbconfig.js';

// Import Routers
import { usersRouter } from './users/users.routes.js';
import { authRouter } from './auth/auth.routes.js';
import { vehicleRouter } from './vehicles/vehicles.routes.js';
import { paymentsRouter } from './payments/payments.routes.js';
import { bookingsRouter } from './bookings/bookings.routes.js';
import { ticketsRouter } from './tickets/tickets.routes.js';
import { dashboardRouter } from './dashboard/dashboard.routes.js';

dotenv.config();

// Check for .env file
if (!fs.existsSync('.env')) {
  console.warn('Warning: .env file not found at project root');
}

const app = new Hono();

// --- Middleware ---
app.use('*', logger()); // Log requests to console
app.use('*', cors());   // Handle CORS for frontend connection

// --- Base Route ---
app.get('/', (c) => {
  return c.json({
    message: "Welcome to Vehicle Rental Management System API",
    version: "1.0.0",
    status: "running"
  });
});

// --- Mount Routes ---
// The /api prefix organizes all backend endpoints
app.route('/api/auth', authRouter);
app.route('/api/users', usersRouter);
app.route('/api/vehicles', vehicleRouter);
app.route('/api/bookings', bookingsRouter);
app.route('/api/payments', paymentsRouter);
app.route('/api/tickets', ticketsRouter);
app.route('/api/dashboard', dashboardRouter);


// --- 404 Handler ---
app.notFound((c) => {
  return c.json({
    success: false,
    message: `Route Not Found: ${c.req.method} ${c.req.path}`,
  }, 404);
});

// --- Global Error Handler ---
app.onError((err, c) => {
  console.error('Global Error:', err);
  return c.json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  }, 500);
});


// --- Server Startup ---
const port = Number(process.env.PORT) || 3000;

// Initialize DB first, then start server
initDatabaseConnection()
  .then(() => {
    console.log('Database connection established.');

    serve({
      fetch: app.fetch,
      port: port
    }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database connection. Server not started.');
    console.error(error);
    process.exit(1);
  });