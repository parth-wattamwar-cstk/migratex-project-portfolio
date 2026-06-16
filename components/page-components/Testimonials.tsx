import { TestimonialsSection, Testimonial } from '@/lib/types';

interface TestimonialsProps {
  data: TestimonialsSection;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-bg-card rounded-xl shadow-card p-5">
      {testimonial?.quote && (
        <blockquote className="text-text-secondary text-sm italic leading-relaxed mb-3">
          "{testimonial.quote}"
        </blockquote>
      )}
      <div>
        <p className="text-white text-xs font-semibold">
          {testimonial?.author_name || ''}
        </p>
        <p className="text-text-muted text-[11px] mt-0.5">
          {[testimonial?.author_title, testimonial?.company]
            .filter(Boolean)
            .join(', ')}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  const sectionHeading = data?.section_heading || 'Few Nice Words';
  const testimonials = Array.isArray(data?.testimonial_items) ? data.testimonial_items : [];

  return (
    <section id="testimonials" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <h2 className="text-white text-lg font-bold mb-5">{sectionHeading}</h2>

        {testimonials.length > 0 ? (
          <div className="flex flex-col gap-3">
            {testimonials?.map?.((testimonial, index) => (
              <TestimonialCard key={testimonial?.uid || index} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">No testimonials found.</p>
        )}
      </div>
    </section>
  );
}