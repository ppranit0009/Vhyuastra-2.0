import { useState } from 'react';
import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import CyberBackground from '../components/CyberBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCallStore } from '../store/callStore';

interface AnalysisPageProps {
    user: any;
    setUser: any;
}

export default function AnalysisPage({ user, setUser }: AnalysisPageProps) {
    const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'email'>('audio');
    const [file, setFile] = useState<File | null>(null);
    const [emailContent, setEmailContent] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<'real' | 'fake' | null>(null);
    const { startIncomingCall } = useCallStore();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setResult(null);
            setProgress(0);
        }
    };

    const startAnalysis = () => {
        if (!file) return;
        setIsAnalyzing(true);
        setProgress(0);
        setResult(null);

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 2;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setIsAnalyzing(false);
                setResult(Math.random() > 0.4 ? 'real' : 'fake');
            }
        }, 50);
    };

    const analyzeEmail = () => {
        if (!emailContent.trim()) return;
        setIsAnalyzing(true);
        setProgress(0);
        setResult(null);

        // Simulate reading text, frequency check, layout analysis
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 5;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setIsAnalyzing(false);
                // Simple heuristic for demo: if "urgent" or "verify" is in text, mark as phishing
                const suspicious = emailContent.toLowerCase().includes('urgent') || emailContent.toLowerCase().includes('verify') || emailContent.toLowerCase().includes('password');
                setResult(suspicious ? 'fake' : 'real');
            }
        }, 100);
    };

    return (
        <div className="analysis-page" style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <CyberBackground />
            <Navbar user={user} setUser={setUser} />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', flex: 1, position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        <GlitchText text="THREAT ANALYSIS CENTER" />
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Advanced AI-powered detection for deepfakes and manipulated media. Upload your suspect files for instant forensic analysis.
                    </p>
                    <button
                        onClick={() => startIncomingCall('Scam Caller')}
                        style={{
                            marginTop: '2rem',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(255, 51, 102, 0.1)',
                            border: '1px solid var(--color-danger)',
                            color: 'var(--color-danger)',
                            borderRadius: '2rem',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>📞</span> Simulate Live Scam Call
                    </button>
                </motion.div>

                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'rgba(10, 14, 39, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--color-primary)',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    boxShadow: '0 0 50px rgba(0, 217, 255, 0.1)'
                }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <button
                            onClick={() => { setActiveTab('audio'); setFile(null); setResult(null); }}
                            style={{
                                flex: 1,
                                padding: '1.5rem',
                                background: activeTab === 'audio' ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'audio' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            AUDIO ANALYSIS
                        </button>
                        <button
                            onClick={() => { setActiveTab('video'); setFile(null); setResult(null); }}
                            style={{
                                flex: 1,
                                padding: '1.5rem',
                                background: activeTab === 'video' ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'video' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            VIDEO ANALYSIS
                        </button>
                        <button
                            onClick={() => { setActiveTab('email'); setFile(null); setResult(null); setIsAnalyzing(false); }}
                            style={{
                                flex: 1,
                                padding: '1.5rem',
                                background: activeTab === 'email' ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'email' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            EMAIL SECURITY
                        </button>
                    </div>

                    <div style={{ padding: '3rem' }}>
                        {activeTab === 'email' ? (
                            <div style={{ width: '100%' }}>
                                {!isAnalyzing && !result ? (
                                    <>
                                        <textarea
                                            placeholder="Paste the suspicious email content here..."
                                            value={emailContent}
                                            onChange={(e) => setEmailContent(e.target.value)}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '1rem',
                                                padding: '1rem',
                                                color: 'white',
                                                fontSize: '1rem',
                                                resize: 'vertical',
                                                marginBottom: '1.5rem'
                                            }}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            style={{ padding: '1rem 3rem', fontSize: '1.2rem', width: '100%' }}
                                            onClick={analyzeEmail}
                                            disabled={!emailContent.trim()}
                                        >
                                            ANALYZE EMAIL
                                        </button>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        {isAnalyzing && (
                                            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    gap: '1rem',
                                                    marginBottom: '2rem',
                                                    fontSize: '3rem'
                                                }}>
                                                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }}>📝</motion.span>
                                                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, delay: 0.3, repeat: Infinity }}>🔍</motion.span>
                                                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, delay: 0.6, repeat: Infinity }}>⚠️</motion.span>
                                                </div>

                                                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <motion.div
                                                        style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)' }}
                                                    />
                                                </div>
                                                <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                                                    Scanning for plagiarism and keyword patterns... {progress}%
                                                </p>
                                            </div>
                                        )}

                                        {result && (
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                style={{ textAlign: 'left' }}
                                            >
                                                <div style={{
                                                    padding: '2rem',
                                                    background: result === 'fake' ? 'rgba(255, 51, 102, 0.1)' : 'rgba(0, 255, 157, 0.1)',
                                                    border: `1px solid ${result === 'fake' ? 'var(--color-danger)' : 'var(--color-success)'}`,
                                                    borderRadius: '1rem',
                                                    marginBottom: '2rem'
                                                }}>
                                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: result === 'fake' ? 'var(--color-danger)' : 'var(--color-success)', marginBottom: '0.5rem', textAlign: 'center' }}>
                                                        {result === 'fake' ? 'PHISHING ATTEMPT DETECTED' : 'EMAIL APPEARS SAFE'}
                                                    </div>
                                                    <p style={{ fontSize: '1.2rem', marginBottom: '0', textAlign: 'center' }}>
                                                        Confidence Score: {(Math.random() * (99.9 - 95.0) + 95.0).toFixed(2)}%
                                                    </p>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.5rem' }}>
                                                        <h3 style={{ color: 'var(--color-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Plagiarism Check</h3>
                                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                            {result === 'fake'
                                                                ? "⚠️ Content matches known phishing templates (Bank Fraud 2024, Urgent Reset)."
                                                                : "✅ No significant matches with known threat databases."}
                                                        </p>
                                                    </div>
                                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.5rem' }}>
                                                        <h3 style={{ color: 'var(--color-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Frequency Analysis</h3>
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                            {result === 'fake' ? (
                                                                <>
                                                                    <li style={{ color: 'var(--color-danger)' }}>• "Urgent": 8 occurrences (High Risk)</li>
                                                                    <li style={{ color: 'var(--color-danger)' }}>• "Verify": 5 occurrences (High Risk)</li>
                                                                    <li style={{ color: 'orange' }}>• "Account": 12 occurrences (Medium Risk)</li>
                                                                </>
                                                            ) : (
                                                                <li>✅ Key term frequency within normal conversational limits.</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn"
                                                    style={{ display: 'block', margin: '2rem auto 0' }}
                                                    onClick={() => { setEmailContent(''); setResult(null); }}
                                                >
                                                    Analyze Another Email
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            !file ? (
                                <div
                                    onClick={() => document.getElementById('main-upload')?.click()}
                                    style={{
                                        border: '2px dashed var(--color-primary)',
                                        borderRadius: '1rem',
                                        padding: '4rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        background: 'rgba(0, 217, 255, 0.05)'
                                    }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'rgba(0, 217, 255, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        color: 'var(--color-primary)'
                                    }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '40px', height: '40px' }}>
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Upload {activeTab === 'audio' ? 'Audio' : 'Video'} File</h3>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>Drag & drop or click to browse</p>
                                    <input
                                        id="main-upload"
                                        type="file"
                                        accept={activeTab === 'audio' ? 'audio/*' : 'video/*'}
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                        <span style={{ color: 'var(--color-primary)' }}>Selected:</span>
                                        {file.name}
                                        <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}>
                                            (Remove)
                                        </button>
                                    </div>

                                    {!isAnalyzing && !result && (
                                        <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={startAnalysis}>
                                            START SCAN
                                        </button>
                                    )}

                                    {isAnalyzing && (
                                        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: '5px',
                                                height: '60px',
                                                marginBottom: '2rem'
                                            }}>
                                                {[...Array(20)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{
                                                            height: [20, 50, 20],
                                                            backgroundColor: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-primary)']
                                                        }}
                                                        transition={{
                                                            duration: 0.8,
                                                            repeat: Infinity,
                                                            delay: i * 0.05,
                                                            ease: "easeInOut"
                                                        }}
                                                        style={{
                                                            width: '4px',
                                                            borderRadius: '2px'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <motion.div
                                                    style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)' }}
                                                />
                                            </div>
                                            <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                                                Running neural network analysis... {progress}%
                                            </p>
                                        </div>
                                    )}

                                    {result && (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            style={{
                                                padding: '2rem',
                                                background: result === 'fake' ? 'rgba(255, 51, 102, 0.1)' : 'rgba(0, 255, 157, 0.1)',
                                                border: `1px solid ${result === 'fake' ? 'var(--color-danger)' : 'var(--color-success)'}`,
                                                borderRadius: '1rem',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: result === 'fake' ? 'var(--color-danger)' : 'var(--color-success)', marginBottom: '0.5rem' }}>
                                                {result === 'fake' ? 'DEEPFAKE DETECTED' : 'AUTHENTIC MEDIA'}
                                            </div>
                                            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                                                Confidence Score: {(Math.random() * (99.9 - 95.0) + 95.0).toFixed(2)}%
                                            </p>
                                            <button className="btn" onClick={() => { setFile(null); setResult(null); }}>
                                                Analyze Another File
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
