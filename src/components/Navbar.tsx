// Navbar.tsx
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
                    <a href="#threats">The Threat</a>
                    <Link to="/quiz">Test Yourself</Link>
                    <a href="#resources">Resources</a>
                    {user ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
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
