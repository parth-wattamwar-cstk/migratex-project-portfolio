import { PageSection } from '@/lib/types';
import HeroIntro from './page-components/HeroIntro';
import BioJourney from './page-components/BioJourney';
import CareerHistoryTimeline from './page-components/CareerHistoryTimeline';
import ExpertiseIconGrid from './page-components/ExpertiseIconGrid';
import CertificationsCarousel from './page-components/CertificationsCarousel';
import ProjectsGrid from './page-components/ProjectsGrid';
import PublicationsResearch from './page-components/PublicationsResearch';
import Testimonials from './page-components/Testimonials';

interface RenderComponentsProps {
  pageComponents: PageSection[];
}

export default function RenderComponents({ pageComponents }: RenderComponentsProps) {
  if (!pageComponents || !Array.isArray(pageComponents) || pageComponents.length === 0) {
    return null;
  }

  return (
    <>
      {pageComponents?.map?.((section, index) => {
        if (!section || typeof section !== 'object') return null;

        const keys = Object.keys(section);

        return keys?.map?.((key) => {
          const sectionData = (section as any)[key];
          if (!sectionData) return null;

          switch (key) {
            case 'hero_intro':
              return <HeroIntro key={`${key}-${index}`} data={sectionData} />;

            case 'bio_journey':
              return <BioJourney key={`${key}-${index}`} data={sectionData} />;

            case 'career_history_timeline':
              return <CareerHistoryTimeline key={`${key}-${index}`} data={sectionData} />;

            case 'expertise_icon_grid':
              return <ExpertiseIconGrid key={`${key}-${index}`} data={sectionData} />;

            case 'certifications_carousel':
              return <CertificationsCarousel key={`${key}-${index}`} data={sectionData} />;

            case 'projects_grid':
              return <ProjectsGrid key={`${key}-${index}`} data={sectionData} />;

            case 'publications_research':
              return <PublicationsResearch key={`${key}-${index}`} data={sectionData} />;

            case 'testimonials':
              return <Testimonials key={`${key}-${index}`} data={sectionData} />;

            default:
              return null;
          }
        });
      })}
    </>
  );
}