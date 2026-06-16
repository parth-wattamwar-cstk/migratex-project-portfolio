import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getEntryByUrl } from '@/lib/contentstack-api';
import { HomePortfolioPage } from '@/lib/types';
import RenderComponents from '@/components/RenderComponents';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const entry = (await getEntryByUrl({
      entryUrl: '/',
      contentTypeUid: 'home_portfolio_page',
      referenceFieldPath: [
        'page_sections.hero_intro.profile_photo',
        'page_sections.bio_journey.profile_photo',
        'page_sections.career_history_timeline.timeline_entries',
        'page_sections.career_history_timeline.timeline_entries.company_logo',
        'page_sections.expertise_icon_grid.tech_skills',
        'page_sections.expertise_icon_grid.tech_skills.skill_icon',
        'page_sections.certifications_carousel.certification_slides',
        'page_sections.projects_grid.projects',
        'page_sections.projects_grid.projects.screenshot',
        'page_sections.publications_research.publications',
        'page_sections.testimonials.testimonial_items',
      ],
      jsonRtePath: [
        'page_sections.bio_journey.bio_content',
        'page_sections.projects_grid.projects.detailed_description',
        'page_sections.publications_research.publications.full_content',
      ],
    })) as HomePortfolioPage | null;

    return {
      title: entry?.meta_title || 'Portfolio | Software Developer',
      description: entry?.meta_description || 'Personal portfolio site',
    };
  } catch {
    return {
      title: 'Portfolio | Software Developer',
      description: 'Personal portfolio site',
    };
  }
}

export default async function HomePage() {
  let entry: HomePortfolioPage | null = null;

  try {
    entry = (await getEntryByUrl({
      entryUrl: '/',
      contentTypeUid: 'home_portfolio_page',
      referenceFieldPath: [
        'page_sections.career_history_timeline.timeline_entries',
        'page_sections.expertise_icon_grid.tech_skills',
        'page_sections.projects_grid.projects',
        'page_sections.publications_research.publications',
        'page_sections.testimonials.testimonial_items',
      ],
      jsonRtePath: [
        'page_sections.bio_journey.bio_content',
        'page_sections.projects_grid.projects.detailed_description',
        'page_sections.publications_research.publications.full_content',
      ],
    })) as HomePortfolioPage | null;
  } catch (error) {
    console.error('Error fetching home page:', error);
  }

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-white text-2xl font-bold mb-3">Portfolio</h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            Content is being set up in Contentstack. Make sure your{' '}
            <code className="bg-bg-card px-1.5 py-0.5 rounded text-primary text-xs">
              home_portfolio_page
            </code>{' '}
            content type has an entry with URL{' '}
            <code className="bg-bg-card px-1.5 py-0.5 rounded text-primary text-xs">/</code>.
          </p>
          <div className="bg-bg-card rounded-xl p-4 text-left text-xs text-text-muted space-y-1">
            <p>• API Key: {process.env.CONTENTSTACK_API_KEY ? '✓ Set' : '✗ Missing'}</p>
            <p>• Delivery Token: {process.env.CONTENTSTACK_DELIVERY_TOKEN ? '✓ Set' : '✗ Missing'}</p>
            <p>• Environment: {process.env.CONTENTSTACK_ENVIRONMENT || '✗ Missing'}</p>
            <p>• Region: {process.env.CONTENTSTACK_REGION || '✗ Missing'}</p>
          </div>
        </div>
      </div>
    );
  }

  const pageSections = Array.isArray(entry?.page_sections) ? entry.page_sections : [];

  return (
    <div className="py-4">
      <RenderComponents pageComponents={pageSections} />
    </div>
  );
}