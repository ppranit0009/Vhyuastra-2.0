import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallStore } from '../store/callStore';

export default function CallSimulator() {
    const { status, caller, verdict, answerCall, endCall, setVerdict } = useCallStore();
    const [audioData, setAudioData] = useState<number[]>(new Array(20).fill(10));

    // Simulate audio visualizer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'active' || status === 'analyzing') {
            interval = setInterval(() => {
                setAudioData(prev => prev.map(() => Math.random() * 40 + 10));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status]);

    // Simulate analysis timeline
    useEffect(() => {
        if (status === 'active') {
            // After 3 seconds, show result
            const timer = setTimeout(() => {
                const isSafe = Math.random() > 0.5;
                setVerdict(isSafe ? 'safe' : 'dangerous', Math.random() * 15 + 85); // 85-100% confidence
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [status, setVerdict]);

    if (status === 'idle') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="call-overlay"
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    maxWidth: '400px',
                    background: verdict === 'dangerous'
                        ? 'linear-gradient(180deg, rgba(40, 0, 0, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)'
                        : 'rgba(10, 14, 39, 0.95)',
                    backdropFilter: 'blur(15px)',
                    border: `2px solid ${verdict === 'dangerous' ? 'var(--color-danger)' : 'var(--color-primary)'}`,
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    zIndex: 2000,
                    boxShadow: verdict === 'dangerous'
                        ? '0 0 50px rgba(255, 51, 102, 0.5)'
                        : '0 10px 30px rgba(0,0,0,0.5)',
                    color: 'white',
                    overflow: 'hidden'
                }}
            >
                {/* AI Agent Presence */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '100px',
                    height: '100px',
                    background: 'var(--color-primary)',
                    filter: 'blur(60px)',
                    opacity: 0.2
                }} />

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: status === 'incoming' ? 'orange' : (verdict === 'dangerous' ? 'var(--color-danger)' : 'var(--color-success)'),
                            animation: 'pulse 1s infinite'
                        }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {status === 'incoming' ? 'Incoming Call' : 'Vhyuastra Monitor Active'}
                        </span>
                    </div>
                </div>

                {/* Caller Info */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: verdict === 'dangerous' ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255,255,255,0.1)',
                        border: verdict === 'dangerous' ? '2px solid var(--color-danger)' : 'none',
                        margin: '0 auto 0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        📞
                    </div>
                    {verdict === 'dangerous' && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.2, opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                left: '50%',
                                marginLeft: '-40px',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '2px solid var(--color-danger)',
                                zIndex: 1
                            }}
                        />
                    )}
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{caller}</h2>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>+1 (555) 012-3456</p>
                </div>

                {/* Active Call Visualizer */}
                {(status === 'active' || status === 'result') && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '3px',
                            height: '50px'
                        }}>
                            {audioData.map((height, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: verdict === 'dangerous' ? height * 1.5 : height }}
                                    transition={{ duration: 0.1 }}
                                    style={{
                                        width: '4px',
                                        background: verdict === 'dangerous' ? 'var(--color-danger)' : 'var(--color-primary)',
                                        borderRadius: '2px',
                                        boxShadow: verdict === 'dangerous' ? '0 0 5px var(--color-danger)' : 'none'
                                    }}
                                />
                            ))}
                        </div>
                        {status === 'active' && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    style={{ width: '16px', height: '16px', border: '2px solid var(--color-primary)', borderTopColor: 'transparent', borderRadius: '50%' }}
                                />
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                    AI Analyzing Pattern...
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Verdict Overlay */}
                {status === 'result' && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: verdict === 'dangerous' ? 'rgba(255, 51, 102, 0.9)' : 'rgba(0, 255, 157, 0.9)',
                            border: `1px solid ${verdict === 'dangerous' ? 'var(--color-danger)' : 'var(--color-success)'}`,
                            borderRadius: '0.5rem',
                            padding: '1.5rem',
                            textAlign: 'center',
                            marginBottom: '1.5rem',
                            color: 'black',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {verdict === 'dangerous' ? '⚠️' : '✅'}
                        </div>
                        <h3 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '1.5rem',
                            fontWeight: '900',
                            textTransform: 'uppercase'
                        }}>
                            {verdict === 'dangerous' ? 'SCAM CALL DETECTED' : 'CALL VERIFIED SAFE'}
                        </h3>
                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                            {verdict === 'dangerous'
                                ? "Agent Recommendation: HANG UP IMMEDIATELY"
                                : "No anomalies found. You may proceed."}
                        </p>
                    </motion.div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    {status === 'incoming' ? (
                        <>
                            <button
                                onClick={endCall}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'var(--color-danger)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ✕
                            </button>
                            <button
                                onClick={answerCall}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'var(--color-success)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'pulse 1.5s infinite'
                                }}
                            >
                                📞
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={endCall}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '2rem',
                                background: 'var(--color-danger)',
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            End Call
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
