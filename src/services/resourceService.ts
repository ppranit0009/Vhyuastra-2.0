import api from './api';
import type { Resource, ResourcesResponse, ApiResponse } from '../types';

export const resourceService = {
    async getAllResources(params?: {
        category?: string;
        featured?: boolean;
        limit?: number;
        page?: number;
    }): Promise<ResourcesResponse> {
        const response = await api.get<ResourcesResponse>('/resources', { params });
        return response.data;
    },

    async getResource(id: string): Promise<Resource> {
        const response = await api.get<ApiResponse<{ resource: Resource }>>(`/resources/${id}`);
        return response.data.data!.resource;
    },

    async searchResources(query: string, category?: string): Promise<Resource[]> {
        const response = await api.get<ApiResponse<{ resources: Resource[] }>>('/resources/search', {
            params: { q: query, category },
        });
        return response.data.data?.resources || [];
    },

    async toggleLike(id: string, increment: boolean = true): Promise<number> {
        const response = await api.post<ApiResponse<{ likes: number }>>(`/resources/${id}/like`, {
            increment,
        });
        return response.data.data!.likes;
    },
};
