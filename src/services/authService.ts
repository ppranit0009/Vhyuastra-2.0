import api from './api';
import type {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
} from '../types';

const USE_MOCK = true;
const MOCK_DELAY = 800;

const MOCK_USER: User = {
    id: 'mock-user-id',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'user',
    quizProgress: {
        completed: [],
        scores: {},
        totalScore: 0,
        highestStreak: 0
    },
    achievements: [],
    bookmarkedResources: [],
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString()
};

export const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const user = { ...MOCK_USER, name: data.name, email: data.email };
            const response = {
                status: 'success',
                data: {
                    user,
                    token: 'mock-jwt-token'
                }
            };
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        }

        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const response = {
                status: 'success',
                data: {
                    user: MOCK_USER,
                    token: 'mock-jwt-token'
                }
            };
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        }

        const response = await api.post<AuthResponse>('/auth/login', credentials);
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    async getMe(): Promise<User> {
        if (USE_MOCK) {
            const userStr = localStorage.getItem('user');
            if (userStr) return JSON.parse(userStr);
            return MOCK_USER;
        }
        const response = await api.get<{ status: string; data: { user: User } }>('/auth/me');
        return response.data.data.user;
    },

    async updateProfile(data: Partial<User>): Promise<User> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const currentUser = this.getStoredUser() || MOCK_USER;
            const updatedUser = { ...currentUser, ...data };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        }
        const response = await api.put<{ status: string; data: { user: User } }>('/auth/profile', data);
        return response.data.data.user;
    },

    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return;
        }
        await api.put('/auth/change-password', { currentPassword, newPassword });
    },

    async forgotPassword(email: string): Promise<void> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return;
        }
        await api.post('/auth/forgot-password', { email });
    },

    async resetPassword(token: string, password: string): Promise<void> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return;
        }
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
