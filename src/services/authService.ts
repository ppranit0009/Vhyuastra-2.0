import api from './api';
import type {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
} from '../types';

export const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get<{ status: string; data: { user: User } }>('/auth/me');
        return response.data.data.user;
    },

    async updateProfile(data: Partial<User>): Promise<User> {
        const response = await api.put<{ status: string; data: { user: User } }>('/auth/profile', data);
        return response.data.data.user;
    },

    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        await api.put('/auth/change-password', { currentPassword, newPassword });
    },

    async forgotPassword(email: string): Promise<void> {
        await api.post('/auth/forgot-password', { email });
    },

    async resetPassword(token: string, password: string): Promise<void> {
        await api.put(`/auth/reset-password/${token}`, { password });
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },

    getStoredUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },
};
