import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AIAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user', text: string }>>([
        { type: 'bot', text: 'Hello Agent. I am Sentinel AI. How can I assist you with threat detection today?' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: inputText }]);
        const userQuery = inputText.toLowerCase();
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            let botResponse = "I process data related to cybersecurity threats.";

            if (userQuery.includes('audio') || userQuery.includes('voice') || userQuery.includes('video') || userQuery.includes('scan')) {
                botResponse = "For deepfake analysis and media scanning, please visit our dedicated Analysis Center.";
            } else if (userQuery.includes('hello') || userQuery.includes('hi')) {
                botResponse = "Greetings. Ready to scan for anomalies.";
            } else if (userQuery.includes('help')) {
                botResponse = "I can assist with: 1. Threat Analysis 2. Security Protocols 3. Directing you to the Analysis Center.";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 1000);
    };

    const handleNavigateToAnalysis = () => {
        navigate('/analysis');
        setIsOpen(false);
    };

    return (
        <div className="ai-agent-container" style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000
        }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            width: '350px',
                            height: '500px',
                            background: 'rgba(10, 14, 39, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--color-primary)',
                            borderRadius: '1rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(0, 217, 255, 0.1)',
                            borderBottom: '1px solid rgba(0, 217, 255, 0.2)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: 'var(--color-success)',
                                    boxShadow: '0 0 10px var(--color-success)'
                                }} />
                                <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>Sentinel AI</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} style={{
                                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: msg.type === 'user' ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    border: msg.type === 'user' ? '1px solid rgba(0, 217, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    fontSize: '0.875rem'
                                }}>
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textAlign: 'center' }}>Need deepfake analysis?</p>
                                <button
                                    onClick={handleNavigateToAnalysis}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(0, 217, 255, 0.1)',
                                        border: '1px solid var(--color-primary)',
                                        color: 'var(--color-primary)',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    Go to Analysis Center
                                </button>
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} style={{
                            padding: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: 'none',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    color: 'white'
                                }}
                            />
                            <button type="submit" style={{
                                background: 'var(--color-primary)',
                                border: 'none',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: 'black'
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--color-danger)' : 'var(--color-primary)',
                    border: 'none',
                    boxShadow: '0 0 20px var(--color-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? 'white' : 'black',
                    marginLeft: 'auto'
                }}
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '30px', height: '30px' }}>
                        <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                        <path d="M12 22v-6" />
                        <path d="M8 12a4 4 0 0 0 8 0" />
                        <rect x="2" y="10" width="4" height="4" rx="1" />
                        <rect x="18" y="10" width="4" height="4" rx="1" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
}
