import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuizPreview from '../components/QuizPreview';
import Footer from '../components/Footer';
import type { User } from '../types';

interface HomePageProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

function HomePage({ user, setUser }: HomePageProps) {
    return (
        <div className="app">
            <Navbar user={user} setUser={setUser} />
            <Hero />
            <QuizPreview user={user} />
            <Footer />
        </div>
    );
}

export default HomePage;
