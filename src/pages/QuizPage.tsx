import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { quizService } from '../services/quizService';
import type { User, QuizResult, QuizOption } from '../types';

interface QuizPageProps {
    user: User | null;
}

function QuizPage({ user }: QuizPageProps) {
    const navigate = useNavigate();
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [result, setResult] = useState<QuizResult | null>(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(0);

    const { data: quizzes, isLoading } = useQuery({
        queryKey: ['random-quizzes'],
        queryFn: () => quizService.getRandomQuizzes(10),
    });

    const submitMutation = useMutation({
        mutationFn: ({ id, answer }: { id: string; answer: string }) =>
            quizService.submitAnswer(id, answer),
        onSuccess: (data: QuizResult) => {
            setResult(data);
            if (data.data.isCorrect) {
                setScore(score + data.data.points);
            }
            setCompleted(completed + 1);
        },
    });

    const currentQuiz = quizzes?.[currentQuizIndex];

    const handleSubmit = () => {
        if (!selectedAnswer || !currentQuiz) return;
        submitMutation.mutate({ id: currentQuiz._id, answer: selectedAnswer });
    };

    const handleNext = () => {
        setResult(null);
        setSelectedAnswer('');
        if (currentQuizIndex < (quizzes?.length || 0) - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
        } else {
            // Quiz completed
            alert(`Quiz completed! Your score: ${score}`);
            navigate('/dashboard');
        }
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (!quizzes || quizzes.length === 0 || !currentQuiz) {
        return (
            <div className="quiz-page">
                <Navbar user={user} setUser={() => { }} />
                <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                    <h2>No quizzes available</h2>
                    <p>Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-page" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Immersive Background */}
            <div className="hero-background" style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div className="grid-overlay"></div>
                <div className="glow-orb glow-orb-1" style={{ width: '600px', height: '600px', opacity: 0.15 }}></div>
                <div className="glow-orb glow-orb-2" style={{ width: '500px', height: '500px', opacity: 0.15 }}></div>
            </div>

            <Navbar user={user} setUser={() => { }} />

            <div className="container" style={{ paddingTop: '100px', maxWidth: '900px', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="quiz-header"
                    style={{ marginBottom: '2rem', textAlign: 'center', background: 'transparent', border: 'none' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Threat Detection Quiz</h1>
                    <div className="quiz-progress" style={{ marginTop: '1rem', background: 'rgba(10, 14, 39, 0.6)', padding: '1rem', borderRadius: '1rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                            <span>Question {currentQuizIndex + 1} / {quizzes.length}</span>
                            <span>Score: <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{score}</span></span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '6px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                                    borderRadius: '10px',
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuiz._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="quiz-card"
                        style={{
                            padding: '2rem',
                            background: 'rgba(26, 31, 58, 0.7)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(123, 104, 238, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="quiz-question" style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                                <span className="quiz-type-badge" style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(0, 217, 255, 0.15)',
                                    border: '1px solid var(--color-primary)',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: 'var(--color-primary)',
                                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.2)'
                                }}>
                                    {currentQuiz.type}
                                </span>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', gap: '2px' }}>
                                    Difficulty:
                                    <span style={{ color: 'var(--color-warning)', marginLeft: '4px' }}>{'★'.repeat(currentQuiz.difficulty)}</span>
                                    <span style={{ opacity: 0.3 }}>{'★'.repeat(5 - currentQuiz.difficulty)}</span>
                                </span>
                            </div>

                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>
                                {currentQuiz.question}
                            </h2>

                            {currentQuiz.mediaUrl && (
                                <div style={{ marginBottom: '2rem', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {currentQuiz.mediaType === 'image' && (
                                        <img src={currentQuiz.mediaUrl} alt="Quiz media" style={{ width: '100%', display: 'block' }} />
                                    )}
                                    {currentQuiz.mediaType === 'video' && (
                                        <video controls style={{ width: '100%', display: 'block' }}>
                                            <source src={currentQuiz.mediaUrl} />
                                        </video>
                                    )}
                                    {currentQuiz.mediaType === 'audio' && (
                                        <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', textAlign: 'center' }}>
                                            <audio controls style={{ width: '100%' }}>
                                                <source src={currentQuiz.mediaUrl} />
                                            </audio>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="quiz-options" style={{ display: 'grid', gap: '1rem' }}>
                                {currentQuiz.options.map((option: QuizOption, index: number) => (
                                    <motion.button
                                        key={index}
                                        whileHover={!result ? { scale: 1.02, x: 4 } : {}}
                                        whileTap={!result ? { scale: 0.98 } : {}}
                                        onClick={() => !result && setSelectedAnswer(option.text)}
                                        disabled={!!result}
                                        className={`quiz-option`}
                                        style={{
                                            padding: '1.25rem 1.5rem',
                                            background: selectedAnswer === option.text
                                                ? 'linear-gradient(90deg, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.05))'
                                                : 'rgba(255, 255, 255, 0.03)',
                                            border: `1px solid ${selectedAnswer === option.text ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                                            borderRadius: '1rem',
                                            color: 'var(--color-text-primary)',
                                            fontSize: '1.1rem',
                                            textAlign: 'left',
                                            cursor: result ? 'default' : 'pointer',
                                            transition: 'border-color 0.2s, background 0.2s',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            opacity: result && selectedAnswer !== option.text && option.text !== result.data.correctAnswer ? 0.5 : 1
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: `2px solid ${selectedAnswer === option.text ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)'}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                {selectedAnswer === option.text && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }} />}
                                            </div>
                                            {option.text}
                                            {result && option.text === result.data.correctAnswer && (
                                                <span style={{ marginLeft: 'auto', color: 'var(--color-success)', fontWeight: 'bold' }}>✓ Correct</span>
                                            )}
                                            {result && selectedAnswer === option.text && !result.data.isCorrect && (
                                                <span style={{ marginLeft: 'auto', color: 'var(--color-danger)', fontWeight: 'bold' }}>✗ Your Answer</span>
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className={`quiz-result`}
                                    style={{
                                        padding: '1.5rem',
                                        background: result.data.isCorrect ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 51, 102, 0.1)',
                                        border: `1px solid ${result.data.isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`,
                                        borderRadius: '1rem',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            lineHeight: 1,
                                            padding: '0.5rem',
                                            background: result.data.isCorrect ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 51, 102, 0.2)',
                                            borderRadius: '50%'
                                        }}>
                                            {result.data.isCorrect ? '✓' : '✗'}
                                        </div>
                                        <div>
                                            <h3 style={{ marginBottom: '0.5rem', color: result.data.isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                                {result.data.isCorrect ? 'Excellent!' : 'Incorrect'}
                                            </h3>
                                            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{result.data.explanation}</p>

                                            {result.data.detectionTips.length > 0 && (
                                                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Detection Tips:</h4>
                                                    <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                                        {result.data.detectionTips.map((tip, i) => (
                                                            <li key={i} style={{ marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>{tip}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            {!result ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer || submitMutation.isPending}
                                    className="btn btn-primary btn-glow"
                                    style={{ flex: 1, padding: '1.25rem' }}
                                >
                                    {submitMutation.isPending ? 'Submitting...' : 'Submit Answer'}
                                </motion.button>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleNext}
                                    className="btn btn-primary btn-glow"
                                    style={{ flex: 1, padding: '1.25rem' }}
                                >
                                    {currentQuizIndex < quizzes.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default QuizPage;
