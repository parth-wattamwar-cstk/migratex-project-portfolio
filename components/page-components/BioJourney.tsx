import Image from 'next/image';
import { BioJourneySection } from '@/lib/types';

interface BioJourneyProps {
  data: BioJourneySection;
}

export default function BioJourney({ data }: BioJourneyProps) {
  const sectionHeading = data?.section_heading || 'My Journey';
  const bioContent = data?.bio_content;
  const profilePhoto = data?.profile_photo?.url;

  return (
    <section id="work" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <div className="bg-bg-card rounded-xl shadow-card p-5">
          <p className="text-text-muted text-[11px] font-medium uppercase tracking-[1.5px] mb-3">
            {sectionHeading}
          </p>

          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              {bioContent ? (
                <div
                  className="text-text-secondary text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: typeof bioContent === 'string' ? bioContent : '',
                  }}
                />
              ) : (
                <p className="text-text-secondary text-sm leading-relaxed">
                  Passionate software developer with expertise in modern web technologies.
                </p>
              )}
            </div>

            {profilePhoto && (
              <div className="flex-shrink-0">
                <div className="relative w-16 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={profilePhoto}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}