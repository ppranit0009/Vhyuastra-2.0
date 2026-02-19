import { Link } from 'react-router-dom';
import type { Resource } from '../types';

interface ResourcesProps {
    resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
    return (
        <section className="resources-section" id="resources">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Latest <span className="gradient-text">Threat Intelligence</span></h2>
                    <p className="section-subtitle">Stay ahead with real-time scam alerts and security resources</p>
                </div>
                <div className="resources-grid">
                    {resources.map((resource) => (
                        <article key={resource._id} className="resource-card">
                            <div className={`resource-tag resource-tag-${resource.category}`}>{resource.category}</div>
                            <div className="resource-date">{new Date(resource.publishedDate).toLocaleDateString()}</div>
                            <h3 className="resource-title">{resource.title}</h3>
                            <p className="resource-excerpt">{resource.excerpt}</p>
                            <Link to={`/resources/${resource._id}`} className="resource-link">
                                Read Full Article
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 4L8.59 5.41L13.17 10L8.59 14.59L10 16L16 10L10 4Z" />
                                </svg>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
