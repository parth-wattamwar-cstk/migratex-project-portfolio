import Image from 'next/image';
import Link from 'next/link';
import { HeroIntroSection } from '@/lib/types';

interface HeroIntroProps {
  data: HeroIntroSection;
}

export default function HeroIntro({ data }: HeroIntroProps) {
  const headline = data?.headline || '';
  const highlightedWord = data?.highlighted_word || '';
  const subheadline = data?.subheadline || '';
  const badges = Array.isArray(data?.inline_tech_badges) ? data.inline_tech_badges : [];
  const profilePhoto = data?.profile_photo?.url;
  const primaryCta = data?.primary_cta;
  const secondaryCta = data?.secondary_cta;

  // Split headline to highlight the highlighted_word
  const renderHeadline = () => {
    if (!headline) return null;
    if (!highlightedWord || !headline.includes(highlightedWord)) {
      return <span>{headline}</span>;
    }
    const parts = headline.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="bg-primary text-white rounded px-2 py-0.5 mx-1">
          {highlightedWord}
        </span>
        {parts[1]}
      </>
    );
  };

  const getBadgeStyle = (variant?: string) => {
    switch (variant) {
      case 'green':
        return 'bg-accent-green text-white';
      case 'blue':
        return 'bg-primary text-white';
      case 'white':
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <section id="home" className="py-12 px-6">
      <div className="max-w-container mx-auto">
        <div className="flex items-start justify-between gap-6">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[26px] sm:text-[28px] font-extrabold text-white leading-tight mb-3">
              {renderHeadline()}
            </h1>

            {subheadline && (
              <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                {subheadline}
              </p>
            )}

            {/* Inline tech badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {badges?.map?.((badge, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getBadgeStyle(badge?.badge_variant)}`}
                  >
                    {badge?.badge_label || ''}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-2">
              {primaryCta?.button_text && (
                <Link
                  href={primaryCta?.button_url || '#'}
                  className="px-4 py-1.5 rounded-full bg-primary border border-primary text-white text-xs font-medium hover:bg-primary-dark transition-all duration-150"
                >
                  {primaryCta.button_text}
                </Link>
              )}
              {secondaryCta?.button_text && (
                <Link
                  href={secondaryCta?.button_url || '#'}
                  className="px-4 py-1.5 rounded-full border border-[#555] text-[#cccccc] text-xs font-normal hover:border-white hover:text-white transition-all duration-150"
                >
                  {secondaryCta.button_text}
                </Link>
              )}
            </div>
          </div>

          {/* Profile Photo */}
          {profilePhoto && (
            <div className="flex-shrink-0">
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden">
                <Image
                  src={profilePhoto}
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}