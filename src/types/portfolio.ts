export type TemplateId = 'minimal' | 'developer' | 'creative' | 'modern';
export type PremiumTemplateId = 'executive' | 'agency' | 'cyberpunk';
export type AllTemplateId = TemplateId | PremiumTemplateId;

export type FontFamilyChoice = 
  | 'Inter' 
  | 'Plus Jakarta Sans' 
  | 'Space Grotesk' 
  | 'Outfit' 
  | 'Playfair Display' 
  | 'JetBrains Mono';

export type BorderRadiusChoice = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'dribbble' | 'youtube' | 'website' | 'other';
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  aboutLong: string;
  avatarUrl: string;
  avatarDataUrl?: string; // Uploaded optimized base64 image data URL (takes priority)
  location: string;
  email: string;
  phone?: string;
  website?: string;
  resumeUrl?: string;
  statusBadge: string;
  socialLinks: SocialLink[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  imageDataUrl?: string; // Uploaded optimized base64 cover image (takes priority)
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number; // 0 - 100 optional
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export interface ContactInfo {
  heading: string;
  subheading: string;
  email: string;
  ctaText: string;
  ctaUrl: string;
  availabilityNote: string;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  fontFamily: FontFamilyChoice;
  borderRadius: BorderRadiusChoice;
  presetId?: string;
}

export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'projects' 
  | 'experience' 
  | 'skills' 
  | 'education' 
  | 'contact';

export interface SectionConfig {
  id: SectionType;
  title: string;
  visible: boolean;
}

export interface PortfolioData {
  version: number;
  updatedAt: string;
  templateId: TemplateId;
  profile: Profile;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: ContactInfo;
  theme: ThemeConfig;
  sections: SectionConfig[];
}

export interface TemplateMetadata {
  id: AllTemplateId;
  name: string;
  category: 'free' | 'premium';
  description: string;
  tags: string[];
  previewGradient: string;
  features: string[];
  recommendedFor: string;
  accentColor: string;
}

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

// --- RESUME BUILDER TYPES ---

export type ResumeTemplateId = 
  | 'ats-professional' 
  | 'modern-tech' 
  | 'minimal' 
  | 'fresh-graduate' 
  | 'executive';

export type ResumeSectionId = 
  | 'summary' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'projects';

export interface ResumeCustomization {
  templateId: ResumeTemplateId;
  headlineOverride?: string;
  summaryOverride?: string;
  accentColor?: string;
  showPhoto?: boolean;
  sectionOrder: ResumeSectionId[];
  sectionVisibility: Record<ResumeSectionId, boolean>;
}

// Helpers for image priority resolution
export function getEffectiveAvatarUrl(profile: Profile): string {
  if (profile.avatarDataUrl && profile.avatarDataUrl.trim().length > 0) {
    return profile.avatarDataUrl;
  }
  return profile.avatarUrl || '';
}

export function getEffectiveProjectImageUrl(project: Project): string | undefined {
  if (project.imageDataUrl && project.imageDataUrl.trim().length > 0) {
    return project.imageDataUrl;
  }
  if (project.imageUrl && project.imageUrl.trim().length > 0) {
    return project.imageUrl;
  }
  return undefined;
}
