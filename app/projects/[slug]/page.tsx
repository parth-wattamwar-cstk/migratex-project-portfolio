import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getEntryByUrl } from '@/lib/contentstack-api';
import { Project } from '@/lib/types';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const entry = (await getEntryByUrl({
      entryUrl: `/projects/${params.slug}`,
      contentTypeUid: 'project',
    })) as Project | null;

    return {
      title: entry?.meta_title || entry?.project_name || entry?.title || 'Project',
      description: entry?.meta_description || entry?.short_description || '',
    };
  } catch {
    return { title: 'Project' };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  let entry: Project | null = null;

  try {
    entry = (await getEntryByUrl({
      entryUrl: `/projects/${params.slug}`,
      contentTypeUid: 'project',
      jsonRtePath: ['detailed_description'],
    })) as Project | null;
  } catch (error) {
    console.error('Error fetching project:', error);
  }

  if (!entry) return notFound();

  const screenshot = entry?.screenshot?.url;
  const techTags = Array.isArray(entry?.tech_tags) ? entry.tech_tags : [];

  return (
    <div className="py-8 px-6 max-w-container mx-auto">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-text-muted text-xs hover:text-white transition-colors mb-6"
      >
        ← Back to Projects
      </Link>

      <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
        {screenshot && (
          <div className="relative w-full h-48 sm:h-64">
            <Image
              src={screenshot}
              alt={entry?.project_name || entry?.title || 'Project'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6">
          <h1 className="text-white text-xl font-bold mb-2">
            {entry?.project_name || entry?.title || ''}
          </h1>

          {entry?.short_description && (
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {entry.short_description}
            </p>
          )}

          {techTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {techTags?.map?.((tag, index) => (
                <span
                  key={index}
                  className="bg-bg-tag text-text-link text-xs px-2.5 py-1 rounded-full"
                >
                  {tag?.tag_label || ''}
                </span>
              ))}
            </div>
          )}

          {entry?.detailed_description && (
            <div
              className="text-text-secondary text-sm leading-relaxed prose prose-invert max-w-none mb-6"
              dangerouslySetInnerHTML={{
                __html: typeof entry.detailed_description === 'string'
                  ? entry.detailed_description
                  : '',
              }}
            />
          )}

          <div className="flex gap-3">
            {entry?.live_url && (
              <a
                href={entry.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Live Demo ↗
              </a>
            )}
            {entry?.repository_url && (
              <a
                href={entry.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-border-subtle text-text-secondary text-sm hover:border-white hover:text-white transition-all"
              >
                Repository ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}