// User types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    quizProgress: QuizProgress;
    achievements: Achievement[];
    bookmarkedResources: string[];
    lastLogin: string;
    createdAt: string;
}

export interface QuizProgress {
    completed: string[];
    scores: Record<string, number>;
    totalScore: number;
    highestStreak: number;
}

export interface Achievement {
    name: string;
    description: string;
    earnedAt: string;
    icon: string;
}

// Auth types
export interface AuthResponse {
    status: string;
    data: {
        user: User;
        token: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

// Quiz types
export interface Quiz {
    _id: string;
    question: string;
    type: 'deepfake' | 'voice-cloning' | 'phishing' | 'general';
    category: 'video' | 'audio' | 'email' | 'text' | 'image';
    mediaUrl?: string;
    mediaType: 'video' | 'audio' | 'image' | 'none';
    options: QuizOption[];
    explanation: string;
    detectionTips: string[];
    difficulty: number;
    points: number;
    tags: string[];
}

export interface QuizOption {
    text: string;
    isCorrect?: boolean;
}

export interface QuizSubmission {
    answer: string;
}

export interface QuizResult {
    status: string;
    data: {
        isCorrect: boolean;
        correctAnswer: string;
        explanation: string;
        detectionTips: string[];
        points: number;
    };
}

// Resource types
export interface Resource {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    category: 'alert' | 'guide' | 'analysis' | 'training';
    tags: string[];
    author: string;
    publishedDate: string;
    featured: boolean;
    threatLevel: 'low' | 'medium' | 'high' | 'critical';
    readTime: number;
    views: number;
    likes: number;
    imageUrl?: string;
    externalLink?: string;
}

export interface ResourcesResponse {
    status: string;
    results: number;
    total: number;
    page: number;
    pages: number;
    data: {
        resources: Resource[];
    };
}

// Newsletter types
export interface NewsletterSubscription {
    email: string;
    preferences?: {
        frequency?: 'daily' | 'weekly' | 'monthly';
        topics?: string[];
        emailFormat?: 'html' | 'text';
    };
    source?: string;
}

export interface NewsletterResponse {
    status: string;
    message: string;
    data?: {
        subscriber: any;
    };
}

// API Response types
export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
    error?: string;
}
