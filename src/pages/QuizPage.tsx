import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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

    if (!quizzes || quizzes.length === 0) {
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
        <div className="quiz-page">
            <Navbar user={user} setUser={() => { }} />

            <div className="container" style={{ paddingTop: '120px', maxWidth: '900px' }}>
                <div className="quiz-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 className="gradient-text">AI Threat Detection Quiz</h1>
                    <div className="quiz-progress" style={{ marginTop: '1rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Question {currentQuizIndex + 1} of {quizzes.length} | Score: {score}
                        </p>
                        <div style={{
                            width: '100%',
                            height: '4px',
                            background: 'var(--color-bg-tertiary)',
                            borderRadius: '4px',
                            marginTop: '0.5rem'
                        }}>
                            <div style={{
                                width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                                borderRadius: '4px',
                                transition: 'width 0.3s ease'
                            }}></div>
                        </div>
                    </div>
                </div>

                <div className="quiz-card">
                    <div className="quiz-question" style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className="quiz-type-badge" style={{
                                padding: '0.375rem 0.875rem',
                                background: 'rgba(0, 217, 255, 0.2)',
                                border: '1px solid var(--color-primary)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                {currentQuiz.type}
                            </span>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                Difficulty: {'⭐'.repeat(currentQuiz.difficulty)}
                            </span>
                        </div>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                            {currentQuiz.question}
                        </h2>

                        {currentQuiz.mediaUrl && (
                            <div style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                                {currentQuiz.mediaType === 'image' && (
                                    <img src={currentQuiz.mediaUrl} alt="Quiz media" style={{ width: '100%' }} />
                                )}
                                {currentQuiz.mediaType === 'video' && (
                                    <video controls style={{ width: '100%' }}>
                                        <source src={currentQuiz.mediaUrl} />
                                    </video>
                                )}
                                {currentQuiz.mediaType === 'audio' && (
                                    <audio controls style={{ width: '100%' }}>
                                        <source src={currentQuiz.mediaUrl} />
                                    </audio>
                                )}
                            </div>
                        )}

                        <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {currentQuiz.options.map((option: QuizOption, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => !result && setSelectedAnswer(option.text)}
                                    disabled={!!result}
                                    className={`quiz-option ${selectedAnswer === option.text ? 'selected' : ''} ${result && option.text === result.data.correctAnswer ? 'correct' : ''
                                        } ${result && selectedAnswer === option.text && !result.data.isCorrect ? 'incorrect' : ''}`}
                                    style={{
                                        padding: '1rem 1.5rem',
                                        background: selectedAnswer === option.text ? 'rgba(0, 217, 255, 0.1)' : 'var(--color-bg-tertiary)',
                                        border: `2px solid ${selectedAnswer === option.text ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '1rem',
                                        textAlign: 'left',
                                        cursor: result ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    {result && (
                        <div className={`quiz-result ${result.data.isCorrect ? 'correct' : 'incorrect'}`} style={{
                            padding: '1.5rem',
                            background: result.data.isCorrect ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 51, 102, 0.1)',
                            border: `1px solid ${result.data.isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`,
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '1.5rem'
                        }}>
                            <h3 style={{ marginBottom: '1rem', color: result.data.isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                {result.data.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>{result.data.explanation}</p>
                            {result.data.detectionTips.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Detection Tips:</h4>
                                    <ul style={{ paddingLeft: '1.5rem' }}>
                                        {result.data.detectionTips.map((tip, i) => (
                                            <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {!result ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedAnswer || submitMutation.isPending}
                                className="btn btn-primary btn-glow"
                                style={{ flex: 1 }}
                            >
                                {submitMutation.isPending ? 'Submitting...' : 'Submit Answer'}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="btn btn-primary btn-glow"
                                style={{ flex: 1 }}
                            >
                                {currentQuizIndex < quizzes.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;
