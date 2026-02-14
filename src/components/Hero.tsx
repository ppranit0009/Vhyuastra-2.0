// Hero.tsx - Converted from static HTML
export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="grid-overlay"></div>
                <div className="glow-orb glow-orb-1"></div>
                <div className="glow-orb glow-orb-2"></div>
            </div>
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <svg className="badge-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2L2 7V11C2 15.5 5.5 19.5 10 20.5C14.5 19.5 18 15.5 18 11V7L10 2Z" />
                        </svg>
                        <span>AI Threat Intelligence 2026</span>
                    </div>
                    <h1 className="hero-title">
                        The Era of <span className="gradient-text">AI Scams</span> is Here.<br />
                        Is Your Team Ready?
                    </h1>
                    <p className="hero-description">
                        Deepfakes, voice cloning, and AI-powered phishing are bypassing traditional security.
                        Train your workforce to become the ultimate defense layer.
                    </p>
                    <div className="hero-cta-group">
                        <a href="#quiz" className="btn btn-primary btn-glow">
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM9 14L5 10L6.41 8.59L9 11.17L13.59 6.58L15 8L9 14Z" />
                            </svg>
                            Get Free Phishing Audit
                        </a>
                        <button className="btn btn-secondary">
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2L3 7V13C3 16.5 6 19.5 10 20.5C14 19.5 17 16.5 17 13V7L10 2Z" />
                            </svg>
                            Watch Demo
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-value">87%</div>
                            <div className="stat-label">Increase in AI scams</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">$12.5B</div>
                            <div className="stat-label">Lost to deepfake fraud</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">3.4B</div>
                            <div className="stat-label">Phishing emails daily</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
