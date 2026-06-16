'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CertificationsCarouselSection, CertificationSlide } from '@/lib/types';

interface CertificationsCarouselProps {
  data: CertificationsCarouselSection;
}

export default function CertificationsCarousel({ data }: CertificationsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionHeading = data?.section_heading || 'Certifications';

  // Flatten certification slides from the nested object structure
  const slides: CertificationSlide[] = [];
  const rawSlides = Array.isArray(data?.certification_slides) ? data.certification_slides : [];

  rawSlides?.forEach?.((slideGroup) => {
    if (slideGroup && typeof slideGroup === 'object') {
      const keys = [
        'certification_slide_one',
        'certification_slide_two',
        'certification_slide_three',
        'certification_slide_four',
        'certification_slide_five',
      ];
      keys?.forEach?.((key) => {
        const slide = (slideGroup as any)[key];
        if (slide && slide.certification_title) {
          slides.push(slide);
        }
      });
    }
  });

  const currentSlide = slides[activeIndex] || null;

  if (slides.length === 0) {
    return (
      <section id="certifications" className="py-6 px-6">
        <div className="max-w-container mx-auto">
          <h2 className="text-white text-lg font-bold mb-5">{sectionHeading}</h2>
          <p className="text-text-muted text-sm">No certifications found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <h2 className="text-white text-lg font-bold mb-4">{sectionHeading}</h2>

        <div className="bg-bg-card-alt rounded-xl shadow-card p-5">
          {/* Slide content */}
          {currentSlide && (
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center min-h-[100px]">
              {currentSlide?.certification_image?.url && (
                <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden bg-bg-element">
                  <Image
                    src={currentSlide.certification_image.url}
                    alt={currentSlide?.certification_title || 'Certification'}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div>
                <h3 className="text-white text-sm font-semibold leading-tight">
                  {currentSlide?.certification_title || ''}
                </h3>
                {currentSlide?.issuing_organization && (
                  <p className="text-text-secondary text-xs mt-1">
                    {currentSlide.issuing_organization}
                  </p>
                )}
                {currentSlide?.issue_date && (
                  <p className="text-text-muted text-[11px] mt-0.5">
                    {new Date(currentSlide.issue_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Dots */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {slides?.map?.((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                    index === activeIndex ? 'bg-primary' : 'bg-border-subtle'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}