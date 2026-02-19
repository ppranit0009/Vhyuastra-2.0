import api from './api';
import type { Resource, ResourcesResponse, ApiResponse } from '../types';

const USE_MOCK = true;
const MOCK_DELAY = 600;

const MOCK_RESOURCES: Resource[] = [
    {
        _id: 'r1',
        title: 'Identifying Voice Cloning Vishing Attacks',
        excerpt: 'Recent advances in AI voice synthesis have made vishing (voice phishing) nearly indistinguishable from reality. Learn the subtle signs.',
        content: 'Full article content here...',
        category: 'guide',
        tags: ['Vishing', 'AI Audio', 'Social Engineering'],
        author: 'Security Team',
        publishedDate: new Date().toISOString(),
        featured: true,
        threatLevel: 'high',
        readTime: 5,
        views: 1250,
        likes: 45
    },
    {
        _id: 'r2',
        title: 'Deepfake Executive Impersonation on the Rise',
        excerpt: 'Financial institutions report a 300% increase in video-based fraud attempts targeting high-net-worth individuals.',
        content: 'Full article content here...',
        category: 'alert',
        tags: ['Deepfake', 'Finance', 'Fraud'],
        author: 'Threat Intel',
        publishedDate: new Date(Date.now() - 86400000).toISOString(),
        featured: true,
        threatLevel: 'critical',
        readTime: 3,
        views: 3400,
        likes: 120
    }
];

export const resourceService = {
    async getAllResources(params?: {
        category?: string;
        featured?: boolean;
        limit?: number;
        page?: number;
    }): Promise<ResourcesResponse> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return {
                status: 'success',
                results: MOCK_RESOURCES.length,
                total: MOCK_RESOURCES.length,
                page: 1,
                pages: 1,
                data: {
                    resources: MOCK_RESOURCES
                }
            };
        }
        const response = await api.get<ResourcesResponse>('/resources', { params });
        return response.data;
    },

    async getResource(id: string): Promise<Resource> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const resource = MOCK_RESOURCES.find(r => r._id === id);
            if (!resource) throw new Error('Resource not found');
            return resource;
        }
        const response = await api.get<ApiResponse<{ resource: Resource }>>(`/resources/${id}`);
        return response.data.data!.resource;
    },

    async searchResources(query: string, category?: string): Promise<Resource[]> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            return MOCK_RESOURCES.filter(r =>
                r.title.toLowerCase().includes(query.toLowerCase()) ||
                r.excerpt.toLowerCase().includes(query.toLowerCase())
            );
        }
        const response = await api.get<ApiResponse<{ resources: Resource[] }>>('/resources/search', {
            params: { q: query, category },
        });
        return response.data.data?.resources || [];
    },

    async toggleLike(id: string, increment: boolean = true): Promise<number> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
            const resource = MOCK_RESOURCES.find(r => r._id === id);
            if (!resource) throw new Error('Resource not found');
            resource.likes += increment ? 1 : -1;
            return resource.likes;
        }
        const response = await api.post<ApiResponse<{ likes: number }>>(`/resources/${id}/like`, {
            increment,
        });
        return response.data.data!.likes;
    },
};
