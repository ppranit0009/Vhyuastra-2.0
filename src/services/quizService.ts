import api from './api';
import type { Quiz, QuizSubmission, QuizResult, ApiResponse } from '../types';

export const quizService = {
    async getAllQuizzes(params?: {
        type?: string;
        difficulty?: number;
        limit?: number;
    }): Promise<Quiz[]> {
        const response = await api.get<ApiResponse<{ quizzes: Quiz[] }>>('/quiz', { params });
        return response.data.data?.quizzes || [];
    },

    async getRandomQuizzes(count: number = 5, type?: string): Promise<Quiz[]> {
        const response = await api.get<ApiResponse<{ quizzes: Quiz[] }>>('/quiz/random', {
            params: { count, type },
        });
        return response.data.data?.quizzes || [];
    },

    async getQuiz(id: string): Promise<Quiz> {
        const response = await api.get<ApiResponse<{ quiz: Quiz }>>(`/quiz/${id}`);
        return response.data.data!.quiz;
    },

    async submitAnswer(id: string, answer: string): Promise<QuizResult> {
        const response = await api.post<QuizResult>(`/quiz/${id}/submit`, { answer });
        return response.data;
    },

    async getStats(): Promise<any> {
        const response = await api.get('/quiz/stats');
        return response.data.data;
    },
};
