import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const dashboardApi = {
    // Get admin dashboard stats
    getAdminStats: async () => {
        const response = await api.get('/dashboard/admin');
        return response.data;
    },

    // Get user dashboard stats
    getUserStats: async () => {
        const response = await api.get('/dashboard/user');
        return response.data;
    },
};

export const adminApi = {
    // Vehicle management
    createVehicle: async (data: any) => {
        const response = await api.post('/vehicles', data);
        return response.data;
    },

    updateVehicle: async (id: number, data: any) => {
        const response = await api.put(`/vehicles/${id}`, data);
        return response.data;
    },

    updateVehicleSpecs: async (specId: number, data: any) => {
        const response = await api.put(`/vehicles/specs/${specId}`, data);
        return response.data;
    },

    deleteVehicle: async (id: number) => {
        const response = await api.delete(`/vehicles/${id}`);
        return response.data;
    },

    getVehicleStats: async () => {
        const response = await api.get('/vehicles/admin/stats');
        return response.data;
    },

    // User management
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    updateUser: async (id: number, data: any) => {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id: number) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },

    // Bookings management
    getAllBookings: async () => {
        const response = await api.get('/bookings');
        return response.data;
    },

    updateBookingStatus: async (id: number, status: string) => {
        const response = await api.put(`/bookings/${id}`, { booking_status: status });
        return response.data;
    },
};
