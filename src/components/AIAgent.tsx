import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TypingIndicator = () => (
    <div style={{
        display: 'flex',
        gap: '4px',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        borderBottomLeftRadius: '4px',
        width: 'fit-content',
        marginBottom: '8px'
    }}>
        {[0, 1, 2].map((dot) => (
            <motion.div
                key={dot}
                style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '50%'
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: dot * 0.2
                }}
            />
        ))}
    </div>
);

export default function AIAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user', text: string }>>([
        { type: 'bot', text: 'Hello Agent. I am Sentinel AI. How can I assist you with threat detection today?' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const userText = inputText;
        setMessages(prev => [...prev, { type: 'user', text: userText }]);
        const userQuery = userText.toLowerCase();
        setInputText('');
        setIsTyping(true);

        // Simulate bot response with typing delay
        setTimeout(() => {
            let botResponse = "I process data related to cybersecurity threats.";

            if (userQuery.includes('audio') || userQuery.includes('voice') || userQuery.includes('video') || userQuery.includes('scan')) {
                botResponse = "For deepfake analysis and media scanning, please visit our dedicated Analysis Center.";
            } else if (userQuery.includes('hello') || userQuery.includes('hi')) {
                botResponse = "Greetings. Systems are online and monitoring for anomalies.";
            } else if (userQuery.includes('help')) {
                botResponse = "I can assist with: 1. Threat Analysis 2. Security Protocols 3. Directing you to the Analysis Center.";
            } else if (userQuery.includes('status')) {
                botResponse = "All systems nominal. No active breaches detected in the immediate network sector.";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
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
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                            background: 'linear-gradient(90deg, rgba(0, 217, 255, 0.1) 0%, rgba(10, 14, 39, 0) 100%)',
                            borderBottom: '1px solid rgba(0, 217, 255, 0.2)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    position: 'relative',
                                    width: '12px',
                                    height: '12px',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background: 'var(--color-success)',
                                        boxShadow: '0 0 10px var(--color-success)'
                                    }} />
                                    <motion.div
                                        animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            background: 'var(--color-success)',
                                        }}
                                    />
                                </div>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'var(--color-primary)',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem'
                                }}>Sentinel AI</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text-secondary)',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        borderBottomRightRadius: msg.type === 'user' ? '4px' : '12px',
                                        borderBottomLeftRadius: msg.type === 'bot' ? '4px' : '12px',
                                        background: msg.type === 'user' ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                        border: msg.type === 'user' ? '1px solid rgba(0, 217, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                            {isTyping && <TypingIndicator />}
                            <div ref={messagesEndRef} />

                            {!isTyping && messages.length < 4 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Actions</p>
                                    <button
                                        onClick={handleNavigateToAnalysis}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(0, 217, 255, 0.05)',
                                            border: '1px solid var(--color-primary)',
                                            color: 'var(--color-primary)',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 217, 255, 0.15)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 217, 255, 0.05)'}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        Open Analysis Center
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} style={{
                            padding: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            gap: '0.75rem',
                            background: 'rgba(0, 0, 0, 0.2)'
                        }}>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                disabled={isTyping}
                                style={{
                                    flex: 1,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '2rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || isTyping}
                                style={{
                                    background: inputText.trim() ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    cursor: inputText.trim() ? 'pointer' : 'default',
                                    color: inputText.trim() ? 'black' : 'rgba(255, 255, 255, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
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
                animate={!isOpen ? {
                    boxShadow: [
                        '0 0 0 0 rgba(0, 217, 255, 0.4)',
                        '0 0 0 20px rgba(0, 217, 255, 0)',
                    ]
                } : {}}
                transition={!isOpen ? {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                } : {}}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--color-danger)' : 'var(--color-primary)',
                    border: 'none',
                    boxShadow: isOpen ? '0 0 20px var(--color-danger)' : '0 0 20px var(--color-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? 'white' : 'black',
                    marginLeft: 'auto',
                    position: 'relative',
                    zIndex: 1001
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
