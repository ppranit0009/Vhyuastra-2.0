import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { newsletterService } from '../services/newsletterService';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const subscribeMutation = useMutation({
        mutationFn: (email: string) => newsletterService.subscribe({ email }),
        onSuccess: () => {
            setMessage('Successfully subscribed!');
            setEmail('');
            setTimeout(() => setMessage(''), 3000);
        },
        onError: (error: any) => {
            setMessage(error.response?.data?.message || 'Subscription failed');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        subscribeMutation.mutate(email);
    };

    return (
        <section className="newsletter-section" id="newsletter">
            <div className="container">
                <div className="newsletter-card">
                    <div className="newsletter-content">
                        <div className="newsletter-icon">
                            <svg viewBox="0 0 48 48" fill="none">
                                <rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M6 16L24 26L42 16" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="newsletter-text">
                            <h2 className="newsletter-title">Weekly Threat Intelligence</h2>
                            <p className="newsletter-description">
                                Get the latest AI scam alerts, detection techniques, and security best practices delivered every Monday.
                            </p>
                        </div>
                    </div>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary btn-glow" disabled={subscribeMutation.isPending}>
                                {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                        {message && <p className="form-disclaimer" style={{ color: message.includes('Success') ? 'var(--color-success)' : 'var(--color-danger)' }}>{message}</p>}
                        <p className="form-disclaimer">Join 50,000+ security professionals. Unsubscribe anytime.</p>
                    </form>
                </div>
            </div>
        </section>
    );
}
