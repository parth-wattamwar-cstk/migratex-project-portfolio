import Image from 'next/image';
import { CareerHistoryTimelineSection, CareerTimelineEntry } from '@/lib/types';

interface CareerHistoryTimelineProps {
  data: CareerHistoryTimelineSection;
}

function TimelineItem({ entry }: { entry: CareerTimelineEntry }) {
  const logoUrl = entry?.company_logo?.url;

  return (
    <div className="flex gap-4 relative">
      {/* Icon / Logo */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-bg-element border border-border-subtle flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={entry?.company_name || 'Company'}
              width={28}
              height={28}
              className="object-contain"
            />
          ) : (
            <span className="text-primary text-xs font-bold">
              {(entry?.company_name || 'C').charAt(0)}
            </span>
          )}
        </div>
        <div className="w-px flex-1 bg-border-light mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 min-w-0">
        <p className="text-white text-sm font-semibold leading-tight">
          {entry?.job_role || entry?.title || ''}
        </p>
        <p className="text-text-secondary text-xs mt-0.5">
          {entry?.company_name || ''}
        </p>
        <p className="text-text-muted text-[11px] mt-0.5">
          {entry?.date_range_label || ''}
        </p>
        {entry?.description && (
          <p className="text-text-secondary text-xs mt-2 leading-relaxed">
            {entry.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CareerHistoryTimeline({ data }: CareerHistoryTimelineProps) {
  const sectionHeading = data?.section_heading || 'Career History';
  const entries = Array.isArray(data?.timeline_entries) ? data.timeline_entries : [];

  return (
    <section id="career" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <h2 className="text-white text-lg font-bold mb-5">{sectionHeading}</h2>

        {entries.length > 0 ? (
          <div>
            {entries?.map?.((entry, index) => (
              <TimelineItem key={entry?.uid || index} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">No career entries found.</p>
        )}
      </div>
    </section>
  );
}