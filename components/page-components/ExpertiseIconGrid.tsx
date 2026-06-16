import Image from 'next/image';
import { ExpertiseIconGridSection, TechSkill } from '@/lib/types';

interface ExpertiseIconGridProps {
  data: ExpertiseIconGridSection;
}

function SkillIcon({ skill }: { skill: TechSkill }) {
  const iconUrl = skill?.skill_icon?.url;
  const color = skill?.icon_color_hex || '#4f6ef7';
  const name = skill?.skill_name || skill?.title || '';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-10 h-10 rounded-full bg-bg-element border border-border-subtle flex items-center justify-center overflow-hidden"
        style={{ borderColor: `${color}33` }}
      >
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={name}
            width={24}
            height={24}
            className="object-contain"
          />
        ) : (
          <span
            className="text-xs font-bold"
            style={{ color }}
          >
            {name.charAt(0)}
          </span>
        )}
      </div>
      <span className="text-text-muted text-[10px] text-center leading-tight max-w-[48px]">
        {name}
      </span>
    </div>
  );
}

export default function ExpertiseIconGrid({ data }: ExpertiseIconGridProps) {
  const sectionHeading = data?.section_heading || 'Expertise';
  const skills = Array.isArray(data?.tech_skills) ? data.tech_skills : [];

  return (
    <section id="expertise" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <h2 className="text-white text-lg font-bold mb-5">{sectionHeading}</h2>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {skills?.map?.((skill, index) => (
              <SkillIcon key={skill?.uid || index} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">No skills found.</p>
        )}
      </div>
    </section>
  );
}