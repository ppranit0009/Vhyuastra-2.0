export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
                                <path d="M20 5L5 12V20C5 28.5 11 36 20 38C29 36 35 28.5 35 20V12L20 5Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span className="logo-text">Human Firewall</span>
                        </div>
                        <p className="footer-tagline">Empowering humans to defend against AI-powered threats.</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copyright">&copy; 2026 Human Firewall. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
