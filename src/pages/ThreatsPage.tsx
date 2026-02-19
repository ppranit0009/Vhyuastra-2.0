import Navbar from '../components/Navbar';
import ThreatMatrix from '../components/ThreatMatrix';
import ProblemSection from '../components/ProblemSection';
import Footer from '../components/Footer';
import type { User } from '../types';

interface ThreatsPageProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

function ThreatsPage({ user, setUser }: ThreatsPageProps) {
    return (
        <div className="app">
            <Navbar user={user} setUser={setUser} />
            <div style={{ paddingTop: '80px' }}>
                <ThreatMatrix />
                <ProblemSection />
            </div>
            <Footer />
        </div>
    );
}

export default ThreatsPage;
