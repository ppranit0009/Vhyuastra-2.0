import { Link } from 'react-router-dom';
import type { User } from '../types';

interface QuizPreviewProps {
    user: User | null;
}

export default function QuizPreview({ user: _user }: QuizPreviewProps) {
    return (
        <section className="quiz-section" id="quiz">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Can You Spot the <span className="gradient-text">AI Fake?</span></h2>
                    <p className="section-subtitle">Test your detection skills with our interactive challenge</p>
                </div>
                <div className="quiz-container">
                    <div className="quiz-card">
                        <div className="quiz-content">
                            <div className="quiz-placeholder">
                                <svg className="quiz-icon" viewBox="0 0 64 64" fill="none">
                                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
                                    <path d="M32 20V32L40 36" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <h3>Real vs. AI Identification Game</h3>
                                <p>Challenge yourself with realistic scenarios comparing genuine communications with AI-generated fakes.</p>
                                <Link to="/quiz" className="btn btn-primary btn-glow">
                                    Start Challenge
                                    <svg className="btn-icon-right" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 4L8.59 5.41L13.17 10L8.59 14.59L10 16L16 10L10 4Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
