import api from './axios';
import { ApiResponse, LoginData, LoginResponse, RegisterData, User } from '../types';

export const authApi = {
    /**
     * Register a new user
     */
    register: async (data: RegisterData): Promise<ApiResponse<User>> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    /**
     * Verify email with OTP
     */
    verifyEmail: async (email: string, otpCode: string): Promise<ApiResponse<string>> => {
        const response = await api.post('/auth/verify-email', { email, otpCode });
        return response.data;
    },

    /**
     * Resend OTP code
     */
    resendOtp: async (email: string): Promise<ApiResponse<string>> => {
        const response = await api.post('/auth/resend-otp', { email });
        return response.data;
    },

    /**
     * Login user
     */
    login: async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async (): Promise<void> => {
        // Clear local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    /**
     * Forgot password - request reset
     */
    forgotPassword: async (email: string): Promise<ApiResponse<string>> => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    /**
     * Reset password with OTP
     */
    resetPassword: async (
        email: string,
        otpCode: string,
        newPassword: string,
        confirmPassword: string
    ): Promise<ApiResponse<string>> => {
        const response = await api.post('/auth/reset-password', {
            email,
            otpCode,
            newPassword,
            confirmPassword,
        });
        return response.data;
    },

    /**
     * Get current user
     */
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const response = await api.get('/users/me');
        return response.data;
    },

    /**
     * Update profile
     */
    updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
        const response = await api.put('/users/profile', data);
        return response.data;
    },
};
