import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import api from '../services/api';
import type { User } from '../types';

interface DashboardPageProps {
    user: User | null;
}

function DashboardPage({ user }: DashboardPageProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const { data: dashboardData } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await api.get('/user/dashboard');
            return response.data.data;
        },
        enabled: !!user,
    });

    if (!user) return null;

    return (
        <div className="dashboard-page">
            <Navbar user={user} setUser={() => { }} />

            <div className="container" style={{ paddingTop: '120px' }}>
                <h1 className="gradient-text" style={{ marginBottom: '2rem' }}>Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="threat-card">
                        <h3>Quiz Progress</h3>
                        <p style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '1rem 0' }}>
                            {dashboardData?.quizProgress?.totalScore || 0}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Total Points</p>
                        <p style={{ marginTop: '1rem' }}>
                            Completed: {dashboardData?.quizProgress?.completed?.length || 0} quizzes
                        </p>
                    </div>

                    <div className="threat-card">
                        <h3>Achievements</h3>
                        <p style={{ fontSize: '2rem', color: 'var(--color-secondary)', margin: '1rem 0' }}>
                            {dashboardData?.achievements?.length || 0}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Badges Earned</p>
                    </div>

                    <div className="threat-card">
                        <h3>Bookmarks</h3>
                        <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '1rem 0' }}>
                            {dashboardData?.bookmarkedResources?.length || 0}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Saved Resources</p>
                    </div>
                </div>

                {dashboardData?.achievements && dashboardData.achievements.length > 0 && (
                    <div style={{ marginTop: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Your Achievements</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {dashboardData.achievements.map((achievement: any, index: number) => (
                                <div key={index} className="threat-card" style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{achievement.icon}</div>
                                    <h4>{achievement.name}</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                        {achievement.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
