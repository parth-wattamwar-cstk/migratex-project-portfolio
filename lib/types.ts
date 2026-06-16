export interface CtaButton {
  button_text?: string;
  button_url?: string;
  button_style?: string;
}

export interface Asset {
  uid?: string;
  url?: string;
  title?: string;
  filename?: string;
  content_type?: string;
}

// Header
export interface NavigationItem {
  label?: string;
  anchor_target?: string;
}

export interface HeaderData {
  title?: string;
  brand_name?: string;
  navigation_items?: NavigationItem[];
  primary_cta?: CtaButton;
  secondary_cta?: CtaButton;
}

// Footer
export interface FooterData {
  title?: string;
  section_heading?: string;
  contact_form?: {
    name_field_label?: string;
    email_field_label?: string;
    message_field_label?: string;
    submit_button_text?: string;
    form_action_endpoint?: string;
  };
  contact_section_background_image?: Asset;
}

// Tech Skill
export interface TechSkill {
  uid?: string;
  title?: string;
  skill_name?: string;
  skill_icon?: Asset;
  icon_color_hex?: string;
  category?: string;
}

// Testimonial
export interface Testimonial {
  uid?: string;
  title?: string;
  quote?: string;
  author_name?: string;
  author_title?: string;
  company?: string;
}

// Publication
export interface TopicTag {
  tag_label?: string;
}

export interface Publication {
  uid?: string;
  title?: string;
  url?: string;
  publication_title?: string;
  excerpt?: string;
  topic_tags?: TopicTag[];
  published_date?: string;
  external_url?: string;
  full_content?: any;
  read_more_cta?: CtaButton;
  meta_title?: string;
  meta_description?: string;
}

// Project
export interface TechTag {
  tag_label?: string;
}

export interface Project {
  uid?: string;
  title?: string;
  url?: string;
  project_name?: string;
  short_description?: string;
  screenshot?: Asset;
  tech_tags?: TechTag[];
  live_url?: string;
  repository_url?: string;
  detailed_description?: any;
  meta_title?: string;
  meta_description?: string;
  og_image?: Asset;
}

// Career Timeline
export interface CareerTimelineEntry {
  uid?: string;
  title?: string;
  job_role?: string;
  company_name?: string;
  start_date?: string;
  end_date?: string;
  date_range_label?: string;
  company_logo?: Asset;
  description?: string;
}

// Certification
export interface CertificationSlide {
  certification_title?: string;
  certification_image?: Asset;
  issuing_organization?: string;
  issue_date?: string;
}

// Home Page Sections
export interface InlineTechBadge {
  badge_label?: string;
  badge_variant?: string;
}

export interface HeroIntroSection {
  headline?: string;
  highlighted_word?: string;
  subheadline?: string;
  inline_tech_badges?: InlineTechBadge[];
  profile_photo?: Asset;
  primary_cta?: CtaButton;
  secondary_cta?: CtaButton;
}

export interface BioJourneySection {
  section_heading?: string;
  bio_content?: any;
  profile_photo?: Asset;
}

export interface CareerHistoryTimelineSection {
  section_heading?: string;
  timeline_entries?: CareerTimelineEntry[];
}

export interface ExpertiseIconGridSection {
  section_heading?: string;
  tech_skills?: TechSkill[];
}

export interface CertificationsCarouselSection {
  section_heading?: string;
  certification_slides?: {
    certification_slide_one?: CertificationSlide;
    certification_slide_two?: CertificationSlide;
    certification_slide_three?: CertificationSlide;
    certification_slide_four?: CertificationSlide;
    certification_slide_five?: CertificationSlide;
  }[];
}

export interface ProjectsGridSection {
  section_heading?: string;
  projects?: Project[];
  view_more_cta?: CtaButton;
}

export interface PublicationsResearchSection {
  section_heading?: string;
  publications?: Publication[];
}

export interface TestimonialsSection {
  section_heading?: string;
  testimonial_items?: Testimonial[];
}

export interface PageSection {
  hero_intro?: HeroIntroSection;
  bio_journey?: BioJourneySection;
  career_history_timeline?: CareerHistoryTimelineSection;
  expertise_icon_grid?: ExpertiseIconGridSection;
  certifications_carousel?: CertificationsCarouselSection;
  projects_grid?: ProjectsGridSection;
  publications_research?: PublicationsResearchSection;
  testimonials?: TestimonialsSection;
}

export interface HomePortfolioPage {
  title?: string;
  url?: string;
  page_sections?: PageSection[];
  meta_title?: string;
  meta_description?: string;
  og_image?: Asset;
  canonical_url?: string;
}