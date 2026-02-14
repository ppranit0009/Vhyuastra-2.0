import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Resources from '../components/Resources';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { resourceService } from '../services/resourceService';
import type { User } from '../types';

interface ResourcesPageProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

function ResourcesPage({ user, setUser }: ResourcesPageProps) {
    const { data: resourcesData, isLoading } = useQuery({
        queryKey: ['resources'],
        queryFn: () => resourceService.getAllResources(),
    });

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="app">
            <Navbar user={user} setUser={setUser} />
            <div style={{ paddingTop: '80px' }}>
                <div className="container" style={{ margin: '2rem auto' }}>
                    <h1 className="gradient-text">Security Resources</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                        Stay updated with the latest cybersecurity trends and guides.
                    </p>
                </div>
                <Resources resources={resourcesData?.data.resources || []} />
                <Newsletter />
            </div>
            <Footer />
        </div>
    );
}

export default ResourcesPage;
