import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import CyberBackground from '../components/CyberBackground';
import GlitchText from '../components/GlitchText';
import type { User } from '../types';

interface ProfilePageProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

function ProfilePage({ user, setUser }: ProfilePageProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const stats = [
        { label: 'Security Clearance', value: 'Level 4', color: 'var(--color-primary)' },
        { label: 'Missions Completed', value: '12', color: 'var(--color-secondary)' },
        { label: 'Threats Neutralized', value: '84', color: 'var(--color-danger)' },
        { label: 'System Access', value: 'Granted', color: 'var(--color-success)' }
    ];

    return (
        <div className="profile-page" style={{ minHeight: '100vh', position: 'relative' }}>
            <CyberBackground />
            <Navbar user={user} setUser={setUser} />

            <div className="container" style={{ paddingTop: '120px', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                        <div style={{
                            width: '4px',
                            height: '40px',
                            background: 'var(--color-primary)',
                            boxShadow: '0 0 10px var(--color-primary)'
                        }} />
                        <h1 className="gradient-text" style={{ fontSize: '3rem', margin: 0 }}>
                            <GlitchText text="AGENT PROFILE" />
                        </h1>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {/* Identity Card */}
                        <div style={{
                            background: 'rgba(10, 14, 39, 0.4)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(0, 217, 255, 0.1)',
                            padding: '2.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                                animation: 'scan 3s linear infinite'
                            }} />

                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(123, 104, 238, 0.2))',
                                    border: '2px solid var(--color-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
                                }}>
                                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{user.name}</h2>
                                <p style={{ color: 'var(--color-primary)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                                    {user.role.toUpperCase()} OPERATIVE
                                </p>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Email Frequency</label>
                                    <div style={{ color: 'white', fontSize: '1.125rem' }}>{user.email}</div>
                                </div>
                                <div>
                                    <label style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Account Status</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', boxShadow: '0 0 5px currentColor' }} />
                                        Active
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
                            <div style={{
                                background: 'rgba(10, 14, 39, 0.4)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '1.5rem',
                                border: '1px solid rgba(123, 104, 238, 0.1)',
                                padding: '2rem'
                            }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px', color: 'var(--color-secondary)' }}>
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                    Performance Metrics
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {stats.map((stat, i) => (
                                        <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                                {stat.label}
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>
                                                {stat.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button className="btn" style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    Edit Profile
                                </button>
                                <button className="btn" style={{
                                    background: 'rgba(255, 51, 102, 0.1)',
                                    border: '1px solid var(--color-danger)',
                                    color: 'var(--color-danger)'
                                }} onClick={() => setUser(null)}>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default ProfilePage;
