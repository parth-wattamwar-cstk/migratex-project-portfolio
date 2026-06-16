import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getEntryByUrl } from '@/lib/contentstack-api';
import { Publication } from '@/lib/types';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const entry = (await getEntryByUrl({
      entryUrl: `/publications/${params.slug}`,
      contentTypeUid: 'publication',
    })) as Publication | null;

    return {
      title: entry?.meta_title || entry?.publication_title || entry?.title || 'Publication',
      description: entry?.meta_description || entry?.excerpt || '',
    };
  } catch {
    return { title: 'Publication' };
  }
}

export default async function PublicationPage({ params }: PageProps) {
  let entry: Publication | null = null;

  try {
    entry = (await getEntryByUrl({
      entryUrl: `/publications/${params.slug}`,
      contentTypeUid: 'publication',
      jsonRtePath: ['full_content'],
    })) as Publication | null;
  } catch (error) {
    console.error('Error fetching publication:', error);
  }

  if (!entry) return notFound();

  const tags = Array.isArray(entry?.topic_tags) ? entry.topic_tags : [];

  return (
    <div className="py-8 px-6 max-w-container mx-auto">
      <Link
        href="/#publications"
        className="inline-flex items-center gap-1 text-text-muted text-xs hover:text-white transition-colors mb-6"
      >
        ← Back to Publications
      </Link>

      <div className="bg-bg-card rounded-xl shadow-card p-6">
        <h1 className="text-white text-xl font-bold mb-3">
          {entry?.publication_title || entry?.title || ''}
        </h1>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags?.map?.((tag, index) => (
              <span
                key={index}
                className="bg-bg-tag text-text-link text-xs px-2.5 py-1 rounded-full"
              >
                {tag?.tag_label || ''}
              </span>
            ))}
          </div>
        )}

        {entry?.published_date && (
          <p className="text-text-muted text-xs mb-4">
            Published:{' '}
            {new Date(entry.published_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {entry?.excerpt && (
          <p className="text-text-secondary text-sm leading-relaxed mb-4 border-l-2 border-primary pl-3 italic">
            {entry.excerpt}
          </p>
        )}

        {entry?.full_content && (
          <div
            className="text-text-secondary text-sm leading-relaxed prose prose-invert max-w-none mb-6"
            dangerouslySetInnerHTML={{
              __html: typeof entry.full_content === 'string'
                ? entry.full_content
                : '',
            }}
          />
        )}

        {entry?.external_url && (
          <a
            href={entry.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Read Original ↗
          </a>
        )}
      </div>
    </div>
  );
}