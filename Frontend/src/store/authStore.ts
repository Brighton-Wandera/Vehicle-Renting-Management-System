import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authApi } from '../api/auth.api';
import toast from 'react-hot-toast';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: any) => Promise<boolean>;
    logout: () => void;
    setUser: (user: User) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true });
                try {
                    const response = await authApi.login({ email, password });

                    // Backend returns { message, token, user } not { accessToken, refreshToken }
                    if (response.message && (response as any).token && (response as any).user) {
                        const token = (response as any).token;
                        const backendUser = (response as any).user;

                        // Transform snake_case to camelCase for frontend
                        const user = {
                            userId: backendUser.user_id,
                            firstName: backendUser.first_name,
                            lastName: backendUser.last_name,
                            email: backendUser.email,
                            contactPhone: backendUser.contact_phone || '',
                            address: backendUser.address || '',
                            role: backendUser.role,
                            status: 'active' as const,
                            verified: true,
                            twoFactorEnabled: false,
                            totalLoyaltyPoints: 0,
                            createdAt: new Date().toISOString(),
                        };

                        // Save to localStorage
                        localStorage.setItem('accessToken', token);
                        localStorage.setItem('refreshToken', token); // Use same token for both
                        localStorage.setItem('user', JSON.stringify(user));

                        // Update state
                        set({
                            user,
                            accessToken: token,
                            refreshToken: token,
                            isAuthenticated: true,
                            isLoading: false,
                        });

                        toast.success('Welcome back!');

                        // Redirect to home page as requested
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 500);

                        return true;
                    }

                    set({ isLoading: false });
                    return false;
                } catch (error: any) {
                    set({ isLoading: false });
                    toast.error(error.response?.data?.error || 'Login failed');
                    return false;
                }
            },

            register: async (data: any) => {
                set({ isLoading: true });
                try {
                    // Transform camelCase to snake_case for backend
                    const backendData = {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        email: data.email,
                        password: data.password,
                        contact_phone: data.contactPhone,
                        address: data.address || undefined,
                    };

                    const response = await authApi.register(backendData);

                    if (response.success) {
                        toast.success(response.message);
                        set({ isLoading: false });
                        return true;
                    }

                    set({ isLoading: false });
                    return false;
                } catch (error: any) {
                    set({ isLoading: false });
                    toast.error(error.response?.data?.message || 'Registration failed');
                    return false;
                }
            },

            logout: () => {
                // Clear localStorage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');

                // Reset state
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });

                toast.success('Logged out successfully');
            },

            setUser: (user: User) => {
                set({ user });
                localStorage.setItem('user', JSON.stringify(user));
            },

            setTokens: (accessToken: string, refreshToken: string) => {
                set({ accessToken, refreshToken, isAuthenticated: true });
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            },

            initializeAuth: () => {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                const userStr = localStorage.getItem('user');

                if (accessToken && refreshToken && userStr) {
                    try {
                        const user = JSON.parse(userStr);
                        set({
                            user,
                            accessToken,
                            refreshToken,
                            isAuthenticated: true,
                        });
                    } catch (error) {
                        // Invalid user data, clear it
                        get().logout();
                    }
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
