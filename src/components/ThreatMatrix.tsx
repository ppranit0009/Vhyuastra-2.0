// ThreatMatrix.tsx - Converted from static HTML
export default function ThreatMatrix() {
    const threats = [
        {
            title: 'Deepfakes',
            icon: (
                <svg viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            description: 'AI-generated videos of executives authorizing wire transfers. Fake video calls with "colleagues" requesting sensitive data.',
            stats: [
                { value: '500%', label: 'Growth in 2025' },
                { value: '98%', label: 'Detection difficulty' }
            ],
            tags: ['CEO Impersonation', 'Video Manipulation']
        },
        {
            title: 'Voice Cloning',
            icon: (
                <svg viewBox="0 0 48 48" fill="none">
                    <path d="M24 8C20.7 8 18 10.7 18 14V24C18 27.3 20.7 30 24 30C27.3 30 30 27.3 30 24V14C30 10.7 27.3 8 24 8Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 24C12 30.6 17.4 36 24 36C30.6 36 36 30.6 36 24" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            description: 'Perfect replicas of voices from just 3 seconds of audio. Phone calls from "family members" in distress or "bosses" demanding urgent action.',
            stats: [
                { value: '3 sec', label: 'Audio needed' },
                { value: '$243M', label: 'Losses in 2025' }
            ],
            tags: ['Vishing Attacks', 'Emergency Scams'],
            featured: true
        },
        {
            title: 'AI-Powered Phishing',
            icon: (
                <svg viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M6 16L24 26L42 16" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            description: 'Hyper-personalized emails that mimic writing styles, reference real projects, and bypass spam filters with perfect grammar.',
            stats: [
                { value: '94%', label: 'Click-through rate' },
                { value: '10x', label: 'More convincing' }
            ],
            tags: ['Spear Phishing', 'Business Email Compromise']
        }
    ];

    return (
        <section className="threat-matrix" id="threats">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">The <span className="gradient-text">Threat Matrix</span></h2>
                    <p className="section-subtitle">AI has weaponized social engineering. Here's what you're up against.</p>
                </div>
                <div className="threat-grid">
                    {threats.map((threat, index) => (
                        <div key={index} className={`threat-card ${threat.featured ? 'threat-card-featured' : ''}`}>
                            {threat.featured && <div className="featured-badge">Most Dangerous</div>}
                            <div className="threat-icon-wrapper">
                                <div className="threat-icon">{threat.icon}</div>
                                <div className="threat-glow"></div>
                            </div>
                            <h3 className="threat-title">{threat.title}</h3>
                            <p className="threat-description">{threat.description}</p>
                            <div className="threat-stats">
                                {threat.stats.map((stat, i) => (
                                    <div key={i} className="threat-stat">
                                        <span className="threat-stat-value">{stat.value}</span>
                                        <span className="threat-stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="threat-examples">
                                {threat.tags.map((tag, i) => (
                                    <div key={i} className="example-tag">{tag}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
