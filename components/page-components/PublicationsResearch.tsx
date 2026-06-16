import Link from 'next/link';
import { PublicationsResearchSection, Publication } from '@/lib/types';

interface PublicationsResearchProps {
  data: PublicationsResearchSection;
}

function PublicationItem({ publication }: { publication: Publication }) {
  const tags = Array.isArray(publication?.topic_tags) ? publication.topic_tags : [];

  return (
    <div className="bg-bg-card rounded-xl shadow-card-sm p-4">
      <h3 className="text-white text-sm font-bold leading-tight">
        {publication?.publication_title || publication?.title || ''}
      </h3>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags?.map?.((tag, index) => (
            <span
              key={index}
              className="bg-bg-tag text-text-link text-[10px] px-2 py-0.5 rounded-full"
            >
              {tag?.tag_label || ''}
            </span>
          ))}
        </div>
      )}

      {publication?.excerpt && (
        <p className="text-text-secondary text-xs mt-2.5 leading-relaxed">
          {publication.excerpt}
        </p>
      )}

      {publication?.published_date && (
        <p className="text-text-muted text-[11px] mt-1.5">
          {new Date(publication.published_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      <div className="flex gap-2 mt-3">
        {publication?.read_more_cta?.button_text && (
          <Link
            href={publication?.read_more_cta?.button_url || publication?.url || '#'}
            className="text-[11px] px-3 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-150"
          >
            {publication.read_more_cta.button_text}
          </Link>
        )}
        {publication?.external_url && (
          <a
            href={publication.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] px-3 py-1 rounded-full border border-border-subtle text-text-secondary hover:border-white hover:text-white transition-all duration-150"
          >
            External Link ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function PublicationsResearch({ data }: PublicationsResearchProps) {
  const sectionHeading = data?.section_heading || 'Publications & Research';
  const publications = Array.isArray(data?.publications) ? data.publications : [];

  return (
    <section id="publications" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <h2 className="text-white text-lg font-bold mb-5">{sectionHeading}</h2>

        {publications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {publications?.map?.((publication, index) => (
              <PublicationItem key={publication?.uid || index} publication={publication} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">No publications found.</p>
        )}
      </div>
    </section>
  );
}