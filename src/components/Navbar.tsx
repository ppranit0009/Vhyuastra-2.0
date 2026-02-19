import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import type { User } from '../types';

interface NavbarProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export default function Navbar({ user, setUser }: NavbarProps) {
    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
                        <path d="M20 5L5 12V20C5 28.5 11 36 20 38C29 36 35 28.5 35 20V12L20 5Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="logo-text">Human Firewall</span>
                </Link>
                <div className="nav-links">
                    <Link to="/threats">The Threat</Link>
                    <Link to="/analysis">AI Analysis</Link>
                    <Link to="/quiz">Test Yourself</Link>
                    <Link to="/resources">Resources</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/profile" className="nav-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Profile">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </Link>
                            <button onClick={handleLogout} className="nav-cta">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-cta">Get Started</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
