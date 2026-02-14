import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import type { User } from '../types';

import CyberBackground from '../components/CyberBackground';
import GlitchText from '../components/GlitchText';

interface RegisterPageProps {
    setUser: (user: User) => void;
}

function RegisterPage({ setUser }: RegisterPageProps) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.register({ name, email, password });
            setUser(response.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
            <CyberBackground />

            <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        padding: '2.5rem',
                        background: 'rgba(10, 14, 39, 0.4)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(123, 104, 238, 0.1)',
                        boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                        animation: 'scan 3s linear infinite'
                    }} />

                    <div className="auth-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <svg viewBox="0 0 40 40" fill="none" style={{ width: '64px', height: '64px', margin: '0 auto 1rem', color: 'var(--color-secondary)', filter: 'drop-shadow(0 0 10px rgba(123, 104, 238, 0.5))' }}>
                                <path d="M20 5L5 12V20C5 28.5 11 36 20 38C29 36 35 28.5 35 20V12L20 5Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </motion.div>
                        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            <GlitchText text="INITIATE PROTOCOL" />
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>New Agent Registration</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="alert alert-error"
                            style={{
                                background: 'rgba(255, 51, 102, 0.1)',
                                border: '1px solid var(--color-danger)',
                                color: 'var(--color-danger)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem',
                                fontSize: '0.875rem'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Doe"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(10, 14, 39, 0.6)',
                                    border: '1px solid rgba(123, 104, 238, 0.3)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(123, 104, 238, 0.3)'}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(10, 14, 39, 0.6)',
                                    border: '1px solid rgba(123, 104, 238, 0.3)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(123, 104, 238, 0.3)'}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                minLength={8}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(10, 14, 39, 0.6)',
                                    border: '1px solid rgba(123, 104, 238, 0.3)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(123, 104, 238, 0.3)'}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(10, 14, 39, 0.6)',
                                    border: '1px solid rgba(123, 104, 238, 0.3)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(123, 104, 238, 0.3)'}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-glow"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)'
                            }}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-footer" style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                        <p style={{ marginBottom: '1rem' }}>Already have an account? <Link to="/login" style={{ color: 'var(--color-secondary)', fontWeight: '500' }}>Sign in</Link></p>
                        <Link to="/" className="back-link" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>←</span> Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default RegisterPage;
