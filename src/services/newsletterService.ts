import api from './api';
import type { NewsletterSubscription, NewsletterResponse } from '../types';

export const newsletterService = {
    async subscribe(data: NewsletterSubscription): Promise<NewsletterResponse> {
        const response = await api.post<NewsletterResponse>('/newsletter/subscribe', data);
        return response.data;
    },

    async unsubscribe(token: string): Promise<NewsletterResponse> {
        const response = await api.post<NewsletterResponse>(`/newsletter/unsubscribe/${token}`);
        return response.data;
    },

    async updatePreferences(email: string, preferences: any): Promise<NewsletterResponse> {
        const response = await api.put<NewsletterResponse>('/newsletter/preferences', {
            email,
            preferences,
        });
        return response.data;
    },
};
