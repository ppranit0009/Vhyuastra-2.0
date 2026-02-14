import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from './services/authService';
import type { User } from './types';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import ThreatsPage from './pages/ThreatsPage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = authService.getStoredUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="/quiz" element={<QuizPage user={user} />} />
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
            <Route path="/resources/:id" element={<ResourceDetailPage user={user} />} />
            <Route path="/threats" element={<ThreatsPage user={user} setUser={setUser} />} />
            <Route path="/resources" element={<ResourcesPage user={user} setUser={setUser} />} />
        </Routes>
    );
}

export default App;
