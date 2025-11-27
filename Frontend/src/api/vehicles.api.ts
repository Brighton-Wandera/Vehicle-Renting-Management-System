import api from './axios';
import { Vehicle } from '../types';

/**
 * Get all vehicles with specifications
 */
export const getAllVehicles = async (): Promise<Vehicle[]> => {
    const response = await api.get<Vehicle[]>('/vehicles');
    return response.data;
};

/**
 * Get a single vehicle by ID
 */
export const getVehicleById = async (id: number): Promise<Vehicle> => {
    const response = await api.get<Vehicle>(`/vehicles/${id}`);
    return response.data;
};

/**
 * Create a new vehicle (Admin only)
 */
export const createVehicle = async (data: {
    vehicleSpec_id: number;
    rental_rate: number;
    availability?: boolean;
}): Promise<{ message: string }> => {
    const response = await api.post('/vehicles', data);
    return response.data;
};

/**
 * Delete a vehicle (Admin only)
 */
export const deleteVehicle = async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
};
