import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ThreatMatrix from '../components/ThreatMatrix';
import ProblemSection from '../components/ProblemSection';
import QuizPreview from '../components/QuizPreview';
import Resources from '../components/Resources';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { resourceService } from '../services/resourceService';
import type { User } from '../types';

interface HomePageProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

function HomePage({ user, setUser }: HomePageProps) {
    const { data: resourcesData } = useQuery({
        queryKey: ['resources', { limit: 6 }],
        queryFn: () => resourceService.getAllResources({ limit: 6 }),
    });

    return (
        <div className="app">
            <Navbar user={user} setUser={setUser} />
            <Hero />
            <ThreatMatrix />
            <ProblemSection />
            <QuizPreview user={user} />
            <Resources resources={resourcesData?.data.resources || []} />
            <Newsletter />
            <Footer />
        </div>
    );
}

export default HomePage;
