import api from './axios';
import { Booking, CreateBookingData } from '../types';

/**
 * Get all bookings
 */
export const getAllBookings = async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>('/bookings');
    return response.data;
};

/**
 * Get a single booking by ID
 */
export const getBookingById = async (id: number): Promise<Booking> => {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
};

/**
 * Create a new booking
 */
export const createBooking = async (data: CreateBookingData): Promise<{ message: string }> => {
    const response = await api.post('/bookings', data);
    return response.data;
};

/**
 * Cancel/Delete a booking
 */
export const deleteBooking = async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
};
