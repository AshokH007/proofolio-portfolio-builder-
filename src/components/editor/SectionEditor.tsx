import React from 'react';
import type { 
  PortfolioData, 
  SectionType, 
  FontFamilyChoice, 
  BorderRadiusChoice,
  SocialLink,
  Project,
  Experience,
  Education,
  SkillCategory
} from '../../types/portfolio';
import { COLOR_PRESETS } from '../../data/templates';
import { ImageUpload } from '../common/ImageUpload';
import { 
  User, 
  Palette, 
  FolderKanban, 
  Briefcase, 
  Wrench, 
  GraduationCap, 
  Mail, 
  Layers, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff
} from 'lucide-react';

interface Props {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SectionEditor: React.FC<Props> = ({
  data,
  onChange,
  activeTab,
  onTabChange,
}) => {
  // Helpers to update subfields immutably
  const updateProfile = (field: keyof PortfolioData['profile'], value: any) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  const updateTheme = (field: keyof PortfolioData['theme'], value: any) => {
    onChange({
      ...data,
      theme: {
        ...data.theme,
        [field]: value,
      },
    });
  };

  const updateContact = (field: keyof PortfolioData['contact'], value: any) => {
    onChange({
      ...data,
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  // Section visibility and reordering
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...data.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    onChange({ ...data, sections: newSections });
  };

  const toggleSectionVisibility = (id: SectionType) => {
    const newSections = data.sections.map((s) => 
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    onChange({ ...data, sections: newSections });
  };

  // Project helpers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Project',
      description: 'Describe the problem solved, tech stack used, and your specific role.',
      tags: ['React', 'TypeScript'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      featured: false,
    };
    onChange({ ...data, projects: [newProj, ...data.projects] });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const list = [...data.projects];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    onChange({ ...data, projects: list });
  };

  // Experience helpers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Spearheaded frontend features and collaborated with product teams.',
      highlights: ['Improved loading speed by 25%', 'Mentored junior developers'],
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange({
      ...data,
      experience: data.experience.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });
  };

  // Education helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      period: '2018 - 2022',
      details: 'Major in Software Systems',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((e) => e.id !== id),
    });
  };

  // Skill category helpers
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Skill Category',
      skills: [{ id: `s-${Date.now()}`, name: 'Skill Name', level: 90 }],
    };
    onChange({ ...data, skills: [...data.skills, newCat] });
  };

  const updateSkillCategory = (catId: string, updates: Partial<SkillCategory>) => {
    onChange({
      ...data,
      skills: data.skills.map((c) => (c.id === catId ? { ...c, ...updates } : c)),
    });
  };

  const removeSkillCategory = (catId: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((c) => c.id !== catId),
    });
  };

  const addSkillItem = (catId: string) => {
    const cat = data.skills.find((c) => c.id === catId);
    if (!cat) return;
    const newSkills = [...cat.skills, { id: `s-${Date.now()}`, name: 'New Skill', level: 85 }];
    updateSkillCategory(catId, { skills: newSkills });
  };

  const removeSkillItem = (catId: string, skillId: string) => {
    const cat = data.skills.find((c) => c.id === catId);
    if (!cat) return;
    updateSkillCategory(catId, { skills: cat.skills.filter((s) => s.id !== skillId) });
  };

  // Social link helpers
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: `soc-${Date.now()}`,
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com',
    };
    updateProfile('socialLinks', [...(data.profile.socialLinks || []), newLink]);
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    const list = (data.profile.socialLinks || []).map((l) => (l.id === id ? { ...l, ...updates } : l));
    updateProfile('socialLinks', list);
  };

  const removeSocialLink = (id: string) => {
    const list = (data.profile.socialLinks || []).filter((l) => l.id !== id);
    updateProfile('socialLinks', list);
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'theme', label: 'Theme & Style', icon: Palette },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: data.projects.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, badge: data.experience.length },
    { id: 'skills', label: 'Skills & Stack', icon: Wrench, badge: data.skills.length },
    { id: 'education', label: 'Education', icon: GraduationCap, badge: data.education.length },
    { id: 'contact', label: 'Contact & CTA', icon: Mail },
    { id: 'sections', label: 'Sections & Order', icon: Layers },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      
      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 p-2 bg-slate-950/70 border-b border-slate-800 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-sky-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-sky-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6">

        {/* 1. PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Identity &amp; Bio</h3>
              <p className="text-xs text-slate-400">Configure your professional headline, narrative, and links.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={data.profile.title}
                  onChange={(e) => updateProfile('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. Senior Full-Stack Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Status Badge / Availability</label>
                <input
                  type="text"
                  value={data.profile.statusBadge}
                  onChange={(e) => updateProfile('statusBadge', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. Available for high-impact roles"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Tagline (Hero subtitle)</label>
                <textarea
                  rows={2}
                  value={data.profile.tagline}
                  onChange={(e) => updateProfile('tagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="A concise, punchy one-liner summarizing what you build."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed About Story</label>
                <textarea
                  rows={4}
                  value={data.profile.aboutLong}
                  onChange={(e) => updateProfile('aboutLong', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="Share your journey, engineering philosophy, and what problems you love solving."
                />
              </div>

              <ImageUpload
                label="Profile Headshot / Avatar"
                sublabel="Select a photo from your computer or phone, or provide an image URL."
                dataUrl={data.profile.avatarDataUrl}
                urlValue={data.profile.avatarUrl}
                onDataUrlChange={(d) => updateProfile('avatarDataUrl', d)}
                onUrlValueChange={(u) => updateProfile('avatarUrl', u)}
                aspectRatio="square"
                maxWidth={400}
                maxHeight={400}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Direct Email</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={data.profile.website || ''}
                    onChange={(e) => updateProfile('website', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    placeholder="https://mysite.dev"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Resume / CV Link</label>
                  <input
                    type="text"
                    value={data.profile.resumeUrl || ''}
                    onChange={(e) => updateProfile('resumeUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    placeholder="https://.../resume.pdf"
                  />
                </div>
              </div>

              {/* Social links manager */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider">Social &amp; Web Links</label>
                  <button
                    onClick={addSocialLink}
                    className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Link</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(data.profile.socialLinks || []).map((link) => (
                    <div key={link.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateSocialLink(link.id, { label: e.target.value })}
                        className="w-28 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                        className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                        placeholder="https://..."
                      />
                      <button
                        onClick={() => removeSocialLink(link.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. THEME & STYLING */}
        {activeTab === 'theme' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visual Styling &amp; Colors</h3>
              <p className="text-xs text-slate-400">Tailor color palettes, typography, and card borders in real time.</p>
            </div>

            {/* Curated Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">1-Click Curated Presets</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onChange({
                        ...data,
                        theme: {
                          ...data.theme,
                          primaryColor: preset.primary,
                          accentColor: preset.accent,
                          backgroundColor: preset.bg,
                          surfaceColor: preset.surface,
                          textColor: preset.text,
                          presetId: preset.id,
                        },
                      });
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      data.theme.presetId === preset.id 
                        ? 'border-sky-500 bg-slate-800/80 ring-1 ring-sky-500' 
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }}></span>
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }}></span>
                      <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: preset.bg }}></span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Controls */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">Custom Color Palette</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300">Primary Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-400">{data.theme.primaryColor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300">Accent Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.theme.accentColor}
                      onChange={(e) => updateTheme('accentColor', e.target.value)}
                      className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-400">{data.theme.accentColor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300">Background Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.theme.backgroundColor}
                      onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                      className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-400">{data.theme.backgroundColor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300">Card Surface Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.theme.surfaceColor}
                      onChange={(e) => updateTheme('surfaceColor', e.target.value)}
                      className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-400">{data.theme.surfaceColor}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">Typography / Font Family</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Inter', name: 'Inter (Clean / Neutral)' },
                  { id: 'Plus Jakarta Sans', name: 'Jakarta (Modern Tech)' },
                  { id: 'Space Grotesk', name: 'Space Grotesk (Creative)' },
                  { id: 'Outfit', name: 'Outfit (Friendly Modern)' },
                  { id: 'Playfair Display', name: 'Playfair (Editorial Serif)' },
                  { id: 'JetBrains Mono', name: 'JetBrains (Developer)' },
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => updateTheme('fontFamily', font.id as FontFamilyChoice)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      data.theme.fontFamily === font.id
                        ? 'border-sky-500 bg-sky-950/40 text-white font-bold ring-1 ring-sky-500'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Border Radius */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">Corner Radius</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Sharp' },
                  { id: 'sm', label: 'Subtle' },
                  { id: 'lg', label: 'Rounded' },
                  { id: 'full', label: 'Pill' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => updateTheme('borderRadius', r.id as BorderRadiusChoice)}
                    className={`py-2 px-3 rounded text-center text-xs font-medium border transition-all ${
                      data.theme.borderRadius === r.id
                        ? 'border-sky-500 bg-sky-600 text-white font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 3. PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Featured Projects</h3>
                <p className="text-xs text-slate-400">Showcase your best builds, repositories, and case studies.</p>
              </div>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                    <span className="text-xs font-bold text-sky-400">
                      Project #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveProject(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveProject(idx, 'down')}
                        disabled={idx === data.projects.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeProject(proj.id)}
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors ml-2"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div className="pt-4">
                        <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={proj.featured}
                            onChange={(e) => updateProject(proj.id, { featured: e.target.checked })}
                            className="rounded bg-slate-900 border-slate-800 text-sky-500"
                          />
                          <span>Featured</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={proj.tags.join(', ')}
                        onChange={(e) => updateProject(proj.id, { 
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) 
                        })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                        placeholder="React, TypeScript, Go"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Demo URL</label>
                        <input
                          type="text"
                          value={proj.demoUrl || ''}
                          onChange={(e) => updateProject(proj.id, { demoUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                          placeholder="https://demo.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub / Code URL</label>
                        <input
                          type="text"
                          value={proj.githubUrl || ''}
                          onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    <ImageUpload
                      label="Project Cover Image"
                      sublabel="Upload a thumbnail or provide a live preview screenshot."
                      dataUrl={proj.imageDataUrl}
                      urlValue={proj.imageUrl}
                      onDataUrlChange={(d) => updateProject(proj.id, { imageDataUrl: d })}
                      onUrlValueChange={(u) => updateProject(proj.id, { imageUrl: u })}
                      aspectRatio="video"
                      maxWidth={960}
                      maxHeight={540}
                    />

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Career History</h3>
                <p className="text-xs text-slate-400">Chronicle your roles, promotions, and major impact achievements.</p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Role</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-white">{exp.role || 'New Position'}</span>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Role / Job Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Time Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                        placeholder="2022 - Present"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                        placeholder="Remote / San Francisco"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Summary Description</label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Key Impact Bullets (one per line)</label>
                    <textarea
                      rows={3}
                      value={(exp.highlights || []).join('\n')}
                      onChange={(e) => updateExperience(exp.id, { 
                        highlights: e.target.value.split('\n').filter(Boolean) 
                      })}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      placeholder="Reduced latency by 40%&#10;Mentored 5 engineers"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skills &amp; Capabilities</h3>
                <p className="text-xs text-slate-400">Organize your technical competencies and toolchains into categories.</p>
              </div>
              <button
                onClick={addSkillCategory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.skills.map((cat) => (
                <div key={cat.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => updateSkillCategory(cat.id, { name: e.target.value })}
                      className="font-bold text-xs text-sky-400 bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-sky-500 rounded px-1"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addSkillItem(cat.id)}
                        className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Skill</span>
                      </button>
                      <button
                        onClick={() => removeSkillCategory(cat.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {cat.skills.map((sk) => (
                      <div key={sk.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sk.name}
                          onChange={(e) => {
                            const updated = cat.skills.map((s) => (s.id === sk.id ? { ...s, name: e.target.value } : s));
                            updateSkillCategory(cat.id, { skills: updated });
                          }}
                          className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                          placeholder="Skill Name"
                        />
                        <div className="flex items-center gap-1 w-24">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={sk.level || 90}
                            onChange={(e) => {
                              const updated = cat.skills.map((s) => (s.id === sk.id ? { ...s, level: parseInt(e.target.value) || 0 } : s));
                              updateSkillCategory(cat.id, { skills: updated });
                            }}
                            className="w-14 px-1.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-right text-slate-300"
                          />
                          <span className="text-[10px] text-slate-500">%</span>
                        </div>
                        <button
                          onClick={() => removeSkillItem(cat.id, sk.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Education &amp; Certifications</h3>
                <p className="text-xs text-slate-400">Degrees, academic awards, and industry credentials.</p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-white">{edu.degree || 'Degree'}</span>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Degree / Certification</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Years / Period</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => updateEducation(edu.id, { period: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Details / Honors</label>
                    <textarea
                      rows={2}
                      value={edu.details}
                      onChange={(e) => updateEducation(edu.id, { details: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. CONTACT & CTA */}
        {activeTab === 'contact' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact &amp; Call to Action</h3>
              <p className="text-xs text-slate-400">Direct inquiries, lead capture, and availability messaging.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Heading</label>
                <input
                  type="text"
                  value={data.contact.heading}
                  onChange={(e) => updateContact('heading', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subheading / Invitation</label>
                <textarea
                  rows={3}
                  value={data.contact.subheading}
                  onChange={(e) => updateContact('subheading', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={data.contact.ctaText}
                    onChange={(e) => updateContact('ctaText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CTA Target URL</label>
                  <input
                    type="text"
                    value={data.contact.ctaUrl}
                    onChange={(e) => updateContact('ctaUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    placeholder="mailto:you@example.com or calendar URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Availability Note</label>
                <input
                  type="text"
                  value={data.contact.availabilityNote}
                  onChange={(e) => updateContact('availabilityNote', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="Replies in 24 hours. Open for full-time or advisory."
                />
              </div>
            </div>
          </div>
        )}

        {/* 8. SECTIONS & ORDER */}
        {activeTab === 'sections' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Section Ordering &amp; Visibility</h3>
              <p className="text-xs text-slate-400">Reorder sections up/down or toggle them on and off with 1 click.</p>
            </div>

            <div className="space-y-2">
              {data.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    sec.visible
                      ? 'bg-slate-950 border-slate-800 text-white'
                      : 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSectionVisibility(sec.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        sec.visible ? 'text-sky-400 bg-sky-950/50' : 'text-slate-600 bg-slate-900'
                      }`}
                      title={sec.visible ? 'Hide Section' : 'Show Section'}
                    >
                      {sec.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <div>
                      <span className="text-xs font-bold block">{sec.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">id: #{sec.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveSection(idx, 'down')}
                      disabled={idx === data.sections.length - 1}
                      className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
