import api from './api';
import type { Quiz, QuizResult, ApiResponse } from '../types';

const USE_MOCK = true;
const MOCK_DELAY = 600;

const MOCK_QUIZZES: Quiz[] = [
    {
        _id: 'q1',
        question: 'You receive an email from your CEO asking for an urgent wire transfer to a new vendor. The email address looks correct, but the tone is unusually aggressive. What do you do?',
        type: 'phishing',
        category: 'email',
        options: [
            { text: 'Process the transfer immediately to avoid making the CEO angry.' },
            { text: 'Reply to the email asking for confirmation.' },
            { text: 'Call the CEO on a known internal number to verify the request.', isCorrect: true },
            { text: 'Forward the email to HR.' }
        ],
        explanation: 'This is a classic Business Email Compromise (BEC) tactic. Attackers often use urgency and authority to pressure victims. Always verify unusual requests through a secondary, trusted channel.',
        detectionTips: ['Check for urgency', 'Verify requests out of band', 'Look for slight email spoofing'],
        difficulty: 1,
        points: 10,
        tags: ['BEC', 'Phishing', 'CEO Fraud'],
        mediaType: 'none',
    },
    {
        _id: 'q2',
        question: 'Which of the following serves as the strongest indicator that a video might be a deepfake?',
        type: 'deepfake',
        category: 'video',
        options: [
            { text: 'The video is low resolution.' },
            { text: 'Unnatural blinking patterns or lack of blinking.', isCorrect: true },
            { text: 'The person is speaking a foreign language.' },
            { text: 'The background is blurry.' }
        ],
        explanation: 'Early deepfakes often struggled with natural blinking. While technology is improving, unnatural eye movements, lip-sync issues, and artifacts around the face edges remain key indicators.',
        detectionTips: ['Watch the eyes', 'Check lip sync', 'Look for artifacts'],
        difficulty: 2,
        points: 15,
        tags: ['Deepfake', 'Video Analysis'],
        mediaType: 'video',
    }
];

export const quizService = {
    async getAllQuizzes(params?: {
        type?: string;
        difficulty?: number;
        limit?: number;
    }): Promise<Quiz[]> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return MOCK_QUIZZES;
        }
        const response = await api.get<ApiResponse<{ quizzes: Quiz[] }>>('/quiz', { params });
        return response.data.data?.quizzes || [];
    },

    async getRandomQuizzes(count: number = 5, type?: string): Promise<Quiz[]> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return MOCK_QUIZZES.slice(0, count);
        }
        const response = await api.get<ApiResponse<{ quizzes: Quiz[] }>>('/quiz/random', {
            params: { count, type },
        });
        return response.data.data?.quizzes || [];
    },

    async getQuiz(id: string): Promise<Quiz> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const quiz = MOCK_QUIZZES.find(q => q._id === id);
            if (!quiz) throw new Error('Quiz not found');
            return quiz;
        }
        const response = await api.get<ApiResponse<{ quiz: Quiz }>>(`/quiz/${id}`);
        return response.data.data!.quiz;
    },

    async submitAnswer(id: string, answer: string): Promise<QuizResult> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const quiz = MOCK_QUIZZES.find(q => q._id === id);
            if (!quiz) throw new Error('Quiz not found');

            const selectedOption = quiz.options.find(o => o.text === answer);
            const isCorrect = selectedOption?.isCorrect || false;

            return {
                status: 'success',
                data: {
                    isCorrect,
                    correctAnswer: quiz.options.find(o => o.isCorrect)?.text || '',
                    explanation: quiz.explanation,
                    detectionTips: quiz.detectionTips,
                    points: isCorrect ? quiz.points : 0
                }
            };
        }
        const response = await api.post<QuizResult>(`/quiz/${id}/submit`, { answer });
        return response.data;
    },

    async getStats(): Promise<any> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return {
                totalQuizzesTaken: 12,
                totalScore: 450,
                averageScore: 85,
                rank: 'Cyber Guardian'
            };
        }
        const response = await api.get('/quiz/stats');
        return response.data.data;
    },
};
