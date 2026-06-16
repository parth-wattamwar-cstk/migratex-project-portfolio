import Image from 'next/image';
import Link from 'next/link';
import { ProjectsGridSection, Project } from '@/lib/types';

interface ProjectsGridProps {
  data: ProjectsGridSection;
}

function ProjectCard({ project }: { project: Project }) {
  const screenshot = project?.screenshot?.url;
  const techTags = Array.isArray(project?.tech_tags) ? project.tech_tags : [];

  return (
    <div className="bg-bg-card rounded-xl shadow-card-sm overflow-hidden flex flex-col">
      {/* Screenshot */}
      {screenshot ? (
        <div className="relative w-full h-28">
          <Image
            src={screenshot}
            alt={project?.project_name || project?.title || 'Project'}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-28 bg-bg-element flex items-center justify-center">
          <svg className="w-8 h-8 text-border-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="text-white text-sm font-semibold leading-tight">
          {project?.project_name || project?.title || ''}
        </h3>

        {project?.short_description && (
          <p className="text-text-secondary text-[11px] mt-1.5 leading-relaxed flex-1">
            {project.short_description}
          </p>
        )}

        {/* Tech Tags */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {techTags?.slice(0, 3)?.map?.((tag, index) => (
              <span
                key={index}
                className="bg-bg-tag text-text-link text-[10px] px-2 py-0.5 rounded-full"
              >
                {tag?.tag_label || ''}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2 mt-3">
          {project?.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] px-3 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-150"
            >
              Live
            </a>
          )}
          {project?.repository_url && (
            <a
              href={project.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] px-3 py-1 rounded-full border border-border-subtle text-text-secondary hover:border-white hover:text-white transition-all duration-150"
            >
              Repo
            </a>
          )}
          {project?.url && (
            <Link
              href={project.url}
              className="text-[11px] px-3 py-1 rounded-full border border-border-subtle text-text-secondary hover:border-primary hover:text-primary transition-all duration-150"
            >
              View More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsGrid({ data }: ProjectsGridProps) {
  const sectionHeading = data?.section_heading || 'Recent Projects';
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const viewMoreCta = data?.view_more_cta;

  return (
    <section id="projects" className="py-6 px-6">
      <div className="max-w-container mx-auto">
        <h2 className="text-white text-lg font-bold mb-5">{sectionHeading}</h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects?.map?.((project, index) => (
              <ProjectCard key={project?.uid || index} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">No projects found.</p>
        )}

        {viewMoreCta?.button_text && (
          <div className="flex justify-center mt-6">
            <Link
              href={viewMoreCta?.button_url || '#'}
              className="px-5 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all duration-150"
            >
              {viewMoreCta.button_text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}