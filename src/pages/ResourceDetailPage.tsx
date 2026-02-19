import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import { resourceService } from '../services/resourceService';
import type { User } from '../types';

interface ResourceDetailPageProps {
    user: User | null;
}

function ResourceDetailPage({ user }: ResourceDetailPageProps) {
    const { id } = useParams<{ id: string }>();

    const { data: resource, isLoading } = useQuery({
        queryKey: ['resource', id],
        queryFn: () => resourceService.getResource(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <div className="loading-screen"><div className="loader"></div></div>;
    }

    if (!resource) {
        return <div>Resource not found</div>;
    }

    return (
        <div className="resource-detail-page">
            <Navbar user={user} setUser={() => { }} />

            <div className="container" style={{ paddingTop: '120px', maxWidth: '800px' }}>
                <article>
                    <div className={`resource-tag resource-tag-${resource.category}`} style={{ marginBottom: '1rem' }}>
                        {resource.category}
                    </div>

                    <h1 style={{ marginBottom: '1rem' }}>{resource.title}</h1>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        <span>{new Date(resource.publishedDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{resource.readTime} min read</span>
                        <span>•</span>
                        <span>{resource.author}</span>
                    </div>

                    {resource.imageUrl && (
                        <img src={resource.imageUrl} alt={resource.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }} />
                    )}

                    <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                        {resource.content.split('\n').map((paragraph: string, i: number) => (
                            <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                        ))}
                    </div>

                    {resource.tags && resource.tags.length > 0 && (
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {resource.tags.map((tag: string, i: number) => (
                                <span key={i} className="example-tag">{tag}</span>
                            ))}
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
}

export default ResourceDetailPage;
